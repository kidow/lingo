import sys
sys.dont_write_bytecode = True
from pathlib import Path
here = Path(__file__).resolve().parent
source = (here / 'serve-progressive.py').read_text()
source = source.replace("exec(compile(source", "source = source.replace(\"(HERE/'progressive.mjs')\", \"(HERE/'terminal15-native-preview.mjs')\")\nexec(compile(source")
exec(compile(source, str(here / 'serve-progressive.py'), 'exec'))
