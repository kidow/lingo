import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u84e7-ue0102').replace('羜', '蓧')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b869_progressive_review'")
source = source.replace('sourceProofFileSHA256}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u84e7-ue0102.json')", "assert.equal(sourceProofFile,'engine-whole-u84e7-ue0102.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'b2eb5d616a8041056cc4bbfb251af5385fc302cdd8f6076e7ea6560395348abb');const proof=selected;")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof)')
for before, after in [
    ("'strokes': 11", "'strokes': 10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 10"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 10'),
    ('/11</h1>', '/10</h1>'),
    ('range(1,12)', 'range(1,11)'),
    ('64555', '64763'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':15").replace("'strokes':12", "'strokes':15").replace("'strokes': 12", "'strokes': 15").replace('strokes.length,12', 'strokes.length,15').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==15").replace("len(result['strokes']) == 12", "len(result['strokes']) == 15").replace('1<=left<=12 and 1<=right<=12', '1<=left<=15 and 1<=right<=15').replace("'candidatePens':12", "'candidatePens':15").replace('stroke <= 12', 'stroke <= 15').replace('/12</h1>', '/15</h1>').replace('range(1,13)', 'range(1,16)').replace('전12', '전15')
source = source.replace('const strokes=compileProgressive(proof.trace,proof);', "assert.equal(createHash('sha256').update(readFileSync(new URL('progressive.mjs','{module}'))).digest('hex'),'362ee2c88fa072019d58492636d63c9c913f145c92a176011a95a9507cb2661a');const strokes=compileProgressive(proof.trace,proof);assert.deepEqual(strokes.map(p=>createHash('sha256').update(JSON.stringify(p)).digest('hex')),[\"9b3e8d3d52d841e281e7ed5af83a547796b3e22be955e45e9974e2d96c5ae4c7\",\"56fd5cddb051862d399a0352cbf5af078f90717188669e0fe9eba348ed77b5cd\",\"593174cbcccd0af9ed0c8d477ae7b59af70f499536386c952aaa908963aade49\",\"a8b492904d54b2125a3c2913301702bbcf8f46eb312b5c02fbc23a5803eaa953\",\"11c18e6fb910d8c585b36f45b218747c54688e384e45439a7cfa6bcd2949d43e\",\"ca0706f60cc3118628688d1eabe5499366765bcbe45394214a724251fa54c2f5\",\"979b6772ad4f807ee7a23457b4dc91372beb7823fcca5114065a76a3eed4b8c4\",\"bc60928405a0a5ad754636d9279e2e299778063113690d3eb8e1f447f9ccaf7c\",\"77a2faee63ab3d30eadc3ffb585e67bd84dd4d52ba91979878460110c818cbc5\",\"183f71243d1016a2220abaa46b0380c30b2f28d1ba6cd1ac5a284bb6ad853a2b\",\"2d844e8143e133c1b85d944ebdf5b1235525a1930a75ca52cadbc7e411c76859\",\"a2e311821d9b2207fd7b4d7958dc42245c3068b819ad6a0bd609af8c261e2ff0\",\"be3ff7a325ae70a6bfdcab32ecd6d4576145cc8ef8e428135c668826d0425df6\",\"f498be3c7080c1cc37a5a841306b6b0b502c0dbe18f2ebf560c2c437dcaabac0\",\"4bf58ee3735cb6f396092492377adbe28510cde12ec2f80314c7d639cab2fc2b\"]);")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
