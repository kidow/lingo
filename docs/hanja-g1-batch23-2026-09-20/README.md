# 1급 洑·藉·蕉 3자 검토 — 3자·43획 반영

2026-09-20 · **3자 반영, 보류 없음** · 1급 1,038 → 1,041/1,145자

[1급 22차](../hanja-g1-batch22-2026-09-20/README.md)로 1급 큐를 비운 뒤,
[특급II 18차](../hanja-special2-batch18-2026-09-20/README.md)에서 AnimCJK의 같은 고정 리비전에 있는
`graphicsZhHant`·`graphicsZhHans` 두 파일을 후보에 넣었다. 그 결과 1급에도 세 글자가 들어왔다.

| 글자 | 획 | 후보 | 왜 이제 들어왔나 | 판정 |
| --- | ---: | --- | --- | --- |
| 洑 | 9 | ZhHans | MM·Ja·Ko에 없던 글자 | 일치 |
| 藉 | 18 | ZhHant | **대만 표준이 艹를 4획으로 그린다** | 1·2획 교환, 5획 역방향 |
| 蕉 | 16 | ZhHant | 같은 이유 | 1·2획 교환, 7획 반전 |

艹는 배정 자료와 e-hanja 사전이 모두 4획(十 둘)으로 세는데 MM·AnimCJK Ja는 3획으로 그린다.
이 차이 때문에 [특급II 큐 분류](../hanja-special2-queue-2026-09-20/README.md)에서 87자가 막혀 있었는데,
ZhHant는 4획으로 그려 藉·蕉가 조건을 그대로 충족했다.

## 보정

| 보정 대상 | 변경 |
| --- | --- |
| 藉·蕉 | 艹 왼쪽 十을 가로 다음 세로로 (1·2획 교환). 오른쪽 十은 양쪽 모두 이미 가로 다음 세로다 |
| 藉 | 耒의 첫 삐침(5획)을 오른쪽 위에서 왼쪽 아래로 역방향 |
| 蕉 | 隹의 오른쪽 위 짧은 획(7획)을 왼쪽 아래로 반전 |

藉의 5획은 사전이 오른쪽 위에서 왼쪽 아래로 긋고(색 구간의 끝이 왼쪽에 있다)
ZhHant 원본은 왼쪽에서 오른쪽으로 올려 긋는다. 같은 획을 반대로 그은 것이라 역방향으로 맞췄다.
1급 18차 嚮에서 皀의 두 획을 역방향으로 맞춘 것과 같은 처리다.

부수 유사성으로 승인하지 않았다. 세 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보정 2자는 변경 획뿐 아니라 전체 획을 재대조했다.

[direction-probe.mjs](direction-probe.mjs)가 60°를 넘는 획 6개(藉 1·2·5, 蕉 1·2·7)를 표시했고 모두 보정으로 이어졌다.
획 끝점 대응 검사도 같은 교환만 짚었다. 보정 뒤 43획을 다시 계산해 60°를 넘는 획이 없고,
45~60° 구간의 차이도 없다. 藉·蕉의 원문은 가로 이동 `translate(12, -y)`를 쓴다. 이동은 방향 벡터를 바꾸지 않는다.

## 남은 104자

[queue.mjs](queue.mjs)로 다섯 말뭉치 기준 1급 큐를 다시 계산한다([queue.json](queue.json)).
새로 들어오는 글자는 **0자**이고, 조건을 충족하는 16자는 모두 이전 회차에서 자형 차이로 보류한 글자다 —
瀆·疼·碌·贖·猜·揄·癒·諭·愉·睛·嗔·朕·讒·瘠·脊·凸.
이 열여섯은 새 말뭉치의 자형으로 다시 볼 여지가 있다. 예를 들어 睛은 靑의 아래를 円으로 쓰는 자형이 필요해 보류했는데
ZhHant에 그 자형이 있을 수 있다. 다만 그것은 **보류 재검토 회차**로 따로 다룬다 — 이번 회차는 새 후보만 다뤘다.
나머지 88자는 사전 출처나 후보 원본이 없어 큐에 들어오지 않는다.

## 근거와 재현

- [selection.json](selection.json): 세 글자를 고른 조건과 후보 말뭉치
- [observations.json](observations.json): 3자 판정, 2자의 첫 판정·보정·재대조 기록, 8방향 코드
- [source-checks.json](source-checks.json): 3자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 이유
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현 (3자 승인을 검사)
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수 검증
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황
- [queue.mjs](queue.mjs), [queue.json](queue.json): 다섯 말뭉치 기준 남은 1급 큐
- [acquire.mjs](acquire.mjs), [source-checks.mjs](source-checks.mjs), [serve.py](serve.py): 원본 고정·원문 확인·검토 시트

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 AnimCJK 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-g1-batch23-2026-09-20/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 667개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **4,209/5,978자(70.4%)**, 남은 **1,769자**.
1급 **1,041/1,145자(90.9%)**, 남은 **104자**.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-g1-batch23-2026-09-20/serve.py
```

`http://localhost:51783/?i=<0-2>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
