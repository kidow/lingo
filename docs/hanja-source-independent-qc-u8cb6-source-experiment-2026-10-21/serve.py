#!/usr/bin/env python3
"""貶 고정 원 캐시만 표시한다. compiler/engine을 실행하지 않는다."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, re, threading, urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA='5dec06728e89aac7135967b401b80b13b51c4006bfa99245afdc6cdee0756e9a'
FIXTURE_SHA='922341062cbb737175c8862b3e3675903d8687b0d9f1641931efda4a301f24f3'
CONFIG=None
TARGET=None
FIXTURE=None
STROKES=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="const strokes=__STROKES__;const baseline=__BASELINE__;const order=[1,2,3,4,5,6,7,8,9,10,11,12];const pen=__STROKE__;const render=function renderProgressive(strokes, stroke, progress, prefix = 'reveal') {\n  const all = strokes.map(s => s.map(p => `<path d=\"${p.outline}\"/>`).join(''))\n  const current = strokes[stroke-1]\n  const weight = current.reduce((n,s) => n+s.weight,0)\n  let elapsed = Math.max(0,Math.min(1,progress))*weight\n  const pieces = current.map((s,i) => {\n    const p = Math.max(0,Math.min(1,elapsed/s.weight)); elapsed -= s.weight\n    if (p === 0) return ''\n    if (p === 1) return `<path d=\"${s.outline}\"/>`\n    const id = `${prefix}-${stroke}-${i}`\n    const [x,y,right,bottom] = s.bounds, width=right-x,height=bottom-y\n    if (s.direction === 'curve') return `<defs><mask id=\"${id}\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\"><path d=\"${s.revealPath}\" fill=\"none\" stroke=\"white\" stroke-width=\"${s.revealWidth}\" stroke-linecap=\"round\" pathLength=\"1\" stroke-dasharray=\"${p} 2\" stroke-dashoffset=\"0\"/></mask></defs><path d=\"${s.outline}\" mask=\"url(#${id})\"/>`\n    const horizontal = s.direction === 'right' || s.direction === 'left'\n    const rx = s.direction === 'left' ? right-width*p : x\n    const ry = s.direction === 'up' ? bottom-height*p : y\n    return `<defs><clipPath id=\"${id}\"><rect x=\"${rx}\" y=\"${ry}\" width=\"${horizontal?width*p:width}\" height=\"${horizontal?height:height*p}\"/></clipPath></defs><path d=\"${s.outline}\" clip-path=\"url(#${id})\"/>`\n  }).join('')\n  return `<svg viewBox=\"0 0 100 100\"><g fill=\"#222\">${all.slice(0,stroke-1).join('')}${pieces}</g></svg>`\n};const candidate=document.getElementById('candidate');const prior=document.getElementById('baseline');const progress=document.getElementById('progress');const value=document.getElementById('value');\nconst show=p=>{candidate.innerHTML=render(strokes,pen,p,'candidate');prior.innerHTML=render(baseline,order[pen-1],p,'baseline');progress.value=p*100;value.textContent=(p*100).toFixed(8)+'%';};\nprogress.oninput=()=>show(Number(progress.value)/100);\nfor(const button of document.querySelectorAll('[data-progress]'))button.onclick=()=>show(Number(button.dataset.progress));\ndocument.getElementById('play').onclick=()=>{const start=performance.now();const frame=t=>{const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame)};\ndocument.getElementById('boundary').onclick=()=>{const all=strokes[pen-1],total=all.reduce((n,m)=>n+m.weight,0);let sum=0;const group=document.getElementById('boundary-samples');group.innerHTML='';all.slice(0,-1).forEach((m,i)=>{sum+=m.weight;const t=sum/total;for(const [label,p]of [['직전',Math.max(0,t-1e-6)],['경계',t],['직후',Math.min(1,t+1e-6)]]){const item=document.createElement('section');const title=document.createElement('h2');title.textContent='mask '+(i+2)+' '+label+' '+(p*100).toFixed(8)+'%';item.append(title);const drawing=document.createElement('div');drawing.innerHTML=render(strokes,pen,p,'boundary-'+i+'-'+label);item.append(drawing);group.append(item);}});};\ndocument.getElementById('coarse').onclick=()=>{const group=document.getElementById('coarse-samples');group.innerHTML='';[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{const item=document.createElement('section');const title=document.createElement('h2');title.textContent=(p*100)+'%';item.append(title);const drawing=document.createElement('div');drawing.innerHTML=render(strokes,pen,p,'coarse-'+i);item.append(drawing);group.append(item);});};show(0);\n"

def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'config.json').read_bytes())!=CONFIG_SHA:raise ValueError('config changed')
    if sha((HERE/'fixtures.json').read_bytes())!=FIXTURE_SHA:raise ValueError('cache changed')
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
    data=source('貶')
    if len(data['strokes'])!=12:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def public_whole(strokes):
    return '<svg viewBox="0 0 100 100"><g fill="#222">'+''.join('<path d="'+html.escape(mask['outline'])+'"/>'for pen in strokes for mask in pen)+'</g></svg>'
def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>貶 strict 캐시 후보</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair,.samples{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}button,a,input{font:inherit;margin:5px}h2{font-size:16px}</style><h1>貶 · 10·11 분리 및12 Q/C 독립mask 캐시 후보</h1><p>base u8cb6만 지원합니다. 원25 polygon을 그대로 보존합니다. 기존10획 H/Q를 국내10·11로 분리하고 기존11Q·12C를 새12획의 독립mask로 배치합니다. 첫9획만 기존 모든필드 동일이며 10~12의 분절은 새 native 미승인입니다.</p><a href="/whole">전체 원형</a> '+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,13))+body+'</html>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole · 원12 path</h2>'+domestic_whole()+'</section><section><h2>원 baseline whole</h2>'+public_whole(FIXTURE['originalOrderBaseline'])+'</section><section><h2>Q/C 분절 후보 whole</h2>'+public_whole(STROKES)+'</section></div>')
def progressive_page(pen):
    script=BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__BASELINE__',json.dumps(FIXTURE['originalOrderBaseline'],separators=(',',':'))).replace('__STROKE__',str(pen))
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('25%',.25),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+'<button id="boundary">원 mask 경계 전후</button><button id="coarse">9단계</button>'
    return shell('<h2>국내 '+str(pen)+'획 / 후보 '+str(pen)+'획 / 원 baseline 독립번호 '+str(TARGET['baselinePenMap'][pen-1])+'획</h2>'+controls+'<div class="pair"><section><h2>국내 고정 원 방향</h2>'+dictionary_svg('貶',pen,True,'domestic-'+str(pen))+'</section><section><h2>이전 baseline 원번호(국내대응 아님)</h2><div id="baseline"></div></section><section><h2>Q/C 분절 후보</h2><div id="candidate"></div></section></div><div id="boundary-samples" class="samples"></div><div id="coarse-samples" class="samples"></div><script>'+script+'</script>')
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();u=urlparse(self.path);q={}if not u.query else parse_qs(u.query,strict_parsing=True)
            if 'root'in q and q['root']!=['u8cb6']:raise ValueError('unsupported exact root')
            if u.path in ['/', '/whole'] and set(q).issubset({'root'}):body=whole_page()
            elif u.path=='/progressive' and set(q).issubset({'root','stroke'}) and len(q.get('stroke',['12']))==1:
                pen=int(q.get('stroke',['12'])[0])
                if not 1<=pen<=12:raise ValueError('unsupported pen')
                body=progressive_page(pen)
            else:raise ValueError('unsupported route')
            data=body.encode();self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Pinned source or exact request contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u8cb6'];guards();FIXTURE=json.loads((HERE/'fixtures.json').read_bytes())
    if FIXTURE['root']!='u8cb6'or FIXTURE['rawProjectionRuns']!=1:raise ValueError('exact cache changed')
    STROKES=FIXTURE['strokes']
    if len(STROKES)!=12 or sum(len(p)for p in STROKES)!=13:raise ValueError('baseline count changed')
    ENTRIES={'貶':{'strokes':12,'dictionary':TARGET['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'貶','root':'u8cb6','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True);server.serve_forever()
