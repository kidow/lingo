# Original-source native review only; compiler/body/header/caller identity SHA pinned. Private dictionary RAM-only.
import sys
import hashlib
sys.dont_write_bytecode = True
import importlib.util, json, os, subprocess
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
spec = importlib.util.spec_from_file_location('a1062_progressive_review', ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)
STATIC_PINS={"metadata.json":"d5c4162ac8b1a661c2026ceed0ff2b5b17583ddbb67c11ba0c270d5bfd20c8ad","sources.json":"2773f4c20b062d05c13cdf1c42656d66f7e251a3510863ed4e2abac410a6d0e2","engine-proof.json":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509","progressive.mjs":"b640c8e150b0df8a9f491fa218de58bf4d96f13a8edad0fb9ad797ce8f96410c"}
def assert_static_pins():
    for filename,pin in STATIC_PINS.items():assert hashlib.sha256((HERE/filename).read_bytes()).hexdigest()==pin
assert_static_pins()
meta = json.loads((HERE/'metadata.json').read_text())
r.base.renderer.ENTRIES['餼'] = {'strokes': 19, 'dictionary': meta['dictionary']}
SUPPORTED_ROOTS=["u993c","u993c-ue0100","u993c-ue0101","u993c-ue0102"]
def compile_candidate(root="u993c"):
    assert root in SUPPORTED_ROOTS,'Unreviewed or unsupported whole profile cannot animate'
    result=json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile.mjs'),root]))
    assert len(result['strokes'])==19
    return result

compiled=compile_candidate()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            assert_static_pins()
            requested_root=parse_qs(urlparse(self.path).query).get('root',["u993c"])[0]
            compiled = compile_candidate(requested_root)  # Explicit root-specific original proof and SHA.

            stroke = int(parse_qs(urlparse(self.path).query).get('stroke',['1'])[0])
            assert 1 <= stroke <= 19
            domestic = r.base.renderer.dictionary_svg('餼', stroke, True, 'domestic'+str(stroke))
            large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'
            masks = compiled['strokes'][stroke-1]
            total = sum(mask['weight'] for mask in masks)
            boundaries = []
            cumulative = 0
            for mask_index, mask in enumerate(masks[:-1], 1):
                cumulative += mask['weight']
                boundaries.append((mask_index+1, cumulative/total))
            boundary_controls = ''.join('<button onclick="show('+repr(max(0,boundary-1e-10))+')">마스크 '+str(index)+' 경계 직전</button><button onclick="show('+repr(boundary)+')">마스크 '+str(index)+' 경계</button><button onclick="show('+repr(min(1,boundary+1e-10))+')">마스크 '+str(index)+' 경계 직후</button>' for index,boundary in boundaries)
            body = ('<!doctype html><meta charset="utf-8"><title>餼 progressive review</title>'
                '<style>body{font:16px system-ui;margin:20px;width:960px}svg{width:300px;height:300px}.pair{display:flex;gap:30px}.samples{display:flex;flex-wrap:wrap}.samples svg{width:170px;height:170px}button,a,input{margin:8px}</style>'
                '<h1>餼 · '+requested_root+' · '+str(stroke)+'/19</h1><p>국내 사전 방향(왼쪽), 원본 윤곽 순차 재생(오른쪽)</p>'
                + ''.join(f'<a href="?root={requested_root}&stroke={n}">{n}획</a>' for n in range(1,20))
                + '<div class="pair">'+domestic+'<div id="candidate"></div></div>'
                + ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + '<button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.99)">99%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button>' + boundary_controls + '<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0"><output id="value">0%</output><div class="samples" id="samples"></div>'
                + '<p>Private dictionary graphics are RAM-only. Candidate: pinned GlyphWiki-derived outlines; not yet runtime approved.</p>'
                + '<script>const strokes='+json.dumps(compiled['strokes'])+';const stroke='+str(stroke)+';const render='+compiled['render']+';'
                + "const show=p=>{candidate.innerHTML=render(strokes,stroke,p,'live');progress.value=p*100;value.textContent=(p*100).toFixed(4)+'%'};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};"
                + "[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+='<div>'+Math.round(p*100)+'%'+render(strokes,stroke,p,'sample'+i)+'</div>'});show(0);</script>").encode()
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc: self.send_error(500,str(exc))

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1',0),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'strokes':len(compiled['strokes']),'masks':sum(len(p) for p in compiled['strokes']),'sourceRoot':compiled['sourceRoot'],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceProofFileSHA256']}),flush=True)
    server.serve_forever()
