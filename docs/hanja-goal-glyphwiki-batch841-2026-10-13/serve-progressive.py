import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u7c4a').replace('羜', '籊')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b841_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceProofFileSHA256,wholeSourceIdentities}}from')
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=wholeSourceIdentities[sourceRoot];assert(identity);assert.equal(identity.file,sourceProofFile);assert.equal(identity.fileSHA256,sourceProofFileSHA256);const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile,sourceProofFileSHA256:identity.fileSHA256,sourceArchiveSHA256:identity.archiveSHA256}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'strokes': 11", "'strokes': 20"),
    ('strokes.length,11', 'strokes.length,20'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 20"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 20'),
    ('/11</h1>', '/20</h1>'),
    ('range(1,12)', 'range(1,21)'),
    ('64555', '64743'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
