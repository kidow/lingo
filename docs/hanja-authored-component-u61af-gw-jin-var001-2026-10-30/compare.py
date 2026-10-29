"""Closed explicit complete-var001 mixed 憯 whole comparison; original private media stays shared server RAM."""
import argparse,hashlib,importlib.util,json,sys,xml.etree.ElementTree as ET
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,m):
 if not x:raise ValueError(m)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--port',type=int,default=0);ap.add_argument('--check-only',action='store_true');args=ap.parse_args();require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback only');c=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==c['adapterSHA256'],'adapter/config pin');require(sha(ROOT/SHARED)==SHARED_SHA,'shared renderer pin')
  for p,h in c['inputSHA256'].items():require(sha(ROOT/p)==h,'fixed input '+p)
  meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch909-2026-10-13/metadata.json").read_bytes());require(c['glyph']=='憯' and c['catalogStrokes']==15 and c['host']=='127.0.0.1' and c['sourceViewBox']=='0 0 200 200','exact original target');require(c['domestic']==meta['dictionary'],'original media metadata');require(c['sourceRoots']=={'original':{'root':'u61af','rawGroups':19,'proofKind':'original-three-fields-separate-header'},'author':{'root':'authored-u61af-complete-u5153-var001','rawGroups':19,'proofKind':'explicit-original-whole-donor-affine-assembly-not-engine-capture'}} and c['defaultSource']=='author','exact two public roots');require(c['noPartialAnimation'] and not c['nativeApproval'] and not c['sourceGroupingApproved'] and not c['runtimeApplied'] and c['sourceGeometryChanged'],'whole only unapproved')
 guards();sources={k:json.loads((ROOT/ref['path']).read_bytes())for k,ref in c['sources'].items()};require(set(sources['original'])=={'groups','trace','defaults'},'old original source fields');require(set(sources['author'])=={'groups','trace','defaults'},'authored assembly separate from original engine proof')
 for k,counts in [('original',(19,21,41)),('author',(19,21,39))]:
  s=sources[k];require((len(s['groups']),sum(map(len,s['trace'])),sum(len(g['polygons'])for g in s['groups']))==counts,'source counts');require([sum((x['polygons']for x in row),[])for row in s['trace']]==[g['polygons']for g in s['groups']],'original P/call binding');require(all(p['off']==0 for g in s['groups']for poly in g['polygons']for p in poly),'original off0');
 recipe=json.loads((ROOT/c['recipe']['path']).read_bytes());require(c['recipe']['SHA256']=='ee61527a38b0923f7e3b32339b3a0d739f58d8677c51f4abfbf48fe025a5dc6c' and recipe['mixedParts'] and recipe['locallyAuthoredRoot'] and not recipe['originalWhole'] and not recipe['authorWholeEngineCapture'] and not recipe['nativeStaticApproved'] and not recipe['mappingApproved'],'explicit unapproved whole author recipe')
 donor=json.loads((ROOT/recipe['donor']['path']).read_bytes());require(set(donor)=={'groups','trace','defaults','engineRevision','engineHashes'} and len(donor['groups'])==11 and len(donor['engineHashes'])==8,'independent original donor proof')
 retain=[1,2,3,15,16,17,18,19];require(all(sources['original']['groups'][n-1]==sources['author']['groups'][i if i<3 else i+11] and sources['original']['trace'][n-1]==sources['author']['trace'][i if i<3 else i+11] for i,n in enumerate(retain)),'all retained P and calls exact')
 spec=importlib.util.spec_from_file_location('jin_var001_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 def selection(route,query):
  require(route in('/','/whole') and not query,'exact whole-only route');return None
 shared.selection=selection
 if args.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(15)]};selection('/whole','');page=shared.page('/whole',None,sources,dummy);require(page.count('<section class="panel">')==3,'three whole panels')
  for route,query in[('/compare',''),('/checks',''),('/whole','pen=1')]:
   reject=False
   try:selection(route,query)
   except ValueError:reject=True
   require(reject,'foreign selection accepted')
  for key,P in [('original',41),('author',39)]:require(len(ET.fromstring(shared.source_svg(sources[key])).findall('.//{http://www.w3.org/2000/svg}path'))==P,'original source painted once per P')
  require(shared.FETCH_COUNT==0,'no private preparation fetch');print(json.dumps({'status':'PASS-CODE-ONLY','wholePanels':3,'authorRaw':19,'authorCalls':21,'authorP':39,'oldOriginalRaw':19,'oldOriginalP':41,'sourceGeometryChanged':True,'sourceGroupingApproved':False,'nativeApproval':False,'HTTP':0,'engine':0,'server':0}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
