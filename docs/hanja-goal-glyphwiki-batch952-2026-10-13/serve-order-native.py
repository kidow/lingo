import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path

HERE = Path(__file__).resolve().parent
raw = (HERE / 'serve-native.py').read_bytes()
assert hashlib.sha256(raw).hexdigest() == 'be840bf7c9a034e447a426891743107d05c1bb5326994342612194ffde48510d', 'Original helper bytes changed'
assert hashlib.sha256((HERE / 'native-server-input-pins.json').read_bytes()).hexdigest() == '8517d2307395e5452c838215ba6ff463697998bb4b492c253c15fe17aafd277d', 'Original caller manifest bytes changed'
caller = (HERE / 'native-server-compile-order-candidate.mjs').read_bytes()
assert hashlib.sha256(caller).hexdigest() == '58607fcc44f4eac5474c579a407d9a5879b91acd9b405e3b9a1f31b5ba8b3134', 'Candidate caller bytes changed'
source = raw.decode('utf-8')
anchor = "CFG=json.loads((HERE/'native-server-input-pins.json').read_text())"
assert source.count(anchor) == 1, 'Exact original helper anchor changed'
source = source.replace(anchor, anchor + "\nCFG = dict(CFG)\nCFG['nodeCode'] = caller.decode('utf-8')\nCFG['port'] = 0")
exec(compile(source, str(HERE / 'serve-native.py'), 'exec'), globals())
