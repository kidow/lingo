#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""湺7 source-only original-P HV clip. ROOT owns server/UI."""
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
 assert route in ['/','/whole','/progressive','/checks','/render.mjs']
 q=parse_qs(query,keep_blank_values=True,strict_parsing=True) if query else{}
 assert set(q)<=set(['stroke','coarse']) and all(len(v)==1 and v[0] for v in q.values())
 if route in ['/whole','/checks','/render.mjs']:assert not q
 if 'stroke'in q:assert q['stroke']==['7']
 if 'coarse'in q:assert q['coarse']==['1']
 return 'coarse'in q
BROWSER="import * as R from '/render.mjs';\nconst D=DATA,rows=D.strokes,S=R.targetMask(),$=id=>document.getElementById(id),errors=[];let p=0,frames=[],sampleFrames=[],coarseFrames=[],token=0;\nfunction status(){$('status').textContent=JSON.stringify({glyph:'湺',pen:7,progress:p,frames,samples:sampleFrames,coarse:coarseFrames,errors,UAHVBranchCertified:false,otherStartCapsAndQQ3Resolved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false},null,2)}\nfunction dom(whole=false){const d=D.domestic;return '<svg width=\"520\" height=\"520\" viewBox=\"'+d.viewBox+'\"><g fill=\"#222\" transform=\"'+d.transform+'\">'+(whole?d.strokes:[d.strokes[6]]).map(s=>'<path d=\"'+s.d+'\"/>').join('')+'</g></svg>'}\nfunction show(q,whole=false){try{p=q;$('domestic').innerHTML=dom(whole);$('baseline').innerHTML=whole?R.renderWhole(rows,'old-whole'):R.renderOriginal(rows,q,'old');$('candidate').innerHTML=whole?R.renderWhole(rows,'new-whole'):R.renderCandidate(rows,q,'new');frames=R.commitHost($('candidate'));$('progress').value=q*100;$('value').textContent=(q*100).toFixed(8)+'%';status()}catch(e){errors.push(String(e));status()}}\nfunction local(ps){$('samples').innerHTML=ps.map((q,i)=>'<section><b>7m1 local '+q+'</b><div class=\"pair\">'+R.renderOriginal(rows,q,'sample-old-'+i)+R.renderTargetLocal(rows,q,'sample-new-'+i)+'</div></section>').join('');sampleFrames=R.commitHost($('samples'));status()}\nfunction coarse(){const ps=[0,.125,.25,.375,.5,.625,.75,.875,1];$('coarse').innerHTML=ps.map((q,i)=>'<section><b>'+q*100+'%</b>'+R.renderOriginal(rows,q,'coarse-old-'+i)+R.renderCandidate(rows,q,'coarse-new-'+i)+'</section>').join('');coarseFrames=R.commitHost($('coarse'));status()}\nfunction btn(id,label,fn){const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=()=>{token++;try{fn()}catch(e){errors.push(String(e));status()}};$('controls').append(b)}\nbtn('ui-whole','原전체12(다른획미승인)',()=>show(1,true));btn('ui-prefix6','원prefix6 / 선택7 empty',()=>show(0));btn('ui-local6','7m1 local0/eps95/near1/1',()=>local([0,1e-6,.95,.9999,.99999999,1]));for(const[label,q]of[['0',0],['eps',1e-6],['95',.95],['99.99',.9999],['99.999999',.99999999],['100',1]])btn('ui-p-'+label,label,()=>show(q));\nbtn('ui-HV-transition','실제UA H/V 근사전환3(미인증)',()=>{show(.5);const path=$('candidate').querySelector('[data-can-measurement=\"true\"]'),g=path.parentElement.parentElement,original=g.getAttribute('data-can-progress');let lo=0,hi=1;try{for(let i=0;i<40;i++){const q=(lo+hi)/2;g.setAttribute('data-can-progress',String(q));const f=R.measureTarget(S,q,path);if(f.point.y<=13.5)lo=q;else hi=q}}finally{g.setAttribute('data-can-progress',original)}const u=(lo+hi)/2;local([Math.max(0,u-1e-10),u,Math.min(1,u+1e-10)])});\nbtn('ui-residual-old-new','원fullround잔여 vs 원P동일차감(자명/증거아님)',()=>{$('samples').innerHTML='<section><b>원fullround 잔여: 기존nativeFAIL 불변</b>'+R.residual('old-residual')+'</section><section><b>새원P-minus동일P: 자명하며coverage증거아님</b>'+R.residual('new-residual',true)+'</section>';sampleFrames=[];status()});btn('ui-coarse9','선택7 coarse9×220',coarse);btn('ui-natural8','선택7 8초(전frame기록아님)',()=>{const active=token,start=performance.now();function tick(t){if(active!==token)return;show(Math.min(1,(t-start)/8000));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)});$('progress').oninput=()=>{token++;show(Number($('progress').value)/100)};show(D.whole?1:0,!!D.whole);if(D.coarse)coarse();\n"
def page(coarse,strokes,domestic,whole=False):
 script=BROWSER.replace('DATA',json.dumps({'coarse':coarse,'strokes':strokes,'domestic':domestic,'whole':whole},ensure_ascii=False,separators=(',',':')),1)
 return '<!doctype html><meta charset="utf-8"><title>湺7 原P H/V clip</title><style>body{font:15px system-ui;margin:12px;width:max-content}button{margin:4px}.pair{display:flex;gap:18px}.pair>div{width:520px}.pair svg,#samples svg{width:520px;height:520px;min-width:520px;min-height:520px}#coarse{display:grid;grid-template-columns:repeat(3,470px);gap:16px}#coarse svg{width:220px;height:220px}#status{white-space:pre-wrap;max-height:240px;overflow:auto;width:1100px}</style><h1>湺 · 原12p13m23 · 선택7m1 H/J→B 원P clip</h1><p>왼쪽 국내정적 / 가운데 원shared43 / 오른쪽 단일7clip후보. 원P·guide긴decimal·폭14·weight54.22불변. 새p1은원P직접표시: 기존fullround계약과다름. UA H/V양자화/단조/AA 미증명, 전환점실검토필수. 다른1/2/3caps·QQ3는원HOLD그대로이며 해결/승인X. native/APP/runtimefalse.</p><div id="controls"></div><input id="progress" aria-label="진행률" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output><div class="pair"><div id="domestic"></div><div id="baseline"></div><div id="candidate"></div></div><h2>선택7 local / 잔여계약비교</h2><div id="samples"></div><h2>선택7 coarse9</h2><div id="coarse"></div><pre id="status"></pre><script type="module">'+script+'</script>'
