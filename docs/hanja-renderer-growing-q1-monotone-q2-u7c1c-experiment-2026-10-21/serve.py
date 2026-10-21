#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""簜9m1 growing and9m2 original-P-x clip display only. ROOT owns server/UI."""
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
 pen=q.get('stroke',['9'])[0];assert pen.isdecimal()and str(int(pen))==pen and 1<=int(pen)<=18
 return int(pen),'coarse'in q
def page(pen,coarse,strokes,domestic,whole=False):
 data={'pen':pen,'coarse':coarse,'strokes':strokes,'domestic':domestic,'boundary':C['boundary'],'whole':whole}
 script=BROWSER.replace('DATA',json.dumps(data,ensure_ascii=False,separators=(',',':')),1)
 return '<!doctype html><meta charset="utf-8"><title>簜 9m1+9m2 Q 성장cap 격리 검토</title><style>body{font:15px system-ui;margin:12px;width:max-content}button{margin:4px}.pair,.localpair{display:flex;gap:18px}.pair>div{width:520px}.pair svg,#samples svg{width:520px;height:520px;min-width:520px;min-height:520px}#coarse{display:grid;grid-template-columns:repeat(3,470px);gap:16px}#coarse svg{width:220px;height:220px}#status{white-space:pre-wrap;max-height:240px;overflow:auto;width:1100px}</style><h1>簜 · 18p20m37 · 9m1+9m2 Q1 growing T1/2 K1/12 · Q2 original-P x-monotone</h1><p>원full5/id3·geometry/guide/폭14/weight/QQgap불변. 좌:국내 정적single/whole · 가운데:원shared43 · 오른쪽:새 Q1-growing / Q2-original-P-clip 후보. 나머지17획은shared43이며전체미승인입니다. 초기arc7 ideal cert는전체P교집합연결성·raster·native승인이아닙니다. native/app/runtimefalse.</p><div id="controls"></div><div id="target-controls"></div><input id="progress" aria-label="진행률" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output><div class="pair"><div id="domestic"></div><div id="baseline"></div><div id="candidate"></div></div><h2>local9m1 growing+9m2 original-P clip / 별도coverage</h2><div id="samples"></div><h2>coarse9</h2><div id="coarse"></div><pre id="status"></pre><script type="module">'+script+'</script>'
