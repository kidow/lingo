#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""梲6m2 exact Q initial growing-cap display only. ROOT owns server/UI."""
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
 pen=q.get('stroke',['6'])[0];assert pen.isdecimal()and str(int(pen))==pen and 1<=int(pen)<=11
 return int(pen),'coarse'in q
def page(pen,coarse,strokes,domestic):
 data={'pen':pen,'coarse':coarse,'strokes':strokes,'domestic':domestic,'boundary':C['boundary']}
 script=BROWSER.replace('DATA',json.dumps(data,ensure_ascii=False,separators=(',',':')),1)
 return '<!doctype html><meta charset="utf-8"><title>梲 base 6m2 Q 성장cap 격리 검토</title><style>body{font:15px system-ui;margin:12px;width:max-content}button{margin:4px}.pair,.localpair{display:flex;gap:18px}.pair>div{width:520px}.pair svg,#samples svg{width:520px;height:520px;min-width:520px;min-height:520px}#coarse{display:grid;grid-template-columns:repeat(3,470px);gap:16px}#coarse svg{width:220px;height:220px}#status{white-space:pre-wrap;max-height:240px;overflow:auto;width:1100px}</style><h1>梲 base · 11p12m29 · 6m2 only growing Q T1/3 K1/40</h1><p>원full5/id3·geometry/guide/폭14/weight/HQgap불변. 좌:국내 정적single/whole · 가운데:원shared43 · 오른쪽:새6m2표시후보. 원H6m1/다른10획은shared43이며미승인입니다. 초기arc7 ideal cert는전체P교집합연결성·raster·native승인이아닙니다. native/app/runtimefalse.</p><div id="controls"></div><div id="target-controls"></div><input id="progress" aria-label="진행률" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output><div class="pair"><div id="domestic"></div><div id="baseline"></div><div id="candidate"></div></div><h2>local6m2/coverage</h2><div id="samples"></div><h2>coarse9</h2><div id="coarse"></div><pre id="status"></pre><script type="module">'+script+'</script>'
