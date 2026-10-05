import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace("['node','--input-type=module'","['/opt/homebrew/bin/node','--input-type=module'").replace('芭','擎').replace('51897','52717').replace("'strokes': 8","'strokes': 17").replace("['8']","['17']").replace('<= 8','<= 17').replace('range(1,9)','range(1,18)').replace("+'/8","+'/17")
source=source.replace('draw-trace.json','historical-draw-trace.json').replace('engine-proof.json','historical-engine-proof.json')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
