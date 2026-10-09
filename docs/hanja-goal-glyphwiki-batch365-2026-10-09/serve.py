import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','瀯').replace('u82ad-k','u702f-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[i] for i in range(24)])).replace("'dictionaryStrokes':8","'dictionaryStrokes':20").replace("'strokes':8","'strokes':20").replace('51896','52791')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
