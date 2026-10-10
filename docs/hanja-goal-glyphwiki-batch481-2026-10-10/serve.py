import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','漌').replace('u82ad-k','u6f0c').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14]] if '--alternate' in sys.argv else [[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]])).replace("'dictionaryStrokes':8","'dictionaryStrokes':14").replace("'strokes':8","'strokes':14").replace('51896','53087')
if '--alternate' in sys.argv:
 source=source.replace("engine-proof.json","engine-proof-alternative.json").replace("53087","53089").replace("glyphwiki-u6f0c-engine-outline","glyphwiki-u6f0c-ue0102-engine-outline")
source=source.replace("exec(handler,r.__dict__)", "handler=handler.replace('svg{width:204px;height:204px}', 'svg{width:390px;height:390px}').replace('grid-template-columns:420px 420px','grid-template-columns:800px');exec(handler,r.__dict__)")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
