"""Single exact 幷 original-clock review. Private SVG/CSS remains native RAM only."""
import sys,hashlib,importlib.util,copy,json,re
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
BASE='scripts/hanja-official-media-compare-mm-grass.py'
BASE_SHA='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()==BASE_SHA
s=importlib.util.spec_from_file_location('bing_safe_original_clock',ROOT/BASE);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
g.CASES=[{"unicode":"u5e77","glyph":"幷","clips":8,"safeMetadata":{"path":"docs/hanja-official-media-compare-u5e77-2026-10-28/source-metadata-safe.json","SHA256":"091b72aef993c8aebb74f274649396c5506c08b480db1ec5a88dd8430757baab"},"metadataFile":"docs/hanja-goal-glyphwiki-batch124-2026-09-27/metadata.json","metadataSHA256":"b8d210fbd2a13f0b829e9df6bd4ac2e6a6185c0bdbc59dd1a4c078c0b087a152","svg":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E77.svg","bytes":4143,"sha256":"b47babc95f8c0cb53135f991ad888d8df9a98dabf0c484db864ecbe397b9b79d"},"files":["config-all.json"]}]
g.SELF='docs/hanja-official-media-compare-u5e77-2026-10-28/clock.py'
def validate(config,path):
    c=g.CASES[0];g.require(path==ROOT/'docs/hanja-official-media-compare-u5e77-2026-10-28/config-all.json','one exact clock config')
    g.require(config['glyph']=='幷'and config['sourceRoot']=='u5e77-source-original'and config['domesticClips']==8 and config['allowedStrokes']==list(range(1,9))and config['defaultStroke']==1,'fixed original eight-path context')
    g.require(config['safeMetadata']==c['safeMetadata']and config['metadataFile']==c['metadataFile']and config['metadataSHA256']==c['metadataSHA256'],'exact metadata pins')
    safe_raw=g.pinned(c['safeMetadata']['path']).read_bytes();g.require(g.sha(safe_raw)==c['safeMetadata']['SHA256'],'safe metadata changed');safe=json.loads(safe_raw)
    g.require(config['media']['svg']==c['svg']and config['timedPaths']==safe['timedPaths']and config['svgRoot']==safe['svgRoot'],'exact full clock fingerprint')
    g.require(config['styleMetadataMode']=='sha256-only/restore-original-in-native-RAM'and g.sha(g.pinned(g.SELF).read_bytes())==config['launcherSHA256'],'private styles RAM only and exact launcher')
    raw=g.pinned(c['metadataFile']).read_bytes();g.require(g.sha(raw)==c['metadataSHA256'],'publisher metadata changed');meta=json.loads(raw)
    g.require(meta['glyph']=='幷'and meta['catalogStrokes']==8 and{k:meta['dictionary'][k]for k in['url','bytes','sha256']}==c['svg'],'actual batch124 metadata shape/count')
    result=copy.deepcopy(config);result.pop('safeMetadata');result.pop('styleMetadataMode')
    for row in result['timedPaths']:
        digest=row.pop('inlineStyleSHA256');g.require(type(digest)is str and re.fullmatch('[0-9a-f]{64}',digest),'exact style hash only');row['inlineStyle']=digest
    g.BASE.validate(result);return result
g.validate_safe=validate
if __name__=='__main__':g.main()
