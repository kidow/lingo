import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative comparison grouping; full domestic review required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','薇').replace('u82ad-k','u8587-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14,15],[16],[17],[18],[19]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':17").replace("'strokes':8","'strokes':17").replace('51896','51924')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
