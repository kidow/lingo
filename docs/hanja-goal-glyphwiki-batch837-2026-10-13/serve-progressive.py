import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch827-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u80cf', 'u7f5d').replace('胏', '罝')
source = source.replace("'strokes': 9", "'strokes': 10").replace('strokes.length,9', 'strokes.length,10').replace("== 9", "== 10")
source = source.replace("['9']", "['10']").replace('<= 9', '<= 10').replace('range(1,10)', 'range(1,11)').replace("+'/9", "+'/10")
source = source.replace('sourceWholeFileSHA256', 'sourceProofFileSHA256')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b837_progressive_review'")
source = source.replace('64545', '64643')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
