#!/usr/bin/env python3
# Existing two author fits only, no new placement or geometry. Private publisher SVG stays RAM only.
import sys
sys.dont_write_bytecode=True
import argparse,copy,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
from fractions import Fraction
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
NS='{http://www.w3.org/2000/svg}';ET.register_namespace('',NS[1:-1])
def require(x,m):
 if not x:raise ValueError(m)
def sha(x):return hashlib.sha256(x).hexdigest()
def pinned(r):
 p=Path(r['path']);require(not p.is_absolute()and'..'not in p.parts,'local only');raw=(ROOT/p).read_bytes();require(sha(raw)==r['SHA256'],'input changed');return json.loads(raw)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==a.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==a.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'adapter/config pin')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed input changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared renderer changed')
 guards();r1=pinned(c['recipe1']);r2=pinned(c['recipe2']);donor=pinned(r1['sources']['donor']);original=pinned(r1['sources']['recipient'])
 require(r1['sourceDAndMedianSameMatrixExact']==c['matrix1Exact']and r2['sourceDAndMedianSameMatrixExact']==c['matrix2Exact'],'existing matrices only')
 require(r1['removedRecipientRawOneBased']==[3,4]and r2['removedRecipientRawOneBased']==[3,4]and not any(r1['approval'].values())and not any(r2['approval'].values()),'unapproved unchanged proposals')
 require(len(original['groups'])==12 and sum(len(g['polygons'])for g in original['groups'])==33,'original33P')
 for g,t in zip(original['groups'],original['trace']):require(g['polygons']==[p for call in t for p in call['polygons']],'actual old trace')
 require(sha(donor['originalSVG'].encode())==donor['source']['SHA256']and len(donor['filled'])==4 and len(donor['medians'])==4,'fixed whole元4 source')
 x=ET.fromstring(donor['originalSVG']);sourceD=donor['filled'][3]['d'];require(any(p.get('d')==sourceD and p.get('id')==donor['filled'][3]['id']for p in x.iter(NS+'path')),'original complete D4')
 spec=importlib.util.spec_from_file_location('u537c_two_existing_fits',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT;originalSVG=shared.source_svg(original)
 def candidate(r):
  root=ET.fromstring(originalSVG);outer=root[0];kept=[]
  for g in list(outer):
   if int(g.get('data-original-raw'))in(3,4):outer.remove(g)
   else:kept.append(g)
  matrix='matrix('+' '.join(format(float(Fraction(v)),'.17g')for v in r['sourceDAndMedianSameMatrixExact'])+')';g=ET.Element(NS+'g',{'data-donor-original-stroke':'4','transform':matrix});ET.SubElement(g,NS+'path',{'d':sourceD,'fill-rule':'nonzero'});outer.insert(2,g)
  require(len(list(root.iter(NS+'path')))==30,'unchanged29P plus oneD4')
  old=ET.fromstring(originalSVG)
  for n in kept:
   raw=n.get('data-original-raw');before=next(z for z in old[0]if z.get('data-original-raw')==raw);require(ET.tostring(n)==ET.tostring(before),'retained source changed')
  text=ET.tostring(root,encoding='unicode');require(text.startswith('<svg xmlns=')and'ns0:'not in text,'actual HTML SVG namespace');return text
 fit1=candidate(r1);fit2=candidate(r2)
 def subset(svg,raws=(),new=False):
  x=ET.fromstring(svg)
  for g in list(x[0]):
   donorNode=g.get('data-donor-original-stroke')=='4';raw=g.get('data-original-raw')
   if not(new and donorNode)and not(raw is not None and int(raw)in raws):x[0].remove(g)
  return ET.tostring(x,encoding='unicode')
 def domestic_union(domestic,pens):
  roots=[ET.fromstring(shared.domestic_svg(domestic,p,False))for p in pens];x=roots[0]
  for y in roots[1:]:
   require(y.get('viewBox')==x.get('viewBox')and y[0].attrib==x[0].attrib,'same RAM original frame')
   for p in y[0]:x[0].append(copy.deepcopy(p))
  return ET.tostring(x,encoding='unicode')
 rows=['whole','current3','prefix3','contact-raw2','contact-raw8']
 def selection(route,query):require(query==''and(route=='/'or route[1:]in rows),'closed route');return route
 def page(route,selected,sources,domestic):
  sections=[]
  for name in(rows if route=='/'else[route[1:]]):
   if name=='whole':svgs=[shared.domestic_svg(domestic),originalSVG,fit1,fit2]
   elif name=='current3':svgs=[shared.domestic_svg(domestic,3),subset(originalSVG,[3,4]),subset(fit1,new=True),subset(fit2,new=True)]
   elif name=='prefix3':svgs=[shared.domestic_svg(domestic,3,True),subset(originalSVG,[1,2,3,4]),subset(fit1,[1,2],True),subset(fit2,[1,2],True)]
   else:
    raw=2 if name=='contact-raw2'else 8;pen=2 if raw==2 else 7;svgs=[domestic_union(domestic,[3,pen]),subset(originalSVG,[3,4,raw]),subset(fit1,[raw],True),subset(fit2,[raw],True)]
   labels=['Publisher original RAM only','Original public source','Existing fit1; raw2 contact HOLD','Existing fit2; raw8 contact HOLD'];sections.append('<section><h2>'+html.escape(name)+'</h2><div class="panels">'+''.join('<article><h3>'+html.escape(label)+'</h3>'+svg+'</article>'for label,svg in zip(labels,svgs))+'</div></section>')
  return '<!doctype html><meta charset="utf-8"><title>卼 · existing two fits diagnostic</title><style>body{font:16px system-ui;margin:16px}h1{font-size:25px}h2{font-size:20px}h3{font-size:16px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>卼 · unchanged two complete donor fits</h1><p>'+''.join('<a href="/'+n+'">'+n+'</a> · 'for n in rows)+'<a href="/">All</a></p><p>Both source-derived matrices remain unchanged. Originalraw3+4 are explicitly removed and replaced by original wholeKo元D4. Other29P remain exact. Mathematical new contact HOLD is retained for ROOT static judgment; no native shape/mapping or runtime approval. Contactraw8 is compared with original pen7 by source-guide role hypothesis only. Original27clockviews are reused.</p>'+''.join(sections)
 shared.guards=guards;shared.load_sources=lambda:{'original':original};shared.selection=selection;shared.page=page
 for route in['/']+['/'+n for n in rows]:selection(route,'')
 for svg in[originalSVG,fit1,fit2,subset(fit1,new=True),subset(fit2,new=True),subset(fit1,[1,2],True),subset(fit2,[1,2],True),subset(fit1,[2],True),subset(fit2,[8],True)]:require(ET.fromstring(svg).tag==NS+'svg','SVG render root')
 require(shared.FETCH_COUNT==0,'check-only must not fetch private')
 if a.check_only:print(json.dumps({'status':'PASS-code-only','existingFits':2,'matricesUnchanged':True,'sourceDonorWholeD4':True,'retainedP29':True,'candidatePaths30':True,'routes':6,'allPageSVG20':True,'publisherFetched':0,'newEngine':0,'server':0,'nativeApproval':False}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
