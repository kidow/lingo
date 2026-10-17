import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path
HERE = Path(__file__).resolve().parent
raw = (HERE/'serve-native.py').read_bytes()
assert hashlib.sha256(raw).hexdigest() == 'f975b8b2dbc62aead3f552e0c8eaf260a9802c85f1818624f33c4f5fe4735f8e', 'Original helper bytes changed'
assert hashlib.sha256((HERE/'native-server-input-pins.json').read_bytes()).hexdigest() == '8251957d696d267000c11a53bb199ea27683c11668d0c19b36082124a62b9083', 'Original caller manifest bytes changed'
caller = (HERE/'native-server-compile-order-candidate.mjs').read_bytes()
assert hashlib.sha256(caller).hexdigest() == 'ab55ef9d30a6159089eb8d5b73e4c9380f5758597475eddd2b98cadbd95dbc32', 'Candidate caller bytes changed'
source = raw.decode('utf-8')
anchor = "CFG=json.loads((HERE/'native-server-input-pins.json').read_text())"
assert source.count(anchor) == 1, 'Exact original helper anchor changed'
source = source.replace(anchor, anchor + "\nCFG = dict(CFG)\nCFG['nodeCode'] = caller.decode('utf-8')\nCFG['port'] = 0")
exec(compile(source,str(HERE/'serve-native.py'),'exec'),globals())
