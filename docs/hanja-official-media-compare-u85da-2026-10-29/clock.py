"""藚 original19 clock: exact SVG/CSS pins, all original timing/styles native RAM only."""
import sys,hashlib,importlib.util,json,re,xml.etree.ElementTree as ET
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE='scripts/hanja-official-media-compare-mm-grass.py';BASE_SHA='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
EXPECTED=json.loads("{\"config-first.json\":{\"schema\":\"hanja-pinned-original-clock-runtime-metadata/v1\",\"glyph\":\"藚\",\"catalogStrokes\":19,\"sourceRoot\":\"u85da-source-original\",\"domesticClips\":19,\"allowedStrokes\":[1,2,3,4,5,6,7,8,9,10],\"defaultStroke\":1,\"media\":{\"svg\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85DA.svg\",\"bytes\":8746,\"sha256\":\"c988d7b146417c7e427452d678acf47d6a7430afb0b2675a3304ef0b20928da7\"},\"css\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css\",\"bytes\":804,\"sha256\":\"5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18\"}},\"metadataFile\":\"docs/hanja-goal-glyphwiki-batch665-2026-10-11/metadata.json\",\"metadataSHA256\":\"9b4fdbc937bc57f43127214253ae72400646e7cd91d4966b978e6af27bcf6982\",\"shared\":{\"path\":\"scripts/hanja-official-media-review.py\",\"SHA256\":\"76d075a03beb017dc2fa88a9534bc87cd2e936635d27e73ad3b7ac45cb6cce48\"},\"scope\":\"controlled-original-media-only/no-temporal-approval\",\"nativeApproval\":false,\"runtimeApplied\":false,\"styleMetadataMode\":\"exact-whole-SVG-pin/derive-original-timing-in-native-RAM-only\",\"privateSVGStylesOrCSSSaved\":false},\"config-rest.json\":{\"schema\":\"hanja-pinned-original-clock-runtime-metadata/v1\",\"glyph\":\"藚\",\"catalogStrokes\":19,\"sourceRoot\":\"u85da-source-original\",\"domesticClips\":19,\"allowedStrokes\":[11,12,13,14,15,16,17,18,19],\"defaultStroke\":11,\"media\":{\"svg\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85DA.svg\",\"bytes\":8746,\"sha256\":\"c988d7b146417c7e427452d678acf47d6a7430afb0b2675a3304ef0b20928da7\"},\"css\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css\",\"bytes\":804,\"sha256\":\"5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18\"}},\"metadataFile\":\"docs/hanja-goal-glyphwiki-batch665-2026-10-11/metadata.json\",\"metadataSHA256\":\"9b4fdbc937bc57f43127214253ae72400646e7cd91d4966b978e6af27bcf6982\",\"shared\":{\"path\":\"scripts/hanja-official-media-review.py\",\"SHA256\":\"76d075a03beb017dc2fa88a9534bc87cd2e936635d27e73ad3b7ac45cb6cce48\"},\"scope\":\"controlled-original-media-only/no-temporal-approval\",\"nativeApproval\":false,\"runtimeApplied\":false,\"styleMetadataMode\":\"exact-whole-SVG-pin/derive-original-timing-in-native-RAM-only\",\"privateSVGStylesOrCSSSaved\":false}}")
def sha(raw):return hashlib.sha256(raw).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
require(sha((ROOT/BASE).read_bytes())==BASE_SHA,'fixed original-clock adapter changed')
s=importlib.util.spec_from_file_location('xuan_exact_original_clock',ROOT/BASE);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
def validate(config,path):
    require(path.parent==HERE and path.name in EXPECTED,'one exact original19 clock config')
    require({k:v for k,v in config.items()if k!='launcherSHA256'}==EXPECTED[path.name],'exact clock metadata context')
    require(sha(Path(__file__).resolve().read_bytes())==config.get('launcherSHA256'),'clock wrapper changed')
    raw=(ROOT/config['metadataFile']).read_bytes();require(sha(raw)==config['metadataSHA256'],'original metadata changed');meta=json.loads(raw)
    require(meta['glyph']=='藚'and meta['candidate']['strokes']==19 and {k:meta['dictionary'][k]for k in['url','bytes','sha256']}==config['media']['svg'],'exact catalog19 and original19 metadata and byte pin')
    require(config['shared']=={'path':g.BASE.SHARED,'SHA256':g.BASE.SHARED_SHA},'fixed RAM fetch primitive')
    return config
