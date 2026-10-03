import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('ROOT=HERE.parent.parent','ROOT=HERE.parent.parent.parent')
source=source.replace('芭','淃').replace('u82ad-k','u6dc3-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':11").replace("'strokes':8","'strokes':11").replace('51896','52334')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
