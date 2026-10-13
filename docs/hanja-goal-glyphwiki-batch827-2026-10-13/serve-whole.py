import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,hashlib
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
names=["u80cf","u80cf-ue0100"]
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
assert hashlib.sha256((HERE/'engine-whole-u80cf.json').read_bytes()).hexdigest()=='da46c90b54351faf3c8480c4568be78421462a379a062ec53e7935258ec02b0c'
spec=importlib.util.spec_from_file_location('a827_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'胏','id':n,'dictionaryStrokes':9,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['胏']={'strokes':9,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
    groups=variants[entry['id']]['groups']
    if end is not None:groups=groups[:end]
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right exact fixed complete original whole; order remains unapproved').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; immutable original polygons. No native approval from copying.')
exec(handler,r.__dict__)
print(json.dumps({'port':64544,'pid':os.getpid(),'wholeVariants':len(names),'nativeApproved':False}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',64544),r.Handler).serve_forever()
