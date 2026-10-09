import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','雋').replace('u82ad-k','u96cb-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[0],[1],[2],[3],[5],[6],[4],[7],[8],[9,10],[11],[12],[13,14]])).replace("'dictionaryStrokes':8","'dictionaryStrokes':13").replace("'strokes':8","'strokes':13").replace('51896','52867')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
