import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', 'names=["u8e16","u8e16-ue0100"]\nWHOLE_PINS={"u8e16":"9bcb83105ac481134d2fa86ab1123dc6e243400d5bcbf8b842486040158a98b8","u8e16-ue0100":"e2d925f66ded879cafcfd4cabdfb1a0a7dc0dc888e096ac5db10a54b571b0cfc"}')
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u8e16').replace('羜', '踖').replace('a836_review', 'b842_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceProofFileSHA256,sourceGroups,wholeSourceIdentities}}from')
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=wholeSourceIdentities[sourceRoot];assert(identity);assert.equal(identity.file,sourceProofFile);assert.equal(identity.fileSHA256,sourceProofFileSHA256);const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile,sourceProofFileSHA256:identity.fileSHA256,sourceArchiveSHA256:identity.archiveSHA256}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'dictionaryStrokes':11", "'dictionaryStrokes':15"),
    ("'strokes':11", "'strokes':15"),
    ('strokes.length,11', 'strokes.length,15'),
    ("len(compiled['strokes'])==11", "len(compiled['strokes'])==15"),
    ('1<=left<=11 and 1<=right<=11', '1<=left<=15 and 1<=right<=15'),
    ("'candidatePens':11", "'candidatePens':15"),
    ('range(1,12)', 'range(1,16)'),
    ('전11', '전15'),
    ('raw12개는 compiled pen 순서가 아닙니다.', '선택된 전체 원본raw경계는 국내pen순서로 승인되지 않았습니다.'),
    ('64554', '64654'),
]:
    source = source.replace(before, after)
source = source.replace("const identity=wholeSourceIdentities[sourceRoot];", "assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'71b57bffc048d1c9eac5401057cbfd0e10553fc1f1190bfff66841c40fbb09a7');const identity=wholeSourceIdentities[sourceRoot];")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
