import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u568c').replace('羜', '嚌')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b861_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256,selectedProofIdentity}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u568c.json')", "assert.equal(sourceProofFile,'engine-whole-u568c.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'0fb793d710713d24757c82f0ba9494beb5d025d43ceb10ede0a0dfd7ecc6535d');const identity=selectedProofIdentity;assert.equal(identity.sourceRoot,sourceRoot);assert.equal(identity.sourceProofFile,sourceProofFile);assert.equal(identity.sourceProofFileSHA256,sourceProofFileSHA256);const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};")
source = source.replace('compileProgressive(proof.trace,proof,identity)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'strokes': 11", "'strokes': 10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 10"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 10'),
    ('/11</h1>', '/10</h1>'),
    ('range(1,12)', 'range(1,11)'),
    ('64555', '64761'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':17").replace("'strokes':12", "'strokes':17").replace("'strokes': 12", "'strokes': 17").replace('strokes.length,12', 'strokes.length,17').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==17").replace("len(result['strokes']) == 12", "len(result['strokes']) == 17").replace('1<=left<=12 and 1<=right<=12', '1<=left<=17 and 1<=right<=17').replace("'candidatePens':12", "'candidatePens':17").replace('stroke <= 12', 'stroke <= 17').replace('/12</h1>', '/17</h1>').replace('range(1,13)', 'range(1,18)').replace('전12', '전17')
source = source.replace('const strokes=compileProgressive(proof.trace,proof);', 'const strokes=compileProgressive(proof.trace,proof,identity);')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
