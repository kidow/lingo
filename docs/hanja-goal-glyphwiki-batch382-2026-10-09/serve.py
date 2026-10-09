import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','頀').replace('u82ad-k','u9800-ue0101').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[13],[12],[14],[15],[16],[17],[19],[20],[18],[21],[22,23],[24]])).replace("'dictionaryStrokes':8","'dictionaryStrokes':23").replace("'strokes':8","'strokes':23").replace('51896','52834')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
