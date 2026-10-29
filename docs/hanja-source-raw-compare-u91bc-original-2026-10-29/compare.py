# -*- coding: utf-8 -*-
"""Exact original 醼 whole/current raw comparison; private SVG stays existing server RAM."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
SOURCE="docs/hanja-goal-glyphwiki-batch722-2026-10-12/engine-proof.json";SOURCE_SHA="b054cf966dd4f716e914a71ff35bc91f9d94cf6f00469173e17604e811f85049"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='醼 original public25raw/55P versus catalog23/domestic23, static only');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback port only');config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'fixed adapter/config');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixed source/reader')
        require(config['glyph']=='醼'and config['catalogStrokes']==23 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','original context')
        require(config['sourceRoots']=={"selected":{"root":"u91bc","rawGroups":25,"proofKind":"fixed-public-original-full5-terminal5-HOLD"}}and config['defaultSource']=='selected','exactoriginalroot')
        meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch722-2026-10-12/metadata.json").read_bytes());require(config['domestic']==meta['dictionary']and meta['candidate']['strokes']==23,'fixed domestic metadata')
        require(config['noPartialAnimation']is True and config['nativeApproval']is False and config['runtimeApplied']is False and config['sourceGeometryChanged']is False and config['sourceGroupingApproved']is False,'static unapproved scope')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'input changed:'+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes());require(set(proof)=={'engineRevision','engineHashes','groups','trace','defaults'},'complete originalfull5 source');require(len(proof['groups'])==25 and len(sum(proof['trace'],[]))==30 and sum(len(g['polygons'])for g in proof['groups'])==55,'fixed25raw30calls55P');require([sum((c['polygons']for c in calls),[])for calls in proof['trace']]==[g['polygons']for g in proof['groups']],'sourceP traceexact');sources={'selected':proof}
    shared=module('xuan_original_static',ROOT/SHARED);require(shared.FETCH_COUNT==0,'no private preparationfetch');shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_selection=shared.selection
    def selection(route,query):
        if route=='/mapping':
            from urllib.parse import parse_qs
            q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode'}and all(len(v)==1 for v in q.values()),'exactmappingquery');pen=q['pen'][0];mode=q['mode'][0];require(pen in[str(i)for i in range(1,24)]and mode in['current','prefix'],'mappingbounds');return {'mappingPen':int(pen),'mappingMode':mode}
        require(route!='/checks','legacyengine checks not partof newstatic review');return original_selection(route,query)
    shared.selection=selection
    original_page=shared.page
    def page(route,selected,sources,domestic):
        if route=='/mapping':
            import html
            pen=selected['mappingPen'];prefix=selected['mappingMode']=='prefix';groups=[[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[16],[17,18],[19],[14],[13],[15],[20],[21],[22],[23],[24],[25]];raws=sum(groups[:pen],[])if prefix else groups[pen-1];require(sorted(sum(groups,[]))==list(range(1,26)),'all25rawonce');proof={'groups':[sources['selected']['groups'][i-1]for i in raws]};ps=shared.source_svg(proof);ds=shared.domestic_svg(domestic,pen,prefix);nav=' '.join('<a href="/mapping?pen='+str(i)+'&amp;mode='+mode+'">'+str(i)+' '+mode+'</a>'for mode in['current','prefix']for i in range(1,24));return '<!doctype html><meta charset="utf-8"><title>醼 원형 매핑 가설</title><style>body{font:16px system-ui;margin:12px}h1{font-size:28px}h2{font-size:20px}a{display:inline-block;margin:4px}.grid{display:flex;gap:20px;width:max-content}svg{width:520px;height:520px}</style><h1>醼23 원형 매핑 가설 '+str(pen)+' '+selected['mappingMode']+'</h1><p>원5UP형태/19UP노출HOLD 보존. 원12..17 permutation은과거개별자료가설이며새누적직접승인아님. raw '+html.escape(str(raws))+'</p><nav>'+nav+'</nav><div class="grid"><section><h2>국내</h2>'+ds+'</section><section><h2>공개 원형</h2>'+ps+'</section></div>'
        html=original_page(route,selected,sources,domestic)
        return html.replace('<h1>','<p>원문23클립 / 공개25raw30calls55P; 5·19 terminal5HOLD보존, 새23누적매핑/시간미승인</p><h1>',1)
    shared.page=page
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(23)]};require(selection('/whole','')is None,'whole selection');require(shared.page('/whole',None,sources,dummy).count('<section class="panel">')==2,'whole two panels')
        for domestic,raw in[(1,1),(5,6),(19,21),(23,25)]:
            for mode in['single','prefix']:
                selected=selection('/compare','source=selected&domestic='+str(domestic)+'&raw='+str(raw)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'independent raw/domestic page')
        for pen in range(1,24):
            for mode in['current','prefix']:
                selected=selection('/mapping','pen='+str(pen)+'&mode='+mode);require(shared.page('/mapping',selected,sources,dummy).count('<svg ')==2,'all46mappingpages')
        require(shared.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'glyph':'醼','catalog':23,'domesticSelectionClips':23,'raw':25,'calls':30,'P':55,'wholeCurrentPrefixContract':'PASS','HTTP':0,'server':0,'sourceGroupingApproved':False,'nativeApproval':False,'runtimeApplied':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
