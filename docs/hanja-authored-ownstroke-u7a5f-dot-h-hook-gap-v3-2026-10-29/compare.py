"""Exact 穟 original/whole-affine candidate comparison. Private media stays shared server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
ROOTS={"original":{"root":"lingo-u7a5f-var001-raw8-whole-X-contact-draft","rawGroups":21,"drawingCalls":22,"polygons":42,"file":"docs/hanja-authored-ownstroke-u7a5f-dot-h-contact-2026-10-29/fixture.pending.json","fileSHA256":"43a265b8400f69423c0e0c512cf7f76c2bef796f0580a419318ed08c8f34efc3","proofKind":"prior-authored-whole-affine-not-engine-capture"},"candidate":{"root":"lingo-u7a5f-var001-raw8-Xcontact-raw19-Xgap-draft","rawGroups":21,"drawingCalls":22,"polygons":42,"file":"docs/hanja-authored-ownstroke-u7a5f-dot-h-hook-gap-v3-2026-10-29/fixture.pending.json","fileSHA256":"91c1c1c9beb89afac088476cd530bac2d95a5c81c8e6fecea7e486e41da1e71a","proofKind":"locally-authored-two-whole-affines-not-engine-capture"}}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
 require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback');config=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed config/adapter')
  require(sha(ROOT/SHARED)==SHARED_SHA and config['sourceRoots']==ROOTS and config['defaultSource']=='candidate','exact shared/source roots')
  require(config['glyph']=='穟'and config['catalogStrokes']==18 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','exact context')
  require(config['nativeApproval']is config['runtimeApplied']is config['sourceGroupingApproved']is False and config['sourceGeometryChanged']is config['noPartialAnimation']is True,'unapproved static scope')
  meta=json.loads((ROOT/'docs/hanja-goal-glyphwiki-batch673-2026-10-11/metadata.json').read_bytes());require(config['domestic']==meta['dictionary'],'exact private metadata only')
  for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
 guards();sources={}
 for key,entry in ROOTS.items():
  require(sha(ROOT/entry['file'])==entry['fileSHA256'],'source pin');v=json.loads((ROOT/entry['file']).read_bytes())
  require(len(v['groups'])==21 and len(sum(v['trace'],[]))==22 and sum(len(g['polygons'])for g in v['groups'])==42,'21/22/42')
  require([sum((c['polygons']for c in calls),[])for calls in v['trace']]==[g['polygons']for g in v['groups']],'P trace exact');sources[key]=v
 a,b=sources['original'],sources['candidate'];require(a['schema']=='hanja-authored-fixed-source-groups/v1'and a['originalWhole']is a['isOriginalEngineCapture']is False,'prior authored candidate only')
 require(b['schema']=='hanja-authored-fixed-source-groups/v1'and b['isOriginalEngineCapture']is b['originalWhole']is b['nativeApproval']is b['runtimeApplied']is False,'authored identity')
 require(b['groups'][:18]==a['groups'][:18]and b['groups'][19:]==a['groups'][19:]and b['trace'][:18]==a['trace'][:18]and b['trace'][19:]==a['trace'][19:],'other20raw except19 exact')
 spec=importlib.util.spec_from_file_location('sui_ear_static_core',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
 require(shared.FETCH_COUNT==0,'HTTP0 preparation');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 original_selection=shared.selection;original_page=shared.page
 def selection(route,query):
  if route=='/mapping':
   from urllib.parse import parse_qs
   q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode'}and all(len(v)==1 for v in q.values()),'exact mapping query')
   pen=q['pen'][0];mode=q['mode'][0];require(pen in [str(i)for i in range(1,19)]and mode in['current','prefix'],'mapping bounds');return {'mappingPen':int(pen),'mappingMode':mode}
  if route=='/public-pair':require(not query,'publicpair noquery');return None
  require(route!='/checks','no new engine checks');return original_selection(route,query)
 def page(route,selected,src,domestic):
  if route=='/mapping':
   import html
   pen=selected['mappingPen'];prefix=selected['mappingMode']=='prefix';groups=[[1],[2],[3],[4],[5],[12],[13,14],[15],[16],[17],[18],[19],[20],[21],[6],[7],[8,9],[10,11]];raws=sum(groups[:pen],[])if prefix else groups[pen-1]
   require(sorted(sum(groups,[]))==list(range(1,22))and len(set(sum(groups,[])))==21,'once-only raw coverage')
   proof={'groups':[src['candidate']['groups'][i-1]for i in raws]};priorproof={'groups':[src['original']['groups'][i-1]for i in raws]}
   nav=' '.join('<a href="/mapping?pen='+str(i)+'&mode='+mode+'">'+str(i)+(' 누적'if mode=='prefix'else' 현재')+'</a>'for mode in['current','prefix']for i in range(1,19))
   ds=shared.domestic_svg(domestic,pen,prefix);ps=shared.source_svg(proof);psold=shared.source_svg(priorproof)
   for i,raw in enumerate(raws):ps=ps.replace('data-original-raw="'+str(i+1)+'"','data-actual-source-raw="'+str(raw)+'"')
   return '<!doctype html><meta charset="utf-8"><title>穟 매핑 v3 후보</title><style>body{font:16px system-ui;margin:12px}h1{font-size:28px}h2{font-size:20px}a{display:inline-block;margin:4px}.grid{display:flex;gap:20px;width:max-content}svg{width:520px;height:520px}</style><h1>穟18획 매핑 v3 후보 · '+str(pen)+' '+selected['mappingMode']+'</h1><p>native 매핑·시간 미승인. 원raw '+html.escape(str(raws))+' P 그대로.</p><nav>'+nav+'</nav><div class="grid"><section><h2>국내</h2>'+ds+'</section><section><h2>기존 저자 v2</h2>'+psold+'</section><section><h2>새 저자 v3</h2>'+ps+'</section></div>'
  if route=='/public-pair':return (HERE/'public-pair.html').read_text()
  return original_page(route,selected,src,domestic).replace('원proof exact·새 header/sourcecompiler/engine/projection0·native/runtimefalse.','원본 full5 보존·후보는 명시적 저자 whole affine이며 enginecapture 아님·native/runtimefalse.').replace('<nav>','<nav><a href="/public-pair">공개 기존v2·v3·raw17+19 비교</a>')
 shared.selection=selection;shared.page=page
 if args.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(18)]}
  require(selection('/whole','')is None and page('/whole',None,sources,dummy).count('<section class="panel">')==3,'actual whole page')
  for source in ROOTS:
   for domestic,raw in[(12,19),(10,17)]:
    for mode in['single','prefix']:
     x=selection('/compare','source='+source+'&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(page('/compare',x,sources,dummy).count('<section class="panel">')==2,'actual compare page')
  for pen in range(1,19):
   for mode in['current','prefix']:
    v=selection('/mapping','pen='+str(pen)+'&mode='+mode);require(page('/mapping',v,sources,dummy).count('<svg ')==3,'actual mapping page')
  require(page('/public-pair',selection('/public-pair',''),sources,dummy).count('<svg ')==6,'whole/current/pair6 public panels');require(shared.FETCH_COUNT==0,'HTTP0')
  print(json.dumps({'guards':'PASS','actualPageSelection':'PASS','counts':[21,22,42],'HTTP':0,'server':0,'nativeApproval':False}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
