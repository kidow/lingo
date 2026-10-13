import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path("/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch816-2026-10-13")
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
names=["u798b","u798b-g","u798b-ue0100","u798b-ue0101","u798b-ue0102"]
import base64,gzip
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'禋','id':n,'dictionaryStrokes':14,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['禋']={'strokes':14,'dictionary':metadata['dictionary']}
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
print(json.dumps({'port':64512,'pid':os.getpid(),'wholeVariants':len(names)}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',64512),r.Handler).serve_forever()
