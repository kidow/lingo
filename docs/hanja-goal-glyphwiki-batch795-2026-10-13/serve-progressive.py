import sys
sys.dont_write_bytecode = True
from pathlib import Path
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 58292
source = (Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source = source.replace("['node','--input-type=module'", "['/opt/homebrew/bin/node','--input-type=module'").replace('芭','阭').replace('51897',str(PORT)).replace("'strokes': 8","'strokes': 7").replace("['8']","['7']").replace('<= 8','<= 7').replace('range(1,9)','range(1,8)').replace("+'/8","+'/7")
# The selected original file is complete; its identity is checked against the pinned engine header.
before = "compiled = json.loads(subprocess.check_output"
insert = """script = script.replace("console.log(JSON.stringify", "import assert from 'node:assert/strict';const header=read('./engine-proof.json'),selected=read('./engine-whole-u962d-var-001.json');assert.equal(selected.engineRevision,header.engineRevision);assert.deepEqual(selected.engineHashes,header.engineHashes);const selectedProof={...header,groups:selected.groups,trace:selected.trace,defaults:selected.defaults};console.log(JSON.stringify")
script = script.replace("compileProgressive(read('./draw-trace.json'),read('./engine-proof.json'))", "compileProgressive(read('./draw-trace.json'),selectedProof)")
compiled = json.loads(subprocess.check_output"""
assert before in source
source = source.replace(before,insert)
source = source.replace("body = ('<!doctype", "large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'\n            masks = compiled['strokes'][stroke-1]\n            total = sum(m['weight'] for m in masks)\n            elapsed = 0\n            fine = ''\n            for index, mask in enumerate(masks):\n                if mask['direction'] == 'curve':\n                    for label, fraction in [('99.99',.9999),('100',1)]:\n                        amount=(elapsed+mask['weight']*fraction)/total\n                        fine += '<button onclick=\"show('+str(amount)+')\">mask'+str(index+1)+' '+label+'%</button>'\n                elapsed += mask['weight']\n            body = ('<!doctype")
source = source.replace("+ '<button id=\"play\">재생</button>", "+ ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + fine + '<button onclick=\"show(.5)\">50%</button><button onclick=\"show(.75)\">75%</button><button onclick=\"show(.99)\">99%</button><button onclick=\"show(.9999)\">99.99%</button><button onclick=\"show(1)\">100%</button><button id=\"play\">재생</button>")
source = source.replace('(t-start)/1600','(t-start)/8000')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
