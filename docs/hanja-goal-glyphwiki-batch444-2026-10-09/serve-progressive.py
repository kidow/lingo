import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace("['node','--input-type=module'","['/opt/homebrew/bin/node','--input-type=module'").replace('芭','棞').replace('51897','53015').replace("'strokes': 8","'strokes': 12").replace("['8']","['12']").replace('<= 8','<= 12').replace('range(1,9)','range(1,13)').replace("+'/8","+'/12")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
