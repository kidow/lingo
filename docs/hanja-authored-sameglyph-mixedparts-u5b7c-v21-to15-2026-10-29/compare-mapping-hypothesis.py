import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-mapping-hypothesis.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
ORIGINAL_CONFIG='docs/hanja-source-raw-compare-u5b7c-originals-2026-10-29/config.json';ORIGINAL_CONFIG_SHA='43455f68d7ed1ac8d9e06856db9dc19098a853f76d168299ffc8f65fbefea61e'
SOURCE='docs/hanja-actual-engine-capture-u5b7c-hkcs-m-2026-10-25/engine-whole-hkcs_m5b7c.json';SOURCE_SHA='15c216d7e4e468e8f3820026dd76d1cf86e0d3af394256f89d98bbc0e04cf5df'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='孼 original HKCS / explicit authored raw9 static-only comparison, no logical-number mapping');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port only')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed config/adapter')
        require(sha(ROOT/ORIGINAL_CONFIG)==ORIGINAL_CONFIG_SHA and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'unchanged original reader/source')
        original_config=json.loads((ROOT/ORIGINAL_CONFIG).read_bytes())
        require(config['glyph']=='孼'and config['catalogStrokes']==19 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200'and config['domestic']==original_config['domestic'],'fixed canonical reference identity')
        require(config['sourceRoots']=={"originalRaw":{"root":"hkcs_m5b7c","rawGroups":25,"proofKind":"actual-original-full5-public-source"},"authoredRaw":{"root":"local_hkcs_m5b7c_sameglyphV21_to15_v1","rawGroups":25,"proofKind":"sameglyph-mixedparts-author-not-engine-capture"},"original":{"root":"hypothesis_originalP_hkcs_m5b7c_logical19","rawGroups":19,"proofKind":"unapproved-reordered-P-grouping-not-engine-capture"},"authored":{"root":"hypothesis_mixedparts_hkcs_m5b7c_logical19","rawGroups":19,"proofKind":"unapproved-reordered-mixedparts-P-grouping-not-engine-capture"}}and config['defaultSource']=='authored'and config['mixedParts']is True and config['sameGlyphDonor']is True,'closed mixedpartslogicalcontext')
        require(config['sourceRootWasAuthored']is True and config['candidateOriginalRoot']is False and config['isOriginalEngineCapture']is False and config['canonical19MappingApproved']is False and config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False,'unapproved authored static only')
        for item in[config['materializer'],config['fixture'],config['recipe'],config['contactProof']]:require(sha(ROOT/item['path'])==item['SHA256'],'candidate pin changed')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed: '+path)
    guards();materializer=module('sho_public_affine_candidate',ROOT/config['materializer']['path']);candidate=json.loads((ROOT/config['fixture']['path']).read_bytes())
    require(candidate['groups']==materializer.load_candidate()and candidate['matrixExact']==["1","0","0","2/7","17/10","692/175"]and candidate['replacement']=={'recipientRawOneBased':15,'donorRawOneBased':21,'wholeDonorP':1,'originalRecipientP':2}and candidate['mixedParts']is True and candidate['sameGlyphDonor']is True,'exact one-whole-source affine')
    require(not candidate['originalRoot']and not candidate['originalWhole']and not candidate['isOriginalEngineCapture']and not candidate['canonical19MappingApproved']and not any(candidate['approval'].values()),'candidate not original/approved')
    original=json.loads((ROOT/SOURCE).read_bytes());hyp=json.loads((HERE/'mapping-hypothesis.json').read_bytes());mapping=[[4],[1,2],[3],[5],[6],[7,8,9],[10],[11,12,13],[14],[15],[16],[17],[18],[19],[20],[21],[22,23],[24],[25]];require(hyp['oneBasedLogicalRawGroups']==mapping and not any(hyp['approval'].values())and sorted(sum(mapping,[]))==list(range(1,26)),'all25raw once unapproved19group hypothesis');group=lambda proof:{'groups':[{'sourceRawOneBased':indices,'polygons':[p for raw in indices for p in proof['groups'][raw-1]['polygons']]}for indices in mapping]};original_grouped=group(original);author_grouped=group(candidate);require(sum(len(g['polygons'])for g in author_grouped['groups'])==44,'all44P retained');sources={'originalRaw':original,'authoredRaw':candidate,'original':original_grouped,'authored':author_grouped}
    require(len(candidate['groups'])==25 and sum(len(g['polygons'])for g in candidate['groups'])==44 and all(candidate['groups'][i]==original['groups'][i]for i in range(25)if i!=14),'other24 original groups preserved')
    shared=module('sho_reused_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets not fetched during preparation')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        result=original_svg(proof,count,prefix);return result.replace('data-original-raw=','data-unapproved-logical-group=')if proof is original_grouped or proof is author_grouped else result.replace('data-original-raw=','data-authored-slot=')if proof is candidate else result
    def page(*params):
        shown={k:v for k,v in params[2].items()if k in['original','authored']}if params[1]is None else params[2];text=original_page(params[0],params[1],shown,params[3]).replace('원authored raw ','저자후보 raw ').replace('원original raw ','원HKCS raw ').replace('원proof exact','원HKCS만 original exact; author candidate is not engine capture')
        notice='<p>UNAPPROVED19logical static hypothesis, all25source rawgroups includingempty7/11 andall44authoredP retained. Explicitorderraw4first, thenraw1/2/3; notoriginalengineorder. Criticalcurrent1: raw4includesV+longDLsweep butpublisherclock1recordsVdownonly; extraDLunresolved. Current2 originalV→HguideoverrunY43.12→37.9 unresolved. No bridge/retracing/microclock ormappingapproval. TopV21→15mixedparts remains separatelyauthored, originaldonor21unchanged. source original/authored =logical1..19; originalRaw/authoredRaw=raw1..25.</p>'
        require(text.count('</h1>')==1,'existing page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','legacy engine checks do not describe authored candidate');return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(19)]}
        require(selection('/whole','')is None,'whole route contract')
        selected=selection('/compare','source=authored&domestic=1&raw=15&dview=single&rview=single')
        require(selected=={'source':'authored','domestic':1,'raw':15,'dview':'single','rview':'single'},'independent selected numbers')
        require(page('/whole',None,sources,dummy).count('<section class="panel">')==3 and page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'actual shared page contracts')
        for group_number in range(1,20):
            for view in['single','prefix']:
                selected=selection('/compare','source=authored&domestic='+str(group_number)+'&raw='+str(group_number)+'&dview='+view+'&rview='+view);require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'all19current-prefix contract')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'rawGroups':25,'logicalGroups':19,'authoredP':44,'allOriginalRawOnce':True,'emptyRawRows':[7,11],'all19CurrentPrefixContract':'PASS','criticalExtraSweepUnresolved':True,'canonical19MappingApproved':False,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
