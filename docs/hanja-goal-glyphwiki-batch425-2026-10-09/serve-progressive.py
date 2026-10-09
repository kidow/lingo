import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace("['node','--input-type=module'","['/opt/homebrew/bin/node','--input-type=module'").replace('芭','袺').replace('51897','52959').replace("'strokes': 8","'strokes': 11").replace("['8']","['11']").replace('<= 8','<= 11').replace('range(1,9)','range(1,12)').replace("+'/8","+'/11")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
