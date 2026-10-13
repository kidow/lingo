import sys
sys.dont_write_bytecode = True
import re
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch832-2026-10-13/serve-critical-whole.py'
source = reference.read_text()
source = re.sub(r'^NAMES = .+$', lambda _: 'NAMES = ["u8fed","u8fed-k","u8fed-ue0100","u8fed-ue0101","u8fed-ue0102","u8fed-ue0103","u8fed-v"]', source, flags=re.M)
source = re.sub(r'^PINS = .+$', lambda _: 'PINS = {"u8fed":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","u8fed-k":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a","u8fed-ue0100":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","u8fed-ue0101":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a","u8fed-ue0102":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","u8fed-ue0103":"c29839afd07f2b6cf836beb90b31392c065ed77905519965f8dc69bf6f5e1338","u8fed-v":"c29839afd07f2b6cf836beb90b31392c065ed77905519965f8dc69bf6f5e1338"}', source, flags=re.M)
source = source.replace("PORT = 64644", "PORT = 64782")
source = source.replace("'b832_critical_whole'", "'b896_critical_whole'")
source = source.replace("'strokes': 12", "'strokes': 9").replace('1 <= d <= 12', '1 <= d <= 9')
source = source.replace('svg{width:204px;height:204px}', 'svg{width:200px;height:210px}')
source = source.replace("import html, json, hashlib, importlib.util, os", "import html, json, hashlib, importlib.util, os, subprocess")
marker = "VISITS = []"
checker = r'''VISITS = []
def exact_blocked_identity():
    module = (HERE/'blocked-source-contract.mjs').as_uri()
    script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,sourceRoot,sourceProofFile,sourceProofFileSha256,selectedProofIdentity,blockedReason}}from'{module}';
assert.equal(sourceRoot,'u8fed');assert.equal(sourceProofFile,'./engine-whole-u8fed.json');const identity=selectedProofIdentity;assert.deepEqual(identity,{{sourceRoot:'u8fed',sourceProofFile:'./engine-whole-u8fed.json',sourceProofFileSha256:'7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53'}});const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSha256);assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const proof=JSON.parse(bytes),before=JSON.stringify(proof);let expected=false;try{{compileProgressive(proof.trace,proof,identity)}}catch(e){{assert.equal(e.message,blockedReason);expected=true}}assert(expected);assert.equal(JSON.stringify(proof),before);console.log(JSON.stringify({{sourceRoot,sourceProofFile,sourceProofFileSha256,reason:blockedReason,compiledPens:0,compiledMasks:0,nativeApproval:false}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
exact_blocked_identity()
'''
source = source.replace(marker, checker)
source = source.replace("            q = parse_qs(urlparse(self.path).query)", "            blocked = exact_blocked_identity()\n            q = parse_qs(urlparse(self.path).query)")
source = source.replace("'graphicsPersisted': False}", "'graphicsPersisted': False, 'compiledCandidate': blocked}")
source = source.replace("                         '<h1>' + GLYPH", "                         '<p>9획 후보는 기존 국내9획의 연속 경계와 원본(-2,-2) 간격 때문에 보류입니다. 오른쪽은 승인되지 않은 원본 raw 누적이며, pen 대응이나 재생 프레임이 아닙니다.</p>',\n                         '<h1>' + GLYPH")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
