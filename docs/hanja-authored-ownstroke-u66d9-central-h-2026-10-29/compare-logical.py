import argparse,copy,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-logical.json'
SHARED="docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py";SHARED_SHA="ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d"
OLD_CONFIG="docs/hanja-authored-ownstroke-u66d9-central-h-2026-10-29/config.json";OLD_CONFIG_SHA="1967e79f78ffd771bcab86ef3a5bb1314da7c46c171d27b9b880fb69ab5fd99a"
SOURCE="docs/hanja-actual-engine-capture-u66d9-hkcs-2026-10-26/engine-whole-hkcs_m66d9.json";SOURCE_SHA="553333a846a8df6196c21940537080efc9f33f02f08414c3d076fa3add555822"
FIXTURE="docs/hanja-authored-ownstroke-u66d9-central-h-2026-10-29/fixtures-draft.json";FIXTURE_SHA="7c2f392b32f73af72e43af36f0474c20030f5a718fed3382f3a71b892016f165"
MAPPING=[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[20],[15],[16,17],[18],[19]]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
    if not v:raise ValueError(m)
def main():
    p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--check-only',action='store_true');p.add_argument('--port',type=int);args=p.parse_args();config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exact logical config/adapter changed')
        require(config['schema']=='hanja-original-clock-supported-logical-static-compare/v1' and config['glyph']=='曙' and config['catalogStrokes']==18 and config['host']=='127.0.0.1' and config['sourceViewBox']=='0 0 200 200','one local static18 context')
        require(config['logicalRawGroupsZeroBased']==MAPPING and config['viewIsLogicalAliasOf21OriginalRawGroups']is True and sorted(i for a in MAPPING for i in a)==list(range(21)),'18/21 bijective logical view required')
        require(config['sourceRoots']=={"original":{"root":"hkcs_m66d9","rawGroups":18,"originalRawGroups":21,"polygons":31,"proofKind":"Logical18 viewing alias of fixed original21raw full5"},"authored":{"root":"local_u66d9_hkcs_raw14_leftcontact_v1","rawGroups":18,"originalRawGroups":21,"polygons":31,"proofKind":"Logical18 viewing alias of existing authored raw14 contact candidate; not engine capture"}},'sourceRoots renderer dictionaries required')
        require(sha(ROOT/OLD_CONFIG)==OLD_CONFIG_SHA and config['domestic']==json.loads((ROOT/OLD_CONFIG).read_bytes())['domestic'],'existing controlled domestic18 RAM reference')
        require(config['sourceMappingApproved']is False and config['nativeApproval']is False and config['runtimeApplied']is False and config['noPartialAnimation']is True,'mapping hypotheses only')
        require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA} and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA and sha(ROOT/FIXTURE)==FIXTURE_SHA,'unchanged source geometry and shell required')
        for f,h in config['inputSHA256'].items():require(sha(ROOT/f)==h,'input changed: '+f)
    guards();original=json.loads((ROOT/SOURCE).read_bytes());candidate=json.loads((ROOT/FIXTURE).read_bytes());require(len(original['groups'])==len(candidate['groups'])==21 and sum(len(g['polygons'])for g in candidate['groups'])==31,'fixed21raw/31P');sources={'original':original,'authored':candidate}
    spec=importlib.util.spec_from_file_location('shu_logical_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);require(shared.FETCH_COUNT==0,'private media fetched only in ROOT server');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        indexes=list(range(21))if count is None else[i for row in MAPPING[:count]for i in row]if prefix else MAPPING[count-1];view={'groups':[proof['groups'][i]for i in indexes]};value=original_svg(view)
        for local,index in enumerate(indexes):value=value.replace('data-original-raw="'+str(local+1)+'"','data-source-original-raw="'+str(index+1)+'"')
        return value.replace('<svg ','<svg data-logical-view="'+('whole'if count is None else str(count))+'" ',1)
    def page(*params):
        value=original_page(*params).replace(' raw ',' logical ').replace('원raw','원논리획').replace('원authored','저자raw14접촉후보').replace('원proof exact','원source exact; logical18 hypothesis from21raw; not native mapping approval')
        return value.replace('</body>','<p>Unapproved logical18 mapping from unchanged21 raw groups. Raw14 H becomes logical12; raw21 point becomes logical14. Verify all current and critical prefix views against the original18 clock. Existing whole-contact PASS is separate.</p></body>')
    def selection(route,query):
        require(route!='/checks','legacy original checks do not approve logical mapping');return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    if args.check_only:
        old_domestic=shared.domestic_svg;shared.domestic_svg=lambda*unused:'<svg data-contract-placeholder="no-private-media"/>'
        try:
            require('<svg'in shared.page('/whole',shared.selection('/whole',''),sources,{}),'whole page contract')
            for pen in range(1,19):
                for mode in['single','prefix']:
                    selected=shared.selection('/compare','source=authored&domestic='+str(pen)+'&raw='+str(pen)+'&dview='+mode+'&rview='+mode);require('<svg'in shared.page('/compare',selected,sources,{}),'actual logical single/prefix page')
            point=shared.source_svg(candidate,14,False);require('data-source-original-raw="21"'in point and point.count('<path')==2,'logical14 source point21')
            prefix=shared.source_svg(candidate,14,True);require('data-source-original-raw="21"'in prefix and 'data-source-original-raw="16"'not in prefix,'point precedes lower sun at prefix14')
            require(shared.FETCH_COUNT==0,'pure logical contract cannot fetch media')
        finally:shared.domestic_svg=old_domestic
        print(json.dumps({'glyph':'曙','logicalPens':18,'sourceRawGroups':21,'sourcePolygons':31,'all21RawUsedExactlyOnce':True,'singleAndPrefixPages':36,'compoundPens':[2,6,16],'raw21PointLogical14':True,'privateHTTP':0,'server':0,'newGeometry':False,'mappingApproved':False,'runtimeApplied':False},ensure_ascii=False));return
    require(args.port is not None and 0<=args.port<=65535,'explicit local port');old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
