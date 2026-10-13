import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch836-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('u7f9c', 'u75b7').replace('羜', '疷').replace('a836_review', 'b838_whole_review')
source = source.replace('2665972275eb722fbda5318a1ad450550fa117d6e4abda72f7d9822f95e2946a', 'a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b')
source = source.replace("assert hashlib.sha256((HERE/'engine-whole-u75b7-ue0100.json').read_bytes()).hexdigest()=='a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b'", "assert hashlib.sha256((HERE/'engine-whole-u75b7-ue0100.json').read_bytes()).hexdigest()=='127f54d16dbdedb324db999e67f71a2013366a026b59eba1f8fbd821c7df834a'")
source = source.replace("assert hashlib.sha256(raw).hexdigest()=='a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b'", "assert hashlib.sha256(raw).hexdigest()=={'u75b7':'a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b','u75b7-ue0100':'127f54d16dbdedb324db999e67f71a2013366a026b59eba1f8fbd821c7df834a'}[root]")
for before, after in [
    ("'dictionaryStrokes':11", "'dictionaryStrokes':10"),
    ("'strokes':11", "'strokes':10"),
    ('strokes.length,11', 'strokes.length,10'),
    ("len(compiled['strokes'])==11", "len(compiled['strokes'])==10"),
    ('1<=left<=11 and 1<=right<=11', '1<=left<=10 and 1<=right<=10'),
    ("'candidatePens':11", "'candidatePens':10"),
    ('range(1,12)', 'range(1,11)'),
    ('전11', '전10'),
    ('raw12개', 'raw11개'),
    ('64554', '64646'),
]:
    source = source.replace(before, after)
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
