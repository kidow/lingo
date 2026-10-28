#!/usr/bin/env python3
# Closed static-only original-clock-informed16 selections. No timing/mask derivation.
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE=HERE/'compare.py'
assert hashlib.sha256(BASE.read_bytes()).hexdigest()=='fb87de726f21566ba4513d8ec26e2d16aa2de13844cb526c0e12413b7defd082','fixed original H adapter required'
s=importlib.util.spec_from_file_location('u9917_original_public_H_static',BASE);base=importlib.util.module_from_spec(s);s.loader.exec_module(base)
base.RECIPE_SHA='4748fc6619743e9b6b22a548a31f7ec8045d30c22534b012938a26c65dca2b96'
EXPECTED=[[1],[2],[3],[5,6],[7],[8],[4],[9],[10],[11],[12],[13,14],[15],[16],[17],[18]]
MAPPING_SHA='6b2537753cf19bd5c1494e37d9f9de72f5eeb316d0e7a4ddab266b7d1082e532'
def selected_svg(svg,indices):
 node=ET.fromstring(svg);wanted=set(indices)
 for g in list(node[0]):
  raw=g.get('data-original-raw')or g.get('data-authored-source-raw-slot')
  base.require(raw is not None,'exact original raw owner required')
  if int(raw)not in wanted:node[0].remove(g)
 return ET.tostring(node,encoding='unicode')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);args=ap.parse_args()
 path=HERE/'config-mapping-v2.json';raw=path.read_bytes();base.require(base.sha(raw)==args.config_sha,'exact config required');c=json.loads(raw)
 def guards():
  base.require(base.sha(path.read_bytes())==args.config_sha and c['adapter']['SHA256']==base.sha(Path(__file__).read_bytes()),'config/adapter changed')
  for p,h in c['inputSHA256'].items():base.require(base.sha((ROOT/p).read_bytes())==h,'fixed input changed')
  base.require(base.sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared static helper changed')
 guards();r,o,d=base.load(c);m=base.pinned(c['mapping']);base.require(c['mapping']['SHA256']==MAPPING_SHA and[mr['sourceRawOneBased']for mr in m['mapping']]==EXPECTED,'closed clock-informed mapping required')
 base.require(m['approval']['rawToLogical']is False and m['approval']['temporal']is False and sorted(x for g in EXPECTED for x in g)==list(range(1,19)),'static-only exact18raw partition required')
 sp=importlib.util.spec_from_file_location('u9917_original_static_shared',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(sp);sp.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT
 original=shared.source_svg(o);candidate=base.authored(shared,r,o,d)
 def select(route,query):
  if route in('/','/whole'):base.require(query=='','whole query rejected');return None
  base.require(route=='/compare','closed compare route required');q=parse_qs(query,keep_blank_values=True);base.require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'exact selection keys required');p=q['pen'][0];v=q['view'][0];base.require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=16 and v in('current','prefix'),'fixed16 pen/current/prefix required');return int(p),v
 def page(route,selection,data,domestic):
  if selection is None:pen=None;prefix=False;indices=list(range(1,19))
  else:pen,view=selection;prefix=view=='prefix';indices=[x for g in(EXPECTED[:pen]if prefix else[EXPECTED[pen-1]])for x in g]
  opts=''.join('<option value="'+str(i)+'"'+(' selected'if i==pen else'')+'>'+str(i)+'</option>'for i in range(1,17));form='<form action="/compare" method="get"><label>Publisher pen <select name="pen">'+opts+'</select></label><select name="view"><option value="current">Current</option><option value="prefix"'+(' selected'if prefix else'')+'>Prefix</option></select><button>Compare</button></form>'
  panels=[('Original publisher '+str(pen or'whole'),shared.domestic_svg(domestic,pen,prefix)),('Original HKCS source raws '+','.join(map(str,indices)),selected_svg(original,indices)),('Authored H replacement, clock-informed static selection; mapping unapproved',selected_svg(candidate,indices))]
  return '<!doctype html><meta charset="utf-8"><title>餗 proposed16 static selections</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{width:520px;height:520px;display:block}</style><h1>餗 · static original-clock-informed16 selections</h1><p><a href="/whole">Whole</a></p>'+form+'<p>Original domestic order places source raw5/6 at pen4, raw4 at pen7, raw13/14 at pen12. These are hypotheses until directly compared. Static subsets preserve original raw paint order; no temporal geometry, mask, speed or animation is generated.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'recipe':r,'original':o,'donor':d};shared.selection=select;shared.page=page
 for p in range(1,17):
  for view in('current','prefix'):
   chosen=select('/compare','pen='+str(p)+'&view='+view);idx=[x for g in(EXPECTED[:p]if view=='prefix'else[EXPECTED[p-1]])for x in g];node=ET.fromstring(selected_svg(candidate,idx));base.require(len(node[0])==len(idx),'exact selected raw slots required')
 for route,q in[('/compare','pen=17&view=current'),('/compare','pen=0&view=current'),('/checks',''),('/compare','pen=1&view=current&other=x')]:
  rejected=False
  try:select(route,q)
  except ValueError:rejected=True
  base.require(rejected,'foreign selection must reject')
 base.require(shared.FETCH_COUNT==0,'check-only private fetch forbidden')
 if args.check_only:print(json.dumps({'staticMappingCheck':'PASS','currentAndPrefixSelections':32,'exactRawPartition':18,'publisherPens':16,'temporalGeometry':0,'nativeMappingApproved':False,'HTTP':0,'server':0}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(args.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
