import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping/order; full domestic comparison required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','妵').replace('u82ad-k','u59b5').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0,1],[2],[3],[4],[5],[7],[6],[8]]').replace('51896','52078')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
