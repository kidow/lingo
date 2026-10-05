import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','藎').replace('u82ad-k','u85ce-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4,5],[7],[6],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':18").replace("'strokes':8","'strokes':18").replace('51896','52761')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
