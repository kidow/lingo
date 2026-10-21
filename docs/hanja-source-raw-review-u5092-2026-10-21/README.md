# 傒 ROOT 원 raw 정적 대응 기록

ROOT가 국내12획과 고정 base14raw의 whole·모든 single·두 prefix를 직접 대조한 기록입니다. **정적 윤곽 구성 대응 후보**만 기록하며 방향·시간·애니메이션·합획/join·native/APP/runtime 승인은 false입니다. 원1021 최소14>국내12 HOLD/sourceGroups=[] 및 기존 false·NOTICE는 불변입니다.

## 고정 출처

- helper: `docs/hanja-source-raw-compare-u5092-2026-10-21/`
- 선택 actualfull5: `docs/hanja-goal-glyphwiki-batch1021-2026-10-13/engine-proof.json`, SHA256 `4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d`
- 같은 선택 body3: `engine-whole-u5092.json`, SHA256 `6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e`. defaults/groups/trace가 full5와 정확히 같습니다. 다른 root header/body 혼합은 없습니다.
- 원14raw/14calls/35polygon. full5의 defaults·engineHashes·engineRevision·groups·trace와 root/file/SHA identity3를 고정합니다.
- 국내: `http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5092.svg`, 6159bytes, SHA256 `62fca9865335de4abdb2fc3a39d4b5a9ed707091f67588f30394b5a88349551d`. 미디어 저장0이며 원 XML root 속성은 helper startup RAM parser가 직접 읽습니다.

## ROOT 유효 관찰 32화면

| 범위 | 화면 |
| --- | ---: |
| 국내/base whole | 2 |
| 국내1..12 single | 12 |
| base raw1..14 single | 14 |
| 국내prefix7/rawprefix8, 국내prefix8/rawprefix10 각 좌우2 | 4 |
| 합계 | 32 |

모두 SVG520 유효 관찰이며 제외·누락은 없습니다. 폰트 형상 차이는 있으나 각 단획과 해당 누적의 구성이 대응했다는 ROOT 관찰입니다. 원본을 움직여 그리는 방향·시간을 확인한 것은 아닙니다.

원 번호 1-based 정적 대응 후보:

```json
[[1],[2],[3],[4],[5],[6],[7,8],[9,10],[11],[12],[13],[14]]
```

국내1..6은 raw1..6, 국내7은 중앙 위 짧은 좌하와 우하 raw7/8, 국내8은 아래 좌하와 아래 긴 가로형 raw9/10입니다. 국내9..12는 raw11..14입니다. raw10의 가로형 외관은 원 primitive를 H/L로 판정하는 근거가 아닙니다. 실제 원 kind는 Q(`cdDrawCurve`)이며 그대로 보존해야 합니다. 모든 raw1..14는 후보에서 정확히 한 번 나타납니다. 이는 번호 완전성 확인일 뿐 합획·temporal 승인으로 확대하지 않습니다.

## 기존 최소14와 독립 mask 검토

기존 최소14는 exact endpoint join이0개인 원계약 결과로 그대로 유효합니다. 새 후보의 두 쌍도 endpoint가 다릅니다.

| 원 쌍 | 이전 끝→다음 시작 | 실제 JS gap | 표시 gap(÷2) |
| --- | --- | --- | --- |
| raw7→8 | (101.96,88)→(86.12,80) | [-15.83999999999999,-8] | [-7.919999999999995,-4] |
| raw9→10 | (111.86,114)→(78.2,120) | [-33.66,6] | [-16.83,3] |

원Q7 `[123.74,60,113.84,72,101.96,88,0,7]`, Q8 `[86.12,80,101.96,86,111.86,100,7,8]`, Q9 `[153.44,70,133.64,92,111.86,114,0,7]`, Q10 `[78.2,120,129.68,116,171.26,110,0,7]`의 canonical 숫자·flags·polygon을 바꾸지 않습니다. 두 mask의 guide를 붙이거나 endpoint를 강제하는 것은 허용되지 않습니다.

각 raw는 원1call이며 14개 raw별 mask를 독립 보존하고 두 쌍만 같은 논리7/8의 참조배열로 두는 별도 source-only 검토는 가능합니다. **예상12pens/14masks/35polygons**이며 실제 생성값은 아닙니다. 새 source/adapter/projection은0입니다. 원 compiled rawBaseline/fixture는 원폴더 파일목록에 없고 기존 compiler는 blocked 상태이므로, 후속 작성 시 별도 허용된 최초 원singleton projection이 필요합니다. 기존 guard를 느슨하게 하거나 blocked compiler를 실행하지 않습니다.

그때도 원P35·calls·flags와 singleton projection의 outline/guide/폭/weight 필드를 그대로 참조하고 connector0을 유지해야 합니다. 두 Q의 실제 활성화 cap·P 연결·전체 coverage·완료/재생·방향은 새 native 근거가 필요합니다. 다른 한자의 비슷한 gap FAIL을 이 후보의 실제 실패로 추정하지 않습니다.

## 실행·보존 범위

ROOT의 warn/error 수집 limit10 결과는 []입니다. 전체 console 생애 무오류를 주장하지 않습니다. ROOT 서버 PID71307 / port59412 / session62436은 SIGINT exit130으로 종료했고 traceback3줄(41tokens)이 있었으며 ps에서 PID 부재를 확인했습니다.

작성자 HTTP/브라우저/서버/Git/build·기하/source/compiler/factory/engine/projection 및 기존검사 실행은0입니다. 새 두 문서의 JSON·README digest·static raw exact-once·고정입력17핀 정합성만 최초1회 확인합니다.
