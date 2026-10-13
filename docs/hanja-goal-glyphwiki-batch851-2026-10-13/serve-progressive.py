import sys
sys.dont_write_bytecode = True
import json, os, subprocess, html
from pathlib import Path
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
PORT = 64751
def candidate_status():
    module = (HERE/'progressive.mjs').as_uri()
    script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,sourceRoot,sourceProofFile,sourceProofFileSha256,selectedProofIdentity,blockedReason}}from'{module}';
assert.equal(sourceRoot,'u7d8e');assert.equal(sourceProofFile,'./engine-whole-u7d8e.json');const identity=selectedProofIdentity;assert.deepEqual(identity,{{sourceRoot:'u7d8e',sourceProofFile:'./engine-whole-u7d8e.json',sourceProofFileSha256:'e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25'}});const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSha256);assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const proof=JSON.parse(bytes),before=JSON.stringify(proof);let expected=false;try{{compileProgressive(proof.trace,proof,identity)}}catch(e){{assert.equal(e.message,blockedReason);expected=true}}assert(expected);assert.equal(JSON.stringify(proof),before);console.log(JSON.stringify({{glyph:'綎',sourceRoot,sourceProofFile,sourceProofFileSha256,reason:blockedReason,compiledPens:0,compiledMasks:0,progressiveFrames:0,replay:0,nativeApproval:false}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            status = candidate_status()
            if parse_qs(urlparse(self.path).query).get('view') == ['checks']:
                body, mime = json.dumps(status).encode(), 'application/json'
            else:
                body = ('<!doctype html><meta charset="utf-8"><title>綎 progressive blocked</title><h1>綎 · 재생 후보 보류</h1><p>원본의 최소 경로 수14/15가 국내13획보다 많아 compiled 획·마스크·프레임·재생을 만들지 않습니다.</p><pre>'+html.escape(json.dumps(status,ensure_ascii=False,indent=2))+'</pre><a href="http://127.0.0.1:64750/?id=u7d8e">전체 원본 및 국내 방향 대조</a>').encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as exc:
            body, mime = str(exc).encode(), 'text/plain; charset=utf-8'
            self.send_response(500)
        self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)

if __name__ == '__main__':
    status = candidate_status()
    print(json.dumps({'port':PORT,'pid':os.getpid(),**status}),flush=True)
    ThreadingHTTPServer(('127.0.0.1',PORT),Handler).serve_forever()
