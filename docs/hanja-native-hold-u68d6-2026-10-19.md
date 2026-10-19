# 棖855 VQ10 시작 nib — native HOLD

- 날짜: 2026-10-19. Root의 fresh native 관찰을 기록합니다. 새 source/native/runtime 승인과 runtime 변경은 없습니다.
- 대상 source: `hanja-source-independent-vq-u68d6-source-experiment-2026-10-19/`, commit은 root 제공 축약 `efbc048…`만 보존하며 full commit은 추정하지 않습니다.
- 고정 preparation SHA256: `4d3623d374c0f6928a681d1e6637943ca7ea0c7439f8107ad91c1aa1bfa98620`. 공개 cached geometry SHA256: `fa3be0dbcd906119295020bea0caea8a4064925a8b85078a8cc71c0fee9f1e36` (12획·13마스크·25폴리곤).

## 실제 관찰과 중단

Root는 전체 자형1개 호환을 확인했습니다. FIRST boundary10에서 before/at/after를 대조하던 중, 경계 직후 실제 오른쪽 CANDIDATE의 두 번째 Q 마스크 시작에 약15px의 떨어진 양성 영역/nib가 갑자기 나타나 FAIL로 보류했습니다. 이전 세로와의 원래 gap은 유지됩니다. 경계 before/at 관찰을 전체 경계 PASS로 확대하지 않습니다.

fine·방향·coarse·자연재생은 모두 미실행입니다. 새 승인을 승계하지 않습니다. Root 보고 서버 PID93216 / port57461 / session12608은 STOPPED, wrapper 종료코드143입니다. 이 문서 작성자는 UI·서버를 실행하거나 종료하지 않았습니다.

## 고정 source와 정적 분석

- 원 root `u68d6`, 실제 full5 `../hanja-goal-glyphwiki-batch855-2026-10-13/engine-proof.json`, SHA256 `2a3bb543a2550bef3af1266485ad784e45cfcb63b24d05fa48d452ab7042b0b6`. 기존 id3 root/file/fileSHA256 및 필수progressive3/whole4 계약은 그대로입니다.
- 논리10은 원 raw9 V→raw10 Q 독립2mask입니다. V 끝 `[102.63,169]`, Q 시작 `[80.16,182]`, delta `[-22.47,13]`, raw gap `25.959601306645677`을 보존합니다. 새 연결선과 합성 궤적은 없습니다.
- 두 번째 Q는 원 `cdDrawCurve([80.16,182,115.47,170,151.85,153,0,7])`, 원3폴리곤입니다. guide `M40.08 91 Q57.735 85 75.925 76.5`, revealWidth14, weight38.666704, 경계 `0.45282994944832855`는 현재 source 그대로입니다.
- 공유 renderer `hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs` SHA256 `a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09`는 local p=0이면 현재 마스크를 표시하지 않고, 양수 curve 진행에는 같은 guide에 round linecap/dash를 사용합니다. 따라서 경계 직후 원래 시작부가 유한 면적으로 드러날 수 있다는 것은 코드상 가능한 설명입니다. 이 설명은 root의 픽셀 크기·실제 노출 폴리곤에 대한 DOM 진단을 대신하지 않습니다.

## 보정 근거와 다음 조건

기존 source candidate의 시작 head/nib 전용 분리 함수·guard 선례를 제한 검색했으나 재사용할 검증된 guard를 찾지 못했습니다. 기존997 UP guard는 마지막 Line의6/5, LEFT는 마지막 Q의14, terminal15 guard는15를 요구합니다. 이 Q의 terminal7은 이 조건들에 맞지 않습니다. 원 시작부 삼각형이 존재한다는 사실만으로 새 mask guide·direction·weight를 정할 수 없습니다.

source·원proof·원HOLD·NOTICE·cached geometry·guide·폭·좌표·모든 폴리곤을 변경하지 않습니다. width 조정, 임의 clip, 새 path/connector, 기존 terminal guard 확장은 하지 않았습니다. 원 후보의 native/runtime false도 보존합니다.

다음 단계에는 root가 실제 오른쪽 CANDIDATE의 해당 마스크 id/local progress/clip 및 노출 원폴리곤을 확인하고, 원 폴리곤만 사용하며 시작부 진행을 정당화하는 기존 검증 guard 또는 별도 명시적 정책 근거가 필요합니다. 근거 확보 전 HOLD를 유지합니다. 다른 gate는 fresh 전체 검토가 필요합니다.

이번 조사: sourcegeometry/compiler/engine/test 재실행0, UI/server/runtime/registry/Git/build0. 별도 HOLD 문서만 추가했습니다.
