# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,ast,hashlib,html,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
P_BYTES=(HERE/'prep.json').read_bytes();P_SHA=hashlib.sha256(P_BYTES).hexdigest();P=json.loads(P_BYTES)
CONFIG_BYTES=(HERE/'config.json').read_bytes();CONFIG_SHA=hashlib.sha256(CONFIG_BYTES).hexdigest();CONFIG=json.loads(CONFIG_BYTES)
def guards():
    assert hashlib.sha256((HERE/'prep.json').read_bytes()).hexdigest()==P_SHA,'preparation changed'
    assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()==CONFIG_SHA==P['configSHA256'],'config changed'
    for t in CONFIG['targets'].values():
        for f,h in t['inputSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'original changed: '+f
    for f,h in P['newFilesSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'experiment changed: '+f
def selected_query(route,query,default_pen,pens):
    assert route in ['/','/whole','/pairs','/progressive','/checks'],'unsupported route'
    q={}if not query else parse_qs(query,keep_blank_values=True,strict_parsing=True)
    assert all(len(v)==1 and v[0]!=''for v in q.values()),'duplicate/blank query'
    if route in ['/','/whole','/checks']:assert not q,'query forbidden';return default_pen,False
    assert set(q)<=({'stroke','coarse'}if route=='/progressive'else{'stroke'}),'unknown query'
    raw=q.get('stroke',[str(default_pen)])[0];assert raw.isascii()and raw.isdigit()and str(int(raw))==raw,'canonical pen'
    pen=int(raw);assert 1<=pen<=pens,'pen out of range'
    if 'coarse'in q:assert q['coarse']==['1'],'coarse exact1 only'
    return pen,'coarse'in q
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--target',choices=list(CONFIG['targets']),default='u7d8e');parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args();guards()
    if args.check_only:
        print(json.dumps({'staticGuards':True,'targets':list(CONFIG['targets']),'sourceCompiles':0,'engineRuns':0,'HTTP':0}));return
    assert 'fixture.json' in P['newFilesSHA256'],'source fixtures not finalized'
    T=CONFIG['targets'][args.target];F=json.loads((HERE/'fixture.json').read_bytes())[T['root']]
    original=F['baseline'];strokes=F['strokes'];n=T['defaultPen'];boundaries={i+1:[sum(m['weight']for m in masks[:j])/sum(m['weight']for m in masks)for j in range(1,len(masks))]for i,masks in enumerate(strokes)if len(masks)>1}
    spec=importlib.util.spec_from_file_location('fixed_raw_dictionary',ROOT/'docs/hanja-source-raw-compare-u7d8e-2026-10-21/serve.py');review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    domestic_data=review.fetch_dictionary_once()
    # The exact pinned shared renderer is served as browser JS; no Node or source engine execution.
    renderer=(ROOT/'docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs').read_text();render=renderer[renderer.index('export function renderProgressive'):].replace('export function renderProgressive','function renderProgressive',1)
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*a):pass
        def do_GET(self):
            try:
                guards();u=urlparse(self.path);route=u.path;assert not u.fragment and not u.netloc and not u.scheme;pen,coarse_requested=selected_query(route,u.query,n,T['pens'])
                if route=='/checks':out=json.dumps({'target':args.target,'pens':len(strokes),'masks':sum(map(len,strokes)),'sourceCompiles':0,'requestCompilations':0,'cachedFixture':True,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:
                    assert route in ['/','/whole','/pairs','/progressive'],'unsupported route'
                    boundary=boundaries.get(pen);baseline_pen=T['baselinePenMap'][pen-1]
                    domestic=review.domestic_svg(domestic_data,pen,False)
                    body='<!doctype html><meta charset="utf-8"><title>綎 QQ/reorder source-only</title><style>body{font:16px system-ui;margin:16px;width:1700px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}</style><h1>綎 source-only · native 미승인/runtime 미적용</h1><a href="/whole">전체</a><a href="/pairs">현재획 방향</a><a href="/progressive">QQ1</a><a href="/progressive?stroke=1&coarse=1">첫 coarse1</a><a href="/progressive?stroke=2">QQ2 activation</a><a href="/progressive?stroke=11">HL11 terminal113</a><a href="/progressive?stroke=12">HQ12</a><p>원851 base min14 HOLD/NOTICE/sourceGroups=[]와 blocked compiler는 불변입니다. 선택base actualfull5를 직접고정하며 새header/다른root 혼합0입니다. 17raw/17calls/35polygon→13p15m35. ROOT raw/domestic single 및 제한prefix로 정적대응만 관찰했으며 방향/시간/합획animation/native/runtime은미승인입니다. QQ1 raw1/2 gap[-13.65,-11],QQ2 raw3/4 gap[-11.700000000000001,3] 독립2mask/새guide연결0입니다. HL11 raw9H+raw10내림L exactendpoint(가짜vertical아님),HQ12 raw11H+raw12Q exactendpoint만합칩니다. raw10→11 incidental 접점은별획으로남기며9..12전체합획0입니다. 국내7→raw17/8→raw14/9→raw15/10→raw16은정적순열입니다. 원terminal113/curve끝과 QQ finitecap·boundary connectivity는fresh UI위험이며꼬리교정0입니다. baseline은동일논리투영clone으로독립truth가아닙니다. 원좌표/폭/weight/polygon불변이며compiledcache부재때문에승인된8067순수projection1을최초실행하고즉시publicfixture저장했습니다. GET/startup compiler·projection·engine0입니다.</p>'
                    if route in ['/','/whole']:
                        domestic=review.domestic_svg(domestic_data)
                    body+='<div class="pair">'+domestic+'<div id="old"></div><div id="candidate"></div></div>'
                    body+=''.join('<a href="/progressive?stroke='+str(i)+'">'+str(i)+'</a>'for i in range(1,T['pens']+1))
                    body+='<p>모든 multi-mask 경계 '+html.escape(repr(boundaries))+'; 현재획 '+str(pen)+'</p>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0',0),('epsilon .0001%',1e-6),('50%',.5),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])
                    if boundary is not None:body+=''.join('<button onclick="show('+repr(p)+')">boundary'+str(j+1)+'-'+label+'</button>'for j,b in enumerate(boundary)for label,p in [('before',b-1e-10),('at',b),('after',b+1e-10)])
                    body+='<button id="play">재생</button><input id="progress" type="range" min="0" max="100" step=".0001" value="0" aria-label="진행률"><output id="value"></output><div id="coarse" class="coarse"></div>'
                    body+='<script>'+render+';const baseline='+json.dumps(original)+';const strokes='+json.dumps(strokes)+';const stroke='+str(pen)+';const baselineStroke='+str(baseline_pen)+';const show=p=>{old.innerHTML=renderProgressive(baseline,baselineStroke,p,"old");candidate.innerHTML=renderProgressive(strokes,stroke,p,"new");progress.value=p*100;value.textContent=(p*100).toFixed(8)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function f(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};'
                    if route in ['/','/whole']:body+='old.innerHTML=renderProgressive(baseline,baseline.length,1,"ow");candidate.innerHTML=renderProgressive(strokes,strokes.length,1,"nw");'
                    else:body+='show('+('.75'if route=='/pairs'else'0')+');'
                    if coarse_requested:body+='[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>coarse.innerHTML+="<div>"+(p*100)+"%"+renderProgressive(baseline,baselineStroke,p,"co"+i)+renderProgressive(strokes,stroke,p,"cn"+i)+"</div>");'
                    body+='</script>';out=body.encode();kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
            except Exception as e:self.send_response(409);self.end_headers();self.wfile.write(str(e).encode())
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'target':args.target,'pid':os.getpid(),'port':server.server_address[1],'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'cachedPublicFixture':True,'privateMediaSaved':False,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
