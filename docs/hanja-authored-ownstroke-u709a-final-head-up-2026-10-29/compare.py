import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
ORIGINAL_CONFIG='docs/hanja-source-raw-compare-u709a-hkcs-u-whole-2026-10-25/config.json';ORIGINAL_CONFIG_SHA='e416df0cee68b4b011fa0f5df28e2cab300af70b119127d64f59e1bc1a444324'
SOURCE='docs/hanja-actual-engine-capture-u709a-hkcs-u-2026-10-25/engine-whole-hkcs_u709a.json';SOURCE_SHA='cd7b53e28babc7db1d2e6be1878ab395c8096308b108fd1148af82df19174b46'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='炚 original HKCS / explicit authored raw9 static-only comparison, no logical-number mapping');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port only')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed config/adapter')
        require(sha(ROOT/ORIGINAL_CONFIG)==ORIGINAL_CONFIG_SHA and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'unchanged original reader/source')
        original_config=json.loads((ROOT/ORIGINAL_CONFIG).read_bytes())
        require(config['glyph']=='炚'and config['catalogStrokes']==8 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200'and config['domestic']==original_config['domestic'],'fixed canonical reference identity')
        require(config['sourceRoots']=={'original':{'root':'hkcs_u709a','rawGroups':9,'proofKind':'actual-original-full5-public-source'},'authored':{'root':'local_hkcs_u709a_raw9_head_up_v1','rawGroups':9,'proofKind':'locally-authored-positive-affine-not-engine-capture'}}and config['defaultSource']=='authored','closed original/authored context')
        require(config['sourceRootWasAuthored']is True and config['candidateOriginalRoot']is False and config['isOriginalEngineCapture']is False and config['canonical8MappingApproved']is False and config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False,'unapproved authored static only')
        for item in[config['materializer'],config['fixture'],config['recipe'],config['contactProof']]:require(sha(ROOT/item['path'])==item['SHA256'],'candidate pin changed')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed: '+path)
    guards();materializer=module('sho_public_affine_candidate',ROOT/config['materializer']['path']);candidate=json.loads((ROOT/config['fixture']['path']).read_bytes())
    require(candidate['groups']==materializer.load_candidate()and candidate['matrixExact']==["1","0","0","96/91","0","-1873/182"]and candidate['changedRawOneBased']==[9],'exact one-whole-source affine')
    require(not candidate['originalRoot']and not candidate['originalWhole']and not candidate['isOriginalEngineCapture']and not candidate['canonical8MappingApproved']and not any(candidate['approval'].values()),'candidate not original/approved')
    original=json.loads((ROOT/SOURCE).read_bytes());sources={'original':original,'authored':candidate}
    require(len(candidate['groups'])==9 and sum(len(g['polygons'])for g in candidate['groups'])==17 and all(candidate['groups'][i]==original['groups'][i]for i in range(9)if i!=8),'other8 original groups preserved')
    shared=module('sho_reused_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets not fetched during preparation')
    shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        result=original_svg(proof,count,prefix);return result.replace('data-original-raw=','data-authored-slot=')if proof is candidate else result
    def page(*params):
        text=original_page(*params).replace('원authored raw ','저자후보 raw ').replace('원original raw ','원HKCS raw ').replace('원proof exact','원HKCS만 original exact; author candidate is not engine capture')
        notice='<p>AUTHORED complete raw9 positive Yaffine only. PublicP bottom187.3 fixed, top59.9 moved52.9 one unit above publicleftdot53.9. OriginalP and Qguide same affine, other8raw unchanged. Existing positive contacts raw7/8 preserved but exact overlap areas change; no new/lost contact. Not an engine capture, originalwhole, canonical8mapping or temporal/runtime approval.</p><a href="/compare?source=authored&amp;domestic=8&amp;raw=9&amp;dview=single&amp;rview=single">후보raw9 · 국내8은독립선택</a> <a href="/compare?source=original&amp;domestic=8&amp;raw=9&amp;dview=single&amp;rview=single">원raw9</a>'
        require(text.count('</h1>')==1,'existing page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','legacy engine checks do not describe authored candidate');return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(8)]}
        require(selection('/whole','')is None,'whole route contract')
        selected=selection('/compare','source=authored&domestic=1&raw=9&dview=single&rview=single')
        require(selected=={'source':'authored','domestic':1,'raw':9,'dview':'single','rview':'single'},'independent selected numbers')
        require(page('/whole',None,sources,dummy).count('<section class="panel">')==3 and page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'actual shared page contracts')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'groups':9,'polygons':17,'changedRawOneBased':[9],'other8Exact':True,'wholeAndRaw9PageContract':'PASS','canonical8MappingApproved':False,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
