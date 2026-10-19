# 粻830 VQ12 시작 nib — native HOLD

- 날짜: 2026-10-19. Root의 별도 fresh native 관찰이며 棖855의 proof나 승인과 결합하지 않습니다. 새 native/runtime 승인과 runtime 변경은 없습니다.
- 대상 source: `hanja-source-independent-vq-u7cbb-source-experiment-2026-10-19/`, root 제공 commit 축약 `7b62e086…`만 기록합니다.
- 고정 preparation SHA256: `e4146269022e8269661709022aacb4bbc502e1075b08257822230f1e7ec4b438`. 공개 cached geometry SHA256: `e892464c3b8f7075f7291d0927ac84edb30056308652f71c6e01789e1cbddcf7` (14획·15마스크·30폴리곤).

## 실제 관찰과 중단

Root는 전체 자형1개 호환을 확인했습니다. FIRST boundary12 before/at/after520 대조에서 실제 오른쪽 CANDIDATE의 두 번째 Q 마스크가 경계 직후 약15px의 떨어진 양성 영역으로 시작해 FAIL로 보류했습니다. 다른 fine·방향·coarse·경계·자연재생 gate는 미실행입니다. 경계 before/at 관찰을 전체 PASS로 확대하지 않습니다.

Root 보고 서버 PID96462 / port57691 / session39782는 STOPPED, wrapper 종료코드143입니다. 이 문서 작성자는 UI·서버를 실행하거나 종료하지 않았습니다.

## 독립된 full8 직접 계약과 정적 근거

- root `u7cbb`, 원 `../hanja-goal-glyphwiki-batch830-2026-10-13/engine-whole-u7cbb.json`, SHA256 `8546b3ac8bd9f17e4e3c7f28b6adb4618f24e648f51f7359c7883497d0c90a19`.
- 실제 proof exact8키는 `sourceRoot,sourceProofFile,sourceArchiveSHA256,engineRevision,engineHashes,groups,trace,defaults`입니다. 기존 id3 root/file/fileSHA256 및 strict 필수3/4의 full8 직접 계약을 유지하며 full5 투영·provenance 제거·가짜 header 추가를 하지 않습니다.
- 논리12는 원 raw11 V→raw12 Q 독립2mask입니다. V 끝 `[109,169]`, Q 시작 `[88,182]`, delta `[-21,13]`, raw gap `24.698178070456937`은 보존됩니다.
- 두 번째 mask는 terminal `[0,7]` Q의 원3폴리곤이고, guide `M44 91 Q60.5 85 77.5 76.5`, revealWidth14, weight36.503424입니다. 경계는 `0.4671299349941983`입니다. 원sourcefactory/geometry와metadata는 변경하지 않았습니다.
- 공유 renderer SHA256 `a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09`의 p=0 비표시/양수 curve round-cap 동작은 棖 사례와 같은 코드상 설명 후보입니다. 실제 두 실패 원인이 같다고 확정하지 않으며 별도 DOM·원폴리곤 확인이 필요합니다.

## HOLD 조건

terminal7 Q 시작부는 기존997 Line6/5 UP·Q14 LEFT 및 terminal15 분리 guard와 일치하지 않습니다. 시작 nib에 재사용할 검증된 별도 guard를 이번 제한 조사에서 찾지 못했습니다. 새 guide/weight/direction/clip·좌표·폭·path·connector를 발명하거나 tail guard를 확장하지 않습니다.

원 full8/provenance·모든 원폴리곤·cached geometry·원HOLD·NOTICE·source native/runtime false를 보존합니다. Root가 실제 오른쪽 candidate mask id/local progress와 처음 노출되는 원폴리곤을 확인하고, 원source에 고정되는 검증된 시작부 정책 근거를 확보하기 전 HOLD 유지입니다. 이후 모든 gate를 fresh 검토해야 합니다.

이번 조사: geometry/compiler/engine/test 재실행0, UI/server/runtime/registry/Git/build0. 별도 HOLD 문서만 추가했습니다.
