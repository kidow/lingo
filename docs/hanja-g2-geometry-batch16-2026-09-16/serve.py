#!/usr/bin/env python3
"""Local-only, RAM-only source review. Never save proprietary source art."""
import sys
sys.dont_write_bytecode=True
import importlib.util,json,urllib.parse
from pathlib import Path
from http.server import ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('gb14_renderer',HERE.parent/'hanja-g2-batch10-2026-09-16/serve.py')
renderer=importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.HERE=HERE
renderer.DATA=json.loads((HERE/'originals.json').read_text())
renderer.ENTRIES={e['glyph']:{**e,'strokes':e['dictionaryStrokes']} for e in renderer.DATA['entries']}
STYLE='<!doctype html><meta charset="utf-8"><style>body{zoom:1;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>'
class Handler(renderer.Handler):
    def do_GET(self):
        try:
            q=urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            index=int(q.get('i',['0'])[0])
            entry=renderer.DATA['entries'][index]
            glyph=entry['glyph']
            corrected=q.get('corrected',['0'])[0]=='1'
            paths=renderer.candidate_paths(glyph,corrected)
            if self.path.startswith('/metadata'):
                data=renderer.source(glyph)
                body=json.dumps({'glyph':glyph,'dictionary':entry['dictionary'],'transform':data['transform'],
                    'strokes':[{k:v for k,v in s.items() if k not in ('outline','animated')} for s in data['strokes']]},ensure_ascii=False).encode()
                mime='application/json'
            else:
                start,end=int(q.get('start',['1'])[0]),int(q.get('end',['4'])[0])
                parts=[STYLE,'<h1>'+glyph+' / dictionary '+str(entry['dictionaryStrokes'])+' / candidate '+str(len(paths))+(' corrected' if corrected else ' original')+'</h1><p>Source left; candidate right. Same row number is only positional until the whole sequence is reviewed. Blue → green → orange → red.</p><div class="grid">']
                for n in range(start,min(end,entry['dictionaryStrokes'])+1):
                    reference=renderer.dictionary_svg(glyph,n,True,str(index)+'-'+str(n))
                    candidate=renderer.candidate_svg(paths,n) if n<=len(paths) else '<svg viewBox="0 0 100 100"><text x="5" y="50" font-size="8">No candidate stroke</text></svg>'
                    parts.append('<section><b>Stroke '+str(n)+'</b><div class="pair">'+reference+candidate+'</div></section>')
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
    print('G2 geometry batch 16 review http://127.0.0.1:51746',flush=True)
    ThreadingHTTPServer(('127.0.0.1',51746),Handler).serve_forever()
