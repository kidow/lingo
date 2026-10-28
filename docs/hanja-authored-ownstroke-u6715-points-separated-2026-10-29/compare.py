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
        require(config['glyph']=='朕'and config['catalogStrokes']==10 and config['domestic']==old['domestic']and config['sourceRoots']=={**old['sourceRoots'],'original':{'root':'originalP_u6715_macro10_groups','rawGroups':10,'proofKind':'original-P-list-grouping-not-engine-capture'},'authored':{'root':'local_hkcs_m6715_dots4_5_translate23over10_v1','rawGroups':10,'proofKind':'locally-authored-positive-translation-not-engine-capture'}}and config['sourceViewBox']=='0 0 200 200'and config['defaultSource']=='authored','one originalHKCS context')
        require(config['host']=='127.0.0.1'and config['noPartialAnimation']is True and config['canonical10MappingApproved']is False and config['nativeApproval']is False and config['runtimeApplied']is False,'unapproved static independent comparison')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'changed input: '+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes())
    require(sorted(proof)==['defaults','engineHashes','engineRevision','groups','trace']and len(proof['groups'])==12 and len(sum(proof['trace'],[]))==15 and sum(len(g['polygons'])for g in proof['groups'])==29,'exact original full5 counts')
    require([sum((c['polygons']for c in row),[])for row in proof['trace']]==[g['polygons']for g in proof['groups']],'original traceP binding')
    recipe=json.loads((HERE/'recipe.json').read_bytes());groups=[[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12]];require(recipe['logicalRawGroupsOneBased']==groups and not any(recipe['approval'].values()),'exact unapproved authored hypothesis');mapped={'groups':[{'sourceRawOneBased':indices,'polygons':[p for raw in indices for p in proof['groups'][raw-1]['polygons']]}for indices in groups]};require([p for g in mapped['groups']for p in g['polygons']]==[p for g in proof['groups']for p in g['polygons']],'original ordered29P unchanged');materializer=module('jin_public_point_translation',HERE/'materialize-draft.py');candidate=json.loads((HERE/'fixtures-draft.json').read_bytes());require(candidate['groups']==materializer.load_candidate()and candidate['matrixExact']==['1','0','0','1','23/10','0']and not any(candidate['approval'].values())and not candidate['originalRoot']and not candidate['isOriginalEngineCapture'],'exact unapproved two-point source translation');author={'groups':[{'sourceRawOneBased':indices,'polygons':[p for raw in indices for p in candidate['groups'][raw-1]['polygons']]}for indices in groups]};sources={'selected':proof,'original':mapped,'authored':author};shared=module('jin_original_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets only at ROOT server start')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_page,original_selection,original_svg=shared.page,shared.selection,shared.source_svg
    def source_svg(proof_value,count=None,prefix=False):
        text=original_svg(proof_value,count,prefix);return text.replace('data-original-raw=','data-unapproved-group=')if proof_value is not proof else text
    shared.source_svg=source_svg
    def page(*params):
        shown={k:v for k,v in params[2].items()if k!='selected'}if params[1]is None else params[2];text=original_page(params[0],params[1],shown,params[3]).replace('원original raw ','원P묶음 ').replace('원authored raw ','저자P묶음 ');notice='<p>LOCALLY AUTHORED dot separation: source raw4 and5 completeP/Q+guide translate right23/10; other10raw unchanged. OriginalP grouped10 and authorP grouped10 are compared alongside domestic10; selectedsource retains original12raw. Positive public gaps are mathematical facts, while new placement/current/prefix/whole/runtime approval remains false. Group6 still has guide endpoint154,28 then144,28; no microclock or continuous-guide equivalence.</p><a href="/compare?source=selected&amp;domestic=1&amp;raw=4&amp;dview=single&amp;rview=single">원source raw4 · 국내번호 독립선택</a> <a href="/compare?source=selected&amp;domestic=1&amp;raw=5&amp;dview=single&amp;rview=single">원source raw5 · 국내번호 독립선택</a>'
        require(text.count('</h1>')==1,'page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','no engine execution requested');return original_selection(route,query)
    shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(10)]}
        require(selection('/whole','')is None,'whole selection')
        require(page('/whole',None,sources,dummy).count('<section class="panel">')==3,'whole page')
        for raw in[4,5]:
            selected=selection('/compare','source=selected&domestic=1&raw='+str(raw)+'&dview=single&rview=single');require(selected['raw']==raw and selected['domestic']==1,'independent numbers');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'raw page')
        selected=selection('/compare','source=authored&domestic=6&raw=6&dview=single&rview=single');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2 and selected['raw']==6,'hypothesis compound6 page')
        for pen in[3,4]:
            selected=selection('/compare','source=authored&domestic='+str(pen)+'&raw='+str(pen)+'&dview=single&rview=single');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'author point page')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'glyph':'朕','raw':12,'calls':15,'polygons':29,'originalSourceUnchanged':True,'wholeAndRaw4Raw5Pages':'PASS','twoWholeDotTranslationsOnly':True,'canonical10MappingApproved':False,'HTTP':0,'server':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
