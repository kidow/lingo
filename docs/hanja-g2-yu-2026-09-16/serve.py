#!/usr/bin/env python3
"""RAM-only comparison of 庾 eleven- and twelve-stroke references."""
import sys
sys.dont_write_bytecode=True
import importlib.util, json, urllib.parse, hashlib
from pathlib import Path
from http.server import ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    value=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value
renderer=module('yu_renderer',HERE.parent/'hanja-g2-batch10-2026-09-16/serve.py')
renderer.HERE=HERE
renderer.DATA=json.loads((HERE/'originals.json').read_text())
renderer.ENTRIES={e['glyph']:{**e,'strokes':e['dictionaryStrokes']} for e in renderer.DATA['entries']}
moe=module('yu_moe_decoder',HERE.parent/'hanja-g2-yu-zhen-2026-09-16/serve.py')
moe.PINS={'庾':{"glyph":"庾","url":"https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=24254&la=0","status":200,"pageBytes":29987,"pageSha256":"0c5d369dfdce8cf38ae99cc65862b58afc13fc249feef6ac42fb24ca866a19eb","embeddedXmlBytes":18154,"embeddedXmlSha256":"a6564fbd9a0e44c59348357562946a1c2ff4adf33d714d987736a286c569029e","unicode":"庾","strokes":11}}
moe.MOE={}
STYLE='<!doctype html><meta charset="utf-8"><style>body{zoom:2;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>'
def app_svg():
    raw=(HERE.parents[1]/'public/hanja/u5ebe.svg').read_bytes()
    assert hashlib.sha256(raw).hexdigest()=='b06432d9b38725284fc11d9c33802cc148c6660b7cc3003135a02f30bf9f82b1', 'Static glyph changed; re-review required'
    return raw.decode()
class Handler(renderer.Handler):
    def do_GET(self):
        try:
            q=urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            paths=renderer.DATA['entries'][0]['paths']
            source=q.get('source',['dictionary'])[0]
            if self.path.startswith('/metadata'):
                data=renderer.source('庾')
                body=json.dumps({'glyph':'庾','dictionary':renderer.ENTRIES['庾']['dictionary'],'transform':data['transform'],
                    'strokes':[{k:v for k,v in s.items() if k not in ('outline','animated')} for s in data['strokes']]},ensure_ascii=False).encode()
                mime='application/json'
            elif self.path.startswith('/forms'):
                body=(STYLE+'<h1>庾 forms: app / candidate; dictionary 12 / MOE 11</h1><div class="grid"><section><div class="pair">'+app_svg()+renderer.candidate_svg(paths,11)+'</div></section><section><div class="pair">'+renderer.dictionary_svg('庾',12,True,'full')+moe.moe_svg('庾',11)+'</div></section></div>').encode()
                mime='text/html; charset=utf-8'
            else:
                start,end=int(q.get('start',['1'])[0]),int(q.get('end',['12' if source=='dictionary' else '11'])[0])
                count=12 if source=='dictionary' else 11
                parts=[STYLE,'<h1>庾 / '+source+' '+str(count)+' / MM candidate 11</h1><p>Source left; candidate right. Positional comparison only: matching row numbers do not establish stroke correspondence. Blue → green → orange → red.</p><div class="grid">']
                for n in range(start,min(end,count)+1):
                    reference=renderer.dictionary_svg('庾',n,True,'s'+str(n)) if source=='dictionary' else moe.moe_svg('庾',n)
                    candidate=renderer.candidate_svg(paths,n) if n<=11 else '<svg viewBox="0 0 100 100"><text x="5" y="50" font-size="8">No candidate stroke 12</text></svg>'
                    parts.append('<section><b>Source '+str(n)+' / candidate '+str(n if n<=11 else '—')+'</b><div class="pair">'+reference+candidate+'</div></section>')
                body=(''.join(parts)+'</div>').encode()
                mime='text/html; charset=utf-8'
            self.send_response(200)
        except Exception as error:
            body,mime=str(error).encode(),'text/plain'
            self.send_response(500)
        self.send_header('Content-Type',mime)
        self.send_header('Cache-Control','no-store')
        self.send_header('Content-Length',str(len(body)))
        self.end_headers()
        self.wfile.write(body)
if __name__=='__main__':
    print('Yu 庾 review http://127.0.0.1:51746',flush=True)
    ThreadingHTTPServer(('127.0.0.1',51746),Handler).serve_forever()
