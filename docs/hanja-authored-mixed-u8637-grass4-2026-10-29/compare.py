"""Explicit authored whole-raw18 x-minus4 蘷 static comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys,html
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-goal-glyphwiki-batch486-2026-10-10/engine-proof.json";SOURCE_SHA="75ef83fd8b4594fc4f0d7e9c47bffb32aea50542a93dfcecb62c7badeb710ffd"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
EXPECTED_ROOTS={"original":{"root":"u8637","rawGroups":23,"proofKind":"fixed-public-original-full5"},"authored":{"root":"lingo-u8637-mixed-grass4-raw18-xminus4-static-draft","rawGroups":24,"proofKind":"locally-authored-mixed-original-MM-D-and-GlyphWiki-P-not-engine"}}
def main():
    p=argparse.ArgumentParser(description='蘷 original public23raw/51P versus catalog20/domestic21, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='蘷'and config['catalogStrokes']==20 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']==EXPECTED_ROOTS and config['defaultSource']=='authored','closed single originalroot')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch486-2026-10-10/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==20,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is True and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5 source');require(len(proof['groups'])==23 and len(sum(proof['trace'],[]))==26 and sum(len(g['polygons'])for g in proof['groups'])==51,'fixed23raw26calls51P');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');recipe,sources=module('gao_mixed_original_donor_D',HERE/'materialize-static.py').load_candidate();require(sources['original']==proof and set(sources)=={'original','authored'},'closed original/authored sourcecases')
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=dict(config,catalogStrokes=config['domestic']['clips']);shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_svg=shared.source_svg
    def source_svg(source,count=None,prefix=False):
        if source is sources['original']:return original_svg(source,count,prefix)
        require(source is sources['authored'],'exact mixed source');indexes=list(range(len(source['groups'])))if count is None else list(range(count))if prefix else[count-1];out=['<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 200 200"><g fill="#222">']
        for i in indexes:
            g=source['groups'][i];out.append('<g data-authored-static-slot="'+str(i+1)+'">')
            if g['sourceKind']=='original-MM-donor-whole-D':
                a,b,c,d,e,f=map(F,g['matrixAfterNExact']);require(a*d-b*c>0,'positive authored matrix');values=' '.join(format(float(v),'.17g')for v in[a,b,c,d,e,f]);out.append('<g transform="matrix('+values+')"><g transform="matrix(0.2 0 0 -0.2 0 180)"><path data-donor-whole="true" d="'+html.escape(g['originalD'],quote=True)+'"/></g></g>')
            else:
                require(g['sourceKind']=='retained-GlyphWiki-body-P','exact body source');out.extend('<path data-retained-body-P="true" d="'+html.escape(shared.polygon_path(p),quote=True)+'"/>'for p in g['polygons'])
            out.append('</g>')
        return ''.join(out)+'</g></svg>'
    shared.source_svg=source_svg
    original_page=shared.page
    def page(route,selected,sources,domestic):
        html=original_page(route,selected,sources,domestic)
        return html.replace('<h1>','<p>사전20 / 원문21 / 원raw23. authored24slot은MM十원D4+GlyphWiki몸체45P의명시혼합저자가설입니다. 두출처/원P·D그대로, 원whole/enginecapture아님. 草4/전체형태·몸체순서·21매핑승인전입니다.</p><h1>',1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(21)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==3,'whole original and authored panels')
        for source,domestic,raw in[(s,d,r)for s in ['original','authored']for d,r in [(1,1),(2,2),(3,3),(4,4),(17,19),(21,23)]]:
            for mode in['single','prefix']:
                selected=selection('/compare','source='+source+'&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        candidate_svg=source_svg(sources['authored']);require(candidate_svg.count('data-donor-whole=')==4 and candidate_svg.count('data-retained-body-P=')==45 and candidate_svg.count('matrix(0.2 0 0 -0.2 0 180)')==4,'original donor D and single N perinstance');require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'蘷','catalog':20,'domesticSelectionClips':21,'originalSource':{'raw':23,'calls':26,'P':51},'authoredStatic':{'slots':24,'retainedBodyRaw':20,'bodyP':45,'donorWholeD':4,'mixedParts':True},'wholeCurrentPrefixContract':'PASS','HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
