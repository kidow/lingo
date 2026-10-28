"""Two unapproved positive-affine 蠙 static candidates; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-actual-engine-capture-u8819-hkcs-2026-10-26/engine-whole-hkcs_m8819.json";SOURCE_SHA="1b6efbd56add0a361572755488eb27f54fab06c4e74394bd2e9cc47a934d5da4"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
EXPECTED_ROOTS={"original":{"root":"hkcs_m8819","rawGroups":24,"proofKind":"fixed-public-original-full5"},"bbox":{"root":"lingo-u8819-raw11-bbox-gap1-draft","rawGroups":24,"proofKind":"locally-authored-positive-affine-not-engine"},"actual":{"root":"lingo-u8819-raw11-actualP-gap1-draft","rawGroups":24,"proofKind":"locally-authored-positive-affine-not-engine"}}
MATERIALIZER="docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/materialize-draft.py"
def main():
    p=argparse.ArgumentParser(description='蠙 original public24raw/43P versus domestic20, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='蠙'and config['catalogStrokes']==20 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']==EXPECTED_ROOTS and config['defaultSource']=='actual','closed single originalroot')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch630-2026-10-11/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==20,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is True and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5 source');require(len(proof['groups'])==24 and len(sum(proof['trace'],[]))==24 and sum(len(g['polygons'])for g in proof['groups'])==43,'fixed24raw24calls43P');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');recipe,sources=module('bin_author_materializer',ROOT/MATERIALIZER).load_candidate();require(sources['original']==proof and set(sources)=={'original','bbox','actual'},'closed authored sources');require([i+1 for i,g in enumerate(proof['groups'])if not g['polygons']]==[16],'originalempty16 preserved')
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        if route=='/pair':require(not query,'pair query forbidden');return None
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_page=shared.page
    def page(route,selected,sources,domestic):
        if route=='/pair':return (HERE/'roof-hook-pair.html').read_text()
        html=original_page(route,selected,sources,domestic)
        return html.replace('<h1>','<p>사전 표제20획 / 원문20클립 / 공개raw24: 독립 선택이며 매핑·급수 변경 아님</p><h1>',1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(20)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==4,'whole four panels')
        for source,domestic,raw in[(s,d,r)for s in ['original','bbox','actual']for d,r in [(9,11),(10,12),(20,24)]]:
            for mode in['single','prefix']:
                selected=selection('/compare','source='+source+'&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        require(selection('/pair','')is None and 'raw11' in shared.page('/pair',None,sources,dummy),'public pair route');require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'蠙','variants':['original','bbox','actual'],'catalog':20,'domesticSelectionClips':20,'raw':24,'calls':24,'P':43,'wholeCurrentPrefixContract':'PASS','HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
