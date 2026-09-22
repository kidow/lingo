import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','劤').replace("['8']","['6']").replace("'strokes': 8","'strokes': 6").replace('<= 8','<= 6').replace('range(1,9)','range(1,7)').replace('/8</h1>','/6</h1>').replace('51897','51948')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
