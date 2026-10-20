#!/usr/bin/env python3
"""紽 11m1 MLQL growing-caps 독립 표시 검토. 원 compiler/engine 호출 없음."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA="a1de1a84c1094633acf89c760b3901d50f48fdc52c2b24453e2ac7d201ff630d"
RENDER_SHA="5d92475ba2027b7f86fcd54768f4506f8f24d3a4be1842b18ce7f128f5437630"
FIXTURE_SHA="27e4747d82fb0882f9679c7895a37a5c47603aaac83d0b01c2da21bfdef54420"
VALIDATION_BYTES=(HERE/'validation.json').read_bytes()
VALIDATION_SHA=hashlib.sha256(VALIDATION_BYTES).hexdigest()
VALIDATION=json.loads(VALIDATION_BYTES)
CONFIG=None
TARGET=None
FIXTURE=None
STROKES=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
BROWSER="import{renderOriginal,renderGrowingCaps,renderWhole,renderBodyLocal,renderOrdinaryUpTail,targetMask,targetCoverageResidual,measureTarget,commitHost}from'/render.mjs';\nconst strokes=__STROKES__,pen=__STROKE__,isWhole=__WHOLE__,current=document.getElementById('candidate'),prior=document.getElementById('baseline'),samples=document.getElementById('samples');let sequence=0,requested=0;const errors=[];\nconst status=extra=>{document.getElementById('metrics').textContent=JSON.stringify({pen,requestedGlobal:requested,...extra,errors,nativeApproval:false,appUI:false},null,2)};\nwindow.addEventListener('error',e=>{errors.push(String(e.message));status({mode:'error'})});\nconst attrNumber=(n,k)=>{const v=n?.getAttribute(k);return v===null||v===undefined?NaN:Number(v)};\nfunction observe(host){const rows=commitHost(host);return rows.map(row=>{const g=host.querySelector('[data-can-target=\"'+row.id+'\"]'),ink=g?.querySelector(':scope > path[data-can-ink=\"true\"]'),caps=g?.querySelectorAll('mask circle'),measurement=g?.querySelector('[data-can-measurement=\"true\"]'),guide=g?.querySelector('path[id$=\"-can-guide\"]'),f=row.frame;return{...row,distancePresent:!!ink?.hasAttribute('data-growing-distance'),sameFrameChecks:f?{progress:attrNumber(ink,'data-growing-progress')===f.progress,length:attrNumber(ink,'data-growing-length')===f.L,distance:attrNumber(ink,'data-growing-distance')===f.d,radius:attrNumber(ink,'data-growing-radius')===f.rho,endX:attrNumber(ink,'data-growing-end-x')===f.point.x,endY:attrNumber(ink,'data-growing-end-y')===f.point.y,startX:attrNumber(caps[0],'cx')===f.q0[0],startY:attrNumber(caps[0],'cy')===f.q0[1],endCapX:attrNumber(caps[1],'cx')===f.point.x,endCapY:attrNumber(caps[1],'cy')===f.point.y,capsRadius:attrNumber(caps[0],'r')===f.rho&&attrNumber(caps[1],'r')===f.rho,dash:guide?.getAttribute('stroke-dasharray')===String(f.progress)+' 2',sameGuide:measurement?.getAttribute('d')===guide?.getAttribute('d')}:null}})}\nfunction show(p){requested=p;prior.innerHTML=renderOriginal(strokes,pen,p,'old');current.innerHTML=renderGrowingCaps(strokes,pen,p,'new');const records=observe(current),slider=document.getElementById('progress'),out=document.getElementById('value');if(slider)slider.value=p*100;if(out)out.textContent=(p*100).toFixed(8)+'%';status({mode:'global',records})}\nfunction localToGlobal(mask,p){const a=strokes[10],before=a.slice(0,mask-1).reduce((n,s)=>n+s.weight,0),total=a.reduce((n,s)=>n+s.weight,0);return(before+p*a[mask-1].weight)/total}\nfunction frames(items){samples.replaceChildren();const records=items.map((v,i)=>{const cell=document.createElement('section'),id='sample'+(++sequence)+'-'+i;cell.className=v.label.includes('coarse')?'small':'';const s=v.mask?strokes[10][v.mask-1]:null,old=v.mask?renderOriginal([[s]],1,v.p,id+'b'):renderOriginal(strokes,v.pen,v.p,id+'b'),fresh=v.mask===1?renderBodyLocal(strokes,v.p,id+'n'):v.mask===2?renderOrdinaryUpTail(strokes,v.p,id+'n'):renderGrowingCaps(strokes,v.pen,v.p,id+'n');cell.innerHTML='<h2>'+v.label+'</h2>'+old+'<div class=\"sample-new\">'+fresh+'</div>';samples.append(cell);return{...v,mode:v.mask===1?'isolated-body-local':v.mask===2?'ordinary-UP-local':'global',globalEquivalent:v.mask?localToGlobal(v.mask,v.p):v.p,records:observe(cell.querySelector('.sample-new'))}});status({mode:'samples',records})}\nif(isWhole){prior.innerHTML=renderOriginal(strokes,11,1,'oldwhole');current.innerHTML=renderWhole(strokes,'newwhole');requested=1;status({mode:'whole',records:observe(current)})}else{show(0);document.getElementById('progress').oninput=e=>show(+e.target.value/100);for(const b of document.querySelectorAll('[data-progress]'))b.onclick=()=>show(Number(b.dataset.progress));document.getElementById('fine').onclick=()=>frames([.9999,.99999999,1].map(p=>({pen:11,p,label:'global11 completion '+p})));document.getElementById('coverage-control').onclick=()=>{const s=targetMask(11,1);samples.innerHTML='<section><h2>new11m1 body P only</h2><svg viewBox=\"0 0 100 100\"><path d=\"'+s.outline+'\"/></svg></section><section id=\"coverage-residual\"><h2>risk-first new11m1 P-minus-full-round: black means HOLD</h2>'+targetCoverageResidual(s,'coverage-u7d3d-11-1')+'</section>';status({mode:'body-coverage',coverageApproved:false})};document.getElementById('rho').onclick=()=>{const node=current.querySelector('[data-can-target=\"u7d3d-11-1\"] [data-can-measurement=\"true\"]'),L=measureTarget(targetMask(11,1),0,node).L;frames([7/L,50.5/L].flatMap((p,i)=>[-1e-10,0,1e-10].map(d=>({mask:1,p:p+d,label:'body local '+(i?'firstL-end':'rho-r')+' '+d}))))};document.getElementById('boundary').onclick=()=>{const b=localToGlobal(2,0);frames([...[-1e-10,0,1e-10].map(d=>({pen:11,p:b+d,label:'UP11 boundary '+d})),...[0,1e-6,.95].map(p=>({pen:11,p,label:'UP11 global '+p}))])};document.getElementById('tail-local').onclick=()=>frames([0,1e-6,.95,.9999,.99999999,1].map(p=>({mask:2,p,label:'ordinary UP11m2 local '+p})));document.getElementById('coarse').onclick=()=>frames([0,.125,.25,.375,.5,.625,.75,.875,1].map(p=>({pen,p,label:pen+' coarse '+p})));document.getElementById('play').onclick=()=>{const start=performance.now();function f(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};for(const p of[0,1e-6,.95,.9999,.99999999,1]){const b=document.createElement('button');b.textContent='11m1 local '+p;b.onclick=()=>frames([{mask:1,p,label:b.textContent}]);document.getElementById('target-controls').append(b)}}\nwindow.firstRiskHarness={show,frames,localToGlobal};\n"
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'validation.json').read_bytes())!=VALIDATION_SHA:raise ValueError('validation changed')
    for file,expected in VALIDATION['newFilesSHA256'].items():
        if sha((HERE/file).read_bytes())!=expected:raise ValueError('new helper changed')
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
    data=source('紽')
    if len(data['strokes'])!=11:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def shell(body):
    return '<!doctype html><html lang="ko"><meta charset="utf-8"><title>紽 11m1 MLQL growing caps</title><style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4}.pair{display:grid;grid-template-columns:repeat(3,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}.samples{display:grid;grid-template-columns:repeat(2,540px);gap:16px}.small{width:500px;display:grid;grid-template-columns:repeat(2,220px);gap:8px}.small h2{grid-column:span 2}.small svg{width:220px;height:220px}button,a,input{font:inherit;margin:5px}h2{font-size:16px}pre{white-space:pre-wrap}</style><h1>紽 · 원 11m1 MLQL 한정 growing caps 후보</h1><p>紽 원UP6/5 마지막quad를 분리한 새11p14m37 source만 지원합니다. 11m1 body MLQL·폭14·weight90.071068·bounds동일,7polygon subset을 새whole987e48…a25/정확bodySHA에 재결박했습니다. 초기첫L101/2의arc7 K0만 재사용하며 과거native completion/coverage FAIL은보존·새승인false입니다. body localepsilon→bodycoverage를 먼저보고 통과후 localfine/ordinaryUP11m2local6/global경계0.8781332763348043을 봅니다. 다른10획·QQ1/2 및 UPtail은원shared43그대로입니다. 완료body는항상full-round masked/새coverage미확정/sourcecompiler·engine·derive0입니다.</p><a href="/whole">전체</a>'+''.join('<a href="/progressive?stroke='+str(n)+'">'+str(n)+'</a>'for n in range(1,12))+body+'</html>'
def script(pen,whole=False):
    return '<script type="module">'+BROWSER.replace('__STROKES__',json.dumps(STROKES,separators=(',',':'))).replace('__STROKE__',str(pen)).replace('__WHOLE__','true'if whole else'false')+'</script>'
def whole_page():
    return shell('<div class="pair"><section><h2>국내 whole 원11 path</h2>'+domestic_whole()+'</section><section><h2>원 shared43 whole</h2><div id="baseline"></div></section><section><h2>11m1 완료도 full-round 유지</h2><div id="candidate"></div></section></div>'+script(11,True))
def progressive_page(pen):
    controls='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".00000001" value="0"><output id="value"></output>'+''.join('<button data-progress="'+str(p)+'">'+label+'</button>'for label,p in [('0%',0),('epsilon',.000001),('25%',.25),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('99.999999%',.99999999),('100%',1)])+'<button id="fine">완료 3단계</button><button id="boundary">원 multi mask 전후·0 epsilon95</button><button id="rho">11m1 rho=r 및 firstL-end 전후</button><button id="coverage-control">위험우선 새11m1 body coverage</button><button id="tail-local">ordinary UP11m2 local6</button><button id="coarse">9단계 220px</button>'
    return shell('<h2>국내/원 shared43/후보 '+str(pen)+'획 · 각520px</h2>'+controls+'<div id="target-controls"></div><div class="pair"><section><h2>국내 원 방향</h2>'+dictionary_svg('紽',pen,True,'domestic-'+str(pen))+'</section><section><h2>원 shared43</h2><div id="baseline"></div></section><section><h2>11m1 새body만 표시·11m2 원UP</h2><div id="candidate"></div></section></div><pre id="metrics"></pre><div id="samples" class="samples"></div>'+script(pen))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();u=urlparse(self.path);q={}if not u.query else parse_qs(u.query,strict_parsing=True)
            if 'root'in q and q['root']!=['u7d3d']:raise ValueError('unsupported root')
            mime='text/html; charset=utf-8'
            if u.path=='/render.mjs'and not q:body=(HERE/'render.mjs').read_text();mime='text/javascript; charset=utf-8'
            elif u.path in ['/','/whole']and set(q).issubset({'root'}):body=whole_page()
            elif u.path=='/progressive'and set(q).issubset({'root','stroke'})and len(q.get('stroke',['11']))==1:
                pen=int(q.get('stroke',['11'])[0])
                if not 1<=pen<=11:raise ValueError('unsupported pen')
                body=progressive_page(pen)
            else:raise ValueError('unsupported route')
            data=body.encode();self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Exact source or renderer contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());TARGET=CONFIG['targets']['u7d3d'];guards()
    if args.check_only:print(json.dumps({'guards':True,'sourceCompilerCalls':0,'engineRuns':0,'HTTP':0}));raise SystemExit(0)
    FIXTURE=json.loads((HERE/CONFIG['sourceFixture']).read_bytes());STROKES=FIXTURE['u7d3d']['strokes']
    if len(STROKES)!=11 or sum(len(p)for p in STROKES)!=14:raise ValueError('count changed')
    ENTRIES={'紽':{'strokes':11,'dictionary':TARGET['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'紽','port':server.server_address[1],'pid':__import__('os').getpid(),'sourceCompilerRequests':0,'engineRuns':0,'nativeApproval':False}),flush=True);server.serve_forever()
