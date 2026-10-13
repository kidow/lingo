import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-progressive.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u75b7').replace('羜', '疷')
source = source.replace("spec_from_file_location('review'", "spec_from_file_location('b838_progressive_review'")
for before, after in [
    ("'strokes': 11", "'strokes': 10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(result['strokes']) == 11", "len(result['strokes']) == 10"),
    ("['11']", "['1']"),
    ('stroke <= 11', 'stroke <= 10'),
    ('/11</h1>', '/10</h1>'),
    ('range(1,12)', 'range(1,11)'),
    ('64555', '64647'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
