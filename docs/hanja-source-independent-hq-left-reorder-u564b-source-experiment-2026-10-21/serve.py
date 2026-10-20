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
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--target',choices=list(CONFIG['targets']),default='u564b');parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args();guards()
    if args.check_only:
        print(json.dumps({'staticGuards':True,'targets':list(CONFIG['targets']),'sourceCompiles':0,'engineRuns':0,'HTTP':0}));return
    assert 'fixtures.json' in P['newFilesSHA256'],'source fixtures not finalized'
    T=CONFIG['targets'][args.target];F=json.loads((HERE/'fixtures.json').read_bytes())[T['root']]
    original=F['baseline'];strokes=F['strokes'];n=T['defaultPen'];boundaries={i+1:[sum(m['weight']for m in masks[:j])/sum(m['weight']for m in masks)for j in range(1,len(masks))]for i,masks in enumerate(strokes)if len(masks)>1}
    spec=importlib.util.spec_from_file_location('compound_terminal_domestic',ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py');review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={T['glyph']:{'strokes':T['pens'],'dictionary':T['dictionary']}}
    review.renderer.source(T['glyph'])
    # The exact pinned shared renderer is served as browser JS; no Node or source engine execution.
    renderer=(ROOT/'docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs').read_text();render=renderer[renderer.index('export function renderProgressive'):].replace('export function renderProgressive','function renderProgressive',1)
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*a):pass
        def do_GET(self):
            try:
                guards();u=urlparse(self.path);q=parse_qs(u.query);route=u.path
                if route=='/checks':out=json.dumps({'target':args.target,'pens':len(strokes),'masks':sum(map(len,strokes)),'sourceCompiles':0,'requestCompilations':0,'cachedFixture':True,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:
                    assert route in ['/','/whole','/pairs','/progressive'],'unsupported route'
                    pen=int(q.get('stroke',[str(n)])[0]);assert 1<=pen<=T['pens'];boundary=boundaries.get(pen);baseline_pen=T['baselinePenMap'][pen-1]
                    domestic=review.renderer.dictionary_svg(T['glyph'],pen,True,'dom').replace('viewBox="0 0 1024 1024"','viewBox="0 0 1024 1152"')
                    body='<!doctype html><meta charset="utf-8"><title>'+T['glyph']+' HQ independent-mask source experiment</title><style>body{font:16px system-ui;margin:16px;width:1700px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}</style><h1>'+T['glyph']+' source-only · native 미승인/runtime 미적용</h1><a href="/whole">전체</a><a href="/pairs">획 방향</a><a href="/progressive">progressive</a><a href="/progressive?stroke=9&coarse=1">첫 coarse9 ·9샘플</a><a href="/progressive?stroke=9">HQ9 activation경계</a><a href="/progressive?stroke=10">raw13 LQ LEFT14 꼬리위험</a><p>원970 HOLD/NOTICE/legacy2는 불변입니다. 기존actualfull5와base body3를정확결박하며새header0/VS0혼합0입니다. 18raw/19calls/33polygon→15p17m33. 원HV2 raw2H→3V와HV7 raw8H→9V만끝점exactjoin합니다. HQ9 raw10H+12Q는비연속이지만원끝/시작동일점이며독립2mask를유지하고새guide/connector를만들지않습니다. raw11口bottomH는pen8로앞에표시합니다. pen13H raw16과pen14Q raw17은gap18.1608이있는별획이므로합치지않습니다. 첫coarse9+HQ9 activation을ROOT가fresh검토해야합니다. 원pen10 raw13 LEFT14 마지막quad만기존exactguard로분리했습니다. bodyguide/폭/bodyweight32.071068은불변이고activebodyboundsminX34.1→44.1이며tailweight10을추가했습니다. 획10내body/tail배분만달라지며HQ9경계는그대로입니다. Q9유한cap FIRSTFAIL과LEFT10 100%팁확장FAIL이력은불변이고새source승인은false입니다. 모든raw mask guide/폭/weight와33polygon불변·HV논리mask만원끝점경로/합가중치로구성, baseline은동일투영논리사본으로독립기하증거가아닙니다. 정적mapping만관찰했고방향/시간/합획/animation/native/app/runtime승인false입니다. 이번sourcecompiler/factory/engine/projection0·캐시꼬리분리1입니다.</p>'
                    if route in ['/','/whole']:
                        data=review.renderer.source(T['glyph']);domestic='<svg viewBox="0 0 1024 1152"><g transform="'+data['transform']+'">'+''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])+'</g></svg>'
                    body+='<div class="pair">'+domestic+'<div id="old"></div><div id="candidate"></div></div>'
                    body+=''.join('<a href="/progressive?stroke='+str(i)+'">'+str(i)+'</a>'for i in range(1,T['pens']+1))
                    body+='<p>모든 multi-mask 경계 '+html.escape(repr(boundaries))+'; 현재획 '+str(pen)+'</p>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0',0),('epsilon .0001%',1e-6),('50%',.5),('95%',.95),('99.99%',.9999),('100%',1)])
                    if boundary is not None:body+=''.join('<button onclick="show('+repr(p)+')">boundary'+str(j+1)+'-'+label+'</button>'for j,b in enumerate(boundary)for label,p in [('before',b-1e-10),('at',b),('after',b+1e-10)])
                    body+='<button id="play">재생</button><input id="progress" type="range" min="0" max="100" step=".0001" value="0" aria-label="진행률"><output id="value"></output><div id="coarse" class="coarse"></div>'
                    body+='<script>'+render+';const baseline='+json.dumps(original)+';const strokes='+json.dumps(strokes)+';const stroke='+str(pen)+';const baselineStroke='+str(baseline_pen)+';const show=p=>{old.innerHTML=renderProgressive(baseline,baselineStroke,p,"old");candidate.innerHTML=renderProgressive(strokes,stroke,p,"new");progress.value=p*100;value.textContent=(p*100).toFixed(8)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function f(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};'
                    if route in ['/','/whole']:body+='old.innerHTML=renderProgressive(baseline,baseline.length,1,"ow");candidate.innerHTML=renderProgressive(strokes,strokes.length,1,"nw");'
                    else:body+='show('+('.75'if route=='/pairs'else'0')+');'
                    if 'coarse'in q:body+='[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>coarse.innerHTML+="<div>"+(p*100)+"%"+renderProgressive(baseline,baselineStroke,p,"co"+i)+renderProgressive(strokes,stroke,p,"cn"+i)+"</div>");'
                    body+='</script>';out=body.encode();kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
            except Exception as e:self.send_response(409);self.end_headers();self.wfile.write(str(e).encode())
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'target':args.target,'pid':os.getpid(),'port':server.server_address[1],'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'cachedPublicFixture':True,'privateMediaSaved':False,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
