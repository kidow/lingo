#!/usr/bin/env python3
"""邁 Q17m1+B17m2 growing-cap 표시한다. compiler/engine을 실행하지 않는다."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, re, threading, urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA="352f5d15855553597f7b031866cac235e484e4dbda031285f0202529b276de4c"
RENDER_SHA="b5201ad1b0f09a50b870cd94fb69a6aadf879b6274305263d8ccb84219eb914b"
FIXTURE_SHA="c14e231a5c5341afe9ebd86ebdc07bcf61d9cd255afe39411f13cb97fe1e9f52"
CONFIG=None
TARGET=None
FIXTURE=None
STROKES=None
ENTRIES={}
CACHE={}
FETCH_COUNT=0
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="import{renderOriginal,renderGrowingCaps,renderWhole,targetMask,targetCoverageResidual,measureBrowserFrame,browserMetrics,cubicTargetMask,cubicCoverageResidual,measureCubicBrowserFrame,cubicBrowserMetrics}from'/render.mjs';\nimport{renderGrowingCaps as renderQOnly,renderWhole as renderQOnlyWhole}from'/q-baseline.mjs';\nconst strokes=__STROKES__,pen=__STROKE__,isWhole=__WHOLE__;\nconst sQ=targetMask(),sC=cubicTargetMask(),current=document.getElementById('candidate'),prior=document.getElementById('baseline');\nif(isWhole){current.innerHTML=renderWhole(strokes,'whole-new');prior.innerHTML=renderQOnlyWhole(strokes,'whole-old')}\nelse{\nconst progress=document.getElementById('progress'),value=document.getElementById('value'),metrics=document.getElementById('metrics');\nconst state=p=>{const total=sQ.weight+sC.weight;const q=p===1?1:Math.max(0,Math.min(1,p*total/sQ.weight)),c=p===1?1:Math.max(0,Math.min(1,(p*total-sQ.weight)/sC.weight));const qFrameCached=browserMetrics(),cFrameCached=cubicBrowserMetrics();return{globalP:p,pen,locals:pen===17?{q,c}:null,qFrameCached,cFrameCached,QframeCurrent:pen===17&&q>0&&q<1&&qFrameCached?.p===q,CframeCurrent:pen===17&&c>0&&c<1&&cFrameCached?.p===c}};\nconst show=p=>{current.innerHTML=renderGrowingCaps(strokes,pen,p,'candidate');prior.innerHTML=renderQOnly(strokes,pen,p,'baseline');progress.value=p*100;value.textContent=(p*100).toFixed(8)+'%';metrics.textContent=JSON.stringify(state(p));};\nconst item=(group,label,p,key,small=false)=>{const section=document.createElement('section');section.className=small?'small':'';const h=document.createElement('h2');h.textContent=label+' '+(100*p).toFixed(8)+'%';section.append(h);const old=document.createElement('div'),fresh=document.createElement('div');old.className='sample-old';fresh.className='sample-new';old.innerHTML=renderQOnly(strokes,pen,p,key+'-old');fresh.innerHTML=renderGrowingCaps(strokes,pen,p,key+'-new');section.append(old,fresh);const detail=document.createElement('pre');detail.textContent=JSON.stringify(state(p));section.append(detail);group.append(section)};\nprogress.oninput=()=>show(Number(progress.value)/100);for(const b of document.querySelectorAll('[data-progress]'))b.onclick=()=>show(Number(b.dataset.progress));\ndocument.getElementById('play').onclick=()=>{const start=performance.now();const frame=t=>{const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame)};\ndocument.getElementById('fine').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';[.9999,.99999999,1].forEach((p,i)=>item(group,'완료',p,'fine-'+i));};\ndocument.getElementById('coarse').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>item(group,'원/후보 220px',p,'coarse-'+i,true));};\ndocument.getElementById('boundary').onclick=()=>{const group=document.getElementById('samples');group.innerHTML='';const masks=strokes[pen-1],total=masks.reduce((a,m)=>a+m.weight,0);let sum=0;masks.slice(0,-1).forEach((m,i)=>{sum+=m.weight;const at=sum/total;const next=masks[i+1].weight;const points=[['직전',Math.max(0,at-1e-6)],['경계',at],['직후',Math.min(1,at+1e-6)],['다음 mask0',at],['다음 maskepsilon',Math.min(1,(sum+next*.000001)/total)],['다음 mask95',(sum+next*.95)/total]];points.forEach(([label,p],j)=>item(group,'mask'+(i+2)+' '+label,p,'boundary-'+i+'-'+j));});};\nconst localGlobal=(which,p)=>(which==='Q'?p*sQ.weight:sQ.weight+p*sC.weight)/(sQ.weight+sC.weight);\nfor(const which of['Q','C']){\n document.getElementById('local-'+which.toLowerCase()).onclick=()=>{if(pen!==17)return;const group=document.getElementById('samples');group.innerHTML='';[0,.000001,.95,.9999,.99999999,1].forEach((p,i)=>item(group,which+'17 requested local '+p,localGlobal(which,p),'local-'+which+'-'+i));};\n document.getElementById('rho-'+which.toLowerCase()).onclick=()=>{if(pen!==17)return;const group=document.getElementById('samples');group.innerHTML='';const m=which==='Q'?sQ:sC,g=which==='Q'?measureBrowserFrame(m,0):measureCubicBrowserFrame(m,0),t=7/g.L;[Math.max(0,t-1e-6),t,Math.min(1,t+1e-6)].forEach((p,i)=>item(group,which+'17 rho=r '+i,localGlobal(which,p),'rho-'+which+'-'+i));};\n document.getElementById('coverage-'+which.toLowerCase()).onclick=()=>{const group=document.getElementById('samples');group.innerHTML='<h2>'+which+'17 P-minus-fullround</h2>'+(which==='Q'?targetCoverageResidual(sQ,'coverage-q17'):cubicCoverageResidual(sC,'coverage-c17'));};\n}\ndocument.getElementById('coverage-both').onclick=()=>{document.getElementById('samples').innerHTML='<section><h2>B17m2 P-minus-fullround</h2>'+cubicCoverageResidual(sC,'coverage-c17')+'</section><section><h2>Q17m1 P-minus-fullround</h2>'+targetCoverageResidual(sQ,'coverage-q17')+'</section>';};\nshow(0);\n}"
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'config.json').read_bytes())!=CONFIG_SHA:raise ValueError('config changed')
    if sha((HERE/'render.mjs').read_bytes())!=RENDER_SHA:raise ValueError('renderer changed')
    if sha((HERE/CONFIG['sourceFixture']).read_bytes())!=FIXTURE_SHA:raise ValueError('cache changed')
    for file,expected in TARGET['inputSHA256'].items():
        if sha((REPO/file).read_bytes())!=expected:raise ValueError('original input changed')

def source(glyph):
    global FETCH_COUNT
    with LOCK:
        if glyph in CACHE:
            return CACHE[glyph]
        if FETCH_COUNT!=0:raise ValueError('Dictionary fetch already used')
        FETCH_COUNT+=1
        pin = ENTRIES[glyph]['dictionary']
        with urllib.request.urlopen(pin['url'], timeout=20) as response:
            if response.status != 200 or response.geturl()!=pin['url']:
                raise ValueError('Dictionary unavailable')
            raw = response.read(100001)
        if len(raw) != pin['bytes'] or hashlib.sha256(raw).hexdigest() != pin['sha256']:
            raise ValueError('Dictionary pin changed')
        root = ET.fromstring(raw)
        if root.attrib!=TARGET['domesticRootAttributes']:raise ValueError('Dictionary root attributes changed')
        if root.find(NS + 'title').text != glyph:
            raise ValueError('Dictionary title changed')
        groups = list(root.iter(NS + 'g'))
        # Preserve exact 邁 domestic viewBox and transform; no square-viewBox assumption.
        if len(groups) != 1 or groups[0].attrib!=TARGET['domesticGroupAttributes']:
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
    return '<svg viewBox="0 0 1024 1152"><g transform="' + data['transform'] + '">' + ''.join(pieces) + '</g></svg>'

def domestic_whole():
    data=source('邁')
    if len(data['strokes'])!=17:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1152"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def public_whole(strokes):
    return '<svg viewBox="0 0 100 100"><g fill="#222">'+''.join('<path d="'+html.escape(mask['outline'])+'"/>'for pen in strokes for mask in pen)+'</g></svg>'
def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>邁 Q17 Q+B growing caps</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}.samples{display:grid;grid-template-columns:repeat(2,540px);gap:16px}.small{width:500px;display:grid;grid-template-columns:repeat(2,220px);gap:8px}.small h2{grid-column:span 2}.small svg{width:220px;height:220px}button,a,input{font:inherit;margin:5px}h2{font-size:16px}pre{white-space:pre-wrap}</style><h1>邁 · 원 Q17m1 한정 growing caps 후보</h1><p>邁 VS3 body3/id3 · 17p22m40 · exact Q17m1 기존 T1/3 K1/100 보존 + B17m2 고유 C T1/4 K1/13만 추가. 원guide/폭/weight/QB gap[-2,-2]/경계.26504538893145446과원40poly불변. 각원Browser L로rho=min(7,pL),완료/prefix/whole은두target full-round mask유지. 다른16획은이전Q-only정책과바이트동일. 과거B activationFAIL보존/newnative/app/runtimefalse/sourcecompiler/engine0.</p><a href="/whole">전체</a>'+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,18))+body+'</html>'
def script(pen,whole=False):
    return '<script type="module">'+BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__STROKE__',str(pen)).replace('__WHOLE__','true'if whole else'false')+'</script>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole 원17 path</h2>'+domestic_whole()+'</section><section><h2>이전 Q-only whole</h2><div id="baseline"></div></section><section><h2>Q17+B17 완료 full-round 유지</h2><div id="candidate"></div></section></div>'+script(17,True))
def progressive_page(pen):
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('25%',.25),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+'<button id="fine">완료 3단계</button><button id="boundary">원 multi mask 전후·0 epsilon95</button><button id="local-q">Q17m1 local 6단계</button><button id="local-c">B17m2 local 6단계</button><button id="rho-q">Q17m1 rho=r 전후</button><button id="rho-c">B17m2 rho=r 전후</button><button id="coarse">9단계 220px</button><button id="coverage-c">B17m2 coverage 잔여</button><button id="coverage-q">Q17m1 coverage 잔여</button><button id="coverage-both">두 target coverage</button>'
    return shell('<h2>국내/이전 Q-only/새 Q+B '+str(pen)+'획 · 각520px</h2>'+controls+'<div class="pair"><section><h2>국내 원 방향</h2>'+dictionary_svg('邁',pen,True,'domestic-'+str(pen))+'</section><section><h2>이전 Q-only · B 고정cap</h2><div id="baseline"></div></section><section><h2>기존 Q + 새 cubic B17</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(pen))
def selection(route,query):
    if route not in['/','/whole','/progressive','/render.mjs','/q-baseline.mjs']:raise ValueError('Unknown route')
    q={}if not query else parse_qs(query,keep_blank_values=True,strict_parsing=True)
    if any(len(v)!=1 or not v[0]for v in q.values()):raise ValueError('Duplicate or blank query')
    if route!='/progressive':
        if q:raise ValueError('Query forbidden')
        return None
    if not set(q).issubset({'root','stroke'}):raise ValueError('Unknown query')
    if q.get('root',['u9081-ue0103'])!=['u9081-ue0103']:raise ValueError('Unsupported exact root')
    value=q.get('stroke',['17'])[0]
    if not re.fullmatch('[1-9][0-9]*',value)or not 1<=int(value)<=17:raise ValueError('Unsupported exact pen')
    return int(value)
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards()
            if self.headers.get('Host')!='127.0.0.1:'+str(self.server.server_port):raise ValueError('Local host required')
            u=urlparse(self.path)
            if u.fragment or u.netloc or u.scheme:raise ValueError('Local route required')
            pen=selection(u.path,u.query)
            mime='text/html; charset=utf-8'
            if u.path=='/render.mjs':body=(HERE/'render.mjs').read_text();mime='text/javascript; charset=utf-8'
            elif u.path=='/q-baseline.mjs':body=(HERE/CONFIG['baselineQRenderer']).read_text();mime='text/javascript; charset=utf-8'
            else:body=whole_page()if pen is None else progressive_page(pen)
            data=body.encode();self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:
            self.send_response(409,'Source contract rejected');self.send_header('Content-Type','text/plain; charset=utf-8');self.end_headers();self.wfile.write(b'Source contract rejected')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u9081-ue0103'];guards()
    FIXTURE=json.loads((HERE/CONFIG['sourceFixture']).read_bytes());STROKES=FIXTURE['strokes']
    if FIXTURE['root']!='u9081-ue0103'or len(STROKES)!=17 or sum(len(p)for p in STROKES)!=22:raise ValueError('Exact source cache changed')
    ENTRIES={'邁':{'strokes':17,'dictionary':TARGET['dictionary']}}
    source('邁')
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'邁','root':'u9081-ue0103','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
