import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', 'names=["u8343","u8343-ue0100","u8343-ue0101","u8343-ue0102","u8343-ue0103","u8343-ue0104"]\nWHOLE_PINS={"u8343":"08ec5ea2ee4e3c4554d5a3e2403b68321367167f22075c5ff109bcc25ad5ce1f","u8343-ue0100":"08ec5ea2ee4e3c4554d5a3e2403b68321367167f22075c5ff109bcc25ad5ce1f","u8343-ue0101":"08ec5ea2ee4e3c4554d5a3e2403b68321367167f22075c5ff109bcc25ad5ce1f","u8343-ue0102":"62d3da582e5f8415af1721244d82c4dea2c2097c44a88259822522a538026908","u8343-ue0103":"80b5d0b570bc6cf8d67c79c38181174b6e19c532474587512e1545f25b3ea867","u8343-ue0104":"7c8b1ebe841b8706e370a527f7d190a5c6ed59e670a1c635bc2a884e2ada681a"}')
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u8343').replace('羜', '荃').replace('a836_review', 'b846_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceProofFileSha256 as sourceProofFileSHA256,sourceGroups,selectedProofIdentity}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u8343.json')", "assert.equal(sourceProofFile,'./engine-whole-u8343.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=selectedProofIdentity;assert.equal(identity.sourceRoot,sourceRoot);assert.equal(identity.sourceProofFile,sourceProofFile);assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);const proof=selected;")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
for before, after in [
    ("'dictionaryStrokes':11", "'dictionaryStrokes':10"),
    ("'strokes':11", "'strokes':10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(compiled['strokes'])==11", "len(compiled['strokes'])==10"),
    ('1<=left<=11 and 1<=right<=11', '1<=left<=10 and 1<=right<=10'),
    ("'candidatePens':11", "'candidatePens':10"),
    ('range(1,12)', 'range(1,11)'),
    ('전11', '전10'),
    ('raw12개는 compiled pen 순서가 아닙니다.', '전체 원본 raw는 아직 국내 pen 대응으로 승인되지 않았습니다.'),
    ('64554', '64746'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
