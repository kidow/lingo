# 陔 ROOT 원 raw 정적 대응 기록

ROOT가 국내9획과 고정 base11raw의 whole·전체 single·두 prefix를 대조한 기록입니다. **정적 윤곽 대응 후보**만 남기며 방향·시간·합획·진행 애니메이션·native/APP/runtime 승인은 false입니다. 원1007 sourceGroups=[] 및 최소10>국내9 HOLD는 불변입니다.

## 고정 출처

- helper: `docs/hanja-source-raw-compare-u9654-2026-10-21/`
- 선택 base actualfull5: `docs/hanja-goal-glyphwiki-batch1007-2026-10-13/engine-whole-u9654.json`
- 파일 SHA256: `c9c59133365d33fdbe9c6cb6d58963c100db5cf91be234c9b3df4f1e7e7ea169`
- 원11raw/12calls/25polygon, defaults·engineHashes·engineRevision·groups·trace 5키와 root/file/SHA identity3를 유지합니다. 다른 root의 header/body 혼합은 없습니다.
- 국내 원 URL: `http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/9654.svg`, 4653bytes, SHA256 `fdf3bae2f3def045766346792d9f6b0fff50cdd72269566a49f88b2b7b94590f`. startup RAM1회이며 미디어 저장0입니다. 원 NOTICE.md는 존재하지 않아 추가하지 않았습니다.

## ROOT 관찰

whole2 + 국내1..9 single9 + base raw1..11 single11 + prefix4 = 유효26화면입니다. 중간 이동 중 국내whole 같은 case를 다시 본 1장은 중복으로 제외했습니다. 국내prefix1/rawprefix2와 국내prefix6/rawprefix8을 각각 좌우2장씩 관찰했습니다. 단획과 누적에서 같은 구성으로 보였고 원 font 윤곽 차이가 있다는 ROOT 관찰이며, 시간적 진행을 검증한 것은 아닙니다.

1-based 정적 대응 후보:

```json
[[1,2],[3],[4],[5],[6],[7,8],[9],[10],[11]]
```

국내1은 raw1 H+raw2 좌하, 국내2는 raw3 곡선 hook, 국내3은 raw4 V, 국내4는 raw5 짧은 V, 국내5는 raw6 H입니다. 국내6은 raw7 좌하 Q와 raw8 우하 Q를 각각 대조한 두 조각 후보입니다. 국내7/8은 raw9/10의 긴 좌하, 국내9는 raw11 우하 Q입니다. 모든 raw1..11은 후보에서 정확히 한 번 나타납니다. 번호 완전성만 확인하며 합획·시간·방향 승인으로 확대하지 않습니다.

## 기존 최소10과 새로운 독립 mask 후보의 차이

기존 source-join-analysis의 최소10은 원 endpoint가 정확히 같은 raw1→2만 연결한 directed path-cover 결과입니다. raw7→8은 그 조건에 들지 않습니다.

- raw7 원 `cdDrawCurve(126,50,117,68,100,86,0,7)`: 끝 (100,86), 원polygon3개.
- raw8 원 `cdDrawCurve(78,72,100,82,112,103,7,8)`: 시작 (78,72), 원polygon2개.
- 다음 시작−이전 끝 = [-22,-14], 거리²=680, 거리=2√170≈26.076809620810597. /2 표시 좌표로는 [-11,-7], 거리√170≈13.038404810405298입니다.

따라서 원두Q를 하나의 연속 guide로 붙이거나 endpoint를 강제하면 원자료 계약을 바꿉니다. 원Q·flags·outline·폭·weight를 그대로 보존한 **독립2mask를 같은 논리 후보 국내6에 배치**하는 별도 source-bound 검토는 가능합니다. 기존 exactjoin guard는 유지하며 connector는 만들지 않습니다. 실제 source 투영/adapter는 아직0이므로 산출 counts나 표시 weight를 확정하지 않습니다. 원 raw3의 terminal514도 미교정·미검토 위험으로 남습니다.

고정 국내 XML은 startup RAM 전용입니다. 이번 작성자는 clip6의 원 d/시간값을 별도 취득하거나 재해석하지 않았습니다. ROOT의 single/prefix 정적 대응이 근거이며, 국내6의 clip이 어느 점에서 어떤 시간 방향으로 진행하는지는 새 증거가 필요합니다. P 전체 연결성·새 mask 활성화·완료 coverage·꼬리·native 진행은 미승인입니다.

## 실행·종료

ROOT 서버 PID42673 / port59412 / session5356은 SIGINT exit130으로 종료했고 ps에서 PID 부재를 확인했습니다. 종료 시 짧은 traceback6줄(128tokens)이 있었습니다. 최초 sandbox startup DNS 실패로 HTTP를 확보하지 못한 뒤 escalated startup1이 성공했고 국내 RAM fetch1이 실행됐습니다. warn/error limit10 결과는 []였습니다. 이를 전 생애 로그 무오류 주장으로 확대하지 않습니다.

작성자의 HTTP/서버/UI/Git/build 및 source compiler/factory/engine/projection/geometry 실행은 0입니다. 새 두 문서의 JSON·README digest·static raw exact-once·입력13핀 정합성만 최초1회 확인합니다. 기존 검사와 원소스 실행은 반복하지 않습니다.
