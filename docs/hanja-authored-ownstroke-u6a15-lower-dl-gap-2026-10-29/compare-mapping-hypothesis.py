"""Unapproved whole-P/Q raw16 positive-affine 樕 comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-mapping-hypothesis.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-goal-glyphwiki-batch663-2026-10-11/engine-whole-u6a15.json";SOURCE_SHA="2187202bf0d5ef711a6685082c34fd1a3dc0e7245596797a3344b2389d7dda48"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
EXPECTED_ROOTS={"originalRaw":{"root":"u6a15","rawGroups":17,"proofKind":"fixed-public-original-full5"},"authoredRaw":{"root":"lingo-u6a15-raw16-gap1-draft","rawGroups":17,"proofKind":"locally-authored-positive-affine-not-engine"},"original":{"root":"u6a15-original-logical15-hypothesis","rawGroups":15,"proofKind":"original-P-grouping-hypothesis-not-engine"},"authored":{"root":"u6a15-authored-logical15-hypothesis","rawGroups":15,"proofKind":"authored-P-grouping-hypothesis-not-engine"}}
def main():
    p=argparse.ArgumentParser(description='樕 original public17raw/28P versus domestic15, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='樕'and config['catalogStrokes']==15 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']==EXPECTED_ROOTS and config['defaultSource']=='authored','closed two originalroots')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch663-2026-10-11/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==15,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is True and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();recipe,candidates=module('su_raw16_materializer',HERE/'materialize-draft.py').load_candidate();hyp=json.loads((HERE/'mapping-hypothesis.json').read_bytes());mapping=[[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14,15],[16],[17]];require(hyp['oneBasedLogicalRawGroups']==mapping and not any(hyp['approval'].values()),'fixed unapproved15 mapping');require([n for row in mapping for n in row]==list(range(1,18)),'17raw exactlyonce');group=lambda source:{'groups':[{'sourceRawOneBased':row,'polygons':[p for n in row for p in source['groups'][n-1]['polygons']]}for row in mapping]};original_grouped=group(candidates['u6a15']);authored_grouped=group(candidates['u6a15-author']);require([p for g in authored_grouped['groups']for p in g['polygons']]==[p for g in candidates['u6a15-author']['groups']for p in g['polygons']],'all28P order preserved');sources={'originalRaw':candidates['u6a15'],'authoredRaw':candidates['u6a15-author'],'original':original_grouped,'authored':authored_grouped}
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_page,original_svg=shared.page,shared.source_svg
    def source_svg(source,count=None,prefix=False):
        text=original_svg(source,count,prefix);return text.replace('data-original-raw=','data-unapproved-logical-group=')if source is original_grouped or source is authored_grouped else text
    shared.source_svg=source_svg
    def page(route,selected,sources,domestic):
        shown={k:v for k,v in sources.items()if k in ['original','authored']}if selected is None else sources
        text=original_page(route,selected,shown,domestic);notice='<p>樕15논리획 대응 가설: 원17raw·28P 각1회/원순서 그대로. 중앙V raw10=논리9, H+V raw7/8=논리7, H+hook raw14/15=논리13. 원문45프레임 역할과 공개source 매핑·실제재생 승인은 별개입니다. source original/authored는논리1~15, originalRaw/authoredRaw는원시1~17.</p>';require(text.count('</h1>')==1,'existing page hook');return text.replace('</h1>','</h1>'+notice,1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(15)]};require(selection('/whole','')is None,'whole route');require(page('/whole',None,sources,dummy).count('<section class="panel">')==3,'whole original/authored panels')
        for key in ['original','authored']:
            for n in range(1,16):
                for mode in ['single','prefix']:
                    selected=selection('/compare','source='+key+'&domestic='+str(n)+'&raw='+str(n)+'&dview='+mode+'&rview='+mode);require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'all15current-prefix')
        for key in ['originalRaw','authoredRaw']:
            selected=selection('/compare','source='+key+'&domestic=15&raw=17&dview=single&rview=single');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independentraw17')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'logical':15,'raw':17,'P':28,'all15CurrentPrefixContract':'PASS','sourceMappingApproved':False,'nativeApproval':False,'runtimeApplied':False,'HTTP':0,'server':0}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
