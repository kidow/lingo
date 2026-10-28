"""Pinned original-clock adapter: store style hashes, restore exact styles only in native RAM."""
import sys
sys.dont_write_bytecode=True
import argparse,copy,hashlib,importlib.util,json,re,xml.etree.ElementTree as ET
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse
ROOT=Path(__file__).resolve().parent.parent
SELF='scripts/hanja-official-media-compare-mm-grass.py'
BASE_FILE='scripts/hanja-official-media-compare-supplemental.py'
BASE_SHA='c1fc7e7b62eb6bf519179e10d6fa981975170a05a44a937c843b2cb9d455a064'
CASES=json.loads("[{\"unicode\":\"u850c\",\"glyph\":\"蔌\",\"clips\":15,\"safeMetadata\":{\"path\":\"docs/hanja-official-media-compare-u850c-2026-10-28/source-metadata-safe.json\",\"SHA256\":\"4995627f6db0dd2910e54e800915613ef066a2d27c64c357734a1297cccbf018\"},\"metadataFile\":\"docs/hanja-goal-glyphwiki-batch664-2026-10-11/metadata.json\",\"metadataSHA256\":\"e62f5c266ca916c8d5b19c4a2a2acd28dec4e5cbb493acc66c3018a244b30cfc\",\"svg\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/850C.svg\",\"bytes\":7459,\"sha256\":\"620ac651a5a3ff589ee36bb9f3cfc587d1b60b4431a4a906b5595ba9889d6eff\"},\"files\":[\"config-all.json\"]},{\"unicode\":\"u85aa\",\"glyph\":\"薪\",\"clips\":17,\"safeMetadata\":{\"path\":\"docs/hanja-official-media-compare-u85aa-2026-10-28/source-metadata-safe.json\",\"SHA256\":\"b45ee16ae680f9b21fe154ad4fbf73073986f141468ca00b68d77ff7ac445d38\"},\"metadataFile\":\"docs/hanja-goal-glyphwiki-batch1124-2026-10-14/metadata.json\",\"metadataSHA256\":\"238f92cb134b71a3de9d4e27811b7c27e2424c2234cdf40738b9549144c87788\",\"svg\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85AA.svg\",\"bytes\":8838,\"sha256\":\"fdf6d30028411b1b15b768238c919dbd44569ada1bb422e2b81a4e68e629f247\"},\"files\":[\"config-all.json\",\"config-remaining.json\"]},{\"unicode\":\"u8517\",\"glyph\":\"蔗\",\"clips\":15,\"safeMetadata\":{\"path\":\"docs/hanja-official-media-compare-u8517-2026-10-28/source-metadata-safe.json\",\"SHA256\":\"cef7a0da4c00a409bd0018163fc500e49b2a462c61f342172758e631d7e4693f\"},\"metadataFile\":\"docs/hanja-goal-glyphwiki-batch819-2026-10-13/metadata.json\",\"metadataSHA256\":\"9db7a428fea3c86865fc537ce8dd7ef1884c1611282bedc669ebc685b9bb9010\",\"svg\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8517.svg\",\"bytes\":8014,\"sha256\":\"e47233a60378fbc1ad14ea202169639f62e382144c2bda6e8bb7d228645ca378\"},\"files\":[\"config-all.json\"]}]")
def require(value,message):
    if not value:raise ValueError(message)
def sha(raw):return hashlib.sha256(raw).hexdigest()
def pinned(name):
    p=(ROOT/name).resolve();require(type(name)is str and not Path(name).is_absolute() and p.is_relative_to(ROOT),'pinned relative path only');return p
def load_module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
require(sha(pinned(BASE_FILE).read_bytes())==BASE_SHA,'existing original-clock base changed')
BASE=load_module('hanja_mm_grass_clock_base',pinned(BASE_FILE))
def validate_safe(config,config_path):
    matches=[c for c in CASES if config_path.parent==ROOT/('docs/hanja-official-media-compare-'+c['unicode']+'-2026-10-28') and config_path.name in c['files']]
    require(len(matches)==1,'closed three-glyph clock config required');case=matches[0]
    require(config['glyph']==case['glyph'] and config['sourceRoot']==case['unicode']+'-authored-mm' and config['domesticClips']==case['clips'],'exact candidate media identity')
    require(config['safeMetadata']==case['safeMetadata'] and config['metadataFile']==case['metadataFile'] and config['metadataSHA256']==case['metadataSHA256'],'exact safe/source metadata pins')
    require(sha(pinned(case['safeMetadata']['path']).read_bytes())==case['safeMetadata']['SHA256'],'safe metadata changed')
    safe=json.loads(pinned(case['safeMetadata']['path']).read_bytes())
    require(config['media']['svg']==case['svg'] and config['timedPaths']==safe['timedPaths'] and config['svgRoot']==safe['svgRoot'],'exact full clock fingerprint required')
    require(config['styleMetadataMode']=='sha256-only/restore-original-in-native-RAM','private inline styles stay in native RAM')
    require(config['nativeApproval']is False and config['runtimeApplied']is False,'media inspection is not temporal approval')
    expected=list(range(1,min(case['clips'],16)+1))if config_path.name=='config-all.json'else[17]
    require(config['allowedStrokes']==expected and config['defaultStroke']==expected[0],'fixed original stroke selections')
    require(sha(pinned(SELF).read_bytes())==config['launcherSHA256'],'candidate clock adapter pin')
    meta_raw=pinned(config['metadataFile']).read_bytes();require(sha(meta_raw)==config['metadataSHA256'],'original dictionary metadata changed');meta=json.loads(meta_raw)
    require(meta['glyph']==config['glyph'] and meta['candidate']['strokes']==meta['dictionary']['clips']==config['domesticClips'],'publisher/catalog count changed')
    require({k:meta['dictionary'][k]for k in['url','bytes','sha256']}==config['media']['svg'],'original media pin changed')
    projected=copy.deepcopy(config);projected.pop('safeMetadata');projected.pop('styleMetadataMode')
    for row in projected['timedPaths']:
        digest=row.pop('inlineStyleSHA256');require(type(digest)is str and re.fullmatch('[0-9a-f]{64}',digest),'exact inline-style hash only')
        row['inlineStyle']=digest # Type/clock-shape projection only, never rendered or claimed to be original CSS.
    BASE.validate(projected)
    return projected
