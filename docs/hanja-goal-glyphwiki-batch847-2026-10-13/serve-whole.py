import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('names=["u7f9c","u7f9c-ue0100"]', 'names=["u7628-g"]\nWHOLE_PINS={"u7628-g":"30e70a268c0c5ffdacac81e6713c9c4b9a1e7d2ebc695e9fe2977b36e5f0e029","u7628":"e36ff2060994f013b1b980aabf7701dd620055890f8a450049137c3fd97b8071","u7628-ue0100":"e36ff2060994f013b1b980aabf7701dd620055890f8a450049137c3fd97b8071"}\nINCOMPLETE={"u7628":["u76ee-j"],"u7628-ue0100":["u76ee-j"]}')
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin")
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u7f9c-ue0100.json').read_bytes()).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", '')
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a'", "assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]")
source = source.replace('u7f9c', 'u7628-g').replace('羜', '瘨').replace('a836_review', 'b847_whole_review')
source = source.replace('sourceProofFileSHA256,sourceGroups}}from', 'sourceProofFileSha256 as sourceProofFileSHA256,sourceGroups,selectedProofIdentity}}from')
source = source.replace("assert.equal(sourceProofFile,'engine-whole-u7628-g.json')", "assert.equal(sourceProofFile,'./engine-whole-u7628-g.json')")
source = source.replace("const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile}};", "const identity=selectedProofIdentity;assert.equal(identity.sourceRoot,'u7628-g');assert.equal(identity.sourceProofFile,sourceProofFile);assert.equal(identity.sourceProofFileSha256,sourceProofFileSHA256);assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const proof=selected;")
source = source.replace('compileProgressive(proof.trace,proof)', 'compileProgressive(proof.trace,proof,identity)')
source = source.replace('            assert root in names', """            if root in INCOMPLETE:
                status={'root':root,'sourceComplete':False,'geometry':None,'missingDependencies':INCOMPLETE[root],'partialProofIgnored':True,'nativeApproval':False}
                if q.get('view')==['checks']:
                    body=json.dumps(status).encode();mime='application/json'
                else:
                    body=('<!doctype html><meta charset="utf-8"><title>瘨 missing whole</title><h1>'+html.escape(root)+'</h1><p>고정 원본 u76ee-j 누락. 전체 geometry=null, 부분 11raw는 완전체로 표시하지 않습니다.</p><a href="?id=u7628-g">확보된 g 원본</a>').encode();mime='text/html; charset=utf-8'
                self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body);return
            assert root in names""")
source = source.replace('            if pairs:', '            parts += [\'<p>확보된 전체 원본: g · 기본/VS0는 u76ee-j 누락, geometry=null. <a href="?id=u7628">기본 누락</a> <a href="?id=u7628-ue0100">VS0 누락</a></p>\']\n            if pairs:')
for before, after in [
    ("'dictionaryStrokes':11", "'dictionaryStrokes':15"),
    ("'strokes':11", "'strokes':15"),
    ('strokes.length,11', 'strokes.length,15'),
    ("len(compiled['strokes'])==11", "len(compiled['strokes'])==15"),
    ('1<=left<=11 and 1<=right<=11', '1<=left<=15 and 1<=right<=15'),
    ("'candidatePens':11", "'candidatePens':15"),
    ('range(1,12)', 'range(1,16)'),
    ('전11', '전15'),
    ('raw12개는 compiled pen 순서가 아닙니다.', 'g 원본 16raw는 아직 국내 pen 대응으로 승인되지 않았습니다.'),
    ('64554', '64748'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
