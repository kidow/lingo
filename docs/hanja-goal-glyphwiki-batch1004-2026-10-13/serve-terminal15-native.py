import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path

# Reuse the immutable original helper with an independently pinned candidate config.
# Original sources, compiler, adapter and old holds remain unchanged.
HERE = Path(__file__).resolve().parent
original = HERE / 'serve-native.py'
raw = original.read_bytes()
assert hashlib.sha256(raw).hexdigest() == 'e433265b99ce73ec2a416ac03d09f803e44f1538e15a49d8492e5f752d7c641c'
code = raw.decode('utf-8')
old_name = 'native-server-input-pins.json'
assert code.count(old_name) == 1
code = code.replace(old_name, 'terminal15-native-server-input-pins.json')
exec(compile(code, str(original), 'exec'), globals())

