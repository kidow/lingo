import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','慽').replace('51897','52539').replace("'strokes': 8","'strokes': 14").replace("['8']","['14']").replace('<= 8','<= 14').replace('range(1,9)','range(1,15)').replace("+'/8","+'/14")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
