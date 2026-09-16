#!/usr/bin/env python3
"""RAM-only source comparison. Candidate geometry never implies stroke approval."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json, re, hashlib, urllib.request, urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path
from http.server import ThreadingHTTPServer
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('yu_zhen_renderer', HERE.parent/'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.HERE = HERE
renderer.DATA = json.loads((HERE/'originals.json').read_text())
renderer.ENTRIES = {e['glyph']:e for e in renderer.DATA['entries']}
TARGETS = {e['glyph']:e for e in renderer.DATA['targetCandidates']}
MOE = {}
PINS = {"祐":{"glyph":"祐","url":"https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=31056&la=0","status":200,"pageBytes":28206,"pageSha256":"a2ee00794bb5e16cdc2e1cfcbfc8a23d80d86fd53156778b579d709556696114","embeddedXmlBytes":16609,"embeddedXmlSha256":"6d8e67128a8270c380b8cccb39f152760f648b510a80e2fa7ff519310bd97728","strokes":9,"unicode":"祐"},"禎":{"glyph":"禎","url":"https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=31118&la=0","status":200,"pageBytes":32915,"pageSha256":"21d86afc9fbbd9dfeb676ef55ae9211eff83be1c96fb9ac2dd85859007dac0ba","embeddedXmlBytes":20781,"embeddedXmlSha256":"56dc6b83a88ebc0361651595d74e2c2507a62d7d799d4dda67fb77eed680da0e","strokes":13,"unicode":"禎"}}
def moe_source(glyph):
    if glyph in MOE: return MOE[glyph]
    pin=PINS[glyph]
    raw=urllib.request.urlopen(pin['url'],timeout=30).read()
    literal=re.search(r'xml\['+str(ord(glyph))+r'\]=("(?:[^"\\]|\\.)*")',raw.decode()).group(1)
    xml=json.loads(literal).encode()
    assert hashlib.sha256(xml).hexdigest()==pin['embeddedXmlSha256']
    root=ET.fromstring(xml)
    assert root.get('unicode')==glyph
    rows=[]
    for stroke in root.findall('Stroke'):
        outline=[]
        for p in stroke.find('Outline'):
            a=p.attrib
            if p.tag=='MoveTo': outline.append('M'+a['x']+' '+a['y'])
            elif p.tag=='LineTo': outline.append('L'+a['x']+' '+a['y'])
            elif p.tag=='QuadTo': outline.append('Q'+a['x1']+' '+a['y1']+' '+a['x2']+' '+a['y2'])
            else: raise ValueError('Unknown MOE command')
        outline.append('Z')
        track=' '.join(('M' if n==0 else 'L')+p.get('x')+' '+p.get('y') for n,p in enumerate(stroke.find('Track')))
        rows.append({'outline':' '.join(outline),'track':track})
    assert len(rows)==pin['strokes']
    MOE[glyph]=rows
    return rows
def moe_svg(glyph,end):
    rows=moe_source(glyph)
    pieces=['<path fill="#bbb" d="'+s['outline']+'"/>' for s in rows[:end-1]]
    s=rows[end-1]
    pieces.append('<path fill="#b42336" d="'+s['outline']+'"/>')
    pieces.append('<defs><clipPath id="m'+str(end)+'"><path d="'+s['outline']+'"/></clipPath></defs>')
    for progress,color in [(.75,'#df8800'),(.5,'#168554'),(.25,'#245ad5')]:
        pieces.append('<path d="'+s['track']+'" fill="none" clip-path="url(#m'+str(end)+')" pathLength="1" stroke="'+color+'" stroke-width="300" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="'+str(1-progress)+'"/>')
    return '<svg viewBox="0 0 2048 2048">'+''.join(pieces)+'</svg>'
def app_svg(glyph):
    pin=next(p for p in json.loads((HERE/'source-checks.json').read_text())['staticForms'] if p['glyph']==glyph)
    raw=(HERE.parents[1]/pin['path']).read_bytes()
    assert hashlib.sha256(raw).hexdigest()==pin['sha256']
    return raw.decode()
STYLE='<!doctype html><meta charset="utf-8"><style>body{zoom:2;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>'
class Handler(renderer.Handler):
    def do_GET(self):
        try:
            q=urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            glyph=q.get('glyph',['祐'])[0]
            assert glyph in TARGETS
            if self.path.startswith('/metadata'):
                data=renderer.source(glyph)
                body=json.dumps({'glyph':glyph,'dictionary':renderer.ENTRIES[glyph]['dictionary'],'transform':data['transform'],
                    'strokes':[{k:v for k,v in s.items() if k not in ('outline','animated')} for s in data['strokes']]},ensure_ascii=False).encode()
                mime='application/json'
            elif self.path.startswith('/forms'):
                parts=[STYLE,'<h1>Target app SVG / licensed compatibility candidate</h1><p>Static shape comparison only; no whole target-order approval.</p><div class="grid">']
                for g in TARGETS:
                    p=TARGETS[g]['paths']
                    parts.append('<section><b>'+g+' / '+TARGETS[g]['sourceGlyph']+'</b><div class="pair">'+app_svg(g)+renderer.candidate_svg(p,len(p))+'</div></section>')
                body=(''.join(parts)+'</div>').encode()
                mime='text/html; charset=utf-8'
            else:
                target=q.get('mode',['modern'])[0]=='target'
                paths=TARGETS[glyph]['paths'] if target else renderer.ENTRIES[glyph]['paths']
                start,end=int(q.get('start',['1'])[0]),int(q.get('end',[str(len(paths))])[0])
                source=q.get('source',['dictionary'])[0]
                parts=[STYLE,'<h1>'+glyph+' / '+('target '+str(len(paths))+' (unapproved)' if target else 'modern '+str(len(paths)))+'</h1>',
                    '<p>Left: '+('static app for 1–5; shorter-form dictionary for remaining component' if target else source)+'; right: licensed candidate. Blue → green → orange → red.</p><div class="grid">']
                for n in range(start,min(end,len(paths))+1):
                    if target:
                        reference=app_svg(glyph) if n<=5 else renderer.dictionary_svg(glyph,n-1,True,'s'+str(n))
                        label='No whole target reference' if n<=5 else 'Dictionary '+str(n-1)+' (different whole form)'
                    else:
                        reference=moe_svg(glyph,n) if source=='moe' else renderer.dictionary_svg(glyph,n,True,'s'+str(n))
                        label=source+' '+str(n)
                    parts.append('<section><b>'+str(n)+' / '+label+'</b><div class="pair">'+reference+renderer.candidate_svg(paths,n)+'</div></section>')
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
    print('Yu zhen review http://127.0.0.1:51746',flush=True)
    ThreadingHTTPServer(('127.0.0.1',51746),Handler).serve_forever()
