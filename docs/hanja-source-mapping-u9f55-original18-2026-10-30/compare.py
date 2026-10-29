#!/usr/bin/env python3
# Original whole geometry only; new logical selection hypothesis, no outline/guide edits.
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json';NS='{http://www.w3.org/2000/svg}';ET.register_namespace('',NS[1:-1])
def require(x,m):
 if not x:raise ValueError(m)
def sha(x):return hashlib.sha256(x).hexdigest()
def pinned(p):
 raw=(ROOT/p['path']).read_bytes();require(sha(raw)==p['SHA256'],'fixed source changed');return json.loads(raw)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==a.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==a.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter pin')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'input pin')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared pin')
 guards();proof=pinned(c['source']);mappingDoc=pinned(c['mapping']);mapping=mappingDoc['mappingsOneBased']['default'];require(sorted(proof)==['defaults','engineHashes','engineRevision','groups','trace']and len(proof['groups'])==21 and len(proof['trace'])==21,'actual original full5 file only')
 require(sum(len(g['polygons'])for g in proof['groups'])==47 and sum(map(len,proof['trace']))==22,'original21raw22call47P')
 require(mapping==c['logicalRawGroupsOneBased']and len(mapping)==18 and sorted(x for g in mapping for x in g)==[n for n in range(1,22)if n!=17] and proof['groups'][16]['polygons']==[] and proof['trace'][16]==[],'all20 paint raw once; empty17 preserved')
 for g,t in zip(proof['groups'],proof['trace']):require(g['polygons']==[p for call in t for p in call['polygons']],'original trace P')
 spec=importlib.util.spec_from_file_location('u61af_original_default_mapping',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT;whole=shared.source_svg(proof);require(ET.fromstring(whole).get('viewBox')=='0 0 200 200','original world200')
 def subset(indices):
  x=ET.fromstring(whole);wanted=set(indices)
  for g in list(x[0]):
   if int(g.get('data-original-raw'))not in wanted:x[0].remove(g)
  require({int(g.get('data-original-raw'))for g in x[0]}==wanted,'exact original raw subset');return ET.tostring(x,encoding='unicode')
 def selection(route,query):
  if route in('/','/whole'):require(not query,'whole query');return None
  require(route=='/compare','closed route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'keys');p=q['pen'][0];v=q['view'][0];require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=18 and v in('current','prefix'),'range');return int(p),v
 def page(route,selected,sources,domestic):
  if selected is None:panels=[('Publisher original18 whole RAM only',shared.domestic_svg(domestic)),('Original default whole; unchanged47P',whole)]
  else:
   pen,view=selected;prefix=view=='prefix';ids=[x for g in(mapping[:pen]if prefix else[mapping[pen-1]])for x in g];panels=[('Publisher '+str(pen)+' '+view,shared.domestic_svg(domestic,pen,prefix)),('Original default source raw '+','.join(map(str,ids))+'; mapping unapproved',subset(ids))]
  form='<form action="/compare"><select name="pen">'+''.join('<option>'+str(i)+'</option>'for i in range(1,19))+'</select><select name="view"><option>current</option><option>prefix</option></select><button>Compare</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>齕 original default mapping diagnostic</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>齕 · unchanged original default whole</h1><a href="/whole">Whole</a>'+form+'<p>Original21raw22calls47P unchanged; empty raw17 metadata remains in full source. Native18 clock reused; all logical selections are hypotheses. Inspect logical14 first: raw5 V ends exactly at raw16 H start (22,170), but raw16 remains horizontal rather than observed rising NE, and raw5 filled foot extends to y190 below H band168..172. Both 人 tiers lie within original enclosure height; this does not approve direction or foot shape. Default and ue0100 are byte-identical. No mixed parts, guide edit, temporal approval, font exemption or new engine.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'default':proof};shared.selection=selection;shared.page=page
 for pen in range(1,19):
  for view in('current','prefix'):
   selection('/compare','pen='+str(pen)+'&view='+view);subset([x for g in(mapping[:pen]if view=='prefix'else[mapping[pen-1]])for x in g])
 require(shared.FETCH_COUNT==0,'check-only no private fetch')
 if a.check_only:print(json.dumps({'status':'PASS-code-only','sourceRaw21':True,'sourceCalls22':True,'sourceP47':True,'logical18':True,'sourceSelections36':True,'wholeOriginal':True,'originalPointAndGuideEdits':0,'HTTP':0,'server':0,'nativeApproval':False}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
