import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping; full domestic comparison required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','兕').replace('u82ad-k','u5155-j').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[5],[0,1,2],[3],[4,7],[6],[8],[9]]').replace('51896','52156')
source=source.replace("'dictionaryStrokes':8","'dictionaryStrokes':7").replace("'strokes':8","'strokes':7")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
