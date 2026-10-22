#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pinned parameter launcher for the unchanged static raw comparator.
No rendering/XML/route function is copied. Original file/source assertions remain.
The original sidecar-only guards are explicitly replaced by equivalent config-SHA,
launcher-SHA, shared-code-SHA and all input-SHA guards; nothing is silently skipped.
"""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,importlib.util,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py'
SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
PAGE_CSS_OLD=".grid{display:grid;grid-template-columns:repeat(2,540px);gap:10px;width:max-content}.panel{width:540px}svg{display:block;width:520px;height:520px;min-width:520px;min-height:520px}"
PAGE_CSS_NEW=".grid{display:grid;grid-template-columns:minmax(0,520px);gap:10px;width:100%;max-width:520px}.panel{width:100%;max-width:520px}svg{display:block;width:520px;height:520px;max-width:100%;min-width:0;min-height:0}"
FIVE=['defaults','engineHashes','engineRevision','groups','trace']
def require(value,message):
    if not value:raise ValueError(message)
def digest(raw):return hashlib.sha256(raw).hexdigest()
def pinned_path(value):
    require(type(value)is str and 0<len(value)<512,'relative source path required')
    p=Path(value);require(not p.is_absolute()and'..'not in p.parts,'relative source path only')
    q=(ROOT/p).resolve();require(q.is_relative_to(ROOT)and q==ROOT/p and q.is_file(),'fixed repository file only')
    return q
def hexsha(value):return type(value)is str and re.fullmatch(r'[0-9a-f]{64}',value)is not None
def validate_original_empty_body3(spec,path):
    # Explicit original u7050 opt-in only; the default full5 contract is unchanged.
    require(spec['root']=='u7050' and spec['file']=='docs/hanja-goal-glyphwiki-batch1017-2026-10-13/engine-whole-u7050.json' and spec['fileSHA256']=='48c62ed4fbebc6fd0bb1103b93c578054532103f253d97e08949f84ed62a5e30','exact original u7050 body3 required')
    fixed=spec['existingMatchingFull5']
    require(fixed=={'file':'docs/hanja-goal-glyphwiki-batch1017-2026-10-13/engine-proof.json','fileSHA256':'f8bb397b969b2d0df140586790f7372c622d4286c09c30aa6e2e442c9ec4eeec','proofKeys':FIVE},'exact original full5 basename and pin required')
    require(spec['nonDrawingRawRows']==[{'raw':5,'sourceKind':0,'calls':0,'polygons':0}],'exact original empty raw5 contract required')
    require(spec['proofKeys']==['defaults','groups','trace'] and spec['proofKind']=='body3-bound-to-existing-exact-full5','explicit bound body3 required')
    require((spec['rawGroups'],spec['drawingCalls'],spec['polygons'])==(24,23,49),'original24/23/49 counts required')
    raw=path.read_bytes();whole=pinned_path(fixed['file']).read_bytes()
    require(digest(raw)==spec['fileSHA256'] and digest(whole)==fixed['fileSHA256'],'original body/full5 pins changed')
    body,full=json.loads(raw),json.loads(whole)
    require(sorted(body)==['defaults','groups','trace'] and sorted(full)==FIVE and all(body[k]==full[k] for k in ['defaults','groups','trace']),'single original full5/body3 mismatch')
    groups,trace=body['groups'],body['trace']
    require(len(groups)==len(trace)==24 and groups[4]=={'raw':[0,0,0,0,None,None,None,None,None,None,None],'polygons':[]} and trace[4]==[],'raw5 kind0/P0/trace0 must agree')
    require(all(len(row)==(0 if i==4 else 1) for i,row in enumerate(trace)) and sum(map(len,trace))==23,'original empty row and23 calls required')
    require([len(g['polygons']) for g in groups]==spec['polygonCounts'] and sum(map(lambda g:len(g['polygons']),groups))==49,'original49 polygons required')
    require(all(g['raw'][0]!=0 and len(g['polygons'])>0 for i,g in enumerate(groups) if i!=4),'only raw5 is non-drawing')
    require([g['polygons'] for g in groups]==[[p for call in row for p in call['polygons']] for row in trace],'original raw/trace/P correspondence changed')

def main():
    require(__debug__ and sys.flags.optimize==0,'optimized assertion-free execution forbidden')
    parser=argparse.ArgumentParser(description='Pinned static whole/raw/domestic comparison; ROOT starts HTTP.')
    parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    require(0<=args.port<=65535 and hexsha(args.config_sha),'fixed port/config SHA required')
    config_path=pinned_path(args.config);require(config_path.name=='config.json'and config_path.parent.parent==ROOT/'docs'and config_path.parent.name.startswith('hanja-source-raw-compare-'),'comparison config location required')
    config_bytes=config_path.read_bytes();require(len(config_bytes)<=65536 and digest(config_bytes)==args.config_sha,'config SHA changed')
    config=json.loads(config_bytes)
    keys={'schema','glyph','catalogStrokes','sourceViewBox','defaultSource','sourceRoots','domestic','inputSHA256','holdSummary','launcherSHA256','sharedServe','noPartialAnimation','nativeApproval','runtimeApplied','guardMode','host','layoutMode'}
    require(type(config)is dict and set(config)==keys and config['schema']=='hanja-shared-static-raw-compare/v1','exact config fields required')
    require(type(config['glyph'])is str and len(config['glyph'])==1 and type(config['catalogStrokes'])is int and 1<=config['catalogStrokes']<=128,'glyph/count required')
    require(config['sourceViewBox']=='0 0 200 200'and config['host']=='127.0.0.1'and config['layoutMode']=='stacked520-css-only','original source/local host required')
    require(config['nativeApproval']is False and config['runtimeApplied']is False and config['noPartialAnimation']is True and config['guardMode']=='explicit-parameter-pins-v1','static unapproved scope required')
    require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA}and hexsha(config['launcherSHA256']),'shared code identity changed')
    roots=config['sourceRoots'];require(type(roots)is dict and 1<=len(roots)<=8 and config['defaultSource']in roots,'selected original roots required')
    for label,spec in roots.items():
        require(re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]{0,31}',label)is not None and type(spec)is dict,'static root label required')
        source_keys={'root','file','fileSHA256','proofKeys','proofKind','sourceProofIdentity','rawGroups','drawingCalls','polygonCounts','polygons'}
        bound_body='existingMatchingFull5'in spec or'nonDrawingRawRows'in spec
        require(set(spec)==(source_keys|{'existingMatchingFull5','nonDrawingRawRows'} if bound_body else source_keys),'exact source spec fields required')
        require(type(spec['root'])is str and re.fullmatch(r'u[0-9a-f]{4,6}(?:-[a-z0-9-]+)?',spec['root'])is not None,'original root identity required')
        path=pinned_path(spec['file']);require(path.name=='engine-whole-'+spec['root']+'.json'and hexsha(spec['fileSHA256']),'actual whole file required')
        if bound_body:validate_original_empty_body3(spec,path)
        else:require(spec['proofKeys']==FIVE and spec['proofKind']=='actual-full5-direct','single actual full5 only; no header synthesis')
        require(spec['sourceProofIdentity']=={'sourceRoot':spec['root'],'sourceProofFile':path.name,'sourceProofFileSha256':spec['fileSHA256']},'exact source identity3 required')
        require(type(spec['rawGroups'])is int and 1<=spec['rawGroups']<=128 and type(spec['drawingCalls'])is int and ((not bound_body and spec['drawingCalls']>=spec['rawGroups'])or(bound_body and spec['rawGroups']==24 and spec['drawingCalls']==23)),'raw/call counts required')
        require(type(spec['polygonCounts'])is list and len(spec['polygonCounts'])==spec['rawGroups']and all(type(n)is int and n>=0 for n in spec['polygonCounts'])and type(spec['polygons'])is int and sum(spec['polygonCounts'])==spec['polygons'],'original polygon counts required')
    domestic=config['domestic'];require(type(domestic)is dict and set(domestic)=={'url','status','bytes','sha256','clips','glyph','privateMediaSaved'}and domestic['glyph']==config['glyph']and domestic['status']==200 and domestic['clips']==config['catalogStrokes']and domestic['privateMediaSaved']is False and type(domestic['bytes'])is int and 0<domestic['bytes']<=1048576 and hexsha(domestic['sha256']),'pinned domestic metadata required')
    require(type(domestic['url'])is str and re.fullmatch(r'http://img\.e-hanja\.kr/hanjaSvg/aniSVG/[0-9A-Fa-f]{4}/[0-9A-Fa-f]{4,6}\.svg',domestic['url'])is not None and domestic['url'].rsplit('/',1)[-1].lower()==format(ord(config['glyph']),'x')+'.svg','fixed domestic source only')
    require(type(config['inputSHA256'])is dict and all(type(p)is str and hexsha(h)for p,h in config['inputSHA256'].items()),'input pins required')
    for spec in roots.values():
        require(config['inputSHA256'].get(spec['file'])==spec['fileSHA256'],'selected whole absent from input pins')
        if 'existingMatchingFull5'in spec:require(config['inputSHA256'].get(spec['existingMatchingFull5']['file'])==spec['existingMatchingFull5']['fileSHA256'],'original matching full5 absent from input pins')
    def parameter_guards():
        require(digest(config_path.read_bytes())==args.config_sha,'config changed')
        require(digest(Path(__file__).read_bytes())==config['launcherSHA256'],'launcher changed')
        require(digest(pinned_path(SHARED).read_bytes())==SHARED_SHA,'shared code changed')
        for path,expected in config['inputSHA256'].items():require(digest(pinned_path(path).read_bytes())==expected,'original input changed: '+path)
    parameter_guards()
    # Main guard prevents HTTP, source projection or dictionary access during import.
    spec=importlib.util.spec_from_file_location('hanja_static_raw_shared',pinned_path(SHARED));shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
    require(shared.FETCH_COUNT==0 and callable(shared.main)and callable(shared.load_sources),'unchanged shared entry contract required')
    shared.CONFIG=config;shared.HERE=config_path.parent;shared.ROOT=ROOT
    # Explicit replacement of sidecar location guards; all original source/XML/route guards stay byte-exact.
    shared.guards=parameter_guards
    # Explicit CSS-only response wrapper: original page function and every SVG byte stay unchanged.
    original_page=shared.page
    def stacked_page(*params):
        original=original_page(*params);require(original.count(PAGE_CSS_OLD)==1,'exact original CSS hook changed')
        page=original.replace(PAGE_CSS_OLD,PAGE_CSS_NEW,1)
        require(page.replace(PAGE_CSS_NEW,PAGE_CSS_OLD,1)==original,'CSS inverse changed original page/SVG bytes')
        return page
    shared.page=stacked_page
    if args.check_only:
        sources=shared.load_sources();require(shared.FETCH_COUNT==0,'preparation cannot fetch domestic media')
        print(json.dumps({'guardMode':config['guardMode'],'sharedFunctionCopies':0,'roots':list(sources),'domesticCount':config['catalogStrokes'],'raw':{k:len(p['groups'])for k,p in sources.items()},'HTTP':0,'server':0,'sourceCompiler':0,'engine':0,'projection':0,'nativeApproval':False}));return
    original_argv=sys.argv
    try:
        sys.argv=[str(pinned_path(SHARED)),'--port',str(args.port)]
        shared.main()
    finally:sys.argv=original_argv
if __name__=='__main__':main()
