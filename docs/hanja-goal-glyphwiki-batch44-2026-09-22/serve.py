import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Reuse the RAM-only comparison page; __file__ remains this candidate directory.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','苛').replace("['8']","['9']").replace("'strokes': 8","'strokes': 9").replace('<= 8','<= 9').replace('range(1,9)','range(1,10)').replace('/8</h1>','/9</h1>').replace('51897','51901')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
