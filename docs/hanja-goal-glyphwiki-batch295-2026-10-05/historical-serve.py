import sys
sys.dont_write_bytecode=True
from pathlib import Path
source=(Path(__file__).resolve().parent/'serve.py').read_text()
source=source.replace('u51de-k','u51de').replace('groups=[[0],[1,2],[4],[5],[6,7],[8],[9],[3],[10],[11,12],[13],[14],[15],[16],[17]]','groups=[[0],[1,2],[19],[12],[13],[14,15],[16],[17],[11,18],[3,4],[5],[6],[7],[8],[9],[10]]').replace('52592','52593')
source=source.replace("exec(compile(source,str(Path(__file__).resolve()),'exec'))","source=source.replace('sources.json','historical-sources.json').replace('engine-proof.json','historical-engine-proof.json').replace('draw-trace.json','historical-draw-trace.json').replace('metadata.json','historical-metadata.json')\nexec(compile(source,str(Path(__file__).resolve()),'exec'))")
exec(compile(source,str(Path(__file__).resolve()),'exec'))
