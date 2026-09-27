import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping; full domestic comparison required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','斨').replace('u82ad-k','u65a8').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[2,3],[1],[4],[5],[6],[7],[8]]').replace('51896','52094')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
