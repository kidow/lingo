import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','鸛').replace('u82ad-k','u9e1b-ue0102').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[0],[1],[3],[2],[4],[5,6],[7],[8],[9,10],[11],[12],[13],[14],[16],[17],[18],[15],[19],[20],[21],[22,23],[24],[25],[26],[27,28],[29],[30],[31],[32]])).replace("'dictionaryStrokes':8","'dictionaryStrokes':29").replace("'strokes':8","'strokes':29").replace('51896','53027')
source=source.replace("exec(handler,r.__dict__)", "handler=handler.replace('svg{width:204px;height:204px}', 'svg{width:390px;height:390px}').replace('grid-template-columns:420px 420px','grid-template-columns:800px');exec(handler,r.__dict__)")
exec(compile(source,str(Path(__file__).resolve()),'exec'))

