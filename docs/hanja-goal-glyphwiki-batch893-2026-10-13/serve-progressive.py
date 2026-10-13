import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u799b-g').replace('羜', '禛')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b893_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u799b-g.json')", "assert.equal(sourceProofFile,'engine-whole-u799b-g.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'301862448cc18378787df5a016e63509e62d141c0de5835bfce2c9b2b6040849');const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof)')
for before, after in [
    ("'strokes': 11", "'strokes': 10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 10"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 10'),
    ('/11</h1>', '/10</h1>'),
    ('range(1,12)', 'range(1,11)'),
    ('64555', '64781'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':15").replace("'strokes':12", "'strokes':15").replace("'strokes': 12", "'strokes': 15").replace('strokes.length,12', 'strokes.length,15').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==15").replace("len(result['strokes']) == 12", "len(result['strokes']) == 15").replace('1<=left<=12 and 1<=right<=12', '1<=left<=15 and 1<=right<=15').replace("'candidatePens':12", "'candidatePens':15").replace('stroke <= 12', 'stroke <= 15').replace('/12</h1>', '/15</h1>').replace('range(1,13)', 'range(1,16)').replace('전12', '전15')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
