#!/usr/bin/env python3
# Candidate-only side-by-side clock/static-source wrapper; shared helper bytes unchanged.
import sys
sys.dont_write_bytecode=True
import hashlib,importlib.util,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
SETUP='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/direct-body18-last3-comparison-setup.json'
SETUP_SHA='94bc94313563a24d7a886d60921434918fec81de97f75e5f588ac7752f268c74'
def require(ok,message):
    if not ok:raise ValueError(message)
def sha(raw):return hashlib.sha256(raw).hexdigest()
raw=(ROOT/SETUP).read_bytes();require(sha(raw)==SETUP_SHA,'fixed comparison plan changed');setup=json.loads(raw)
def load(spec,name):
    p=ROOT/spec['path'];require(sha(p.read_bytes())==spec['SHA256'],'pinned comparison input changed')
    s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
clock=load(setup['originalClockHelper'],'hanja_u81dd_clock_for_direct_source_comparison')
v2=load(setup['staticV2Adapter'],'hanja_u81dd_fan3_static_for_direct_comparison')
config_raw=(ROOT/setup['originalClockConfig']['path']).read_bytes();require(sha(config_raw)==setup['originalClockConfig']['SHA256'],'original clock config changed');clock_config=json.loads(config_raw)
require(clock_config['glyph']=='臝'and clock_config['allowedStrokes']==list(range(1,22))and clock_config['defaultStroke']==1,'fixed whole21 original clock controls required')
v2_config_raw=(ROOT/setup['staticV2Config']['path']).read_bytes();require(sha(v2_config_raw)==setup['staticV2Config']['SHA256'],'static v2 config changed')
sources=v2.base.load_sources(json.loads(v2_config_raw))
shared=load(setup['staticSharedServe'],'hanja_u81dd_static_source_panel_shell')
shared.CONFIG={'sourceViewBox':'0 0 200 200'}
svg=v2.separated_svg(shared,sources)
groups=setup['sourceGroupingEvidence']['hypothesis18GroupsZeroBased']
require(len(groups)==18 and sorted(n for row in groups for n in row)==list(range(21)),'all public body rows preserved once')
payload=json.dumps(groups,separators=(',',':'))
source_script=r'''
(()=>{const source=document.querySelector('#public-source-panel'),status=document.querySelector('#public-source-status'),groups=__GROUPS__;let pen=1,mode='single';
function show(){
 const raw=new Set((mode==='prefix'?groups.slice(0,Math.min(pen,18)):pen<=18?[groups[pen-1]]:[]).flat().map(n=>n+1));
 for(const node of source.querySelectorAll('[data-original-raw]'))node.style.display=raw.has(Number(node.dataset.originalRaw))?'':'none';
 for(const node of source.querySelectorAll('[data-original-donor-path]')){const n=Number(node.dataset.originalDonorPath)+18;node.style.display=(mode==='prefix'?n<=pen:n===pen)?'':'none';}
 status.textContent=JSON.stringify({originalDomesticSelected:pen,sourceMode:mode,sourceGrouping:'UNAPPROVED hypothesis; original P/D unchanged',rawZeroBased:pen<=18?groups[pen-1]:null,publicFanOriginalPath:pen>18?pen-18:null,sourcePanelAnimated:false,sourceMappingApproved:false,body18MappingApproved:false,nativeApproval:false});
}
for(const button of document.querySelectorAll('button[data-stroke]'))button.addEventListener('click',()=>{pen=Number(button.dataset.stroke);show();});
document.querySelector('#source-single').addEventListener('click',()=>{mode='single';show();});document.querySelector('#source-prefix').addEventListener('click',()=>{mode='prefix';show();});show();})();
'''.replace('__GROUPS__',payload)
original_page=clock.page
def page(config,route):
    require(config==clock_config,'unchanged original clock config required')
    result=original_page(config,route).decode()
    start=result.index('<object id="original"');end=result.index('</object>',start)+len('</object>');object_markup=result[start:end]
    require(result.count('<object id="original"')==1 and len(svg)>0,'one original SVG object required')
    panel='<aside><h2>Public source hypothesis · static only</h2><button id="source-single">Source single hypothesis</button><button id="source-prefix">Source prefix hypothesis</button><pre id="public-source-status"></pre><div id="public-source-panel">'+svg+'</div></aside>'
    pair='<div class="clock-source-pair"><section><h2>Original domestic clock · existing controls</h2>'+object_markup+'</section>'+panel+'</div>'
    result=result[:start]+pair+result[end:]
    css='<style>body{max-width:none}.clock-source-pair{display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap}.clock-source-pair section,.clock-source-pair aside{width:520px}.clock-source-pair svg{width:520px;height:520px}h1{font-size:26px}h2{font-size:18px}#public-source-status{height:110px}</style>'
    note='<p><strong>UNAPPROVED mapping comparison:</strong> source1..18 is an exact-adjacent-endpoint grouping hypothesis, source19..21 is independently captured 凡3. Static source selection does not animate source ink or approve Korean stroke boundaries. Original CSS clock and original media bytes remain unchanged.</p>'
    return result.replace('</html>',css+note+'<script>'+source_script+'</script></html>',1).encode()
clock.page=page
if __name__=='__main__':
    require('--config'in sys.argv and '--config-sha'in sys.argv,'reuse exact original clock arguments')
    require(sys.argv[sys.argv.index('--config')+1]==setup['originalClockConfig']['path']and sys.argv[sys.argv.index('--config-sha')+1]==setup['originalClockConfig']['SHA256'],'only pinned original clock config allowed')
    clock.main()
