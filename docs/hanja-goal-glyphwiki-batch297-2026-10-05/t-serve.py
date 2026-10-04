import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','慤').replace('u82ad-k','u6164-t').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[2],[3],[4,5],[6],[7,8,9],[10],[11,12],[13,14],[15],[16],[17],[18],[19]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':15").replace("'strokes':8","'strokes':15").replace('51896','52599')
source=source.replace('sources.json','t-sources.json').replace('engine-proof.json','t-engine-proof.json').replace('draw-trace.json','t-draw-trace.json').replace('metadata.json','t-metadata.json')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
