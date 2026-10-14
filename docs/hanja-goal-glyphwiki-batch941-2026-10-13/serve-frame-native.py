import sys
sys.dont_write_bytecode = True
import os, hashlib
from pathlib import Path

# Separate preview process: clear test-only CHECK without editing original sources.
os.environ.pop('CHECK', None)
HERE = Path(__file__).resolve().parent
original = HERE/'serve-native.py'
raw = original.read_bytes()
assert hashlib.sha256(raw).hexdigest() == '6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b', 'Original helper byte pin changed'
exec(compile(raw.decode('utf-8'),str(original),'exec'),globals())

