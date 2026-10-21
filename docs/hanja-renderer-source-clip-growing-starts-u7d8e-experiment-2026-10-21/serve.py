#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""綎 five-growing + source-specific H/J/B clip candidate. ROOT owns server/UI."""
import sys
sys.dont_write_bytecode=True
import argparse,ast,hashlib,html,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
C=json.loads((HERE/'config.json').read_text());V=json.loads((HERE/'validation.json').read_text())
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
 assert sha((HERE/'config.json').read_bytes())==V['configSHA256']
 for path,pin in C['inputSHA256'].items():assert sha((REPO/path).read_bytes())==pin,path
 for name,pin in V['newFilesSHA256'].items():assert sha((HERE/name).read_bytes())==pin,name
 assert sha((HERE/C['sourceFixture']).read_bytes())==C['fixtureSHA256']
def select(route,query):
 assert route in ['/','/whole','/pairs','/progressive','/checks','/render.mjs']
 q=parse_qs(query,keep_blank_values=True,strict_parsing=True)if query else{}
 assert set(q)<=set(['stroke','coarse'])and all(len(v)==1 and v[0]for v in q.values())
 if route in ['/whole','/checks','/render.mjs']:assert not q
 if 'coarse'in q:assert q['coarse']==['1']
 pen=q.get('stroke',['1'])[0];assert pen.isdecimal()and str(int(pen))==pen and 1<=int(pen)<=13
 return int(pen),'coarse'in q
def page(pen,coarse,strokes,domestic):
 data={'pen':pen,'coarse':coarse,'strokes':strokes,'domestic':domestic,'boundaries':C['boundaries'],'targets':C['targets']}
 script=BROWSER.replace('DATA',json.dumps(data,ensure_ascii=False,separators=(',',':')),1)
 return '<!doctype html><meta charset="utf-8"><title>綎 원P HL clip + 5시작 성장cap 독립 검토</title><style>body{font:15px system-ui;margin:12px;width:max-content}button{margin:4px}.pair,.localpair{display:flex;gap:18px}.pair>div{width:520px}.pair svg,#samples svg{width:520px;height:520px;min-width:520px;min-height:520px}#coarse{display:grid;grid-template-columns:repeat(3,470px);gap:16px}#coarse svg{width:220px;height:220px}#status{white-space:pre-wrap;max-height:240px;overflow:auto;width:1100px}</style><h1>綎 · 13p15m35 · 4MQ+12MLQ 성장 / 11HL 원P clip</h1><p>왼쪽 국내정적 · 가운데 원shared43 · 오른쪽 새표시후보. 11m1은 H/J→B 원P halfplane 및 완료P직접표시 계약으로 fullround와 다릅니다. 실제 원DOM UA점만 사용하며 H/L양자화 단조·AA는 미증명: 전환점/root native 필수. 다른5대상은 원폭14 성장cap, 초기arc7만 인증. 원source/full5/id3/flags/guide/weight/gap 불변. native/app/runtimefalse.</p><div id="controls"></div><div id="target-controls"></div><input id="progress" aria-label="진행률" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output><div class="pair"><div id="domestic"></div><div id="baseline"></div><div id="candidate"></div></div><h2>여섯 고유 대상 local / 서로 다른 완료coverage</h2><div id="samples"></div><h2>coarse9</h2><div id="coarse"></div><pre id="status"></pre><script type="module">'+script+'</script>'
