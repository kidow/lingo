# -*- coding: utf-8 -*-
"""罝 immutable original whole reassessment and pending10logical roles; private RAM only."""
import argparse,hashlib,importlib.util,json,sys,html
from pathlib import Path
from urllib.parse import parse_qs
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED="docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py";SHARED_SHA="ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d"
FILES={'original':"docs/hanja-goal-glyphwiki-batch837-2026-10-13/engine-proof.json",'alternate':"docs/hanja-goal-glyphwiki-batch837-2026-10-13/engine-whole-u7f5d-ue0100.json"}
GROUPS=[[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12]]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,m):
    if not x:raise ValueError(m)
def main():
    p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args();c=json.loads(CONFIG.read_bytes());require(__debug__ and sys.flags.optimize==0 and 0<=a.port<=65535,'loopback asserted port')
    def guards():
        require(sha(CONFIG)==a.config_sha and sha(Path(__file__).resolve())==c['adapterSHA256'],'exactconfig/wrapper');require(sha(ROOT/SHARED)==SHARED_SHA,'fixedreader');require(c['glyph']=='罝'and c['catalogStrokes']==10 and c['host']=='127.0.0.1'and c['sourceViewBox']=='0 0 200 200','fixedcontext');require(c['sourceRoots']=={"original":{"root":"u7f5d","rawGroups":12,"proofKind":"fixed-public-original-full5-reassessment-unapproved"},"alternate":{"root":"u7f5d-ue0100","rawGroups":12,"proofKind":"fixed-public-original-full5-alias-reassessment-unapproved"}},'closedroots');require(c['domestic']==json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch837-2026-10-13/metadata.json").read_bytes())['dictionary'],'same originalpublisherpin');require(c['sourceGeometryChanged']is False and c['sourceGroupingApproved']is False and c['nativeApproval']is False and c['runtimeApplied']is False,'pending immutable scope')
        for f,h in c['inputSHA256'].items():require(sha(ROOT/f)==h,'inputchanged:'+f)
    guards();sources={k:json.loads((ROOT/f).read_bytes())for k,f in FILES.items()}
    for d in sources.values():
        require(set(d)=={'engineRevision','engineHashes','groups','trace','defaults'}and len(d['groups'])==12 and len(sum(d['trace'],[]))==12 and sum(len(g['polygons'])for g in d['groups'])==15,'originalfull5');require([sum((t['polygons']for t in row),[])for row in d['trace']]==[g['polygons']for g in d['groups']],'Ptraceexact');require(all(t['kind']=='cdDrawLine'for row in d['trace']for t in row),'fixedlineguides')
        for first,last in[(2,3),(8,9)]:require(d['trace'][first-1][0]['args'][2:4]==d['trace'][last-1][0]['args'][:2],'sourceexactcorner')
    require(sources['original']==sources['alternate'],'fixedaliasfull5equal');require(sorted(sum(GROUPS,[]))==list(range(1,13)),'everyrawonce')
    s=importlib.util.spec_from_file_location('ju_immutable_static_reader',ROOT/SHARED);g=importlib.util.module_from_spec(s);s.loader.exec_module(g);require(g.FETCH_COUNT==0,'HTTP0prepare');g.CONFIG=c;g.HERE=HERE;g.ROOT=ROOT;g.guards=guards;g.load_sources=lambda:sources;old_selection=g.selection;old_page=g.page
    def selection(route,query):
        if route=='/mapping':
            q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode','source'}and all(len(v)==1 for v in q.values()),'exactmappingquery');pen=q['pen'][0];mode=q['mode'][0];src=q['source'][0];require(pen in[str(i)for i in range(1,11)]and mode in['current','prefix']and src in FILES,'mappingbounds');return{'pen':int(pen),'mode':mode,'source':src}
        require(route!='/checks','unrelatedlegacyroute');return old_selection(route,query)
    def page(route,selected,sources,domestic):
        if route=='/mapping':
            pen=selected['pen'];prefix=selected['mode']=='prefix';raws=sum(GROUPS[:pen],[])if prefix else GROUPS[pen-1];ps=g.source_svg({'groups':[sources[selected['source']]['groups'][i-1]for i in raws]});ds=g.domestic_svg(domestic,pen,prefix);nav=' '.join('<a href="/mapping?source='+src+'&amp;pen='+str(i)+'&amp;mode='+mode+'">'+src+' '+str(i)+' '+mode+'</a>'for src in FILES for mode in['current','prefix']for i in range(1,11));return '<!doctype html><meta charset="utf-8"><title>罝 unchanged original mapping candidate</title><style>body{font:16px system-ui;margin:12px}h1{font-size:28px}h2{font-size:20px}a{display:inline-block;margin:4px}.grid{display:flex;gap:20px;width:max-content}svg{width:520px;height:520px}</style><h1>罝10 original candidate '+str(pen)+' '+selected['mode']+'</h1><p>OldV1claim superseded by direct original3/4. Whole/mapping not approved; every12raw/15P unchanged. raw'+html.escape(str(raws))+'</p><nav>'+nav+'</nav><div class="grid"><section><h2>국내</h2>'+ds+'</section><section><h2>공개 원형</h2>'+ps+'</section></div>'
        return old_page(route,selected,sources,domestic).replace('<h1>','<p>국내10 / unchanged original12raw12calls15P two aliases. OldV1claim contradicted by direct3/4clock. Shape/mapping pending.</p><h1>',1)
    g.selection=selection;g.page=page
    if a.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(10)]};require(selection('/whole','')is None,'whole');require(page('/whole',None,sources,dummy).count('<section class="panel">')==3,'threewholepanels')
        for src in FILES:
            for pen in range(1,11):
                for mode in['current','prefix']:require(page('/mapping',selection('/mapping','source='+src+'&pen='+str(pen)+'&mode='+mode),sources,dummy).count('<svg ')==2,'all40mappingpages')
        require(g.FETCH_COUNT==0,'HTTP0');print(json.dumps({'guardPass':True,'raw':12,'calls':12,'P':15,'threeWholePanels':True,'mapping40Pages':True,'sameSourceAlias':True,'HTTP':0,'server':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(a.port)];g.main()
    finally:sys.argv=old
if __name__=='__main__':main()
