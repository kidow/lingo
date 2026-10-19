# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,ast,hashlib,html,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
P_BYTES=(HERE/'validation.json').read_bytes();P_SHA=hashlib.sha256(P_BYTES).hexdigest();P=json.loads(P_BYTES)
CONFIG_BYTES=(HERE/'config.json').read_bytes();CONFIG_SHA=hashlib.sha256(CONFIG_BYTES).hexdigest();CONFIG=json.loads(CONFIG_BYTES)
def guards():
    assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==P_SHA,'preparation changed'
    assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()==CONFIG_SHA==P['configSHA256'],'config changed'
    for t in CONFIG['targets'].values():
        for f,h in t['inputSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'original changed: '+f
    for f,h in P['newFilesSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'experiment changed: '+f
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--target',choices=list(CONFIG['targets']),default='u9e8c');parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args();guards()
    if args.check_only:
        print(json.dumps({'staticGuards':True,'targets':list(CONFIG['targets']),'sourceCompiles':0,'engineRuns':0,'HTTP':0}));return
    T_FIXED=CONFIG['targets'][args.target]
    assert CONFIG['experiment']['fixture'] in T_FIXED['inputSHA256'],'fixture not pinned'
    T=CONFIG['targets'][args.target];F=json.loads((HERE/CONFIG['experiment']['fixture']).read_bytes())[T['root']]
    original=F['strokes'];strokes=F['strokes'];n=T['defaultPen'];boundaries={i+1:[sum(m['weight']for m in masks[:j])/sum(m['weight']for m in masks)for j in range(1,len(masks))]for i,masks in enumerate(strokes)if len(masks)>1}
    spec=importlib.util.spec_from_file_location('compound_terminal_domestic',ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py');review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={T['glyph']:{'strokes':T['pens'],'dictionary':T['dictionary']}}
    review.renderer.source(T['glyph'])
    # The exact pinned shared renderer is served as browser JS; no Node or source engine execution.
    renderer=(ROOT/'docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs').read_text();render=renderer[renderer.index('export function renderProgressive'):].replace('export function renderProgressive','function renderProgressive',1)+'\n'+(HERE/'render.mjs').read_text().replace('export ','')
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*a):pass
        def do_GET(self):
            try:
                guards();u=urlparse(self.path);q=parse_qs(u.query);route=u.path
                if route=='/checks':out=json.dumps({'target':args.target,'pens':len(strokes),'masks':sum(map(len,strokes)),'sourceCompiles':0,'requestCompilations':0,'cachedFixture':True,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:
                    assert route in ['/','/whole','/pairs','/progressive'],'unsupported route'
                    pen=int(q.get('stroke',[str(n)])[0]);assert 1<=pen<=T['pens'];boundary=boundaries.get(pen);baseline_pen=T['baselinePenMap'][pen-1]
                    domestic=review.renderer.dictionary_svg(T['glyph'],pen,True,'dom')
                    body='<!doctype html><meta charset="utf-8"><title>'+T['glyph']+' isolated original-guide butt plus growing caps experiment</title><style>body{font:16px system-ui;margin:16px;width:1700px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}</style><h1>'+T['glyph']+' source-only · native 미승인/runtime 미적용</h1><a href="/whole">전체</a><a href="/pairs">획 방향</a><a href="/progressive">progressive</a><p>麌새순서18p20m48에서11획첫mask만butt prefix+커지는원형cap으로표시합니다. 원outline/guide/폭14/weight/필순·UPtail불변,9획둘째Q의기존circleOR함수와필드는바이트그대로입니다. d=min(pL,L),rho=min(7,d),동일원guide의getTotalLength/getPointAtLength로dash와두원을한frame에동기구성합니다. 첫L11.8≥r7/L≥r/원LQL접선연속을정확guard하고linejoin은기존miter입니다. 100/prefix/whole은확정원fullroundmask를그대로유지합니다. offscreen측정SVG1개는화면밖이며.pair의3패널만검토대상입니다. oldgate=1은가운데이전circleOR비교,기본은가운데기존shared43입니다. coverage=11은양패널각P-minus-fullmask빨간잔여입니다. 원whole/4·5·6부분관찰과자연11시작FAIL기록은보존하며새native승인0입니다.</p><a href="/progressive?stroke=9&amp;coverage=9">coverage9</a><a href="/progressive?stroke=11&amp;coverage=11">coverage11</a>'
                    if route in ['/','/whole']:
                        data=review.renderer.source(T['glyph']);domestic='<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])+'</g></svg>'
                    body+='<div class="pair"><div>국내'+domestic+'</div><div>기존 renderer<div id="old"></div></div><div>새 renderer<div id="candidate"></div></div></div><pre id="metrics"></pre>'
                    body+=''.join('<a href="/progressive?stroke='+str(i)+'">'+str(i)+'</a>'for i in range(1,T['pens']+1))
                    body+='<p>모든 multi-mask 경계 '+html.escape(repr(boundaries))+'; 현재획 '+str(pen)+'</p>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0',0),('epsilon .0001%',1e-6),('50%',.5),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])
                    if boundary is not None:body+=''.join('<button onclick="show('+repr(p)+')">boundary'+str(j+1)+'-'+label+'</button>'for j,b in enumerate(boundary)for label,p in [('before',b-1e-10),('at',b),('after',b+1e-10)])
                    body+='<button id="play">재생</button><input id="progress" type="range" min="0" max="100" step=".0001" value="0" aria-label="진행률"><output id="value"></output><div id="coarse" class="coarse"></div>'
                    body+='<script>'+render+';const baseline='+json.dumps(original)+';const strokes='+json.dumps(strokes)+';const stroke='+str(pen)+';const baselineStroke='+str(baseline_pen)+';const baselineView='+('renderStartGate'if'oldgate'in q else'renderProgressive')+';const show=p=>{if(stroke===11&&p===0)measureGrowingBrowserFrame(targetMask(11),0);const oldSvg=baselineView(baseline,baselineStroke,p,"old"),newSvg=renderGrowingCaps(strokes,stroke,p,"new");old.innerHTML=oldSvg;candidate.innerHTML=newSvg;progress.value=p*100;value.textContent=(p*100).toFixed(8)+"%";syncGrowingMetrics()};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function f(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};'
                    if route in ['/','/whole']:body+='old.innerHTML=baselineView(baseline,baseline.length,1,"ow");candidate.innerHTML=renderGrowingCaps(strokes,strokes.length,1,"nw");'
                    else:body+='show('+('.75'if route=='/pairs'else'0')+');'
                    if 'coarse'in q:body+='[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>coarse.innerHTML+="<div>"+(p*100)+"%"+baselineView(baseline,baselineStroke,p,"co"+i)+renderGrowingCaps(strokes,stroke,p,"cn"+i)+"</div>");'
                    body+='function syncGrowingMetrics(){const fixed9=targetMask(9),L9=browserGuideLength(fixed9),g9=gateState(fixed9,0,L9),s=targetMask(11),L=growingBrowserLength(s),source=growingCapsSource(s);metrics.textContent=JSON.stringify({visibleStroke:stroke,previous9:{browserL:L9,tau:g9.tau,policyUnchanged:true},new11:{browserL:L,r:source.r,firstL:source.firstL,capSaturationLocal:source.r/L,firstLEndLocal:source.firstL/L,lastSameFrame:growingBrowserMetrics()},offscreenMeasurementSVG:true,nativeApproval:false},null,2)};syncGrowingMetrics();if(stroke===11){const s=targetMask(11),L=growingBrowserLength(s),source=growingCapsSource(s),fraction=strokes[10][0].weight/strokes[10].reduce((sum,m)=>sum+m.weight,0);[["rho=r",source.r/L],["firstL-end",source.firstL/L]].forEach(([label,t])=>[[-1e-10,"before"],[0,"at"],[1e-10,"after"]].forEach(([delta,suffix])=>{const button=document.createElement("button");button.textContent=label+"-"+suffix;button.onclick=()=>show(fraction*(t+delta));document.body.appendChild(button)}))};'
                    if 'coverage'in q:
                        coverage_pen=int(q['coverage'][0]);assert coverage_pen in [9,11],'only coverage9/11'
                        body+='old.innerHTML=targetCoverageResidual(targetMask('+str(coverage_pen)+'),"old-full-coverage");candidate.innerHTML=' + ('growingFullCoverageResidual(targetMask(11),"new-full-coverage")' if coverage_pen==11 else 'targetCoverageResidual(targetMask(9),"new-full-coverage")') + ';'
                    body+='</script>';out=body.encode();kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
            except Exception as e:self.send_response(409);self.end_headers();self.wfile.write(str(e).encode())
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'target':args.target,'pid':os.getpid(),'port':server.server_address[1],'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'cachedPublicFixture':True,'privateMediaSaved':False,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
