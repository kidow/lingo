import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path("/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch765-2026-10-13")
ROOT=HERE.parent.parent
datasets=[]
variants={}
for batch in range(765,775):
 folder=ROOT/'docs'/('hanja-goal-glyphwiki-batch'+str(batch)+'-2026-10-13')
 metadata=json.loads((folder/'metadata.json').read_text())
 names=json.loads((folder/'sources.json').read_text())['wholeNames']
 datasets.append((metadata,names))
 for n in names:variants[n]=json.loads((folder/('engine-whole-'+n+'.json')).read_text())
names=list(variants)
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[]
for metadata,whole_names in datasets:
 glyph=metadata['glyph']
 count=metadata['dictionaryStrokes']
 for n in whole_names:r.ENTRIES.append({'glyph':glyph,'id':n,'dictionaryStrokes':count,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]})
 r.base.renderer.ENTRIES[glyph]={'strokes':count,'dictionary':metadata['dictionary']}
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
print(json.dumps({'port':65457,'pid':os.getpid(),'wholeVariants':len(names)}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',65457),r.Handler).serve_forever()
