# 濩 기존 원자료 참조와 남은 바인딩 범위

원자료는 `docs/hanja-goal-glyphwiki-batch384-2026-10-09/engine-proof.json`의 body4와 같은 폴더의 `draw-trace.json`으로 따로 보존한다. 이 메모는 두 자료를 결합하거나 새 투영·fixture·schema를 만들지 않는다.

- body4 SHA256: `c735b73d6b1b0af983a97a08511607649103f9425cc37b4ad7298617d943dfef`
- 별도 trace SHA256: `aeca40406ce9500179b41b168e54bc6e4953f8e9375c9248ea4fd0a8259dc868`
- 기존 원형/누적 기록: 같은 폴더 `review.json`, SHA256 `0a8438a27b47064a23935b88513f2e1206f398097e2a7ce23a102615df837ce5`
- 기존 순서 자료: 같은 폴더 `serve.py`, SHA256 `6b114f85a3ffb60b5a2d9facb6488552d3fa297250b618a16dbdcc2a72cc95d1`

기존 review는 패널63에서 국내17획의 누적 상태와 완성형을 대조했다고 기록한다. 이 사실은 모든 개별 획의 시간 방향이나 공개 원본 재생을 승인한 것으로 확대하지 않는다. 전체 recipe는 기존 serve의 명시값을 참조하며, 새로 추정하거나 재작성하지 않았다.

trace의 실제 call 목록은19개 raw에19호출·35개 원P를 보존한다. 물3의 두 원곡선 외에는 원직선과 원곡선이 기존 recipe에 명시되어 있다. 또 기존16획에 배정된 가로 call의 끝과 다음 곡선 call의 시작은 원좌표 `(165.925,138.125)`로 같다. 이 값의 일치는 source endpoint 사실이며 시각적 연결·재생 승인이 아니다. 물3의 원guide 끝 `(37.2,184)`와 다음 시작 `(33.4,150)`의 간격은 그대로 남긴다.

최근 물3 원문 세 프레임의 방향 근거는 `docs/hanja-official-media-compare-u6fe9-2026-10-25/water3-temporal-native-review.json`에 별도로 있다. 기존 성공 관찰을 재생하지 않았다.

기존 `lib/hanja-stroke-source-foot-u6fe9-ue0102.ts`의 `makeReviewedU6fe9Ue0102FootSourceContext(body4,trace,identity,outlines)`는4인자 API다. 원body4·별도trace·identity를 엄격히 확인하지만 outlines는17획·19마스크의 개수와 물3의 두 원segment만 확인한다. 따라서 이 API의 성공을 나머지 전체 outlines의 정확한 바인딩 완료로 취급하지 않는다.

전체 source capsule 조립은 자동 승인 검토 차단 후 보류했다. 새 whole binder·투영 산출물·공개 등록은 없다. 나머지 원본과 기존 관찰의 참조 사실만 보존하며, 전체 outlines 바인딩과 실제 초기·전환·완료·자연 재생은 후속 작업으로 남긴다. 원P·guide·폭·가중치를 바꾸거나 full5를 합성하지 않는다.
