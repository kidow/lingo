import sys
sys.dont_write_bytecode=True
import ast,json,hashlib,subprocess,argparse,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PREP=json.loads((HERE/'source-order-candidate-validation.json').read_text())
def guards():
    for f,s in {**PREP['originalPins'],**PREP['sharedRendererBytePins'],**PREP['newFilesSHA256']}.items():
        assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==s,'Source byte pin changed: '+f
guards()
source=(HERE/'serve-native.py').read_text()
assert source.count("if __name__=='__main__':")==1
source=source.split("if __name__=='__main__':",1)[0]
assert source.count('C=compiled()')==1
source=source.replace('C=compiled()','C=None').replace('step=".01"','step=".0001"')
source=source.replace("('99%',.99)","('95%',.95),('99%',.99)")
ast.parse(source)
ns={'__name__':'batch1012_order_native','__file__':str(HERE/'serve-native.py')}
exec(compile(source,str(HERE/'serve-native.py'),'exec'),ns)
def compiled(root=None):
    guards()
    assert root is None or root==PREP['selectedWhole'],'Only exact selected base can animate'
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-order-candidate.mjs')],cwd=ROOT))
ns['compiled']=compiled
ns['guards']=guards
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
server=ns['ThreadingHTTPServer'](('127.0.0.1',args.port),ns['Handler'])
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'batch':1012,'glyph':'虩','compiledPens':18,'compiledMasks':21,'nativeApproval':False,'sourceOrderPermutation':PREP['sourceOrderPermutation']}),flush=True)
server.serve_forever()
