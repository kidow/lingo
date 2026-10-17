import sys
sys.dont_write_bytecode=True
import ast,json,hashlib,subprocess,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PREP=json.loads((HERE/'source-order-candidate-validation.json').read_text())
def guards():
    for f,s in {**PREP['originalBytePins'],**PREP['additionalProtectedPins'],**PREP['newFilesSHA256']}.items():
        assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==s,'Source byte pin changed: '+f
guards()
source=(HERE/'serve-native.py').read_text()
assert source.count("if __name__=='__main__':")==1
source=source.split("if __name__=='__main__':",1)[0]
source=source.replace('max="100" value="0"','max="100" value="0" step=".0001"')
source=source.replace('step=".01"','step=".0001"')
ast.parse(source)
ns={'__name__':'batch1005_order_native','__file__':str(HERE/'serve-native.py')}
exec(compile(source,str(HERE/'serve-native.py'),'exec'),ns)
def compiled():
    guards()
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-order-candidate.mjs')],cwd=ROOT))
ns['compiled']=compiled
ns['check_pins']=guards
server=ns['ThreadingHTTPServer'](('127.0.0.1',0),ns['Handler'])
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'batch':1005,'glyph':'鬫','compiledPens':22,'compiledMasks':23,'nativeApproval':False,'sourceOrderPermutation':PREP['sourceOrderPermutation']}),flush=True)
server.serve_forever()
