import sys
sys.dont_write_bytecode=True
import hashlib,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
P=json.loads((HERE/'base-order-source-preparation.json').read_bytes())
for name,pin in {**P['originalPins'],**P['newFilesSHA256']}.items():
    assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin,'Frozen source/base-order helper '+name
source=(HERE/'serve-native.py').read_text()
assert source.count('A=json.loads(A_BYTES)')==1
source=source.replace('native-server-compile.mjs','server-compile-base-order-candidate.mjs')
source=source.replace('A=json.loads(A_BYTES)',"A=json.loads(A_BYTES)\nA['selectedWhole']='u5fa7'")
source=source.replace('step=".01"','step="0.0001"')
assert 'progress.value/100' in source and 'step="0.0001"' in source
assert "review.renderer.dictionary_svg(A['glyph'],n,True,'pair'+str(n))" in source
exec(compile(source,str(HERE/'serve-native.py'),'exec'),{'__name__':__name__,'__file__':str(HERE/'serve-base-order-native.py')})
