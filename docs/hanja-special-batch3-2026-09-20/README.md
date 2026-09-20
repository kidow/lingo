# 특급 3차 簣~鼗 — 50자·624획 반영

2026-09-20 · **50자·624획 전부 반영, 보류 0자** · 특급 100 → 150/1,328자

이번 구간은 조용했다. 방향 검사에 걸린 글자가 **네 자뿐**이었고([2차](../hanja-special-batch2-2026-09-20/README.md)는 18자),
보정한 글자는 다섯, 국소 보정은 **두 획**이다. 622획은 허가된 중간선 그대로다.

## 보정 5자

| 보정 | 글자 | 내용 |
| --- | --- | --- |
| 후보 교체 | 曩 | Ja는 日·襄 안쪽을 다른 순서로 쓴다(3획 초과, 최대 99°). Hans가 사전 순서 그대로여서 바꿨다 |
| 糸 | 糺 | 가운데 세로를 왼쪽 점보다 먼저. 4·5획 교환 |
| 革 | 覊 | 가로 둘을 긴 세로보다 먼저(18~20획 회전) |
| 里 | 儻 | 黨 안쪽 가로를 세로보다 먼저. 16·17획 교환 |
| 亠·宀의 첫 점 | 曩·甯 | 사전은 세로로 긋는다(61°·67°). 각 획의 범위 안에서 세로로 |

曩은 **후보 교체와 국소 보정이 함께 걸린 첫 글자**다. Hans로 바꾸니 세 획 중 둘이 사라지고
亠의 첫 점 하나만 남아, 그것만 [1급 19차](../hanja-g1-batch19-2026-09-20/README.md)의 稟과 같은 방식으로 세웠다.

## 이번 구간이 조용했던 이유

簣~鼗은 忄·扌·犭·虫·亻처럼 **왼쪽 부수가 단순한 글자가 많다.**
1·2차에서 문제를 일으킨 艹·冓·角·田·臼 같은 «안쪽 획 순서가 갈리는 구성»이 적어서,
서른 자 가까이가 첫 후보 그대로 맞았다. 糸·里·革만 이전 회차와 같은 자리에서 갈렸다.

부수 유사성으로 승인하지 않았다. 쉰 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
[direction-probe.mjs](direction-probe.mjs)의 60° 초과 표시는 후보 교체·교환·보정으로 모두 해소했고,
각도 검사가 놓친 糺의 糸 순서는 끝점 배정 검사가 잡았다.
공개한 순서·경로로 다시 재면 60°를 넘는 획이 없다.
45~60° 구간은 여섯 획(宄 1, 襢 1·6, 癉 1, 螗 7, 憝 1)이고, 모두 사전이 세로로 긋고 원본이 기울이는 짧은 점이라
이전 회차와 같은 기준으로 그대로 뒀다.

## 근거와 재현

- [selection.json](selection.json): 후보를 바꾼 曩과 그 이유
- [observations.json](observations.json): 50자 판정과 사유, 8방향 코드, 보정 5자의 재대조 기록
- [source-checks.json](source-checks.json), [originals.json](originals.json): 원문 해시·획별 시간·중간선
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 2획
- [candidate-paths.json](candidate-paths.json), [review.json](review.json), [prepare.mjs](prepare.mjs), [verify.mjs](verify.mjs)
- [checks.json](checks.json), [progress.json](progress.json), [next-batch.json](next-batch.json)

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 AnimCJK·Make Me a Hanzi 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.

```bash
node docs/hanja-special-batch3-2026-09-20/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 690개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **4,376/5,978자(73.2%)**, 남은 **1,602자**.
특급 **150/1,328자(11.3%)**, 검토 가능한 특급은 **530자**가 남았다.

## 다음 묶음

**叨~旄 50자·714획**을 [next-batch.json](next-batch.json)에 정리했다(Ja 29·MM 18·Hans 3).

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special-batch3-2026-09-20/serve.py
```

`http://localhost:51787/?i=<0-49>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
`&corrected=1`을 붙이면 보정 뒤의 경로로 다시 본다.
