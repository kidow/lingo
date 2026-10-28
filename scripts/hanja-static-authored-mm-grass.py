"""Three closed, unapproved MM grass recipes: original D + declared matrices, static only."""
import sys
sys.dont_write_bytecode=True
import argparse,copy,hashlib,html,importlib.util,json,math,re,xml.etree.ElementTree as ET
from fractions import Fraction
from pathlib import Path
from urllib.parse import parse_qs
ROOT=Path(__file__).resolve().parent.parent
SELF='scripts/hanja-static-authored-mm-grass.py'
CORE_FILE='scripts/hanja-static-original-mm-u6715.py'
CORE_SHA='26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py'
SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
CASES=json.loads("[{\"unicode\":\"u850c\",\"configPath\":\"docs/hanja-authored-mm-u850c-components-2026-10-28/static-config.json\",\"configSemanticSHA256\":\"69d5212dc74f9620b8de5fec016840bd4f91cf25b292169f055f17a9bacb7339\",\"sourceFacts\":{\"recipientRawRecordSHA256\":\"c80c88002601c9379da531bd947f4765ff000cc1070a0b112851c074a47ca242\",\"recipientRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"recipientCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"recipientLicense\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"donorRawRecordSHA256\":\"26f1170214a3258b7b05bb23cbb66eaad4e5d7854758ac868d091868889fd21d\",\"donorRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"donorCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"donorLicense\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false}}},{\"unicode\":\"u85aa\",\"configPath\":\"docs/hanja-authored-mm-u85aa-components-2026-10-28/static-config.json\",\"configSemanticSHA256\":\"cdd2b440fec84a365b6876e6283939c73cc26372b5c6c7a1b616c10bf0c7a822\",\"sourceFacts\":{\"recipientRawRecordSHA256\":\"7bd2cb8685c2af9b0b2db32954e31cb4bea6522b21bb05ef4e366451bcf1dc4c\",\"recipientRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"recipientCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"recipientLicense\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"donorRawRecordSHA256\":\"26f1170214a3258b7b05bb23cbb66eaad4e5d7854758ac868d091868889fd21d\",\"donorRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"donorCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"donorLicense\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false}}},{\"unicode\":\"u8517\",\"configPath\":\"docs/hanja-authored-mm-u8517-components-2026-10-28/static-config.json\",\"configSemanticSHA256\":\"6fd52e3d350db83d1e4075a16f6952520c229f5b8f92a025bb22c17d77bff7a2\",\"sourceFacts\":{\"recipientRawRecordSHA256\":\"34837db9bd9cfaef16c489486249fcba94d2ee28021bfb94d242ca1612a05e43\",\"recipientRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"recipientCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"recipientLicense\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"donorRawRecordSHA256\":\"26f1170214a3258b7b05bb23cbb66eaad4e5d7854758ac868d091868889fd21d\",\"donorRevision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"donorCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\",\"donorLicense\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false}}}]")
def require(v,message):
    if not v:raise ValueError(message)
def digest(b):return hashlib.sha256(b).hexdigest()
def pinned(name):
    p=(ROOT/name).resolve();require(type(name)is str and not Path(name).is_absolute()and p.is_relative_to(ROOT),'fixed local relative source only');return p
def module(name,p):
    spec=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
require(digest(pinned(CORE_FILE).read_bytes())==CORE_SHA,'original MM core changed')
CORE=module('hanja_mm_grass_original_core',pinned(CORE_FILE))
def read_pin(spec):
    b=pinned(spec['path']).read_bytes();require(digest(b)==spec['SHA256'],'source pin changed: '+spec['path']);return json.loads(b)
def validate_config(config,path):
    matches=[x for x in CASES if path==ROOT/x['configPath']];require(len(matches)==1,'one closed authored recipe config')
    case=matches[0];semantic={k:v for k,v in config.items()if k!='launcherSHA256'};require(digest(json.dumps(semantic,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode())==case['configSemanticSHA256'],'fixed config semantics')
    require(config['launcherSHA256']==digest(pinned(SELF).read_bytes()) and config['host']=='127.0.0.1','exact local adapter')
    require(config['core']=={'path':CORE_FILE,'SHA256':CORE_SHA}and config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA},'unchanged core and static shell')
    require(config['locallyAuthoredRoot']is True and config['mixedParts']is True and all(config[k]is False for k in['originalWhole','originalMMWhole','mappingApproved','directionApproved','nativeApproval','runtimeApplied']),'authored static hypothesis only')
    return case
