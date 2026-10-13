import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', "names=[\"u8526\",\"u8526-ue0100\",\"u8526-ue0101\",\"u8526-ue0102\",\"u8526-var-001\"]\nWHOLE_PINS={\"u8526\":\"d1713eec57d7e0d1c2a4cacd755ef1b3c9adf5bd57b894830c735a47138b34f2\",\"u8526-ue0100\":\"c3d571673c565fe68beefba9a4b4a22ffc732a5389df1aa96d4c44a5a888334b\",\"u8526-ue0101\":\"c3d571673c565fe68beefba9a4b4a22ffc732a5389df1aa96d4c44a5a888334b\",\"u8526-ue0102\":\"14f15da2024329dca8c39662b8577e894ea21ad612efb6b4523f385825b3ffcd\",\"u8526-var-001\":\"31632d87a0797e965ee713a03493ff632f98e4374bc1c7eff80433d1b1b192ef\"}")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u8526-ue0102').replace('羜', '蔦').replace('a836_review', 'b872_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256,sourceGroups}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u8526-ue0102.json')", "assert.equal(sourceProofFile,'engine-whole-u8526-ue0102.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'d1713eec57d7e0d1c2a4cacd755ef1b3c9adf5bd57b894830c735a47138b34f2');const proof=selected;")
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
    ('64554', '64766'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':15").replace("'strokes':12", "'strokes':15").replace("'strokes': 12", "'strokes': 15").replace('strokes.length,12', 'strokes.length,15').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==15").replace("len(result['strokes']) == 12", "len(result['strokes']) == 15").replace('1<=left<=12 and 1<=right<=12', '1<=left<=15 and 1<=right<=15').replace("'candidatePens':12", "'candidatePens':15").replace('stroke <= 12', 'stroke <= 15').replace('/12</h1>', '/15</h1>').replace('range(1,13)', 'range(1,16)').replace('전12', '전15')
source = source.replace('const strokes=compileProgressive(proof.trace,proof);', "assert.equal(createHash('sha256').update(readFileSync(new URL('progressive.mjs','{module}'))).digest('hex'),'baba80e2de0f064e7b65eb41fecf85de7b7473db588a2f30d0a0dcf5776e9650');const strokes=compileProgressive(proof.trace,proof);assert.deepEqual(strokes.map(p=>createHash('sha256').update(JSON.stringify(p)).digest('hex')),[\"8aace079f78fc636258df20b5eae143928ea628706202f298865c552bb77485d\",\"a88dd88de666b37e820ef61b19fcd11e57f9fd059e7dcdccb62040c8fe867536\",\"8bced53daa5f01bc45a7a3a77cc685580792215059d750bb3c6508f3582a5f84\",\"647e494ad95bddf511bfb1a6e3e42a8a8f94b3a7011f3dfd114e234e53212cd0\",\"304022f3bef390c816f9d24b6e270899b806914759541593f3915ac903147b48\",\"84ffd989043e26f6404704ec9ce8d814546907b5b0fec2ac2944cbfce5fd2270\",\"9e63598c8e62fadc126b6490d65256c645e05edbde3de552a74fe496cbdbaa13\",\"701ef26735606101a1e7c15fb46410db7cc4ecd58a95430844fdfa1b2a52fd61\",\"0ae9b02818850dd83e6b87cdaa887e020c6d50b3391073dc4bea64126bde157d\",\"85632c2e5848559fa16ce4622ea0e912a6562c34ace3ecfd44cb1e95736314fc\",\"4d9987a95cde53092473273b4cde10000b22e098abc1ede072c5d05d4e55a1f2\",\"6e73460aee4e3c5b42c685ed46bbcbb22a815425e17b95aec8b5d3d7611e728c\",\"a5d54135a77401336cac00b5ff6c74b63b940f132a60290b402bfc9b1c84e24e\",\"1e00b2d6fec2ff63c29b9dd858f1a195fb0dbee362d1c412b20515f5bab37579\",\"45c7dd919a084b2f9180c3c7f3f4e7f9c98d91a11af648eab9028d3a12cedc67\"]);")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
