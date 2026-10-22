# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,ast,hashlib,html,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
EXPERIMENT=Path(__file__).resolve().parent
ROOT=EXPERIMENT.parent.parent
HERE=ROOT/"docs/hanja-source-independent-hv-hq-u5611-source-experiment-2026-10-22"
RENDER_SHA="5bfc92d50d3ae4c6499993bfe37ee2f59d9a2dc4c65e2803ecb7793cffbe0f3c"
PARTITION_FIXTURE_SHA="da96222ca399787ebafbaf15d78dbbd3c742dc67d3aa22cfa5aac9cf389b2260"
P_BYTES=(HERE/'preparation.json').read_bytes();P_SHA=hashlib.sha256(P_BYTES).hexdigest();P=json.loads(P_BYTES)
CONFIG_BYTES=(HERE/'config.json').read_bytes();CONFIG_SHA=hashlib.sha256(CONFIG_BYTES).hexdigest();CONFIG=json.loads(CONFIG_BYTES)
def guards():
    assert hashlib.sha256((EXPERIMENT/'render.mjs').read_bytes()).hexdigest()==RENDER_SHA,'renderer changed'
    assert hashlib.sha256((EXPERIMENT/'fixture.json').read_bytes()).hexdigest()==PARTITION_FIXTURE_SHA,'partition fixture changed'
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
    T=CONFIG['targets'][args.target];F=json.loads((EXPERIMENT/'fixture.json').read_bytes())[T['root']]
    original=F['baseline'];strokes=F['strokes'];n=9;boundaries={i+1:[sum(m['weight']for m in masks[:j])/sum(m['weight']for m in masks)for j in range(1,len(masks))]for i,masks in enumerate(strokes)if len(masks)>1}
    spec=importlib.util.spec_from_file_location('fixed_raw_dictionary',ROOT/'docs/hanja-source-raw-compare-u5611-2026-10-22/serve.py');review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    domestic_data=review.fetch_dictionary_once()
    # ROOT UI repair: prior 3 inline-show clicks were invalid (module scope); data-progress binds inside the module. Geometry verdict0.
    render="import{renderGrowingCaps,renderOriginal,renderWhole,commitHost,browserMetrics,targetMask,targetCoverageResidual,measureTarget}from'/render.mjs';\nconst old=document.getElementById('old'),candidate=document.getElementById('candidate'),progress=document.getElementById('progress'),value=document.getElementById('value'),play=document.getElementById('play'),coarse=document.getElementById('coarse'),metrics=document.getElementById('metrics'),errors=[];\nlet requested=0;\nfunction commit(host){try{return commitHost(host)}catch(e){errors.push(String(e));return[]}}\nfunction status(mode,extra={}){metrics.textContent=JSON.stringify({mode,pen:stroke,requestedGlobal:requested,targets:browserMetrics(),errors,nativeApproval:false,actualAppUI:false,runtimeApplied:false,...extra},null,2)}\n"
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*a):pass
        def do_GET(self):
            try:
                guards();u=urlparse(self.path);route=u.path;assert not u.fragment and not u.netloc and not u.scheme
                if route=='/render.mjs':
                    assert not u.query;data=(EXPERIMENT/'render.mjs').read_bytes();self.send_response(200);self.send_header('Content-Type','text/javascript; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(data);return
                if route=='/all-coarse':assert not u.query;pen,coarse_requested=n,False
                else:pen,coarse_requested=selected_query(route,u.query,n,T['pens'])
                if route=='/checks':out=json.dumps({'target':args.target,'pens':len(strokes),'masks':sum(map(len,strokes)),'sourceCompiles':0,'requestCompilations':0,'cachedFixture':True,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:
                    assert route in ['/','/whole','/pairs','/progressive','/all-coarse'],'unsupported route'
                    boundary=boundaries.get(pen);baseline_pen=T['baselinePenMap'][pen-1]
                    domestic=review.domestic_svg(domestic_data,pen,False)
                    body='<!doctype html><meta charset="utf-8"><title>嘑 Q6 growth + UP9 partition candidate</title><style>body{font:16px system-ui;margin:16px;width:1700px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}.allrow{display:grid;grid-template-columns:50px repeat(9,110px);gap:6px}.allrow svg{width:110px;height:110px}#coverage-panel svg{width:520px;height:520px}#metrics{max-height:180px;overflow:auto}</style><h1>嘑 Q6 growth + UP9 cached tail partition · native/APP/runtime 미승인</h1><a href="/whole">전체</a><a href="/pairs">현재획75%</a><a href="/progressive?stroke=6">HQ6</a><a href="/progressive?stroke=6&coarse=1">6획coarse220</a><a href="/all-coarse">전체14획coarse110 preview</a><a href="/progressive?stroke=2">HV2</a><a href="/progressive?stroke=9">UP9 경계</a><a href="/progressive?stroke=9&coarse=1">UP9 coarse220</a><a href="/progressive?stroke=14">LEFT14</a><p>고정14p17m40. 원14p16m40의 논리9 raw11 마지막 UP6/5 quad만 cached 분리1회했습니다. 원40P·공식순서·전체union·body guide/width14/weight43.248568/bounds 불변, 별도tailweight12.5, 내부경계 .7757789940003481입니다. 획9 내부 body/tail 배분만 달라지며 Q6 자체 경계는 그대로입니다. 원source/기존HOLD 불변. Q6 함수는 동일하며 전체 native/APP/runtime 미승인입니다. baseline은 분리 전 원source로 독립 국내진실자료가 아닙니다. 110그리드는preview이고220검토를대체하지않습니다.</p>'
                    if route in ['/','/whole']:
                        domestic=review.domestic_svg(domestic_data)
                    body+='<div class="pair">'+domestic+'<div id="old"></div><div id="candidate"></div></div>'
                    body+=''.join('<a href="/progressive?stroke='+str(i)+'">'+str(i)+'</a>'for i in range(1,T['pens']+1))
                    body+='<p>모든 multi-mask 경계 '+html.escape(repr(boundaries))+'; 현재획 '+str(pen)+'</p>'
                    body+=''.join('<button data-progress="'+repr(p)+'">'+label+'</button>'for label,p in [('0',0),('epsilon .0001%',1e-6),('50%',.5),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])
                    if boundary is not None:body+=''.join('<button data-progress="'+repr(p)+'">boundary'+str(j+1)+'-'+label+'</button>'for j,b in enumerate(boundary)for label,p in [('before',b-1e-10),('at',b),('after',b+1e-10)])
                    body+='<div id="target-controls"></div><button id="coverage-button">Q6m2 coverage</button><div id="coverage-panel"></div><pre id="metrics"></pre><button id="play">재생</button><input id="progress" type="range" min="0" max="100" step=".0001" value="0" aria-label="진행률"><output id="value"></output><div id="coarse" class="coarse"></div>'
                    body+='<script type="module">'+render+';const baseline='+json.dumps(original)+';const strokes='+json.dumps(strokes)+';const stroke='+str(pen)+';const baselineStroke='+str(baseline_pen)+';const show=p=>{requested=p;old.innerHTML=renderOriginal(baseline,baselineStroke,p,"old");candidate.innerHTML=renderGrowingCaps(strokes,stroke,p,"new");commit(candidate);progress.value=p*100;value.textContent=(p*100).toFixed(8)+"%";status("current")};for(const button of document.querySelectorAll("button[data-progress]"))button.addEventListener("click",()=>show(Number(button.dataset.progress)));progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function f(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};document.getElementById("coverage-button").onclick=()=>{document.getElementById("coverage-panel").innerHTML=targetCoverageResidual(targetMask(6,2),"u5611-q6-coverage-svg");status("coverage",{target:"6m2"})};'
                    if route in ['/','/whole']:body+='requested=1;old.innerHTML=renderOriginal(baseline,baseline.length,1,"ow");candidate.innerHTML=renderWhole(strokes,"nw");commit(candidate);status("whole");'
                    else:body+='show('+('.75'if route=='/pairs'else'0')+');'
                    if coarse_requested:body+='const sampleMetrics=[];[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{const cell=document.createElement("section");cell.innerHTML="<h2>"+(p*100)+"%</h2>"+renderOriginal(baseline,baselineStroke,p,"co"+i)+"<div class=coarse-new>"+renderGrowingCaps(strokes,stroke,p,"cn"+i)+"</div>";coarse.append(cell);sampleMetrics.push({p,targets:commit(cell.querySelector(".coarse-new"))})});status("coarse220",{samples:sampleMetrics});'
                    if route=='/all-coarse':body+='coarse.className="";for(let pen=1;pen<=14;pen++){const row=document.createElement("section");row.className="allrow";row.innerHTML="<b>"+pen+"</b>";[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{const cell=document.createElement("div");cell.innerHTML=renderGrowingCaps(strokes,pen,p,"all"+pen+"-"+i);row.append(cell);});coarse.append(row);for(const cell of [...row.children].slice(1))commit(cell)}status("all-coarse110-preview",{rows:14,samplesPerRow:9});'
                    if route not in ['/','/whole'] and pen==6:body+="const controls=document.getElementById(\"target-controls\");function local(p){const a=strokes[5];return(a[0].weight+p*a[1].weight)/(a[0].weight+a[1].weight)}for(const p of[0,1e-6,.95,.9999,.99999999,1]){const b=document.createElement(\"button\");b.textContent=\"6m2 local \"+p;b.onclick=()=>show(local(p));controls.append(b)}for(const delta of[-1e-6,0,1e-6]){const b=document.createElement(\"button\");b.textContent=\"6m2 rho \"+delta;b.onclick=()=>{const node=candidate.querySelector(\"[data-can-target=\\\"u5611-6-2\\\"] [data-can-measurement=\\\"true\\\"]\");const L=measureTarget(targetMask(6,2),0,node).L;show(local(7/L+delta))};controls.append(b)};"
                    body+='</script>';out=body.encode();kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
            except Exception as e:self.send_response(409);self.end_headers();self.wfile.write(str(e).encode())
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'target':args.target,'pid':os.getpid(),'port':server.server_address[1],'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'cachedPublicFixture':True,'privateMediaSaved':False,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
