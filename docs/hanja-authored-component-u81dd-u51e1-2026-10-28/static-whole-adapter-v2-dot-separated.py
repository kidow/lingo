#!/usr/bin/env python3
# Exact source-derived third-dot-only variant; existing v1 adapter and sources unchanged.
import sys
sys.dont_write_bytecode=True
import hashlib,importlib.util,json
from pathlib import Path
from fractions import Fraction
ROOT=Path(__file__).resolve().parents[2]
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/static-whole-adapter.py'
BASE_SHA='b13341aa8b8a9a97afebe7e7236dddd6b65c8f0ad1aabc990a3fcedae5667a9e'
spec=importlib.util.spec_from_file_location('hanja_u81dd_fan3_v1_for_separated_dot',ROOT/BASE)
if hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()!=BASE_SHA:raise ValueError('unchanged v1 whole adapter required')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
old_load=base.load_sources
old_page=base.page
OLD_CONFIG='docs/hanja-source-raw-compare-u81dd-u51e1-whole-2026-10-28/config.json'
OLD_CONFIG_SHA='4ac54e9c00dfec9c548826b10d6ceee9420b80408098ac9cc67403631a943802'
def read_v2(config):
    old_raw=base.fixed(OLD_CONFIG).read_bytes();base.require(base.sha(old_raw)==OLD_CONFIG_SHA,'exact previous config required')
    previous=old_load(json.loads(old_raw))
    r=base.pinned(config['recipe']);ready=base.pinned(config['readiness']);old=previous['recipe']
    base.require(r['previousRecipe']==json.loads(old_raw)['recipe']and r['variantId']=='u81dd-public-body-plus-u51e1-whole-dot-separated-v2','separate exact v2 candidate required')
    base.require(ready['recipe']==config['recipe']and not any(ready['approval'].values())and not any(r['approval'].values()),'unapproved v2 required')
    base.require(r['sources']==old['sources']and r['parts'][:23]==old['parts'][:23],'body0..20 and donor1/2 completely unchanged')
    p,q=r['parts'][23],old['parts'][23]
    base.require(p['originalDSHA256']==q['originalDSHA256']and p['originalMedianSHA256']==q['originalMedianSHA256']and p['normalizationMatrixExact']==q['normalizationMatrixExact'],'original D3/median3 and one normalization required')
    E=list(map(Fraction,p['additionalSourceDerivedDotMatrixExact']));k=Fraction(2,3);base.require(E[:4]==[k,0,0,k],'only prescribed uniform2/3 dot scale permitted')
    A=list(map(Fraction,q['authoredPlacementMatrixExact']));C=list(map(Fraction,q['composedOriginalToRecipientMatrixExact']))
    expectedA=[k*A[0],k*A[1],k*A[2],k*A[3],k*A[4]+E[4],k*A[5]+E[5]]
    expectedC=[k*C[0],k*C[1],k*C[2],k*C[3],k*C[4]+E[4],k*C[5]+E[5]]
    base.require(list(map(Fraction,p['authoredPlacementMatrixExact']))==expectedA and list(map(Fraction,p['composedOriginalToRecipientMatrixExact']))==expectedC,'same composed dot frame required')
    for original,actual in zip(previous['donor']['medians'][2],p['transformedMedianExact']):
        x,y=map(Fraction,original);want=[expectedC[0]*x+expectedC[2]*y+expectedC[4],expectedC[1]*x+expectedC[3]*y+expectedC[5]]
        base.require(want==list(map(Fraction,actual)),'same extra matrix for original median3 required')
    base.require(Fraction(r['dotSeparation']['leftGapExact'])>2 and Fraction(r['dotSeparation']['rightGapExact'])>2,'fixed public conservative gap proof required')
    previous['recipe']=r
    return previous
def separated_svg(shared,data):
    body=shared.source_svg({'groups':data['original']['groups'][:21]})
    base.require(body.endswith('</g></svg>'),'shared original body shell required')
    r=data['recipe'];A=base.matrix(r['placement']['positiveAffineMatrixExact']);N=base.matrix(r['parts'][21]['normalizationMatrixExact'])
    E=base.matrix(r['parts'][23]['additionalSourceDerivedDotMatrixExact'])
    def dpath(i):return '<path fill="#222" data-original-donor-path="'+str(i+1)+'" d="'+base.html.escape(data['donor']['strokes'][i],quote=True)+'"/>'
    common='<g data-authored-component="independent-public-Fan3-first-two" transform="'+A+'"><g transform="'+N+'">'+dpath(0)+dpath(1)+'</g></g>'
    dot='<g data-authored-component="independent-public-Fan3-separated-third" transform="'+E+'"><g transform="'+A+'"><g transform="'+N+'">'+dpath(2)+'</g></g></g>'
    result=body[:-6]+common+dot+'</svg>';node=base.ET.fromstring(result)
    base.require(base.ET.tostring(node[0])==base.ET.tostring(base.ET.fromstring(body)[0]),'body original subtree unchanged')
    base.require(node[1].get('transform')==A and node[1][0].get('transform')==N and len(node[1][0])==2,'first two original D under unchanged A/N required')
    base.require(node[2].get('transform')==E and node[2][0].get('transform')==A and node[2][0][0].get('transform')==N and len(node[2][0][0])==1,'third original D under E/A/N required')
    paths=list(node[1].iter(base.NS+'path'))+list(node[2].iter(base.NS+'path'))
    base.require([p.get('d')for p in paths]==data['donor']['strokes'],'three exact original D strings required')
    base.require(not list(node.iter(base.NS+'script'))and not list(node.iter(base.NS+'use')),'no external active source')
    return result
def v2page(shared,route,selected,data,domestic):
    page=old_page(shared,route,selected,data,domestic)
    old='凡3 original D and medians share one declared positive placement after one Y normalization.'
    new='凡D1/D2 retain their original declared placement; D3 and median3 alone share an additional source-derived uniform2/3 placement. This is a new unapproved whole variant.'
    base.require(page.count(old)==1,'exact old scope label required')
    return page.replace(old,new,1)
base.CONFIG='docs/hanja-source-raw-compare-u81dd-u51e1-dot-separated-2026-10-28/config.json'
base.ADAPTER='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/static-whole-adapter-v2-dot-separated.py'
base.SEMANTIC_SHA='c7bd899cbdfe404d65386e1332368c9998f27e5f95ce02442e19337b56d8487c'
base.load_sources=read_v2
base.authored_svg=separated_svg
base.page=v2page
def run_mixed_whole(args,config,config_path):
    return base.run_mixed_whole(args,config,config_path)
