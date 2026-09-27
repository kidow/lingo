import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','岯').replace('engine-proof.json','engine-proof-gothic.json').replace('draw-trace.json','draw-trace-gothic.json').replace('51897','52082')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
