import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','薖').replace('u82ad-k','u8596').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[0],[1],[2],[9],[10,11],[12],[13],[14],[15,16],[17],[18,19],[20],[3],[4],[5,6],[7],[8]])).replace("'dictionaryStrokes':8","'dictionaryStrokes':17").replace("'strokes':8","'strokes':17").replace('51896','53019')
source=source.replace("exec(handler,r.__dict__)", "handler=handler.replace('svg{width:204px;height:204px}', 'svg{width:390px;height:390px}').replace('grid-template-columns:420px 420px','grid-template-columns:800px');exec(handler,r.__dict__)")
source=source.replace("engine=json.loads((HERE/'engine-proof.json').read_text())", "engine=json.loads((HERE/'whole-engine-proofs.json').read_text())['u8596-ue0100']['engineProof']").replace("groups="+repr([[0],[1],[2],[9],[10,11],[12],[13],[14],[15,16],[17],[18,19],[20],[3],[4],[5,6],[7],[8]]), "groups="+repr([[0],[1],[3],[2],[10],[11,12],[14],[13],[15],[16,17],[18],[19,20],[21],[4],[5],[6,7],[8,9]])).replace('glyphwiki-u8596-engine-outline','glyphwiki-u8596-ue0100-engine-outline')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
