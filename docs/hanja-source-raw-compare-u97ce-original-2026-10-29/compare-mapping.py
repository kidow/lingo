"""Exact original 韎 whole/current raw comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-mapping.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-goal-glyphwiki-batch563-2026-10-11/engine-whole-u97ce.json";SOURCE_SHA="a420b9781f8efa339375a37632219ad97af1e37040e764b5fd50998af06203fb"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='韎 original public17raw/28P versus catalog14/domestic14, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='韎'and config['catalogStrokes']==14 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']=={"selected":{"root":"u97ce-logical14-hypothesis","rawGroups":14,"proofKind":"original-P-regroup-only/no-new-engine-proof"}}and config['defaultSource']=='selected','closed single originalroot')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch563-2026-10-11/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==14,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is False and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5 source');require(len(proof['groups'])==17 and len(sum(proof['trace'],[]))==17 and sum(len(g['polygons'])for g in proof['groups'])==28,'fixed17raw17calls28P');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');mapping=json.loads((ROOT/config['mapping']['path']).read_bytes());require(sha(ROOT/config['mapping']['path'])==config['mapping']['SHA256'],'fixed mapping hypothesis');groups=mapping['groups'];require(groups==[[3],[1,2],[4],[5],[6,7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17]] and sorted(sum(groups,[]))==list(range(1,18)),'exact17raw once');sources={'selected':{'groups':[{'polygons':sum((proof['groups'][i-1]['polygons']for i in row),[])}for row in groups]}};require(sum(len(g['polygons'])for g in sources['selected']['groups'])==28,'all original28P retained')
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_page=shared.page
    def page(route,selected,sources,domestic):
        html=original_page(route,selected,sources,domestic)
        html=html.replace('원raw','가설논리').replace('data-original-raw','data-source-logical-hypothesis');return html.replace('<h1>','<p>원문14 / 공개17raw→14논리가설;상부V역할유지·원P생략0·전체매핑미승인</p><h1>',1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(14)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==2,'whole two panels')
        for domestic,raw in[(i,i)for i in range(1,15)]:
            for mode in['single','prefix']:
                selected=selection('/compare','source=selected&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'韎','catalog':14,'domesticSelectionClips':14,'raw':17,'calls':17,'P':28,'wholeCurrentPrefixContract':'PASS','logicalHypothesis':14,'all14SinglesAndPrefixes':True,'HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
