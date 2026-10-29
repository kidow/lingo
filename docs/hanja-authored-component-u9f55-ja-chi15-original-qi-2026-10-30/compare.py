#!/usr/bin/env python3
# Explicit original-P component selection only; no engine and no source point editing.
import sys
sys.dont_write_bytecode=True
import argparse,copy,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
CONFIG=HERE/'config.json';NS='{http://www.w3.org/2000/svg}'
ET.register_namespace('',NS[1:-1])
RECIPE_SHA="010ad4d6679526c64b12b7f96931a1408166121072757690ba8dd7068a568dac"
EXPECTED=[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]]
def require(ok,msg):
 if not ok:raise ValueError(msg)
def sha(v):return hashlib.sha256(v).hexdigest()
def pinned(p):
 q=Path(p['path']);require(not q.is_absolute()and'..'not in q.parts,'local source artifact only');raw=(ROOT/q).read_bytes();require(sha(raw)==p['SHA256'],'source changed');return json.loads(raw)
def load(c):
 r=pinned(c['recipe']);ready=pinned(c['readiness']);require(c['recipe']['SHA256']==RECIPE_SHA and ready['recipe']==c['recipe'],'closed proposal')
 require(r['glyph']=='齕'and r['mixedParts']and not r['originalWhole']and not r['isOriginalEngineCapture']and not r['isActualLocallyAuthoredEngineCapture']and not any(r['approval'].values()),'explicit pending mixed assembly')
 donor=pinned(r['sources']['donor']);old=pinned(r['sources']['recipient']);pinned(r['sources']['recipientRecords']);pinned(r['sources']['originalClock']);pinned(r['sources']['originalWholeReview']);proof=pinned(ready['publicContact'])
 require(not proof['result']['newLeftRightContacts']and not proof['result']['unproved']and proof['result']['checkedNewPathRawPairs']==60,'public cross-contact facts')
 require(sha(donor['originalSVG'].encode())==donor['source']['SHA256']and donor['source']['viewBox']=='0 0 1024 1024','original public donor SVG')
 x=ET.fromstring(donor['originalSVG']);paths={p.get('id'):p.get('d')for p in x.iter(NS+'path')if p.get('id')}
 require(len(donor['filled'])==15 and len(donor['medians'])==15 and all(paths[p['id']]==p['d']for p in donor['filled']),'complete original15D')
 require(not any(p.get('transform')for p in x.iter()),'source coordinates are already SVGdisplay')
 require(sorted(old)==['defaults','engineHashes','engineRevision','groups','trace']and len(old['groups'])==21 and len(old['trace'])==21,'actual old full5 untouched')
 require(sum(len(g['polygons'])for g in old['groups'])==47 and sum(map(len,old['trace']))==22,'original47P22calls')
 require(old['groups'][16]['polygons']==[]and old['trace'][16]==[],'empty17 remains original metadata')
 for g,t in zip(old['groups'],old['trace']):require(g['polygons']==[p for call in t for p in call['polygons']],'original trace P exact')
 require(all(p['off']==0 for g in old['groups']for ps in g['polygons']for p in ps),'original off0 source')
 require(old['trace'][20][0]['args'][2:4]==old['trace'][19][0]['args'][0:2],'actual21H→20fold endpoint')
 require(r['original99Boundary']['retainedCompleteRightComponent']['originalRawOneBased']==[18,19,20,21]and r['authorChoice']['sameMatrixForAll15DAndAll15Medians'],'complete parts only')
 return r,donor,old
def mixed_svg(shared,donor,old,recipe):
 base=ET.fromstring(shared.source_svg(old));require(base.get('viewBox')=='0 0 200 200','source world200')
 root=ET.Element(NS+'svg',{'viewBox':'0 0 200 200','width':'200','height':'200','data-explicit-mixed-components':'true'});outer=ET.SubElement(root,NS+'g',dict(base[0].attrib));matrix='matrix('+' '.join(format(v,'.17g')for v in recipe['authorChoice']['matrix'])+')'
 for i,p in enumerate(donor['filled'],1):
  g=ET.SubElement(outer,NS+'g',{'data-logical':str(i),'data-source':'animCJKJa-complete齒','data-original-path':str(i),'transform':matrix});ET.SubElement(g,NS+'path',{'d':p['d'],'fill-rule':'nonzero'})
 for g in list(base[0]):
  raw=int(g.get('data-original-raw'));logical={18:16,19:17,20:18,21:18}.get(raw)
  if logical is None:continue
  n=copy.deepcopy(g);before=[ET.tostring(p)for p in g];n.set('data-logical',str(logical));n.set('data-source','original-u9f55-complete乞');require([ET.tostring(p)for p in n]==before,'retained right original path changed');outer.append(n)
 require(len(outer)==19 and len(list(root.iter(NS+'path')))==28,'15donorD+13retainedP')
 require(not any(list(root.iter(NS+t))for t in['script','use','mask','clipPath']),'static originalD only')
 return ET.tostring(root,encoding='unicode')
