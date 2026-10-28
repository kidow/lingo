import argparse,copy,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED="docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py";SHARED_SHA="ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d"
SOURCE="docs/hanja-actual-engine-capture-u77a5-2026-10-24/engine-whole-u77a5.json";SOURCE_SHA="774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889"
OLD_CONFIG="docs/hanja-source-raw-compare-u77a5-2026-10-24/config.json";OLD_CONFIG_SHA="6cd5d771d49d45f1ed4c18f8496679fc656553820b1a530fd1850f9bbb73e4fe"
MAPPING=[[4],[5],[1],[2,3],[0],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17]]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
    if not v:raise ValueError(m)
def main():
    p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--check-only',action='store_true');p.add_argument('--port',type=int);args=p.parse_args();config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exact config/adapter changed')
        require(config['schema']=='hanja-same-source-plain-V-logical-static-compare/v1' and config['glyph']=='瞥' and config['catalogStrokes']==16 and config['host']=='127.0.0.1' and config['sourceViewBox']=='0 0 200 200','one exact static context')
        require(config['sourceRootWasAuthored']is True and config['candidateOriginalRoot']is False and config['isOriginalEngineCapture']is False and config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False,'candidate is not original or approved')
        require(config['logicalRawGroupsZeroBased']==MAPPING and config['viewIsLogicalAliasOf18OriginalRawGroups']is True,'explicit16 logical viewing alias required')
        require(set(config['sourceRoots'])=={'original','authored'} and all(v['rawGroups']==16 and v['originalRawGroups']==18 and isinstance(v['root'],str)and isinstance(v['proofKind'],str)for v in config['sourceRoots'].values()),'sourceRoots renderer dictionaries and logical counts required')
        require(sha(ROOT/OLD_CONFIG)==OLD_CONFIG_SHA and config['domestic']==json.loads((ROOT/OLD_CONFIG).read_bytes())['domestic'],'unchanged RAM-only domestic16 source')
        require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA} and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'frozen original/shared shell required')
        for f,h in config['inputSHA256'].items():require(sha(ROOT/f)==h,'input changed: '+f)
    guards();spec=importlib.util.spec_from_file_location('bie_plain_v_materializer',HERE/'materialize-draft.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);candidate=m.load_candidate();report=m.verify(candidate);sources={'original':json.loads((ROOT/SOURCE).read_bytes()),'authored':candidate}
    spec=importlib.util.spec_from_file_location('bie_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);require(shared.FETCH_COUNT==0,'private media only fetched at ROOT server start')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        indexes=list(range(18))if count is None else[i for row in MAPPING[:count]for i in row]if prefix else MAPPING[count-1]
        view={'groups':[proof['groups'][i]for i in indexes]};value=original_svg(view)
        for local,index in enumerate(indexes):value=value.replace('data-original-raw="'+str(local+1)+'"','data-source-original-raw="'+str(index+1)+'"')
        return value.replace('<svg ','<svg data-logical-view="'+('whole'if count is None else str(count))+'" data-authored="'+str(proof is candidate).lower()+'" ',1)
    def page(*params):
        value=original_page(*params).replace(' raw ',' logical ').replace('원raw','원논리획').replace('원authored','저자후보').replace('원proof exact','원source exact; logical16 review alias of18raw; replacement is not engine capture')
        note='<p>Static logical16 alias of18 source raw groups. Current4 is originalH(raw3)+replacementV(raw4); whole and logical prefixes retain exact source polygons. No timing/native approval.</p>'
        return value.replace('</body>',note+'</body>')
    def selection(route,query):
        require(route!='/checks','legacy original-engine checks do not describe an authored transplant')
        return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    if args.check_only:
        old_domestic=shared.domestic_svg;shared.domestic_svg=lambda*unused:'<svg data-contract-placeholder="no-private-media"/>'
        try:
            whole=shared.page('/whole',shared.selection('/whole',''),sources,{})
            chosen=shared.selection('/compare','source=authored&domestic=4&raw=4&dview=single&rview=single');current=shared.page('/compare',chosen,sources,{})
            prefix=shared.selection('/compare','source=authored&domestic=4&raw=4&dview=prefix&rview=prefix');shared.page('/compare',prefix,sources,{})
            require('<svg'in whole and '<svg'in current and shared.source_svg(candidate,4,False).count('<path')==2 and shared.source_svg(sources['original'],4,False).count('<path')==6,'actual page/selection and logical4 composite contract')
            require(shared.FETCH_COUNT==0,'pure contract check must not fetch private media')
        finally:shared.domestic_svg=old_domestic
        print(json.dumps({**report,'pageContract':True,'selectionContract':True,'logicalCurrent4Paths':2,'privateHTTP':0,'server':0,'sharedWrites':0},ensure_ascii=False));return
    require(args.port is not None and 0<=args.port<=65535,'explicit local port required');old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
