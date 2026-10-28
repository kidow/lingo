"""Single exact 炚 original-clock review. Private SVG/CSS remains native RAM only."""
import sys,hashlib,importlib.util,copy,json,re
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
BASE='scripts/hanja-official-media-compare-mm-grass.py'
BASE_SHA='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()==BASE_SHA
s=importlib.util.spec_from_file_location('bing_safe_original_clock',ROOT/BASE);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
g.CASES=[{"unicode":"u709a","glyph":"炚","clips":8,"safeMetadata":{"path":"docs/hanja-official-media-compare-u709a-2026-10-29/source-metadata-safe.json","SHA256":"9a40858a2a71b355264bd1d924a4b17af616fdf2a91878d84fd08dc1066d7d5c"},"metadataFile":"docs/hanja-official-media-compare-u709a-2026-10-25/metadata.json","metadataSHA256":"16a788c14f4a641fa4e0f240e77124e7537e390256076922bd1d629b36abf4c9","svg":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/709A.svg","bytes":4217,"sha256":"5cf18aef19ac43647596f044b0a1ea2a083aa55d9aea82e286e9b11d0fd67a63"},"files":["config-all.json"]}]
g.SELF='docs/hanja-official-media-compare-u709a-2026-10-29/clock.py'
def validate(config,path):
    c=g.CASES[0];g.require(path==ROOT/'docs/hanja-official-media-compare-u709a-2026-10-29/config-all.json','one exact clock config')
    g.require(config['glyph']=='炚'and config['sourceRoot']=='u709a-source-original'and config['domesticClips']==8 and config['allowedStrokes']==list(range(1,9))and config['defaultStroke']==1,'fixed original eight-path context')
    g.require(config['safeMetadata']==c['safeMetadata']and config['metadataFile']==c['metadataFile']and config['metadataSHA256']==c['metadataSHA256'],'exact metadata pins')
    safe_raw=g.pinned(c['safeMetadata']['path']).read_bytes();g.require(g.sha(safe_raw)==c['safeMetadata']['SHA256'],'safe metadata changed');safe=json.loads(safe_raw)
    g.require(config['media']['svg']==c['svg']and config['timedPaths']==safe['timedPaths']and config['svgRoot']==safe['svgRoot'],'exact full clock fingerprint')
    g.require(config['styleMetadataMode']=='sha256-only/restore-original-in-native-RAM'and g.sha(g.pinned(g.SELF).read_bytes())==config['launcherSHA256'],'private styles RAM only and exact launcher')
    raw=g.pinned(c['metadataFile']).read_bytes();g.require(g.sha(raw)==c['metadataSHA256'],'publisher metadata changed');meta=json.loads(raw)
    g.require(meta['glyph']=='炚'and meta['candidate']['strokes']==8 and meta['dictionary']['clips']==8 and{k:meta['dictionary'][k]for k in['url','bytes','sha256']}==c['svg'],'actual fixed metadata dictionary identity')
    g.require(g.sha(g.pinned("docs/hanja-official-media-compare-u709a-2026-10-25/config.json").read_bytes())=="21e556a06bb7e6be31a8d66381bc02aeb0ff58084c60f89398f21fc0b4c36d74",'historical clock fingerprint unchanged')
    g.require(config['nativeApproval']is False and config['runtimeApplied']is False,'media inspection is not candidate approval')
    result=copy.deepcopy(config);result.pop('safeMetadata');result.pop('styleMetadataMode')
    for row in result['timedPaths']:
        digest=row.pop('inlineStyleSHA256');g.require(type(digest)is str and re.fullmatch('[0-9a-f]{64}',digest),'exact style hash only');row['inlineStyle']=digest
    g.BASE.validate(result);return result
g.validate_safe=validate
if __name__=='__main__':g.main()
