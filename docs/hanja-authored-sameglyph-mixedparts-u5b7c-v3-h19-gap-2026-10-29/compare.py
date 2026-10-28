"""孼 V3 one-H19 affected static review; previousV2 andV3 are authored, private SVG RAM only."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
MAPPING=[[4],[1,2],[3],[5],[6],[7,8,9],[10],[11,12,13],[14],[15],[16],[17],[18],[19],[20],[21],[22,23],[24],[25]]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='孼 affectedH19 only: whole/current14/prefix14');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args();require(__debug__ and sys.flags.optimize==0 and 0<=a.port<=65535,'asserted loopbackport');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==a.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exact config/adapter');require(sha(ROOT/SHARED)==SHARED_SHA,'shared shell changed')
        require(config['glyph']=='孼'and config['catalogStrokes']==19 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','closed19context');require(config['sourceRoots']=={"previous":{"root":"previousV2_mixedparts_logical19","rawGroups":19,"proofKind":"previous-authored-static-P-grouping-not-engine-capture"},"authored":{"root":"v3_H19shortened_mixedparts_logical19","rawGroups":19,"proofKind":"new-authored-static-P-grouping-not-engine-capture"}}and config['defaultSource']=='authored','exact previous/new authoredcontexts')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch707-2026-10-12/metadata.json").read_bytes());require(config['domestic']==meta['dictionary'],'fixed domesticmetadata');require(config['noPartialAnimation']is True and config['mixedParts']is True and config['sameGlyphDonor']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGroupingApproved']is False and config['affectedLogical']==14 and config['affectedRawSlot']==19,'unapproved affectedscope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'inputchanged:'+path)
    guards();previous=json.loads((ROOT/config['previousFixture']['path']).read_bytes());candidate=json.loads((ROOT/config['fixture']['path']).read_bytes());mat=module('eol_v3_materializer',ROOT/config['materializer']['path']);require(candidate['groups']==mat.load_candidate(),'exact materializedV3');require(len(candidate['groups'])==25 and sum(len(g['polygons'])for g in candidate['groups'])==43,'all25slots43P');require(all(candidate['groups'][i]==previous['groups'][i]for i in range(25)if i!=18),'other24raw exact');require(len(candidate['groups'][18]['polygons'])==2,'wholeH19P2');require(json.loads((ROOT/config['mapping']['path']).read_bytes())['oneBasedLogicalRawGroups']==MAPPING and sorted(sum(MAPPING,[]))==list(range(1,26)),'all25raw once logical19mapping')
    group=lambda proof:{'groups':[{'sourceRawOneBased':ids,'polygons':[p for raw in ids for p in proof['groups'][raw-1]['polygons']]}for ids in MAPPING]};sources={'previous':group(previous),'authored':group(candidate)};require(all(sum(len(g['polygons'])for g in v['groups'])==43 for v in sources.values()),'all43P retained')
    shared=module('eol_v3_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no privatepreparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources;oldselection,oldpage,oldsvg=shared.selection,shared.page,shared.source_svg
    def selection(route,query):
        require(route in['/','/whole','/compare'],'onlyaffectedstatic routes');v=oldselection(route,query)
        if v is not None:require(v['domestic']==14 and v['raw']==14 and v['source']in['previous','authored'],'onlyaffectedlogical14')
        return v
    def page(*args):return oldpage(*args).replace('원previous raw ','이전V2저자논리 ').replace('원authored raw ','새V3저자논리 ').replace('원proof exact','Bothprevious/new areauthored mixedparts. Originalengineproof preserved separately; no originalwholeclaim.')
    def source_svg(*args):return oldsvg(*args).replace('data-original-raw=','data-authored-logical=')
    shared.selection=selection;shared.page=page;shared.source_svg=source_svg
    if a.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(19)]};require(selection('/whole','')is None and page('/whole',None,sources,dummy).count('<section class="panel">')==3,'whole3panels')
        for source in['previous','authored']:
            for view in['single','prefix']:
                v=selection('/compare','source='+source+'&domestic=14&raw=14&dview='+view+'&rview='+view);require(page('/compare',v,sources,dummy).count('<section class="panel">')==2,'affectedcurrent/prefix14')
        try:selection('/compare','source=authored&domestic=13&raw=13&dview=single&rview=single')
        except ValueError:pass
        else:raise ValueError('unaffectedlogicalroute accepted')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'rawSlots':25,'logicalGroups':19,'P':43,'changedRaw':19,'changedP':2,'otherPExact':41,'otherRawExact':24,'affectedWholeCurrentPrefix14':'PASS','unaffectedRouteRejected':True,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(a.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
