#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Isolated source-bound mask experiment; no engine, compiler, product or network fetch."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, json, os
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PINS = {
    'source': ('docs/hanja-goal-glyphwiki-batch898-2026-10-13/engine-whole-u928d.json', '87cb68cf1f9cb210b49bcaece7c9eb7e5b3f9d56b528c9c331d1b76a4530bd71'),
    'fixture': (str(HERE.relative_to(ROOT)/'fixture.json'), '9f0fe3a08e5d670644e0ed7457020f2c7f50f57143849193404fc0bd78c4e4b9'),
    'deriver': (str(HERE.relative_to(ROOT)/'prototype.mjs'), '93d640058f8ef0b8000cb022dcba22679e4f9a4522457770fb708da8fb2f0ce9')
}
BROWSER = r'''
const ns='http://www.w3.org/2000/svg', candidate=document.querySelector('#candidate'), status=document.querySelector('#status'), range=document.querySelector('#progress');
let source,fixture,phase='foot',progress=0,clock=null,errors=[],lastFrame=null,serial=0;
const rat=x=>Number(x[0])/Number(x[1]), point=p=>p.map(rat);
function element(tag,attrs={}){const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
function polyD(p){return 'M'+p.map(v=>v.join(' ')).join('L')+'Z';}
function originalPolys(index){return source.groups[index].polygons.map(poly=>poly.map(p=>[p.x,p.y]));}
function originalD(index){return originalPolys(index).map(p=>{const sum=p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-a[1]*b[0]},0);return polyD(sum<0?[...p].reverse():p);}).join('');}
function guide(index){const a=source.groups[index].raw;return 'M'+a[3]+' '+a[4]+'Q'+a[5]+' '+a[6]+' '+a[7]+' '+a[8];}
function visibleTriangles(p){
 const n=fixture.order.length,out=[];let full=0,local=0,start=0;
 for(let i=0;i<n;i++){const item=fixture.order[i],weight=rat(fixture.phaseWeights[i]),end=start+weight;
  if(p===1||p>=end){out.push(fixture.triangles[item.triangle].map(point));full++;start=end;continue;}
  if(p>start){local=(p-start)/weight;const seed=point(item.seed);out.push(fixture.triangles[item.triangle].map(point).map(v=>v.map((x,k)=>seed[k]+local*(x-seed[k]))));}break;
 }
 return {d:out.map(polyD).join(''),full,local};
}
function makeSVG(mode,p,inverse=false){
 const maskId='reveal-'+(++serial),q1Id=maskId+'-q1';
 const svg=element('svg',{viewBox:'0 0 200 200',width:520,height:520,'aria-label':'銍 source-bound triangulation candidate'}),defs=element('defs'),mask=element('mask',{id:maskId,'maskUnits':'userSpaceOnUse',x:0,y:0,width:200,height:200});
 mask.append(element('rect',{x:0,y:0,width:200,height:200,fill:inverse?'white':'black'}));
 const foot=visibleTriangles(mode==='body'?1:mode==='foot'?p:0);
 if(foot.d)mask.append(element('path',{d:foot.d,fill:inverse?'black':'white','fill-rule':'nonzero','data-foot-mask':'one-nonzero-path'}));
 let measure=null;
 if(mode==='body'&&p>0){
  const path=element('path',{d:guide(10),fill:'none',stroke:inverse?'black':'white','stroke-width':28,'stroke-linecap':'round','stroke-linejoin':'miter','data-original-Q2-guide':'true'});
  mask.append(path);defs.append(mask);svg.append(defs);candidate.append(svg);
  if(!path.isConnected||path.ownerSVGElement!==svg||path.hasAttribute('pathLength')||path.hasAttribute('transform'))throw Error('Original same-path measurement owner changed');
  const d=path.getAttribute('d'),L=path.getTotalLength(),end=path.getPointAtLength(L),L2=path.getTotalLength();
  if(!(L>0)||!Number.isFinite(L)||L!==L2||![end.x,end.y].every(Number.isFinite)||path.getAttribute('d')!==d||!path.isConnected)throw Error('Original native Q2 measurement invalid');
  if(p<1){path.setAttribute('stroke-dasharray',String(L*p)+' '+String(L));path.setAttribute('stroke-dashoffset','0');}
  measure={L,end:{x:end.x,y:end.y},d:p*L,originalGuideUnchanged:true};svg.remove();
 }else{defs.append(mask);svg.append(defs);}
 if(!inverse){for(let i=0;i<10;i++)svg.append(element('path',{d:originalD(i),fill:'#222','data-original-raw':i+1}));}
 if(mode==='q1'&&!inverse){svg.lastChild.remove();const m=element('mask',{id:q1Id,'maskUnits':'userSpaceOnUse',x:0,y:0,width:200,height:200});m.append(element('rect',{x:0,y:0,width:200,height:200,fill:'black'}));if(p>0)m.append(element('path',{d:guide(9),fill:'none',stroke:'white','stroke-width':28,'stroke-linecap':'round','stroke-linejoin':'miter',pathLength:1,'stroke-dasharray':p===1?'none':String(p)+' 1','stroke-dashoffset':0}));defs.append(m);svg.append(element('path',{d:originalD(9),fill:'#222',mask:'url(#'+q1Id+')'}));}
 else svg.append(element('path',{d:originalD(10),fill:'#222',mask:'url(#'+maskId+')','data-original-P2':'one-ink-path'}));
 return {svg,frame:{phase:mode,progress:p,footFullTriangles:foot.full,footLocal:foot.local,Q2measure:measure,sourcePolygons:34,sourceGuideChanged:false,triangleMaskOnly:true,nativeApproval:false}};
}
function paint(){try{candidate.replaceChildren();const result=makeSVG(phase,progress);candidate.replaceChildren(result.svg);lastFrame=result.frame;status.textContent=JSON.stringify({ready:true,...lastFrame,errors},null,2);}catch(e){errors.push(String(e));status.textContent=JSON.stringify({ready:false,errors});}}
function set(mode,p){if(clock)cancelAnimationFrame(clock);clock=null;phase=mode;progress=p;range.value=String(p);paint();}
document.querySelectorAll('[data-phase]').forEach(b=>b.onclick=()=>set(b.dataset.phase,0));
document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>set(phase,Number(b.dataset.p)));
range.oninput=()=>set(phase,Number(range.value));
document.querySelector('#compact').onclick=()=>{try{const board=document.querySelector('#board');board.replaceChildren();for(const p of [0,.125,.25,.375,.5,.625,.75,.875,1]){const div=document.createElement('div'),label=document.createElement('p');label.textContent=phase+' '+p;div.append(label);const saved=[...candidate.childNodes];const result=makeSVG(phase,p);candidate.replaceChildren(...saved);result.svg.setAttribute('width',150);result.svg.setAttribute('height',150);div.append(result.svg);board.append(div);}}catch(e){errors.push(String(e));paint();}};
document.querySelector('#coverage').onclick=()=>{try{candidate.replaceChildren();const result=makeSVG('body',1,true);candidate.replaceChildren(result.svg);status.textContent=JSON.stringify({ready:true,coverage:'P2 minus (complete source foot union original Q2 fullround)',...result.frame,errors},null,2);}catch(e){errors.push(String(e));paint();}};
document.querySelector('#play').onclick=()=>{if(clock)cancelAnimationFrame(clock);const start=performance.now();function tick(now){const p=Math.min(1,(now-start)/8000);phase=p<.5?'foot':'body';progress=p<.5?p*2:(p-.5)*2;range.value=String(progress);paint();clock=p<1?requestAnimationFrame(tick):null;}clock=requestAnimationFrame(tick);};
Promise.all([fetch('/source.json').then(r=>r.json()),fetch('/fixture.json').then(r=>r.json())]).then(([s,f])=>{source=s;fixture=f;document.querySelectorAll('button,input').forEach(e=>e.disabled=false);paint();}).catch(e=>{errors.push(String(e));status.textContent=JSON.stringify({ready:false,errors});});
'''

