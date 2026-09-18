# 특급II 騁~涑 50자 검토 — 50자·647획 반영

2026-09-18 · **50자 전부 반영, 보류 없음**

[6차 岷~斌](../hanja-special2-batch6-2026-09-18/README.md)의 `next-batch.json`에 고정한 후보 50자를
같은 방식으로 대조했다. 첫 대조에서 41자가 일치했고, 9자는 보정 후 전체 획을 다시 확인했다.
허가된 중간선 643획을 유지하고 4획을 국소 보정했으며, 6자의 획 순서를 바꿨다.
MM 원본 46자, Ja 원본 4자에서 출발했다. 이번 회차에는 보류한 글자가 없다.

## 보정

| 보정 대상 | 변경 |
| --- | --- |
| 騁·駟 | 馬의 왼쪽 세로획을 윗가로획보다 먼저 (1·2획 교환) |
| 肆 | 镸의 왼쪽 세로획을 윗가로획보다 먼저 (1·2획 교환) |
| 墅 | 里의 土 윗가로획을 긴 세로획보다 먼저 (5·6획 교환) |
| 蘚 | 艹의 十 둘을 각각 가로 다음 세로 (1·2, 3·4획 교환) |
| 穡 | 嗇의 가로획과 긴 세로획을 두 人 쌍보다 먼저 (10·11획 → 6·7번째) |
| 廂 | 广의 첫 점(1획)을 세로점으로 보정 |
| 銷 | 小의 좌우 점(10·11획)을 바깥으로 벌려 반전 |
| 褻 | 衣의 긴 삐침(14획)을 오른쪽 위에서 왼쪽 아래로 역방향 |

부수 유사성으로 승인하지 않았다. 각 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보정 9자는 변경 획뿐 아니라 전체 획을 재대조했다.

[direction-probe.mjs](direction-probe.mjs)가 60°를 넘는 획 18개(9자)를 표시했고,
9자 모두 보정으로 이어졌다. 표시만 되고 그대로 둔 획은 없다.
嗇·舟·必 같은 덩어리 판정은 화면만으로 가리기 어려워 획 끝점 좌표를 숫자로 확인했다.
사전이 세로로 긋고 허가 원본이 기울여 쓰는 짧은 점이 45~60° 구간에 13개 더 있었다.
1~6차와 같은 기준으로 임계 아래는 허가된 중간선을 그대로 뒀다.
蘚의 원문은 가로 이동 `translate(12, -y)`를 쓴다. 이동은 방향 벡터를 바꾸지 않는다.

## 근거와 재현

- [observations.json](observations.json): 50자 판정, 9자의 첫 판정·보정·재대조 기록, 8방향 코드
- [source-checks.json](source-checks.json): 50자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 이유
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수·다음 후보 검증. 이전 회차 보류 글자는 큐에서 뺀다
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황
- [next-batch.json](next-batch.json): 다음 謖~鄂 50자·671획 후보
- [acquire.mjs](acquire.mjs), [source-checks.mjs](source-checks.mjs), [serve.py](serve.py): 원본 고정·원문 확인·검토 시트

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 MM·Ja 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-special2-batch7-2026-09-18/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 531개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **2,699/5,978자(45.1%)**, 남은 **3,279자**.
특급II **347/1,150자(30.2%)**, 남은 **803자**. 검토 가능한 미검토 특급II는 **461자**다.
다음 권장 작업은 **謖~鄂 50자·671획의 전체 대조**다.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special2-batch7-2026-09-18/serve.py
```

`http://localhost:51750/?i=<0-49>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
