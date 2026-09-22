import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative comparison grouping; source graphics remain RAM-only.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','蕃').replace('u82ad-k','u8543-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4],[5],[6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':16").replace("'strokes':8","'strokes':16").replace('51896','51911')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