def read_sources(config,case):
    recipe,ready=read_pin(config['recipe']),read_pin(config['readiness']);facts=case['sourceFacts']
    require(recipe['glyph']==config['glyph'] and recipe['schema']=='hanja-authored-MM-component-recipe/v1','fixed same-glyph recipe')
    require(all(recipe[k]is True for k in['locallyAuthoredRoot','mixedParts','authored']) and all(recipe[k]is False for k in['originalWhole','originalMMWhole','mappingApproved','directionApproved','nativeApproval','runtimeApplied']),'unapproved authored scope')
    require(all(v is False for v in ready['approval'].values()),'no readiness approval transfer')
    recipient_doc=read_pin(recipe['sources']['recipient']);recipient_spec=recipe['sources']['recipient']
    CORE.EXPECTED={'source':{**recipient_spec,'originalRecordSHA256':facts['recipientRawRecordSHA256'],'revision':facts['recipientRevision'],'wholeCorpusSHA256':facts['recipientCorpusSHA256']},'glyph':config['glyph'],'originalFilledStrokes':config['originalRecipientMM'],'license':facts['recipientLicense']}
    recipient=CORE.read_original_mm()
    donor_doc=read_pin(recipe['sources']['donor']);require(donor_doc['schema']=='hanja-fixed-MM-exact-original-donor/v1'and donor_doc['glyph']=='十','original donor extraction')
    require(donor_doc['source']['revision']==facts['donorRevision'] and donor_doc['source']['wholeCorpusSHA256']==facts['donorCorpusSHA256'] and donor_doc['license']==facts['donorLicense'],'fixed donor provenance/license')
    require(digest(donor_doc['originalRecordJSON'].encode())==facts['donorRawRecordSHA256']==donor_doc['originalRecordSHA256'],'original donor JSON')
    donor=donor_doc['record'];require(CORE.same_json(json.loads(donor_doc['originalRecordJSON']),donor) and set(donor)=={'character','strokes','medians'} and donor['character']=='十'and len(donor['strokes'])==len(donor['medians'])==2,'unchanged donor2')
    require(all(donor_doc[k]is False for k in['coordinatesChanged','pointOrderChanged','mediansChanged','recipientStrokeOrderApproved','recipientPlacementApproved','recipientGeometryChanged','authoredCompositionCreated','nativeApproval','runtimeApplied']),'no donor approval transfer')
    order=[('donor',1),('donor',2),('donor',1),('donor',2)]+[('recipient',i)for i in range(4,config['originalRecipientMM']+1)];require(len(recipe['parts'])==len(order)==config['authoredParts'],'four new grass parts plus unchanged body')
    for logical,(part,(source,stroke))in enumerate(zip(recipe['parts'],order),1):
        require((part['logicalOneBased'],part['source'],part['sourceStrokeOneBased'],part['sourceMedianOneBased'])==(logical,source,stroke,stroke),'declared source-part mapping only')
        matrix,exact=part['matrix'],part['matrixExact'];require(len(matrix)==len(exact)==6 and all(type(v)in[int,float]and math.isfinite(v)for v in matrix)and all(float(Fraction(q))==v for q,v in zip(exact,matrix)),'one exact author matrix')
        require(matrix[0]*matrix[3]-matrix[1]*matrix[2]>0,'positive determinant')
        if source=='recipient':require(matrix==[1,0,0,1,0,0]and part['authoredPlacement']is False,'body D and medians identity only')
        else:require(part['authoredPlacement']is True and part['sourceOrderHint']==('H'if stroke==1 else'V'),'donor hint only, not Korean order approval')
    return{'recipe':recipe,'recipient':recipient,'donor':donor}
def matrix_attr(values):return'matrix('+' '.join(str(v)for v in values)+')'
def authored_svg(sources,count=None,prefix=False):
    parts=sources['recipe']['parts'];n=len(parts)
    if count is not None:
        require(type(count)is int and 1<=count<=n,'explicit authored part selection');parts=parts[:count]if prefix else[parts[count-1]]
    pieces=[]
    for part in parts:
        path=sources[part['source']]['strokes'][part['sourceStrokeOneBased']-1]
        pieces.append('<g transform="'+matrix_attr(part['matrix'])+'" data-authored-part="'+str(part['logicalOneBased'])+'" data-public-source="'+part['source']+'" data-source-stroke="'+str(part['sourceStrokeOneBased'])+'"><path fill="#222" d="'+html.escape(path,quote=True)+'"/></g>')
    return'<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 1024 1024" aria-label="LOCALLY AUTHORED MM recipe; not original whole"><g transform="matrix(1 0 0 -1 0 900)">'+''.join(pieces)+'</g></svg>'
def check_scene(sources):
    ns='{http://www.w3.org/2000/svg}'
    for count,prefix,expected in[(None,False,sources['recipe']['parts']),(1,False,sources['recipe']['parts'][:1]),(len(sources['recipe']['parts']),True,sources['recipe']['parts'])]:
        svg=ET.fromstring(authored_svg(sources,count,prefix));wrapper=list(svg)[0];require(wrapper.get('transform')=='matrix(1 0 0 -1 0 900)'and len(list(svg))==1 and len(list(wrapper))==len(expected),'one source Y reflection and declared parts only')
        for g,part in zip(wrapper,expected):require(g.get('transform')==matrix_attr(part['matrix'])and len(list(g))==1 and list(g)[0].get('d')==sources[part['source']]['strokes'][part['sourceStrokeOneBased']-1],'original D exact; no new points, normalization or fit')
