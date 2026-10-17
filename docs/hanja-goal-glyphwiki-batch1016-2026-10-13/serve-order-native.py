import sys
sys.dont_write_bytecode=True
import ast,json,hashlib,subprocess,argparse,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
ORDER_PREP=json.loads((HERE/'source-order-candidate-validation.json').read_text())
def order_guards():
    for f,s in {**ORDER_PREP['originalPins'],**ORDER_PREP['additionalProtectedPins'],**ORDER_PREP['newFilesSHA256']}.items():
        assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==s,'Pinned input changed: '+f
order_guards()
source=(HERE/'serve-combined-native.py').read_text()
assert source.count("if __name__ == '__main__':")==1
source=source.split("if __name__ == '__main__':",1)[0]
ast.parse(source)
ns={'__name__':'batch1016_order_combined','__file__':str(HERE/'serve-combined-native.py')}
exec(compile(source,str(HERE/'serve-combined-native.py'),'exec'),ns)
ns['guards']=order_guards
whole_text,progressive_text=ns['source_texts']()
whole=ns['load_original']('batch1016_order_whole',whole_text,'serve-whole.py')
progressive=ns['load_original']('batch1016_order_progressive',progressive_text,'serve-progressive.py')
def compiled(root='u99fd'):
    order_guards()
    assert root==ORDER_PREP['selectedWhole'],'Only the exact selected base identity can animate'
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-order-candidate.mjs')],cwd=ROOT))
whole.compiled_candidate=compiled
progressive.compile_candidate=compiled
ns['WHOLE']=whole
ns['PROGRESSIVE']=progressive
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
server=ns['ThreadingHTTPServer'](('127.0.0.1',args.port),ns['Handler'])
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'batch':1016,'glyph':'駽','pens':17,'masks':19,'sourceRoot':'u99fd','sourceOrderPermutation':ORDER_PREP['sourceOrderPermutation'],'nativeApproval':False}),flush=True)
server.serve_forever()
