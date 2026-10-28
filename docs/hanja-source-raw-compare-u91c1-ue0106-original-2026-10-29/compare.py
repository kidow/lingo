import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
EXPECTED=json.loads("{\"schema\":\"hanja-original-full5-static-independent-comparison/v1\",\"glyph\":\"釁\",\"catalogStrokes\":25,\"dictionaryPlaybackStrokes\":26,\"sourceViewBox\":\"0 0 200 200\",\"defaultSource\":\"selected\",\"sourceRoots\":{\"selected\":{\"root\":\"u91c1-ue0106\",\"file\":\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/engine-whole-u91c1-ue0106.json\",\"fileSHA256\":\"259e4a48fc191f53f417ccc14969016808405b6566f6c5741a94a32e3b19fe6f\",\"proofKeys\":[\"defaults\",\"engineHashes\",\"engineRevision\",\"groups\",\"trace\"],\"proofKind\":\"actual-full5-direct\",\"sourceProofIdentity\":{\"sourceRoot\":\"u91c1-ue0106\",\"sourceProofFile\":\"engine-whole-u91c1-ue0106.json\",\"sourceProofFileSha256\":\"259e4a48fc191f53f417ccc14969016808405b6566f6c5741a94a32e3b19fe6f\"},\"rawGroups\":33,\"drawingCalls\":37,\"polygonCounts\":[1,1,2,2,1,1,2,1,3,1,2,2,1,2,1,1,2,1,2,2,1,1,2,3,6,1,1,3,2,2,1,4,1],\"polygons\":59}},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91C1.svg\",\"status\":200,\"bytes\":12118,\"sha256\":\"d24cabbce191292c8e2ac3590015480b1c828ab263da21552b9ba5cf5b409549\",\"clips\":26,\"glyph\":\"釁\",\"privateMediaSaved\":false},\"host\":\"127.0.0.1\",\"noPartialAnimation\":true,\"canonicalMappingApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"wholeOnly\":true,\"holdSummary\":\"UNCHANGED u91c1-ue0106 full5 original33raw/37calls/59P vs domestic26 and catalog25. Source/domestic numbers are independent; no logical grouping, count reconciliation, timing or shape approval. Preserve all9variants and the separate MM structural HOLD.\",\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/engine-whole-u91c1-ue0106.json\":\"259e4a48fc191f53f417ccc14969016808405b6566f6c5741a94a32e3b19fe6f\",\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/sources.json\":\"636582f4215fa4c45225a2ec4303afcd810f12590fe76d89ef0786ffe4e51823\",\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/metadata.json\":\"def70587d4ebace8e57667d9a7fcda229ac30d98f3cd802053663621dd17d281\",\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/source-hold.json\":\"ee83e9a184cc03b043c5cbd3402a224ba52c390b9e77dcd86b5493734d6e2d3c\",\"docs/hanja-source-raw-compare-u91c1-mm-whole-2026-10-28/native-whole-review.json\":\"dcc16d294fa5d885eee6b342573a6b8254097f99a358069890f931a3a40afe21\",\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"}}")
SHARED=EXPECTED['sharedServe']['path'];SOURCE=EXPECTED['sourceRoots']['selected']['file']
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='釁 unchanged ue0106 original33raw whole vs domestic26; catalog25 is separate');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config.get('adapterSHA256'),'config/adapter changed')
        require({k:v for k,v in config.items()if k!='adapterSHA256'}==EXPECTED,'exact original ue0106 comparison context required')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'changed input: '+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes())
    require(sorted(proof)==['defaults','engineHashes','engineRevision','groups','trace']and len(proof['groups'])==33 and len(sum(proof['trace'],[]))==37 and sum(len(g['polygons'])for g in proof['groups'])==59,'exact original full5 counts')
    require([sum((c['polygons']for c in row),[])for row in proof['trace']]==[g['polygons']for g in proof['groups']],'original traceP binding')
    sources={'selected':proof};shared=module('xin_original_ue0106_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets only at ROOT server start')
    shared.CONFIG={**config,'catalogStrokes':config['dictionaryPlaybackStrokes']};shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_page,original_selection=shared.page,shared.selection
    def page(*params):
        text=original_page(*params);notice='<p>UNCHANGED ORIGINAL u91c1-ue0106: 33raw / 37calls / 59P. Catalog25, domestic26 and source33 are independent counts. No authored correction, logical mapping, order, direction, source clock or animation approval. All9 prior GlyphWiki wholes and the separate MM structural HOLD remain preserved.</p>'
        require(text.count('</h1>')==1,'page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','no engine execution requested');return original_selection(route,query)
    shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(26)]}
        require(selection('/whole','')is None,'whole selection')
        whole=page('/whole',None,sources,dummy);require(whole.count('<section class="panel">')==2 and 'Catalog25, domestic26 and source33' in whole,'whole page and independent count notice')
        for raw in[1,33]:
            selected=selection('/compare','source=selected&domestic=26&raw='+str(raw)+'&dview=single&rview=single');require(selected['raw']==raw and selected['domestic']==26,'independent selectors');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'raw page')
        try:selection('/checks','')
        except ValueError:pass
        else:raise ValueError('engine route not rejected')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'glyph':'釁','root':'u91c1-ue0106','catalog':25,'domestic':26,'raw':33,'calls':37,'polygons':59,'originalSourceUnchanged':True,'wholeAndIndependentSelectors':'PASS','HTTP':0,'server':0,'engine':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
