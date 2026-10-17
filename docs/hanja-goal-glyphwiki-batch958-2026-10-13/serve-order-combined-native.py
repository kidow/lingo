import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path

HERE = Path(__file__).resolve().parent
template = HERE.parent / 'hanja-goal-glyphwiki-batch956-2026-10-13' / 'serve-combined-native.py'
raw = template.read_bytes()
assert hashlib.sha256(raw).hexdigest() == 'd1e99ec56d0aabca7fdd33a680e8729379dbec05c0543c25d6ecf697429fdf13', 'Pinned combined route template changed'
source = raw.decode('utf-8')
assert source.count('native-combined-preparation.json') == 2, 'Exact combined configuration anchors changed'
source = source.replace('native-combined-preparation.json', 'source-order-combined-preparation.json')
source = source.replace('b956_combined_immutable_ram_renderer', 'b958_corrected_immutable_ram_renderer')
original_return = '''    return '<svg viewBox="0 0 100 100" aria-label="'+html.escape(name)+'"><path fill="#242422" d="'+paths+'"/></svg>' '''.rstrip()
replacement_return = '''    return '<svg viewBox="0 0 200 200" aria-label="'+html.escape(name)+'"><g fill="#242422">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>' '''.rstrip()
assert source.count(original_return) == 1, 'Exact original whole display anchor changed'
source = source.replace(original_return, replacement_return)
exec(compile(source, str(HERE / 'serve-order-combined-native.py'), 'exec'), globals())
