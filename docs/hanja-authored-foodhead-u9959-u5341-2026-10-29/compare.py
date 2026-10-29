#!/usr/bin/env python3
# Candidate-owned static comparison only; public donor D replaces full original raw3 H.
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,math,xml.etree.ElementTree as ET
from fractions import Fraction
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
CONFIG=HERE/'config.json'
RECIPE_SHA='0189af9c276c8c8570d2479264e4e5874f659d57afe0dc21d06924f971aeaab8'
NS='{http://www.w3.org/2000/svg}'
ET.register_namespace('',NS[1:-1])
def require(ok,msg):
 if not ok:raise ValueError(msg)
def sha(b):return hashlib.sha256(b).hexdigest()
def compact(v):return json.dumps(v,ensure_ascii=False,separators=(',',':')).encode()
def pinned(p):
 q=Path(p['path']);require(not q.is_absolute()and'..'not in q.parts,'local artifact path required');b=(ROOT/q).read_bytes();require(sha(b)==p['SHA256'],'fixed input changed');return json.loads(b)
def load(c):
 r=pinned(c['recipe']);ready=pinned(c['readiness']);require(c['recipe']['SHA256']==RECIPE_SHA and ready['recipe']==c['recipe'],'closed author recipe required')
 require(r['mixedParts']is True and r['originalWhole']is False and r['isOriginalEngineCapture']is False and not any(r['approval'].values()),'unapproved authored source required')
 o=pinned(r['sources']['recipient']);d=pinned(r['sources']['donor']);require(len(o['groups'])==24 and sum(len(g['polygons'])for g in o['groups'])==41,'original24raw41P required')
 require(sha(d['originalRecordJSON'].encode())==d['originalRecordSHA256']and json.loads(d['originalRecordJSON'])==d['record'],'exact original donor record required')
 p=r['replacement'];require(p['recipientRawOneBased']==3 and p['donorOriginalPathOneBased']==p['donorOriginalMedianOneBased']==1,'raw3 replaced by original H1 required')
 require(sha(d['record']['strokes'][0].encode())==p['originalDSHA256']and sha(compact(d['record']['medians'][0]))==p['originalMedianSHA256'],'original D/median unchanged required')
 require(sha(compact([g for i,g in enumerate(o['groups'])if i!=2]))==r['retained']['groupsSHA256']and sha(compact([g for i,g in enumerate(o['trace'])if i!=2]))==r['retained']['traceSHA256'],'all non-target P/guide/flags preserved')
 M=list(map(Fraction,p['matrixExact']));a,b,cc,dd,e,f=M;require(a*dd-b*cc<0,'exact one source-y-up reflection required')
 for original,placed in zip(d['record']['medians'][0],p['transformedMedianExact']):
  x,y=map(Fraction,original);require([a*x+cc*y+e,b*x+dd*y+f]==list(map(Fraction,placed)),'median same frame required')
 require(list(map(Fraction,p['transformedMedianExact'][0]))==[Fraction(182,5),58]and list(map(Fraction,p['transformedMedianExact'][-1]))==[Fraction(3571,50),58],'declared author anchors required')
 return r,o,d['record']
def authored(shared,r,o,d,count=None,prefix=False):
 original=ET.fromstring(shared.source_svg(o,count,prefix));before={g.get('data-original-raw'):ET.tostring(g)for g in original[0]}
 for g in list(original[0]):
  if g.get('data-original-raw')=='3':
   at=list(original[0]).index(g);original[0].remove(g)
   replacement=ET.Element(NS+'g',{'data-authored-source-raw-slot':'3','data-original-MM-donor':'u5341-path1','transform':'matrix('+' '.join(format(float(Fraction(v)),'.17g')for v in r['replacement']['matrixExact'])+')'})
   ET.SubElement(replacement,NS+'path',{'d':d['strokes'][0]});original[0].insert(at,replacement)
 for g in original[0]:
  k=g.get('data-original-raw')
  if k is not None:require(ET.tostring(g)==before[k],'non-target SVG subtree changed')
 expected=sum(len(g['polygons'])for i,g in enumerate(o['groups'])if count is None or i<count if prefix or count is None or i==count-1)
 if count is None:require(len(list(original.iter(NS+'path')))==40,'39 retained P plus1whole donor H required')
 require(not list(original.iter(NS+'script'))and not list(original.iter(NS+'use')),'no active geometry required')
 return ET.tostring(original,encoding='unicode')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);args=ap.parse_args()
 raw=CONFIG.read_bytes();require(sha(raw)==args.config_sha,'exact config required');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==args.config_sha,'config changed');require(c['adapter']['SHA256']==sha(Path(__file__).read_bytes()),'adapter changed')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'source pin changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared server changed')
 guards();r,o,d=load(c);sp=importlib.util.spec_from_file_location('u9959_MM_H_static_shared',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(sp);sp.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT
 def select(route,query):require(route in('/','/whole','/head','/stroke')and query=='','closed static route required');return route
 def page(route,selected,sources,domestic):
  count=3 if route in('/head','/stroke')else None;prefix=route=='/head'
  panels=[('Original publisher whole/current/prefix; local RAM only',shared.domestic_svg(domestic,count,prefix)),('Original public HKCS raw prefix/current; no logical mapping claim',shared.source_svg(o,count,prefix)),('Authored whole H replacement; no native approval',authored(shared,r,o,d,count,prefix))]
  return '<!doctype html><meta charset="utf-8"><title>饙 authored raw3 H candidate</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>饙 · explicitly authored public H replacement</h1><p><a href="/whole">Whole</a> · <a href="/head">First3 source-raw/publisher prefix</a> · <a href="/stroke">Raw3 / publisher3 current (mapping unapproved)</a></p><p>Exact original 十 H under an explicit author matrix replaces the full original raw3 H. Other39 public P unchanged. This is not an original engine capture, a bridge, publisher outline identity, or approved animation.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'recipe':r,'original':o,'donor':d};shared.selection=select;shared.page=page
 for route in ['/whole','/head','/stroke']:select(route,'');authored(shared,r,o,d,3 if route!='/whole'else None,route=='/head')
 require(shared.FETCH_COUNT==0,'check cannot fetch private media')
 if args.check_only:print(json.dumps({'staticCandidate':'PASS-code-only','originalRaw':24,'retainedOriginalP':39,'candidatePaths':40,'donorOriginalD':1,'nativeApproval':False,'runtimeApplied':False,'HTTP':0,'server':0}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(args.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
