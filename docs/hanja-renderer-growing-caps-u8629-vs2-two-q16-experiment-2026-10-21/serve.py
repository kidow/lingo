#!/usr/bin/env python3
"""蘩 16획 두Q의 표시만 분리 검토. source/compiler/engine0."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA="a8c8c40c87a5c6c3e3d990e6e92529ab6fcc62d65371c7be9abf0a2895ca17b6"
RENDER_SHA="ea6a29a043a1e11d46007c1a93ad9d3ad611f37119e761e4a10d1119c50502f1"
FIXTURE_SHA="0c39e220b3137bbd0b4a7f0e24d99b3fd2ae634bd4552e58104ab9004c9223e9"
CONFIG=None
TARGET=None
STROKES=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="import{renderOriginal,renderGrowingCaps,renderWhole,renderTargetLocal,targetMask,targetCoverageResidual,measureTarget,commitHost}from'/render.mjs';\nconst strokes=__STROKES__,pen=__STROKE__,isWhole=__WHOLE__,targets=[{pen:16,mask:1},{pen:16,mask:2}],current=document.getElementById('candidate'),prior=document.getElementById('baseline'),samples=document.getElementById('samples');let sequence=0,requested=0;const errors=[];\nconst status=extra=>{document.getElementById('metrics').textContent=JSON.stringify({pen,requestedGlobal:requested,...extra,errors,nativeApproval:false,appUI:false},null,2)};\nwindow.addEventListener('error',e=>{errors.push(String(e.message));status({mode:'error'})});\nconst attrNumber=(n,k)=>{const v=n?.getAttribute(k);return v===null||v===undefined?NaN:Number(v)};\nfunction observe(host){const rows=commitHost(host);return rows.map(row=>{const g=host.querySelector('[data-can-target=\"'+row.id+'\"]'),ink=g?.querySelector(':scope > path[data-can-ink=\"true\"]'),caps=g?.querySelectorAll('mask circle'),measurement=g?.querySelector('[data-can-measurement=\"true\"]'),guide=g?.querySelector('path[id$=\"-can-guide\"]'),f=row.frame;return{...row,distancePresent:!!ink?.hasAttribute('data-growing-distance'),sameFrameChecks:f?{progress:attrNumber(ink,'data-growing-progress')===f.progress,length:attrNumber(ink,'data-growing-length')===f.L,distance:attrNumber(ink,'data-growing-distance')===f.d,radius:attrNumber(ink,'data-growing-radius')===f.rho,endX:attrNumber(ink,'data-growing-end-x')===f.point.x,endY:attrNumber(ink,'data-growing-end-y')===f.point.y,startX:attrNumber(caps[0],'cx')===f.q0[0],startY:attrNumber(caps[0],'cy')===f.q0[1],endCapX:attrNumber(caps[1],'cx')===f.point.x,endCapY:attrNumber(caps[1],'cy')===f.point.y,capsRadius:attrNumber(caps[0],'r')===f.rho&&attrNumber(caps[1],'r')===f.rho,dash:guide?.getAttribute('stroke-dasharray')===String(f.progress)+' 2',sameGuide:measurement?.getAttribute('d')===guide?.getAttribute('d')}:null}})}\nfunction show(p){requested=p;prior.innerHTML=renderOriginal(strokes,pen,p,'old');current.innerHTML=renderGrowingCaps(strokes,pen,p,'new');const records=observe(current),slider=document.getElementById('progress'),out=document.getElementById('value');if(slider)slider.value=p*100;if(out)out.textContent=(p*100).toFixed(8)+'%';status({mode:'current',records})}\nfunction localToGlobal(mask,p){const a=strokes[15],before=a.slice(0,mask-1).reduce((n,s)=>n+s.weight,0),total=a.reduce((n,s)=>n+s.weight,0);return(before+p*a[mask-1].weight)/total}\nfunction frames(items){samples.replaceChildren();const records=items.map((v,i)=>{const cell=document.createElement('section'),id='sample'+(++sequence)+'-'+i;cell.className=v.label.includes('coarse')?'small':'';const old=v.mask?renderOriginal([[targetMask(16,v.mask)]],1,v.p,id+'b'):renderOriginal(strokes,v.pen,v.p,id+'b'),fresh=v.mask?renderTargetLocal(strokes,v.mask,v.p,id+'n'):renderGrowingCaps(strokes,v.pen,v.p,id+'n');cell.innerHTML='<h2>'+v.label+'</h2>'+old+'<div class=\"sample-new\">'+fresh+'</div>';samples.append(cell);return{...v,mode:v.mask?'isolated-local-not-global':'global',records:observe(cell.querySelector('.sample-new'))}});status({mode:'samples',records})}\nfunction targetLength(t){const node=current.querySelector('[data-can-target=\"u8629-vs2-16-'+t.mask+'\"] [data-can-measurement=\"true\"]');return measureTarget(targetMask(16,t.mask),0,node).L}\nfunction coverage(mask){const t=targetMask(16,mask);samples.innerHTML='<section><h2>risk-first16m'+mask+' P-minus-full-round: black is unresolved</h2>'+targetCoverageResidual(t,'coverage16m'+mask)+'</section>';status({mode:'coverage',mask,coverageApproved:false})}\nif(isWhole){prior.innerHTML=renderOriginal(strokes,21,1,'oldwhole');current.innerHTML=renderWhole(strokes,'newwhole');requested=1;status({mode:'whole',records:observe(current)})}else{show(0);document.getElementById('progress').oninput=e=>show(+e.target.value/100);for(const b of document.querySelectorAll('[data-progress]'))b.onclick=()=>show(Number(b.dataset.progress));document.getElementById('risk16m2').onclick=()=>frames([{mask:2,p:1e-6,label:'FIRST risk16m2 epsilon'}]);document.getElementById('fine').onclick=()=>frames([.9999,.99999999,1].map(p=>({pen,p,label:'global fine '+p})));document.getElementById('boundary').onclick=()=>{const b=localToGlobal(2,0);frames([...[-1e-10,0,1e-10].map(d=>({pen:16,p:b+d,label:'QQ16 boundary '+d})),...[0,1e-6,.95].map(p=>({pen:16,p,label:'global '+p}))])};document.getElementById('rho').onclick=()=>{const items=[];for(const t of targets){const L=targetLength(t);for(const d of[-1e-10,0,1e-10])items.push({mask:t.mask,p:7/L+d,label:'16m'+t.mask+' rho-r '+d})}frames(items)};document.getElementById('coverageQ1').onclick=()=>coverage(1);document.getElementById('coverageQ2').onclick=()=>coverage(2);document.getElementById('coarse').onclick=()=>frames([0,.125,.25,.375,.5,.625,.75,.875,1].map(p=>({pen,p,label:'global coarse '+p})));document.getElementById('play').onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};for(const t of targets)for(const p of[0,1e-6,.95,.9999,.99999999,1]){const b=document.createElement('button');b.textContent='16m'+t.mask+' local '+p;b.onclick=()=>frames([{mask:t.mask,p,label:b.textContent}]);document.getElementById('target-controls').append(b)}}\nwindow.canHarness={show,localToGlobal,frames,targets};\n"
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'config.json').read_bytes())!=CONFIG_SHA:raise ValueError('config changed')
    if sha((HERE/'render.mjs').read_bytes())!=RENDER_SHA:raise ValueError('renderer changed')
    if sha((HERE/CONFIG['sourceFixture']).read_bytes())!=FIXTURE_SHA:raise ValueError('cache changed')
    for file,expected in TARGET['inputSHA256'].items():
        if sha((REPO/file).read_bytes())!=expected:raise ValueError('original input changed')
def source(glyph):
    with LOCK:
        if glyph in CACHE:
            return CACHE[glyph]
        pin = ENTRIES[glyph]['dictionary']
        with urllib.request.urlopen(pin['url'], timeout=20) as response:
            if response.status != 200:
                raise ValueError('Dictionary unavailable')
            raw = response.read(100001)
        if len(raw) != pin['bytes'] or hashlib.sha256(raw).hexdigest() != pin['sha256']:
            raise ValueError('Dictionary pin changed')
        root = ET.fromstring(raw)
        if root.find(NS + 'title').text != glyph:
            raise ValueError('Dictionary title changed')
        groups = list(root.iter(NS + 'g'))
        # Preserve the selected original horizontal offset exactly.
        if len(groups) != 1 or not re.fullmatch(r'scale\(1,-1\) translate\(-?\d+, -\d+\)', groups[0].get('transform', '')):
            raise ValueError('Unrecognized coordinate transform')
        outlines = {p.get('id'): p for p in root.iter(NS + 'path') if p.get('id')}
        clips = {c.get('id'): next(iter(c)).get('{http://www.w3.org/1999/xlink}href').removeprefix('#') for c in root.iter(NS + 'clipPath')}
        animated = [p for p in root.iter(NS + 'path') if p.get('clip-path')]
        strokes = []
        for index, p in enumerate(animated):
            clip = re.fullmatch(r'url\(#([^)]*)\)', p.get('clip-path')).group(1)
            target = clips[clip]
            delay = int(re.search(r'--d:\s*(\d+)ms', p.get('style')).group(1))
            duration = int(re.search(r'--t:\s*(\d+)ms', p.get('style')).group(1))
            strokes.append({'outline': outlines[target], 'animated': p, 'xmlIndex': index + 1, 'delay': delay, 'duration': duration})
        strokes.sort(key=lambda s: s['delay'])
        if len(strokes) != ENTRIES[glyph]['strokes'] or len({s['outline'].get('id') for s in strokes}) != len(strokes):
            raise ValueError('Incomplete clip mapping')
        if any(i and s['delay'] < strokes[i-1]['delay'] + strokes[i-1]['duration'] for i, s in enumerate(strokes)):
            raise ValueError('Overlapping playback')
        CACHE[glyph] = {'strokes': strokes, 'transform': groups[0].get('transform')}
        return CACHE[glyph]

def dictionary_svg(glyph, end, colored=True, key=''):
    data = source(glyph)
    strokes = data['strokes']
    pieces = [f'<path d="{html.escape(s["outline"].get("d"))}" fill="#bbb"/>' for s in strokes[:end-1]]
    current = strokes[end-1]
    outline, animated = current['outline'], current['animated']
    pieces.append(f'<path d="{html.escape(outline.get("d"))}" fill="{COLORS[-1] if colored else "#222"}"/>')
    if colored:
        style = animated.get('style')
        dash = float(re.search(r'stroke-dasharray:\s*([\d.]+)', style).group(1))
        offset = float(re.search(r'stroke-dashoffset:\s*([\d.]+)', style).group(1))
        ident = 'clip-' + key
        pieces.append(f'<defs><clipPath id="{ident}"><path d="{html.escape(outline.get("d"))}"/></clipPath></defs>')
        for p, color in [(0.75, COLORS[2]), (0.5, COLORS[1]), (0.25, COLORS[0])]:
            pieces.append(f'<path d="{html.escape(animated.get("d"))}" clip-path="url(#{ident})" pathLength="{animated.get("pathLength")}" fill="none" stroke="{color}" stroke-width="128" stroke-linecap="round" stroke-dasharray="{dash}" stroke-dashoffset="{offset*(1-p)}"/>')
    return '<svg viewBox="0 0 1024 1024"><g transform="' + data['transform'] + '">' + ''.join(pieces) + '</g></svg>'

def domestic_whole():
    data=source('蘩')
    if len(data['strokes'])!=21:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'

def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>蘩 VS2 Q16 growing caps</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}.samples{display:grid;grid-template-columns:repeat(2,540px);gap:16px}.small{width:500px;display:grid;grid-template-columns:repeat(2,220px);gap:8px}.small h2{grid-column:span 2}.small svg{width:220px;height:220px}button,a,input{font:inherit;margin:5px}h2{font-size:16px}pre{white-space:pre-wrap}</style><h1>蘩 VS2 · 原21p24m54 · 16m1/16m2 두 Q 표시 후보</h1><p>원whole/full5/id3·모든field/gap[-26,-9.072...] 보존. 16m1 초기arc7 T1/2 K1/90,16m2 T1/3 K1/50의 고유exact 증명만 적용하며 실제 P연결/coverage/UA 통과 주장은 아닙니다. FIRST risk16m2 epsilon →16m2 coverage →16m1 epsilon/coverage, 실패면 중단. 다른20획·8LEFTtail·17QQ는 미변경·미승인입니다. firstL은 단일Q라 해당없고 rho 및원16 경계controls를 사용합니다. 원HOLD는 보존하며 source/compiler/engine/derive0·native/app/runtimefalse.</p><a href="/whole">전체 masked</a>'+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,22))+body+'</html>'
def script(pen,whole=False):
    return '<script type="module">'+BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__STROKE__',str(pen)).replace('__WHOLE__','true'if whole else'false')+'</script>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole21 path</h2>'+domestic_whole()+'</section><section><h2>원 shared43 whole</h2><div id="baseline"></div></section><section><h2>16 Q/Q 완료도 full-round masked</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(21,True))
def progressive_page(pen):
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+'<button id="coverageQ1">위험우선 Q16m1 coverage</button><button id="coverageQ2">위험우선 Q16m2 coverage</button><button id="risk16m2">FIRST risk16m2 epsilon</button><button id="fine">완료3단계</button><button id="boundary">QQ16 경계0.4387289328474441 전후·0 epsilon95</button><button id="rho">두target rho=r 전후</button><button id="coarse">현재획9단계220px</button>'
    return shell('<h2>국내/원 shared43/후보 '+str(pen)+'획 · 각520px</h2>'+controls+'<div id="target-controls"></div><div class="pair"><section><h2>국내 원 방향</h2>'+dictionary_svg('蘩',pen,True,'domestic-'+str(pen))+'</section><section><h2>동일source shared43</h2><div id="baseline"></div></section><section><h2>16 Q/Q 두mask만 growingcaps</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(pen))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();u=urlparse(self.path);q={}if not u.query else parse_qs(u.query,strict_parsing=True);mime='text/html; charset=utf-8'
            if 'root'in q and q['root']!=['u8629-ue0102']:raise ValueError('unsupported root')
            if u.path=='/render.mjs'and not q:body=(HERE/'render.mjs').read_text();mime='text/javascript; charset=utf-8'
            elif u.path in ['/','/whole']and set(q).issubset({'root'}):body=whole_page()
            elif u.path=='/progressive'and set(q).issubset({'root','stroke'})and len(q.get('stroke',['16']))==1:
                pen=int(q.get('stroke',['16'])[0])
                if not 1<=pen<=21:raise ValueError('unsupported pen')
                body=progressive_page(pen)
            else:raise ValueError('unsupported route')
            data=body.encode();self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Exact source or renderer contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u8629-ue0102'];guards()
    FIXTURE=json.loads((HERE/CONFIG['sourceFixture']).read_bytes());STROKES=FIXTURE['u8629-ue0102']['strokes']
    if len(STROKES)!=21 or sum(len(p)for p in STROKES)!=24:raise ValueError('count changed')
    ENTRIES={'蘩':{'strokes':21,'dictionary':TARGET['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'蘩','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
