import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','茉').replace('u82ad-k','u8309-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4],[5],[6],[7],[8]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':9").replace("'strokes':8","'strokes':9").replace('51896','52192')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
