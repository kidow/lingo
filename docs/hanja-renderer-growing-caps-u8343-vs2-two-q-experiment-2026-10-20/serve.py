#!/usr/bin/env python3
"""荃 Q5m1·Q6m2 growing-caps 독립 표시 검토. 원 compiler/engine 호출 없음."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA='223de855ed91e1ef9d37dee930e8733a4aeb73e3ff98cf63f395c9fa1a20b29e'
RENDER_SHA='0f6e20ac70bae6e7e62eeb68ad582be08034d4fd45466324baa160632188f0f1'
FIXTURE_SHA='6003408fa822001612f38dae28347f03e90634b412dda6d6ac4e3a70571c35a0'
CONFIG=None
TARGET=None
FIXTURE=None
STROKES=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="import{renderOriginal,renderGrowingCaps,renderWhole,targetMask,targetCoverageResidual,measureBrowserFrame,browserMetrics}from'/render.mjs';\nconst strokes=__STROKES__,pen=__STROKE__,isWhole=__WHOLE__;\nconst qTargets=[{pen:5,mask:1,s:targetMask(5)},{pen:6,mask:2,s:targetMask(6)}],current=document.getElementById('candidate'),prior=document.getElementById('baseline');\nif(isWhole){current.innerHTML=renderWhole(strokes,'whole-new');prior.innerHTML=renderOriginal(strokes,10,1,'whole-old')}\nelse{\nconst progress=document.getElementById('progress'),value=document.getElementById('value'),metrics=document.getElementById('metrics');\nconst show=p=>{current.innerHTML=renderGrowingCaps(strokes,pen,p,'candidate');prior.innerHTML=renderOriginal(strokes,pen,p,'baseline');progress.value=p*100;value.textContent=(p*100).toFixed(8)+'%';metrics.textContent=JSON.stringify({globalP:p,pen,frame:browserMetrics()});};\nconst item=(group,label,p,key,small=false,samplePen=pen)=>{const section=document.createElement('section');section.className=small?'small':'';const h=document.createElement('h2');h.textContent=label+' '+(100*p).toFixed(8)+'%';section.append(h);const old=document.createElement('div'),fresh=document.createElement('div');old.innerHTML=renderOriginal(strokes,samplePen,p,key+'-old');fresh.innerHTML=renderGrowingCaps(strokes,samplePen,p,key+'-new');section.append(old,fresh);group.append(section)};\nprogress.oninput=()=>show(Number(progress.value)/100);for(const b of document.querySelectorAll('[data-progress]'))b.onclick=()=>show(Number(b.dataset.progress));\ndocument.getElementById('play').onclick=()=>{const start=performance.now();const frame=t=>{const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame)};\ndocument.getElementById('fine').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';[.9999,.99999999,1].forEach((p,i)=>item(group,'완료',p,'fine-'+i));};\ndocument.getElementById('coarse').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>item(group,'원/후보 220px',p,'coarse-'+i,true));};\ndocument.getElementById('boundary').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';const masks=strokes[pen-1],total=masks.reduce((a,m)=>a+m.weight,0);let sum=0;masks.slice(0,-1).forEach((m,i)=>{sum+=m.weight;const at=sum/total;const next=masks[i+1].weight;const points=[['직전',Math.max(0,at-1e-6)],['경계',at],['직후',Math.min(1,at+1e-6)],['다음 mask0',at],['다음 maskepsilon',Math.min(1,(sum+next*.000001)/total)],['다음 mask95',(sum+next*.95)/total]];points.forEach(([label,p],j)=>item(group,'mask'+(i+2)+' '+label,p,'boundary-'+i+'-'+j));});};\ndocument.getElementById('rho').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';for(const t of qTargets){const g=measureBrowserFrame(t.s,0),masks=strokes[t.pen-1],before=masks.slice(0,t.mask-1).reduce((a,m)=>a+m.weight,0),total=masks.reduce((a,m)=>a+m.weight,0),local=7/g.L;for(const[i,p]of[Math.max(0,local-1e-6),local,Math.min(1,local+1e-6)].entries())item(group,'Q'+t.pen+' rho=r '+i,(before+t.s.weight*p)/total,'rho-'+t.pen+'-'+i,false,t.pen);}};\ndocument.getElementById('coverage').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';for(const t of qTargets){const section=document.createElement('section');section.innerHTML='<h2>Q'+t.pen+' 원 P − full-round: 빨강 잔여 없어야 함</h2>'+targetCoverageResidual(t.s,'coverage-q'+t.pen);group.append(section);}};\nshow(0);\n}"
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
    data=source('荃')
    if len(data['strokes'])!=10:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>荃 Q5m1·Q6m2 growing caps</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}.samples{display:grid;grid-template-columns:repeat(2,540px);gap:16px}.small{width:500px;display:grid;grid-template-columns:repeat(2,220px);gap:8px}.small h2{grid-column:span 2}.small svg{width:220px;height:220px}button,a,input{font:inherit;margin:5px}h2{font-size:16px}pre{white-space:pre-wrap}</style><h1>荃 · 원 Q5m1·Q6m2 한정 growing caps 후보</h1><p>원 VS2 10획/11mask/20polygon 및 H→Q gap 보존. 두 Q만 butt/miter+growing discs; 다른 mask는 shared43 그대로. native/app/runtime 미승인.</p><a href="/whole">전체</a>'+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,11))+body+'</html>'
def script(pen,whole=False):
    return '<script type="module">'+BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__STROKE__',str(pen)).replace('__WHOLE__','true'if whole else'false')+'</script>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole 원10 path</h2>'+domestic_whole()+'</section><section><h2>원 shared43 whole</h2><div id="baseline"></div></section><section><h2>두 Q 완료도 full-round 유지</h2><div id="candidate"></div></section></div>'+script(10,True))
def progressive_page(pen):
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('25%',.25),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+'<button id="fine">완료 3단계</button><button id="boundary">원 multi mask 전후·0 epsilon95</button><button id="rho">두 Q rho=r 전후</button><button id="coverage">두 Q coverage</button><button id="coarse">9단계 220px</button>'
    return shell('<h2>국내/원 shared43/후보 '+str(pen)+'획 · 각520px</h2>'+controls+'<div class="pair"><section><h2>국내 원 방향</h2>'+dictionary_svg('荃',pen,True,'domestic-'+str(pen))+'</section><section><h2>원 shared43</h2><div id="baseline"></div></section><section><h2>Q5·Q6만 새 표시</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(pen))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();u=urlparse(self.path);q={}if not u.query else parse_qs(u.query,strict_parsing=True)
            if 'root'in q and q['root']!=['u8343-ue0102']:raise ValueError('unsupported root')
            mime='text/html; charset=utf-8'
            if u.path=='/render.mjs'and not q:body=(HERE/'render.mjs').read_text();mime='text/javascript; charset=utf-8'
            elif u.path in ['/','/whole']and set(q).issubset({'root'}):body=whole_page()
            elif u.path=='/progressive'and set(q).issubset({'root','stroke'})and len(q.get('stroke',['6']))==1:
                pen=int(q.get('stroke',['6'])[0])
                if not 1<=pen<=10:raise ValueError('unsupported pen')
                body=progressive_page(pen)
            else:raise ValueError('unsupported route')
            data=body.encode();self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Exact source or renderer contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u8343-ue0102'];guards()
    FIXTURE=json.loads((HERE/CONFIG['sourceFixture']).read_bytes());STROKES=FIXTURE['originalOrderBaseline']
    if len(STROKES)!=10 or sum(len(p)for p in STROKES)!=11:raise ValueError('count changed')
    ENTRIES={'荃':{'strokes':10,'dictionary':TARGET['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'荃','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True);server.serve_forever()
