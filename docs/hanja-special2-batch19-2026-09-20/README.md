# 특급II 보류 6자 재검토 — 6자 전부 반영

2026-09-20 · **6자·100획 반영, 보류 없음** · 특급II 817 → 823/1,150자

[1급 24차](../hanja-g1-batch24-2026-09-20/README.md)와 같은 이유다. 지금까지 회차는 글자마다 후보를
Ko → MM → Ja 고정 순서로 **하나만** 골랐고, 보류 사유는 «MM 원본의 자형이 사전과 다르다»였다.
특급II에 남아 있던 보류 6자를 다섯 말뭉치 전부와 다시 맞대니 **여섯 다 Ja 원본이 사전 자형과 같았다.**

| 글자 | 보류 사유(당시) | 그때 쓴 후보 | Ja 최대각 | 결과 |
| --- | --- | --- | ---: | --- |
| 犢 | 賣 가운데 四·罒 차이 | MM 80° | **22°** | 반영 |
| 牘 | 같음 | MM 83° | **23°** | 반영 |
| 竇 | 같음 | MM 103° | **60°** | 반영 |
| 瑜 | 兪 오른쪽 자형 | MM 51° | **16°** | 반영 (2·3획 교환) |
| 砥 | 氐 아래 一·丶 차이 | MM 39° | **26°** | 반영 |
| 鯖 | 靑·青 자형 | MM 103° | **21°** | 반영 (5·6, 13·14획 교환) |

## 보정

| 보정 대상 | 변경 |
| --- | --- |
| 瑜 | 王의 둘째 가로를 세로보다 먼저 (2·3획 교환) |
| 鯖 | 魚 田의 안쪽 가로를 세로보다 먼저 (5·6획), 龶의 둘째 가로를 세로보다 먼저 (13·14획) |

犢·牘·竇·砥는 순서·방향이 그대로 맞아 보정 없이 반영했다.
국소 보정한 획은 없고, 공개한 100획 전부가 허가된 중간선 그대로다.

부수 유사성으로 승인하지 않았다. 여섯 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보류 사유가 됐던 賣 가운데·兪 오른쪽·氐 아래·靑 아래는 획의 길이와 자리를 숫자로 다시 확인했다.
[direction-probe.mjs](direction-probe.mjs)가 표시한 6획은 모두 교환으로 해소됐고,
45~60° 구간은 竇의 첫 점 하나뿐이라 이전 회차와 같은 기준으로 그대로 뒀다.

## 특급II 보류가 0이 된다

[queue.mjs](queue.mjs)로 다섯 말뭉치 기준 큐를 다시 계산하면 **새 후보 0자, 보류 0자**다([queue.json](queue.json)).
남은 327자는 [특급II 큐 분류](../hanja-special2-queue-2026-09-20/README.md)의 세 가지 —
艹를 3획으로 그리는 후보 87자, 배정·사전 획수가 다른 35자, 어느 말뭉치에도 없는 204자 — 와 교과서 출처 1자(戱)다.

## 근거와 재현

- [selection.json](selection.json): 여섯 글자와 이번에 고른 후보 말뭉치
- [observations.json](observations.json): 6자 판정, 2자의 보정·재대조 기록, 8방향 코드
- [source-checks.json](source-checks.json), [originals.json](originals.json): 원문 해시·획별 시간·중간선
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응 (국소 보정은 없다)
- [candidate-paths.json](candidate-paths.json), [review.json](review.json), [prepare.mjs](prepare.mjs), [verify.mjs](verify.mjs)
- [checks.json](checks.json), [progress.json](progress.json), [queue.mjs](queue.mjs), [queue.json](queue.json)

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 AnimCJK 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.

```bash
node docs/hanja-special2-batch19-2026-09-20/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 675개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **4,226/5,978자(70.7%)**, 남은 **1,752자**.
특급II **823/1,150자(71.6%)**, 남은 **327자**.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special2-batch19-2026-09-20/serve.py
```

`http://localhost:51761/?i=<0-5>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
