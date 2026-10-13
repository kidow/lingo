import sys
sys.dont_write_bytecode = True
import importlib.util, json, os, subprocess
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
spec = importlib.util.spec_from_file_location('review', ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)
meta = json.loads((HERE/'metadata.json').read_text())
r.base.renderer.ENTRIES['粻'] = {'strokes': 14, 'dictionary': meta['dictionary']}
module = (HERE/'progressive.mjs').as_uri()
def load_candidate(root='u7cbb'):
    script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileSourceWhole,renderProgressive,wholeSourceIdentities}}from'{module}';
const sourceRoot={json.dumps(root)},id=wholeSourceIdentities[sourceRoot];assert(id,'Unsupported whole root');const bytes=readFileSync(new URL(id.file,'{module}'));assert.equal(createHash('sha256').update(bytes).digest('hex'),id.fileSHA256);const p=JSON.parse(bytes);assert.equal(p.sourceRoot,sourceRoot);assert.equal(p.sourceProofFile,id.file);const proof={{...p,sourceProofFileSHA256:id.fileSHA256}},before=JSON.stringify(proof);const strokes=compileSourceWhole(sourceRoot,proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,14);
console.log(JSON.stringify({{strokes,render:renderProgressive.toString(),sourceRoot,sourceProofFile:id.file,sourceWholeFileSHA256:id.fileSHA256}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            root = parse_qs(urlparse(self.path).query).get('root',['u7cbb'])[0]
            compiled = load_candidate(root)
            stroke = int(parse_qs(urlparse(self.path).query).get('stroke',['14'])[0])
            assert 1 <= stroke <= 14
            domestic = r.base.renderer.dictionary_svg('粻', stroke, True, 'domestic'+str(stroke))
            large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'
            masks = compiled['strokes'][stroke-1]
            total = sum(mask['weight'] for mask in masks)
            boundaries = []
            cumulative = 0
            for mask_index, mask in enumerate(masks[:-1], 1):
                cumulative += mask['weight']
                boundaries.append((mask_index+1, cumulative/total))
            boundary_controls = ''.join('<button onclick="show('+repr(max(0,boundary-1e-10))+')">마스크 '+str(index)+' 경계 직전</button><button onclick="show('+repr(boundary)+')">마스크 '+str(index)+' 경계</button><button onclick="show('+repr(min(1,boundary+1e-10))+')">마스크 '+str(index)+' 경계 직후</button>' for index,boundary in boundaries)
            body = ('<!doctype html><meta charset="utf-8"><title>粻 progressive review</title>'
                '<style>body{font:16px system-ui;margin:20px;width:960px}svg{width:300px;height:300px}.pair{display:flex;gap:30px}.samples{display:flex;flex-wrap:wrap}.samples svg{width:170px;height:170px}button,a,input{margin:8px}</style>'
                '<h1>粻 · '+str(stroke)+'/14</h1><p>국내 사전 방향(왼쪽), 원본 윤곽 순차 재생(오른쪽)</p>'
                + ''.join(f'<a href="?root={root}&stroke={n}">{n}획</a>' for n in range(1,15))
                + '<div class="pair">'+domestic+'<div id="candidate"></div></div>'
                + ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + '<button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.99)">99%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button>' + boundary_controls + '<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0"><output id="value">0%</output><div class="samples" id="samples"></div>'
                + '<p>Private dictionary graphics are RAM-only. Candidate: pinned GlyphWiki-derived outlines; not yet runtime approved.</p>'
                + '<script>const strokes='+json.dumps(compiled['strokes'])+';const stroke='+str(stroke)+';const render='+compiled['render']+';'
                + "const show=p=>{candidate.innerHTML=render(strokes,stroke,p,'live');progress.value=p*100;value.textContent=(p*100).toFixed(4)+'%'};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};"
                + "[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+='<div>'+Math.round(p*100)+'%'+render(strokes,stroke,p,'sample'+i)+'</div>'});show(0);</script>").encode()
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc: self.send_error(500,str(exc))

if __name__ == '__main__':
    compiled = load_candidate()
    server = ThreadingHTTPServer(('127.0.0.1',0),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'strokes':len(compiled['strokes']),'masks':sum(len(p) for p in compiled['strokes']),'sourceRoot':compiled['sourceRoot'],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceWholeFileSHA256']}),flush=True)
    server.serve_forever()
