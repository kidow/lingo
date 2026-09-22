import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping for RAM-only comparison; no runtime approval.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','葯').replace('u82ad-k','u846f-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4,5],[6,7],[8],[9],[10],[11],[12],[13,14],[15]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':13").replace("'strokes':8","'strokes':13").replace('51896','51906')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
