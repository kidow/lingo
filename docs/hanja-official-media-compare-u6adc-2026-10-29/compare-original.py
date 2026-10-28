import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
OLD='docs/hanja-goal-glyphwiki-batch438-2026-10-09/'
ENGINE=OLD+'engine-proof.json';ENGINE_SHA='e0ddc60691b7d6e4050407cc2d08fccd414ba5e8cb2c5a83ff04ec21d9cdfece'
TRACE=OLD+'draw-trace.json';TRACE_SHA='50cecf06fa16deecdda2e954c13444171839ecf47928789204b02d71a8dded8f'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--check-only',action='store_true');p.add_argument('--port',type=int);a=p.parse_args();cfgpath=HERE/'config-original.json';config=json.loads(cfgpath.read_bytes())
 def guards():
  require(sha(cfgpath)==a.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exact config/adapter')
  require(config['schema']=='hanja-exact-original-archive-static-comparison/v1'and config['glyph']=='櫜'and config['catalogStrokes']==19 and config['sourceViewBox']=='0 0 200 200'and config['host']=='127.0.0.1','exact original context')
  require(config['defaultSource']=='default'and config['sourceRoots']=={'default':{'root':'u6adc','rawGroups':23,'proofKind':'existing-fixed-original-archive-engine-and-draw-trace'}},'only existing default whole')
  require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA}and sha(ROOT/SHARED)==SHARED_SHA,'unchanged shared comparator')
  require(sha(ROOT/ENGINE)==ENGINE_SHA and sha(ROOT/TRACE)==TRACE_SHA,'fixed public complete original proof')
  for f,h in config['inputSHA256'].items():require(sha(ROOT/f)==h,'input changed:'+f)
  meta=json.loads((ROOT/(OLD+'metadata.json')).read_bytes());require(config['domestic']=={**meta['dictionary'],'clips':19,'privateMediaSaved':False},'original RAM-only media pin')
  require(config['nativeApproval']is False and config['runtimeApplied']is False and config['noPartialAnimation']is True and config['geometryChanged']is False,'no source or runtime approval')
 guards();proof=json.loads((ROOT/ENGINE).read_bytes());trace=json.loads((ROOT/TRACE).read_bytes())
 require(len(proof['groups'])==len(trace)==23 and sum(map(len,trace))==23 and sum(len(g['polygons'])for g in proof['groups'])==38,'complete original23raw23call38P')
 require([g['polygons']for g in proof['groups']]==[[p for c in row for p in c['polygons']]for row in trace],'same original P in proof and trace')
 require(trace[17][0]['kind']=='cdDrawLine'and trace[17][0]['args']==[127.9,71.55,127.9,101.15,0,200],'one-based18 is V')
 require(trace[18][0]['kind']=='cdDrawLine'and trace[18][0]['args']==[127.9,86.35,174.7,86.35,0,100],'one-based19 is H')
 proof={**proof,'trace':trace};sources={'default':proof}
 sp=importlib.util.spec_from_file_location('gao_existing_original_static',ROOT/SHARED);s=importlib.util.module_from_spec(sp);sp.loader.exec_module(s);require(s.FETCH_COUNT==0,'private fetch only by root server')
 s.CONFIG=config;s.ROOT=ROOT;s.HERE=HERE;s.guards=guards;s.load_sources=lambda:sources
 old_selection=s.selection
 def selection(route,query):
  require(route!='/checks','legacy whole verifier already preserved; no new approval');return old_selection(route,query)
 s.selection=selection
 if a.check_only:
  synthetic={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for i in range(19)]}
  require(s.page('/whole',s.selection('/whole',''),sources,synthetic).count('<section class="panel">')==2,'actual whole two panels')
  for domestic,raw in[(11,18),(12,19)]:
   q=s.selection('/compare','source=default&domestic='+str(domestic)+'&raw='+str(raw)+'&dview=single&rview=single')
   require(s.page('/compare',q,sources,synthetic).count('<section class="panel">')==2,'actual current pair two panels')
  require(s.FETCH_COUNT==0,'check only HTTP0')
  print(json.dumps({'glyph':'櫜','raw':23,'calls':23,'P':38,'wholeAndTwoCurrentPageContracts':'PASS','oneBased18':'V','oneBased19':'H','oldREADMEIndexNotTransferred':True,'mappingApproved':False,'newGeometry':False,'newEngine':0,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False));return
 require(a.port is not None and 0<=a.port<=65535,'explicit local port');old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(a.port)];s.main()
 finally:sys.argv=old
if __name__=='__main__':main()
