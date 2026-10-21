#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,os
from pathlib import Path
from urllib.parse import urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent;REPO=HERE.parent.parent
C=json.loads((HERE/'config.json').read_text());V=json.loads((HERE/'validation.json').read_text())
def sha(b):return hashlib.sha256(b).hexdigest()
def guards():
 assert sha((HERE/'config.json').read_bytes())==V['configSHA256']
 for p,h in C['inputSHA256'].items():assert sha((REPO/p).read_bytes())==h,p
 for p,h in V['newFilesSHA256'].items():assert sha((HERE/p).read_bytes())==h,p
 raw=(HERE/C['sourceFixture']).read_bytes();assert sha(raw)==C['fixtureSHA256'];f=json.loads(raw)[C['fixtureRoot']]
 assert len(f['strokes'])==13 and sum(map(len,f['strokes']))==15 and sum(s['outline'].count('M')for row in f['strokes']for s in row)==35
 assert f['strokes'][10][0]==C['target']['segment']
 assert sorted(f['fullProof'])==['defaults','engineHashes','engineRevision','groups','trace']
 for i,call in zip([8,9],C['target']['rawCalls']):
  assert len(f['fullProof']['trace'][i])==1
  actual=f['fullProof']['trace'][i][0];assert actual['kind']==call['kind'] and actual['args']==call['args']
 assert f['fullProof']['trace'][9][0]['args'][-2:]==[22,113]
 return f

def route(path):
 u=urlparse(path);assert not u.scheme and not u.netloc and not u.fragment and not u.query;assert u.path in ['/','/coverage','/checks'];return u.path

def page():
 s=C['target']['segment'];P=html.escape(s['outline'],quote=True);G=html.escape(s['revealPath'],quote=True)
 start='<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 100 100" '
 bg='<rect x="0" y="0" width="100" height="100" fill="white"/>'
 original=start+'id="original-svg">'+bg+'<path id="original-ink" d="'+P+'" fill="black"/></svg>'
 guide=start+'id="guide-svg">'+bg+'<path id="full-guide-visual" d="'+G+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
 residual=start+'id="residual-svg" data-coverage-ready="false">'+bg+'<defs><mask id="coverage-11-1-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" mask-type="luminance" x="0" y="0" width="100" height="100">'+bg+'<path id="coverage-full-guide" d="'+G+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/></mask></defs><path id="residual-ink" d="'+P+'" fill="black" mask="url(#coverage-11-1-mask)" visibility="hidden"/></svg>'
 witness=start+'id="witness-svg">'+bg+'<path d="'+P+'" fill="black"/><circle id="witness-marker" cx="0" cy="0" r=".7" fill="none" stroke="orange" stroke-width=".25"/></svg>'
 data={k:C[k]for k in['target','storedCoverageArithmetic','compiledSHA256','nativeCoverageApproved']}
 script=BROWSER.replace('DATA',json.dumps(data,ensure_ascii=False,separators=(',',':')),1)
 return '<!doctype html><meta charset="utf-8"><title>綎11 원P terminal coverage</title><style>body{font:15px system-ui;margin:12px;width:max-content}.boards{display:flex;gap:18px}.boards section{width:520px}svg{width:520px;height:520px;min-width:520px;min-height:520px}button{margin:5px}pre{white-space:pre-wrap;width:1580px;max-height:340px;overflow:auto}</style><h1>綎11 원P − 원 full-round guide · native 미승인</h1><p>13p15m35 / raw8 H+raw9 사선 L(0-based), flags22/113. 같은viewBox/동일520px배율. 원outline/guide/width14/weight/좌표/종단분리 변경0. 원P / 원전guide / P-minus-fullround를 각각 보며 잔여검정은 coverage 관찰자료입니다. UA 길이/endpoint/DOM검증 ready=true 이후만 검토합니다. 원guide는 NOpathLength·undashed fullstroke이며 수학L로대체하지않습니다. witness는별도패널에만표시됩니다.</p><div class="boards"><section><h2>원P</h2>'+original+'</section><section><h2>원guide width14 round/miter</h2>'+guide+'</section><section id="residual-panel"><h2>원P − full-round guide</h2>'+residual+'</section></div><button id="ui-witness-vertex">별도패널 원foot vertex</button><button id="ui-witness-interior">별도패널 strict-interior witness</button><button id="ui-witness-hide">witness 숨기기</button><section id="witness-panel" hidden><h2 id="witness-label"></h2>'+witness+'<pre id="witness-data"></pre></section><pre id="status"></pre><script>'+script+'</script>'
