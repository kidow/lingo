# 漑 고정 원본 조사 — batch1120

2026-10-14. 1급 배정 14획, 사전 현재 14클립. **Source-only; native/runtime 승인 없음.**

- 고정 GlyphWiki archive 전체 자형 14개, 원본 dependency 29개, 명시 @history 1개를 확보했습니다.
- `verify-source.mjs`는 네 후보가 공유하는 capture69578 RAM 과정에서 원본 archive·8개 엔진 SHA·모든 전체 자형의 원본 polygon/trajectory·사전 title/clips/bytes/SHA를 실제 검증했습니다. 다른 담당자의 실행 결과를 `candidate-compile-analysis.json`에 기록했습니다.
- 사전 SVG는 RAM에서 메타데이터만 읽었습니다. 사전 그림·스크린샷은 이 폴더에 저장하지 않았습니다.
- `progressive.mjs`는 고정 root/file/byte SHA, 전체 proof, raw coverage를 확인한 뒤 의도적으로 차단합니다. 원본 좌표·폭·방향·경로 변경, 연결선 추가, 다른 whole 합성, 비연속 enclosure 접합을 하지 않습니다.
- 컴파일 검사는 입력 불변, 6종 변조 거부, 5종 identity 거부를 실제 확인했습니다. 출력된 animation pen/mask/frame는 0입니다.

기존 Tomoe batch18의 14획 전체 검토에서 물수변 첫 down→up 이동이 없고5–8순서가 달라 보류했습니다. 새14whole의 연속 exact 묶음은15–16이고 물수변 raw2→3 간격이33.7957–34.1797입니다. VS6/var001의 graph matching lower bound14는 비연속 접점을 사용한 하한일 뿐 국내14획 후보의 승인이 아닙니다. 이 간격을 새 경로로 연결하지 않습니다.

원본 provenance와 전체 자형별 수치는 `sources.json`, `source-analysis.json`, `source-join-analysis.json`에 있습니다. 다음 단계는 국내 전체형·획 경계를 브라우저에서 대조하거나, 해당 차이를 해결하는 출처를 찾는 것입니다.
