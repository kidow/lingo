"""Exact 鱉22 original clock wrapper; publisher SVG/CSS stays in RAM."""
import sys,json,hashlib,importlib.util,copy
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
BASE='scripts/hanja-official-media-compare.py'
BASE_SHA='79466260c1f28f2f0c2492e75b74b6f70eac0749adb4100a2101b59dd9f24a30'
ORIGINAL='docs/hanja-official-media-compare-u9c49-2026-10-24/config.json'
ORIGINAL_SHA='88db3e902f8feef80a97c6d5acd53771078b077496ed2485393ebae02db7c60e'
CONFIG='docs/hanja-official-media-compare-u9c49-2026-10-29/config.json'
def sha(raw):return hashlib.sha256(raw).hexdigest()
assert sha((ROOT/BASE).read_bytes())==BASE_SHA
spec=importlib.util.spec_from_file_location('u9c49_fixed_original_clock',ROOT/BASE)
g=importlib.util.module_from_spec(spec);spec.loader.exec_module(g)
def load_config(name,expected_sha):
    g.require(name==CONFIG,'Exact 鱉22 clock config path required')
    raw=g.pinned_path(name).read_bytes()
    g.require(len(raw)<=65536 and sha(raw)==expected_sha,'Clock config changed')
    config=json.loads(raw)
    original_raw=g.pinned_path(ORIGINAL).read_bytes()
    g.require(sha(original_raw)==ORIGINAL_SHA,'Historical original22 config changed')
    original=json.loads(original_raw);expected=copy.deepcopy(original)
    expected.update(allowedStrokes=list(range(1,23)),defaultStroke=1,launcherSHA256=sha(Path(__file__).read_bytes()))
    g.require(config==expected,'Only exact original22 clock selection is allowed')
    projection=copy.deepcopy(config)
    projection.update(allowedStrokes=original['allowedStrokes'],defaultStroke=original['defaultStroke'],launcherSHA256=BASE_SHA)
    g.validate(projection)
    metadata_raw=g.pinned_path(config['metadataFile']).read_bytes()
    g.require(sha(metadata_raw)==config['metadataSHA256'],'Original metadata changed')
    metadata=json.loads(metadata_raw)
    g.require(metadata['glyph']=='鱉' and metadata['candidate']['strokes']==22 and metadata['dictionary']['clips']==22,'Original publisher22 identity changed')
    g.require({k:metadata['dictionary'][k]for k in ['url','bytes','sha256']}==config['media']['svg'],'Original publisher pin changed')
    return config
g.load_config=load_config
if __name__=='__main__':g.main()
