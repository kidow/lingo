import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','挻').replace('u82ad-k','u633b-g').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[2],[12],[8],[9],[10,11],[3,4],[5,6],[7]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':10").replace("'strokes':8","'strokes':10").replace('51896','52238')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