BROWSER="import * as R from '/render.mjs';\nconst D=DATA,strokes=D.strokes,targetFor=m=>strokes[8][m-1],boundary=D.boundary,$=id=>document.getElementById(id),errors=[];\nlet pen=D.pen,progress=0,mainFrames=[],sampleFrames=[],coarseFrames=[];\nconst globalFromLocal=(m,p)=>m===1?p*boundary:p===1?1:boundary+(1-boundary)*p;\nfunction domestic(whole=false){const d=D.domestic,rows=whole?d.strokes:[d.strokes[pen-1]];return '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"520\" height=\"520\" viewBox=\"'+d.viewBox+'\"><g fill=\"#222\" transform=\"'+d.transform+'\">'+rows.map(s=>'<path d=\"'+s.d+'\"/>').join('')+'</g></svg>'}\nfunction status(){$('status').textContent=JSON.stringify({pen,globalProgress:progress,targets:['u7c1c-9-1','u7c1c-9-2'],frames:mainFrames,samples:sampleFrames,coarse:coarseFrames,readings:[1,2].map(m=>{const own=$('candidate').querySelector('[data-can-target=\"u7c1c-9-'+m+'\"] > path[data-can-ink]');return{mask:m,distance:own?.getAttribute('data-growing-distance')??null,radius:own?.getAttribute('data-growing-radius')??null,clipX:own?.getAttribute('data-monotone-threshold')??null}}),errors,nativeApproval:false,appUI:false,runtime:false},null,2)}\nfunction show(p,whole=false){try{progress=p;$('domestic').innerHTML=domestic(whole);$('baseline').innerHTML=whole?R.renderOriginal(strokes,18,1,'old-whole'):R.renderOriginal(strokes,pen,p,'old-main');$('candidate').innerHTML=whole?R.renderWhole(strokes,'new-whole'):R.renderGrowingCaps(strokes,pen,p,'new-main');mainFrames=R.commitHost($('candidate'));$('progress').value=p*100;$('value').textContent=(p*100).toFixed(8)+'%';status()}catch(e){errors.push(String(e));status()}}\nfunction localSamples(mask,values){const target=targetFor(mask);$('samples').innerHTML=values.map((p,i)=>'<section><b>9m'+mask+' local '+p+'</b><div class=\"localpair\">'+R.renderOriginal([[target]],1,p,'local-old-'+mask+'-'+i)+R.renderTargetLocal(strokes,9,mask,p,'local-new-'+mask+'-'+i)+'</div></section>').join('');sampleFrames=R.commitHost($('samples'));status()}\nfunction coverage(mask){$('samples').innerHTML='<h3>9m'+mask+(mask===1?' P-minus-original-full-round':' P-minus-complete-original-P-clip')+'</h3>'+R.targetCoverageResidual(targetFor(mask),'coverage-mask-9-'+mask);sampleFrames=[];status()}\nfunction coarse(){const ps=[0,.125,.25,.375,.5,.625,.75,.875,1];$('coarse').innerHTML=ps.map((p,i)=>'<section><b>'+p*100+'%</b>'+R.renderOriginal(strokes,pen,p,'coarse-old-'+i)+R.renderGrowingCaps(strokes,pen,p,'coarse-new-'+i)+'</section>').join('');coarseFrames=R.commitHost($('coarse'));status()}\nfunction button(id,label,fn,parent='controls'){const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=fn;$(parent).append(b)}\nbutton('ui-whole','전체18',()=>{pen=18;show(1,true)});for(let n=1;n<=18;n++)button('ui-pen-'+n,'획'+n,()=>{pen=n;show(0)});\nfor(const[label,p]of[['0',0],['epsilon .0001%',1e-6],['95%',.95],['99.99%',.9999],['99.999999%',.99999999],['100%',1]])button('ui-global-'+label,label,()=>show(p));\nfor(const[label,p]of[['before',boundary-1e-10],['at',boundary],['after',boundary+1e-10]])button('ui-boundary9-'+label,'9 경계 '+label,()=>{pen=9;show(p)});\nfor(const mask of[1,2]){button('ui-risk-coverage-9-'+mask,'위험우선9m'+mask+(mask===1?' P-minus-fullround':' P-minus-complete-original-P-clip'),()=>coverage(mask),'target-controls');button('ui-risk-local-epsilon-9-'+mask,'9m'+mask+' local epsilon',()=>localSamples(mask,[1e-6]),'target-controls');button('ui-local6-9-'+mask,'9m'+mask+' local6',()=>localSamples(mask,[0,1e-6,.95,.9999,.99999999,1]),'target-controls')}\nfor(const mask of[1])button('ui-rho9-9-'+mask,'9m1 growing rho=r 전/at/후',()=>{pen=9;show(globalFromLocal(mask,.5));const f=mainFrames.find(x=>x.id==='u7c1c-9-'+mask).frame;if(!f)throw Error('current original guide measurement required');const u=7/f.L;localSamples(mask,[u-1e-10,u,u+1e-10])},'target-controls');\nbutton('ui-coarse9','현재획 coarse9×220',coarse);button('ui-natural8','현재획 자연8초',()=>{const start=performance.now();function frame(t){show(Math.min(1,(t-start)/8000));if(progress<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)});$('progress').oninput=()=>show(Number($('progress').value)/100);if(D.whole){pen=18;show(1,true)}else show(0);if(D.coarse)coarse();\n"

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');a=parser.parse_args();guards()
 if a.check_only:print(json.dumps({'guards':True,'HTTP':0,'server':0,'compiler':0,'engine':0}));return
 F=json.loads((HERE/C['sourceFixture']).read_text())[C['fixtureRoot']];strokes=F['strokes'];assert len(strokes)==18 and sum(map(len,strokes))==20
 spec=importlib.util.spec_from_file_location('fixed_u7c1c_domestic',HERE/C['rawStaticHelper']);raw=importlib.util.module_from_spec(spec);spec.loader.exec_module(raw);raw.guards();domestic=raw.fetch_dictionary_once()
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port)
    u=urlparse(self.path);assert not u.scheme and not u.netloc and not u.fragment;pen,coarse=select(u.path,u.query)
    if u.path=='/render.mjs':body=(HERE/'render.mjs').read_text();kind='text/javascript'
    elif u.path=='/checks':body=json.dumps({'glyph':'簜','pens':18,'masks':20,'polygons':37,'targets':['u7c1c-9-1','u7c1c-9-2'],'sourceProjection':0,'compiler':0,'engine':0,'nativeApproval':False});kind='application/json'
    else:body=page(pen,coarse,strokes,domestic,u.path=='/whole');kind='text/html'
    rawbytes=body.encode();self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(rawbytes)));self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'none'; object-src 'none'");self.end_headers();self.wfile.write(rawbytes)
   except Exception:self.send_error(409,'Exact source/renderer contract rejected')
 server=ThreadingHTTPServer(('127.0.0.1',a.port),Handler)
 print(json.dumps({'pid':os.getpid(),'port':server.server_port,'glyph':'簜','sourceCompiler':0,'sourceProjection':0,'engine':0,'nativeApproval':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()

