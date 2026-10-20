#!/usr/bin/env python3
"""貶 actual frozen StrokeOutlines local harness. Root starts server only."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,json,os,subprocess
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_BYTES=(HERE/'config.json').read_bytes()
CONFIG_SHA=hashlib.sha256(CONFIG_BYTES).hexdigest()
CONFIG=json.loads(CONFIG_BYTES)
VALIDATION_BYTES=(HERE/'validation.json').read_bytes()
VALIDATION_SHA=hashlib.sha256(VALIDATION_BYTES).hexdigest()
VALIDATION=json.loads(VALIDATION_BYTES)
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'config.json').read_bytes())!=CONFIG_SHA or CONFIG_SHA!=VALIDATION['configSHA256']:raise ValueError('harness config changed')
    if sha((HERE/'validation.json').read_bytes())!=VALIDATION_SHA:raise ValueError('validation changed')
    for file,expected in CONFIG['inputSHA256'].items():
        frozen=CONFIG['historicalSourceFiles'].get(file,file)
        if sha((REPO/frozen).read_bytes())!=expected:raise ValueError('input changed: '+file)
    for file,expected in VALIDATION['ownSHA256'].items():
        if sha((HERE/file).read_bytes())!=expected:raise ValueError('harness changed: '+file)
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    guards()
    if args.check_only:
        print(json.dumps({'staticGuards':True,'HTTP':0,'server':0,'sourceCompiler':0,'engine':0}));return
    # Existing React/ReactDOM + transpileModule only; no Next, package install, source compiler or registry execution.
    result=subprocess.run(['node',str(HERE/'check.mjs'),'--resources'],cwd=REPO,text=True,capture_output=True,timeout=60,check=True)
    payload=json.loads(result.stdout);routes=payload['routes']
    if payload['registryExecuted'] or payload['actualAppUI']:raise ValueError('resource scope widened')
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            try:
                guards()
                if self.headers.get('Host')!='127.0.0.1:'+str(self.server.server_address[1]):raise ValueError('local host only')
                u=urlparse(self.path)
                if u.query or u.path not in routes:raise ValueError('fixed route only')
                raw=routes[u.path].encode()
                kind='text/html; charset=utf-8'if u.path=='/'else'application/json'if u.path.endswith('.json')else'text/javascript; charset=utf-8'
                self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(raw)));self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'none'; object-src 'none'");self.end_headers();self.wfile.write(raw)
            except Exception:self.send_error(409,'Exact frozen source contract mismatch')
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':os.getpid(),'port':server.server_address[1],'host':'127.0.0.1','sourceCompiles':0,'engineRuns':0,'transpileOnly':True,'SSRIdleWhole':True,'controlledIntermediateSSRSeeds':2,'actualAppUI':False,'actualHydrationObserved':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
