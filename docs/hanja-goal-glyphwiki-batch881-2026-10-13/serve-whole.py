import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', "names=[\"u71fd\",\"u71fd-ue0100\",\"u71fd-ue0101\"]\nWHOLE_PINS={\"u71fd\":\"72f699b2552b88b49a662ec6e79084b8da7c0adf483840dae041d4eef01d32a1\",\"u71fd-ue0100\":\"2a95de9084a589cff2e80fb173edd4f651a1dda4f9263b64518f4f09f5217893\",\"u71fd-ue0101\":\"830a1406e48476fa4e2ff26061f453be0dcbcb40844a42ac49137da80d7d6ae7\"}")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u71fd').replace('羜', '燽').replace('a836_review', 'b881_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceProofFileSha256 as sourceProofFileSHA256,sourceGroups,selectedProofIdentity}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u71fd.json')", "assert.equal(sourceProofFile,'engine-whole-u71fd.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'72f699b2552b88b49a662ec6e79084b8da7c0adf483840dae041d4eef01d32a1');const identity=selectedProofIdentity;assert.equal(identity.sourceRoot,sourceRoot);assert.equal(identity.sourceProofFile,sourceProofFile);assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);const proof=selected;")
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
    ('64554', '64772'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u71fd.json')", "assert.equal(sourceProofFile,'./engine-whole-u71fd.json')")
source = source.replace('const strokes=compileProgressive(proof.trace,proof);', 'const strokes=compileProgressive(proof.trace,proof,identity);')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':18").replace("'strokes':12", "'strokes':18").replace("'strokes': 12", "'strokes': 18").replace('strokes.length,12', 'strokes.length,18').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==18").replace("len(result['strokes']) == 12", "len(result['strokes']) == 18").replace('1<=left<=12 and 1<=right<=12', '1<=left<=18 and 1<=right<=18').replace("'candidatePens':12", "'candidatePens':18").replace('stroke <= 12', 'stroke <= 18').replace('/12</h1>', '/18</h1>').replace('range(1,13)', 'range(1,19)').replace('전12', '전18')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
