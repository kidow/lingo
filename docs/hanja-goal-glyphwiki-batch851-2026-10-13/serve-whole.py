import sys
sys.dont_write_bytecode = True
import re
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch832-2026-10-13/serve-critical-whole.py'
source = reference.read_text()
source = re.sub(r'^NAMES = .+$', lambda _: 'NAMES = ["u7d8e","u7d8e-k","u7d8e-var-001"]', source, flags=re.M)
source = re.sub(r'^PINS = .+$', lambda _: 'PINS = {"u7d8e":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","u7d8e-k":"b5b9694c81d1f4ab14bde7f728e982bd12be9ec770d0fcee37de8e5fabfdf2f5","u7d8e-var-001":"fa0e85b3b2e1928732471022876227273369f19561cf059b2563ab55390584dd"}', source, flags=re.M)
source = source.replace("PORT = 64644", "PORT = 64750")
source = source.replace("'b832_critical_whole'", "'b851_critical_whole'")
source = source.replace("'strokes': 12", "'strokes': 13").replace('1 <= d <= 12', '1 <= d <= 13')
source = source.replace('svg{width:204px;height:204px}', 'svg{width:200px;height:210px}')
source = source.replace("import html, json, hashlib, importlib.util, os", "import html, json, hashlib, importlib.util, os, subprocess")
marker = "VISITS = []"
checker = r'''VISITS = []
def exact_blocked_identity():
    module = (HERE/'progressive.mjs').as_uri()
    script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,sourceRoot,sourceProofFile,sourceProofFileSha256,selectedProofIdentity,blockedReason}}from'{module}';
assert.equal(sourceRoot,'u7d8e');assert.equal(sourceProofFile,'./engine-whole-u7d8e.json');const identity=selectedProofIdentity;assert.deepEqual(identity,{{sourceRoot:'u7d8e',sourceProofFile:'./engine-whole-u7d8e.json',sourceProofFileSha256:'e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25'}});const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSha256);assert.equal(JSON.parse(readFileSync(new URL('sources.json','{module}'))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const proof=JSON.parse(bytes),before=JSON.stringify(proof);let expected=false;try{{compileProgressive(proof.trace,proof,identity)}}catch(e){{assert.equal(e.message,blockedReason);expected=true}}assert(expected);assert.equal(JSON.stringify(proof),before);console.log(JSON.stringify({{sourceRoot,sourceProofFile,sourceProofFileSha256,reason:blockedReason,compiledPens:0,compiledMasks:0,nativeApproval:false}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
exact_blocked_identity()
'''
source = source.replace(marker, checker)
source = source.replace("            q = parse_qs(urlparse(self.path).query)", "            blocked = exact_blocked_identity()\n            q = parse_qs(urlparse(self.path).query)")
source = source.replace("'graphicsPersisted': False}", "'graphicsPersisted': False, 'compiledCandidate': blocked}")
source = source.replace("                         '<h1>' + GLYPH", "                         '<p>13획 compiled 후보는 원본 최소14/15 경로 때문에 보류입니다. 오른쪽은 승인되지 않은 원본 raw 누적이며, pen 대응이나 재생 프레임이 아닙니다.</p>',\n                         '<h1>' + GLYPH")
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
