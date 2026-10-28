"""Exact 柖9 original clock; private SVG styles/CSS remain in RAM."""
import sys,hashlib,importlib.util,copy,json,re
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
BASE='scripts/hanja-official-media-compare-mm-grass.py'
BASE_SHA='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()==BASE_SHA
sp=importlib.util.spec_from_file_location('shao_safe_original_clock',ROOT/BASE);g=importlib.util.module_from_spec(sp);sp.loader.exec_module(g)
g.CASES=[{"unicode":"u67d6","glyph":"柖","clips":9,"safeMetadata":{"path":"docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/source-clock-metadata-safe.json","SHA256":"c8de8c40780e21634b040c9b3726fa2bc25c54e139562301a5b36855843188b1"},"metadataFile":"docs/hanja-goal-glyphwiki-batch661-2026-10-11/metadata.json","metadataSHA256":"3ab48781bf13575955b469cc30ca2466b7fa2a3cb6a20af887232b0d5d99a3e2","svg":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67D6.svg","bytes":4708,"sha256":"86ffce91cccea3feb58cf806a5821b2e3b9bc3c043f3f7d83e3b5770f7129bba"},"files":["source-clock-config.json"]}]
g.SELF='docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/clock.py'
def validate(config,path):
 c=g.CASES[0];g.require(path==ROOT/'docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/source-clock-config.json','one exact 柖9 original clock config')
 g.require(config['glyph']=='柖'and config['sourceRoot']=='u67d6-source-original'and config['domesticClips']==9 and config['allowedStrokes']==list(range(1,10))and config['defaultStroke']==1,'fixed original9 clock selection only')
 g.require(config['safeMetadata']==c['safeMetadata']and config['metadataFile']==c['metadataFile']and config['metadataSHA256']==c['metadataSHA256'],'exact source metadata pins')
 raw=g.pinned(c['safeMetadata']['path']).read_bytes();g.require(g.sha(raw)==c['safeMetadata']['SHA256'],'safe clock metadata changed');safe=json.loads(raw)
 g.require(safe['glyph']=='柖'and safe['privateSVGStylesOrCSSSaved']is False and len(safe['timedPaths'])==9,'only safe original9 metadata')
 g.require(config['media']['svg']==c['svg']and config['timedPaths']==safe['timedPaths']and config['svgRoot']==safe['svgRoot'],'exact original clock fingerprint')
 g.require(config['styleMetadataMode']=='sha256-only/restore-original-in-native-RAM'and g.sha(g.pinned(g.SELF).read_bytes())==config['launcherSHA256'],'private styles RAM only and exact launcher')
 raw=g.pinned(c['metadataFile']).read_bytes();g.require(g.sha(raw)==c['metadataSHA256'],'publisher metadata changed');meta=json.loads(raw)
 g.require(meta['glyph']=='柖'and meta['candidate']['strokes']==9 and{k:meta['dictionary'][k]for k in['url','bytes','sha256']}==c['svg'],'original metadata661 glyph/count/svg identity')
 result=copy.deepcopy(config);result.pop('safeMetadata');result.pop('styleMetadataMode')
 for row in result['timedPaths']:
  digest=row.pop('inlineStyleSHA256');g.require(type(digest)is str and re.fullmatch('[0-9a-f]{64}',digest),'style digest only');row['inlineStyle']=digest
 g.BASE.validate(result);return result
g.validate_safe=validate
if __name__=='__main__':g.main()
