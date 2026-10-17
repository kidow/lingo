import sys
sys.dont_write_bytecode=True
import ast,json,hashlib,subprocess,argparse,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PREP=json.loads((HERE/'source-order-candidate-preparation.json').read_text())
def guards():
    for f,h in {**PREP['originalPins'],**PREP['sharedRendererBytePins'],**PREP['newFilesSHA256']}.items():
        assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'Source byte pin changed: '+f
guards()
source=(HERE/'serve-combined-native.py').read_text()
assert source.count("if __name__=='__main__':")==1
source=source.split("if __name__=='__main__':",1)[0]
assert source.count('C=compiled()')==1
source=source.replace('C=compiled()','C=None')
assert source.count('step=".0001"')==1
assert source.count("('99.99%',.9999)")==1
assert source.count("('95%',.95)")==1
assert source.count('width:520px;height:520px')==1
source=source.replace('원본 후보','순서 보정 후보')
ast.parse(source)
ns={'__name__':'batch1019_order_native','__file__':str(HERE/'serve-combined-native.py')}
exec(compile(source,str(HERE/'serve-combined-native.py'),'exec'),ns)
def compiled(root=None):
    guards()
    assert root is None or root==PREP['selectedWhole'],'Only exact selected base can animate'
    env={**os.environ,'REVIEW_DIR':str(HERE),'WHOLE_ROOT':PREP['selectedWhole']}
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-order-candidate.mjs')],cwd=ROOT,env=env))
ns['compiled']=compiled
ns['guards']=guards
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
server=ns['ThreadingHTTPServer'](('127.0.0.1',args.port),ns['Handler'])
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'batch':1019,'glyph':'嘒','pens':14,'masks':14,'nativeApproval':False,'sourceOrderPermutation':PREP['sourceOrderPermutation'],'pairLeft':'domestic','pairRight':'corrected compiled candidate','privateMediaSaved':False}),flush=True)
server.serve_forever()
