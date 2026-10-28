#!/usr/bin/env python3
# Pinned whole-only 臝/KAGE + 凡/HanziWriter author comparison; ROOT owns HTTP.
import sys
sys.dont_write_bytecode = True
import hashlib, html, importlib.util, json, math, re, xml.etree.ElementTree as ET
from fractions import Fraction
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
CONFIG='docs/hanja-source-raw-compare-u81dd-u51e1-whole-2026-10-28/config.json'
ADAPTER='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/static-whole-adapter.py'
SEMANTIC_SHA='4ab1d3e00e5efe660e0b557c4c5f267e071b21189cefd2501b82de2cc4236c90'
NS='{http://www.w3.org/2000/svg}'
def require(ok,message):
    if not ok: raise ValueError(message)
def sha(raw): return hashlib.sha256(raw).hexdigest()
def compact(value): return json.dumps(value,ensure_ascii=False,separators=(',',':')).encode()
def fixed(name):
    require(type(name)is str and not Path(name).is_absolute() and '..'not in Path(name).parts,'repository path required')
    p=(ROOT/name).resolve();require(p==ROOT/name and p.is_relative_to(ROOT)and p.is_file(),'fixed existing file required');return p
def pinned(spec):
    raw=fixed(spec['path']).read_bytes();require(sha(raw)==spec['SHA256'],'fixed source changed');return json.loads(raw)
def matrix(values):
    values=[float(Fraction(v))for v in values];require(len(values)==6 and all(math.isfinite(v)for v in values),'finite matrix required')
    return 'matrix('+' '.join(format(v,'.17g')for v in values)+')'
def load_sources(config):
    r=pinned(config['recipe']);ready=pinned(config['readiness'])
    require(r['schema']=='hanja-authored-mixed-whole-component-recipe/v1'and r['glyph']=='臝'and r['locallyAuthoredRoot']is True and r['mixedParts']is True,'fixed mixed source required')
    require(r['originalRoot']is False and r['isOriginalEngineCapture']is False and not any(r['approval'].values())and ready['nativeApproval']is False and ready['runtimeApplied']is False,'unapproved whole-only scope required')
    require(ready['recipe']==config['recipe'],'same recipe readiness required')
    proof=pinned(r['sources']['recipientProof']);trace=pinned(r['sources']['recipientTrace']);donor=pinned(r['sources']['donor']);capsule=pinned(r['sources']['donorCodeLicenseCapsule'])
    require(len(proof['groups'])==len(trace)==25,'original25 raw groups required')
    for i in range(25):require([p for c in trace[i]for p in c['polygons']]==proof['groups'][i]['polygons'],'original source P/trace binding required')
    require(sha(compact(proof['groups'][:21]))==r['retainedBody']['groupsSHA256']and sha(compact(trace[:21]))==r['retainedBody']['traceSHA256'],'retained raw0..20 exact source required')
    require(donor['schema']=='hanja-fixed-hanzi-writer-original-filled-source/v1'and donor['glyph']=='凡','independently captured public whole required')
    require(sha(donor['originalRecordJSON'].encode())==donor['originalRecordSHA256']and json.loads(donor['originalRecordJSON'])==donor['record'],'unchanged original donor JSON required')
    for key in ['parser','license','package']:require(sha(capsule[key]['originalText'].encode())==capsule[key]['SHA256'],'original code/license bytes required')
    require(len(donor['record']['strokes'])==len(donor['record']['medians'])==3,'three whole original paths required')
    require(len(r['parts'])==24 and [p['sourceRawIndexZeroBased']for p in r['parts'][:21]]==list(range(21)),'21 retained raw groups and3whole D parts required')
    for p in r['parts'][:21]:require(p['matrix']==[1,0,0,1,0,0]and p['sourcePAndQUnchanged']is True and p['logicalMappingApproved']is False,'body identity without mapping approval required')
    N=['1/5','0','0','-1/5','0','180'];A=r['placement']['positiveAffineMatrixExact'];a,b,c,d,e,f=map(Fraction,A);require(a*d-b*c>0,'positive author affine required')
    C=[a/5,b/5,-c/5,-d/5,180*c+e,180*d+f]
    for i,p in enumerate(r['parts'][21:]):
        require(p['sourcePathOneBased']==p['sourceMedianOneBased']==i+1 and p['normalizationMatrixExact']==N and p['authoredPlacementMatrixExact']==A and list(map(Fraction,p['composedOriginalToRecipientMatrixExact']))==C,'one normalization and one same component affine required')
        require(sha(donor['record']['strokes'][i].encode())==p['originalDSHA256']and sha(compact(donor['record']['medians'][i]))==p['originalMedianSHA256'],'unchanged D/median source required')
        exact=[[C[0]*x+C[2]*y+C[4],C[1]*x+C[3]*y+C[5]]for x,y in donor['record']['medians'][i]]
        require(exact==[list(map(Fraction,q))for q in p['transformedMedianExact']],'same median frame required')
    return {'recipe':r,'original':proof,'donor':donor['record']}
def standalone_fan(data):
    return '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 1024 1024" aria-label="Original public HanziWriter 凡3 whole"><g transform="matrix(1 0 0 -1 0 900)" fill="#222">'+''.join('<path d="'+html.escape(d,quote=True)+'"/>'for d in data['donor']['strokes'])+'</g></svg>'
