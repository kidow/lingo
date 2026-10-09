import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace("['node','--input-type=module'","['/opt/homebrew/bin/node','--input-type=module'").replace('芭','躩').replace('51897','53021').replace("'strokes': 8","'strokes': 27").replace("['8']","['27']").replace('<= 8','<= 27').replace('range(1,9)','range(1,28)').replace("+'/8","+'/27")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
