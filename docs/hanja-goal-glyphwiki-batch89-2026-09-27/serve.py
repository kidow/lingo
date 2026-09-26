import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative comparison grouping; full domestic review required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','沕').replace('u82ad-k','u6c95').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[2,3],[4],[5,6],[7],[8]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':7").replace("'strokes':8","'strokes':7").replace('51896','52009')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
