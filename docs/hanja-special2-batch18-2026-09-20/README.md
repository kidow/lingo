# 특급II 棨~淏 12자 검토 — 12자·140획 반영

2026-09-20 · **12자 반영, 보류 없음** · 특급II 805 → 817/1,150자

[특급II 17차](../hanja-special2-batch17-2026-09-18/README.md)에서 큐가 빈 뒤로 다음 후보가 없었다.
원인은 글자가 없어서가 아니라 **우리가 고정한 말뭉치가 셋뿐**이어서였다.
AnimCJK의 같은 리비전(`ec5e17c`)에는 네 개의 `graphics*` 파일이 있는데
그중 `graphicsKo`·`graphicsJa`만 쓰고 `graphicsZhHant`·`graphicsZhHans`는 읽지 않았다.
두 파일을 같은 방식으로 고정해 후보에 넣자 **12자가 그대로 조건을 충족했다.**

| 글자 | 획 | 후보 | 판정 |
| --- | ---: | --- | --- |
| 棨 | 12 | ZhHans | 戶 첫 획 반전 |
| 杻 | 8 | ZhHans | 일치 |
| 璘 | 16 | ZhHans | 일치 |
| 琫 | 12 | ZhHans | 일치 |
| 琇 | 11 | ZhHans | 乃 10·11획 교환 |
| 栒 | 10 | ZhHans | 일치 |
| 汭 | 7 | ZhHans | 일치 |
| 瑀 | 13 | ZhHans | 일치 |
| 堉 | 11 | ZhHans | 일치 |
| 璪 | 17 | ZhHans | 일치 |
| 畯 | 12 | ZhHans | 일치 |
| 淏 | 11 | ZhHans | 일치 |

## 말뭉치를 늘렸을 뿐, 기준은 그대로다

- 새 출처가 아니다. **이미 고정해 둔 커밋의 같은 라이선스(Arphic Public License) 파일 두 개**를 추가로 읽었다.
  `graphicsZhHant.txt` sha256 `731fe263…41ff6aec`, `graphicsZhHans.txt` sha256 `5a5c157f…d5547798`.
- 들어오는 조건도 그대로다: 사전 제목·메타데이터가 일치하고, 사전 표시 획수가 배정 획수와 같고,
  라이선스 후보의 획수도 같아야 한다. 이 12자는 사전·배정·후보 셋이 모두 같은 값이다.
- 자형 판정도 그대로다. 간체 파일에서 왔다고 통과시키지 않았다 — 열두 글자 모두 사전 재생과 획별로 대조했고,
  자형이 달랐다면 贖·猜처럼 보류했을 것이다. 이 글자들은 간화 대상이 아니라 자형이 한국 자형과 같다.

## 보정

| 보정 대상 | 변경 |
| --- | --- |
| 棨 | 啓 위 戶의 첫 획(1획)을 오른쪽 위에서 왼쪽 아래로 반전 |
| 琇 | 秀 아래 乃의 긴 삐침을 꺾임보다 먼저 (10·11획 교환) |

부수 유사성으로 승인하지 않았다. 각 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보정 2자는 변경 획뿐 아니라 전체 획을 재대조했다.

[direction-probe.mjs](direction-probe.mjs)가 60°를 넘는 획 3개(棨 1, 琇 10·11)를 표시했고 둘 다 보정으로 이어졌다.
획 끝점 대응 검사도 琇의 교환만 추가로 짚었다. 45~60° 구간의 차이는 없었다.
이번 회차 원문에는 가로 이동 변환이 없었다.

## 남은 333자

[queue.mjs](queue.mjs)로 다섯 말뭉치를 모두 받아 큐를 다시 계산한다([queue.json](queue.json)).
이 회차 뒤 **새로 들어오는 글자는 0자**이고, 조건을 충족하는 6자는 이미 자형 차이로 보류된
犢·牘·竇·瑜·砥·鯖다. 나머지 333자가 막힌 이유는
[특급II 큐 분류](../hanja-special2-queue-2026-09-20/README.md)에 정리한 그대로다 —
艹를 3획으로 그리는 후보 87자, 배정·사전 획수가 다른 35자, 어느 말뭉치에도 없는 204자다.
1급에도 같은 경로로 洑·藉·蕉 3자가 새로 들어온다. 藉·蕉는 **ZhHant가 艹를 4획으로 그려서** 조건을 채운다.

## 근거와 재현

- [selection.json](selection.json): 이번 12자를 고른 조건과 후보 말뭉치
- [observations.json](observations.json): 12자 판정, 2자의 첫 판정·보정·재대조 기록, 8방향 코드
- [source-checks.json](source-checks.json): 12자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 이유
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현 (12자 승인을 검사)
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수 검증
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황
- [queue.mjs](queue.mjs), [queue.json](queue.json): 다섯 말뭉치 기준 남은 큐
- [acquire.mjs](acquire.mjs), [source-checks.mjs](source-checks.mjs), [serve.py](serve.py): 원본 고정·원문 확인·검토 시트

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 AnimCJK 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-special2-batch18-2026-09-20/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 663개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **4,206/5,978자(70.4%)**, 남은 **1,772자**.
특급II **817/1,150자(71.0%)**, 남은 **333자**.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special2-batch18-2026-09-20/serve.py
```

`http://localhost:51760/?i=<0-11>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
