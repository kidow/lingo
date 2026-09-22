import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping only; no approval of the disconnected water turn.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','蒲').replace('u82ad-k','u84b2-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[12],[13],[15],[14],[0],[1],[2,3],[4],[6],[7,8],[9],[10],[5],[11]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':14").replace("'strokes':8","'strokes':14").replace('51896','51915')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
