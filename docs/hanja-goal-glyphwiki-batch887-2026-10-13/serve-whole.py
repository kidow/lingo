import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', "names=[\"u9a2d\",\"u9a2d-ue0100\",\"u9a2d-ue0101\",\"u9a2d-ue0102\"]\nWHOLE_PINS={\"u9a2d\":\"c329408d8eb6329c36d4b5ba37ae010161e118b3e33c1235aeace5d9962a278a\",\"u9a2d-ue0100\":\"c329408d8eb6329c36d4b5ba37ae010161e118b3e33c1235aeace5d9962a278a\",\"u9a2d-ue0101\":\"c329408d8eb6329c36d4b5ba37ae010161e118b3e33c1235aeace5d9962a278a\",\"u9a2d-ue0102\":\"661103c9e9a4e4f1a15eaa982b9e8ba9ae5b647c467c14fe71678cf59a21f8f9\"}")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u9a2d-ue0102').replace('羜', '騭').replace('a836_review', 'b887_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256,sourceGroups}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u9a2d-ue0102.json')", "assert.equal(sourceProofFile,'engine-whole-u9a2d-ue0102.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'23b29e6c792a549d354e261f416e61668ce9dc1de86819118250c2c366ff1063');const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof)')
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
    ('64554', '64776'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace('Private dictionary graphics are RAM-only.', 'NONCONSECUTIVE raw12/17/18 numerical grouping is unapproved and cannot be applied. Private dictionary graphics are RAM-only.')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':20").replace("'strokes':12", "'strokes':20").replace("'strokes': 12", "'strokes': 20").replace('strokes.length,12', 'strokes.length,20').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==20").replace("len(result['strokes']) == 12", "len(result['strokes']) == 20").replace('1<=left<=12 and 1<=right<=12', '1<=left<=20 and 1<=right<=20').replace("'candidatePens':12", "'candidatePens':20").replace('stroke <= 12', 'stroke <= 20').replace('/12</h1>', '/20</h1>').replace('range(1,13)', 'range(1,21)').replace('전12', '전20')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
