import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', "names=[\"u799b-g\",\"u799b-ue0102\"]\nWHOLE_PINS={\"u799b\":\"53c4994bda1cd33d01ce316181ef12833f5016342ace4db1b0b52aadbd6e2165\",\"u799b-g\":\"7add4bee1d201f76040ab7c00b733d55dfd97283d1d67408d96caa5847e97f58\",\"u799b-ue0100\":\"08f798d3efe9bee96933ec40d60b11cbae798eaf929b126b817f3d85a5b02f22\",\"u799b-ue0101\":\"57bc28fe14636632ed86079032a6069c8fdbb000be4aceef123b05f611af99b7\",\"u799b-ue0102\":\"7fdd497381111c8985e1b97a05dbb3e635e540fd3b8c51cfeb29d346fb11f563\",\"u799b-ue0103\":\"64422b80d9b8544cd4902ac66b0770f36956b814a7ad4b55034eb7968cab9217\"}\nINCOMPLETE={\"u799b\":[\"u76ee-j\"],\"u799b-ue0100\":[\"u76ee-j\"],\"u799b-ue0101\":[\"u76ee-j\"],\"u799b-ue0103\":[\"u76ee-j\"]}")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u799b-g').replace('羜', '禛').replace('a836_review', 'b893_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceWholeFileSHA256 as sourceProofFileSHA256,sourceGroups}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u799b-g.json')", "assert.equal(sourceProofFile,'engine-whole-u799b-g.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');assert.equal(createHash('sha256').update(readFileSync(new URL('engine-proof.json','{module}'))).digest('hex'),'301862448cc18378787df5a016e63509e62d141c0de5835bfce2c9b2b6040849');const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};")
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
    ('64554', '64780'),
]:
    source = source.replace(before, after)
source = source.replace("'dictionaryStrokes':10", "'dictionaryStrokes':12").replace("'strokes':10", "'strokes':12").replace("'strokes': 10", "'strokes': 12").replace('strokes.length,10', 'strokes.length,12').replace("len(compiled['strokes'])==10", "len(compiled['strokes'])==12").replace("len(result['strokes']) == 10", "len(result['strokes']) == 12").replace('1<=left<=10 and 1<=right<=10', '1<=left<=12 and 1<=right<=12').replace("'candidatePens':10", "'candidatePens':12").replace('stroke <= 10', 'stroke <= 12').replace('/10</h1>', '/12</h1>').replace('range(1,11)', 'range(1,13)').replace('전10', '전12')
source = source.replace('            assert root in names', "            if root in INCOMPLETE:\n                status={'root':root,'sourceComplete':False,'geometry':None,'missingDependencies':INCOMPLETE[root],'partialProofIgnored':True,'nativeApproval':False}\n                if q.get('view')==['checks']:\n                    body=json.dumps(status).encode();mime='application/json'\n                else:\n                    body=('<!doctype html><meta charset=\"utf-8\"><title>禛 missing whole</title><h1>'+html.escape(root)+'</h1><p>고정 u76ee-j 누락. geometry=null이며 확보된 g/VS2를 이 root의 원본으로 대체하지 않습니다.</p><a href=\"?id=u799b-g\">g 원본</a>').encode();mime='text/html; charset=utf-8'\n                self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body);return\n            assert root in names")
source = source.replace('            if pairs:', "            parts += ['<p>기본/VS0/VS1/VS3 누락 geometry=null: <a href=\"?id=u799b\">기본</a> <a href=\"?id=u799b-ue0100\">VS0</a> <a href=\"?id=u799b-ue0101\">VS1</a> <a href=\"?id=u799b-ue0103\">VS3</a></p>']\n            if pairs:")
source = source.replace("'dictionaryStrokes':12", "'dictionaryStrokes':15").replace("'strokes':12", "'strokes':15").replace("'strokes': 12", "'strokes': 15").replace('strokes.length,12', 'strokes.length,15').replace("len(compiled['strokes'])==12", "len(compiled['strokes'])==15").replace("len(result['strokes']) == 12", "len(result['strokes']) == 15").replace('1<=left<=12 and 1<=right<=12', '1<=left<=15 and 1<=right<=15').replace("'candidatePens':12", "'candidatePens':15").replace('stroke <= 12', 'stroke <= 15').replace('/12</h1>', '/15</h1>').replace('range(1,13)', 'range(1,16)').replace('전12', '전15')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
