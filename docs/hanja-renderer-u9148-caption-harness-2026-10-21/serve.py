#!/usr/bin/env python3
# 酈 caption-only launcher: original files and HERE remain frozen.
import sys
sys.dont_write_bytecode=True
import hashlib,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
SOURCE="docs/hanja-source-independent-vq-up-left-u9148-source-experiment-2026-10-19/serve.py"
EXPECTED_SOURCE_SHA="68421cfff205aa2cf228dd490acb8e7701d29ccab3ecac314d47c09f9e488d3b"
EXPECTED_PATCHED_SHA="8265a5f858fd13ce83e55b1d8b0024b658fa9651cd56666b29bac175e20ffc75"
OLD_CAPTION="<p>墍 첫UP source의 root whole1호환/fine[3,7,9,10,14]PASS와 fine11(99.99→100 오른旡하단UP약30px추가)FAIL을 그대로보존합니다. 방향/coarse/모든경계/자연재생은0입니다. 새후보는 기존7UP2mask를 그대로둔 채 logical11 raw12의 마지막L1006/5 quad만 기존997 UP 공식(width5.5/jump21/tailweight10.5)과 exact일치할때 분리합니다. bodyweight36.421068/bounds[68.7,39.45,90.7,65.8]/guide·폭·원좌표·41polygon/다른13획은 불변입니다. 14p17m41·새tail분리1/누적partition2·sourcegeometry·원compiler·engine0·새native/runtime미승인·전gatefresh필수입니다.</p>"
NEW_CAPTION="<p>酈 u9148 · 고정 원캐시22획/25mask/57polygon입니다. 원19 UP와21 LEFT의 완료 시 endpoint 추가 FAIL을 보존하며 새 분리 후보는 아직 native 미승인입니다. 19·21의 99.99%→100% 및 각 boundary1-before/at/after를 우선 비교합니다(19 경계0.7614893808966503,21 경계0.8924120569160016). 다른20획·모든 원outline/guide/폭/bodyweight/정책과 완료형은 그대로입니다. 새UP19 tail12.5·LEFT21 tail5는 원quad만 분리했습니다. body의 기존width14 fixed round cap으로 인한 0→epsilon 유한 시작 nib 위험은 해결하지 않았습니다. 이 helper는 설명만 교체하며 기하/JS/표시정책 변경0, 원검사/engine/factory/derive0, 새native/app/runtimefalse입니다.</p>"
def sha(raw):return hashlib.sha256(raw).hexdigest()
def prepared_source():
    meta=json.loads((HERE/'validation.json').read_bytes())
    for file,expected in meta['inputSHA256'].items():
        if sha((REPO/file).read_bytes())!=expected:raise ValueError('Frozen original input changed')
    for file,expected in meta['ownSHA256'].items():
        if sha((HERE/file).read_bytes())!=expected:raise ValueError('Caption harness changed')
    original=REPO/SOURCE
    raw=original.read_bytes()
    if sha(raw)!=EXPECTED_SOURCE_SHA:raise ValueError('Original server changed')
    source=raw.decode('utf-8')
    if source.count(OLD_CAPTION)!=1 or NEW_CAPTION in source:raise ValueError('Exact original caption mismatch')
    patched=source.replace(OLD_CAPTION,NEW_CAPTION,1)
    if patched.count(NEW_CAPTION)!=1 or patched.replace(NEW_CAPTION,OLD_CAPTION,1)!=source:raise ValueError('Caption-only inverse mismatch')
    if sha(patched.encode('utf-8'))!=EXPECTED_PATCHED_SHA:raise ValueError('Unexpected RAM source')
    return original,patched
def main():
    original,patched=prepared_source()
    namespace={'__name__':'__main__','__file__':str(original),'__package__':None}
    # Only the original server's normal startup guards run; no focused test or geometry compiler.
    exec(compile(patched,str(original),'exec'),namespace)
if __name__=='__main__':main()
