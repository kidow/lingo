import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
BASE_CONFIG='docs/hanja-source-raw-compare-u6715-hkcs-whole-2026-10-26/config.json';BASE_SHA='bf7b28e94af78c09cd22f08e0711b1ec44ed7d7bfb2096e0369073a1cef29e80'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE='docs/hanja-actual-engine-capture-u6715-hkcs-2026-10-26/engine-whole-hkcs_m6715.json';SOURCE_SHA='8154f8f413dc5b027aceec1a2d3219106ed4cda4404a1866ae740205fb91f73c'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='朕 unchanged originalHKCS12raw vs domestic10; independent numbers, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'config/adapter changed')
        require(sha(ROOT/BASE_CONFIG)==BASE_SHA and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'unchanged original inputs')
        old=json.loads((ROOT/BASE_CONFIG).read_bytes())
        require(config['glyph']=='朕'and config['catalogStrokes']==10 and config['domestic']==old['domestic']and config['sourceRoots']==old['sourceRoots']and config['sourceViewBox']=='0 0 200 200'and config['defaultSource']=='selected','one originalHKCS context')
        require(config['host']=='127.0.0.1'and config['noPartialAnimation']is True and config['canonical10MappingApproved']is False and config['nativeApproval']is False and config['runtimeApplied']is False,'unapproved static independent comparison')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'changed input: '+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes())
    require(sorted(proof)==['defaults','engineHashes','engineRevision','groups','trace']and len(proof['groups'])==12 and len(sum(proof['trace'],[]))==15 and sum(len(g['polygons'])for g in proof['groups'])==29,'exact original full5 counts')
    require([sum((c['polygons']for c in row),[])for row in proof['trace']]==[g['polygons']for g in proof['groups']],'original traceP binding')
    sources={'selected':proof};shared=module('jin_original_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets only at ROOT server start')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_page,original_selection=shared.page,shared.selection
    def page(*params):
        text=original_page(*params);notice='<p>UNCHANGED ORIGINAL HKCS12raw. Domestic10 and source12 numbers are independent; no proposed logical mapping, dot correction, source order or animation approval. Inspect original whole and source raw4/raw5 before any authored candidate.</p><a href="/compare?source=selected&amp;domestic=1&amp;raw=4&amp;dview=single&amp;rview=single">원source raw4 · 국내번호 독립선택</a> <a href="/compare?source=selected&amp;domestic=1&amp;raw=5&amp;dview=single&amp;rview=single">원source raw5 · 국내번호 독립선택</a>'
        require(text.count('</h1>')==1,'page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','no engine execution requested');return original_selection(route,query)
    shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(10)]}
        require(selection('/whole','')is None,'whole selection')
        require(page('/whole',None,sources,dummy).count('<section class="panel">')==2,'whole page')
        for raw in[4,5]:
            selected=selection('/compare','source=selected&domestic=1&raw='+str(raw)+'&dview=single&rview=single');require(selected['raw']==raw and selected['domestic']==1,'independent numbers');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'raw page')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'glyph':'朕','raw':12,'calls':15,'polygons':29,'originalSourceUnchanged':True,'wholeAndRaw4Raw5Pages':'PASS','canonical10MappingApproved':False,'HTTP':0,'server':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
