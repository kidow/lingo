import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
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
        require(config['sourceRoots']=={"original":{"root":"hkcs_m5b7c","rawGroups":25,"proofKind":"actual-original-full5-public-source"},"authored":{"root":"local_hkcs_m5b7c_v2_call4V_shortDLshear_topVmix","rawGroups":25,"proofKind":"sameglyph-mixedparts-author-not-engine-capture"}}and config['defaultSource']=='authored'and config['mixedParts']is True and config['sameGlyphDonor']is True,'closed v2mixedpartscontext')
        require(config['sourceRootWasAuthored']is True and config['candidateOriginalRoot']is False and config['isOriginalEngineCapture']is False and config['canonical19MappingApproved']is False and config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False,'unapproved authored static only')
        for item in[config['materializer'],config['fixture'],config['recipe'],config['contactProof']]:require(sha(ROOT/item['path'])==item['SHA256'],'candidate pin changed')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed: '+path)
    guards();materializer=module('sho_public_affine_candidate',ROOT/config['materializer']['path']);candidate=json.loads((ROOT/config['fixture']['path']).read_bytes())
    require(candidate['groups']==materializer.load_candidate()and candidate['matrixExact']==["1","0","0","2/7","17/10","692/175"]and candidate['replacement']=={'recipientRawOneBased':15,'donorRawOneBased':21,'wholeDonorP':1,'originalRecipientP':2}and candidate['mixedParts']is True and candidate['sameGlyphDonor']is True,'exact one-whole-source affine')
    require(candidate['corrections']=={"excludedWholeCall":{"raw":4,"call":2,"kind":"cdDrawCurve","P":1,"keptCall":1,"keptP":3},"raw5WholePositiveShear":["1","0","-1075/3804","2527/1902","82259/4755","-19130/951"],"raw5FixedQEnd":["1033/20","7652/125"],"headVertexSource":["547/10","46"],"headVertexTarget":["59","41"],"topV21To15Unchanged":True},'exact v2corrections')
    require(not candidate['originalRoot']and not candidate['originalWhole']and not candidate['isOriginalEngineCapture']and not candidate['canonical19MappingApproved']and not any(candidate['approval'].values()),'candidate not original/approved')
    original=json.loads((ROOT/SOURCE).read_bytes());sources={'original':original,'authored':candidate}
    require(len(candidate['groups'])==25 and sum(len(g['polygons'])for g in candidate['groups'])==43 and all(candidate['groups'][i]==original['groups'][i]for i in range(25)if i not in[3,4,14]),'other22 original groups preserved')
    shared=module('sho_reused_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets not fetched during preparation')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        result=original_svg(proof,count,prefix);return result.replace('data-original-raw=','data-authored-slot=')if proof is candidate else result
    def page(*params):
        text=original_page(*params).replace('원authored raw ','저자후보 raw ').replace('원original raw ','원HKCS raw ').replace('원proof exact','원HKCS만 original exact; author candidate is not engine capture')
        notice='<p>V2 AUTHOR mixedparts, notoriginalwhole/enginecapture. Original45P /v1author44P /v2author43P. Excludewholeunsupportedraw4call2largeDL P1only, keepexactcall1V3P. Raw5wholeP/Qpositive shear fixesoriginalQend andmapsheadtoactualVfootinside(59,41); no crop/bridge, nouniformshape/fontidentity. Newcontacts onlytopV15-H16; lost4-6isremovedlargeDLtoleftboxV. V4-shortDL5 andshortDL5-boxH8contactsretained; nonewH2-shortDL5contact. Other22raw andoriginalV21/empty7,11exact. Logical19/native/runtimeunapproved.</p><a href="/compare?source=authored&amp;domestic=1&amp;raw=4&amp;dview=single&amp;rview=single">국내1 · Vcall1만</a><a href="/compare?source=authored&amp;domestic=4&amp;raw=5&amp;dview=single&amp;rview=single">국내4 · shearshortDL5</a>'
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
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'rawSlots':25,'originalP':45,'v1AuthorP':44,'v2AuthorP':43,'other22Exact':True,'excludedWholeCall':'4:2','raw5WholePositiveShear':True,'mixedParts':True,'wholeAndTargetPageContract':'PASS','canonical19MappingApproved':False,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
