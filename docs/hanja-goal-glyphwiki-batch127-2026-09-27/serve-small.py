import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent/'serve.py').read_text()
source=source.replace("source=source.replace(", "source=source.replace('engine-proof.json','small-engine-proof.json').replace(").replace('52092','52093')
exec(compile(source,str(Path(__file__).resolve()),'exec'))
