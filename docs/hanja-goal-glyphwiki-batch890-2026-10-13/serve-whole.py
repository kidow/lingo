import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', "names=[\"u86b3\",\"u86b3-ue0100\"]\nWHOLE_PINS={\"u86b3\":\"67d19876a451ded3d1b1257e57b16fab1551097a14fc6848e488af274270eb16\",\"u86b3-ue0100\":\"67d19876a451ded3d1b1257e57b16fab1551097a14fc6848e488af274270eb16\"}")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u86b3').replace('羜', '蚳').replace('a836_review', 'b890_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256,sourceGroups}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u86b3.json')", "assert.equal(sourceProofFile,'engine-whole-u86b3.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'480f607c5d5a30836e0b6fc7f1dd09050a85e7f1dd52975cf6c528d7a7412c69');const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};")
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
    ('64554', '64778'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':11").replace("'strokes':12", "'strokes':11").replace("'strokes': 12", "'strokes': 11").replace('strokes.length,12', 'strokes.length,11').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==11").replace("len(result['strokes']) == 12", "len(result['strokes']) == 11").replace('1<=left<=12 and 1<=right<=12', '1<=left<=11 and 1<=right<=11').replace("'candidatePens':12", "'candidatePens':11").replace('stroke <= 12', 'stroke <= 11').replace('/12</h1>', '/11</h1>').replace('range(1,13)', 'range(1,12)').replace('전12', '전11')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
