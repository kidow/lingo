import sys
sys.dont_write_bytecode = True
from pathlib import Path

source = (Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source = source.replace("['node','--input-type=module'", "['/opt/homebrew/bin/node','--input-type=module'")
source = source.replace('芭', '胾').replace('51897', '64543').replace("'strokes': 8", "'strokes': 12").replace("['8']", "['12']").replace('<= 8', '<= 12').replace('range(1,9)', 'range(1,13)').replace("+'/8", "+'/12")
old = "compileProgressive(read('./draw-trace.json'),read('./engine-proof.json'))"
new = "(()=>{{const header=read('./engine-proof.json');const whole=read('./engine-whole-u80fe.json');const proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...whole}};return compileProgressive(proof.trace,proof)}})()"
assert source.count(old) == 1
source = source.replace(old, new)
source = source.replace("body = ('<!doctype", "large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'\n            body = ('<!doctype")
source = source.replace("+ '<button id=\"play\">재생</button>", "+ ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + '<button onclick=\"show(.5)\">50%</button><button onclick=\"show(.75)\">75%</button><button onclick=\"show(.99)\">99%</button><button onclick=\"show(.9999)\">99.99%</button><button onclick=\"show(1)\">100%</button><button id=\"play\">재생</button>")
source = source.replace('<button id="play">재생</button>', '<button onclick="show(0.9147676434985153)">경계 직전</button><button onclick="show(0.9147676435985153)">경계</button><button onclick="show(0.9147676436985153)">경계 직후</button><button id="play">재생</button>')
source = source.replace('<button id="play">재생</button>', "<button onclick=\"show(0.8747581955483382)\">위갈고리 경계 직전</button><button onclick=\"show(0.8747581956483382)\">위갈고리 경계</button><button onclick=\"show(0.8747581957483382)\">위갈고리 경계 직후</button><button id=\"play\">재생</button>")
source = source.replace('(t-start)/1600', '(t-start)/8000')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
