import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace("['node','--input-type=module'","['/opt/homebrew/bin/node','--input-type=module'").replace('芭','窞').replace('51897','53168').replace("'strokes': 8","'strokes': 13").replace("['8']","['13']").replace('<= 8','<= 13').replace('range(1,9)','range(1,14)').replace("+'/8","+'/13")
source=source.replace("body = ('<!doctype", "large = parse_qs(urlparse(self.path).query).get('enlarged',['0'])[0]=='1'\n            body = ('<!doctype")
source=source.replace("+ '<button id=\"play\">재생</button>", "+ ('<style>body{width:1200px}svg{width:520px;height:520px}.samples{display:none}</style>' if large else '') + '<button onclick=\"show(.5)\">50%</button><button onclick=\"show(.75)\">75%</button><button onclick=\"show(.99)\">99%</button><button onclick=\"show(.9999)\">99.99%</button><button onclick=\"show(1)\">100%</button><button id=\"play\">재생</button>")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
