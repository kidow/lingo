import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path
HERE = Path(__file__).resolve().parent
PINNED_INPUTS = {"sources.json":"b9bbd02f03118e2fa8c66676fef3ac83ecf42a615c346e43e6935ebf5db2d7d8","metadata.json":"5adb14ea6455cc718ee2c4143695f633060c8235a0726d67b9fdb73b73a60a4d","engine-proof.json":"ea2d736fc5593c331ece4d6fc08be32a23bbe6116ff9d97b2a66a229a425f22d","serve-whole.py":"3cf702ea6cd8a476d18e4b32db117da7fc6fcd3b3ef083e410d41c0bc1a8ee5c","native-server-validation.json":"f6e002d077c7b4ecbd08b6bcd8d1eebe993d4fbcd83e68d16bb6b9050c511e09","native-server-preparation-source-analysis.json":"dfa53447a111f0b05374e774a99990fef03ead003525d9269b4d4876961ac555","engine-whole-u9ea4.json":"6f54e7d4b5bf7bee39347161794db08077803410884b55c4aa49c5382ffc6094","engine-whole-u9ea4-ue0100.json":"ebe65555f70d88ac81fad83270235ba9fb0f02c9dc425b6df8daedbb901f8976","engine-whole-u9ea4-var-001.json":"f1824aba17753fbc72d6314e3a430e12675fbfe74b41963efe39a40e1f0ad6ed"}
def require_original_inputs():
    for filename, expected in PINNED_INPUTS.items():
        assert hashlib.sha256((HERE/filename).read_bytes()).hexdigest() == expected, 'Pinned input changed: '+filename
require_original_inputs()
original = HERE/'serve-whole.py'
code = original.read_text()
anchor = '            p,joins=source(name)'
assert code.count(anchor) == 1
code = code.replace(anchor, '            require_original_inputs()\n'+anchor)
anchor = "            else:\n                polygons=[poly for group in p['groups'] for poly in group['polygons']]"
assert code.count(anchor) == 1
replacement = """            elif urlparse(self.path).path == '/pairs':
                domestic = int(q.get('domestic',['1'])[0])
                raw_count = int(q.get('raw',['1'])[0])
                assert 1 <= domestic <= 33 and 1 <= raw_count <= len(p['groups'])
                polygons = [poly for group in p['groups'][:raw_count] for poly in group['polygons']]
                assert all(v['off'] == 0 for poly in polygons for v in poly)
                svg = '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body = ('<!doctype html><meta charset="utf-8"><title>麤 raw direction comparison</title><style>body{font:16px system-ui;margin:20px;width:1160px}.pair{display:flex;gap:28px}svg{width:520px;height:520px}</style><h1>麤 · '+html.escape(name)+'</h1><p>국내 '+str(domestic)+'획 / 원본 누적 raw '+str(raw_count)+' · 대응 미승인 · 애니메이션 없음</p><div class="pair">'+r.base.renderer.dictionary_svg('麤',domestic,True,'domestic'+str(domestic))+svg+'</div>').encode()
                mime = 'text/html; charset=utf-8'
            else:
                polygons=[poly for group in p['groups'] for poly in group['polygons']]"""
code = code.replace(anchor,replacement)
exec(compile(code,str(original),'exec'),globals())

