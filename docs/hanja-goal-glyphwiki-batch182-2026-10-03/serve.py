import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','珌').replace('u82ad-k','u73cc-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[2],[3],[6],[8],[5],[4],[7]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':9").replace("'strokes':8","'strokes':9").replace('51896','52226')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
