#!/usr/bin/env python3
"""疷 원6곡선 growing-caps 독립 표시 검토. 원 compiler/engine 호출 없음."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA="9117360a8b9d724e1d6b32aa849b82a753f8e1fb6f39ed9e146734644f0871b5"
RENDER_SHA="1f704b9be37765f98d1d132ee1726b0b9635651bd22b6b8950132c0a692da6f3"
FIXTURE_SHA='1a7fcfa6ff19f91eeb6957ee8b7476a605f9e35495a909fcda349261c373f741'
CONFIG=None
TARGET=None
FIXTURE=None
STROKES=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="import{renderOriginal,renderSixGrowingCaps,renderSixWhole,sixTargetMask,sixCoverageResidual,measureSixBrowserFrame,sixBrowserMetrics}from'/render.mjs';\nconst strokes=__STROKES__,pen=__STROKE__,isWhole=__WHOLE__,targetPens=[3,4,5,6,7,9],current=document.getElementById('candidate'),prior=document.getElementById('baseline'),target=targetPens.includes(pen)?sixTargetMask(pen):null,mask=pen===7?2:1;\nif(isWhole){current.innerHTML=renderSixWhole(strokes,'whole-six');prior.innerHTML=renderOriginal(strokes,10,1,'whole-old')}\nelse{\nconst progress=document.getElementById('progress'),value=document.getElementById('value'),metrics=document.getElementById('metrics');\nconst localToPen=local=>{const masks=strokes[pen-1],before=masks.slice(0,mask-1).reduce((a,m)=>a+m.weight,0),total=masks.reduce((a,m)=>a+m.weight,0);return(before+local*masks[mask-1].weight)/total};\nconst show=p=>{current.innerHTML=renderSixGrowingCaps(strokes,pen,p,'candidate');prior.innerHTML=renderOriginal(strokes,pen,p,'baseline');progress.value=p*100;value.textContent=(p*100).toFixed(8)+'%';metrics.textContent=JSON.stringify({globalP:p,pen,targetMask:target?mask:null,frames:sixBrowserMetrics(),exactGlobalOne:p===1});};\nconst item=(group,label,p,key,small=false)=>{const section=document.createElement('section');section.className=small?'small':'';const h=document.createElement('h2');h.textContent=label+' '+(100*p).toFixed(8)+'%';section.append(h);const old=document.createElement('div'),fresh=document.createElement('div');old.innerHTML=renderOriginal(strokes,pen,p,key+'-old');fresh.innerHTML=renderSixGrowingCaps(strokes,pen,p,key+'-new');section.append(old,fresh);group.append(section)};\nprogress.oninput=()=>show(Number(progress.value)/100);for(const b of document.querySelectorAll('[data-progress]'))b.onclick=()=>show(Number(b.dataset.progress));\nfor(const b of document.querySelectorAll('[data-local]'))b.onclick=()=>{if(!target){metrics.textContent='현재획은새target아님';return}show(localToPen(Number(b.dataset.local)))};\ndocument.getElementById('play').onclick=()=>{const start=performance.now();const frame=t=>{const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame)};\ndocument.getElementById('fine').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';[.9999,.99999999,1].forEach((p,i)=>item(group,'완료',p,'fine-'+i))};\ndocument.getElementById('coarse').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>item(group,'원/후보 220px',p,'coarse-'+i,true))};\ndocument.getElementById('boundary').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';const masks=strokes[pen-1],total=masks.reduce((a,m)=>a+m.weight,0);let sum=0;masks.slice(0,-1).forEach((m,i)=>{sum+=m.weight;const at=sum/total,next=masks[i+1].weight,points=[['직전',Math.max(0,at-1e-6)],['경계',at],['직후',Math.min(1,at+1e-6)],['다음 mask0',at],['다음 maskepsilon',(sum+next*.000001)/total],['다음 mask95',(sum+next*.95)/total]];points.forEach(([label,p],j)=>item(group,'mask'+(i+2)+' '+label,p,'boundary-'+i+'-'+j))})};\ndocument.getElementById('rho').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';if(!target){group.textContent='현재획은새target아님';return}const g=measureSixBrowserFrame(target,0),t=7/g.L;for(const[i,p]of[Math.max(0,t-1e-10),t,Math.min(1,t+1e-10)].entries())item(group,'target rho=r '+i,localToPen(p),'rho-'+i)};\ndocument.getElementById('firstL').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';if(pen!==3){group.textContent='원MLQ3만해당';return}const g=measureSixBrowserFrame(target,0),t=29.5/g.L;for(const[i,p]of[t-1e-10,t,t+1e-10].entries())item(group,'원 firstL끝 '+i,p,'firstL-'+i)};\ndocument.getElementById('coverage').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='<h2>원 P − 원full-round sweep: 빨강잔여 별도검토</h2>';for(const p of targetPens){const section=document.createElement('section');section.innerHTML='<h2>'+p+'획 원mask</h2>'+sixCoverageResidual(sixTargetMask(p),'coverage-'+p);group.append(section)}};\nshow(0);\n}\n"
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'config.json').read_bytes())!=CONFIG_SHA:raise ValueError('config changed')
    if sha((HERE/'render.mjs').read_bytes())!=RENDER_SHA:raise ValueError('renderer changed')
    if sha((HERE/CONFIG['sourceFixture']).read_bytes())!=FIXTURE_SHA:raise ValueError('cache changed')
    for file,expected in TARGET['inputSHA256'].items():
        if sha((REPO/file).read_bytes())!=expected:raise ValueError('pinned input changed')
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
        # Preserve the source's horizontal offset; 潭 uses translate(12, -830).
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
    data=source('疷')
    if len(data['strokes'])!=10:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>疷 원6곡선 growing caps</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}.samples{display:grid;grid-template-columns:repeat(2,540px);gap:16px}.small{width:500px;display:grid;grid-template-columns:repeat(2,220px);gap:8px}.small h2{grid-column:span 2}.small svg{width:220px;height:220px}button,a,input{font:inherit;margin:5px}h2{font-size:16px}pre{white-space:pre-wrap}</style><h1>疷 · 고정 MLQ/Q/C 여섯mask growing caps 후보</h1><p>원 10획/13mask/26polygon 및 V→Q gap 보존. 3MLQ·4/5/6Q·7m2원Q·9C만 source-exact butt/miter+growing discs; 다른mask/9tail은 shared43 그대로. native/app/runtime 미승인.</p><a href="/whole">전체</a>'+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,11))+body+'</html>'
def script(pen,whole=False):
    return '<script type="module">'+BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__STROKE__',str(pen)).replace('__WHOLE__','true'if whole else'false')+'</script>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole 원10 path</h2>'+domestic_whole()+'</section><section><h2>원 shared43 whole</h2><div id="baseline"></div></section><section><h2>여섯완료target full-round 유지</h2><div id="candidate"></div></section></div>'+script(10,True))
def progressive_page(pen):
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('25%',.25),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+''.join('<button data-local="'+str(p)+'">target local '+label+'</button>'for label,p in [('0',0),('epsilon',.000001),('95',.95)])+'<button id="firstL">원MLQ3 firstL끝 전후</button><button id="fine">완료 3단계</button><button id="boundary">원 multi mask 전후·0 epsilon95</button><button id="rho">선택target rho=r 전후</button><button id="coverage">여섯target coverage</button><button id="coarse">9단계 220px</button>'
    return shell('<h2>국내/원 shared43/후보 '+str(pen)+'획 · 각520px</h2>'+controls+'<div class="pair"><section><h2>국내 원 방향</h2>'+dictionary_svg('疷',pen,True,'domestic-'+str(pen))+'</section><section><h2>원 shared43</h2><div id="baseline"></div></section><section><h2>고정 여섯curve만 새 표시</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(pen))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();u=urlparse(self.path);q={}if not u.query else parse_qs(u.query,strict_parsing=True)
            if 'root'in q and q['root']!=['u75b7']:raise ValueError('unsupported root')
            mime='text/html; charset=utf-8'
            if u.path=='/render.mjs'and not q:body=(HERE/'render.mjs').read_text();mime='text/javascript; charset=utf-8'
            elif u.path in ['/','/whole']and set(q).issubset({'root'}):body=whole_page()
            elif u.path=='/progressive'and set(q).issubset({'root','stroke'})and len(q.get('stroke',['7']))==1:
                pen=int(q.get('stroke',['7'])[0])
                if not 1<=pen<=10:raise ValueError('unsupported pen')
                body=progressive_page(pen)
            else:raise ValueError('unsupported route')
            data=body.encode();self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Exact source or renderer contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u75b7'];guards()
    FIXTURE=json.loads((HERE/CONFIG['sourceFixture']).read_bytes());STROKES=FIXTURE['originalOrderBaseline']
    if len(STROKES)!=10 or sum(len(p)for p in STROKES)!=13:raise ValueError('count changed')
    ENTRIES={'疷':{'strokes':10,'dictionary':TARGET['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'疷','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True);server.serve_forever()
