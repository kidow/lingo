#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Optional static board; reuse the pinned launcher and every original SVG function."""
import sys
sys.dont_write_bytecode = True
import argparse, copy, hashlib, html, importlib.util, json
from pathlib import Path
from urllib.parse import parse_qs

ROOT = Path(__file__).resolve().parent.parent
LAUNCHER = 'scripts/hanja-raw-static-compare.py'
LAUNCHER_SHA = '17e77f57900f45e6561976bcb0bcd14ccb81f7da07046645e1bdad3e45ca83f0'


def require(value, message):
    if not value:
        raise ValueError(message)


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def fixed_path(name):
    require(type(name) is str and 0 < len(name) < 512, 'relative path required')
    p = Path(name)
    require(not p.is_absolute() and '..' not in p.parts, 'relative path only')
    q = (ROOT / p).resolve()
    require(q.is_relative_to(ROOT) and q == ROOT / p and q.is_file(), 'fixed file required')
    return q


def validate_groups(groups, base):
    require(type(groups) is dict and set(groups) == set(base['sourceRoots']), 'exact source labels required')
    for label, rows in groups.items():
        require(type(rows) is list and len(rows) == base['catalogStrokes'], 'one provisional row per domestic stroke')
        used = set()
        for row in rows:
            require(row is None or type(row) is list and len(row) > 0, 'null or nonempty raw list required')
            if row is None:
                continue
            for raw in row:
                require(type(raw) is int and 1 <= raw <= base['sourceRoots'][label]['rawGroups'], 'raw index outside original source')
                require(raw not in used, 'duplicate provisional raw assignment')
                used.add(raw)


def install_board(shared, base, groups, board_guards):
    original_selection, original_page, original_guards = shared.selection, shared.page, shared.guards

    def guarded():
        original_guards()
        board_guards()

    def selection(route, query):
        board_guards()
        if route != '/board':
            return original_selection(route, query)
        q = {} if not query else parse_qs(query, keep_blank_values=True, strict_parsing=True)
        require(set(q) <= {'source'} and all(len(v) == 1 and v[0] for v in q.values()), 'exact board query required')
        label = q.get('source', [base['defaultSource']])[0]
        require(label in groups, 'unknown board source')
        return {'boardSource': label}

    def grouped_svg(proof, indexes):
        pieces = []
        for index in indexes:
            svg = shared.source_svg(proof, index)
            require(svg.count('<g fill="#222">') == 1 and svg.endswith('</g></svg>'), 'original SVG shell changed')
            pieces.append(svg.split('<g fill="#222">', 1)[1][:-len('</g></svg>')])
        shell = shared.source_svg(proof)
        return shell.split('<g fill="#222">', 1)[0] + '<g fill="#222">' + ''.join(pieces) + '</g></svg>'

    def page(route, selected, sources, domestic):
        if route != '/board':
            return original_page(route, selected, sources, domestic)
        board_guards()
        label = selected['boardSource']
        old = original_page('/whole', None, sources, domestic)
        require(old.count('<div class="grid">') == 1, 'original page shell changed')
        head = old.split('<div class="grid">', 1)[0]
        rows, used = [], set()
        for i, indexes in enumerate(groups[label], 1):
            left = shared.domestic_svg(domestic, i)
            right = '<p class="pending">원raw 대응 미정</p>' if indexes is None else grouped_svg(sources[label], indexes)
            if indexes is not None:
                used.update(indexes)
            title = '국내 ' + str(i) + ' ↔ 검토후보 raw ' + ('미정' if indexes is None else ','.join(map(str, indexes)))
            rows.append('<section class="board-pair" data-domestic="' + str(i) + '"><h2>' + html.escape(title) + '</h2><div class="pair">' + left + right + '</div></section>')
        unassigned = [i for i in range(1, len(sources[label]['groups']) + 1) if i not in used]
        rest = ''.join('<section data-unassigned-raw="' + str(i) + '"><h2>미배정 원raw ' + str(i) + '</h2>' + shared.source_svg(sources[label], i) + '</section>' for i in unassigned)
        style = '<style>.board{display:grid;grid-template-columns:repeat(auto-fit,minmax(450px,1fr));gap:12px}.board-pair h2,.unassigned h2{font-size:15px}.pair{display:grid;grid-template-columns:220px 220px;gap:10px}.board svg,.unassigned svg{width:220px!important;height:220px!important;min-width:220px!important;min-height:220px!important;max-width:none!important}.pending{width:220px}.unassigned{display:grid;grid-template-columns:repeat(auto-fit,220px);gap:10px}</style>'
        note = '<h2>220px 정적 검토판 · provisionalGroups는 검토 가설이며 승인 아님</h2><p>같은 번호·원raw 합성은 시간·방향·연결성·합획 승인이 아닙니다. 미정은 빈 SVG가 아닌 미정으로 표시합니다. 원P/원좌표 그대로 · 520 비교는 위 링크 사용.</p>'
        if base.get('glyph') == '薩' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'u85a9-t':
            note += '<p data-source-draft="u85a9-t"><strong>DRAFT · productionImportAllowed=false</strong> · 8획 공식 short V ↔ 원Q down-right 미확정 · 13획 초기 V+Q 미확정 · 2·4획 원slant 보존 · 정적 대조만 가능, 자동 승인 없음</p>'
        if base.get('glyph') == '擄' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'u64c4-k':
            note += '<p data-source-draft="u64c4-k"><strong>DRAFT · productionImportAllowed=false</strong> · 16획 후보 · 원6H+hook 다음7longV/DL · 원9UP·田/力 경계·초기 재생 위험 미승인</p>'
        if base.get('glyph') == '蓑' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'hkcs_m84d1':
            note += '<p data-source-draft="u84d1-hkcs"><strong>DRAFT · productionImportAllowed=false</strong> · 原provider hkcs_m84d1 · raw7 type0/trace0/P0 metadata는 비그리기행이며 필획에 배정하지 않음 · 원12 V/Q gap 접속 미승인</p>'
        if base.get('glyph') == '薩' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'hkcs_m85a9':
            note += '<p data-source-draft="u85a9-hkcs"><strong>DRAFT · productionImportAllowed=false</strong> · 原provider hkcs_m85a9 · 기존T와독립된 authored source · 원8 shortV 및13 V+Q 보존 · 세부 방향·접촉·재생 미승인</p>'
        if base.get('glyph') == '瞥' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'u77a5':
            note += '<p data-source-draft="u77a5"><strong>DRAFT · productionImportAllowed=false</strong> · 원4 H/V의 left-hook 보존 · 공식4 H/V와 세부hook 차이 미승인 · source접촉·재생 미승인</p>'
        if base.get('glyph') == '鼈' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'u9f08':
            note += '<p data-source-draft="u9f08"><strong>DRAFT · productionImportAllowed=false</strong> · 24획 후보 · 原archive5+固定公開2 혼합출처(과거누락복원아님) · 원17 V/Q/H+UP 보존 · 접촉·재생 미승인</p>'
        if base.get('glyph') == '萸' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'u8438-k':
            note += '<p data-source-draft="u8438-k"><strong>DRAFT · 사전13획 / 배정12획 유지 · productionImportAllowed=false</strong> · 원raw14 전체 보존 · raw10 H 다음 raw9 V 묶음은 정적 비교 후보 · 전체13 대응·접촉·재생·개별variant 미승인</p>'
        if base.get('glyph') == '髓' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'hkcs_m9ad3':
            note += '<p data-source-draft="u9ad3-hkcs"><strong>DRAFT · productionImportAllowed=false</strong> · 原provider hkcs_m9ad3 · raw19 type0/trace0/P0는 비그리기 메타행으로 미배정 보존 · 원22/23 guide 간격 유지 · filled-P 교집합은 별도 코드 사실이며 필순·시간·전체 연결 승인 아님</p>'
        if base.get('glyph') == '瘦' and base.get('sourceRoots', {}).get('selected', {}).get('root') == 'hkcs_m7626':
            note += '<p data-source-draft="u7626-hkcs"><strong>DRAFT · 배정14획 유지 / 사전15획 정적판 · productionImportAllowed=false</strong> · 原provider hkcs_m7626 · 원17raw/18mask/32P 전체 보존 · 연속raw10+11 및15+16은 국내방향에 따른 검토후보 · 원10 H/V guide 간격 유지 · 접촉·재생·개별variant 미승인</p>'
        return head + style + note + '<div class="board">' + ''.join(rows) + '</div><h2>미배정 원raw (삭제 없음)</h2><div class="unassigned">' + rest + '</div>'

    shared.guards, shared.selection, shared.page = guarded, selection, page
    return original_page, grouped_svg


