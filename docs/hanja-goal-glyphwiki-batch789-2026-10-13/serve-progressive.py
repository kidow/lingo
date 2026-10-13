import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace("['node','--input-type=module'","['/opt/homebrew/bin/node','--input-type=module'").replace('芭','莠').replace('51897','65500').replace("'strokes': 8","'strokes': 11").replace("['8']","['11']").replace('<= 8','<= 11').replace('range(1,9)','range(1,12)').replace("+'/8","+'/11")
source=source.replace("body = ('<!doctype", "large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'\n            body = ('<!doctype")
source=source.replace("+ '<button id=\"play\">재생</button>", "+ ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + '<button onclick=\"show(.5)\">50%</button><button onclick=\"show(.75)\">75%</button><button onclick=\"show(.99)\">99%</button><button onclick=\"show(.9999)\">99.99%</button><button onclick=\"show(1)\">100%</button><button id=\"play\">재생</button>")
source=source.replace('<button id="play">재생</button>', "<button onclick=\"show(0.44639455640000003)\">44.63945564%</button><button onclick=\"show(0.5426305811000001)\">54.26305811%</button><button onclick=\"show(0.7211884037)\">72.11884037%</button><button onclick=\"show(0.9157149764)\">91.57149764%</button><button id=\"play\">재생</button>")
source=source.replace('(t-start)/1600','(t-start)/8000')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
