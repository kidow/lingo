# 綎 ROOT 원 raw 정적 대응 기록

ROOT가 국내13획과 고정 base17raw의 전체 single을 직접 대조했습니다. 아래 대응은 **정적 윤곽 대응 후보**이며 방향·시간·합획·진행 애니메이션·native/runtime 승인으로 확대하지 않습니다. 원851 `sourceGroups=[]`, base 최소14>13 및 K/var001 최소15>13 HOLD와 NOTICE는 그대로입니다.

## 고정 출처

- 비교 helper: `docs/hanja-source-raw-compare-u7d8e-2026-10-21/`
- 선택 base: `docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json`, SHA256 `e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25`
- base는 기존 actualfull5/id3이며 engine-proof.json과 원 바이트가 같습니다. body canonical SHA256 `9c0141929c3b4960056910eee8bdbadf777454a40ba2989f5c10d9129e17df83`.
- base17raw/17calls/35polygon, K18raw/18calls/39polygon, var00118raw/18calls/38polygon입니다. 각 root의 원 full5 identity는 review.json에 따로 고정했습니다. header 결합·다른 root의 본문 이식·기하 실행은 없습니다.
- 국내 URL은 원 대소문자 그대로 `http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D8E.svg`, 6853bytes, SHA256 `bac035241f678de2858085183d7b70052840313c5e0315f74ebac4beba0020a9`입니다. 미디어 저장은 없습니다.

## 실제 관찰 범위

화면 518×766, SVG 선언520입니다. 흰 가장자리만 잘렸고 실제 윤곽 잉크는 모두 보였다는 ROOT 관찰입니다. 전체 SVG520 viewport가 잘리지 않았다고 주장하지 않습니다.

| 대조 | 화면 수 |
| --- | ---: |
| 국내/base/K/var001 whole | 4 |
| 국내1..13 single + base raw1..17 single | 30 |
| 국내1/raw2, 국내2/raw4, 국내13/raw17 prefix 각 좌우 | 6 |
| 합계 | 40 |

K/var001의 별도 reverse-sweep 형상을 whole에서 육안 대조하여 base를 선택했습니다. 대체 root의 single은 관찰하지 않았고 서로 혼합하지 않습니다. whole 비교는 시간·필순 검증이 아닙니다.

원 번호 1-based 정적 대응 후보:

```json
[[1,2],[3,4],[5],[6],[7],[8],[17],[14],[15],[16],[9,10],[11,12],[13]]
```

국내1/2는 각각 raw1+2, raw3+4를 single로 나누어 보고 해당 prefix도 확인했습니다. 국내3..6은 raw5..8입니다. 국내7 상단 Q→raw17, 8 H→raw14, 9 V→raw15, 10 H→raw16을 각각 대조했습니다. 국내11은 raw9 H와 raw10 내림 L, 국내12는 raw11 H와 raw12 Q를 각각 관찰했고 국내13은 raw13 긴 Q에 대응했습니다. 번호가 연속하지 않은 부분의 재배치는 정적 대응 후보이며 source 배열을 작성하거나 새 연결선을 그리지 않았습니다.

각 raw1..17은 후보 배열에서 정확히 한 번 나타납니다. 이것은 번호 누락·중복의 확인일 뿐 합획·방향·순서의 시간적 정당성을 증명하지 않습니다. fresh 방향·temporal·애니메이션 관찰은 0입니다.

## 서버 종료와 보존

ROOT 서버 PID53457 / port59412 / session65127은 SIGINT exit130으로 종료했습니다. serve.py 129행의 짧은 traceback이 있었고 ROOT가 PID 부재를 확인했습니다. tab62는 보존되어 있으며 탭을 닫았다고 기록하지 않습니다.

원 source/HOLD/NOTICE/최소획수 판단은 불변입니다. 신규 source adapter·projection·compiler·factory·engine·geometry 실행은 0이며 실제 APP/controller/storage 및 runtime 승인은 false입니다.

## 작성 검증

새 두 문서의 JSON·README digest·정적 배열 raw exact-once·입력 24개 SHA 정합성만 최초 1회 검사합니다. 기존 helper 검사·HTTP·수학·source 검사를 반복하지 않으며 작성자의 UI/server/Git/build 실행은 0입니다.
