import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
ORIGINAL_CONFIG='docs/hanja-source-raw-compare-u9c49-hkcs-m-whole-2026-10-25/config.json';ORIGINAL_CONFIG_SHA='73e527c093798b341805cfdaffe35efdaf57fe7c4312e353aa732ded97165bd4'
SOURCE='docs/hanja-actual-engine-capture-u9c49-hkcs-m-2026-10-25/engine-whole-hkcs_m9c49.json';SOURCE_SHA='d6c0c87e387968e2af0f41ecd4a8f02007dd712b6d7f1dcd4a6188fb20cfcb6c'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='鱉 original HKCS / explicit authored raw2 static-only comparison, no logical-number mapping');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port only')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed config/adapter')
        require(sha(ROOT/ORIGINAL_CONFIG)==ORIGINAL_CONFIG_SHA and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'unchanged original reader/source')
        original_config=json.loads((ROOT/ORIGINAL_CONFIG).read_bytes())
        require(config['glyph']=='鱉'and config['catalogStrokes']==22 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200'and config['domestic']==original_config['domestic'],'fixed canonical reference identity')
        require(config['sourceRoots']=={'original':{'root':'hkcs_m9c49','rawGroups':25,'proofKind':'actual-original-full5-public-source'},'authored':{'root':'local_hkcs_m9c49_raw2_up4_v1','rawGroups':25,'proofKind':'locally-authored-positive-affine-not-engine-capture'}}and config['defaultSource']=='authored','closed original/authored context')
        require(config['sourceRootWasAuthored']is True and config['candidateOriginalRoot']is False and config['isOriginalEngineCapture']is False and config['canonical22MappingApproved']is False and config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False,'unapproved authored static only')
        for item in[config['materializer'],config['fixture'],config['recipe'],config['contactProof']]:require(sha(ROOT/item['path'])==item['SHA256'],'candidate pin changed')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed: '+path)
    guards();materializer=module('sho_public_affine_candidate',ROOT/config['materializer']['path']);candidate=json.loads((ROOT/config['fixture']['path']).read_bytes())
    require(candidate['groups']==materializer.load_candidate()and candidate['matrixExact']==['1','0','0','1','0','-4']and candidate['changedRawOneBased']==[2],'exact one-whole-source affine')
    require(not candidate['originalRoot']and not candidate['originalWhole']and not candidate['isOriginalEngineCapture']and not candidate['canonical22MappingApproved']and not any(candidate['approval'].values()),'candidate not original/approved')
    original=json.loads((ROOT/SOURCE).read_bytes());sources={'original':original,'authored':candidate}
    require(len(candidate['groups'])==25 and sum(len(g['polygons'])for g in candidate['groups'])==48 and all(candidate['groups'][i]==original['groups'][i]for i in range(25)if i!=1),'other24 original groups preserved')
    shared=module('sho_reused_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets not fetched during preparation')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        result=original_svg(proof,count,prefix);return result.replace('data-original-raw=','data-authored-slot=')if proof is candidate else result
    def page(*params):
        text=original_page(*params).replace('원authored raw ','저자후보 raw ').replace('원original raw ','원HKCS raw ').replace('원proof exact','원HKCS만 original exact; author candidate is not engine capture')
        notice='<p>AUTHORED complete raw2 dot translation Y minus4 only. Same original P and Q guide/shape/width preserved; other24raw unchanged. Exact public roofV5 gap1.2, no new contact against raw4/9/11 or any other raw. OriginalHKCS whole HOLD retained. Domestic22 and source25 numbers are independently selected; no source mapping, native temporal or runtime approval.</p><a href="/compare?source=authored&amp;domestic=1&amp;raw=2&amp;dview=single&amp;rview=single">후보 raw2 · 국내번호 독립선택</a> <a href="/compare?source=original&amp;domestic=1&amp;raw=2&amp;dview=single&amp;rview=single">원형 raw2 · 국내번호 독립선택</a>'
        require(text.count('</h1>')==1,'existing page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','legacy engine checks do not describe authored candidate');return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(22)]}
        require(selection('/whole','')is None,'whole route contract')
        selected=selection('/compare','source=authored&domestic=1&raw=2&dview=single&rview=single')
        require(selected=={'source':'authored','domestic':1,'raw':2,'dview':'single','rview':'single'},'independent selected numbers')
        require(page('/whole',None,sources,dummy).count('<section class="panel">')==3 and page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'actual shared page contracts')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'groups':25,'polygons':48,'changedRawOneBased':[2],'other24Exact':True,'wholeAndRaw2PageContract':'PASS','canonical22MappingApproved':False,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
