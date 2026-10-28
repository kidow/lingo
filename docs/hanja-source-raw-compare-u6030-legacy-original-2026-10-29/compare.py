import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
EXPECTED=json.loads("{\"schema\":\"hanja-original-legacy-proof4-separate-trace-static-comparison/v1\",\"glyph\":\"怰\",\"catalogStrokes\":8,\"dictionaryPlaybackStrokes\":8,\"sourceViewBox\":\"0 0 200 200\",\"defaultSource\":\"selected\",\"sourceRoots\":{\"selected\":{\"root\":\"u6030\",\"file\":\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/engine-proof.json\",\"fileSHA256\":\"fef26dbd710dac54ff97f9040e0636f5e3f45fd0687ee47f46f8ae5e444e2242\",\"proofKeys\":[\"defaults\",\"engineRevision\",\"groups\",\"hashes\"],\"proofKind\":\"unchanged-original-legacy-proof4-plus-separately-pinned-trace-not-full5\",\"separateTrace\":{\"path\":\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/draw-trace.json\",\"SHA256\":\"98731d24ca0671b759673c24437cdfe84c0f0628d5830ebf99598c4f98f80412\"},\"rawGroups\":10,\"drawingCalls\":10,\"polygonCounts\":[2,2,2,2,2,3,2,3,3,2],\"polygons\":23}},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6030.svg\",\"status\":200,\"bytes\":4270,\"sha256\":\"598274aff021b8a5d49185e5a46fe4181f58c8fa2f93ae487366c911fb4893c4\",\"clips\":8,\"glyph\":\"怰\",\"privateMediaSaved\":false},\"host\":\"127.0.0.1\",\"noPartialAnimation\":true,\"canonicalMappingApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"wholeOnly\":true,\"holdSummary\":\"UNCHANGED originallegacyproof4+separatetrace; source10raw versus domestic8 independent. Two compound guide gaps and original6uppercontact HOLD remain. No new engine, alias proof5, bridge, inferred retracing or source animation.\",\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/sources.json\":\"01f3431dc7e3a855ec307611faae5be360873b69e67a022c9f41c02986083016\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/engine-proof.json\":\"fef26dbd710dac54ff97f9040e0636f5e3f45fd0687ee47f46f8ae5e444e2242\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/draw-trace.json\":\"98731d24ca0671b759673c24437cdfe84c0f0628d5830ebf99598c4f98f80412\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/metadata.json\":\"b4dabada8f2b71b94e243f7dc49679def8453435b109a6d5faa3fb859e5a66f3\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/findings.json\":\"8fade38dddfc8e1a3b89b9f301fca9e62b85d900e9551f601ed634d63881ebc1\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/alternative-sources.json\":\"1fff62458690e73d426485e8ecb84991c1232b0b501aa6c3b58db014d097f41d\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/whole-and-proof-readiness-2026-10-28.json\":\"f3813836e971768d92ff7ce760ffd1332a0445ac8b62dfb9196d743e07131bf8\",\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"}}")
SHARED=EXPECTED['sharedServe']['path'];SOURCE=EXPECTED['sourceRoots']['selected']['file'];TRACE=EXPECTED['sourceRoots']['selected']['separateTrace']['path']
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='怰 originallegacyproof4+trace10raw vs domestic8; unresolved holds preserved');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config.get('adapterSHA256'),'config/adapter changed')
        require({k:v for k,v in config.items()if k!='adapterSHA256'}==EXPECTED,'exact original怰 legacy4/trace comparison context required')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'changed input: '+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes())
    trace=json.loads((ROOT/TRACE).read_bytes());require(sorted(proof)==['defaults','engineRevision','groups','hashes']and len(proof['hashes'])==8 and proof['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f'and len(proof['groups'])==len(trace)==10 and len(sum(trace,[]))==10 and sum(len(g['polygons'])for g in proof['groups'])==23,'exact originallegacy4 plus separate trace counts')
    require([sum((c['polygons']for c in row),[])for row in trace]==[g['polygons']for g in proof['groups']],'original traceP binding')
    sources={'selected':proof};shared=module('xuan_legacy_original_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets only at ROOT server start')
    shared.CONFIG={**config,'catalogStrokes':config['dictionaryPlaybackStrokes']};shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_page,original_selection=shared.page,shared.selection
    def page(*params):
        text=original_page(*params);notice='<p>UNCHANGED 怰 legacyproof4 + separately pinned trace:10raw/10calls/23P, domestic8. Source and domestic numbers are independent. Raw6/7 andraw8/9 guide handoffs have unresolved gaps; original sixth upper contact remains HOLD. No fakefull5, inferred retracing, bridge, newengine or animation approval.</p>'
        require(text.count('</h1>')==1,'page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','no engine execution requested');return original_selection(route,query)
    shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(8)]}
        require(selection('/whole','')is None,'whole selection')
        whole=page('/whole',None,sources,dummy);require(whole.count('<section class="panel">')==2 and 'legacyproof4 + separately pinned trace' in whole,'whole page and independent count notice')
        for raw in[6,7,8,9]:
            selected=selection('/compare','source=selected&domestic=1&raw='+str(raw)+'&dview=single&rview=single');require(selected['raw']==raw and selected['domestic']==1,'independent selectors');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'raw page')
        try:selection('/checks','')
        except ValueError:pass
        else:raise ValueError('engine route not rejected')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'glyph':'怰','root':'u6030','catalog':8,'domestic':8,'raw':10,'calls':10,'polygons':23,'legacyProof4AndSeparateTrace':True,'newFull5Claim':False,'originalSourceUnchanged':True,'wholeAndIndependentSelectors':'PASS','HTTP':0,'server':0,'engine':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
