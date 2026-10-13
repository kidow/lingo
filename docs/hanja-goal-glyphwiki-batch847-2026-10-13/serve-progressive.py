import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u7628-g').replace('羜', '瘨')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b847_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceProofFileSha256 as sourceProofFileSHA256,selectedProofIdentity}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u7628-g.json')", "assert.equal(sourceProofFile,'./engine-whole-u7628-g.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=selectedProofIdentity;assert.equal(identity.sourceRoot,'u7628-g');assert.equal(identity.sourceProofFile,sourceProofFile);assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const proof=selected;")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'strokes': 11", "'strokes': 15"),
    ('strokes.length,11', 'strokes.length,15'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 15"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 15'),
    ('/11</h1>', '/15</h1>'),
    ('range(1,12)', 'range(1,16)'),
    ('64555', '64749'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
