import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','藷').replace('u82ad-k','u85f7-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[21],[16],[17,18],[19],[20]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':20").replace("'strokes':8","'strokes':20").replace('51896','52795')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
