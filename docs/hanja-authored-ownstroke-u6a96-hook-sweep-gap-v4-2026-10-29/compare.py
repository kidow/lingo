"""Exact 檖 original/whole-affine candidate comparison. Private media stays shared server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
ROOTS={"original":{"root":"u6a96","rawGroups":20,"drawingCalls":21,"polygons":40,"file":"docs/hanja-goal-glyphwiki-batch672-2026-10-11/engine-whole-u6a96.json","fileSHA256":"4d80b42a99238926942a87a33a5af38c3f5838a04a3fd350a73aa54101523a4d","proofKind":"actual-original-full5-public-source"},"prior":{"root":"lingo-u6a96-raw17-whole-X-gap1-draft","rawGroups":20,"drawingCalls":21,"polygons":40,"file":"docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/fixture.pending.json","fileSHA256":"d667c0b8cadab7c8a939e29edd438c686b92d26b780c6385ff00125606f1bb3b","proofKind":"locally-authored-whole-affine-not-engine-capture"},"candidate":{"root":"lingo-u6a96-raw17-X-raw10-Y-gap1-v4-draft","rawGroups":20,"drawingCalls":21,"polygons":40,"file":"docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/fixture.pending.json","fileSHA256":"0165e36e65bbd342e3c128f03d0c3cd204377eecdddc1237346c5cf243273bfd","proofKind":"locally-authored-whole-affine-not-engine-capture"}}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
 require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback');config=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed config/adapter')
  require(sha(ROOT/SHARED)==SHARED_SHA and config['sourceRoots']==ROOTS and config['defaultSource']=='candidate','exact shared/source roots')
  require(config['glyph']=='檖'and config['catalogStrokes']==17 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','exact context')
  require(config['nativeApproval']is config['runtimeApplied']is config['sourceGroupingApproved']is False and config['sourceGeometryChanged']is config['noPartialAnimation']is True,'unapproved static scope')
  meta=json.loads((ROOT/'docs/hanja-goal-glyphwiki-batch672-2026-10-11/metadata.json').read_bytes());require(config['domestic']==meta['dictionary'],'exact private metadata only')
  for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
 guards();sources={}
 for key,entry in ROOTS.items():
  require(sha(ROOT/entry['file'])==entry['fileSHA256'],'source pin');v=json.loads((ROOT/entry['file']).read_bytes())
  require(len(v['groups'])==20 and len(sum(v['trace'],[]))==21 and sum(len(g['polygons'])for g in v['groups'])==40,'20/21/40')
  require([sum((c['polygons']for c in calls),[])for calls in v['trace']]==[g['polygons']for g in v['groups']],'P trace exact');sources[key]=v
 a,b=sources['original'],sources['candidate'];require(set(a)=={'engineRevision','engineHashes','groups','trace','defaults'},'original full5 only')
 require(b['schema']=='hanja-authored-fixed-source-groups/v1'and b['isOriginalEngineCapture']is b['originalWhole']is b['nativeApproval']is b['runtimeApplied']is False,'authored identity')
 require(all(b['groups'][i]==a['groups'][i]and b['trace'][i]==a['trace'][i]for i in range(20)if i not in[9,16]),'other18originalraw exact')
 prior=sources['prior'];require(all(b['groups'][i]==prior['groups'][i]and b['trace'][i]==prior['trace'][i]for i in range(20)if i!=9),'other19v3raw exact includingraw17')
 spec=importlib.util.spec_from_file_location('sui_ear_static_core',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
 require(shared.FETCH_COUNT==0,'HTTP0 preparation');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 original_selection=shared.selection;original_page=shared.page
 def selection(route,query):
  if route=='/mapping':
   from urllib.parse import parse_qs
   q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode'}and all(len(v)==1 for v in q.values()),'exact mapping query')
   pen=q['pen'][0];mode=q['mode'][0];require(pen in [str(i)for i in range(1,18)]and mode in['current','prefix'],'mapping bounds');return {'mappingPen':int(pen),'mappingMode':mode}
  if route=='/public-pair':require(not query,'publicpair noquery');return None
  require(route!='/checks','no new engine checks');return original_selection(route,query)
 def page(route,selected,src,domestic):
  if route=='/mapping':
   import html
   pen=selected['mappingPen'];prefix=selected['mappingMode']=='prefix';groups=[[1],[2],[3],[4],[7],[5,6],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17,18],[19,20]];raws=sum(groups[:pen],[])if prefix else groups[pen-1]
   require(sorted(sum(groups,[]))==list(range(1,21))and len(set(sum(groups,[])))==20,'once-only raw coverage')
   proof={'groups':[src['candidate']['groups'][i-1]for i in raws]}
   nav=' '.join('<a href="/mapping?pen='+str(i)+'&mode='+mode+'">'+str(i)+(' 누적'if mode=='prefix'else' 현재')+'</a>'for mode in['current','prefix']for i in range(1,18))
   ds=shared.domestic_svg(domestic,pen,prefix);ps=shared.source_svg(proof)
   for i,raw in enumerate(raws):ps=ps.replace('data-original-raw="'+str(i+1)+'"','data-actual-source-raw="'+str(raw)+'"')
   return '<!doctype html><meta charset="utf-8"><title>檖 매핑 가설</title><style>body{font:16px system-ui;margin:12px}h1{font-size:28px}h2{font-size:20px}a{display:inline-block;margin:4px}.grid{display:flex;gap:20px;width:max-content}svg{width:520px;height:520px}</style><h1>檖17획 매핑 가설 · '+str(pen)+' '+selected['mappingMode']+'</h1><p>native 매핑·시간 미승인. 원raw '+html.escape(str(raws))+' P 그대로.</p><nav>'+nav+'</nav><div class="grid"><section><h2>국내</h2>'+ds+'</section><section><h2>공개 후보</h2>'+ps+'</section></div>'
  if route=='/public-pair':return (HERE/'public-pair.html').read_text()
  return original_page(route,selected,src,domestic).replace('원proof exact·새 header/sourcecompiler/engine/projection0·native/runtimefalse.','원본 full5 보존·후보는 명시적 저자 whole affine이며 enginecapture 아님·native/runtimefalse.').replace('<nav>','<nav><a href="/public-pair">공개 v3/v4 전체·raw10·raw10+20 비교</a>')
 shared.selection=selection;shared.page=page
 if args.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(17)]}
  require(selection('/whole','')is None and page('/whole',None,sources,dummy).count('<section class="panel">')==4,'actual whole page')
  for source in ROOTS:
   for domestic,raw in[(9,10),(11,12),(17,20)]:
    for mode in['single','prefix']:
     x=selection('/compare','source='+source+'&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(page('/compare',x,sources,dummy).count('<section class="panel">')==2,'actual compare page')
  for pen in range(1,18):
   for mode in['current','prefix']:
    v=selection('/mapping','pen='+str(pen)+'&mode='+mode);require(page('/mapping',v,sources,dummy).count('<svg ')==2,'actual mapping page')
  require(page('/public-pair',selection('/public-pair',''),sources,dummy).count('<svg ')==6,'whole/current/pair6 public panels');require(shared.FETCH_COUNT==0,'HTTP0')
  print(json.dumps({'guards':'PASS','actualPageSelection':'PASS','counts':[20,21,40],'HTTP':0,'server':0,'nativeApproval':False}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
