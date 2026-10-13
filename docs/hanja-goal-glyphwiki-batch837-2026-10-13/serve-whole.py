import sys
sys.dont_write_bytecode = True
from pathlib import Path

reference = Path(__file__).resolve().parent.parent / 'hanja-goal-glyphwiki-batch827-2026-10-13/serve-whole.py'
source = reference.read_text()
source = source.replace('u80cf', 'u7f5d').replace('胏', '罝').replace('a827_review', 'b837_whole_review')
source = source.replace("'dictionaryStrokes':9", "'dictionaryStrokes':10").replace("'strokes':9", "'strokes':10")
source = source.replace('da46c90b54351faf3c8480c4568be78421462a379a062ec53e7935258ec02b0c', '20ae9844348627b616a2f3400530914565154268e29b43d94134e892dc5ebc84')
source = source.replace('64544', '64642')
exec(compile(source, str(Path(__file__).resolve()), 'exec'))
