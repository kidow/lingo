"""Single exact 朕 original-clock review. Private SVG/CSS remains native RAM only."""
import sys,hashlib,importlib.util,copy,json,re
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
BASE='scripts/hanja-official-media-compare-mm-grass.py'
BASE_SHA='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()==BASE_SHA
s=importlib.util.spec_from_file_location('bing_safe_original_clock',ROOT/BASE);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
g.CASES=[{"unicode":"u6715","glyph":"朕","clips":10,"safeMetadata":{"path":"docs/hanja-official-media-compare-u6715-2026-10-29/source-metadata-safe.json","SHA256":"9500e4982ae79c119da4d3e1087e05825edae4dd7c062d4c0e0fe7644aee7dce"},"metadataFile":"docs/hanja-g1-batch24-2026-09-20/review.json","metadataSHA256":"5b3c180ede3228b86446fe2a23b7fb2e70a94c82b3d7c10fd1d94a8abf729f83","svg":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6715.svg","bytes":5169,"sha256":"41b07ff5d28bc56eb816e3f2da5ebf459dbc60c20036c31e90418b2ae86151e9"},"files":["config-all.json"]}]
g.SELF='docs/hanja-official-media-compare-u6715-2026-10-29/clock.py'
def validate(config,path):
    c=g.CASES[0];g.require(path==ROOT/'docs/hanja-official-media-compare-u6715-2026-10-29/config-all.json','one exact clock config')
    g.require(config['glyph']=='朕'and config['sourceRoot']=='u6715-source-original'and config['domesticClips']==10 and config['allowedStrokes']==list(range(1,11))and config['defaultStroke']==1,'fixed original ten-path context')
    g.require(config['safeMetadata']==c['safeMetadata']and config['metadataFile']==c['metadataFile']and config['metadataSHA256']==c['metadataSHA256'],'exact metadata pins')
    safe_raw=g.pinned(c['safeMetadata']['path']).read_bytes();g.require(g.sha(safe_raw)==c['safeMetadata']['SHA256'],'safe metadata changed');safe=json.loads(safe_raw)
    g.require(config['media']['svg']==c['svg']and config['timedPaths']==safe['timedPaths']and config['svgRoot']==safe['svgRoot'],'exact full clock fingerprint')
    g.require(config['styleMetadataMode']=='sha256-only/restore-original-in-native-RAM'and g.sha(g.pinned(g.SELF).read_bytes())==config['launcherSHA256'],'private styles RAM only and exact launcher')
    raw=g.pinned(c['metadataFile']).read_bytes();g.require(g.sha(raw)==c['metadataSHA256'],'publisher metadata changed');allmeta=json.loads(raw);entries=[e for e in allmeta['entries']if e['glyph']=='朕'];g.require(len(entries)==1,'one exact nested dictionary entry');meta=entries[0]
    g.require(meta['glyph']=='朕'and meta['strokes']==10 and{k:meta['dictionary'][k]for k in['url','bytes','sha256']}==c['svg'],'actual batch24 nested review metadata shape/count')
    result=copy.deepcopy(config);result.pop('safeMetadata');result.pop('styleMetadataMode')
    for row in result['timedPaths']:
        digest=row.pop('inlineStyleSHA256');g.require(type(digest)is str and re.fullmatch('[0-9a-f]{64}',digest),'exact style hash only');row['inlineStyle']=digest
    g.BASE.validate(result);return result
g.validate_safe=validate
if __name__=='__main__':g.main()
