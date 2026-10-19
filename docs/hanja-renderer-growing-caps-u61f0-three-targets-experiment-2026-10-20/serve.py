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
    parser=argparse.ArgumentParser();parser.add_argument('--target',choices=list(CONFIG['targets']),default='u61f0');parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args();guards()
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
    render=(HERE/'render.mjs').read_text().replace('export ','')
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
                    body='<!doctype html><meta charset="utf-8"><title>'+T['glyph']+' isolated fixed start-gate renderer experiment</title><style>body{font:16px system-ui;margin:16px;width:1700px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}</style><h1>'+T['glyph']+' source-only · native 미승인/runtime 미적용</h1><a href="/whole">전체</a><a href="/pairs">획 방향</a><a href="/progressive">progressive</a><p>懰固定18p21m46/原source fields·兩LEFT分離不變。新private5m2 exactMQ、7m1 exactMLQQ與10m1 exactMLQ growing候補のみ。5m2自體BigInt初期曲率K&lt;1/100；7/10初期arc≤7在原firstL內K0。7m1後方非G1corner未承認，oldMLQLguard擴張0。既存約16px completionFAIL屬舊10未分離模型，當前two-left未fresh承認。native/runtimefalse，原geometry/width/guide/weight/tail0變更，UA/pixel新検証全部pending。比較順序：國內→原two-left shared43→新private3target，SVG520。</p>'
                    body+=''.join('<a href="/progressive?stroke='+str(t['pen'])+'&amp;coverage='+str(t['pen'])+'-'+str(t['mask'])+'">coverage '+str(t['pen'])+'m'+str(t['mask'])+'</a>'for t in CONFIG['experiment']['targets'])
                    if route in ['/','/whole']:
                        data=review.renderer.source(T['glyph']);domestic='<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])+'</g></svg>'
                    body+='<div class="pair"><div>국내'+domestic+'</div><div>기존 renderer<div id="old"></div></div><div>새 renderer<div id="candidate"></div></div></div><pre id="metrics"></pre>'
                    body+=''.join('<a href="/progressive?stroke='+str(i)+'">'+str(i)+'</a>'for i in range(1,T['pens']+1))
                    body+='<p>모든 multi-mask 경계 '+html.escape(repr(boundaries))+'; 현재획 '+str(pen)+'</p>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0',0),('epsilon .0001%',1e-6),('50%',.5),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])
                    if boundary is not None:body+=''.join('<button onclick="show('+repr(p)+')">boundary'+str(j+1)+'-'+label+'</button>'for j,b in enumerate(boundary)for label,p in [('before',b-1e-10),('at',b),('after',b+1e-10)])
                    body+='<button id="play">재생</button><input id="progress" type="range" min="0" max="100" step=".0001" value="0" aria-label="진행률"><output id="value"></output><div id="coarse" class="coarse"></div>'
                    body+='<script>'+render+';const baseline='+json.dumps(original)+';const strokes='+json.dumps(strokes)+';const stroke='+str(pen)+';const baselineStroke='+str(baseline_pen)+';const fixedTargets='+json.dumps(CONFIG['experiment']['targets'])+';const baselineView='+'renderProgressive'+';const show=p=>{if(p===0)fixedTargets.filter(t=>t.pen===stroke).forEach(t=>{const s=targetMask(t.pen,t.mask);measureFrame(s,0)});old.innerHTML=baselineView(baseline,baselineStroke,p,"old");candidate.innerHTML=renderGrowing(strokes,stroke,p,"new");progress.value=p*100;value.textContent=(p*100).toFixed(8)+"%";syncGrowingMetrics()};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function f(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};'
                    if route in ['/','/whole']:body+='old.innerHTML=baselineView(baseline,baseline.length,1,"ow");candidate.innerHTML=renderGrowing(strokes,strokes.length,1,"nw");'
                    else:body+='show('+('.75'if route=='/pairs'else'0')+');'
                    if 'coarse'in q:body+='[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>coarse.innerHTML+="<div>"+(p*100)+"%"+baselineView(baseline,baselineStroke,p,"co"+i)+renderGrowing(strokes,stroke,p,"cn"+i)+"</div>");'
                    body+='function syncGrowingMetrics(){const targets=fixedTargets.map(t=>{const s=targetMask(t.pen,t.mask),source=sourceCertificate(s),L=browserLength(s);return{pen:t.pen,mask:t.mask,kind:t.kind,browserL:L,r:7,rhoEqualsRLocal:7/L,firstLEndLocal:source.firstL?source.firstL/L:null,certificate:source}});metrics.textContent=JSON.stringify({visibleStroke:stroke,targets,lastFrames:browserMetrics(),nativeApproval:false,fullOrderFreshRequired:true},null,2)};syncGrowingMetrics();fixedTargets.filter(t=>t.pen===stroke).forEach(t=>{const s=targetMask(t.pen,t.mask),source=sourceCertificate(s),L=browserLength(s),masks=strokes[stroke-1],total=masks.reduce((n,m)=>n+m.weight,0),start=masks.slice(0,t.mask-1).reduce((n,m)=>n+m.weight,0)/total,fraction=s.weight/total,controls=[["rho=r",7/L]];if(source.firstL)controls.push(["firstL-end",source.firstL/L]);controls.forEach(([label,u])=>[[-1e-10,"before"],[0,"at"],[1e-10,"after"]].forEach(([delta,suffix])=>{const button=document.createElement("button");button.textContent=label+"-"+t.pen+"m"+t.mask+"-"+suffix;button.onclick=()=>show(start+fraction*(u+delta));document.body.appendChild(button)}))});'
                    if 'coverage'in q:
                        coverage_pen,coverage_mask=map(int,q['coverage'][0].split('-'));assert any(t['pen']==coverage_pen and t['mask']==coverage_mask for t in CONFIG['experiment']['targets']),'only exact coverage pen-mask'
                        body+='old.innerHTML=coverageResidual(targetMask('+str(coverage_pen)+','+str(coverage_mask)+'),"old-coverage");candidate.innerHTML=coverageResidual(targetMask('+str(coverage_pen)+','+str(coverage_mask)+'),"new-coverage");'
                    body+='</script>';out=body.encode();kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
            except Exception as e:self.send_response(409);self.end_headers();self.wfile.write(str(e).encode())
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'target':args.target,'pid':os.getpid(),'port':server.server_address[1],'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'cachedPublicFixture':True,'privateMediaSaved':False,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
