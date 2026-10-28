#!/usr/bin/env python3
"""Bounded original-media RAM extraction; emits only safe metadata as a native patch."""
import sys
sys.dont_write_bytecode = True
import importlib.util, json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT/path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result
clock = module('fixed_clock_metadata_contract', 'scripts/hanja-official-media-compare.py')
assert clock.sha((ROOT/'scripts/hanja-official-media-compare.py').read_bytes()) == '8b911722168235777fdd965b21895be568a71211531334f5b5e5797ebad65081'
shared = module('fixed_original_ram_fetch', clock.SHARED)
assert clock.sha((ROOT/clock.SHARED).read_bytes()) == clock.SHARED_SHA and shared.FETCH_COUNT == 0
patch = '*** Begin Patch\n'
summary = []
for key, glyph, batch, count in [('u71c4','燄',725,16),('u9dd6','鷖',736,22)]:
    source_config = json.loads((ROOT/f'docs/hanja-source-raw-compare-{key}-terminal0-2026-10-28/config.json').read_text())
    descriptor = source_config['domestic']
    assert descriptor['glyph'] == glyph and descriptor['clips'] == count and descriptor['privateMediaSaved'] is False
    pin = {k:descriptor[k] for k in ['url','bytes','sha256']}
    svg = shared.fetch_asset(pin)
    css = shared.fetch_asset(clock.CSS)
    root = clock.ET.fromstring(svg)
    rows = []
    for path in root.iter(clock.NS+'path'):
        if not path.get('clip-path'):
            continue
        style = path.get('style','')
        delay, duration = re.search(r'--d:\s*(\d+)ms',style), re.search(r'--t:\s*(\d+)ms',style)
        assert delay and duration
        geometry = json.dumps([[k,path.get(k)] for k in clock.GEOMETRY],separators=(',',':'),ensure_ascii=False).encode()
        rows.append({'id':path.get('id'),'class':path.get('class'),'clipPath':path.get('clip-path'),'delayMs':int(delay[1]),'durationMs':int(duration[1]),'pathLength':path.get('pathLength'),'inlineStyle':style,'geometrySHA256':clock.sha(geometry)})
    rows.sort(key=lambda row:row['delayMs'])
    timed = [dict(stroke=i,**row) for i,row in enumerate(rows,1)]
    assert len(timed) == count
    config = {'svgRoot':dict(root.attrib),'timedPaths':timed,'inertOriginalScripts':[clock.INERT_SCRIPT]}
    clock.validate_media(svg,config)
    metadata_file = f'docs/hanja-goal-glyphwiki-batch{batch}-2026-10-12/metadata.json'
    safe = {'schema':'hanja-original-clock-safe-metadata-v1','date':'2026-10-28','glyph':glyph,'sourceRoot':key,'sourceRootIsAuditContextOnly':True,'selectedWholeRoot':None,'catalogStrokes':count,'publisherTimedPaths':count,'metadataFile':metadata_file,'metadataSHA256':clock.sha((ROOT/metadata_file).read_bytes()),'fetchFacts':{'attempts':1,'successfulAssets':2,'bytes':len(svg),'SHA256':clock.sha(svg),'clips':count},'svgRoot':dict(root.attrib),'timedPaths':timed,'cssSHA256':clock.sha(css),'cssReferencePresent':True,'inertScriptValidated':True,'bodyOutputOrFileSaved':False,'logicalPensFromTimingApproved':False,'sourceRawMappingApproved':False,'catalogCountChanged':False}
    target = f'docs/hanja-official-media-compare-{key}-2026-10-28/safe-source-metadata.json'
    assert not (ROOT/target).exists()
    data = json.dumps(safe,ensure_ascii=False,indent=2)+'\n'
    patch += '*** Add File: '+target+'\n'+''.join('+'+line+'\n' for line in data.splitlines())
    summary.append({'glyph':glyph,'rows':count,'metadataSHA256':clock.sha(data.encode()),'privateMediaSaved':False})
    del svg, css, root, path
assert shared.FETCH_COUNT == 4
patch += '*** End Patch\n'
print(json.dumps({'patch':patch,'summary':summary},ensure_ascii=False))