BROWSER="import * as R from '/render.mjs';\nconst D=DATA,strokes=D.strokes,targets=D.targets,$=id=>document.getElementById(id),errors=[];let pen=D.pen,progress=0,mainFrames=[],sampleFrames=[],coarseFrames=[],run=0;\nconst key=t=>t.pen+'m'+t.mask,targetFor=t=>strokes[t.pen-1][t.mask-1];\nfunction globalFromLocal(t,p){const rows=strokes[t.pen-1],total=rows.reduce((n,s)=>n+s.weight,0),before=rows.slice(0,t.mask-1).reduce((n,s)=>n+s.weight,0);return p===1&&t.mask===rows.length?1:(before+p*rows[t.mask-1].weight)/total}\nfunction domestic(whole=false){const d=D.domestic,rows=whole?d.strokes:[d.strokes[pen-1]];return '<svg width=\"520\" height=\"520\" viewBox=\"'+d.viewBox+'\"><g fill=\"#222\" transform=\"'+d.transform+'\">'+rows.map(s=>'<path d=\"'+s.d+'\"/>').join('')+'</g></svg>'}\nfunction status(){$('status').textContent=JSON.stringify({pen,globalProgress:progress,targets:targets.map(t=>({pen:t.pen,mask:t.mask,kind:t.kind})),frames:mainFrames,samples:sampleFrames,coarse:coarseFrames,errors,UAHLBranchMonotonicityCertified:false,nativeApproval:false,appUI:false,runtime:false},null,2)}\nfunction show(p,whole=false){try{progress=p;$('domestic').innerHTML=domestic(whole);$('baseline').innerHTML=R.renderOriginal(strokes,whole?13:pen,whole?1:p,'old-main');$('candidate').innerHTML=whole?R.renderWhole(strokes,'new-whole'):R.renderGrowingCaps(strokes,pen,p,'new-main');mainFrames=R.commitHost($('candidate'));$('progress').value=p*100;$('value').textContent=(p*100).toFixed(8)+'%';status()}catch(e){errors.push(String(e));status()}}\nfunction locals(t,values){$('samples').innerHTML=values.map((p,i)=>'<section><b>'+key(t)+' '+t.kind+' local '+p+'</b><div class=\"localpair\">'+R.renderOriginal([[targetFor(t)]],1,p,'local-old-'+key(t)+'-'+i)+R.renderTargetLocal(strokes,t.pen,t.mask,p,'local-new-'+key(t)+'-'+i)+'</div></section>').join('');sampleFrames=R.commitHost($('samples'));status()}\nfunction coverage(t){const s=targetFor(t);$('samples').innerHTML=t.kind==='source-HJ-B-halfplane'?'<section><b>11m1 기존 guide fullround 잔여(기존FAIL 비교)</b>'+R.targetCoverageResidual(s,'oldround-'+key(t),true)+'</section><section><b>11m1 새 완료 원P-minus-동일P: AA 포함 실제 검토 필요, fullround 주장 아님</b>'+R.targetCoverageResidual(s,'directP-'+key(t))+'</section>':R.targetCoverageResidual(s,'coverage-mask-'+key(t));sampleFrames=[];status()}\nfunction coarse(){const ps=[0,.125,.25,.375,.5,.625,.75,.875,1];$('coarse').innerHTML=ps.map((p,i)=>'<section><b>'+p*100+'%</b>'+R.renderOriginal(strokes,pen,p,'coarse-old-'+i)+R.renderGrowingCaps(strokes,pen,p,'coarse-new-'+i)+'</section>').join('');coarseFrames=R.commitHost($('coarse'));status()}\nfunction button(id,label,fn,parent='controls'){const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=()=>{run++;try{fn()}catch(e){errors.push(String(e));status()}};$(parent).append(b)}\nbutton('ui-whole','전체13',()=>{pen=13;show(1,true)});for(let n=1;n<=13;n++)button('ui-pen-'+n,'획'+n,()=>{pen=n;show(0)});\nfor(const[label,p]of[['0',0],['epsilon .0001%',1e-6],['95%',.95],['99.99%',.9999],['99.999999%',.99999999],['100%',1]])button('ui-global-'+label,label,()=>show(p));\nfor(const t of targets){button('ui-coverage-'+key(t),key(t)+' '+(t.kind==='source-HJ-B-halfplane'?'두 완료계약 residual':'P-minus-fullround'),()=>coverage(t),'target-controls');button('ui-epsilon-'+key(t),key(t)+' local epsilon',()=>locals(t,[1e-6]),'target-controls');button('ui-local6-'+key(t),key(t)+' local6',()=>locals(t,[0,1e-6,.95,.9999,.99999999,1]),'target-controls');if(t.kind!=='source-HJ-B-halfplane')button('ui-rho-'+key(t),key(t)+' rho=r 전/at/후',()=>{pen=t.pen;show(globalFromLocal(t,.5));const f=mainFrames.find(x=>x.id===t.id)?.frame;if(!f)throw Error('original UA measurement required');const u=7/f.L;locals(t,[u-1e-10,u,u+1e-10])},'target-controls');if(t.firstLine)button('ui-firstL-'+key(t),key(t)+' 첫L 끝 전/at/후(전체UA L사용)',()=>{pen=t.pen;show(globalFromLocal(t,.5));const f=mainFrames.find(x=>x.id===t.id)?.frame;if(!f)throw Error('original UA measurement required');const u=t.firstLine/f.L;locals(t,[u-1e-10,u,u+1e-10])},'target-controls')}\n// Diagnostic UA corner search only: no mathematical length replaces native total/time.\nbutton('ui-HL-transition','11m1 실제 UA H/L 전환 전/근사경계/후(미인증)',()=>{const t=targets.find(t=>t.pen===11&&t.mask===1);pen=11;show(.5);const path=$('candidate').querySelector('[data-can-target=\"'+t.id+'\"] [data-can-measurement=\"true\"]'),g=path.parentElement.parentElement,old=g.getAttribute('data-can-progress');let lo=0,hi=1;try{for(let i=0;i<40;i++){const m=(lo+hi)/2;g.setAttribute('data-can-progress',String(m));const f=R.measureTarget(targetFor(t),m,path);if(f.point.y<=16.5)lo=m;else hi=m}}finally{g.setAttribute('data-can-progress',old)}const u=(lo+hi)/2;locals(t,[Math.max(0,u-1e-10),u,Math.min(1,u+1e-10)])},'target-controls');\nfor(const[n,bs]of Object.entries(D.boundaries))for(const[label,p]of[['before',bs[0]-1e-10],['at',bs[0]],['after',bs[0]+1e-10],['0',0],['epsilon',1e-6],['95',.95]])button('ui-boundary-'+n+'-'+label,n+' 경계 '+label,()=>{pen=Number(n);show(p)});\nbutton('ui-coarse9','현재획 coarse9×220',coarse);button('ui-natural8','현재획 자연8초',()=>{const token=run,start=performance.now();function frame(t){if(token!==run)return;show(Math.min(1,(t-start)/8000));if(progress<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)});$('progress').oninput=()=>{run++;show(Number($('progress').value)/100)};show(0);if(D.coarse)coarse();\n"

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');a=parser.parse_args();guards()
 if a.check_only:print(json.dumps({'guards':True,'HTTP':0,'server':0,'compiler':0,'engine':0}));return
 F=json.loads((HERE/C['sourceFixture']).read_text())[C['fixtureRoot']];strokes=F['strokes'];assert len(strokes)==13 and sum(map(len,strokes))==15
 spec=importlib.util.spec_from_file_location('fixed_u7d8e_domestic',HERE/C['rawStaticHelper']);raw=importlib.util.module_from_spec(spec);spec.loader.exec_module(raw);raw.guards();domestic=raw.fetch_dictionary_once()
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port)
    u=urlparse(self.path);assert not u.scheme and not u.netloc and not u.fragment;pen,coarse=select(u.path,u.query)
    if u.path=='/render.mjs':body=(HERE/'render.mjs').read_text();kind='text/javascript'
    elif u.path=='/checks':body=json.dumps({'glyph':'綎','pens':13,'masks':15,'polygons':35,'targets':[t['id']for t in C['targets']],'sourceProjection':0,'compiler':0,'engine':0,'nativeApproval':False});kind='application/json'
    else:body=page(pen,coarse,strokes,domestic);kind='text/html'
    rawbytes=body.encode();self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(rawbytes)));self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'none'; object-src 'none'");self.end_headers();self.wfile.write(rawbytes)
   except Exception:self.send_error(409,'Exact source/renderer contract rejected')
 server=ThreadingHTTPServer(('127.0.0.1',a.port),Handler)
 print(json.dumps({'pid':os.getpid(),'port':server.server_port,'glyph':'綎','sourceCompiler':0,'sourceProjection':0,'engine':0,'nativeApproval':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()
