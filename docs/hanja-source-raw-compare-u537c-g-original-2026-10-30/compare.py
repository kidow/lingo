"""Closed original 卼 G whole comparison; original private media stays shared server RAM."""
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
  meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch744-2026-10-12/metadata.json").read_bytes());require(c['glyph']=='卼' and c['catalogStrokes']==9 and c['host']=='127.0.0.1' and c['sourceViewBox']=='0 0 200 200','exact original target');require(c['domestic']==meta['dictionary'],'original media metadata');require(c['sourceRoots']=={'original':{'root':'u537c','rawGroups':12,'proofKind':'original-three-fields-separate-header'},'newG':{'root':'u537c-g','rawGroups':11,'proofKind':'original-full5-actual-fixed-engine-once'}} and c['defaultSource']=='newG','exact two public roots');require(c['noPartialAnimation'] and not c['nativeApproval'] and not c['sourceGroupingApproved'] and not c['runtimeApplied'] and not c['sourceGeometryChanged'],'whole only unapproved')
 guards();sources={k:json.loads((ROOT/ref['path']).read_bytes())for k,ref in c['sources'].items()};require(set(sources['original'])=={'groups','trace','defaults'},'old original source fields');require(set(sources['newG'])=={'groups','trace','defaults','engineRevision','engineHashes'},'new exact original full5')
 for k,counts in [('original',(12,16,33)),('newG',(11,18,36))]:
  s=sources[k];require((len(s['groups']),sum(map(len,s['trace'])),sum(len(g['polygons'])for g in s['groups']))==counts,'source counts');require([sum((x['polygons']for x in row),[])for row in s['trace']]==[g['polygons']for g in s['groups']],'original P/call binding');require(all(p['off']==0 for g in s['groups']for poly in g['polygons']for p in poly),'original off0');
 require(sources['newG']['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f' and len(sources['newG']['engineHashes'])==8,'fixed actual engine evidence')
 source=json.loads((ROOT/c['originalSourceRecord']['path']).read_bytes());require(source['root']=='u537c-g' and source['rootVersion']==2 and source['recordVersions']=={'u537c-g':'2','u5140-10':'1','u5371-j':'2'} and source['completeClosure'] and not source['missing'],'complete original API root')
 spec=importlib.util.spec_from_file_location('original_wuG_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 def selection(route,query):
  require(route in('/','/whole') and not query,'exact whole-only route');return None
 shared.selection=selection
 if args.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(9)]};selection('/whole','');page=shared.page('/whole',None,sources,dummy);require(page.count('<section class="panel">')==3,'three whole panels')
  for route,query in[('/compare',''),('/checks',''),('/whole','pen=1')]:
   reject=False
   try:selection(route,query)
   except ValueError:reject=True
   require(reject,'foreign selection accepted')
  for key,P in [('original',33),('newG',36)]:require(len(ET.fromstring(shared.source_svg(sources[key])).findall('.//{http://www.w3.org/2000/svg}path'))==P,'original source painted once per P')
  require(shared.FETCH_COUNT==0,'no private preparation fetch');print(json.dumps({'status':'PASS-CODE-ONLY','wholePanels':3,'newOriginalRaw':11,'newOriginalCalls':18,'newOriginalP':36,'oldOriginalRaw':12,'oldOriginalP':33,'sourceGeometryChanged':False,'sourceGroupingApproved':False,'nativeApproval':False,'HTTP':0,'engine':0,'server':0}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
