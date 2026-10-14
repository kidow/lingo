# 褐 고정 원본 조사 — batch1119

2026-10-14. 1급 배정 14획, 사전 현재 13클립. **Source-only; native/runtime 승인 없음.**

- 고정 GlyphWiki archive 전체 자형 13개, 원본 dependency 24개, 명시 @history 3개를 확보했습니다.
- `verify-source.mjs`는 네 후보가 공유하는 capture69578 RAM 과정에서 원본 archive·8개 엔진 SHA·모든 전체 자형의 원본 polygon/trajectory·사전 title/clips/bytes/SHA를 실제 검증했습니다. 다른 담당자의 실행 결과를 `candidate-compile-analysis.json`에 기록했습니다.
- 사전 SVG는 RAM에서 메타데이터만 읽었습니다. 사전 그림·스크린샷은 이 폴더에 저장하지 않았습니다.
- `progressive.mjs`는 고정 root/file/byte SHA, 전체 proof, raw coverage를 확인한 뒤 의도적으로 차단합니다. 원본 좌표·폭·방향·경로 변경, 연결선 추가, 다른 whole 합성, 비연속 enclosure 접합을 하지 않습니다.
- 컴파일 검사는 입력 불변, 6종 변조 거부, 5종 identity 거부를 실제 확인했습니다. 출력된 animation pen/mask/frame는 0입니다.

기존 Tomoe batch19와 KanjiVG variant batch13에서 사전 전체 13획·자형을 검토하고 첫 획 junction 및 아래 갈고리 차이로 보류했습니다. 새 원본에도 배정14/사전13 불일치가 있어, 원본13을14로 만들거나 배정 획수를 임의 변경하지 않습니다. 기본 source 연속 exact 묶음은13, k 등은14이며 자형 귀속은 아직 새 native 검토 전입니다.

원본 provenance와 전체 자형별 수치는 `sources.json`, `source-analysis.json`, `source-join-analysis.json`에 있습니다. 다음 단계는 국내 전체형·획 경계를 브라우저에서 대조하거나, 해당 차이를 해결하는 출처를 찾는 것입니다.
