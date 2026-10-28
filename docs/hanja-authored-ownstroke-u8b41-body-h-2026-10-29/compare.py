import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
CONFIG=HERE/'config.json'
SHARED="docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py"
SHARED_SHA="ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d"
META="docs/hanja-goal-glyphwiki-batch385-2026-10-09/metadata.json"
META_SHA="6bee2935a3d31e82abc6889943ae3bfcc127341a440fe092c15442c19fae3d5b"
SOURCE="docs/hanja-goal-glyphwiki-batch1032-2026-10-13/engine-whole-u8b41-ue0103.json"
SOURCE_SHA="774ae3a6caa83ad1e5bbba7f88386a414e8d1ef249c555c2cd4f29c14f279d86"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(value,message):
    if not value:raise ValueError(message)
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--config-sha',required=True);parser.add_argument('--check-only',action='store_true');parser.add_argument('--port',type=int);args=parser.parse_args()
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exact candidate config/adapter changed')
        require(config['schema']=='hanja-single-source-affine-static-comparison/v1' and config['glyph']=='譁' and config['catalogStrokes']==18 and config['sourceViewBox']=='0 0 200 200' and config['host']=='127.0.0.1','one local static context only')
        require(config['sourceRootWasAuthored']is True and config['candidateOriginalRoot']is False and config['isOriginalEngineCapture']is False and config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False,'author static draft is not original/approved')
        require(config['sourceRoots']=={'original':'u8b41-ue0103','authored':'local_u8b41_ue0103_raw16_x224over163_20261029','hypothesis':'local_u8b41_18logical_mapping_hypothesis'} and config['defaultSource']=='authored','exact original/authored/raw-role-hypothesis only')
        require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA} and sha(ROOT/SHARED)==SHARED_SHA,'reuse unchanged static shell')
        require(sha(ROOT/META)==META_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'metadata/source changed')
        metadata=json.loads((ROOT/META).read_bytes());require(config['domestic']=={**metadata['dictionary'],'clips':18,'privateMediaSaved':False},'exact RAM-only domestic source')
        for p,h in config['inputSHA256'].items():require(sha(ROOT/p)==h,'candidate input changed: '+p)
    guards()
    path=HERE/'materialize-draft.py';spec=importlib.util.spec_from_file_location('hua_affine_static_draft',path);draft=importlib.util.module_from_spec(spec);spec.loader.exec_module(draft);candidate=draft.load_candidate();report=draft.verify()
    require(candidate['matrixExact']==['224/163','0','0','1','-21472/815','0'] and candidate['changedRawZeroBased']==[15] and report['exactRaw16Raw20UnionContactArea']=='4' and report['newCentralVRaw18ContactAccepted']is False,'single positive originalP affine only')
    sources={'original':json.loads((ROOT/SOURCE).read_bytes()),'authored':candidate,'hypothesis':draft.hypothesis(candidate)}
    spec=importlib.util.spec_from_file_location('hua_affine_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);require(shared.FETCH_COUNT==0,'publisher fetched only in RAM at root server start')
    render_config={**config,'sourceRoots':{key:{'root':root,'rawGroups':len(sources[key]['groups']),'proofKind':'original-public-engine-capture'if key=='original'else'locally-authored-positive-affine-not-engine-capture'}for key,root in config['sourceRoots'].items()}}
    require(set(render_config['sourceRoots'])=={'original','authored','hypothesis'}and [render_config['sourceRoots'][k]['rawGroups']for k in ['original','authored','hypothesis']]==[20,20,18],'exact original20/authored20/unapproved18hypothesis rendering projection')
    shared.CONFIG=render_config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        value=original_svg(proof,count,prefix)
        return value.replace('data-original-raw=','data-authored-slot=')if proof is not sources['original'] else value
    def page(*params):
        return original_page(*params).replace('원authored raw ','저자 affine slot ').replace('원original raw ','원본VS3 raw ').replace('원proof exact','원source exact; authored raw16 affine and18role hypothesis are unapproved; centralV crossing requires ROOT review')
    def selection(route,query):
        require(route!='/checks','legacy original engine checks do not describe the authored affine')
        return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    if args.check_only:
        synthetic={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(18)]}
        require(selection('/whole','')is None,'whole selection contract')
        selected=selection('/compare','source=hypothesis&domestic=13&raw=13&dview=prefix&rview=prefix')
        require(selected=={'source':'hypothesis','domestic':13,'raw':13,'dview':'prefix','rview':'prefix'},'compare selection contract')
        whole=page('/whole',None,sources,synthetic);comparison=page('/compare',selected,sources,synthetic)
        require(whole.count('<section class="panel">')==4 and comparison.count('<section class="panel">')==2 and render_config['sourceRoots']['authored']['root']in whole,'actual shared whole/compare page contract')
        require(shared.FETCH_COUNT==0,'synthetic domestic contract test must not fetch')
        print(json.dumps({**report,'HTTP':0,'server':0,'sharedCodeChanged':False,'sharedWholePageContract':'PASS','sharedCompareSelectionAndPageContract':'PASS','syntheticDomesticOnly':True,'nativeApproval':False},ensure_ascii=False));return
    require(args.port is not None and 0<=args.port<=65535,'explicit local port required')
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
