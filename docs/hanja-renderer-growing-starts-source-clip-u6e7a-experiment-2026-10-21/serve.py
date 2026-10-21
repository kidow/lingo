#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""湺 four fixed MQ + byte-preserved7 source clip. ROOT owns server/UI."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent;REPO=HERE.parent.parent
C=json.loads((HERE/'config.json').read_text());V=json.loads((HERE/'validation.json').read_text())
def sha(b):return hashlib.sha256(b).hexdigest()
def guards():
 assert sha((HERE/'config.json').read_bytes())==V['configSHA256']
 for p,h in C['inputSHA256'].items():assert sha((REPO/p).read_bytes())==h,p
 for p,h in V['newFilesSHA256'].items():assert sha((HERE/p).read_bytes())==h,p
 assert sha((HERE/C['sourceFixture']).read_bytes())==C['fixtureSHA256']

def select(route,query):
 assert route in ['/','/whole','/pairs','/progressive','/checks','/render.mjs']
 q=parse_qs(query,keep_blank_values=True,strict_parsing=True) if query else{}
 assert set(q)<=set(['stroke','coarse']) and all(len(v)==1 and v[0] for v in q.values())
 if route in ['/whole','/checks','/render.mjs']:assert not q
 pen=q.get('stroke',['3'])[0];assert pen.isdecimal() and str(int(pen))==pen and 1<=int(pen)<=12
 if 'coarse'in q:assert q['coarse']==['1']
 return int(pen),'coarse'in q
BROWSER="import * as R from '/render.mjs';\nconst D=DATA,rows=D.strokes,targets=D.targets,$=id=>document.getElementById(id),errors=[];let pen=D.pen,p=0,frames=[],sampleFrames=[],coarseFrames=[],coarseMode='reference220',run=0;const key=t=>t.pen+'m'+t.mask,s=t=>R.targetInfo(t.pen,t.mask).segment;\nfunction status(){$('status').textContent=JSON.stringify({pen,progress:p,frames,samples:sampleFrames,coarse:coarseFrames,coarseMode,errors,QQ3ContactAndDomesticFlowApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false},null,2)}\nfunction dom(whole=false){const d=D.domestic;return '<svg width=\"520\" height=\"520\" viewBox=\"'+d.viewBox+'\"><g fill=\"#222\" transform=\"'+d.transform+'\">'+(whole?d.strokes:[d.strokes[pen-1]]).map(x=>'<path d=\"'+x.d+'\"/>').join('')+'</g></svg>'}\nfunction show(q,whole=false){try{p=q;$('domestic').innerHTML=dom(whole);$('baseline').innerHTML=R.renderIntegratedOriginal(rows,whole?12:pen,whole?1:q,'old');$('candidate').innerHTML=whole?R.renderIntegratedWhole(rows,'whole-new'):R.renderIntegrated(rows,pen,q,'new');frames=R.commitIntegratedHost($('candidate'));$('progress').value=q*100;$('value').textContent=(q*100).toFixed(8)+'%';status()}catch(e){errors.push(String(e));status()}}\nfunction local(t,ps){$('samples').innerHTML=ps.map((q,i)=>'<section><b>'+key(t)+' local '+q+'</b><div class=\"pair\">'+R.renderProgressive([[s(t)]],1,q,'local-old-'+i)+R.renderIntegratedLocal(rows,t.pen,t.mask,q,'local-new-'+i)+'</div></section>').join('');sampleFrames=R.commitIntegratedHost($('samples'));status()}\nfunction globalFor(t,q){const ms=rows[t.pen-1],before=ms.slice(0,t.mask-1).reduce((n,x)=>n+x.weight,0),total=ms.reduce((n,x)=>n+x.weight,0);return q===1&&t.mask===ms.length?1:(before+q*ms[t.mask-1].weight)/total}\nfunction coarse(compact=false){const ps=[0,.125,.25,.375,.5,.625,.75,.875,1];coarseMode=compact?'candidate150-reference-hidden':'reference220';$('coarse').classList.toggle('compact9',compact);$('coarse-mode').textContent=compact?'compact9: 후보만9개150px · shared reference숨김(독립truth 아님); 의심지점220/520확대':'기존220 비교: shared reference는독립truth 아님';$('coarse').innerHTML=ps.map((q,i)=>'<section data-coarse-step=\"'+q+'\"><b>'+q*100+'%</b>'+(compact?'':R.renderIntegratedOriginal(rows,pen,q,'coarse-old-'+i))+R.renderIntegrated(rows,pen,q,'coarse-new-'+i)+'</section>').join('');coarseFrames=R.commitIntegratedHost($('coarse'));status()}\nfunction btn(id,label,fn){const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=()=>{run++;try{fn()}catch(e){errors.push(String(e));status()}};$('controls').append(b)}\nbtn('ui-whole','전체12(미승인)',()=>{pen=12;show(1,true)});for(let n=1;n<=12;n++)btn('ui-pen-'+n,'획'+n,()=>{pen=n;show(0)});for(const[label,q]of[['0',0],['epsilon',1e-6],['95',.95],['99.99',.9999],['99.999999',.99999999],['100',1]])btn('ui-p-'+label,label,()=>show(q));\nfor(const t of targets){btn('ui-local6-'+key(t),key(t)+' local6',()=>local(t,[0,1e-6,.95,.9999,.99999999,1]));if(t.pen!==7){btn('ui-coverage-'+key(t),key(t)+' P-minus-fullround',()=>{$('samples').innerHTML=R.growthResidual(s(t),'residual-'+key(t));sampleFrames=[];status()});btn('ui-rho-'+key(t),key(t)+' rho=r3',()=>{pen=t.pen;show(globalFor(t,.5));const f=frames.find(x=>x.id===t.id)?.frame;if(!f)throw Error('own native guide required');const u=7/f.L;local(t,[u-1e-10,u,u+1e-10])})}}\nconst b=D.boundaries['3'][0];for(const[label,q]of[['before',b-1e-10],['at',b],['after',b+1e-10],['0',0],['epsilon',1e-6],['95',.95]])btn('ui-boundary3-'+label,'QQ3 '+label,()=>{pen=3;show(q)});\nbtn('ui-HV7','기존7 실제UA H/V3(미인증)',()=>{pen=7;show(.5);const t=targets.find(t=>t.pen===7),path=$('candidate').querySelector('[data-stroke-start-gate=\"u6e7a-7-1\"] [data-can-measurement=\"true\"]'),g=path.parentElement.parentElement,original=g.getAttribute('data-can-progress');let lo=0,hi=1;try{for(let i=0;i<40;i++){const q=(lo+hi)/2;g.setAttribute('data-can-progress',String(q));const f=R.measureTarget(s(t),q,path);if(f.point.y<=13.5)lo=q;else hi=q}}finally{g.setAttribute('data-can-progress',original)}const u=(lo+hi)/2;local(t,[u-1e-10,u,u+1e-10])});\nbtn('ui-coarse9','기존220 비교9',()=>coarse(false));btn('ui-compact9','compact9 후보만150px',()=>coarse(true));btn('ui-natural8','현재획8초(전frame기록X)',()=>{const active=run,start=performance.now();function tick(t){if(active!==run)return;show(Math.min(1,(t-start)/8000));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)});$('progress').oninput=()=>{run++;show(Number($('progress').value)/100)};show(D.whole?1:0,!!D.whole);if(D.coarse)coarse(false);\n"
def page(pen,coarse,strokes,domestic,whole=False):
 data={'pen':pen,'coarse':coarse,'strokes':strokes,'domestic':domestic,'whole':whole,'targets':C['targets'],'boundaries':C['boundaries']}
 script=BROWSER.replace('DATA',json.dumps(data,ensure_ascii=False,separators=(',',':')),1)
 return '<!doctype html><meta charset="utf-8"><title>湺4MQ 성장 + 7원P clip</title><style>body{font:15px system-ui;margin:12px;width:max-content}button{margin:4px}.pair{display:flex;gap:18px}.pair>div{width:520px}.pair svg,#samples svg{width:520px;height:520px;min-width:520px;min-height:520px}#coarse{display:grid;grid-template-columns:repeat(3,470px);gap:16px}#coarse svg{width:220px;height:220px}#coarse.compact9{grid-template-columns:repeat(3,150px);gap:8px}#coarse.compact9 svg{width:150px;height:150px;min-width:150px;min-height:150px}#status{white-space:pre-wrap;max-height:240px;overflow:auto;width:1100px}</style><h1>湺 · 12p13m23 · 고정4MQ 성장 + 원7HV clip</h1><p>국내정적/기존shared43/새후보520. 3m2는원상향Q/gap(-3.6,-34) 보존: 이전P접촉·QQ연결성·국내시간방향 미승인. 기존7정책본문byte불변/유한관찰만참조. source·P·guide·폭·weight불변, native/APP/runtimefalse. compact9는후보만150px/reference숨김이며의심지점220/520확인필수.</p><div id="controls"></div><input id="progress" aria-label="진행률" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output><div class="pair"><div id="domestic"></div><div id="baseline"></div><div id="candidate"></div></div><h2>고유target local / coverage</h2><div id="samples"></div><h2 id="coarse-mode">기존220 비교: shared reference는독립truth 아님</h2><div id="coarse"></div><pre id="status"></pre><script type="module">'+script+'</script>'
