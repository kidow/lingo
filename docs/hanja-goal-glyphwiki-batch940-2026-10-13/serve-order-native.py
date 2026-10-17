import sys
sys.dont_write_bytecode = True
import os, hashlib
from pathlib import Path
os.environ.pop('CHECK', None)
HERE = Path(__file__).resolve().parent
raw = (HERE / 'serve-native.py').read_bytes()
assert hashlib.sha256(raw).hexdigest() == '6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b', 'Original helper byte pin changed'
source = raw.decode('utf-8')
original_caller = 'native-server-compile.mjs'
assert source.count(original_caller) == 3, 'Exact original caller anchors changed'
source = source.replace(original_caller, 'native-server-compile-order-candidate.mjs')
exec(compile(source, str(HERE / 'serve-native.py'), 'exec'), globals())
