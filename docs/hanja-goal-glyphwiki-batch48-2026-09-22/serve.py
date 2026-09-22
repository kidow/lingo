import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Candidate-only grouping for comparison, not runtime stroke approval.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','蔭').replace('u82ad-k','u852d-k').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4,5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15,16],[17]]').replace("'dictionaryStrokes':8","'dictionaryStrokes':15").replace("'strokes':8","'strokes':15").replace('51896','51910')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
