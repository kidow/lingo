# -*- coding: utf-8 -*-
"""Exact authored terminal0 whole/current/prefix comparison; publisher media remains RAM only."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-actual-engine-capture-u7a48-hkcs-2026-10-26/engine-whole-hkcs_m7a48.json";SOURCE_SHA="911dc61d82647fc17df009c7499c0e8b8d36c7280a636ef5296716bf264ec3fa"
CANDIDATE="docs/hanja-authored-engine-u7a48-terminal0-2026-10-29/engine-authored-terminal0.json";CANDIDATE_SHA="c6b7ea8b88b0db58bd7268a22807724fd4410167b49337f6ca340e721578e148"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='穈 original public16raw/42P versus catalog16/domestic16, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='穈'and config['catalogStrokes']==16 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']=={"original":{"root":"hkcs_m7a48","rawGroups":16,"proofKind":"fixed-public-original-full5-HOLD"},"candidate":{"root":"lingo-u7a48-hkcs-terminal0-author-draft","rawGroups":16,"proofKind":"actual-locally-authored-engine-terminal0-full5-unapproved"}}and config['defaultSource']=='candidate','closed single originalroot')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch579-2026-10-11/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==16,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is True and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5 source');require(len(proof['groups'])==16 and len(sum(proof['trace'],[]))==21 and sum(len(g['polygons'])for g in proof['groups'])==42,'fixed16raw21calls42P');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');require(sha(ROOT/CANDIDATE)==CANDIDATE_SHA,'fixed candidate capture');candidate=json.loads((ROOT/CANDIDATE).read_bytes());require(set(candidate)==set(proof),'fresh full5 fieldset');require(candidate['engineRevision']==proof['engineRevision']and candidate['engineHashes']==proof['engineHashes']and candidate['defaults']==proof['defaults'],'pinned engine settings');require(len(candidate['groups'])==16 and len(sum(candidate['trace'],[]))==21 and sum(len(g['polygons'])for g in candidate['groups'])==41,'candidate16raw21calls41P');require([sum((c['polygons']for c in calls),[])for calls in candidate['trace']]==[g['polygons']for g in candidate['groups']],'candidateP traceexact');require(all(candidate['groups'][i]==proof['groups'][i]and candidate['trace'][i]==proof['trace'][i]for i in range(16)if i!=10),'other15rows exact');require(candidate['trace'][10][:2]==proof['trace'][10][:2],'original V/Q exact');require(candidate['groups'][10]['raw']==[3,2000,2000,156,72,156,100,180,100,None,None],'authored raw11');require(candidate['trace'][10][2]['args']==[166,100,180,100,2006,2000],'onlysupported terminal0');sources={'original':proof,'candidate':candidate}
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        if route=='/mapping':
            from urllib.parse import parse_qs,urlencode
            q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode'}and all(len(v)==1 for v in q.values()),'exactmappingquery');pen=q['pen'][0];mode=q['mode'][0];require(pen in[str(i)for i in range(1,17)]and mode in['current','prefix'],'mappingbounds');view='prefix'if mode=='prefix'else'single';return original_selection('/compare',urlencode({'source':'candidate','domestic':pen,'raw':pen,'dview':view,'rview':view}))
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_page=shared.page
    def page(route,selected,sources,domestic):
        html=original_page('/compare'if route=='/mapping'else route,selected,sources,domestic)
        nav=' '.join('<a href="/mapping?pen='+str(i)+'&amp;mode='+mode+'">'+str(i)+' '+mode+'</a>'for mode in['current','prefix']for i in range(1,17));return html.replace('<h1>','<p><nav>' +nav+ '</nav>원본HK terminal5 HOLD 보존 / 새저자 terminal0 actualcapture16raw21calls41P. 원16clock은확인됨; candidate whole·각역할·시간은아직미승인</p><h1>',1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(16)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==3,'whole three panels')
        for domestic,raw in[(1,1),(11,11),(16,16)]:
            for mode in['single','prefix']:
                selected=selection('/compare','source=candidate&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        for pen in range(1,17):
            for mode in['current','prefix']:
                selected=selection('/mapping','pen='+str(pen)+'&mode='+mode);require(shared.page('/mapping',selected,sources,dummy).count('<section class="panel">')==2,'all32actualmappingpages')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'穈','catalog':16,'domesticSelectionClips':16,'raw':16,'calls':21,'P':41,'wholeCurrentPrefixContract':'PASS','HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
