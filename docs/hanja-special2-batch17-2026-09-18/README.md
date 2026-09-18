# 특급II 譎~曦 11자 검토 — 11자·138획 반영, 검토 가능 큐 소진

2026-09-18 · **11자 반영, 보류 없음**

[16차 孑~畦](../hanja-special2-batch16-2026-09-18/README.md)의 `next-batch.json`에 고정한 후보 11자를
같은 방식으로 대조했다. 이번 후보는 사전 제목이 정확히 일치하고 획수가 맞는 허가 원본이 있는
특급II의 마지막 묶음이라 50자가 아니라 11자다.
첫 대조에서 10자가 일치했고, 1자는 보정 후 전체 획을 다시 확인했다.
허가된 중간선 134획을 유지하고 4획을 국소 보정했으며, 획 순서를 바꾼 글자는 없다.
MM 원본 10자, Ja 원본 1자에서 출발했다.

## 보정

| 보정 대상 | 변경 |
| --- | --- |
| 翕 | 羽의 안쪽 획 넷(8·9·11·12획)을 모두 왼쪽 아래 방향으로 (점은 좌우 반전, 짧은 삐침은 역방향) |

같은 회차의 晞(Ja 원본)는 布의 삐침을 가로보다 먼저 써서 그대로 뒀고,
譎·鷸·曦처럼 순서와 방향이 모두 같은 글자도 그대로 뒀다.

부수 유사성으로 승인하지 않았다. 각 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보정 1자는 변경 획뿐 아니라 전체 획을 재대조했다.

[direction-probe.mjs](direction-probe.mjs)가 60°를 넘는 획 4개(1자)를 표시했고,
1자 모두 보정으로 이어졌다. 표시만 되고 그대로 둔 획은 없다.
사전이 세로로 긋고 허가 원본이 기울여 쓰는 짧은 점이 45~60° 구간에 4개 더 있었다.
1~16차와 같은 기준으로 임계 아래는 허가된 중간선을 그대로 뒀다.
이번 회차에는 가로 이동 `translate(12, -y)`를 쓰는 원문이 없다.

## 큐 소진

이 회차로 **검토 가능한 특급II는 0자**가 됐다. 남은 특급II 345자는 다음과 같다.

| 구분 | 글자 수 |
| --- | --- |
| 보류 (瑜·砥·鯖·犢·牘·竇: 허가 원본과 자형이 다름) | 6 |
| 사전 획수가 목록과 다름 (`sourceCountReview`) | 35 |
| 허가 원본 획수가 목록과 다름 (`geometryCountReview`) | 87 |
| 허가 원본 없음 (`geometryNeeded`) | 217 |

[verify.mjs](verify.mjs)는 후보가 없으면 범위 대신 빈 `next-batch.json`을 내고 사유를 `progress.next.task`에 적는다.
보류 6자는 Ja 원본을 다시 고정하면 회복할 수 있는 글자가 있다(鯖·砥·瑜).

## 근거와 재현

- [observations.json](observations.json): 11자 판정, 1자의 첫 판정·보정·재대조 기록, 8방향 코드
- [source-checks.json](source-checks.json): 11자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 이유
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현 (11자 승인을 검사)
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수·다음 후보 검증. 이전 회차 보류 글자는 큐에서 뺀다
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황, 남은 345자의 구분
- [next-batch.json](next-batch.json): 빈 후보 (검토 가능한 특급II 없음)
- [acquire.mjs](acquire.mjs), [source-checks.mjs](source-checks.mjs), [serve.py](serve.py): 원본 고정·원문 확인·검토 시트

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 MM·Ja 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-special2-batch17-2026-09-18/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 571개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **3,157/5,978자(52.8%)**, 남은 **2,821자**.
특급II **805/1,150자(70.0%)**, 남은 **345자**. 검토 가능한 미검토 특급II는 **0자**다.
다음 권장 작업은 **보류 6자의 Ja 재고정 시도** 또는 **1급(1,145자) 착수**다.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special2-batch17-2026-09-18/serve.py
```

`http://localhost:51760/?i=<0-10>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
