import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path("/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch775-2026-10-13")
ROOT=HERE.parent.parent
metadata_all=[]
variants={}
for b in range(775,805):
 d=ROOT/'docs'/('hanja-goal-glyphwiki-batch'+str(b)+'-2026-10-13')
 m=json.loads((d/'metadata.json').read_text())
 s=json.loads((d/'sources.json').read_text())
 metadata_all.append((m,s))
 for n in s['wholeNames']:variants[n]=json.loads((d/('engine-whole-'+n+'.json')).read_text())
names=list(variants)
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[]
for m,s in metadata_all:
 for n in s['wholeNames']:r.ENTRIES.append({'glyph':m['glyph'],'id':n,'dictionaryStrokes':m['dictionaryStrokes'],'dictionary':m['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]})
for m,s in metadata_all:r.base.renderer.ENTRIES[m['glyph']]={'strokes':m['dictionaryStrokes'],'dictionary':m['dictionary']}
def candidate(entry,end=None):
 groups=variants[entry['id']]['groups']
 if end is not None:groups=groups[:end]
 polygons=[p for g in groups for p in g['polygons']]
 assert all(v['off']==0 for p in polygons for v in p)
 return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right exact complete original whole; no trajectory approved').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; original source polygons. Engine implementation not embedded.')
exec(handler,r.__dict__)
class FamilyHandler(r.Handler):
 def do_GET(self):
  q=r.parse_qs(r.urlparse(self.path).query)
  if 'family' not in q:return super().do_GET()
  try:
   family=q['family'][0]
   m,s=next((m,s) for m,s in metadata_all if m['candidate']['id']==family)
   glyph=m['glyph']
   parts=['<!doctype html><meta charset="utf-8"><style>body{margin:8px;width:744px;font:14px sans-serif}.grid{display:grid;grid-template-columns:repeat(3,248px)}svg{width:236px;height:236px}section{border:1px solid #ddd}h1{font-size:20px}</style>','<h1>'+glyph+' · complete original whole family</h1><div class="grid"><section><b>Domestic reference '+str(m['dictionaryStrokes'])+' strokes</b>'+r.base.full_dictionary(glyph)+'</section>']
   for n in s['wholeNames']:
    entry=next(e for e in r.ENTRIES if e['id']==n)
    parts.append('<section><b>'+n+'</b>'+candidate(entry)+'</section>')
   parts.append('</div><p>Original whole polygons only. No trajectory approved. Domestic source graphics RAM-only.</p>')
   body=''.join(parts).encode()
   self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
  except Exception as exc:self.send_error(500,str(exc))
r.Handler=FamilyHandler
print(json.dumps({'port':65467,'pid':os.getpid(),'wholeVariants':len(names)}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',65467),r.Handler).serve_forever()
