import sys
sys.dont_write_bytecode=True
from pathlib import Path
# Tentative grouping; full domestic comparison required.
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve.py').read_text()
source=source.replace('芭','芚').replace('u82ad-k','u829a-ue0102').replace('groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]','groups=[[0],[1],[3],[2],[4],[5,6],[7],[8]]').replace('51896','52121')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
