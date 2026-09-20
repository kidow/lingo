# 1급 恰·犧·詰 3자 검토 — 3자·42획 반영, 1급 큐를 비운다

2026-09-20 · **3자 반영, 보류 없음, 보정 없음**

[1급 21차 狐~洽](../hanja-g1-batch21-2026-09-20/README.md)의 `next-batch.json`에 남아 있던 마지막 3자다.
세 글자 모두 첫 대조에서 그대로 일치했다. 재배열도, 국소 보정도 없다.
허가된 중간선 42획을 그대로 공개한다. MM 원본 3자에서 출발했다.

| 글자 | 획 | 구성 | 판정 |
| --- | ---: | --- | --- |
| 恰 | 9 | 忄 셋 + 合 여섯 | 일치 |
| 犧 | 20 | 牛 넷 + 羲 열여섯 | 일치 |
| 詰 | 13 | 言 일곱 + 吉 여섯 | 일치 |

부수 유사성으로 승인하지 않았다. 세 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
[direction-probe.mjs](direction-probe.mjs)가 표시한 획은 없고, 45~60° 구간의 차이도 없었다.
획 끝점 대응 검사도 세 글자 모두 어긋난 자리를 내놓지 않았다.
이번 회차 원문에는 가로 이동 변환이 없었다.

## 이 회차로 1급 큐가 빈다

이 3자를 반영하면 **검토 가능한 1급이 0자**가 된다. 1급은 1,038/1,145자(90.7%)이고,
남은 107자는 사전 출처나 라이선스 후보가 없어 큐에 들어오지 않는다.
[verify.mjs](verify.mjs)도 다음 후보 대신 «남은 글자가 없다»를 그대로 적는다.

특급II의 다음 후보도 찾아봤지만 **0자**다. 남은 345자가 왜 막혀 있는지는
[hanja-special2-queue-2026-09-20](../hanja-special2-queue-2026-09-20/README.md)에 분류해 두었다.
87자는 후보 말뭉치가 艹를 3획으로 그려 배정 4획과 어긋나는 «획 경계» 문제고,
35자는 배정과 사전의 획수가 서로 다르며, 216자는 후보 말뭉치에 글자 자체가 없다.
셋 다 기하를 더 보는 일이 아니라 기준을 넓힐지 정하는 일이라 임의로 진행하지 않았다.

## 근거와 재현

- [observations.json](observations.json): 3자 판정과 8방향 코드
- [source-checks.json](source-checks.json): 3자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응 (이번 회차의 보정은 없다)
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현 (3자 승인을 검사)
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수·남은 큐 검증
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황
- [next-batch.json](next-batch.json): 비어 있는 다음 후보
- [acquire.mjs](acquire.mjs), [source-checks.mjs](source-checks.mjs), [serve.py](serve.py): 원본 고정·원문 확인·검토 시트

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 MM 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-g1-batch22-2026-09-20/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 659개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **4,194/5,978자(70.2%)**, 남은 **1,784자**.
1급 **1,038/1,145자(90.7%)**, 검토 가능한 미검토 1급은 **0자**다.
남은 급수는 2급 4자, 특급II 345자(위 분류), 특급 1,328자(출처 조사 전)다.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-g1-batch22-2026-09-20/serve.py
```

`http://localhost:51782/?i=<0-2>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
