"""Single exact 曙 original-clock review. Private SVG/CSS remains native RAM only."""
import sys,hashlib,importlib.util,copy,json,re
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
BASE='scripts/hanja-official-media-compare-mm-grass.py'
BASE_SHA='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()==BASE_SHA
s=importlib.util.spec_from_file_location('bing_safe_original_clock',ROOT/BASE);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
g.CASES=[{"unicode":"u66d9","glyph":"曙","clips":18,"safeMetadata":{"path":"docs/hanja-official-media-compare-u66d9-2026-10-29/source-metadata-safe.json","SHA256":"c63540119e6d8f69772b3dd7a4950353d4dbdb32e7d57d6c00f668bd8454b759"},"metadataFile":"docs/hanja-goal-glyphwiki-batch59-2026-09-22/metadata.json","metadataSHA256":"929f0d809e0c27d70ace42b456314d8bcef2aac4f000db351d695f115db3e3d3","svg":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66D9.svg","bytes":8681,"sha256":"45d0dff9820c84a9766132af56a97abb4e081b89d0e4a829e2356aa068e28d90"},"files":["config-all.json","config-remaining.json"]}]
g.SELF='docs/hanja-official-media-compare-u66d9-2026-10-29/clock.py'
def validate(config,path):
    c=g.CASES[0];g.require(path.parent==ROOT/'docs/hanja-official-media-compare-u66d9-2026-10-29'and path.name in['config-all.json','config-remaining.json'],'two exact18clock selections');expected=list(range(1,17))if path.name=='config-all.json'else[17,18]
    g.require(config['glyph']=='曙'and config['sourceRoot']=='u66d9-source-original'and config['domesticClips']==18 and config['allowedStrokes']==expected and config['defaultStroke']==expected[0],'fixed original eighteen-path context')
    g.require(config['safeMetadata']==c['safeMetadata']and config['metadataFile']==c['metadataFile']and config['metadataSHA256']==c['metadataSHA256'],'exact metadata pins')
    safe_raw=g.pinned(c['safeMetadata']['path']).read_bytes();g.require(g.sha(safe_raw)==c['safeMetadata']['SHA256'],'safe metadata changed');safe=json.loads(safe_raw)
    g.require(config['media']['svg']==c['svg']and config['timedPaths']==safe['timedPaths']and config['svgRoot']==safe['svgRoot'],'exact full clock fingerprint')
    g.require(config['styleMetadataMode']=='sha256-only/restore-original-in-native-RAM'and g.sha(g.pinned(g.SELF).read_bytes())==config['launcherSHA256'],'private styles RAM only and exact launcher')
    raw=g.pinned(c['metadataFile']).read_bytes();g.require(g.sha(raw)==c['metadataSHA256'],'publisher metadata changed');meta=json.loads(raw)
    g.require(meta['glyph']=='曙'and meta['catalogStrokes']==18 and{k:meta['dictionary'][k]for k in['url','bytes','sha256']}==c['svg'],'actual batch59 metadata shape/count')
    result=copy.deepcopy(config);result.pop('safeMetadata');result.pop('styleMetadataMode')
    for row in result['timedPaths']:
        digest=row.pop('inlineStyleSHA256');g.require(type(digest)is str and re.fullmatch('[0-9a-f]{64}',digest),'exact style hash only');row['inlineStyle']=digest
    g.BASE.validate(result);return result
g.validate_safe=validate
if __name__=='__main__':g.main()
