# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,ast,hashlib,html,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
P_BYTES=(HERE/'preparation.json').read_bytes();P_SHA=hashlib.sha256(P_BYTES).hexdigest();P=json.loads(P_BYTES)
CONFIG_BYTES=(HERE/'config.json').read_bytes();CONFIG_SHA=hashlib.sha256(CONFIG_BYTES).hexdigest();CONFIG=json.loads(CONFIG_BYTES)
def guards():
    assert hashlib.sha256((HERE/'preparation.json').read_bytes()).hexdigest()==P_SHA,'preparation changed'
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
    parser=argparse.ArgumentParser();parser.add_argument('--target',choices=list(CONFIG['targets']),default='u5611');parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args();guards()
    if args.check_only:
        print(json.dumps({'staticGuards':True,'targets':list(CONFIG['targets']),'sourceCompiles':0,'engineRuns':0,'HTTP':0}));return
    assert 'fixtures.json' in P['newFilesSHA256'],'source fixtures not finalized'
    T=CONFIG['targets'][args.target];F=json.loads((HERE/'fixtures.json').read_bytes())[T['root']]
    original=F['baseline'];strokes=F['strokes'];n=T['defaultPen'];boundaries={i+1:[sum(m['weight']for m in masks[:j])/sum(m['weight']for m in masks)for j in range(1,len(masks))]for i,masks in enumerate(strokes)if len(masks)>1}
    spec=importlib.util.spec_from_file_location('fixed_raw_dictionary',ROOT/'docs/hanja-source-raw-compare-u5611-2026-10-22/serve.py');review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
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
                    body='<!doctype html><meta charset="utf-8"><title>嘑 HV/HQ source-only</title><style>body{font:16px system-ui;margin:16px;width:1700px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}</style><h1>嘑 source-only · native 미승인/runtime 미적용</h1><a href="/whole">전체</a><a href="/pairs">현재획 방향</a><a href="/progressive?stroke=6&coarse=1">첫 coarse6</a><a href="/progressive?stroke=6">HQ6 activation</a><a href="/progressive?stroke=2">HV2 boundary</a><a href="/progressive?stroke=9">원UP5 완료위험</a><a href="/progressive?stroke=14">원LEFT14 완료위험</a><p>원1030 min15 HOLD/sourceGroups=[]/NOTICE/proof 불변. 단일base actualfull5/id3와 matchingwhole actualfull5 고정·header혼합0. 16raw/20calls/40P→14p16m40. ROOT38개 whole/single/prefix 정적대응만 근거이며 방향/시간/합획animation/native/runtime은 미승인입니다. 논리2 raw2·3과논리6 raw7·9는 exactendpoint gap0여도 원2마스크씩유지하고 guidejoin/connector0입니다. 원raw8은논리7로뒤에두되원LQ, raw11은논리9원LQL, raw16은논리14원LQ 그대로입니다. UP5 / LEFT14·원terminal23 보정0, 전체outline/bounds/guide/폭/weight/flags불변. baseline은동일투영clone 비독립입니다. epsilon은현재논리획global1e-6이며 mask-local별도입니다. 원P연결·coverage·시작/끝/경계/자연재생은fresh미검토. pureprojectionFIRST1→publicfixture즉시저장·GET/startup projection/compiler/engine0입니다.</p>'
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
