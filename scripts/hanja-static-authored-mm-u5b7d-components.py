#!/usr/bin/env python3
"""Exact locally authored MM 孽20 whole comparison; not an original MM whole."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, importlib.util, json, math, re, xml.etree.ElementTree as ET
from fractions import Fraction
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
ADAPTER_FILE = 'scripts/hanja-static-authored-mm-u5b7d-components.py'
CONFIG_FILE = 'docs/hanja-authored-mm-u5b7d-components-2026-10-28/config.json'
CORE_FILE = 'scripts/hanja-static-original-mm-u6715.py'
CORE_SHA = '26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562'
EXPECTED = json.loads("{\"schema\":\"hanja-authored-MM-component-whole-compare/v1\",\"kind\":\"authored-mm-components-whole-u5b7d\",\"glyph\":\"孽\",\"catalogStrokes\":20,\"authoredParts\":20,\"originalRecipientMM\":19,\"recipe\":{\"path\":\"docs/hanja-authored-mm-u5b7d-components-2026-10-28/recipe.json\",\"SHA256\":\"d8bfa56282a8422d5a55b849c3d5dba1987f0c1af985c05133a11ef653da0c4f\"},\"readiness\":{\"path\":\"docs/hanja-authored-mm-u5b7d-components-2026-10-28/readiness.json\",\"SHA256\":\"7012f81d61f63380ad4a5f2427a796707d695039b843f9935e72ea6d4c096122\"},\"sources\":{\"recipient\":{\"path\":\"docs/hanja-source-original-u5b7d-mm-2026-10-27/source-record.json\",\"SHA256\":\"158df25c141bd6686666fae9b5abba4ea483f72733c8af9134abf28a5481d354\",\"recordField\":\"record\",\"glyph\":\"孽\",\"originalFilledPaths\":19,\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false}},\"donor\":{\"path\":\"docs/hanja-authored-donor-u5b7d-u5341-mm-2026-10-28/donor-source-record.json\",\"SHA256\":\"ef9a8cc552dde368f0b7cfaf00960f994b9c05a9b42742ec26d18ffe89071336\",\"recordField\":\"record\",\"glyph\":\"十\",\"originalFilledPaths\":2,\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false}}},\"licenses\":{\"recipient\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"donor\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false}},\"publisherMetadata\":{\"path\":\"docs/hanja-goal-glyphwiki-batch708-2026-10-12/metadata.json\",\"SHA256\":\"6ae93a09957c1718bd7238182ff4e93da0f1320f62afb158bd1875bf77eced8a\"},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B7D.svg\",\"status\":200,\"bytes\":9781,\"sha256\":\"3a4a709bcbeef1625d1b18f8f786fd75a8dc91e32b7eb396414c2d6646602bf2\",\"clips\":20,\"glyph\":\"孽\",\"privateMediaSaved\":false},\"coreAdapter\":{\"path\":\"scripts/hanja-static-original-mm-u6715.py\",\"SHA256\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"},\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"fixedMMRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"fixedMMCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"sourceViewBox\":\"0 0 1024 1024\",\"sourceYFlip\":\"matrix(1 0 0 -1 0 900)\",\"wholeOnly\":true,\"host\":\"127.0.0.1\",\"originalWhole\":false,\"originalMMWhole\":false,\"authored\":true,\"locallyAuthoredRoot\":true,\"mixedParts\":true,\"mappingApproved\":false,\"directionApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"inputSHA256\":{\"docs/hanja-authored-mm-u5b7d-components-2026-10-28/recipe.json\":\"d8bfa56282a8422d5a55b849c3d5dba1987f0c1af985c05133a11ef653da0c4f\",\"docs/hanja-authored-mm-u5b7d-components-2026-10-28/readiness.json\":\"7012f81d61f63380ad4a5f2427a796707d695039b843f9935e72ea6d4c096122\",\"docs/hanja-source-original-u5b7d-mm-2026-10-27/source-record.json\":\"158df25c141bd6686666fae9b5abba4ea483f72733c8af9134abf28a5481d354\",\"docs/hanja-authored-donor-u5b7d-u5341-mm-2026-10-28/donor-source-record.json\":\"ef9a8cc552dde368f0b7cfaf00960f994b9c05a9b42742ec26d18ffe89071336\",\"docs/hanja-goal-glyphwiki-batch708-2026-10-12/metadata.json\":\"6ae93a09957c1718bd7238182ff4e93da0f1320f62afb158bd1875bf77eced8a\",\"scripts/hanja-static-original-mm-u6715.py\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\",\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\",\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\",\"public/hanja-strokes/ARPHICPL.txt\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"}}")
def load_core():
    path = ROOT / CORE_FILE
    if hashlib.sha256(path.read_bytes()).hexdigest() != CORE_SHA:
        raise ValueError('exact original MM reader core required')
    spec = importlib.util.spec_from_file_location('hanja_authored_u5b7d_original_reader', path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module
CORE = load_core()
require, digest, fixed_file, same_json = CORE.require, CORE.digest, CORE.fixed_file, CORE.same_json
def read_json_pin(spec):
    raw = fixed_file(spec['path']).read_bytes()
    require(digest(raw) == spec['SHA256'], 'authored comparison input changed')
    return json.loads(raw)
def validate_config(config, config_path):
    require(__debug__ and sys.flags.optimize == 0, 'optimized execution forbidden')
    require(config_path == ROOT / CONFIG_FILE, 'one fixed authored candidate config required')
    require(type(config) is dict and set(config) == set(EXPECTED) | {'adapter'}, 'exact authored config fields required')
    require(same_json({k:v for k,v in config.items() if k != 'adapter'}, EXPECTED), 'exact authored scope and sources required')
    require(config['adapter'] == {'path':ADAPTER_FILE,'SHA256':digest(fixed_file(ADAPTER_FILE).read_bytes())}, 'exact authored adapter required')
def parameter_guards(config, config_path, config_sha):
    validate_config(config, config_path)
    require(digest(config_path.read_bytes()) == config_sha, 'authored config changed')
    for path, pin in EXPECTED['inputSHA256'].items():
        require(digest(fixed_file(path).read_bytes()) == pin, 'authored pinned source or license changed')
    require(digest(fixed_file(EXPECTED['sharedServe']['path']).read_bytes()) == EXPECTED['sharedServe']['SHA256'], 'shared whole server changed')
def read_recipient(spec):
    document = read_json_pin(spec)
    require(document['schema'] == 'hanja-original-MM-single-record/v1' and document['glyph'] == '孽', 'unchanged original recipient document required')
    CORE.EXPECTED = {'source':{**spec,'originalRecordSHA256':document['originalRecordSHA256'],'revision':document['source']['revision'],'wholeCorpusSHA256':document['source']['wholeCorpusSHA256']},'glyph':'孽','originalFilledStrokes':19,'license':EXPECTED['licenses']['recipient']}
    return CORE.read_original_mm()
def read_donor(spec):
    document = read_json_pin(spec)
    require(document['schema'] == 'hanja-fixed-MM-exact-original-donor/v1' and document['glyph'] == '十', 'exact original donor extraction required; never relabelled as recipient whole')
    require(document['source']['revision'] == EXPECTED['fixedMMRevision'] and document['source']['wholeCorpusSHA256'] == EXPECTED['fixedMMCorpusSHA256'], 'fixed donor corpus identity required')
    raw = document['originalRecordJSON']
    require(type(raw) is str and digest(raw.encode()) == document['originalRecordSHA256'] == '26f1170214a3258b7b05bb23cbb66eaad4e5d7854758ac868d091868889fd21d', 'original donor JSON required')
    record = document['record']
    require(same_json(json.loads(raw), record) and set(record) == {'character','strokes','medians'} and record['character'] == '十', 'exact donor original record required')
    require(document['license'] == EXPECTED['licenses']['donor'], 'original donor license required')
    require(all(document[k] is False for k in ['coordinatesChanged','pointOrderChanged','mediansChanged','recipientStrokeOrderApproved','recipientPlacementApproved','recipientGeometryChanged','authoredCompositionCreated','nativeApproval','runtimeApplied']), 'no donor approval transfer')
    require(type(record['strokes']) is list and type(record['medians']) is list and len(record['strokes']) == len(record['medians']) == 2, 'exact donor2 paths and medians required')
    require(all(type(d) is str and d for d in record['strokes']), 'original donor path strings required')
    require(all(type(row) is list and len(row)>=2 and all(type(p) is list and len(p)==2 and all(type(v) in (int,float) and math.isfinite(v) for v in p) for p in row)for row in record['medians']), 'original finite donor medians required')
    return record
def read_sources():
    recipe, readiness = read_json_pin(EXPECTED['recipe']), read_json_pin(EXPECTED['readiness'])
    require(recipe['schema'] == 'hanja-authored-MM-component-recipe/v1' and recipe['glyph'] == '孽', 'exact authored recipe identity required')
    require(all(recipe[k] is True for k in ['authored','locallyAuthoredRoot','mixedParts']), 'explicit local mixed source required')
    require(all(recipe[k] is False for k in ['originalWhole','originalMMWhole','mappingApproved','directionApproved','nativeApproval','runtimeApplied']), 'authored whole must not inherit original-whole or temporal approval')
    require(same_json(recipe['sources'], EXPECTED['sources']), 'exact two public original sources required')
    require(readiness['recipe'] == EXPECTED['recipe'] and readiness['authored'] is True and readiness['originalMMWhole'] is False, 'same authored readiness required')
    require(all(v is False for v in readiness['approval'].values()), 'unapproved authored readiness required')
    records = {'recipient':read_recipient(EXPECTED['sources']['recipient']),'donor':read_donor(EXPECTED['sources']['donor'])}
    recipient_document = read_json_pin(EXPECTED['sources']['recipient'])
    require(recipient_document['source']['revision'] == EXPECTED['fixedMMRevision'] and recipient_document['source']['wholeCorpusSHA256'] == EXPECTED['fixedMMCorpusSHA256'], 'fixed recipient corpus required')
    parts = recipe['parts']
    require(type(parts) is list and len(parts) == 20, 'exact20 authored parts required')
    expected_order = [('donor',1),('donor',2),('donor',1),('donor',2)] + [('recipient',n)for n in range(4,20)]
    for logical, (part,(source,stroke)) in enumerate(zip(parts,expected_order),1):
        require(part['logicalOneBased'] == logical and part['source'] == source and part['sourceStrokeOneBased'] == part['sourceMedianOneBased'] == stroke, 'fixed H,V,H,V then unchanged body16 order required')
        matrix, exact = part['matrix'], part['matrixExact']
        require(type(matrix) is list and type(exact) is list and len(matrix) == len(exact) == 6, 'one explicit affine matrix per part required')
        require(all(type(n) in (int,float) and math.isfinite(n) for n in matrix) and all(type(n) is str and float(Fraction(n)) == v for n,v in zip(exact,matrix)), 'exact rational and finite binary64 matrix agreement required')
        require(Fraction(exact[0])*Fraction(exact[3])-Fraction(exact[1])*Fraction(exact[2]) > 0, 'nondegenerate orientation-preserving authored placement required')
        if source == 'recipient':
            require(matrix == [1,0,0,1,0,0] and exact == ['1','0','0','1','0','0'] and part['authoredPlacement'] is False, 'all original body16 paths and medians use identity')
        else:
            group = 'left' if logical<=2 else 'right'
            require(part['placementGroup'] == group and part['authoredPlacement'] is True and matrix == recipe['placements'][group]['matrix'] and exact == recipe['placements'][group]['matrixExact'], 'same original donor pair receives its one declared authored placement')
            require(part['sourceOrderHint'] == ('H' if stroke==1 else 'V'), 'declared author sequence only, not an order approval')
    body = records['recipient']
    require(digest(json.dumps(body['strokes'][3:],ensure_ascii=False,separators=(',',':')).encode()) == recipe['body16Binding']['pathsSHA256'], 'unchanged body16 path strings required')
    require(digest(json.dumps(body['medians'][3:],ensure_ascii=False,separators=(',',':')).encode()) == recipe['body16Binding']['mediansSHA256'], 'unchanged body16 original medians required')
    return {'recipe':recipe,**records}
def matrix_attribute(values):
    return 'matrix('+' '.join(str(v)for v in values)+')'
def authored_svg(sources):
    pieces=[]
    for part in sources['recipe']['parts']:
        d=sources[part['source']]['strokes'][part['sourceStrokeOneBased']-1]
        pieces.append('<g transform="'+matrix_attribute(part['matrix'])+'" data-authored-part="'+str(part['logicalOneBased'])+'" data-original-source="'+part['source']+'" data-original-stroke="'+str(part['sourceStrokeOneBased'])+'"><path fill="#222" d="'+html.escape(d,quote=True)+'"/></g>')
    return '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 1024 1024" aria-label="孽 LOCALLY AUTHORED mixed20; not original MM whole"><g transform="matrix(1 0 0 -1 0 900)">'+''.join(pieces)+'</g></svg>'
def check_authored_svg(sources):
    root=ET.fromstring(authored_svg(sources));ns='{http://www.w3.org/2000/svg}'
    require(root.tag==ns+'svg' and root.attrib=={'width':'520','height':'520','viewBox':'0 0 1024 1024','aria-label':'孽 LOCALLY AUTHORED mixed20; not original MM whole'} and len(root)==1, 'closed authored SVG shell required')
    outer=root[0]
    require(outer.tag==ns+'g' and outer.attrib=={'transform':'matrix(1 0 0 -1 0 900)'} and len(outer)==20, 'one source Y reflection and20 authored part groups required')
    for node,part in zip(outer,sources['recipe']['parts']):
        expected={'transform':matrix_attribute(part['matrix']),'data-authored-part':str(part['logicalOneBased']),'data-original-source':part['source'],'data-original-stroke':str(part['sourceStrokeOneBased'])}
        require(node.tag==ns+'g' and node.attrib==expected and len(node)==1, 'only the pinned matrix placement is allowed')
        path=node[0];d=sources[part['source']]['strokes'][part['sourceStrokeOneBased']-1]
        require(path.tag==ns+'path' and path.attrib=={'fill':'#222','d':d} and len(path)==0 and not(path.text or '').strip(), 'one unchanged original filled D per selected part; no median or new path')
    require(len(list(root.iter(ns+'path')))==20 and not list(root.iter(ns+'script')), 'exact20 original selected paints and no scripts')
def whole_selection(route, query):
    require(route in ('/','/whole') and query=='', 'authored candidate only permits / and /whole without query')
    return None
def whole_page(shared, route, selected, sources, domestic):
    require(route in ('/','/whole') and selected is None and set(sources)=={'recipe','recipient','donor'}, 'one fixed authored whole page required')
    publisher=shared.domestic_svg(domestic)
    return '<!doctype html><meta charset="utf-8"><title>孽 locally authored mixed20 whole comparison</title><style>body{font:16px system-ui;margin:16px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}.panel{width:520px}svg{display:block;width:520px;height:520px}h1{font-size:24px}h2{font-size:16px}</style><h1>孽 · locally authored mixed20 · catalog20 / publisher20</h1><p>Not an original MM whole. Original 孽 body16 plus two placed original 十 pairs; H,V,H,V is this author recipe. Original D and medians remain unchanged; only the declared group matrices and one source Y reflection are applied. Whole shape, contact, mapping, timing and runtime remain unapproved.</p><div class="panels"><section class="panel"><h2>Original publisher whole20 · RAM only</h2>'+publisher+'</section><section class="panel"><h2>LOCALLY AUTHORED20 · not original MM19 whole</h2>'+authored_svg(sources)+'</section></div>'
def run(args):
    config_path=fixed_file(args.config)
    require(re.fullmatch('[0-9a-f]{64}',args.config_sha) is not None, 'fixed config SHA required')
    require(digest(config_path.read_bytes())==args.config_sha, 'authored config byte pin required')
    config=json.loads(config_path.read_bytes())
    def guards():parameter_guards(config,config_path,args.config_sha)
    guards();sources=read_sources();check_authored_svg(sources)
    metadata=read_json_pin(EXPECTED['publisherMetadata'])
    require(metadata['dictionary']==EXPECTED['domestic'], 'exact pinned publisher reference required')
    shared_path=fixed_file(EXPECTED['sharedServe']['path'])
    spec=importlib.util.spec_from_file_location('hanja_authored_mm_u5b7d_shared',shared_path);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
    require(shared.FETCH_COUNT==0 and callable(shared.main)and callable(shared.domestic_svg), 'existing RAM publisher and server shell required')
    shared.CONFIG={'glyph':'孽','catalogStrokes':20,'domestic':EXPECTED['domestic']};shared.ROOT=ROOT;shared.HERE=config_path.parent;shared.guards=guards;shared.load_sources=lambda:sources;shared.selection=whole_selection;shared.page=lambda route,selected,data,domestic:whole_page(shared,route,selected,data,domestic)
    if args.check_only:
        for route in ['/','/whole']:require(whole_selection(route,'')is None,'whole route required')
        for route,query in [('/checks',''),('/raw',''),('/whole','x=1')]:
            rejected=False
            try:whole_selection(route,query)
            except Exception:rejected=True
            require(rejected,'non-whole route must reject')
        guards();require(shared.FETCH_COUNT==0, 'check-only cannot fetch publisher')
        print(json.dumps({'authoredWholeCheck':'PASS','glyph':'孽','originalWhole':False,'originalMMWhole':False,'locallyAuthoredRoot':True,'mixedParts':True,'originalRecipientPaths':19,'originalDonorPaths':2,'retainedBodyPaths':16,'authoredParts':20,'sourceYFlipCount':1,'originalPathStringsChanged':False,'originalMediansChanged':False,'mappingApproved':False,'directionApproved':False,'nativeApproval':False,'runtimeApplied':False,'HTTP':0,'server':0,'engine':0,'projection':0},ensure_ascii=False));return
    original_argv=sys.argv
    try:sys.argv=[str(shared_path),'--port',str(args.port)];shared.main()
    finally:sys.argv=original_argv
def main():
    parser=argparse.ArgumentParser(description='Pinned locally authored 孽20 whole-only comparison; ROOT starts HTTP')
    parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    require(0<=args.port<=65535,'loopback port required')
    run(args)
if __name__=='__main__':main()
