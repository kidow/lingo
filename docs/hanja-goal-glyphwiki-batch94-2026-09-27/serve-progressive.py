import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','宂').replace("['8']","['5']").replace("'strokes': 8","'strokes': 5").replace('<= 8','<= 5').replace('range(1,9)','range(1,6)').replace('/8</h1>','/5</h1>').replace('engine-proof.json','gothic-engine-proof.json').replace('draw-trace.json','gothic-draw-trace.json').replace('51897','52021')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
