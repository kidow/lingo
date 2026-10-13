import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,importlib.util,subprocess
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PORT=64784
GLYPH='藻'
NAMES=['u85fb','u85fb-ue0100','u85fb-ue0101','u85fb-itaiji-001','u85fb-k','u85fb-ue0102']
PINS=json.loads((HERE/'k-native-server-input-pins.json').read_text())
def check_pins():
    for f,pin in PINS.items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==pin,'Pinned source input changed: '+f
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('b866_k_ram_renderer',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES[GLYPH]={'strokes':20,'dictionary':meta['dictionary']}
module=(HERE/'candidate-progressive-k.mjs').as_uri()
NODE=r"""import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const mod=__MODULE__,m=await import(mod),sha=b=>createHash('sha256').update(b).digest('hex'),pins=JSON.parse(readFileSync(new URL('k-native-server-input-pins.json',mod)));
for(const[f,p]of Object.entries(pins))assert.equal(sha(readFileSync(new URL(f,mod))),p);
assert.equal(m.sourceRoot,'u85fb-k');assert.equal(m.sourceProofFile,'./engine-whole-u85fb-k.json');assert.equal(m.sourceProofFileSha256,'a33b958f2d83984e6748d69d3d4c4048b86a161365748bc8c99351eb2fa2a979');
assert.deepEqual(m.selectedProofIdentity,{sourceRoot:m.sourceRoot,sourceProofFile:m.sourceProofFile,sourceProofFileSha256:m.sourceProofFileSha256});
assert.equal(JSON.parse(readFileSync(new URL('sources.json',mod))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');
const proof=JSON.parse(readFileSync(new URL(m.sourceProofFile,mod))),before=JSON.stringify(proof),strokes=m.compileProgressive(proof.trace,proof,m.selectedProofIdentity);
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,20);assert.equal(strokes.flat().length,21);assert.equal(sha(JSON.stringify(strokes)),'10473af0ab3b4d2af3352192ac4c5e346f4e08edede2c498a20784f787a200fb');
console.log(JSON.stringify({sourceRoot:m.sourceRoot,sourceProofFile:m.sourceProofFile,sourceProofFileSha256:m.sourceProofFileSha256,sourceGroups:m.sourceGroups,strokes,render:m.renderProgressive.toString(),nativeApproval:false}));"""
def compiled():
    check_pins()
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',NODE.replace('__MODULE__',json.dumps(module))]))
def original_svg(name):
    p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
    polygons=[p for g in p['groups'] for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    paths=' '.join(' '.join(('M' if i==0 else 'L')+str(v['x']/2)+' '+str(v['y']/2) for i,v in enumerate(p))+' Z' for p in polygons)
    return '<svg viewBox="0 0 100 100" aria-label="'+html.escape(name)+'"><path fill="#242422" d="'+paths+'"/></svg>'
def nav():
    return '<nav><a href="/whole">전체6자형</a> <a href="/pairs">20방향</a> <a href="/progressive?stroke=7&amp;enlarged=1&amp;samples=1">7획 경계</a></nav>'
def script(c):
    return '<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*a):pass
    def do_GET(self):
        try:
            c=compiled();parsed=urlparse(self.path);q=parse_qs(parsed.query);path=parsed.path
            if q.get('view')==['checks']:
                body=json.dumps({'sourceRoot':c['sourceRoot'],'sourceProofFile':c['sourceProofFile'],'sourceProofFileSha256':c['sourceProofFileSha256'],'wholeNames':NAMES,'pens':20,'masks':21,'sourceGroups':c['sourceGroups'],'water7Boundary':0.3859419076662689,'sourceInputPinsVerified':len(PINS),'nativeApproval':False}).encode();mime='application/json'
            elif path in ['/','/whole']:
                body=('<!doctype html><meta charset="utf-8"><title>藻 K whole review</title><style>body{font:16px system-ui;margin:20px;width:980px}.wholes{display:grid;grid-template-columns:repeat(2,1fr)}svg{width:420px;height:420px}a{margin:8px}</style>'+nav()+'<h1>藻 · 국내 전체형과 고정6whole</h1>'+r.base.full_dictionary(GLYPH)+'<div class="wholes">'+''.join('<section><h2>'+n+'</h2>'+original_svg(n)+'</section>' for n in NAMES)+'</div><p>사전 SVG RAM-only · K 후보 native 미승인</p>').encode();mime='text/html; charset=utf-8'
            elif path=='/pairs':
                blocks=''.join('<section><h2>'+str(n)+'획 · raw'+html.escape(str(c['sourceGroups'][n-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg(GLYPH,n,True,'dom'+str(n))+'<div id="candidate'+str(n)+'"></div></div></section>' for n in range(1,21))
                body=('<!doctype html><meta charset="utf-8"><title>藻 K 20 direction pairs</title><style>body{font:16px system-ui;margin:20px;width:900px}.pair{display:grid;grid-template-columns:200px 200px;gap:16px}svg{width:200px;height:210px}a{margin:8px}</style>'+nav()+'<h1>藻 · 20방향 · original K 후보</h1>'+blocks+'<p>물수변7은 원본 두 Q 마스크를 별도로 사용하며26.6226간격을연결하지않습니다. 숫자20은 native승인이아닙니다.</p>'+script(c)+'for(let n=1;n<=20;n++)document.getElementById("candidate"+n).innerHTML=render(strokes,n,1,"pair"+n);</script>').encode();mime='text/html; charset=utf-8'
            elif path=='/progressive':
                n=int(q.get('stroke',['7'])[0]);assert 1<=n<=20
                masks=c['strokes'][n-1];total=sum(m['weight'] for m in masks);cumulative=0;controls=[]
                for index,m in enumerate(masks[:-1],1):
                    cumulative+=m['weight'];bound=cumulative/total
                    controls.append('<button onclick="show('+repr(max(0,bound-1e-10))+')">마스크 '+str(index+1)+' 경계 직전</button><button onclick="show('+repr(bound)+')">마스크 '+str(index+1)+' 경계</button><button onclick="show('+repr(min(1,bound+1e-10))+')">마스크 '+str(index+1)+' 경계 직후</button>')
                large=q.get('enlarged')==['1'];show_samples=not large or q.get('samples')==['1']
                body=('<!doctype html><meta charset="utf-8"><title>藻 K progressive review</title><style>body{font:16px system-ui;margin:20px;width:1200px}.pair{display:flex;gap:30px}svg{width:'+('520' if large else '300')+'px;height:'+('520' if large else '300')+'px}.samples{display:flex;flex-wrap:wrap}.samples svg{width:170px;height:170px}a,button,input{margin:8px}</style>'+nav()+'<h1>藻 · '+str(n)+'/20 · K 원본</h1>'+''.join('<a href="/progressive?stroke='+str(i)+'&amp;samples=1">'+str(i)+'획</a>' for i in range(1,21))+'<div class="pair">'+r.base.renderer.dictionary_svg(GLYPH,n,True,'domestic'+str(n))+'<div id="candidate"></div></div><button onclick="show(0)">0%</button><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.99)">99%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button>'+''.join(controls)+'<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0"><output id="value">0%</output><div class="samples" id="samples"></div><p>原mask20pens21masks37polygons · water7gap26.6226 preserved · 사전 RAM-only · native0</p>'+script(c)+'const stroke='+str(n)+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};'+('[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"sample"+i)+"</div>"});' if show_samples else '')+'show(0);</script>').encode();mime='text/html; charset=utf-8'
            else:self.send_error(404);return
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as e:self.send_error(500,str(e))
if __name__=='__main__':
    c=compiled();print(json.dumps({'port':PORT,'pid':os.getpid(),'wholeVariants':6,'pens':20,'masks':21,'sourceRoot':c['sourceRoot'],'water7Boundary':0.3859419076662689,'sourceInputPinsVerified':len(PINS),'nativeApproval':False}),flush=True)
    ThreadingHTTPServer(('127.0.0.1',PORT),Handler).serve_forever()
