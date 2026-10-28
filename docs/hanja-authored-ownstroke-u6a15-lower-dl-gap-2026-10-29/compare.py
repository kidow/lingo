"""Unapproved whole-P/Q raw16 positive-affine 樕 comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-goal-glyphwiki-batch663-2026-10-11/engine-whole-u6a15.json";SOURCE_SHA="2187202bf0d5ef711a6685082c34fd1a3dc0e7245596797a3344b2389d7dda48"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
EXPECTED_ROOTS={"u6a15":{"root":"u6a15","rawGroups":17,"proofKind":"fixed-public-original-full5"},"u6a15-author":{"root":"lingo-u6a15-raw16-gap1-draft","rawGroups":17,"proofKind":"locally-authored-positive-affine-not-engine"},"u6a15-ue0100":{"root":"u6a15-ue0100","rawGroups":17,"proofKind":"fixed-public-original-full5"},"u6a15-ue0100-author":{"root":"lingo-u6a15-ue0100-raw16-gap1-draft","rawGroups":17,"proofKind":"locally-authored-positive-affine-not-engine"}}
def main():
    p=argparse.ArgumentParser(description='樕 original public17raw/28P versus domestic15, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='樕'and config['catalogStrokes']==15 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']==EXPECTED_ROOTS and config['defaultSource']=='u6a15-author','closed two originalroots')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch663-2026-10-11/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==15,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is True and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();recipe,sources=module('su_raw16_materializer',HERE/'materialize-draft.py').load_candidate();require(set(sources)==set(EXPECTED_ROOTS),'closed four sourcecases')
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(15)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==5,'domestic plus four sourcecases')
        for key in EXPECTED_ROOTS:
            for domestic,raw in [(1,1),(13,14),(14,16),(15,17)]:
                for mode in ['single','prefix']:
                    selected=selection('/compare','source='+key+'&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'樕','catalog':15,'domestic':15,'sources':{k:[len(v['groups']),len(sum(v['trace'],[])),sum(len(g['polygons'])for g in v['groups'])]for k,v in sources.items()},'wholeCurrentPrefixContract':'PASS','HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
