import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','佸').replace('engine-proof.json','gothic-engine-proof.json').replace('draw-trace.json','gothic-draw-trace.json').replace('51897','52060')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
