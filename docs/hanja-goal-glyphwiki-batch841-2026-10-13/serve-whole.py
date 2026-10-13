import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', 'names=["u7c4a","u7c4a-ue0100"]\nWHOLE_PINS={"u7c4a":"3feae12a92a83caca41444970dc0318b1618424528004732b53de540e892b005","u7c4a-ue0100":"644dab4e44d9725f473925d7249f10bcf5f28a3055bfe1adea23ca68c3f549c3"}')
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u7c4a').replace('羜', '籊').replace('a836_review', 'b841_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceProofFileSHA256,sourceGroups,wholeSourceIdentities}}from')
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=wholeSourceIdentities[sourceRoot];assert(identity);assert.equal(identity.file,sourceProofFile);assert.equal(identity.fileSHA256,sourceProofFileSHA256);const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile,sourceProofFileSHA256:identity.fileSHA256,sourceArchiveSHA256:identity.archiveSHA256}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'dictionaryStrokes':11", "'dictionaryStrokes':20"),
    ("'strokes':11", "'strokes':20"),
    ('strokes.length,11', 'strokes.length,20'),
    ("len(compiled['strokes'])==11", "len(compiled['strokes'])==20"),
    ('1<=left<=11 and 1<=right<=11', '1<=left<=20 and 1<=right<=20'),
    ("'candidatePens':11", "'candidatePens':20"),
    ('range(1,12)', 'range(1,21)'),
    ('전11', '전20'),
    ('raw12개는 compiled pen 순서가 아닙니다.', '선택된 전체 원본raw경계는 국내pen순서로 승인되지 않았습니다.'),
    ('64554', '64742'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
