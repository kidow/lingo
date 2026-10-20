#!/usr/bin/env python3
"""噋 Q9m2 growing-caps 독립 표시 검토. 원 compiler/engine 호출 없음."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA='c8e8e289accbe2fe65dd4f5b2fcbdd639b0dbc49fa6a5ad524a0904ff78a67cd'
RENDER_SHA='45a1bfad47389a1c85f3fdc9b8cd15674fad3b84d34c2b3920deea269759f612'
FIXTURE_SHA='96579c520dd960183397e5165badcf3d05a038dabf36b46faa024fa8ccc5fcb5'
CONFIG=None
TARGET=None
FIXTURE=None
STROKES=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="import{renderOriginal,renderGrowingCaps,renderWhole,targetMask,targetCoverageResidual,sourceCertificate,measureTarget,commitHost,browserMetrics}from'/render.mjs';\nconst strokes=__STROKES__,pen=__STROKE__,isWhole=__WHOLE__,targets=[{\"pen\":9,\"mask\":2}],current=document.getElementById('candidate'),prior=document.getElementById('baseline'),samples=document.getElementById('samples');let sequence=0,requested=0;\nconst status=extra=>{document.getElementById('metrics').textContent=JSON.stringify({pen,requestedGlobal:requested,targets:browserMetrics(),...extra,nativeApproval:false,appUI:false},null,2)};\nfunction show(p){requested=p;prior.innerHTML=renderOriginal(strokes,pen,p,'old');current.innerHTML=renderGrowingCaps(strokes,pen,p,'new');commitHost(current);const slider=document.getElementById('progress');if(slider)slider.value=p*100;const output=document.getElementById('value');if(output)output.textContent=(p*100).toFixed(8)+'%';status({mode:'current'})}\nfunction localToGlobal(pen,mask,p){const a=strokes[pen-1],before=a.slice(0,mask-1).reduce((n,s)=>n+s.weight,0),total=a.reduce((n,s)=>n+s.weight,0);return(before+p*a[mask-1].weight)/total}\nfunction sample(targetPen,p,label,i){const cell=document.createElement('section'),id='sample'+(++sequence)+'-'+i;cell.className=label.includes('coarse')?'small':'';cell.innerHTML='<h2>'+label+'</h2>'+renderOriginal(strokes,targetPen,p,id+'b')+'<div class=\"sample-new\">'+renderGrowingCaps(strokes,targetPen,p,id+'n')+'</div>';samples.append(cell);commitHost(cell.querySelector('.sample-new'));return{label,pen:targetPen,global:p,targets:browserMetrics()}}\nfunction frames(items){samples.replaceChildren();const metrics=items.map((v,i)=>sample(v.pen,v.p,v.label,i));status({mode:'samples',samples:metrics})}\nfunction targetLength(t){const node=current.querySelector('[data-can-target=\"u564b-'+t.pen+'-'+t.mask+'\"] [data-can-measurement=\"true\"]'),s=targetMask(t.pen,t.mask);return measureTarget(s,0,node).L}\nif(isWhole){prior.innerHTML=renderOriginal(strokes,15,1,'oldwhole');current.innerHTML=renderWhole(strokes,'newwhole');commitHost(current);requested=1;status({mode:'whole'})}else{show(0);const slider=document.getElementById('progress');slider.oninput=()=>show(+slider.value/100);for(const b of document.querySelectorAll('[data-progress]'))b.onclick=()=>show(Number(b.dataset.progress));document.getElementById('fine').onclick=()=>frames([.9999,.99999999,1].map(p=>({pen,p,label:'fine '+p})));document.getElementById('boundary').onclick=()=>{const items=[];strokes.forEach((m,pi)=>{if(m.length<2)return;const total=m.reduce((n,s)=>n+s.weight,0);for(let j=1;j<m.length;j++){const b=m.slice(0,j).reduce((n,s)=>n+s.weight,0)/total;for(const d of[-1e-10,0,1e-10])items.push({pen:pi+1,p:b+d,label:'multi'+(pi+1)+' boundary'+j+' '+d})}for(const p of[0,1e-6,.95])items.push({pen:pi+1,p,label:'multi'+(pi+1)+' global '+p})});frames(items)};document.getElementById('rho').onclick=()=>{const items=[];for(const t of targets){const L=targetLength(t);for(const d of[-1e-10,0,1e-10])items.push({pen:t.pen,p:localToGlobal(t.pen,t.mask,7/L+d),label:t.pen+'m'+t.mask+' rho '+d})}frames(items)};document.getElementById('risk-coverage').onclick=()=>{samples.innerHTML=targets.map(t=>'<section><h2>'+t.pen+'m'+t.mask+' P-minus-full-round</h2>'+targetCoverageResidual(targetMask(t.pen,t.mask),'residual-u564b-'+t.pen+'m'+t.mask)+'</section>').join('')};document.getElementById('coarse').onclick=()=>frames([0,.125,.25,.375,.5,.625,.75,.875,1].map(p=>({pen,p,label:pen+' coarse '+p})));document.getElementById('play').onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};for(const t of targets){for(const p of[0,1e-6,.95,.9999,.99999999,1]){const b=document.createElement('button');b.textContent=t.pen+'m'+t.mask+' local '+p;b.onclick=()=>frames([{pen:t.pen,p:localToGlobal(t.pen,t.mask,p),label:b.textContent}]);document.getElementById('target-controls').append(b)}}}\nwindow.canHarness={show,localToGlobal,frames,targets};\n"
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
        if root.get('viewBox') != '0 0 1024 1152':raise ValueError('Dictionary root viewBox changed')
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
    return '<svg viewBox="0 0 1024 1152"><g transform="' + data['transform'] + '">' + ''.join(pieces) + '</g></svg>'

def domestic_whole():
    data=source('噋')
    if len(data['strokes'])!=15:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1152"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>噋 Q9m2 growing caps</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}.samples{display:grid;grid-template-columns:repeat(2,540px);gap:16px}.small{width:500px;display:grid;grid-template-columns:repeat(2,220px);gap:8px}.small h2{grid-column:span 2}.small svg{width:220px;height:220px}button,a,input{font:inherit;margin:5px}h2{font-size:16px}pre{white-space:pre-wrap}</style><h1>噋 · 원 Q9m2 한정 growing caps 후보</h1><p>원15p17m33 캐시의Q9m2만T1/2 K1/50 초기arc7을고유인증합니다. 원HQ9독립gap/순서/모든mask필드불변이며LEFT10원quad분리는별도source에서완료했습니다. sourcefull5/id5·선택body3정확결박, header합성0입니다. Q9초기cap FIRSTFAIL/LEFT10완료FAIL이력불변이며원P연결성/coverage/raster/시간/합획승인이아닙니다. 전체freshgate필수입니다.</p><a href="/whole">전체</a>'+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,16))+body+'</html>'
def script(pen,whole=False):
    return '<script type="module">'+BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__STROKE__',str(pen)).replace('__WHOLE__','true'if whole else'false')+'</script>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole 원15 path</h2>'+domestic_whole()+'</section><section><h2>원 shared43 whole</h2><div id="baseline"></div></section><section><h2>Q9m2 완료도 full-round 유지</h2><div id="candidate"></div></section></div>'+'<pre id="metrics"></pre>'+script(15,True))
def progressive_page(pen):
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('25%',.25),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+'<button id="fine">완료 3단계</button><button id="boundary">원 multi mask 전후·0 epsilon95</button><button id="rho">Q9m2 rho=r 전후</button><button id="risk-coverage">Q9m2 coverage</button><button id="coarse">9단계 220px</button>'
    return shell('<h2>국내/원 shared43/후보 '+str(pen)+'획 · 각520px</h2>'+controls+'<div id="target-controls"></div><div class="pair"><section><h2>국내 원 방향</h2>'+dictionary_svg('噋',pen,True,'domestic-'+str(pen))+'</section><section><h2>원 shared43</h2><div id="baseline"></div></section><section><h2>Q9m2만 새 표시</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(pen))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();u=urlparse(self.path);q={}if not u.query else parse_qs(u.query,strict_parsing=True)
            if 'root'in q and q['root']!=['u564b']:raise ValueError('unsupported root')
            mime='text/html; charset=utf-8'
            if u.path=='/render.mjs'and not q:body=(HERE/'render.mjs').read_text();mime='text/javascript; charset=utf-8'
            elif u.path in ['/','/whole']and set(q).issubset({'root'}):body=whole_page()
            elif u.path=='/progressive'and set(q).issubset({'root','stroke'})and len(q.get('stroke',['9']))==1:
                pen=int(q.get('stroke',['1'])[0])
                if not 1<=pen<=15:raise ValueError('unsupported pen')
                body=progressive_page(pen)
            else:raise ValueError('unsupported route')
            data=body.encode();self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Exact source or renderer contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u564b'];guards()
    if args.check_only:print(json.dumps({'guards':True,'sourceCompilerCalls':0,'engineRuns':0,'HTTP':0}));raise SystemExit(0)
    FIXTURE=json.loads((HERE/CONFIG['sourceFixture']).read_bytes());STROKES=FIXTURE['u564b']['strokes']
    if len(STROKES)!=15 or sum(len(p)for p in STROKES)!=17:raise ValueError('count changed')
    ENTRIES={'噋':{'strokes':15,'dictionary':TARGET['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'噋','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True);server.serve_forever()