def exact_u727c_new_launcher(config,base):
    # Only the pinned original15raw14call32P/zeroRaw4 comparison may use this new launcher.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':'c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f'}
            and config.get('baseConfig')=={'path':'docs/hanja-source-raw-compare-u727c-2026-10-23/config.json','SHA256':'dedb492f64aa35ea4ccb572b5f31ca5dc26dac3fbc60cafdd5416c419a554543'}
            and base.get('glyph')=='牼' and base.get('catalogStrokes')==11
            and list(base.get('sourceRoots',{}))==['selected']
            and selected.get('root')=='u727c'
            and selected.get('file')=='docs/hanja-source-raw-compare-u727c-2026-10-23/engine-whole-u727c.json'
            and selected.get('fileSHA256')=='89859c169dac0332017f79e4c1b39424063e39caa95f3306d972318e0f0702db'
            and selected.get('proofKind')=='actual-full5-direct'
            and selected.get('proofKeys')==['defaults','engineHashes','engineRevision','groups','trace']
            and (selected.get('rawGroups'),selected.get('drawingCalls'),selected.get('polygons'))==(15,14,32)
            and selected.get('polygonCounts')==[3,2,2,3,0,2,3,2,3,2,3,2,2,1,2]
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u6705_prepared_launcher(config,base):
    # Exact u6705 actual-full5 source/base pin only; renderer and source guards remain unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u6705-2026-10-23/config.json",'SHA256':"e9bc71d1de6e9e934761e991023c7ba2a2cf452e929f34d57ca9fc2f455a08a1"}
            and base.get('glyph')=="朅" and base.get('catalogStrokes')==14
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6705","file":"docs/hanja-source-raw-compare-u6705-2026-10-23/engine-whole-u6705.json","fileSHA256":"9ed7129b5a50de139bce4fc494c2e216807d54c8f670f24f7a7b3988eb3b4675","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6705","sourceProofFile":"engine-whole-u6705.json","sourceProofFileSha256":"9ed7129b5a50de139bce4fc494c2e216807d54c8f670f24f7a7b3988eb3b4675"},"rawGroups":18,"drawingCalls":19,"polygonCounts":[3,3,2,2,2,2,1,1,2,1,1,3,1,4,3,2,2,2],"polygons":37}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7c67_prepared_launcher(config,base):
    # Exact u7c67 actual-full5 source/base pin only; renderer and source guards remain unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u7c67-2026-10-23/config.json",'SHA256':"a997df7fd29a5a8725e0296d34fa69ee13568ab469dde7f1671f062ea60d34dc"}
            and base.get('glyph')=="籧" and base.get('catalogStrokes')==23
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u7c67","file":"docs/hanja-source-raw-compare-u7c67-2026-10-23/engine-whole-u7c67.json","fileSHA256":"67be1942eaa84b04bd30b6384ab2edbd1f3124f5a1264577d2eb42f983ca3756","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7c67","sourceProofFile":"engine-whole-u7c67.json","sourceProofFileSha256":"67be1942eaa84b04bd30b6384ab2edbd1f3124f5a1264577d2eb42f983ca3756"},"rawGroups":26,"drawingCalls":30,"polygonCounts":[3,2,2,3,2,2,2,2,1,2,3,2,2,1,4,1,1,3,2,2,2,1,2,3,2,8],"polygons":60}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7d8c_prepared_launcher(config,base):
    # Exact u7d8c actual-full5 source/base pin only; renderer and source guards remain unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u7d8c-2026-10-23/config.json",'SHA256':"fcc0ef1aec732f5fb3bf0b71ca806d9cb5fd3ee7b54032fe2127b0d52e3a99d3"}
            and base.get('glyph')=="綌" and base.get('catalogStrokes')==13
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u7d8c","file":"docs/hanja-source-raw-compare-u7d8c-2026-10-23/engine-whole-u7d8c.json","fileSHA256":"d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7d8c","sourceProofFile":"engine-whole-u7d8c.json","sourceProofFileSha256":"d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713"},"rawGroups":17,"drawingCalls":16,"polygonCounts":[3,2,3,3,2,1,3,2,0,3,2,3,2,1,1,2,1],"polygons":34}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u8627_vs2_prepared_launcher(config,base):
    # Exact original 蘧 VS2 full5; source/renderer/three existing admissions unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u8627-vs2-2026-10-23/config.json",'SHA256':"12762981a5d51fbdafcf31f7f13dbe30e50ea5e0a1501b57fb9f1b054bfbc83e"}
            and base.get('glyph')=='蘧' and base.get('catalogStrokes')==21
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u8627-ue0102","file":"docs/hanja-source-raw-compare-u8627-vs2-2026-10-23/engine-whole-u8627-ue0102.json","fileSHA256":"cfc15b75a2dad4fdc5af7c22c8b2c8632735cd72a3130ce0fb9ca3ba0eca45cd","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8627-ue0102","sourceProofFile":"engine-whole-u8627-ue0102.json","sourceProofFileSha256":"cfc15b75a2dad4fdc5af7c22c8b2c8632735cd72a3130ce0fb9ca3ba0eca45cd"},"rawGroups":24,"drawingCalls":28,"polygonCounts":[2,2,2,2,2,2,1,2,3,2,2,1,4,1,1,3,2,2,2,1,2,3,2,8],"polygons":54}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u83f0_k_prepared_launcher(config,base):
    # 원 u83f0-k 전체 full5/고정 비교 설정만 허용합니다. 기존 분기와 렌더러는 유지합니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u83f0-k-2026-10-23/config.json",'SHA256':"ccc75229a05d0a7784746c80eddd766702c98daf11721ad62ecbfc4441e9c8d1"}
            and base.get('glyph')=="菰" and base.get('catalogStrokes')==12
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u83f0-k","file":"docs/hanja-source-raw-compare-u83f0-k-2026-10-23/engine-whole-u83f0-k.json","fileSHA256":"863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u83f0-k","sourceProofFile":"engine-whole-u83f0-k.json","sourceProofFileSha256":"863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5"},"rawGroups":14,"drawingCalls":16,"polygonCounts":[2,2,2,2,1,2,5,3,3,3,2,3,2,2],"polygons":34}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u6fbe_k_prepared_launcher(config,base):
    # 정확한 澾 원 whole19raw/37P 및 기존 고정 비교 설정만 추가합니다. 렌더링은 유지합니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':"scripts/hanja-raw-static-compare.py",'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6fbe-k-2026-10-24/config.json","SHA256":"5d5eb2af7108df3f883b769e1fac842ad4ecb652e7a09cb92fe03feb1517a42f"}
            and base.get('glyph')=='澾' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6fbe-k","file":"docs/hanja-goal-glyphwiki-batch501-2026-10-10/engine-whole-u6fbe-k.json","fileSHA256":"49ac0bd9728ce5f31905e0abe8d1409e959072469ad9a76a63718e6da5ea93ae","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6fbe-k","sourceProofFile":"engine-whole-u6fbe-k.json","sourceProofFileSha256":"49ac0bd9728ce5f31905e0abe8d1409e959072469ad9a76a63718e6da5ea93ae"},"rawGroups":19,"drawingCalls":19,"polygonCounts":[2,2,2,1,2,2,1,2,3,2,2,2,2,2,3,2,1,2,2],"polygons":37}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u6f5d_prepared_launcher(config,base):
    # 정확한 潝 원 whole19raw/21calls/35P와 고정 비교 설정만 추가합니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':"scripts/hanja-raw-static-compare.py",'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6f5d-2026-10-24/config.json","SHA256":"f8c631f677789e9d97c65cf2a98d3943ba5dbe6e390fd3821dd9af2ace76efe4"}
            and base.get('glyph')=='潝' and base.get('catalogStrokes')==15
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6f5d","file":"docs/hanja-goal-glyphwiki-batch1058-2026-10-13/engine-whole-u6f5d.json","fileSHA256":"0ecb779f68ace811f50d446d854d95765735a55e851f5e8f94235dd7816b33a6","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6f5d","sourceProofFile":"engine-whole-u6f5d.json","sourceProofFileSha256":"0ecb779f68ace811f50d446d854d95765735a55e851f5e8f94235dd7816b33a6"},"rawGroups":19,"drawingCalls":21,"polygonCounts":[2,2,2,1,3,2,2,1,1,2,1,1,5,1,1,1,5,1,1],"polygons":35}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])