def authored_svg(shared,data):
    # shared source_svg draws every original polygon independently. Preserve that exact body representation.
    body=shared.source_svg({'groups':data['original']['groups'][:21]})
    require(body.endswith('</g></svg>'),'fixed shared source shell required')
    r=data['recipe'];A=matrix(r['placement']['positiveAffineMatrixExact']);N=matrix(r['parts'][21]['normalizationMatrixExact'])
    donor='<g data-authored-component="independent-public-Fan3" transform="'+A+'"><g transform="'+N+'">'+''.join('<path fill="#222" data-original-donor-path="'+str(i+1)+'" d="'+html.escape(d,quote=True)+'"/>'for i,d in enumerate(data['donor']['strokes']))+'</g></g>'
    result=body[:-6]+donor+'</svg>'
    node=ET.fromstring(result);component=node[-1];require(component.tag==NS+'g'and component.get('transform')==A and len(component)==1 and component[0].get('transform')==N and len(component[0])==3,'same positive affine and once Y normalization required')
    for i,path in enumerate(component[0]):require(path.tag==NS+'path'and path.get('d')==data['donor']['strokes'][i]and path.get('fill')=='#222','one unchanged original donor D paint required')
    require(ET.tostring(node[0])==ET.tostring(ET.fromstring(body)[0]),'original body SVG subtree unchanged')
    require(not list(node.iter(NS+'script'))and not list(node.iter(NS+'use')),'no active external source required')
    return result
def selection(route,query):
    require(route in('/','/whole')and query=='','whole-only route required');return None
def page(shared,route,selected,data,domestic):
    require(route in('/','/whole')and selected is None,'whole-only page required')
    panels=[('Original publisher 臝21 · private RAM only',shared.domestic_svg(domestic)),('Original GlyphWiki/KAGE 臝25raw · unchanged source whole',shared.source_svg(data['original'])),('Original independent public HanziWriter 凡3 whole',standalone_fan(data)),('LOCALLY AUTHORED mixed whole · retained21raw + original3D; not a source raw mapping',authored_svg(shared,data))]
    return '<!doctype html><meta charset="utf-8"><title>臝 + independent凡 authored whole</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>臝 · unapproved authored whole-only comparison</h1><p>Source KAGE and HanziWriter have different provenance. Original body raw0..20 retained; 凡3 original D and medians share one declared positive placement after one Y normalization. This is not an original whole/engine capture. Body18 and domestic19..21 mapping, shape, contact and runtime approvals are false.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
def run_mixed_whole(args,config,config_path):
    require(__debug__ and sys.flags.optimize==0 and config_path==ROOT/CONFIG,'exact assertion-enabled candidate config required')
    semantic={k:v for k,v in config.items()if k not in['adapter','launcherSHA256']}
    require(sha(json.dumps(semantic,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode())==SEMANTIC_SHA,'closed candidate config required')
    require(config['adapter']=={'path':ADAPTER,'SHA256':sha(fixed(ADAPTER).read_bytes())},'fixed adapter required')
    def guards():
        require(sha(config_path.read_bytes())==args.config_sha,'config changed')
        require(sha(fixed('scripts/hanja-raw-static-compare.py').read_bytes())==config['launcherSHA256'],'launcher changed')
        for p,h in config['inputSHA256'].items():require(sha(fixed(p).read_bytes())==h,'source input changed')
    guards();data=load_sources(config);metadata=pinned(config['publisherMetadata']);require(metadata['dictionary']==config['domestic'],'original publisher descriptor required')
    shared_path=fixed(config['sharedServe']['path']);spec=importlib.util.spec_from_file_location('hanja_mixed_fan3_static_shared',shared_path);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
    require(shared.FETCH_COUNT==0 and callable(shared.main)and callable(shared.source_svg)and callable(shared.domestic_svg),'existing RAM publisher/static server shell required')
    shared.CONFIG=config;shared.ROOT=ROOT;shared.HERE=config_path.parent;shared.guards=guards;shared.load_sources=lambda:data;shared.selection=selection;shared.page=lambda route,selected,sources,domestic:page(shared,route,selected,sources,domestic)
    authored_svg(shared,data);standalone_fan(data)
    if args.check_only:
        for route in ['/','/whole']:selection(route,'')
        for route,q in [('/checks',''),('/raw',''),('/whole','x=1')]:
            rejected=False
            try:selection(route,q)
            except ValueError:rejected=True
            require(rejected,'nonwhole route must reject')
        require(shared.FETCH_COUNT==0,'check-only cannot fetch private source')
        print(json.dumps({'mixedStaticWholeCheck':'PASS','retainedRaw':21,'donorWholeD':3,'originalRaw':25,'normalizationCount':1,'bodyRawMappingApproved':False,'sourceThreeMappingApproved':False,'nativeApproval':False,'runtimeApplied':False,'HTTP':0,'server':0,'engine':0}));return
    saved=sys.argv
    try:sys.argv=[str(shared_path),'--port',str(args.port)];shared.main()
    finally:sys.argv=saved