def main():
 a=argparse.ArgumentParser();a.add_argument('--port',type=int,default=0);args=a.parse_args();guards()
 F=json.loads((HERE/C['sourceFixture']).read_text())[C['fixtureRoot']];strokes=F['strokes'];assert len(strokes)==12 and sum(map(len,strokes))==13
 spec=importlib.util.spec_from_file_location('fixed_u6e7a_domestic',HERE/C['rawStaticHelper']);raw=importlib.util.module_from_spec(spec);spec.loader.exec_module(raw);raw.guards();domestic=raw.fetch_dictionary_once()
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port)
    u=urlparse(self.path);assert not u.scheme and not u.netloc and not u.fragment;pen,coarse=select(u.path,u.query)
    if u.path=='/render.mjs':body=(HERE/'render.mjs').read_text();kind='text/javascript'
    elif u.path=='/checks':body=json.dumps({'glyph':'湺','sourceCounts':C['counts'],'newQTargets':4,'old7PolicyBytePreserved':True,'sourceGeometry':0,'compiler':0,'engine':0,'nativeApproval':False});kind='application/json'
    else:body=page(pen,coarse,strokes,domestic,u.path=='/whole');kind='text/html'
    b=body.encode();self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(b)));self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'none'; object-src 'none'");self.end_headers();self.wfile.write(b)
   except Exception:self.send_error(409,'Exact source/renderer contract rejected')
 server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler);print(json.dumps({'pid':os.getpid(),'port':server.server_port,'glyph':'湺','sourceCompiler':0,'geometry':0,'engine':0,'nativeApproval':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()