def exact_u6f5a_prepared_launcher(config,base):
    # 정확한 潚 원 base full5/고정 설정만 추가; 16획 대응은 아직 정적 가설입니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path': 'scripts/hanja-raw-static-compare.py', 'SHA256': 'bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2'}
            and config.get('baseConfig')=={'path': 'docs/hanja-source-raw-compare-u6f5a-2026-10-24/config.json', 'SHA256': '53308321010da4d5b2661adea73417c38b11e253f17d7a253127ab89b50130a2'}
            and base.get('glyph')=='潚' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={'root': 'u6f5a', 'file': 'docs/hanja-source-raw-compare-u6f5a-2026-10-24/engine-whole-u6f5a.json', 'fileSHA256': '5433ceafe7bd1190e196eafb4c2cefba826d42ee1a0785b6f19615879333cf4f', 'proofKeys': ['defaults', 'engineHashes', 'engineRevision', 'groups', 'trace'], 'proofKind': 'actual-full5-direct', 'sourceProofIdentity': {'sourceRoot': 'u6f5a', 'sourceProofFile': 'engine-whole-u6f5a.json', 'sourceProofFileSha256': '5433ceafe7bd1190e196eafb4c2cefba826d42ee1a0785b6f19615879333cf4f'}, 'rawGroups': 20, 'drawingCalls': 21, 'polygonCounts': [2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 4, 2, 2, 1, 2, 1, 1, 2, 1, 1], 'polygons': 33}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u99fe_prepared_launcher(config,base):
    # Exact compatible 駾 base full5 and fixed17-row hypothesis only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u99fe-2026-10-24/config.json","SHA256":"f4a01015a1a55718ad13efe4dae192ef61666332af21482552cffa005350f050"}
            and base.get('glyph')=='駾' and base.get('catalogStrokes')==17
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u99fe","file":"docs/hanja-source-raw-compare-u99fe-2026-10-24/engine-whole-u99fe.json","fileSHA256":"545ed363b3c99a5cd017a8d23ac28f1d73de2319803d21f832da644a221e89e9","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u99fe","sourceProofFile":"engine-whole-u99fe.json","sourceProofFileSha256":"545ed363b3c99a5cd017a8d23ac28f1d73de2319803d21f832da644a221e89e9"},"rawGroups":20,"drawingCalls":23,"polygonCounts":[1,2,1,2,2,1,4,2,2,2,2,3,2,2,1,1,2,1,3,7],"polygons":43}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7049_prepared_launcher(config,base):
    # 灉 원full5/고정정적설정만 추가;21행대응은미승인가설입니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path': 'scripts/hanja-raw-static-compare.py', 'SHA256': 'bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2'}
            and config.get('baseConfig')=={'path': 'docs/hanja-source-raw-compare-u7049-2026-10-24/config.json', 'SHA256': '3ae900379f9e3b91d229fd3a1151659e9b131a09d047c16a7e76f139cf70b9b7'}
            and base.get('glyph')=='灉' and base.get('catalogStrokes')==21
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={'root': 'u7049', 'file': 'docs/hanja-source-raw-compare-u7049-2026-10-24/engine-whole-u7049.json', 'fileSHA256': '39a8f010eeae63eac2530ed90c3b26267c9df5ea811b38ccd85b5e8cffa15228', 'proofKeys': ['defaults', 'engineHashes', 'engineRevision', 'groups', 'trace'], 'proofKind': 'actual-full5-direct', 'sourceProofIdentity': {'sourceRoot': 'u7049', 'sourceProofFile': 'engine-whole-u7049.json', 'sourceProofFileSha256': '39a8f010eeae63eac2530ed90c3b26267c9df5ea811b38ccd85b5e8cffa15228'}, 'rawGroups': 27, 'drawingCalls': 29, 'polygonCounts': [2, 2, 2, 1, 3, 2, 3, 2, 3, 2, 1, 1, 2, 1, 1, 2, 1, 7, 1, 3, 1, 3, 2, 1, 2, 2, 2], 'polygons': 55}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u95e5_prepared_launcher(config,base):
    # Exact 闥 original full5 and pending21-row static mapping only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u95e5-2026-10-24/config.json","SHA256":"5fddac381caf65b6d827f11de20769c1bed8f0faec27d850d19e34f9f679221d"}
            and base.get('glyph')=='闥' and base.get('catalogStrokes')==21
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u95e5","file":"docs/hanja-goal-glyphwiki-batch502-2026-10-10/engine-whole-u95e5.json","fileSHA256":"5938703e815f431ed2eba11c34b17fcaae2784ef16759dda94862c1f2ab26711","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u95e5","sourceProofFile":"engine-whole-u95e5.json","sourceProofFileSha256":"5938703e815f431ed2eba11c34b17fcaae2784ef16759dda94862c1f2ab26711"},"rawGroups":25,"drawingCalls":26,"polygonCounts":[1,1,2,1,1,1,1,5,1,1,2,2,1,2,3,2,2,2,2,2,3,2,1,2,2],"polygons":45}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u852d_k_prepared_launcher(config,base):
    # Exact 蔭 original K full5 and unapproved15-row static map only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u852d-k-2026-10-24/config.json","SHA256":"883c5835d2b071b33f444b90a88701ae47c03856455ef6ddac227e24a941ab48"}
            and base.get('glyph')=='蔭' and base.get('catalogStrokes')==15
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u852d-k","file":"docs/hanja-goal-glyphwiki-batch803-2026-10-13/engine-whole-u852d-k.json","fileSHA256":"96ed622d7b6f588da0aa02b1c91278ab7d1208b13a79137b2bddc1c329a10b6e","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u852d-k","sourceProofFile":"engine-whole-u852d-k.json","sourceProofFileSha256":"96ed622d7b6f588da0aa02b1c91278ab7d1208b13a79137b2bddc1c329a10b6e"},"rawGroups":18,"drawingCalls":19,"polygonCounts":[2,2,2,2,1,2,4,1,3,2,2,1,2,2,2,1,3,2],"polygons":36}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u8aed_k_prepared_launcher(config,base):
    # Exact 諭 K original whole and unapproved16-row static hypothesis only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u8aed-k-2026-10-24/config.json","SHA256":"362bebc6675cc9fd65a96e2a009c1ae48c637e4ebe021d819f00c73da71e9847"}
            and base.get('glyph')=='諭' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u8aed-k","file":"docs/hanja-goal-glyphwiki-batch779-2026-10-13/engine-whole-u8aed-k.json","fileSHA256":"da9afcaae2e0e8d69387002c8327eb4d20954e714f13df39cc64ef8e25ba15ab","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8aed-k","sourceProofFile":"engine-whole-u8aed-k.json","sourceProofFileSha256":"da9afcaae2e0e8d69387002c8327eb4d20954e714f13df39cc64ef8e25ba15ab"},"rawGroups":21,"drawingCalls":22,"polygonCounts":[2,2,2,2,1,1,2,1,2,1,2,2,1,1,5,2,2,3,2,3,2],"polygons":41}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u9d25_prepared_launcher(config,base):
    # Exact 鴥 full5 and unapproved16-row static map only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u9d25-2026-10-24/config.json","SHA256":"c58807bfc74459e30bd992eefdec5f783d2defc8cf13effcb3e289fb382dc621"}
            and base.get('glyph')=='鴥' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u9d25","file":"docs/hanja-goal-glyphwiki-batch798-2026-10-13/engine-whole-u9d25.json","fileSHA256":"188aa697b354779ac0c83b68a5bdb934c178bb6495dab1272373aafe7f81e630","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u9d25","sourceProofFile":"engine-whole-u9d25.json","sourceProofFileSha256":"188aa697b354779ac0c83b68a5bdb934c178bb6495dab1272373aafe7f81e630"},"rawGroups":20,"drawingCalls":21,"polygonCounts":[3,1,1,2,1,1,2,1,4,2,2,2,2,2,2,1,2,2,2,3],"polygons":38}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u8fe8_prepared_launcher(config,base):
    # Exact original base13 full5 / unapproved 台5・辶4 static hypothesis only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u8fe8-2026-10-24/config.json","SHA256":"16f54696be367ee3b8f6de3e824b73e35d46a29a2dd416ef7561808932c518b0"}
            and base.get('glyph')=='迨' and base.get('catalogStrokes')==9
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u8fe8","file":"docs/hanja-source-raw-compare-u8fe8-2026-10-24/engine-whole-u8fe8.json","fileSHA256":"b761033f1011dae76fe3d30324ddae06448954c52a583305ee2ee085f21f80b1","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8fe8","sourceProofFile":"engine-whole-u8fe8.json","sourceProofFileSha256":"b761033f1011dae76fe3d30324ddae06448954c52a583305ee2ee085f21f80b1"},"rawGroups":13,"drawingCalls":13,"polygonCounts":[2,2,1,2,3,2,3,3,2,1,1,2,1],"polygons":25}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u6d8f_prepared_launcher(config,base):
    # Exact 涏 full5 and new unapproved10-row static hypothesis only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6d8f-2026-10-24/config.json","SHA256":"709083c16689019db747bc8b10790efde32ba6dfccb264d34232a2701b65775b"}
            and base.get('glyph')=='涏' and base.get('catalogStrokes')==10
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6d8f","file":"docs/hanja-goal-glyphwiki-batch853-2026-10-13/engine-whole-u6d8f.json","fileSHA256":"a795484e0b8159d34d16c3ccb76f4d3e3dcd3c73647d52d0fe5e506bcba71879","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6d8f","sourceProofFile":"engine-whole-u6d8f.json","sourceProofFileSha256":"a795484e0b8159d34d16c3ccb76f4d3e3dcd3c73647d52d0fe5e506bcba71879"},"rawGroups":13,"drawingCalls":13,"polygonCounts":[2,2,2,1,1,2,1,2,2,2,1,2,3],"polygons":23}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u6f11_prepared_launcher(config,base):
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6f11-2026-10-24/config.json","SHA256":"f42f0195964d8c04069605b9aa68b2ab2b8cba392b6e11949648209d3544dac8"}
            and base.get('glyph')=='漑' and base.get('catalogStrokes')==14
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6f11","file":"docs/hanja-source-raw-compare-u6f11-2026-10-24/engine-whole-u6f11.json","fileSHA256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6f11","sourceProofFile":"engine-whole-u6f11.json","sourceProofFileSha256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339"},"rawGroups":17,"drawingCalls":19,"polygonCounts":[2,2,2,1,3,1,2,1,1,1,2,2,2,1,2,1,8],"polygons":34}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u6f7e_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6f7e-2026-10-24/config.json","SHA256":"c18af5e95b0ebabc4148edfd0ad72a8a885e6d3378d745f549446ead9ee36aa1"}
            and base.get('glyph')=='潾' and base.get('catalogStrokes')==15
            and base.get('defaultSource')=='base' and base.get('sourceRoots')=={"base":{"root":"u6f7e","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e.json","fileSHA256":"0a1bf9390d7fbda582d0adc85f4ea06897b485e0000c78604ac249af1e980f14","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e","sourceProofFile":"engine-whole-u6f7e.json","sourceProofFileSha256":"0a1bf9390d7fbda582d0adc85f4ea06897b485e0000c78604ac249af1e980f14"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34},"k":{"root":"u6f7e-k","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-k.json","fileSHA256":"f71e6368f7e92fb4714cabccb3b552586b5bf17406aa8bddec2197d07370879a","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-k","sourceProofFile":"engine-whole-u6f7e-k.json","sourceProofFileSha256":"f71e6368f7e92fb4714cabccb3b552586b5bf17406aa8bddec2197d07370879a"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34},"g":{"root":"u6f7e-g","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-g.json","fileSHA256":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-g","sourceProofFile":"engine-whole-u6f7e-g.json","sourceProofFileSha256":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,2,2,2],"polygons":35},"vs0":{"root":"u6f7e-ue0100","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-ue0100.json","fileSHA256":"877bbb703a71ab5cc91491a313f56ae4f28d56fafd14f4388615d6f18ce4a4e2","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-ue0100","sourceProofFile":"engine-whole-u6f7e-ue0100.json","sourceProofFileSha256":"877bbb703a71ab5cc91491a313f56ae4f28d56fafd14f4388615d6f18ce4a4e2"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34},"vs3":{"root":"u6f7e-ue0103","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-ue0103.json","fileSHA256":"9a5117a7ea2621c743aa9f89039be992e7f2cae754a0850afc7e9fe3c2437116","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-ue0103","sourceProofFile":"engine-whole-u6f7e-ue0103.json","sourceProofFileSha256":"9a5117a7ea2621c743aa9f89039be992e7f2cae754a0850afc7e9fe3c2437116"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34}}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u7e81_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u7e81-2026-10-24/config.json","SHA256":"6bc243bb7d33a3dafff6c6af7f3bbb263252be1d00d4559158f3cd495a791341"}
            and base.get('glyph')=='纁' and base.get('catalogStrokes')==20
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u7e81","file":"docs/hanja-goal-glyphwiki-batch1047-2026-10-13/engine-whole-u7e81.json","fileSHA256":"a1823d5561cf955317c983a38753aa419edfb790f75d772aed00a85ab96dbe9f","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7e81","sourceProofFile":"engine-whole-u7e81.json","sourceProofFileSha256":"a1823d5561cf955317c983a38753aa419edfb790f75d772aed00a85ab96dbe9f"},"rawGroups":23,"drawingCalls":23,"polygonCounts":[3,2,3,3,2,1,3,2,3,2,1,1,2,1,1,2,2,2,3,2,2,2,2],"polygons":47}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u9436_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u9436-2026-10-24/config.json","SHA256":"960213ec06d87c7d04e3a898d0d5093c239f2121ad02a50a8bc50116efac1a7f"}
            and base.get('glyph')=='鐶' and base.get('catalogStrokes')==21
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u9436","file":"docs/hanja-source-raw-compare-u9436-2026-10-24/engine-whole-u9436.json","fileSHA256":"0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u9436","sourceProofFile":"engine-whole-u9436.json","sourceProofFileSha256":"0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603"},"rawGroups":24,"drawingCalls":24,"polygonCounts":[3,2,2,2,1,2,3,3,1,1,2,1,1,1,2,1,1,2,1,3,1,3,3,2],"polygons":44}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17,18],[19],[20],[21,22],[23],[24]]}
            and digest(fixed_path('docs/hanja-source-original-u9436-2026-10-24/fixtures.json').read_bytes())=='43f22c4c0b286fbba367ffd000011c42ccfcbfe9cd81ff05f89b6e79d0eb6900'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u7e2d_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u7e2d-2026-10-24/config.json","SHA256":"43fee3874d3181fa8ef3f4888d3344ef5112e04dbe4d14c24a07827dffb6860e"}
            and base.get('glyph')=='縭' and base.get('catalogStrokes')==17
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u7e2d","file":"docs/hanja-goal-glyphwiki-batch553-2026-10-11/engine-whole-u7e2d.json","fileSHA256":"33c6544a106e4895d16226e405478e88f5f60031e29efe306ee85fe6cefe3f99","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7e2d","sourceProofFile":"engine-whole-u7e2d.json","sourceProofFileSha256":"33c6544a106e4895d16226e405478e88f5f60031e29efe306ee85fe6cefe3f99"},"rawGroups":21,"drawingCalls":22,"polygonCounts":[3,2,3,3,2,1,3,2,2,2,3,2,2,2,1,1,1,5,3,3,2],"polygons":48}
            and config.get('provisionalGroups')=={"selected":[[1,2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13,15],[14],[16],[17,18],[19],[20],[21]]}
            and digest(fixed_path('docs/hanja-source-original-u7e2d-2026-10-24/fixtures.json').read_bytes())=='bfe975d78fac8627c6626280770a96c211eb828c7f71029b00bcad733cd5cbd2'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7e91_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u7e91-2026-10-24/config.json","SHA256":"5e87263b2ae2825e51224daa0095c27bde681fa729c0c81a75bdc9900c924b17"}
            and base.get('glyph')=='纑' and base.get('catalogStrokes')==22
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u7e91","file":"docs/hanja-goal-glyphwiki-batch540-2026-10-11/engine-whole-u7e91.json","fileSHA256":"d7ab4a3612b89d69d79d529c44bbf4f5d78c72b5b3ac1e40a66a79309493c9de","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7e91","sourceProofFile":"engine-whole-u7e91.json","sourceProofFileSha256":"d7ab4a3612b89d69d79d529c44bbf4f5d78c72b5b3ac1e40a66a79309493c9de"},"rawGroups":27,"drawingCalls":30,"polygonCounts":[3,2,3,3,2,1,3,2,2,2,3,1,2,2,8,1,1,2,1,1,1,1,1,2,1,1,2],"polygons":54}
            and config.get('provisionalGroups')=={"selected":[[1,2],[3,4],[5],[6],[7],[8],[9],[10],[12,13],[11],[14],[15],[16],[17,18],[20],[19],[21],[22],[23,24],[25],[26],[27]]}
            and digest(fixed_path('docs/hanja-source-original-u7e91-2026-10-24/fixtures.json').read_bytes())=='a022d1a7d2ee09f3ee46f501cd27f97552a4dd9f8dd89a491cc0bf7d8a14eadc'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7e9a_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u7e9a-2026-10-24/config.json","SHA256":"f3169783e324272b88848970450d7a9f570eca02643414976d4d331c98938244"}
            and base.get('glyph')=='纚' and base.get('catalogStrokes')==25
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u7e9a","file":"docs/hanja-goal-glyphwiki-batch551-2026-10-11/engine-whole-u7e9a.json","fileSHA256":"3c498660b43880fd42727bc88b3415aab486d5e48ef910dc18a3f47cbf4c2c6e","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7e9a","sourceProofFile":"engine-whole-u7e9a.json","sourceProofFileSha256":"3c498660b43880fd42727bc88b3415aab486d5e48ef910dc18a3f47cbf4c2c6e"},"rawGroups":31,"drawingCalls":34,"polygonCounts":[3,2,3,3,2,1,3,2,2,1,1,2,2,2,1,1,2,2,2,2,3,1,2,1,2,2,2,2,3,3,8],"polygons":68}
            and config.get('provisionalGroups')=={"selected":[[1,2],[3,4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18],[19],[20],[21],[22,23],[25],[26],[24],[27],[28,29],[30],[31]]}
            and digest(fixed_path('docs/hanja-source-original-u7e9a-2026-10-24/fixtures.json').read_bytes())=='4593c89489156c677abfabe5021fb99b12c9e3151d7a281c6c4cc0986e41cc51'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u8646_k_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u8646-k-2026-10-24/config.json","SHA256":"fdecb84c278958b640594966056c398d3cf120b03c440c1c27b2c40a85947a01"}
            and base.get('glyph')=='虆' and base.get('catalogStrokes')==25
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u8646-k","file":"docs/hanja-goal-glyphwiki-batch548-2026-10-11/engine-whole-u8646-k.json","fileSHA256":"486234a872334f2fbef3508136ee0dc2f1558574200daaf97e8816df0df8b26b","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8646-k","sourceProofFile":"engine-whole-u8646-k.json","sourceProofFileSha256":"486234a872334f2fbef3508136ee0dc2f1558574200daaf97e8816df0df8b26b"},"rawGroups":30,"drawingCalls":30,"polygonCounts":[2,2,2,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,3,2,3,3,2,1,3,2],"polygons":48}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[4],[3],[5],[6,7],[9],[8],[10],[11],[12,13],[15],[14],[16],[17],[18,19],[21],[20],[22],[23,24],[25,26],[27],[28],[29],[30]]}
            and digest(fixed_path('docs/hanja-source-original-u8646-k-2026-10-24/fixtures.json').read_bytes())=='1c261535e3423ed20da29e826f94ffcab4dccc33194d9bbf00e5fb8df0912f7c'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u9004_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u9004-2026-10-24/config.json","SHA256":"33bcb3c07faec7676c38f2ff728440e19d88009e3f0a8764e7c0f869bf9399dd"}
            and base.get('glyph')=='逄' and base.get('catalogStrokes')==10
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u9004","file":"docs/hanja-goal-glyphwiki-batch591-2026-10-11/engine-whole-u9004.json","fileSHA256":"257a1f8d261cbba41435b26f675cb6547069179b395630f93b77f461da7ac04c","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u9004","sourceProofFile":"engine-whole-u9004.json","sourceProofFileSha256":"257a1f8d261cbba41435b26f675cb6547069179b395630f93b77f461da7ac04c"},"rawGroups":14,"drawingCalls":14,"polygonCounts":[2,2,1,2,3,2,3,1,2,2,2,1,2,2],"polygons":27}
            and config.get('provisionalGroups')=={"selected":[[7],[8,9],[10],[11],[12,13],[14],[1],[2],[3,4],[5,6]]}
            and digest(fixed_path('docs/hanja-source-original-u9004-2026-10-24/fixtures.json').read_bytes())=='fb4219d3b4cabf10475ce840f3b6f61e5b82e185bee9cf2bab7adb1c04c3531c'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u9088_k_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u9088-k-2026-10-24/config.json","SHA256":"9b74bc641634f4656395df6947e849a54f27b2debaaad8e57e2094d8c2a093e8"}
            and base.get('glyph')=='邈' and base.get('catalogStrokes')==18
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u9088-k","file":"docs/hanja-source-original-u9088-k-2026-10-24/engine-whole-u9088-k.json","fileSHA256":"09a4c3bdee0998632927569dec360abbc5b5a857bc6d90a475d61ed55c555773","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u9088-k","sourceProofFile":"engine-whole-u9088-k.json","sourceProofFileSha256":"09a4c3bdee0998632927569dec360abbc5b5a857bc6d90a475d61ed55c555773"},"rawGroups":21,"drawingCalls":24,"polygonCounts":[2,2,1,2,3,2,3,2,2,3,4,1,1,3,1,1,2,1,1,3,7],"polygons":47}
            and config.get('provisionalGroups')=={"selected":[[7],[9],[8],[10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20],[21],[1],[2],[3,4],[5,6]]}
            and digest(fixed_path('docs/hanja-source-original-u9088-k-2026-10-24/fixtures.json').read_bytes())=='2b0be5442dca3798a731c5f3c8fad7d41f22c18bf4ec81b7780e5d1f97dc6b26'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u8596_ue0100_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u8596-ue0100-2026-10-24/config.json","SHA256":"73fd44ec752ee239d118b70d16cbd071eb61976c9021cb092574aa3476e980a0"}
            and base.get('glyph')=='薖' and base.get('catalogStrokes')==17
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u8596-ue0100","file":"docs/hanja-actual-engine-capture-u8596-ue0100-2026-10-24/engine-whole-u8596-ue0100.json","fileSHA256":"38c7fea359004b8b9b8f36bb4e811f0f5d078c97e932ff08751cf5fe24fcb52b","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8596-ue0100","sourceProofFile":"engine-whole-u8596-ue0100.json","sourceProofFileSha256":"38c7fea359004b8b9b8f36bb4e811f0f5d078c97e932ff08751cf5fe24fcb52b"},"rawGroups":22,"drawingCalls":23,"polygonCounts":[2,2,2,2,2,2,1,2,3,2,1,1,2,1,1,1,1,5,1,1,2,1],"polygons":38}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[4],[3],[11],[12,13],[15],[14],[16],[17,18],[19],[20,21],[22],[5],[6],[7,8],[9,10]]}
            and digest(fixed_path('docs/hanja-source-original-u8596-ue0100-2026-10-24/fixtures.json').read_bytes())=='ad905133c04ef96569aab4ed8c311100cf6868f0f4a61b83e05b1e2dc8e613a2'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u8407_ue0102_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u8407-ue0102-2026-10-24/config.json","SHA256":"1d32343d2037cdcbe1ce5eeb7789285d3b7adf230dd718229e2e373dbf0b6ddf"}
            and base.get('glyph')=='萇' and base.get('catalogStrokes')==12
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u8407-ue0102","file":"docs/hanja-actual-engine-capture-u8407-ue0102-2026-10-24/engine-whole-u8407-ue0102.json","fileSHA256":"3f1c41b838f99ea1bf71c04141a7ec4b51bc775a6dc32a18fab70c162fef1af1","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8407-ue0102","sourceProofFile":"engine-whole-u8407-ue0102.json","sourceProofFileSha256":"3f1c41b838f99ea1bf71c04141a7ec4b51bc775a6dc32a18fab70c162fef1af1"},"rawGroups":13,"drawingCalls":13,"polygonCounts":[2,2,2,2,1,3,3,2,2,1,2,2,2],"polygons":26}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[4],[3],[10],[9],[11],[12],[13],[5,6],[7],[8]]}
            and digest(fixed_path('docs/hanja-source-original-u8407-ue0102-2026-10-24/fixtures.json').read_bytes())=='2d54b7090685d8d2464dba1c6db3676a7c972bae0adb3ad80c37166a6609378e'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u9ae7_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u9ae7-2026-10-24/config.json","SHA256":"b30152175cab477a6110b44d24b03d57db8c0f1b493df62487547a030176b875"}
            and base.get('glyph')=='髧' and base.get('catalogStrokes')==14
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u9ae7","file":"docs/hanja-goal-glyphwiki-batch508-2026-10-10/engine-whole-u9ae7.json","fileSHA256":"b6be7529ec6be632a7df3860b5e90adc6eb8b170cabd9948216785e00af42ca8","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u9ae7","sourceProofFile":"engine-whole-u9ae7.json","sourceProofFileSha256":"b6be7529ec6be632a7df3860b5e90adc6eb8b170cabd9948216785e00af42ca8"},"rawGroups":16,"drawingCalls":19,"polygonCounts":[1,2,2,2,2,1,3,2,3,3,3,2,1,2,4,8],"polygons":41}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13,14],[15],[16]]}
            and digest(fixed_path('docs/hanja-source-original-u9ae7-2026-10-24/fixtures.json').read_bytes())=='650e2a6cdccb0c7f7e313d113dc941aa80bd3a0a5674896773a579ef00a3392e'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u66c1_ue0102_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u66c1-ue0102-2026-10-24/config.json","SHA256":"9d29c097824ea5517a89a33052a2e20ff1dca12cd263060b9aee9d6c03bb5620"}
            and base.get('glyph')=='曁' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and base['sourceRoots']['selected']=={"root":"u66c1-ue0102","file":"docs/hanja-goal-glyphwiki-batch483-2026-10-10/engine-whole-u66c1-ue0102.json","fileSHA256":"922fb9aec974db3e0a06eaf886940b1019e7d19737556ef0c9e7b957d5c87f58","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u66c1-ue0102","sourceProofFile":"engine-whole-u66c1-ue0102.json","sourceProofFileSha256":"922fb9aec974db3e0a06eaf886940b1019e7d19737556ef0c9e7b957d5c87f58"},"rawGroups":19,"drawingCalls":24,"polygonCounts":[3,1,1,2,1,1,3,8,2,1,2,2,8,1,1,2,1,1,2],"polygons":43}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3,4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17],[18],[19]]}
            and digest(fixed_path('docs/hanja-source-original-u66c1-ue0102-2026-10-24/fixtures.json').read_bytes())=='50c6d0c55868a1cfb7d3fcfb95b27c2847536dc5053427ae34b3d7c6ea29f875'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u704c_ue0102_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u704c-ue0102-2026-10-24/config.json","SHA256":"eb9c3b5fcedd1e4650a8296ef8c055a6b0303f07d12841f5c05ce2009bf70bc7"}
            and base.get('glyph')=='灌' and base.get('catalogStrokes')==21
            and base.get('sourceRoots')=={"selected":{"root":"u704c-ue0102","file":"docs/hanja-actual-engine-capture-u704c-ue0102-2026-10-24/engine-whole-u704c-ue0102.json","fileSHA256":"ff2660d31e4bd92c37dd8fc15811eea2ee743f8ca4a5a8f082be55c9c22f45ba","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u704c-ue0102","sourceProofFile":"engine-whole-u704c-ue0102.json","sourceProofFileSha256":"ff2660d31e4bd92c37dd8fc15811eea2ee743f8ca4a5a8f082be55c9c22f45ba"},"rawGroups":24,"drawingCalls":24,"polygonCounts":[2,2,2,1,1,2,2,2,1,1,2,1,1,1,2,1,3,2,3,1,2,2,2,2],"polygons":41}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3,4],[5],[6],[8],[7],[9],[10,11],[12],[13],[14,15],[16],[17],[18],[19],[21],[22],[23],[20],[24]]}
            and digest(fixed_path('docs/hanja-source-original-u704c-ue0102-2026-10-24/fixtures.json').read_bytes())=='12fae745906f9f6e9b6e58136c363dc744d0b205e5f04752c1a3d2d206441f5a'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7006_prepared_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"7c755b435bc47ccd06e28c27f70bb719736428a2ae3110f59e4f959fef465f92"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u7006-2026-10-24/config.json","SHA256":"34fd3c710aa95df286e7d22028e15d1ce146d3157f4838b684855d412524afb4"}
            and base.get('glyph')=='瀆' and base.get('catalogStrokes')==18
            and base.get('sourceRoots')=={"base":{"root":"u7006","file":"docs/hanja-remaining-seven-sources-2026-10-17/engine-whole-u7006.json","fileSHA256":"1310a035ab490a9e05b961c9b49442dc10e0064bf656b4500924badb4895d616","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7006","sourceProofFile":"engine-whole-u7006.json","sourceProofFileSha256":"1310a035ab490a9e05b961c9b49442dc10e0064bf656b4500924badb4895d616"},"rawGroups":21,"drawingCalls":23,"polygonCounts":[2,2,2,1,2,2,2,1,1,2,1,7,1,1,1,2,1,1,1,3,2],"polygons":38},"k":{"root":"u7006-k","file":"docs/hanja-remaining-seven-sources-2026-10-17/engine-whole-u7006-k.json","fileSHA256":"763a7e9a6e874d2e7355d0fd075c73265134ec6c936f40edb4625da6401ae98c","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7006-k","sourceProofFile":"engine-whole-u7006-k.json","sourceProofFileSha256":"763a7e9a6e874d2e7355d0fd075c73265134ec6c936f40edb4625da6401ae98c"},"rawGroups":21,"drawingCalls":23,"polygonCounts":[2,2,2,1,2,2,2,1,1,2,1,7,1,1,1,2,1,1,1,3,2],"polygons":38},"vs2":{"root":"u7006-ue0102","file":"docs/hanja-remaining-seven-sources-2026-10-17/engine-whole-u7006-ue0102.json","fileSHA256":"f9b89ebf385899446e117c1dee90757eb8475cb1c865a04c7d3c789486ee6e7e","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7006-ue0102","sourceProofFile":"engine-whole-u7006-ue0102.json","sourceProofFileSha256":"f9b89ebf385899446e117c1dee90757eb8475cb1c865a04c7d3c789486ee6e7e"},"rawGroups":21,"drawingCalls":21,"polygonCounts":[2,2,2,1,2,2,2,1,1,2,1,1,1,1,1,2,1,1,1,3,2],"polygons":32}}
            and config.get('provisionalGroups')=={"base":[[1],[2],[3,4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21]],"k":[None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None],"vs2":[None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None]}
            and digest(fixed_path('docs/hanja-source-original-u7006-2026-10-24/fixtures.json').read_bytes())=='2dd9431586aa5675eda013adc419865182bced5818c508366bd76ae80729df86'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u85a9_t_draft_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"b5007019ad279c0c84f0698440f4446c093892c98be4191c13608d9d614c0544"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u85a9-t-2026-10-24/config.json","SHA256":"7d228ffe8c0ec6adef8389933590cb515568c3a23a92acdb7af2a001b00b2db8"}
            and base.get('glyph')=='薩' and base.get('catalogStrokes')==18
            and base.get('sourceRoots')=={"selected":{"root":"u85a9-t","file":"docs/hanja-actual-engine-capture-u85a9-t-2026-10-24/engine-whole-u85a9-t.json","fileSHA256":"5c1a246213dd02dc03098c05502907ed92ea9fd2d5e27d332d18f18f42e5ea29","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u85a9-t","sourceProofFile":"engine-whole-u85a9-t.json","sourceProofFileSha256":"5c1a246213dd02dc03098c05502907ed92ea9fd2d5e27d332d18f18f42e5ea29"},"rawGroups":19,"drawingCalls":21,"polygonCounts":[2,2,2,2,1,2,4,1,2,2,3,2,3,2,3,2,2,2,2],"polygons":41}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[14],[13],[15],[16],[18],[17],[19]]}
            and config.get('draftState')=={"status":"DRAFT-parts-comparison-only","productionImportAllowed":False,"sourceStaticMappingApproved":False,"unresolvedPens":[2,4,8,13],"stroke8":"official short V versus original down-right Q; unresolved","stroke13":"original initial V plus Q; unresolved","strokes2and4":"original slanted lines retained; unresolved"}
            and digest(fixed_path('docs/hanja-source-original-u85a9-t-2026-10-24/fixtures.json').read_bytes())=='1b756f2cf58943468dee8ff389bf0fa46542200d6a26cf8d781d3cc8691cebea'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u64c4_k_draft_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"b5007019ad279c0c84f0698440f4446c093892c98be4191c13608d9d614c0544"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u64c4-k-2026-10-24/config.json","SHA256":"ac140a46fcf3c1ea60045cee7d3004106ec504c02f288b8fca5b1e6088ea6857"}
            and base.get('glyph')=='擄' and base.get('catalogStrokes')==16
            and base.get('sourceRoots')=={"selected":{"root":"u64c4-k","file":"docs/hanja-actual-engine-capture-u64c4-k-2026-10-24/engine-whole-u64c4-k.json","fileSHA256":"a3563f77d80bf7e4ba1754fc244abd28d05589bfcbaa429c36d6110c2f16e792","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u64c4-k","sourceProofFile":"engine-whole-u64c4-k.json","sourceProofFileSha256":"a3563f77d80bf7e4ba1754fc244abd28d05589bfcbaa429c36d6110c2f16e792"},"rawGroups":19,"drawingCalls":24,"polygonCounts":[2,5,3,2,2,3,1,2,2,8,1,1,2,2,1,1,1,4,3],"polygons":46}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5],[7,8],[6],[9],[10],[11],[12,13],[14],[15],[16],[17,18],[19]]}
            and digest(fixed_path('docs/hanja-source-original-u64c4-k-2026-10-24/fixtures.json').read_bytes())=='5c32d5b87902415e499e15f4607ea15ca7776dfecb3b4eddb1e10d3caba96ccb'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u84d1_hkcs_draft_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"ae1868a1be81fe6ffce6d8254cfaa65a64f9c0b861eeb0fa99a7f2328fa0522f"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u84d1-hkcs-2026-10-24/config.json","SHA256":"03f50c7ece6a376b65572676e4680d5ab788a77baa2102e5d6dc99dab850ac09"}
            and base.get('glyph')=='蓑' and base.get('catalogStrokes')==14
            and base.get('sourceRoots')=={"selected":{"root":"hkcs_m84d1","file":"docs/hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/engine-whole-u84d1-hkcs.json","fileSHA256":"ab7220e5d130e893e4e82462f8b60e4891d2e542278a3cec744f4d797c8d70ee","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"hkcs_m84d1","sourceProofFile":"engine-whole-u84d1-hkcs.json","sourceProofFileSha256":"ab7220e5d130e893e4e82462f8b60e4891d2e542278a3cec744f4d797c8d70ee"},"rawGroups":17,"drawingCalls":16,"polygonCounts":[2,2,2,2,2,2,0,1,1,2,2,1,1,1,3,3,2],"polygons":29}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5],[6],[8],[9,10],[11],[12],[13],[14,15],[16],[17]]}
            and digest(fixed_path('docs/hanja-source-original-u84d1-hkcs-2026-10-24/fixtures.json').read_bytes())=='486f3a7f1a37050ed8bfbeb15eff7383126f1b4eb4ed591ac54faa30032bc966'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u85a9_hkcs_draft_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"ae1868a1be81fe6ffce6d8254cfaa65a64f9c0b861eeb0fa99a7f2328fa0522f"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u85a9-hkcs-2026-10-24/config.json","SHA256":"774c980fdc4a12dadfcb7c57bb14d2f34518b58ad941fe13816f58fd527f5a09"}
            and base.get('glyph')=='薩' and base.get('catalogStrokes')==18
            and base.get('sourceRoots')=={"selected":{"root":"hkcs_m85a9","file":"docs/hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/engine-whole-u85a9-hkcs.json","fileSHA256":"5d170f317debfacc063795bbcd23b7b3b5c84703b2415decd8ca9c8535a41267","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"hkcs_m85a9","sourceProofFile":"engine-whole-u85a9-hkcs.json","sourceProofFileSha256":"5d170f317debfacc063795bbcd23b7b3b5c84703b2415decd8ca9c8535a41267"},"rawGroups":19,"drawingCalls":21,"polygonCounts":[2,2,2,2,1,2,4,1,2,2,3,2,2,3,3,2,2,2,2],"polygons":41}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]]}
            and digest(fixed_path('docs/hanja-source-original-u85a9-hkcs-2026-10-24/fixtures.json').read_bytes())=='05d7a137e69d5de696a195411e990f7ed8777e0c124de2770e022f9093271b53'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u77a5_draft_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"ae1868a1be81fe6ffce6d8254cfaa65a64f9c0b861eeb0fa99a7f2328fa0522f"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u77a5-2026-10-24/config.json","SHA256":"6cd5d771d49d45f1ed4c18f8496679fc656553820b1a530fd1850f9bbb73e4fe"}
            and base.get('glyph')=='瞥' and base.get('catalogStrokes')==16
            and base.get('sourceRoots')=={"selected":{"root":"u77a5","file":"docs/hanja-actual-engine-capture-u77a5-2026-10-24/engine-whole-u77a5.json","fileSHA256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u77a5","sourceProofFile":"engine-whole-u77a5.json","sourceProofFileSha256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889"},"rawGroups":18,"drawingCalls":19,"polygonCounts":[2,1,1,5,3,2,3,2,3,2,3,2,1,1,2,1,1,1],"polygons":36}}
            and config.get('provisionalGroups')=={"selected":[[5],[6],[2],[3,4],[1],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18]]}
            and digest(fixed_path('docs/hanja-source-original-u77a5-2026-10-24/fixtures.json').read_bytes())=='c83c5411f13fe33360691edfc74ecd670ed18a003efd67421ac0cd856375f50d'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u9f08_draft_launcher(config,base):
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"ae1868a1be81fe6ffce6d8254cfaa65a64f9c0b861eeb0fa99a7f2328fa0522f"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u9f08-2026-10-24/config.json","SHA256":"ff5a36bf5b540769b6f5ba410f56b78f376871d24432f63bd1c9bda0ca49a129"}
            and base.get('glyph')=='鼈' and base.get('catalogStrokes')==24
            and base.get('sourceRoots')=={"selected":{"root":"u9f08","file":"docs/hanja-actual-engine-capture-u9f08-2026-10-24/engine-whole-u9f08.json","fileSHA256":"8709710f1c22ce9ac8b8977b3b7692c560e8bd882be593612372816425f7de86","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u9f08","sourceProofFile":"engine-whole-u9f08.json","sourceProofFileSha256":"8709710f1c22ce9ac8b8977b3b7692c560e8bd882be593612372816425f7de86"},"rawGroups":27,"drawingCalls":30,"polygonCounts":[3,2,3,2,1,1,2,1,1,1,7,1,2,1,1,1,3,1,1,2,1,1,5,3,2,3,2],"polygons":54}}
            and config.get('provisionalGroups')=={"selected":[[24],[25],[21],[22,23],[20],[26],[27],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[17],[16],[18],[19],[12,13],[14],[15]]}
            and digest(fixed_path('docs/hanja-source-original-u9f08-2026-10-24/fixtures.json').read_bytes())=='2429c5557e056c72da95208953c67ea71c9c011588c0b514f872bb48f9a26e05'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u8438_k_dictionary_draft_launcher(config,base):
    # Only dictionary13 STATIC rows; authoritative exam catalog12 remains unchanged.
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':'ae1868a1be81fe6ffce6d8254cfaa65a64f9c0b861eeb0fa99a7f2328fa0522f'}
            and config.get('baseConfig')=={'path':'docs/hanja-source-raw-compare-u8438-k-2026-10-24/config.json','SHA256':'e7b8a94c5bad5cf771a6f142a19c4014107a9ed707a4f4943b079ffaf7cb9f2f'}
            and base.get('glyph')=='萸' and base.get('catalogStrokes')==13
            and base.get('sourceRoots')=={"selected":{"root":"u8438-k","file":"docs/hanja-goal-glyphwiki-batch781-2026-10-13/engine-whole-u8438-k.json","fileSHA256":"83fe67507b40f4ae74c76c543c97724ad608f3b32db09e3d631a02cb3f64bc37","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8438-k","sourceProofFile":"engine-whole-u8438-k.json","sourceProofFileSha256":"83fe67507b40f4ae74c76c543c97724ad608f3b32db09e3d631a02cb3f64bc37"},"rawGroups":14,"drawingCalls":15,"polygonCounts":[2,2,2,2,3,1,2,1,2,1,1,4,2,2],"polygons":27}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[4],[3],[5],[6],[7],[14],[10,9],[11],[8],[12],[13]]}
            and base.get('domestic',{}).get('clips')==13
            and base.get('domestic',{}).get('sha256')=='b5bb4dcf25d744e91f0d77be849502bd3e16f07e1e7e2dcf960180ce0fa1d8c1'
            and digest(fixed_path('docs/hanja-source-original-u8438-k-2026-10-24/fixtures.json').read_bytes())=='0c329d676ac1615a5c313b6afa89590b591ab5e034883e0370b2b5d0eee27b6a'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u9ad3_hkcs_draft_launcher(config,base):
    # Authored HK provider is retained; raw19 type0 stays unassigned, never a pen.
    selected = base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':'300c8273f88a6cb60358b33aef0f3b07f249a8759dcb7f8672a435b10e959620'}
            and config.get('baseConfig')=={'path':'docs/hanja-source-raw-compare-u9ad3-hkcs-2026-10-24/config.json','SHA256':'f21a9fca0d46748bfc9feb80e6a29cd8f9574c7e788c5aa540b8c218210ba751'}
            and base.get('glyph')=='髓' and base.get('catalogStrokes')==23
            and base.get('sourceRoots')=={"selected":{"root":"hkcs_m9ad3","file":"docs/hanja-actual-engine-capture-u9ad3-hkcs-2026-10-24/engine-whole-u9ad3-hkcs.json","fileSHA256":"d3de8246042950a06f0479b278b3c23842a733849d1f890702ad6f82e8fdd644","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"hkcs_m9ad3","sourceProofFile":"engine-whole-u9ad3-hkcs.json","sourceProofFileSha256":"d3de8246042950a06f0479b278b3c23842a733849d1f890702ad6f82e8fdd644"},"rawGroups":30,"drawingCalls":31,"polygonCounts":[1,1,2,1,1,2,1,2,1,1,5,1,1,2,3,2,1,2,0,1,1,5,1,1,2,2,1,2,3,2],"polygons":51}}
            and config.get('provisionalGroups')=={"selected":[[1],[2,3],[5],[4],[6],[7,8],[9],[10,11],[12],[13],[14],[15],[16],[17],[18],[20],[21,22],[23],[24],[25],[26],[27,28],[29,30]]}
            and base.get('domestic',{}).get('clips')==23
            and base.get('domestic',{}).get('sha256')=='2db8529bdf015e14c41d577adff4d165760ad9b84a92f0e6487034b049a6035a'
            and digest(fixed_path('docs/hanja-source-original-u9ad3-hkcs-2026-10-24/fixtures.json').read_bytes())=='7fdbb4c5403f12809c8f08161235f6a9e54b3c0ad3226ebb2667f3f79ee0773a'
            and base.get('inputSHA256',{}).get('docs/hanja-actual-engine-capture-u9ad3-hkcs-2026-10-24/capture.json')=='3ddcd9d9ad156fa253186a5f2d3ac8c729d83121c8517fda7a13faf4a0da1792'
            and base.get('inputSHA256',{}).get('docs/hanja-source-alternative-u9ad3-hkcs-2026-10-24/sources.json')=='4807c804675ba1627f6aaaf34b7240e4da43c1ac5150085d2f283a987c5bdc8d'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def exact_u7626_hkcs_dictionary_draft_launcher(config,base):
    # Only this pinned provider/source may render15 dictionary rows while catalog14 stays unchanged.
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':'bf99f0a60fdc725c2e52a02384c17acb9bb2ad02d3511dd2a3838187ca102f1b'}
            and config.get('baseConfig')=={'path':'docs/hanja-source-raw-compare-u7626-hkcs-2026-10-24/config.json','SHA256':'1f896ff364811708b36aeb73c116a5efe3a9371881d2a6fcc7e119ab3aa18f69'}
            and base.get('glyph')=='瘦' and base.get('catalogStrokes')==14 and base.get('dictionaryPlaybackStrokes')==15
            and base.get('sourceRoots')=={"selected":{"root":"hkcs_m7626","file":"docs/hanja-actual-engine-capture-u7626-hkcs-2026-10-24/engine-whole-u7626-hkcs.json","fileSHA256":"8fc24300a67ccd8ad2836ce31218aff2fe624751a641c11b37d674b79f761ff6","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"hkcs_m7626","sourceProofFile":"engine-whole-u7626-hkcs.json","sourceProofFileSha256":"8fc24300a67ccd8ad2836ce31218aff2fe624751a641c11b37d674b79f761ff6"},"rawGroups":17,"drawingCalls":18,"polygonCounts":[2,2,3,2,3,3,1,2,2,1,2,1,1,2,1,2,2],"polygons":32}}
            and config.get('provisionalGroups')=={"selected":[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17]]}
            and base.get('domestic')=={"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7626.svg","status":200,"bytes":7181,"sha256":"5b34d06b90fe5c959a3afe2d5dd94487f9c34f6f68d088c29fef6ebfc8b11b39","clips":15,"glyph":"瘦","privateMediaSaved":False}
            and base.get('inputSHA256',{}).get('docs/hanja-actual-engine-capture-u7626-hkcs-2026-10-24/capture.json')=='d705ed14d3f26d63e3016e1559ae40f4f686f702c806465adb1286fc77d20dbd'
            and base.get('inputSHA256',{}).get('docs/hanja-source-alternative-u7626-hkcs-2026-10-24/sources.json')=='bce4db95c7b8c248edc8de507f8c379bf5bc5bc157f44351e6124560fd7af8c4'
            and digest(fixed_path('docs/hanja-source-original-u7626-hkcs-2026-10-24/fixtures.json').read_bytes())=='e4a3b4f84ff5172b88114abe41770a1048a48fb78b20e3c7a7eca30bb00e2772'
            and base.get('launcherSHA256')==config['launcher']['SHA256'])

def main():
    require(__debug__ and sys.flags.optimize == 0, 'optimized execution forbidden')
    parser = argparse.ArgumentParser(description='Pinned provisional static board; ROOT starts HTTP.')
    parser.add_argument('--config', required=True)
    parser.add_argument('--config-sha', required=True)
    parser.add_argument('--port', type=int, default=0)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    require(0 <= args.port <= 65535, 'port range')
    config_path = fixed_path(args.config)
    raw = config_path.read_bytes()
    require(len(raw) <= 65536 and digest(raw) == args.config_sha, 'board config SHA changed')
    config = json.loads(raw)
    board_fields = {'schema', 'baseConfig', 'launcher', 'sharedServe', 'wrapper', 'provisionalGroups', 'nativeApproval', 'runtimeApplied'}
    if config.get('baseConfig') == {'path':'docs/hanja-source-raw-compare-u85a9-t-2026-10-24/config.json','SHA256':'7d228ffe8c0ec6adef8389933590cb515568c3a23a92acdb7af2a001b00b2db8'} and config.get('draftState') == {'status':'DRAFT-parts-comparison-only','productionImportAllowed':False,'sourceStaticMappingApproved':False,'unresolvedPens':[2,4,8,13],'stroke8':'official short V versus original down-right Q; unresolved','stroke13':'original initial V plus Q; unresolved','strokes2and4':'original slanted lines retained; unresolved'}:
        board_fields.add('draftState')
    require(set(config) == board_fields, 'exact board fields required')
    require(config['schema'] == 'hanja-provisional-static-board/v1' and config['nativeApproval'] is False and config['runtimeApplied'] is False, 'unapproved static board only')
    legacy_launcher = config['launcher'] == {'path': LAUNCHER, 'SHA256': LAUNCHER_SHA}
    require(config['wrapper']['path'] == str(Path(__file__).resolve().relative_to(ROOT)), 'fixed board wrapper')
    base_path = fixed_path(config['baseConfig']['path'])
    base = json.loads(base_path.read_bytes())
    dictionary_u7626 = exact_u7626_hkcs_dictionary_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or dictionary_u7626
    legacy_launcher = legacy_launcher or exact_u7e2d_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u7e91_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u7e9a_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u8646_k_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u9004_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u9088_k_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u8596_ue0100_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u8407_ue0102_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u9ae7_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u66c1_ue0102_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u7006_prepared_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u85a9_t_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u9f08_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u8438_k_dictionary_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u9ad3_hkcs_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u64c4_k_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u77a5_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u85a9_hkcs_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u84d1_hkcs_draft_launcher(config,base)
    legacy_launcher = legacy_launcher or exact_u704c_ue0102_prepared_launcher(config,base)
    require(legacy_launcher or exact_u727c_new_launcher(config,base) or exact_u6705_prepared_launcher(config,base) or exact_u7c67_prepared_launcher(config,base) or exact_u7d8c_prepared_launcher(config,base) or exact_u8627_vs2_prepared_launcher(config,base) or exact_u83f0_k_prepared_launcher(config,base) or exact_u6fbe_k_prepared_launcher(config,base) or exact_u6f5d_prepared_launcher(config,base) or exact_u6f5a_prepared_launcher(config,base) or exact_u99fe_prepared_launcher(config,base) or exact_u7049_prepared_launcher(config,base) or exact_u95e5_prepared_launcher(config,base) or exact_u852d_k_prepared_launcher(config,base) or exact_u8aed_k_prepared_launcher(config,base) or exact_u9d25_prepared_launcher(config,base) or exact_u6d8f_prepared_launcher(config,base) or exact_u8fe8_prepared_launcher(config,base) or exact_u6f11_prepared_launcher(config,base) or exact_u6f7e_prepared_launcher(config,base) or exact_u7e81_prepared_launcher(config,base) or exact_u9436_prepared_launcher(config,base), 'original launcher or exact pinned 牼 launcher required')
    require(config['sharedServe'] == base['sharedServe'], 'same original shared renderer')
    if dictionary_u7626:base = {**base,'catalogStrokes':15}  # review-view copy only; pinned source config remains14
    validate_groups(config['provisionalGroups'], base)

    def board_guards():
        require(digest(config_path.read_bytes()) == args.config_sha, 'board config changed')
        for entry in [config['baseConfig'], config['launcher'], config['sharedServe'], config['wrapper']]:
            require(set(entry) == {'path', 'SHA256'} and digest(fixed_path(entry['path']).read_bytes()) == entry['SHA256'], 'board input changed')

    board_guards()
    spec = importlib.util.spec_from_file_location('hanja_static_parameter_launcher', fixed_path(LAUNCHER))
    launcher = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(launcher)
    # Retain the module the original launcher creates; its validation, guards,
    # SVG functions and main remain original. No source/XML function is copied.
    captured = []
    original_factory = importlib.util.module_from_spec
    def retain_module(module_spec):
        module = original_factory(module_spec)
        if module_spec.name == 'hanja_static_raw_shared':
            captured.append(module)
        return module
    old_argv = sys.argv
    try:
        importlib.util.module_from_spec = retain_module
        sys.argv = [str(fixed_path(LAUNCHER)), '--config', config['baseConfig']['path'], '--config-sha', config['baseConfig']['SHA256'], '--check-only']
        launcher.main()
    finally:
        importlib.util.module_from_spec = original_factory
        sys.argv = old_argv
    require(len(captured) == 1, 'one original shared module required')
    shared = captured[0]
    original_page, grouped_svg = install_board(shared, base, config['provisionalGroups'], board_guards)
    if args.check_only:
        sources = shared.load_sources()
        domestic = {'viewBox': '0 0 1024 1152', 'transform': '', 'strokes': [{'d': 'M' + str(i) + ' 0 L' + str(i) + ' 1 Z'} for i in range(base['catalogStrokes'])]}
        selected = shared.selection('/board', '')
        board = shared.page('/board', selected, sources, domestic)
        require(board.count('data-domestic="') == base['catalogStrokes'], 'board domestic count')
        require(board.count('data-unassigned-raw="') == len(sources[base['defaultSource']]['groups']) - len({i for a in config['provisionalGroups'][base['defaultSource']] if a is not None for i in a}), 'unassigned raw count')
        require(shared.page('/whole', None, sources, domestic) == original_page('/whole', None, sources, domestic), 'original whole page changed')
        for label, proof in sources.items():
            for index in range(1, len(proof['groups']) + 1):
                require(grouped_svg(proof, [index]) == shared.source_svg(proof, index), 'original single SVG bytes changed')
        negative = 0
        for bad in [{}, {**config['provisionalGroups'], 'unknown': []}, {k: [] for k in config['provisionalGroups']}]:
            try:
                validate_groups(bad, base)
            except ValueError:
                negative += 1
        for row in [[0], [True], [base['sourceRoots'][base['defaultSource']]['rawGroups'] + 1], [1, 1], []]:
            bad = copy.deepcopy(config['provisionalGroups'])
            bad[base['defaultSource']][0] = row
            try:
                validate_groups(bad, base)
            except ValueError:
                negative += 1
        require(negative == 8, 'meaningful board negative checks')
        require(shared.FETCH_COUNT == 0, 'check-only must not fetch private media')
        print(json.dumps({'boardCheck': 'PASS', 'negative': negative, 'singleSVGByteParity': sum(len(p['groups']) for p in sources.values()), 'domesticRows': base['catalogStrokes'], 'HTTP': 0, 'server': 0, 'sourceCompiler': 0, 'engine': 0, 'projection': 0, 'nativeApproval': False}))
        return
    try:
        sys.argv = [shared.__file__, '--port', str(args.port)]
        shared.main()
    finally:
        sys.argv = old_argv


if __name__ == '__main__':
    main()
