import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path
HERE = Path(__file__).resolve().parent
ADAPTER_SHA = '998955688035419491779531a1767b5d2cf224b6a092a1d4d378807d43d1771c'
assert hashlib.sha256((HERE/'server-compile-terminal15-candidate.mjs').read_bytes()).hexdigest() == ADAPTER_SHA
def replace_once(text, old, new):
    assert text.count(old) == 1, 'Original helper contract changed: '+old
    return text.replace(old, new)
original = HERE/'serve-whole.py'
raw = original.read_bytes()
assert hashlib.sha256(raw).hexdigest() == '612a2107949c0d06396c4c838c04833466aabcb7a2f71d8a2a673317df8449ac'
code = raw.decode()
code = replace_once(code, "'server-compile.mjs'", "'server-compile-terminal15-candidate.mjs'")
code = replace_once(code, 'SUPPORTED_ROOTS=["u7501","u7501-k","u7501-ue0100","u7501-ue0101","u7501-ue0102"]', 'SUPPORTED_ROOTS=["u7501","u7501-ue0100","u7501-ue0101"]')
code = replace_once(code, "compiled['sourceProofFile']", "compiled['identity']['sourceProofFile']")
code = replace_once(code, "compiled['sourceProofFileSHA256']", "compiled['identity']['sourceProofFileSha256']")
exec(compile(code,str(original),'exec'),globals())

