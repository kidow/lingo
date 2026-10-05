import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','璵').replace('u82ad-k','u74b5-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[2],[1],[3],[4],[5],[6],[11],[19],[18],[14,15],[13],[9,8],[10],[12],[7],[16],[17]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':18").replace("'strokes':8","'strokes':18").replace('51896','52751')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
