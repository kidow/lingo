import sys
sys.dont_write_bytecode = True
import importlib.util, json, os, subprocess
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
spec = importlib.util.spec_from_file_location('a840_progressive_review', ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)
meta = json.loads((HERE/'metadata.json').read_text())
r.base.renderer.ENTRIES['筯'] = {'strokes': 13, 'dictionary': meta['dictionary']}
module = (HERE/'progressive.mjs').as_uri()
script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,renderProgressive,sourceRoot,sourceProofFile,sourceProofFileSHA256}}from'{module}';
const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(sourceRoot,'u7b6f');assert.equal(sourceProofFile,'engine-whole-u7b6f.json');assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSHA256);const selected=JSON.parse(bytes),header=JSON.parse(readFileSync(new URL('engine-proof.json','{module}')));assert.equal(sourceProofFileSHA256,'299f6ef9d1ca57ddb74342fb9657b946ef3b29964ff7588aaff446d927b560dc');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'299f6ef9d1ca57ddb74342fb9657b946ef3b29964ff7588aaff446d927b560dc');const identity={{root:sourceRoot,file:sourceProofFile,fileSHA256:sourceProofFileSHA256}};assert.deepEqual(identity,{{root:'u7b6f',file:'engine-whole-u7b6f.json',fileSHA256:'299f6ef9d1ca57ddb74342fb9657b946ef3b29964ff7588aaff446d927b560dc'}});const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};assert.equal(createHash('sha256').update(JSON.stringify({{engineRevision:proof.engineRevision,engineHashes:proof.engineHashes,groups:proof.groups,trace:proof.trace,defaults:proof.defaults}})).digest('hex'),'4c3207bce731dab878712e0076537d91f1930c4000813532ea4accb2ad5bffa4');const before=JSON.stringify(proof);const strokes=compileProgressive(proof.trace,proof);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,13);
console.log(JSON.stringify({{strokes,render:renderProgressive.toString(),sourceRoot,sourceProofFile,sourceProofFileSHA256}}));"""
def compile_candidate():
    result = json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
    assert len(result['strokes']) == 13
    return result

compiled = compile_candidate()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            compiled = compile_candidate()  # Re-read the exact pinned module on each request.
            stroke = int(parse_qs(urlparse(self.path).query).get('stroke',['1'])[0])
            assert 1 <= stroke <= 13
            domestic = r.base.renderer.dictionary_svg('筯', stroke, True, 'domestic'+str(stroke))
            large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'
            masks = compiled['strokes'][stroke-1]
            total = sum(mask['weight'] for mask in masks)
            boundaries = []
            cumulative = 0
            for mask_index, mask in enumerate(masks[:-1], 1):
                cumulative += mask['weight']
                boundaries.append((mask_index+1, cumulative/total))
            boundary_controls = ''.join('<button onclick="show('+repr(max(0,boundary-1e-10))+')">마스크 '+str(index)+' 경계 직전</button><button onclick="show('+repr(boundary)+')">마스크 '+str(index)+' 경계</button><button onclick="show('+repr(min(1,boundary+1e-10))+')">마스크 '+str(index)+' 경계 직후</button>' for index,boundary in boundaries)
            body = ('<!doctype html><meta charset="utf-8"><title>筯 progressive review</title>'
                '<style>body{font:16px system-ui;margin:20px;width:960px}svg{width:300px;height:300px}.pair{display:flex;gap:30px}.samples{display:flex;flex-wrap:wrap}.samples svg{width:170px;height:170px}button,a,input{margin:8px}</style>'
                '<h1>筯 · '+str(stroke)+'/13</h1><p>국내 사전 방향(왼쪽), 원본 윤곽 순차 재생(오른쪽)</p>'
                + ''.join(f'<a href="?stroke={n}">{n}획</a>' for n in range(1,14))
                + '<div class="pair">'+domestic+'<div id="candidate"></div></div>'
                + ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + '<button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.99)">99%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button>' + boundary_controls + '<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0"><output id="value">0%</output><div class="samples" id="samples"></div>'
                + '<p>Private dictionary graphics are RAM-only. Candidate: pinned GlyphWiki-derived outlines; not yet runtime approved.</p>'
                + '<script>const strokes='+json.dumps(compiled['strokes'])+';const stroke='+str(stroke)+';const render='+compiled['render']+';'
                + "const show=p=>{candidate.innerHTML=render(strokes,stroke,p,'live');progress.value=p*100;value.textContent=(p*100).toFixed(4)+'%'};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};"
                + "[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+='<div>'+Math.round(p*100)+'%'+render(strokes,stroke,p,'sample'+i)+'</div>'});show(0);</script>").encode()
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc: self.send_error(500,str(exc))

if __name__ == '__main__':
    print(json.dumps({'port':64651,'pid':os.getpid(),'strokes':len(compiled['strokes']),'masks':sum(len(p) for p in compiled['strokes']),'sourceRoot':compiled['sourceRoot'],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceProofFileSHA256']}),flush=True)
    ThreadingHTTPServer(('127.0.0.1',64651),Handler).serve_forever()
