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
r.base.renderer.ENTRIES['芭'] = {'strokes': 8, 'dictionary': meta['dictionary']}
module = (HERE/'progressive.mjs').as_uri()
script = f"""import{{readFileSync}}from'node:fs';import{{compileProgressive,renderProgressive}}from'{module}';
const read=n=>JSON.parse(readFileSync(new URL(n,'{module}')));
console.log(JSON.stringify({{strokes:compileProgressive(read('./draw-trace.json'),read('./engine-proof.json')),render:renderProgressive.toString()}}));"""
compiled = json.loads(subprocess.check_output(['node','--input-type=module','-e',script]))

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            stroke = int(parse_qs(urlparse(self.path).query).get('stroke',['8'])[0])
            assert 1 <= stroke <= 8
            domestic = r.base.renderer.dictionary_svg('芭', stroke, True, 'domestic'+str(stroke))
            body = ('<!doctype html><meta charset="utf-8"><title>芭 progressive review</title>'
                '<style>body{font:16px system-ui;margin:20px;width:960px}svg{width:300px;height:300px}.pair{display:flex;gap:30px}.samples{display:flex;flex-wrap:wrap}.samples svg{width:170px;height:170px}button,a,input{margin:8px}</style>'
                '<h1>芭 · '+str(stroke)+'/8</h1><p>국내 사전 방향(왼쪽), 원본 윤곽 순차 재생(오른쪽)</p>'
                + ''.join(f'<a href="?stroke={n}">{n}획</a>' for n in range(1,9))
                + '<div class="pair">'+domestic+'<div id="candidate"></div></div>'
                + '<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0"><output id="value">0%</output><div class="samples" id="samples"></div>'
                + '<p>Private dictionary graphics are RAM-only. Candidate: pinned GlyphWiki-derived outlines; not yet runtime approved.</p>'
                + '<script>const strokes='+json.dumps(compiled['strokes'])+';const stroke='+str(stroke)+';const render='+compiled['render']+';'
                + "const show=p=>{candidate.innerHTML=render(strokes,stroke,p,'live');progress.value=p*100;value.textContent=Math.round(p*100)+'%'};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/1600);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};"
                + "[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+='<div>'+Math.round(p*100)+'%'+render(strokes,stroke,p,'sample'+i)+'</div>'});show(0);</script>").encode()
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc: self.send_error(500,str(exc))

if __name__ == '__main__':
    print(json.dumps({'port':51897,'pid':os.getpid(),'strokes':len(compiled['strokes'])}),flush=True)
    ThreadingHTTPServer(('127.0.0.1',51897),Handler).serve_forever()
