# 孶 VS2 ROOT 원 raw 정적 대응 기록

ROOT가 국내13 single 전체와 **VS2 raw18 single 전체**, 제한 prefix를 직접 대조했습니다. 선택은 VS2 고정 한 소스에 한정하며 아래 배열은 **정적 형태·누적 prefix 대응 후보**입니다. 방향·시간·합획·source 애니메이션·APP·runtime 승인은 모두 false입니다. 새 source8은 작성하지 않았고 원822 HOLD와 `sourceGroups=[]`는 바꾸지 않았습니다.

## 고정 출처

- helper: `docs/hanja-source-raw-compare-u5b76-2026-10-21/`
- 선택 VS2: `docs/hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json`
- 파일 SHA256: `21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0`
- identity3: `{"sourceRoot":"u5b76-ue0102","sourceProofFile":"engine-whole-u5b76-ue0102.json","sourceProofFileSha256":"21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0"}`
- VS2는 별도 **actualfull5/id3**,18raw/19calls/44polygon입니다. 원 proof keys는 defaults/engineHashes/engineRevision/groups/trace이며 전체 한 소스만 고정합니다. base header 이식이나 header/body/trace 혼합은 없습니다.
- 국내 원 URL: `http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B76.svg`, 7583bytes, SHA256 `3a294f24fe63360dbf7d540a79c3ac7c92b8c33b69b81ea98ce8933593f9af31`
- 국내 XML은 ROOT helper startup RAM1회로 읽었으며 디스크 미디어 저장은0입니다.

base는17raw/18calls/42polygon이며 raw1 가로가 양쪽 상단을 통합합니다. 국내 상단의 H1/V2/H3/V4와 대응하려면 base 원형을 분할해야 하므로 이번 소스로 선택하지 않았습니다. 이 기록에서 base의 선을 실제로 나누거나 새 기하를 만들지는 않았습니다.

VS0/VS1은 base와 파일 SHA가 같더라도 root/파일 identity는 별도입니다. ROOT의 VS0/VS1 직접 관찰은0이며 독립 기하 근거나 별도 native 승인으로 세지 않습니다.

## 관찰한 화면

| 범위 | 유효 화면 |
| --- | ---: |
| whole 국내/base/VS2 각1 | 3 |
| 국내 single1..13 | 13 |
| VS2 raw single1..18 | 18 |
| base raw single1..6 | 6 |
| 제한 prefix6쌍, 각 국내+VS2 | 12 |
| 합계 | 52 |

처음 base whole 아래가 잘린1장은 제외했습니다. 제외 화면을 유효 whole 증거나 geometry FAIL로 세지 않습니다. whole 관찰을 시간·필순 승인으로 해석하지 않습니다.

1-based 정적 대응 후보:

```json
[[1],[2],[3],[4],[5,6],[7,8],[9],[10,11],[12,13],[14],[15,16],[17],[18]]
```

각 VS2 raw1..18은 후보 배열에 정확히 한 번 나타납니다. 개수와 참조 중복이 없다는 사실이 합획·시간·방향의 승인을 대신하지 않습니다. 새 guide/connector/좌표/폭/weight 입력은0입니다.

관찰한 prefix는 국내5/VS2 raw6, 국내6/raw8, 국내8/raw11, 국내9/raw13, 국내11/raw16, 국내13/raw18입니다. 각 쌍은 국내와 VS2 각각1화면으로 총12화면이며 다른 prefix나 temporal 검토를 추가 주장하지 않습니다.

## 종료와 승인 경계

ROOT 서버 PID60757 / port59412 / session21124는 Ctrl-C(SIGINT) exit130, 짧은 traceback을 남기고 종료했으며 ps status1/PID 부재를 확인했습니다. 작성자는 서버·UI를 실행하지 않았습니다.

모든 관찰은 정적 형태·prefix 대응에 한정합니다. 원 HOLD/NOTICE/source/현재 registry 및 역사 false를 보존합니다. source projection/compiler/engine/기하 실행은0이며 source8 작성은 별도 승인을 기다립니다.

새 문서2의 JSON·README digest·raw exact-once와 필요한 입력 24핀만 메타1로 확인합니다. 기존 source/helper 테스트·HTTP·UI/server/Git/build/TSC는 반복하지 않습니다.
