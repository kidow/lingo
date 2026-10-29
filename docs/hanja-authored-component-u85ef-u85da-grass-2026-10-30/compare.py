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
RECIPE_SHA="ad9bd120ad06c772b6426d3479cee39ad254621bce8c939317dd9ae58d71baf4"
EXPECTED=[[1],[2],[4],[3],[6,7],[8],[5],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20]]
def require(ok,msg):
 if not ok:raise ValueError(msg)
def sha(v):return hashlib.sha256(v).hexdigest()
def pinned(p):
 q=Path(p['path']);require(not q.is_absolute()and'..'not in q.parts,'local source artifact only');raw=(ROOT/q).read_bytes();require(sha(raw)==p['SHA256'],'source changed');return json.loads(raw)
def load(c):
 r=pinned(c['recipe']);ready=pinned(c['readiness']);require(c['recipe']['SHA256']==RECIPE_SHA and ready['recipe']==c['recipe'],'closed mixed proposal')
 require(r['glyph']=='藯'and r['mixedParts']is True and r['originalWhole']is False and not r['isOriginalEngineCapture']and not r['isActualLocallyAuthoredEngineCapture']and not r['sourceTraceDescribesAuthoredWhole']and not any(r['approval'].values()),'unapproved explicit mixed source only')
 a=pinned(r['sources']['grass']);b=pinned(r['sources']['body']);pinned(r['sources']['fixedRecords']);pinned(r['sources']['recipientRecords']);old=pinned(r['sources']['recipientThreeFieldWhole']);require(sorted(old)==['defaults','groups','trace']and all(old[k]==b[k]for k in old),'original three-field source unchanged; real full5 source body required')
 for s in[a,b]:
  require(sorted(s)==['defaults','engineHashes','engineRevision','groups','trace'],'original full5 source required')
  for g,t in zip(s['groups'],s['trace']):require([p for call in t for p in call['polygons']]==g['polygons'],'exact original trace polygons')
  require(all(v['off']==0 for g in s['groups']for p in g['polygons']for v in p),'closed original off0 P required')
 require([len(a['groups']),len(b['groups'])]==[21,19]and sum(len(g['polygons'])for g in a['groups'])==39 and sum(len(g['polygons'])for g in b['groups'])==49,'fixed whole source counts')
 require(a['engineRevision']==b['engineRevision']and a['engineHashes']==b['engineHashes']and a['defaults']==b['defaults'],'original code/header/defaults exact')
 require(r['logicalRawGroupsOneBased']==EXPECTED and sorted(x for g in EXPECTED for x in g)==list(range(1,21)),'exact20raw/19logical hypothesis')
 require(r['parts'][0]['sourceRawOneBased']==[1,2,3,4]and r['parts'][1]['sourceRawOneBased']==list(range(4,20))and all(p['matrixExact']==['1','0','0','1','0','0']for p in r['parts']),'complete identity source components only')
 return r,a,b
def mixed_svg(shared,a,b):
 sa=ET.fromstring(shared.source_svg(a));sb=ET.fromstring(shared.source_svg(b));require(sa.get('viewBox')=='0 0 200 200'and sb.get('viewBox')=='0 0 200 200','one shared source-world200 frame');require(sa[0].attrib==sb[0].attrib,'same original paint properties')
 root=ET.Element(NS+'svg',{'viewBox':'0 0 200 200','width':'200','height':'200','data-explicit-mixed-original-parts':'true'});outer=ET.SubElement(root,NS+'g',dict(sa[0].attrib));selected=[('donor-u85da-VS3',g)for g in list(sa[0])[:4]]+[('recipient-u85ef',g)for g in list(sb[0])[3:]]
 for i,(owner,g)in enumerate(selected,1):
  n=copy.deepcopy(g);before=[ET.tostring(x)for x in g];n.set('data-mixed-raw',str(i));n.set('data-source-variant',owner);n.set('data-source-original-raw',g.get('data-original-raw'));require([ET.tostring(x)for x in n]==before,'source path child bytes changed');outer.append(n)
 require(len(outer)==20 and len(list(root.iter(NS+'path')))==51,'selected20raw/51P');require(not any(list(root.iter(NS+t))for t in['script','use','mask','clipPath']),'no hidden active or clipped geometry')
 return ET.tostring(root,encoding='unicode')
