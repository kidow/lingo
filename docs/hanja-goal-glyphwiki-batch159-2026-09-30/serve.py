import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','芎').replace('u82ad-k','u828e-ue0102').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4,5],[6,7],[8,9]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':7").replace("'strokes':8","'strokes':7").replace('51896','52169')
source=source.replace('groups=[[0],[1],[3],[2],[4,5],[6,7],[8,9]]','groups=[[0],[1],[3],[2],[4,5],[6],[7,8,9]]')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
