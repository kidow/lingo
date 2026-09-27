import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent.parent/'hanja-goal-glyphwiki-batch43-2026-09-22/serve-progressive.py').read_text()
source=source.replace('芭','兕').replace('51897','52157')
source=source.replace("'strokes':8","'strokes':7").replace("'dictionaryStrokes':8","'dictionaryStrokes':7")
source=source.replace("'strokes': 8", "'strokes': 7").replace("['8']", "['7']").replace('stroke <= 8','stroke <= 7').replace("+'/8</h1>","+'/7</h1>").replace('range(1,9)','range(1,8)')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