def page():
    fractions = [0,0.000001,.01,.03,.1,.25,.5,.75,.9999,1]
    buttons = ''.join('<button disabled data-p="'+str(p)+'">p '+str(p)+'</button>' for p in fractions)
    return ('<!doctype html><html lang="ko"><meta charset="utf-8"><title>銍 원P 연결 삼각mask 실험</title>'
      '<style>body{font:14px system-ui;margin:12px;max-width:540px}button{padding:7px;margin:2px}pre{height:180px;overflow:auto;white-space:pre}#candidate{width:520px;height:520px}svg{display:block;background:white}#board{display:grid;grid-template-columns:repeat(3,150px);gap:4px;width:458px}#board p{margin:3px}</style>'
      '<h1>銍 원P 연결 삼각mask</h1><p>34 원polygon·full5·원Q guide 불변. 새 mask-only 정책이며 공식 필순 시계가 아닙니다. 넓은 triangle3의 원P1 교집합에서 시작하고 원삼각형 면적으로 단계를 배분합니다. 원P1 완료 → 연결 foot 9삼각형 → 원Q2 오른쪽 body. 삼각형별 미세 방향·UA seam·전체 coverage는 새 native 검토 전 미승인입니다.</p>'
      '<button disabled data-phase="q1">원Q1 내림 (기존 표시)</button><button disabled data-phase="foot">연결 foot (P1 완료)</button><button disabled data-phase="body">원Q2 body (foot 완료)</button>'+buttons+
      '<input disabled id="progress" type="range" min="0" max="1" step="0.000001" value="0" aria-label="현재 실험 단계 진도">'
      '<button disabled id="compact">현재 단계 compact9</button><button disabled id="coverage">P2-minus-foot+원fullround</button><button disabled id="play">실험 foot→body 8초</button>'
      '<pre id="status">loading</pre><div id="candidate"></div><div id="board"></div><script>'+BROWSER+'</script></html>').encode('utf-8')

def main():
    parser=argparse.ArgumentParser(description='Source-bound mask-only 銍 experiment; ROOT starts server')
    parser.add_argument('--port',type=int,default=0)
    parser.add_argument('--check-only',action='store_true')
    args=parser.parse_args()
    if not 0 <= args.port <= 65535:
        raise ValueError('Invalid port')
    data={}
    for key,(path,expected) in PINS.items():
        raw=(ROOT/path).read_bytes()
        if hashlib.sha256(raw).hexdigest()!=expected:
            raise ValueError('Pinned bytes changed: '+key)
        data[key]=raw
    proof=json.loads(data['source']);fixture=json.loads(data['fixture'])
    if len(proof['groups'])!=15 or sum(len(g['polygons']) for g in proof['groups'])!=34 or len(fixture['triangles'])!=9:
        raise ValueError('Source/fixture counts changed')
    if args.check_only:
        print(json.dumps({'startupPins':3,'mismatch':0,'HTTP':0,'derive':0,'engine':0}));return
    routes={'/':(page(),'text/html; charset=utf-8'),'/source.json':(data['source'],'application/json'),'/fixture.json':(data['fixture'],'application/json')}
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.path not in routes:
                self.send_error(404,'Fixed route only');return
            body,mime=routes[self.path]
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        def log_message(self,*args):
            pass
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':os.getpid(),'port':server.server_address[1],'sourcePolygons':34,'triangles':9,'engine':0}),flush=True)
    server.serve_forever()

if __name__=='__main__':
    main()