def restore_private_styles(svg,config):
    projected=copy.deepcopy(config);projected.pop('safeMetadata');projected.pop('styleMetadataMode')
    root=ET.fromstring(svg);rows=[]
    for path in root.iter(BASE.NS+'path'):
        if not path.get('clip-path'):continue
        style=path.get('style','');d=re.search(r'--d:\s*(\d+)ms',style);t=re.search(r'--t:\s*(\d+)ms',style);require(d and t,'original clock properties missing')
        geometry=json.dumps([[k,path.get(k)]for k in BASE.GEOMETRY],separators=(',',':'),ensure_ascii=False).encode()
        rows.append({'id':path.get('id'),'class':path.get('class'),'clipPath':path.get('clip-path'),'delayMs':int(d[1]),'durationMs':int(t[1]),'pathLength':path.get('pathLength'),'inlineStyle':style,'geometrySHA256':sha(geometry)})
    rows.sort(key=lambda row:row['delayMs']);actual=[dict(stroke=i,**row)for i,row in enumerate(rows,1)]
    hashed=copy.deepcopy(actual)
    for row in hashed:row['inlineStyleSHA256']=sha(row.pop('inlineStyle').encode())
    require(hashed==config['timedPaths'],'full original private style/geometry hash mismatch')
    projected['timedPaths']=actual;BASE.validate(projected);BASE.validate_media(svg,projected)
    return projected
def main():
    parser=argparse.ArgumentParser(description='Three fixed MM-grass hypotheses: original publisher clock only, private styles in native RAM.')
    parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535 and re.fullmatch('[0-9a-f]{64}',args.config_sha),'asserted local config/port contract')
    path=pinned(args.config);raw=path.read_bytes();require(sha(raw)==args.config_sha,'safe config changed');config=json.loads(raw);validate_safe(config,path)
    if args.check_only:
        print(json.dumps({'guardPass':True,'glyph':config['glyph'],'selected':config['allowedStrokes'],'originalPrivateStylesRestored':False,'metadataPreviouslyVerifiedInNativeRAM':True,'HTTP':0,'server':0,'nativeApproval':False}));return
    shared=load_module('hanja_mm_grass_original_ram_fetch',pinned(BASE.SHARED));require(sha(pinned(BASE.SHARED).read_bytes())==BASE.SHARED_SHA and shared.FETCH_COUNT==0,'original RAM fetch primitive')
    svg,css=shared.fetch_asset(config['media']['svg']),shared.fetch_asset(config['media']['css']);require(shared.FETCH_COUNT==2,'exact two original RAM assets')
    ram=restore_private_styles(svg,config)
    svg_route,css_route=urlparse(config['media']['svg']['url']).path,urlparse(BASE.CSS['url']).path
    markup=BASE.page(ram,svg_route);routes={'/':(markup,'text/html; charset=utf-8'),svg_route:(svg,'image/svg+xml; charset=utf-8'),css_route:(css,'text/css; charset=utf-8')}
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.headers.get('Host')!='127.0.0.1:'+str(self.server.server_port)or self.path not in routes:
                self.send_error(404,'Pinned local route only');return
            body,mime=routes[self.path];self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store')
            policy="default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'none'; connect-src 'none'"if self.path!='/'else"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; object-src 'self'; frame-src http://127.0.0.1:"+str(self.server.server_port)+svg_route+"; connect-src 'none'; base-uri 'none'; form-action 'none'"
            self.send_header('Content-Security-Policy',policy);self.end_headers();self.wfile.write(body)
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':__import__('os').getpid(),'port':server.server_address[1],'RAMFetchCount':2,'glyph':config['glyph'],'selected':config['allowedStrokes'],'sourceStylesOrBodiesSaved':False}),flush=True)
    server.serve_forever()
if __name__=='__main__':main()
