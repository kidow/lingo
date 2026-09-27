import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping; full domestic comparison required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','旿').replace('u82ad-k','u65ff').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1,2],[3],[4],[5],[8],[6],[7]]').replace('51896','52100')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
