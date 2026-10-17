import sys
sys.dont_write_bytecode=True
import hashlib,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
P=json.loads((HERE/'source-order-candidate-validation.json').read_bytes())
for name,pin in {**P['originalPins'],**P['newFilesSHA256']}.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin,'Frozen source/order helper '+name
source=(HERE/'serve-native.py').read_text()
source=source.replace('native-server-compile.mjs','server-compile-order-candidate.mjs').replace('step=".01"','step="0.0001"')
assert 'progress.value/100' in source and 'step="0.0001"' in source and '520px' in source and '99.99%' in source
assert "review.renderer.dictionary_svg(A['glyph'],n,True,'pair'+str(n))" in source
exec(compile(source,str(HERE/'serve-native.py'),'exec'),{'__name__':__name__,'__file__':str(HERE/'serve-order-native.py')})
