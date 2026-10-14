import sys
sys.dont_write_bytecode = True
import os, hashlib
from pathlib import Path
HERE = Path(__file__).resolve().parent
# Preview must emit original masks, never test-only CHECK output.
os.environ.pop('CHECK', None)
SELF_SHA = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
PINNED_INPUTS = {"sources.json":"ff2b4b40f5aaa0fcb684680a5d342b98ffeeb15aad2c83ce1fbabb072c69159a","metadata.json":"961f5be4fd200e0f2e3fce3137b264b40532dd6ac370c26f8150bb060e66b78e","engine-proof.json":"48400abc4aa15a97c99a877777c68f1674bd5ef83ad26926f019363737167936","progressive.mjs":"e0a5fd78a241c9e5cabb6ac17b3764dd08a7e55056d2120bfaeb6e25d104fa44","server-compile.mjs":"16aabe74f3a1fa3e3155531c18ea021b53df381f5da1e9640b0403517781fff5","serve-whole.py":"0efb52df9956de1ebafa4f50b8f4d481e666dd24c1ed3b71b5485186fa1a361d","serve-progressive.py":"5e1e2c17aa2ee084d74b3a0a29293c262097459d02ed2537e6dd9e04928176b4","native-server-validation.json":"88670cda6e3d5964d6bc2a594adfc6342cede141368213d452bd51e98041a2ce","native-server-preparation-source-analysis.json":"52e3e00d25df9ce729cb4e1764d09a3c1a3790575ffd7bfadf2313f9505480e1","engine-whole-u8411.json":"76957c98c2b3a85d720f1f343eff51407fd3112cc3391106f30a675739b37257","engine-whole-u8411-02.json":"e10e3bdf8c508786144892bd2c632163827230078cc3ab164bca8b11e0ed9f18","engine-whole-u8411-07-var-001.json":"bee489b9dd6fda6522fcd990ee4f5ef28957acfcced5b47f6e164f914dd997f8","engine-whole-u8411-07-var-002.json":"b6e1fd023cd7c80551336d0efd1982cc99ff5519aba5d123e23ba14466065502","engine-whole-u8411-itaiji-001.json":"92fc28b152ff739682e5cfef13c4cf8d760e474b9b96ef10e3c4250ffdd1402c","engine-whole-u8411-itaiji-002.json":"f90c6c7fb5d1dd1790eeb5af8f99a2a809fd2e440e07b8c804ae54e52c7427ab","engine-whole-u8411-ue0100.json":"c17e3ea7fe0e95e6aaa3afcde5bc7da2960ccd28c1efd482982b48b29052406a","engine-whole-u8411-ue0101.json":"c17e3ea7fe0e95e6aaa3afcde5bc7da2960ccd28c1efd482982b48b29052406a","engine-whole-u8411-ue0102.json":"0dd2f3ec1e32d271e32f5832e91407ea9f51a8ae934bc44b178c7c5a05d087b1","progressive-order-candidate.mjs":"1f2c117d05f100f0efa75e090f28c1ea70e8d688388082d6cbe6809069062d38","server-compile-order-candidate.mjs":"ebe304de3bfe6fcb36c55259987a46cce8e5a2450fce6d1eeca325e67e61a2c0"}
def require_pins():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest() == SELF_SHA, 'Helper changed'
    for filename, expected in PINNED_INPUTS.items():
        assert hashlib.sha256((HERE/filename).read_bytes()).hexdigest() == expected, 'Input pin changed: '+filename
require_pins()
def replace_once(text, old, new):
    assert text.count(old) == 1, 'Original helper contract changed'
    return text.replace(old, new)
original = HERE/'serve-whole.py'
code = original.read_text()
code = replace_once(code, "'server-compile.mjs'", "'server-compile-order-candidate.mjs'")
code = replace_once(code, '        try:\n', '        try:\n            require_pins()\n')
exec(compile(code,str(original),'exec'),globals())

