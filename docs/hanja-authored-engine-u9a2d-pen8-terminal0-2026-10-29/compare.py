# -*- coding: utf-8 -*-
"""騭 actual authored end0 whole/current8/prefix8 comparison; publisher RAM only."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED="docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py";SHARED_SHA="ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d"
SOURCE="docs/hanja-goal-glyphwiki-batch887-2026-10-13/engine-proof.json";SOURCE_SHA="23b29e6c792a549d354e261f416e61668ce9dc1de86819118250c2c366ff1063"
CANDIDATE="docs/hanja-authored-engine-u9a2d-pen8-terminal0-2026-10-29/engine-authored-pen8-terminal0.json";CANDIDATE_SHA="e3ff8774511134995a8165ae04f83e1f5a11423c10cc8083ec8f29cd071252e4"
ROOTS={"original":{"root":"u9a2d","rawGroups":22,"proofKind":"fixed-public-original-full5-pen8-HOLD"},"candidate":{"root":"lingo-u9a2d-pen8-terminal0-author-draft","rawGroups":22,"proofKind":"actual-locally-authored-engine-pen8-terminal0-full5-unapproved"}}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def main():
    p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args();require(__debug__ and sys.flags.optimize==0 and 0<=a.port<=65535,'loopback asserted port');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==a.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exactconfig/wrapper');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA and sha(ROOT/CANDIDATE)==CANDIDATE_SHA,'source/readerpins')
        require(config['glyph']=='騭'and config['catalogStrokes']==20 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','context');require(config['sourceRoots']==ROOTS and config['defaultSource']=='candidate','exact2publicroots')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch887-2026-10-13/metadata.json").read_bytes());require(meta['candidate']['strokes']==20 and config['domestic']==meta['dictionary'],'domesticpin');require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is True and config['sourceGroupingApproved']is False,'unapprovedstaticonly')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'inputchanged:'+path)
    guards();original=json.loads((ROOT/SOURCE).read_bytes());candidate=json.loads((ROOT/CANDIDATE).read_bytes());require(set(original)==set(candidate)=={'engineRevision','engineHashes','groups','trace','defaults'},'actualfull5');require(all(original[k]==candidate[k]for k in['engineRevision','engineHashes','defaults']),'engineidentity');require(len(original['groups'])==len(candidate['groups'])==22,'22raw');require(len(sum(original['trace'],[]))==25 and len(sum(candidate['trace'],[]))==24,'actualcalls');require(sum(len(g['polygons'])for g in original['groups'])==48 and sum(len(g['polygons'])for g in candidate['groups'])==45,'actualP')
    for proof in[original,candidate]:require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'tracePexact')
    for i in range(22):
        if i!=8:require(original['groups'][i]==candidate['groups'][i]and original['trace'][i]==candidate['trace'][i],'other21exact')
    require(candidate['groups'][8]['raw']==[1,0,200,130.4,45.105,130.4,76.29,None,None,None,None],'exactadjustedraw9');require(len(candidate['trace'][8])==1 and candidate['trace'][8][0]['kind']=='cdDrawLine','terminal0line');receipt=json.loads((HERE/'capture.json').read_bytes());require(receipt['capture']['totalActualEngineExecutions']==2 and receipt['comparison']['allOther21Exact']is True,'realexecution/preservation')
    s=importlib.util.spec_from_file_location('zhi_fixed_static_reader',ROOT/SHARED);g=importlib.util.module_from_spec(s);s.loader.exec_module(g);require(g.FETCH_COUNT==0,'HTTP0prepare');sources={'original':original,'candidate':candidate};g.CONFIG=config;g.HERE=HERE;g.ROOT=ROOT;g.guards=guards;g.load_sources=lambda:sources
    old_selection=g.selection
    def selection(route,query):
        require(route in['/whole','/compare'],'onlywhole/current8/prefix8');selected=old_selection(route,query)
        if route=='/compare':require(selected['domestic']==8 and selected['raw']==9,'onlydom8/raw9')
        return selected
    g.selection=selection;old_page=g.page
    def page(route,selected,sources,domestic):return old_page(route,selected,sources,domestic).replace('<h1>','<p>騭20 / original22raw25calls48P / authored22raw24calls45P. Domestic8 clock only approved; whole/current8/prefix8/all20mapping remain unapproved. Raw9 firstV length differs; source end0 / adjusted end200.</p><h1>',1)
    g.page=page
    if a.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(20)]};require(selection('/whole','')is None,'whole');require(page('/whole',None,sources,dummy).count('<section class="panel">')==3,'threewholepanels')
        for source in['original','candidate']:
            for mode in['single','prefix']:
                selected=selection('/compare','source='+source+'&domestic=8&raw=9&dview='+mode+'&rview='+mode);require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'current/prefixcontract')
        require(g.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'騭','threeWholePanels':True,'current8Prefix8BothSources':True,'other21Exact':True,'raw':22,'calls':24,'P':45,'HTTP':0,'server':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(a.port)];g.main()
    finally:sys.argv=old
if __name__=='__main__':main()