def restore(svg,config):
    # Whole source byte pin was checked by the unchanged fetch primitive before this function.
    root=ET.fromstring(svg);rows=[]
    for path in root.iter(g.BASE.NS+'path'):
        if not path.get('clip-path'):continue
        style=path.get('style','');d=re.search(r'--d:\s*(\d+)ms',style);t=re.search(r'--t:\s*(\d+)ms',style);require(d and t,'original timing declarations')
        geometry=json.dumps([[k,path.get(k)]for k in g.BASE.GEOMETRY],separators=(',',':'),ensure_ascii=False).encode();rows.append({'id':path.get('id'),'class':path.get('class'),'clipPath':path.get('clip-path'),'delayMs':int(d[1]),'durationMs':int(t[1]),'pathLength':path.get('pathLength'),'inlineStyle':style,'geometrySHA256':sha(geometry)})
    rows.sort(key=lambda r:r['delayMs']);rows=[dict(stroke=i,**v)for i,v in enumerate(rows,1)];require(len(rows)==19,'all19 original timed paths')
    ram={k:config[k]for k in['glyph','sourceRoot','domesticClips','allowedStrokes','defaultStroke','media','metadataFile','metadataSHA256','shared','launcherSHA256','scope','nativeApproval','runtimeApplied']}
    ram.update(schema='hanja-pinned-original-media-compare/v1',svgRoot=dict(root.attrib),timedPaths=rows,inertOriginalScripts=[g.BASE.INERT_SCRIPT])
    g.BASE.validate(ram);g.BASE.validate_media(svg,ram);return ram
def validate_selection_shape(config):
    # Explicit public synthetic shape test only. Never served/rendered or claimed original timing.
    ram={k:config[k]for k in['glyph','sourceRoot','domesticClips','allowedStrokes','defaultStroke','media','metadataFile','metadataSHA256','shared','launcherSHA256','scope','nativeApproval','runtimeApplied']}
    rows=[dict(stroke=i,id=None,clipPath='url(#synthetic-'+str(i)+')',**{'class':None},delayMs=i*2,durationMs=1,pathLength='1',inlineStyle='synthetic-only',geometrySHA256='0'*64)for i in range(1,20)]
    ram.update(schema='hanja-pinned-original-media-compare/v1',svgRoot={'id':'synthetic-not-original','class':'synthetic','viewBox':'0 0 1 1','version':'1.1'},timedPaths=rows,inertOriginalScripts=[g.BASE.INERT_SCRIPT])
    g.BASE.validate(ram)
    invalid=dict(ram,allowedStrokes=list(range(1,18)),defaultStroke=1)
    try:g.BASE.validate(invalid)
    except ValueError as exc:require(str(exc)=='Explicit selected stroke allowlist required','exact max16 guard rejection')
    else:raise ValueError('17 selections unexpectedly allowed')
g.validate_safe=validate;g.restore_private_styles=restore
if __name__=='__main__':
    if '--check-only'in sys.argv:
        import argparse
        p=argparse.ArgumentParser();p.add_argument('--config',required=True);p.add_argument('--config-sha',required=True);p.add_argument('--check-only',action='store_true');p.add_argument('--port',type=int,default=0);a=p.parse_args();require(0<=a.port<=65535,'local port');path=(ROOT/a.config).resolve();raw=path.read_bytes();require(sha(raw)==a.config_sha,'config SHA');c=json.loads(raw);validate(c,path);validate_selection_shape(c);print(json.dumps({'guardPass':True,'glyph':'藚','catalog':19,'domestic':19,'selected':c['allowedStrokes'],'timedPathsNotYetFetched':True,'commonValidatorSynthetic19ShapePassed':True,'selectedCount17Rejected':True,'originalClockVerified':False,'HTTP':0,'server':0,'privateFetch':0,'nativeApproval':False}))
    else:g.main()
