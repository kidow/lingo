import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','蓆').replace('u82ad-k','u84c6-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4],[5],[6],[9],[7],[8],[10],[11],[12,13],[14]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':14").replace("'strokes':8","'strokes':14").replace('51896','52570')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
