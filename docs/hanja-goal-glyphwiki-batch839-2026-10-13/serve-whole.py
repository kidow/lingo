import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', 'names=["u82f4","u82f4-k","u82f4-ue0100","u82f4-ue0101","u82f4-ue0102"]\nWHOLE_PINS={"u82f4":"132fb2f913d1669d86398de186d22f0bd0ba8a33eae5a1ac89b74b87c059fd73","u82f4-k":"6a44c12ae4385f0883c154cd8c874b2f5f05e26d89ea93050d1696d653c0136f","u82f4-ue0100":"132fb2f913d1669d86398de186d22f0bd0ba8a33eae5a1ac89b74b87c059fd73","u82f4-ue0101":"132fb2f913d1669d86398de186d22f0bd0ba8a33eae5a1ac89b74b87c059fd73","u82f4-ue0102":"c01c4002c86c1c0c245be6743e1db02f3ba0c73e39ccbb3e845bb5de7bf51df0"}')
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u82f4-k').replace('羜', '苴').replace('a836_review', 'b839_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceProofFileSHA256,sourceGroups,wholeSourceIdentities}}from')
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=wholeSourceIdentities[sourceRoot];assert(identity);assert.equal(identity.file,sourceProofFile);assert.equal(identity.fileSHA256,sourceProofFileSHA256);const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile,sourceProofFileSHA256:identity.fileSHA256,sourceArchiveSHA256:identity.archiveSHA256}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'dictionaryStrokes':11", "'dictionaryStrokes':9"),
    ("'strokes':11", "'strokes':9"),
    ('strokes.length,11', 'strokes.length,9'),
    ("len(compiled['strokes'])==11", "len(compiled['strokes'])==9"),
    ('1<=left<=11 and 1<=right<=11', '1<=left<=9 and 1<=right<=9'),
    ("'candidatePens':11", "'candidatePens':9"),
    ('range(1,12)', 'range(1,10)'),
    ('전11', '전9'),
    ('raw12개는 compiled pen 순서가 아닙니다.', '선택된 전체 원본raw경계는 국내pen순서로 승인되지 않았습니다.'),
    ('64554', '64648'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