def subset(svg,indices):
 root=ET.fromstring(svg);wanted=set(indices)
 for g in list(root[0]):
  if int(g.get('data-logical'))not in wanted:root[0].remove(g)
 require({int(g.get('data-logical'))for g in root[0]}==wanted,'exact logical selection')
 return ET.tostring(root,encoding='unicode')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);args=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==args.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==args.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter changed')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed input changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared static renderer changed')
 guards();r,a,b=load(c);s=importlib.util.spec_from_file_location('u85da_original_parts_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(s);s.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT;candidate=mixed_svg(shared,a,b,r)
 def select(route,query):
  if route in('/','/whole'):require(query=='','whole query rejected');return None
  require(route=='/compare','closed route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'exact selection keys');p=q['pen'][0];v=q['view'][0];require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=18 and v in('current','prefix'),'exact18 current/prefix only');return int(p),v
 def page(route,selection,sources,domestic):
  if selection is None:panels=[('Original publisher18 whole; private native RAM only',shared.domestic_svg(domestic)),('Original u9f55 whole: old齒16raw+乞4raw (blank17metadata retained)',shared.source_svg(b)),('Explicit author fit: complete original齒15 +unchanged original乞13P; unapproved',candidate)]
  else:
   pen,view=selection;prefix=view=='prefix';idx=[x for g in(EXPECTED[:pen]if prefix else[EXPECTED[pen-1]])for x in g];panels=[('Original publisher '+str(pen)+' '+view,shared.domestic_svg(domestic,pen,prefix)),('Mixed source selection canonical raws '+','.join(map(str,idx))+'; unapproved mapping',subset(candidate,idx))]
  pen=selection[0]if selection else 1;view=selection[1]if selection else'current';options=''.join('<option value="'+str(i)+'"'+(' selected'if i==pen else'')+'>'+str(i)+'</option>'for i in range(1,19));form='<form action="/compare" method="get"><select name="pen">'+options+'</select><select name="view"><option value="current">Current</option><option value="prefix"'+(' selected'if view=='prefix'else'')+'>Prefix</option></select><button>Compare</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>齕 complete original donor proposal</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>齕 · complete original齒 donor +original乞 proposal</h1><p><a href="/whole">Whole</a></p>'+form+'<p>Complete old齒34P are explicitly replaced by15 original animCJKJa D/medians through one common author affine. Old乞13P and its guides remain unchanged. Original left/right contact disappears and requires ROOT review. Not an original whole, new engine capture or approved animation.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'recipe':r,'grass':a,'body':b};shared.selection=select;shared.page=page
 for p in range(1,19):
  for view in('current','prefix'):
   select('/compare','pen='+str(p)+'&view='+view);idx=[x for g in(EXPECTED[:p]if view=='prefix'else[EXPECTED[p-1]])for x in g];subset(candidate,idx)
 for route,q in[('/compare','pen=19&view=current'),('/compare','pen=0&view=current'),('/checks',''),('/compare','pen=1&view=current&extra=1')]:
  rejected=False
  try:select(route,q)
  except ValueError:rejected=True
  require(rejected,'foreign selection accepted')
 require(shared.FETCH_COUNT==0,'check-only private fetch forbidden')
 if args.check_only:print(json.dumps({'codeCheck':'PASS','donorOriginalD':15,'retainedOriginalP':13,'logical18':True,'filledPaths':28,'retainedKageCalls':6,'wholeSources':2,'currentAndPrefixSelections':36,'retainedRightPChildrenByteUnchanged':True,'engine':0,'HTTP':0,'server':0,'nativeApproval':False}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(args.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