BROWSER="function ensure(v,m){if(!v)throw Error(m)}\nfunction coordinateState(nodes,owner){const doc=owner.ownerDocument,view=doc?.defaultView;ensure(view&&view.document===doc,'same native SVG document');const parents=new Map();for(const node of nodes){let n=node;const seen=new Set();while(n){ensure(!seen.has(n),'parent cycle');seen.add(n);ensure(n.namespaceURI==='http://www.w3.org/2000/svg'&&n.ownerDocument===doc&&n.isConnected&&(n===owner||n.ownerSVGElement===owner),'connected original SVG owner');const p=n.parentElement;ensure(!p||p.isConnected&&p.ownerDocument===doc,'connected parent document');parents.set(n,p);if(n===owner)break;n=p}ensure(n===owner,'target SVG ancestor')}return()=>{if(owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false;for(const[n,p]of parents){if(!n.isConnected||n.ownerDocument!==doc||n.parentElement!==p||(n!==owner&&n.ownerSVGElement!==owner)||n.getAttribute('transform')!==null)return false;const style=view.getComputedStyle(n);if(style.transform!=='none'||['translate','rotate','scale'].some(k=>{const v=style.getPropertyValue(k);return v!==''&&v!=='none'}))return false}return true}}\nfunction exactFullFrame(s,guide,ink,svg){const mask=guide?.parentElement,defs=mask?.parentElement;ensure(mask?.localName==='mask'&&defs?.localName==='defs'&&defs.parentElement===svg&&ink?.parentElement===svg,'exact residual tree');const stable=coordinateState([guide,ink],svg);const exact=()=>stable()&&svg.getAttribute('viewBox')==='0 0 100 100'&&svg.getAttribute('width')==='520'&&svg.getAttribute('height')==='520'&&guide.parentElement===mask&&mask.parentElement===defs&&defs.parentElement===svg&&mask.children.length===2&&mask.children[0].localName==='rect'&&mask.children[0].getAttribute('fill')==='white'&&['x','y'].every(k=>mask.children[0].getAttribute(k)==='0')&&['width','height'].every(k=>mask.children[0].getAttribute(k)==='100')&&mask.children[1]===guide&&mask.getAttribute('mask-type')==='luminance'&&mask.getAttribute('id')==='coverage-11-1-mask'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&mask.getAttribute('maskContentUnits')==='userSpaceOnUse'&&mask.getAttribute('x')==='0'&&mask.getAttribute('y')==='0'&&mask.getAttribute('width')==='100'&&mask.getAttribute('height')==='100'&&guide.getAttribute('d')===s.revealPath&&guide.getAttribute('stroke-width')===String(s.revealWidth)&&guide.getAttribute('fill')==='none'&&guide.getAttribute('stroke')==='black'&&guide.getAttribute('stroke-linecap')==='round'&&guide.getAttribute('stroke-linejoin')==='miter'&&guide.getAttribute('pathLength')===null&&guide.getAttribute('stroke-dasharray')===null&&guide.getAttribute('stroke-dashoffset')===null&&ink.getAttribute('d')===s.outline&&ink.getAttribute('fill')==='black'&&ink.getAttribute('mask')==='url(#coverage-11-1-mask)';ensure(exact(),'exact source P/fullround binding before UA');const L=guide.getTotalLength();ensure(Number.isFinite(L)&&L>0&&exact(),'invalid native fullguide length or changed binding');const point=guide.getPointAtLength(L);ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&Math.hypot(point.x-43,point.y-44.5)<1e-4&&exact(),'invalid original UA endpoint or changed binding');return{L,point:{x:point.x,y:point.y},guide:guide.getAttribute('d'),width:s.revealWidth,measurement:'same connected original mask path / NOpathLength / full guide undashed',nativeCoverageApproved:false}}\n\nconst C=DATA,$=id=>document.getElementById(id),ink=$('residual-ink'),svg=$('residual-svg'),guide=$('coverage-full-guide');let errors=[];const status=(v)=>{$('status').textContent=JSON.stringify(v,null,2)};ink.setAttribute('visibility','hidden');svg.setAttribute('data-coverage-ready','false');try{const frame=exactFullFrame(C.target.segment,guide,ink,svg);ensure($('original-ink').getAttribute('d')===C.target.segment.outline&&$('full-guide-visual').getAttribute('d')===C.target.segment.revealPath&&$('full-guide-visual').getAttribute('stroke-width')==='14','comparison P/guide exact');ink.setAttribute('visibility','visible');svg.setAttribute('data-coverage-ready','true');status({ready:true,frame,geometry:C.compiledSHA256,witnessVisible:false,nativeCoverageApproved:false,errors})}catch(e){ink.setAttribute('visibility','hidden');errors.push(String(e));status({ready:false,errors,nativeCoverageApproved:false})}\nfunction witness(i){const target=C.storedCoverageArithmetic.witnesses[i],number=s=>{const[n,d]=s.split('/').map(Number);return n/d},point=target.point.map(number),panel=$('witness-panel');panel.hidden=false;$('witness-label').textContent=target.name+' (stored math only; marker is separate from residual)';$('witness-marker').setAttribute('cx',String(point[0]));$('witness-marker').setAttribute('cy',String(point[1]));$('witness-data').textContent=JSON.stringify(target,null,2)}$('ui-witness-vertex').onclick=()=>witness(0);$('ui-witness-interior').onclick=()=>witness(1);$('ui-witness-hide').onclick=()=>{$('witness-panel').hidden=true};\n"

def main():
 p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args();guards()
 if a.check_only:print(json.dumps({'guards':True,'HTTP':0,'server':0,'sourceCompiler':0,'geometry':0,'engine':0}));return
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port);r=route(self.path)
    if r=='/checks':body=json.dumps({'glyph':'綎','counts':C['counts'],'geometry':C['compiledSHA256'],'target':[11,1],'nativeCoverageApproved':False,'sourceCompiler':0,'geometryExecutions':0,'engine':0});kind='application/json'
    else:body=page();kind='text/html'
    raw=body.encode();self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Content-Length',str(len(raw)));self.send_header('Cache-Control','no-store');self.send_header('Content-Security-Policy',"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; object-src 'none'; base-uri 'none'");self.end_headers();self.wfile.write(raw)
   except Exception:self.send_error(409,'Exact cached source/coverage contract rejected')
 server=ThreadingHTTPServer(('127.0.0.1',a.port),Handler);print(json.dumps({'pid':os.getpid(),'port':server.server_port,'glyph':'綎','target':[11,1],'sourceCompiler':0,'geometry':0,'engine':0,'nativeCoverageApproved':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()
