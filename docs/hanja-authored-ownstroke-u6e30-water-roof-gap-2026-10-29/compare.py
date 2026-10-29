"""Exact 渰 original/whole-affine candidate comparison. Private media stays shared server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
ROOTS={"original":{"root":"u6e30","rawGroups":15,"drawingCalls":15,"polygons":27,"file":"docs/hanja-goal-glyphwiki-batch710-2026-10-12/engine-proof.json","fileSHA256":"0249f2f845e8ca26004e94bcb385d36ca4cfc77d1bfbd83eb562a203fc30b8e8","proofKind":"actual-original-full5-public-source-matches3keycapture"},"candidate":{"root":"lingo-u6e30-water-raw4-positiveX-gap1-draft","rawGroups":15,"drawingCalls":15,"polygons":27,"file":"docs/hanja-authored-ownstroke-u6e30-water-roof-gap-2026-10-29/fixture.pending.json","fileSHA256":"6ba8d4f411d8931a3e88ead9ec12d538da44142c1239833ff7786368879324b7","proofKind":"locally-authored-whole-water-affine-not-engine-capture"}}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
 require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback');config=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed config/adapter')
  require(sha(ROOT/SHARED)==SHARED_SHA and config['sourceRoots']==ROOTS and config['defaultSource']=='candidate','exact shared/source roots')
  require(config['glyph']=='渰'and config['catalogStrokes']==12 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','exact context')
  require(config['nativeApproval']is config['runtimeApplied']is config['sourceGroupingApproved']is False and config['sourceGeometryChanged']is config['noPartialAnimation']is True,'unapproved static scope')
  meta=json.loads((ROOT/'docs/hanja-goal-glyphwiki-batch710-2026-10-12/metadata.json').read_bytes());require(config['domestic']==meta['dictionary'],'exact private metadata only')
  for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
 guards();sources={}
 for key,entry in ROOTS.items():
  require(sha(ROOT/entry['file'])==entry['fileSHA256'],'source pin');v=json.loads((ROOT/entry['file']).read_bytes())
  require(len(v['groups'])==15 and len(sum(v['trace'],[]))==15 and sum(len(g['polygons'])for g in v['groups'])==27,'15/15/27')
  require([sum((c['polygons']for c in calls),[])for calls in v['trace']]==[g['polygons']for g in v['groups']],'P trace exact');sources[key]=v
 a,b=sources['original'],sources['candidate'];require(set(a)=={'engineRevision','engineHashes','groups','trace','defaults'},'original full5 only')
 require(b['schema']=='hanja-authored-fixed-source-groups/v1'and b['isOriginalEngineCapture']is b['originalWhole']is b['nativeApproval']is b['runtimeApplied']is False,'authored identity')
 require(all(b['groups'][i]==a['groups'][i]and b['trace'][i]==a['trace'][i]for i in range(15)if i!=3),'other14raw exact')
 spec=importlib.util.spec_from_file_location('sui_ear_static_core',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
 require(shared.FETCH_COUNT==0,'HTTP0 preparation');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 original_selection=shared.selection;original_page=shared.page
 def selection(route,query):
  if route=='/water':require(not query,'water noquery');return None
  if route=='/public-pair':require(not query,'publicpair noquery');return None
  require(route!='/checks','no new engine checks');return original_selection(route,query)
 def page(route,selected,src,domestic):
  if route=='/water':
   ds=shared.domestic_svg(domestic,3,False);panels=[('국내3',ds),('원본 raw3+4',shared.source_svg({'groups':[src['original']['groups'][2],src['original']['groups'][3]]})),('후보 raw3+4',shared.source_svg({'groups':[src['candidate']['groups'][2],src['candidate']['groups'][3]]}))];return '<!doctype html><meta charset="utf-8"><title>渰 water 정적 비교</title><style>body{font:16px system-ui}h1{font-size:28px}h2{font-size:20px}.grid{display:flex;gap:20px;width:max-content}svg{width:520px;height:520px}</style><h1>渰 water3 / 공개base3+ending4 가설</h1><p>정적형태 비교만, grouping/guide순서/temporal미승인</p><div class="grid">'+''.join('<section><h2>'+label+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
  if route=='/public-pair':return (HERE/'public-pair.html').read_text()
  return original_page(route,selected,src,domestic).replace('원proof exact·새 header/sourcecompiler/engine/projection0·native/runtimefalse.','원본 full5 보존·후보는 명시적 저자 whole affine이며 enginecapture 아님·native/runtimefalse.').replace('<nav>','<nav><a href="/public-pair">공개 전체·raw4·raw3+4+6 비교</a>')
 shared.selection=selection;shared.page=page
 if args.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(12)]}
  require(selection('/whole','')is None and page('/whole',None,sources,dummy).count('<section class="panel">')==3,'actual whole page')
  for source in ROOTS:
   for domestic,raw in[(3,4),(4,6)]:
    for mode in['single','prefix']:
     x=selection('/compare','source='+source+'&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(page('/compare',x,sources,dummy).count('<section class="panel">')==2,'actual compare page')
  require(page('/water',selection('/water',''),sources,dummy).count('<svg ')==3,'water3pairedsource groups');require(page('/public-pair',selection('/public-pair',''),sources,dummy).count('<svg ')==6,'whole/current/pair6 public panels');require(shared.FETCH_COUNT==0,'HTTP0')
  print(json.dumps({'guards':'PASS','actualPageSelection':'PASS','counts':[15,15,27],'HTTP':0,'server':0,'nativeApproval':False}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
