"""Read official count evidence and parse the pinned XLS in memory; never writes files."""
import hashlib
import importlib.abc
import importlib.util
import io
import json
from pathlib import Path
import sys
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[2]
def get(url):
    with urllib.request.urlopen(url, timeout=30) as response:
        return response.read()

package = json.loads(get('https://pypi.org/pypi/xlrd/2.0.2/json'))
wheel = next(item for item in package['urls'] if item['packagetype'] == 'bdist_wheel')
raw = get(wheel['url'])
assert hashlib.sha256(raw).hexdigest() == wheel['digests']['sha256']
archive = zipfile.ZipFile(io.BytesIO(raw))
class MemoryWheel(importlib.abc.MetaPathFinder, importlib.abc.Loader):
    def find_spec(self, fullname, path=None, target=None):
        name = fullname.replace('.', '/')
        if name + '/__init__.py' in archive.namelist():
            return importlib.util.spec_from_loader(fullname, self, is_package=True)
        if name + '.py' in archive.namelist():
            return importlib.util.spec_from_loader(fullname, self)
    def create_module(self, spec):
        return None
    def exec_module(self, module):
        name = module.__name__.replace('.', '/')
        path = name + ('/__init__.py' if module.__spec__.submodule_search_locations is not None else '.py')
        module.__file__ = '<memory-wheel>/' + path
        exec(compile(archive.read(path), module.__file__, 'exec'), module.__dict__)
sys.meta_path.insert(0, MemoryWheel())
spec = importlib.util.spec_from_file_location('hanja_source', ROOT / 'scripts/hanja-source.py')
source = importlib.util.module_from_spec(spec)
spec.loader.exec_module(source)
workbook = source.workbook()
assert workbook['source']['sha256'] == '97b8db715ebe1dd6e00e8e58d338a9ba70e7420bf5ec84da38f987d60eb64b17'
rows = [row for row in workbook['rows'] if row['glyph'] in ('幣', '蔽')]
assert [(r['glyph'], r['sourceRow'], int(r['strokes'])) for r in rows] == [('幣', 5317, 15), ('蔽', 5318, 16)]
url = 'https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=16424'
page = get(url)
text = page.decode('utf-8')
assert '7획' in text and '幣' in text and '蔽' in text
print(json.dumps({
    'date': '2026-09-15',
    'counsel': {'url': url, 'bytes': len(page), 'sha256': hashlib.sha256(page).hexdigest(),
        'published': '2025-09-13',
        'finding': 'The answer explicitly applies the seven-stroke 㡀 count to 幣 and 蔽 as well as other named characters.',
        'inference': 'Totals 14 for 幣 (7 + 4 + 3), 15 for 蔽 (4 + 7 + 4) follow the official explanation and individually observed full publisher sequences; the totals are not literal quotations.'},
    'workbook': workbook['source'], 'rows': rows,
    'parser': {'name': 'xlrd', 'version': '2.0.2', 'wheelUrl': wheel['url'], 'wheelSha256': wheel['digests']['sha256'], 'storage': 'memory only'}
}, ensure_ascii=False))
