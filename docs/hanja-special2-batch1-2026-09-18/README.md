# 특급II 痂~勍 50자·643획 검토 완료

2026-09-18 · **50자 전부 반영, 보류 0자**

[특급II 전수 목록](../hanja-special2-inventory-2026-09-18/README.md)의 첫 후보 50자를
2급과 같은 방식으로 대조했다. 첫 대조에서 38자가 일치했고, 12자는 보정 후 전체 획을 다시 확인했다.
허가된 중간선 638획을 유지하고 5획을 국소 보정했으며, 8자의 획 순서를 바꿨다.
MM 원본 41자, Ja 원본 9자(橄·羌·襁·炬·遽·鉅·劒·鎌·勍)에서 출발했다.

| 보정 대상 | 변경 |
| --- | --- |
| 羌 | 羊 모양 윗부분의 둘째 가로획을 세로획보다 먼저 (4·5획 교환) |
| 盖 | 윗부분의 세로획을 긴 가로획보다 먼저 (5·6획 교환) |
| 舡 | 舟 안쪽의 짧은 내림획을 가로획보다 먼저 (5·6획 교환) |
| 炬·鉅 | 巨의 윗가로획을 왼쪽 세로획보다 먼저 (5·6획, 9·10획 교환) |
| 遽 | 虍의 긴 가로획을 왼쪽 삐침보다 먼저 (3·4획 교환) |
| 騫 | 馬의 왼쪽 세로획을 윗가로획보다 먼저 (11·12획 교환). 첫 획은 세로점으로 보정 |
| 黔 | 黑 가운데 가로획을 긴 세로획보다 먼저 (6·7획 교환) |
| 疥·蹇 | 첫 획을 각 글자에서 관찰한 세로점으로 보정 |
| 鎌·慊 | 兼의 왼쪽 점(9획, 4획)을 왼쪽 아래 방향으로 반전 |

부수 유사성으로 승인하지 않았다. 각 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보정 12자는 변경 획뿐 아니라 전체 획을 재대조했다.

시각 대조를 뒷받침하려고 [direction-probe.mjs](direction-probe.mjs)로 사전 획과 후보 획의
시작→끝 벡터 각도를 재서 60°를 넘는 획 19개(11자)를 표시했다. 표시된 획은 모두 눈으로 다시 보았고,
舡 6획만 순서 교환으로 해소되어 별도 보정이 없다. 60° 안쪽의 기울기 차이(痂·訶·倞·勍의 첫 점 등)는
시작점과 순서가 같아 원본을 유지했다. 숫자는 볼 곳을 알려 줄 뿐 판정이 아니다.

## 근거와 재현

- [observations.json](observations.json): 50자 승인, 12자의 첫 판정·보정·재대조 기록, 8방향 코드
- [source-checks.json](source-checks.json): 50자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 이유
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수·다음 후보 검증
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황
- [next-batch.json](next-batch.json): 다음 涇~赳 50자·619획 후보
- [acquire.mjs](acquire.mjs), [source-checks.mjs](source-checks.mjs), [serve.py](serve.py): 원본 고정·원문 확인·검토 시트

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 MM·Ja 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-special2-batch1-2026-09-18/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 505개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **2,402/5,978자(40.2%)**, 남은 **3,576자**.
특급II **50/1,150자(4.3%)**, 남은 **1,100자**. 검토 가능한 미검토 특급II는 **761자**다.
다음 권장 작업은 **涇~赳 50자·619획의 전체 대조**다.

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special2-batch1-2026-09-18/serve.py
```

`http://localhost:51744/?i=<0-49>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
시스템 python3는 샌드박스에서 막히므로 Homebrew python3를 쓴다.
