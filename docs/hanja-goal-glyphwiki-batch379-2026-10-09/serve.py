import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','瓘').replace('u82ad-k','u74d8-ue0101').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups='+repr([[0], [2], [1], [3], [4], [5], [7], [6], [8], [9, 10], [11], [12], [13, 14], [15], [16], [17], [18], [20], [21], [22], [19], [23]])).replace("'dictionaryStrokes':8","'dictionaryStrokes':22").replace("'strokes':8","'strokes':22").replace('51896','52827')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
