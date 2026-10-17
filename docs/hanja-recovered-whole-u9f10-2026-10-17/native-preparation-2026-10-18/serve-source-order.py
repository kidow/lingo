#!/usr/bin/env python3
"""Read-only RAM override of the preserved recovered native helper; no source geometry edits."""
import sys
sys.dont_write_bytecode=True
import json,hashlib,importlib.util,argparse,subprocess,os
from pathlib import Path
from http.server import ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
SELF_SHA=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
PREP_BYTES=(HERE/'source-order-preparation.json').read_bytes()
PREP_SHA=hashlib.sha256(PREP_BYTES).hexdigest()
P=json.loads(PREP_BYTES)
spec=importlib.util.spec_from_file_location('preserved_recovered_u9f10_native',HERE/'serve-native.py')
h=importlib.util.module_from_spec(spec);spec.loader.exec_module(h)
ORIGINAL_GUARDS=h.guards
C=None
def guards():
    ORIGINAL_GUARDS()
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest()==SELF_SHA==P['newFilesSHA256']['serve-source-order.py']
    assert hashlib.sha256((HERE/'source-order-preparation.json').read_bytes()).hexdigest()==PREP_SHA,'order preparation changed'
    for f,s in {**P['sourceInputBytePins'],**P['newFilesSHA256']}.items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==s,f
    assert P['permutation']==[1,2,3,4,5,6,7,8,9,10,12,11,13,14,15]
    assert P['selectedProofIdentity']==h.A['selectedProofIdentity']
    assert P['nativeApproval'] is False and P['runtimeApplied'] is False
h.guards=guards
def compiled(root=None):
    global C
    guards();root=root or 'u9f10';assert root=='u9f10','No implicit whole substitution'
    if C is None:
        assert P['sourceCheck']['passed'] is True and P['expectedCompiledSHA256']
        C=json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-source-order.mjs')]))
        h.C=C
    assert C['sourceRoot']==root and C['compiledSHA256']==P['expectedCompiledSHA256']
    return C
h.compiled=compiled
def configure_runtime():
    h.configure_runtime()
    assert C is h.C and C['sourceCompileRuns']==1
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    if args.check_only:
        guards();result=h.source_guard();result['orderInputPins']=len(P['sourceInputBytePins']);result['newSourceCompiles']=0
        syntax=subprocess.run(['rtk','proxy','node','--check',str(HERE/'server-compile-source-order.mjs')],capture_output=True)
        assert syntax.returncode==0,syntax.stderr.decode();result['callerSyntaxChecks']=1
        print(json.dumps(result,ensure_ascii=False));sys.exit(0)
    configure_runtime();server=ThreadingHTTPServer(('127.0.0.1',args.port),h.Handler)
    print(json.dumps({'glyph':'鼐','port':server.server_address[1],'pid':os.getpid(),'pens':15,'masks':16,'sourceCompileRuns':1,'engineExecutions':0,'cachedCompiled':True,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
