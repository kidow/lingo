import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','孼').replace('u82ad-k','u5b7c-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1,2],[3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18],[19,20],[21],[22]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':19").replace("'strokes':8","'strokes':19").replace('51896','52771')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