def main():
 a=argparse.ArgumentParser();a.add_argument('--port',type=int,default=0);args=a.parse_args();guards()
 F=json.loads((HERE/C['sourceFixture']).read_text())[C['fixtureRoot']];strokes=F['strokes'];assert len(strokes)==12 and sum(map(len,strokes))==13
 spec=importlib.util.spec_from_file_location('fixed_u6e7a_domestic',HERE/C['rawStaticHelper']);raw=importlib.util.module_from_spec(spec);spec.loader.exec_module(raw);raw.guards();domestic=raw.fetch_dictionary_once()
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port)
    u=urlparse(self.path);assert not u.scheme and not u.netloc and not u.fragment;coarse=select(u.path,u.query)
    if u.path=='/render.mjs':body=(HERE/'render.mjs').read_text();kind='text/javascript'
    elif u.path=='/checks':body=json.dumps({'glyph':'湺','sourceCounts':C['counts'],'onlyTarget':'7m1','sourceGeometry':0,'compiler':0,'engine':0,'nativeApproval':False});kind='application/json'
    else:body=page(coarse,strokes,domestic,u.path=='/whole');kind='text/html'
    b=body.encode();self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(b)));self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'none'; object-src 'none'");self.end_headers();self.wfile.write(b)
   except Exception:self.send_error(409,'Exact source/renderer contract rejected')
 server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler);print(json.dumps({'pid':os.getpid(),'port':server.server_port,'glyph':'湺','onlyTarget':'7m1','sourceCompiler':0,'geometry':0,'engine':0,'nativeApproval':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()
