"""Exact original 釃 whole/current raw comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-mapping.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-goal-glyphwiki-batch685-2026-10-11/engine-whole-u91c3.json";SOURCE_SHA="ec7007c097699d75e610a0510178f11d14820a361707521c2517941a81d6cbfa"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='釃 original public31raw/67P versus catalog26/domestic26, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='釃'and config['catalogStrokes']==26 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']=={"selected":{"root":"u91c3-static-logical-hypothesis","rawGroups":26,"proofKind":"original-P-regroup-only/no-new-engine-proof"}}and config['defaultSource']=='selected','closed single originalroot')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch685-2026-10-11/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==26,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is False and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5 source');require(len(proof['groups'])==31 and len(sum(proof['trace'],[]))==37 and sum(len(g['polygons'])for g in proof['groups'])==67,'fixed31raw37calls67P');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');mapping=json.loads((ROOT/config['mapping']['path']).read_bytes());require(sha(ROOT/config['mapping']['path'])==config['mapping']['SHA256'],'fixed mapping hypothesis');groups=mapping['groups'];require(groups==[[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18],[19],[20],[21],[22,23],[25],[26],[24],[27],[28,29],[30],[31]] and sorted(sum(groups,[]))==list(range(1,32)),'exact raw31 membership once');sources={'selected':{'groups':[{'polygons':sum((proof['groups'][i-1]['polygons']for i in row),[])}for row in groups]}};require(sum(len(g['polygons'])for g in sources['selected']['groups'])==67,'all original67P retained')
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_page=shared.page
    def page(route,selected,sources,domestic):
        html=original_page(route,selected,sources,domestic)
        html=html.replace('원raw','가설논리').replace('data-original-raw','data-source-logical-hypothesis');return html.replace('<h1>','<p>원문26 / 공개31raw→26논리 정적가설: 전체대응 미승인</p><h1>',1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(26)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==2,'whole two panels')
        for domestic,raw in[(i,i)for i in range(1,27)]:
            for mode in['single','prefix']:
                selected=selection('/compare','source=selected&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'釃','catalog':26,'domesticSelectionClips':26,'raw':31,'calls':37,'P':67,'wholeCurrentPrefixContract':'PASS','logicalHypothesis':26,'all26SinglesAndPrefixes':True,'HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