def selection(route,query,n):
    if route in['/','/whole']:require(query=='','whole has no query');return None
    require(route=='/compare','static compare/whole only');q=parse_qs(query,strict_parsing=True);require(set(q)=={'domestic','part','dview','sview'}and all(len(v)==1 for v in q.values()),'explicit four selection fields')
    require(all(re.fullmatch('[1-9][0-9]*',q[k][0])for k in['domestic','part']),'integer selectors')
    d,p=int(q['domestic'][0]),int(q['part'][0]);require(1<=d<=n and 1<=p<=n and q['dview'][0]in['single','prefix']and q['sview'][0]in['single','prefix'],'bounded independent selections')
    return d,p,q['dview'][0]=='prefix',q['sview'][0]=='prefix'
def page(shared,config,route,selected,sources,domestic):
    n=config['authoredParts'];d,p,dp,sp=selected if selected is not None else(None,None,False,False)
    def options(current):return''.join('<option value="'+str(i)+'"'+(' selected'if i==current else'')+'>'+str(i)+'</option>'for i in range(1,n+1))
    def views(name,current):return'<select name="'+name+'"><option value="single"'+(' selected'if not current else'')+'>current</option><option value="prefix"'+(' selected'if current else'')+'>prefix</option></select>'
    form='<form action="/compare"><label>publisher stroke <select name="domestic">'+options(d or 1)+'</select></label>'+views('dview',dp)+' <label>authored part <select name="part">'+options(p or 1)+'</select></label>'+views('sview',sp)+' <button>Compare</button></form>'
    return'<!doctype html><meta charset="utf-8"><title>'+html.escape(config['glyph'])+' authored MM static comparison</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:16px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}.panel,svg{width:520px}svg{display:block;height:520px}</style><h1>'+html.escape(config['glyph'])+' · authored'+str(n)+' / publisher'+str(config['publisherStrokes'])+'</h1><p>Original public donor D and recipient body D are unchanged; only declared matrices and one source Y reflection are applied. H,V,H,V and body correspondence are unapproved hypotheses. This is not an original MM whole or animation.</p><p><a href="/whole">Whole</a></p>'+form+'<div class="panels"><section class="panel"><h2>Original publisher '+('prefix'if dp else'current')+' '+str(d or 'whole')+' · native RAM only</h2>'+shared.domestic_svg(domestic,d,dp)+'</section><section class="panel"><h2>Authored '+('prefix'if sp else'current')+' '+str(p or 'whole')+' · not original MM whole</h2>'+authored_svg(sources,p,sp)+'</section></div>'
def main():
    parser=argparse.ArgumentParser(description='Three fixed authored MM grass hypotheses; whole/current/prefix static only.')
    parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local execution')
    path=pinned(args.config);require(digest(path.read_bytes())==args.config_sha,'config SHA');config=json.loads(path.read_bytes());case=validate_config(config,path)
    def guards():
        require(digest(path.read_bytes())==args.config_sha and digest(pinned(SELF).read_bytes())==config['launcherSHA256'],'config/adapter pins')
        require(digest(pinned(SHARED).read_bytes())==SHARED_SHA and digest(pinned(CORE_FILE).read_bytes())==CORE_SHA,'shared/core pins')
        for item in[config['recipe'],config['readiness'],config['publisherMetadata']]:read_pin(item)
    guards();sources=read_sources(config,case);check_scene(sources);meta=read_pin(config['publisherMetadata']);require(meta['dictionary']==config['domestic']and meta['dictionary']['clips']==config['publisherStrokes']==config['authoredParts'],'original publisher count/pin')
    if args.check_only:
        require(selection('/whole','',config['authoredParts'])is None,'whole route');require(selection('/compare','domestic=1&part=1&dview=single&sview=prefix',config['authoredParts'])==(1,1,False,True),'independent selection')
        print(json.dumps({'guardPass':True,'glyph':config['glyph'],'authoredParts':config['authoredParts'],'retainedBodyParts':config['authoredParts']-4,'singleYFlip':True,'DOrMediansEdited':False,'wholeCurrentPrefix':True,'mappingApproved':False,'HTTP':0,'server':0}));return
    shared=module('hanja_mm_grass_static_shared',pinned(SHARED));require(shared.FETCH_COUNT==0,'no preparatory publisher fetch')
    shared.CONFIG={'glyph':config['glyph'],'catalogStrokes':config['publisherStrokes'],'domestic':config['domestic']};shared.ROOT=ROOT;shared.HERE=path.parent;shared.guards=guards;shared.load_sources=lambda:sources;shared.selection=lambda route,query:selection(route,query,config['authoredParts']);shared.page=lambda route,selected,data,domestic:page(shared,config,route,selected,data,domestic)
    argv=sys.argv
    try:sys.argv=[str(pinned(SHARED)),'--port',str(args.port)];shared.main()
    finally:sys.argv=argv
if __name__=='__main__':main()