def subset(svg,indices):
 root=ET.fromstring(svg);wanted=set(indices)
 for g in list(root[0]):
  raw=g.get('data-mixed-raw');require(raw is not None,'mixed source owner required')
  if int(raw)not in wanted:root[0].remove(g)
 require(len(root[0])==len(wanted),'exact selected raw slots')
 return ET.tostring(root,encoding='unicode')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);args=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==args.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==args.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter changed')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed input changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared static renderer changed')
 guards();r,a,b=load(c);s=importlib.util.spec_from_file_location('u85ef_original_parts_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(s);s.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT;candidate=mixed_svg(shared,a,b)
 def select(route,query):
  if route in('/','/whole'):require(query=='','whole query rejected');return None
  require(route=='/compare','closed route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'exact selection keys');p=q['pen'][0];v=q['view'][0];require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=19 and v in('current','prefix'),'exact19 current/prefix only');return int(p),v
 def page(route,selection,sources,domestic):
  if selection is None:panels=[('Original publisher19 whole; private native RAM only',shared.domestic_svg(domestic)),('Original u85ef whole: connected grass3 / original body16raw',shared.source_svg(b)),('Authored mixed complete donor grass4 + exact recipient body16raw; unapproved',candidate)]
  else:
   pen,view=selection;prefix=view=='prefix';idx=[x for g in(EXPECTED[:pen]if prefix else[EXPECTED[pen-1]])for x in g];panels=[('Original publisher '+str(pen)+' '+view,shared.domestic_svg(domestic,pen,prefix)),('Mixed source selection canonical raws '+','.join(map(str,idx))+'; unapproved mapping',subset(candidate,idx))]
  pen=selection[0]if selection else 1;view=selection[1]if selection else'current';options=''.join('<option value="'+str(i)+'"'+(' selected'if i==pen else'')+'>'+str(i)+'</option>'for i in range(1,20));form='<form action="/compare" method="get"><select name="pen">'+options+'</select><select name="view"><option value="current">Current</option><option value="prefix"'+(' selected'if view=='prefix'else'')+'>Prefix</option></select><button>Compare</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>藯 mixed original parts proposal</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>藯 · explicit mixed original-P identity proposal</h1><p><a href="/whole">Whole</a></p>'+form+'<p>Complete source99 components only. Original world coordinates, filled paths, guides and flags are unchanged. This is an authored component assembly, not an engine whole or approved animation.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'recipe':r,'grass':a,'body':b};shared.selection=select;shared.page=page
 for p in range(1,20):
  for view in('current','prefix'):
   select('/compare','pen='+str(p)+'&view='+view);idx=[x for g in(EXPECTED[:p]if view=='prefix'else[EXPECTED[p-1]])for x in g];subset(candidate,idx)
 for route,q in[('/compare','pen=20&view=current'),('/compare','pen=0&view=current'),('/checks',''),('/compare','pen=1&view=current&extra=1')]:
  rejected=False
  try:select(route,q)
  except ValueError:rejected=True
  require(rejected,'foreign selection accepted')
 require(shared.FETCH_COUNT==0,'check-only private fetch forbidden')
 if args.check_only:print(json.dumps({'codeCheck':'PASS','sourceRaw':20,'logical19':True,'P':51,'Q':10,'wholeSources':2,'currentAndPrefixSelections':38,'originalPChildrenByteUnchanged':True,'engine':0,'HTTP':0,'server':0,'nativeApproval':False}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(args.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