BROWSER="import * as R from '/render.mjs';\nconst D=DATA,strokes=D.strokes,target=strokes[5][1],boundary=D.boundary,$=id=>document.getElementById(id),errors=[];\nlet pen=D.pen,progress=0,mainFrames=[],sampleFrames=[],coarseFrames=[];\nconst q0=()=>R.targetInfo(6,2),globalFromLocal=p=>p===1?1:boundary+(1-boundary)*p;\nfunction domestic(whole=false){const d=D.domestic,rows=whole?d.strokes:[d.strokes[pen-1]];return '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"520\" height=\"520\" viewBox=\"'+d.viewBox+'\"><g fill=\"#222\" transform=\"'+d.transform+'\">'+rows.map(s=>'<path d=\"'+s.d+'\"/>').join('')+'</g></svg>'}\nfunction status(){const own=$('candidate').querySelector('[data-can-target=\"u68b2-6-2\"] > path[data-can-ink]');$('status').textContent=JSON.stringify({pen,globalProgress:progress,target:'u68b2-6-2',targetLocal:(mainFrames.find(f=>f.id==='u68b2-6-2')||{}).requestedLocal,frames:mainFrames,samples:sampleFrames,coarse:coarseFrames,distance:own?.getAttribute('data-growing-distance')??null,radius:own?.getAttribute('data-growing-radius')??null,errors,nativeApproval:false,appUI:false,runtime:false},null,2)}\nfunction show(p,whole=false){try{progress=p;$('domestic').innerHTML=domestic(whole);$('baseline').innerHTML=whole?R.renderOriginal(strokes,11,1,'old-whole'):R.renderOriginal(strokes,pen,p,'old-main');$('candidate').innerHTML=whole?R.renderWhole(strokes,'new-whole'):R.renderGrowingCaps(strokes,pen,p,'new-main');mainFrames=R.commitHost($('candidate'));$('progress').value=p*100;$('value').textContent=(p*100).toFixed(8)+'%';status()}catch(e){errors.push(String(e));status()}}\nfunction localSamples(values){$('samples').innerHTML=values.map((p,i)=>'<section><b>6m2 local '+p+'</b><div class=\"localpair\">'+R.renderOriginal([[target]],1,p,'local-old-'+i)+R.renderTargetLocal(strokes,6,2,p,'local-new-'+i)+'</div></section>').join('');sampleFrames=R.commitHost($('samples'));status()}\nfunction coverage(){$('samples').innerHTML=R.targetCoverageResidual(target,'coverage-mask-6-2');sampleFrames=[];status()}\nfunction coarse(){const ps=[0,.125,.25,.375,.5,.625,.75,.875,1];$('coarse').innerHTML=ps.map((p,i)=>'<section><b>'+p*100+'%</b>'+R.renderOriginal(strokes,pen,p,'coarse-old-'+i)+R.renderGrowingCaps(strokes,pen,p,'coarse-new-'+i)+'</section>').join('');coarseFrames=R.commitHost($('coarse'));status()}\nfunction button(id,label,fn,parent='controls'){const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=fn;$(parent).append(b)}\nbutton('ui-whole','전체11',()=>{pen=11;show(1,true)});for(let n=1;n<=11;n++)button('ui-pen-'+n,'획'+n,()=>{pen=n;show(0)});\nfor(const[label,p]of[['0',0],['epsilon .0001%',1e-6],['95%',.95],['99.99%',.9999],['99.999999%',.99999999],['100%',1]])button('ui-global-'+label,label,()=>show(p));\nfor(const[label,p]of[['before',boundary-1e-10],['at',boundary],['after',boundary+1e-10]])button('ui-boundary6-'+label,'6 경계 '+label,()=>{pen=6;show(p)});\nbutton('ui-risk-coverage-6-2','위험우선6m2 coverage P-minus-fullround',coverage,'target-controls');button('ui-risk-local-epsilon-3-2','6m2 local epsilon',()=>localSamples([1e-6]),'target-controls');button('ui-local6-3-2','6m2 local6',()=>localSamples([0,1e-6,.95,.9999,.99999999,1]),'target-controls');\nbutton('ui-rho6-3-2','6m2 rho=r 전/at/후',()=>{pen=6;show(globalFromLocal(.5));const f=mainFrames.find(x=>x.id==='u68b2-6-2').frame;if(!f)throw Error('current original guide measurement required');const u=7/f.L;localSamples([u-1e-10,u,u+1e-10])},'target-controls');\nbutton('ui-coarse9','현재획 coarse9×220',coarse);button('ui-natural8','현재획 자연8초',()=>{const start=performance.now();function frame(t){show(Math.min(1,(t-start)/8000));if(progress<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)});$('progress').oninput=()=>show(Number($('progress').value)/100);show(0);if(D.coarse)coarse();\n"

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');a=parser.parse_args();guards()
 if a.check_only:print(json.dumps({'guards':True,'HTTP':0,'server':0,'compiler':0,'engine':0}));return
 F=json.loads((HERE/C['sourceFixture']).read_text())[C['fixtureRoot']];strokes=F['strokes'];assert len(strokes)==11 and sum(map(len,strokes))==12
 spec=importlib.util.spec_from_file_location('fixed_u68b2_domestic',HERE/C['rawStaticHelper']);raw=importlib.util.module_from_spec(spec);spec.loader.exec_module(raw);raw.guards();domestic=raw.fetch_dictionary_once();domestic['viewBox']=raw.CONFIG['domesticViewBox']
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port)
    u=urlparse(self.path);assert not u.scheme and not u.netloc and not u.fragment;pen,coarse=select(u.path,u.query)
    if u.path=='/render.mjs':body=(HERE/'render.mjs').read_text();kind='text/javascript'
    elif u.path=='/checks':body=json.dumps({'glyph':'梲','pens':11,'masks':12,'polygons':29,'target':'u68b2-6-2','sourceProjection':0,'compiler':0,'engine':0,'nativeApproval':False});kind='application/json'
    else:body=page(pen,coarse,strokes,domestic);kind='text/html'
    rawbytes=body.encode();self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(rawbytes)));self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'none'; object-src 'none'");self.end_headers();self.wfile.write(rawbytes)
   except Exception:self.send_error(409,'Exact source/renderer contract rejected')
 server=ThreadingHTTPServer(('127.0.0.1',a.port),Handler)
 print(json.dumps({'pid':os.getpid(),'port':server.server_port,'glyph':'梲','sourceCompiler':0,'sourceProjection':0,'engine':0,'nativeApproval':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()
