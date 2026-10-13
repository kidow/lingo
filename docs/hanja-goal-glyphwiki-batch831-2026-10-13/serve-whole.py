import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,hashlib,subprocess
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
names=["u93d8","u93d8-ue0100"]
expected="b3f64446c3c4ba7b6db7094546ffc9a7886e685cdfb82096e5cb5ad347d56ba5"
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
for n in names:
    assert hashlib.sha256((HERE/('engine-whole-'+n+'.json')).read_bytes()).hexdigest()==expected
spec=importlib.util.spec_from_file_location('a831_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'鏘','id':n,'dictionaryStrokes':19,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(19)]} for n in names]
r.base.renderer.ENTRIES['鏘']={'strokes':19,'dictionary':metadata['dictionary']}
module=(HERE/'progressive.mjs').as_uri()
script=f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,renderProgressive,sourceRoot,sourceProofFile,sourceWholeFileSHA256}}from'{module}';
const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(sourceRoot,'u93d8');assert.equal(sourceProofFile,'engine-whole-u93d8.json');assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceWholeFileSHA256);const selected=JSON.parse(bytes),header=JSON.parse(readFileSync(new URL('engine-proof.json','{module}')));const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};const before=JSON.stringify(proof);const strokes=compileProgressive(proof.trace,proof);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,19);
console.log(JSON.stringify({{strokes,render:renderProgressive.toString(),sourceRoot,sourceProofFile,sourceWholeFileSHA256}}));"""
def candidate(entry,end=None):
    if end is not None:
        assert entry['id']=='u93d8','Only the explicitly selected compiler has provisional candidate pen boundaries'
        compiled=json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
        masks=[mask for pen in compiled['strokes'][:end] for mask in pen]
        return '<svg viewBox="0 0 100 100"><g fill="#222">'+''.join('<path d="'+mask['outline']+'"/>' for mask in masks)+'</g></svg>'
    groups=variants[entry['id']]['groups']
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right exact fixed complete original whole; candidate pen boundaries remain unapproved').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; immutable original polygons. No native approval from copying.')
exec(handler,r.__dict__)
print(json.dumps({'port':64558,'pid':os.getpid(),'wholeVariants':len(names),'selectedSourceRoot':'u93d8','sourceWholeFileSHA256':expected,'nativeApproved':False}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',64558),r.Handler).serve_forever()
