import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u8343').replace('羜', '荃')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b846_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceProofFileSha256 as sourceProofFileSHA256,selectedProofIdentity}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u8343.json')", "assert.equal(sourceProofFile,'./engine-whole-u8343.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=selectedProofIdentity;assert.equal(identity.sourceRoot,sourceRoot);assert.equal(identity.sourceProofFile,sourceProofFile);assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);const proof=selected;")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'strokes': 11", "'strokes': 10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 10"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 10'),
    ('/11</h1>', '/10</h1>'),
    ('range(1,12)', 'range(1,11)'),
    ('64555', '64747'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
