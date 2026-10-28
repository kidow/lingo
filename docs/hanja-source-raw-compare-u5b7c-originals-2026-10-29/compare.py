"""Exact original 孼 whole/current raw comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-actual-engine-capture-u5b7c-hkcs-m-2026-10-25/engine-whole-hkcs_m5b7c.json";SOURCE_SHA="15c216d7e4e468e8f3820026dd76d1cf86e0d3af394256f89d98bbc0e04cf5df"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='孼 original public11raw/20P versus domestic9, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='孼'and config['catalogStrokes']==19 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']=={"m":{"root":"hkcs_m5b7c","rawGroups":25,"drawingCalls":25,"polygons":45,"file":"docs/hanja-actual-engine-capture-u5b7c-hkcs-m-2026-10-25/engine-whole-hkcs_m5b7c.json","fileSHA256":"15c216d7e4e468e8f3820026dd76d1cf86e0d3af394256f89d98bbc0e04cf5df","proofKind":"actual-original-full5-public-source"},"u":{"root":"hkcs_u5b7c","rawGroups":23,"drawingCalls":25,"polygons":46,"file":"docs/hanja-actual-engine-capture-u5b7c-hkcs-u-2026-10-25/engine-whole-hkcs_u5b7c.json","fileSHA256":"a98c156cc1c8a004ac360d0f4e9f7b05fdfa6d98250ddacadd622d9593a2eb11","proofKind":"actual-original-full5-public-source"}}and config['defaultSource']=='m','closed originaltwo-sourcecontext')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch707-2026-10-12/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==19,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is False and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();sources={}
    for key,entry in config['sourceRoots'].items():
        require(sha(ROOT/entry['file'])==entry['fileSHA256'],'fixed originalsource');proof=json.loads((ROOT/entry['file']).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5');require(len(proof['groups'])==entry['rawGroups']and len(sum(proof['trace'],[]))==entry['drawingCalls']and sum(len(g['polygons'])for g in proof['groups'])==entry['polygons'],'fixed originalcounts');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');sources[key]=proof
    require([i+1 for i,g in enumerate(sources['m']['groups'])if not g['polygons']]==[7,11],'originalemptyrows preserved')
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(19)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==3,'domesticplus twooriginalwholepanels')
        for domestic,raw in[(1,1),(19,25)]:
            for mode in['single','prefix']:
                selected=selection('/compare','source=m&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'孼','m':[25,25,45],'u':[23,25,46],'originalEmptyMRows':[7,11],'wholeCurrentPrefixContract':'PASS','HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
