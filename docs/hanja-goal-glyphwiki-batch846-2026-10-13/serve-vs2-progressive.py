import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent / 'serve-progressive.py'
source = reference.read_text()
source = source.replace("source.replace('u7f9c', 'u8343')", "source.replace('u7f9c', 'u8343-ue0102')")
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u8343.json')", "assert.equal(sourceProofFile,'engine-whole-u8343-ue0102.json')")
source = source.replace("assert.equal(sourceProofFile,'./engine-whole-u8343.json')", "assert.equal(sourceProofFile,'./engine-whole-u8343-ue0102.json')")
source = source.replace("assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);const proof=selected;", "assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);assert.equal(identity.sourceArchiveSHA256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const proof=selected;")
source = source.replace("'64747'", "'64753'")
source = source.replace("exec(compile(source,", "source = source.replace(\"(HERE/'progressive.mjs')\", \"(HERE/'candidate-progressive-vs2.mjs')\")\nexec(compile(source,")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
