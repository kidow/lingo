import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u8e16').replace('羜', '踖')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b842_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceProofFileSHA256,wholeSourceIdentities}}from')
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=wholeSourceIdentities[sourceRoot];assert(identity);assert.equal(identity.file,sourceProofFile);assert.equal(identity.fileSHA256,sourceProofFileSHA256);const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile,sourceProofFileSHA256:identity.fileSHA256,sourceArchiveSHA256:identity.archiveSHA256}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'strokes': 11", "'strokes': 15"),
    ('strokes.length,11', 'strokes.length,15'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 15"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 15'),
    ('/11</h1>', '/15</h1>'),
    ('range(1,12)', 'range(1,16)'),
    ('64555', '64655'),
]:
    source = source.replace(before, after)
source = source.replace("const identity=wholeSourceIdentities[sourceRoot];", "assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'71b57bffc048d1c9eac5401057cbfd0e10553fc1f1190bfff66841c40fbb09a7');const identity=wholeSourceIdentities[sourceRoot];")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
