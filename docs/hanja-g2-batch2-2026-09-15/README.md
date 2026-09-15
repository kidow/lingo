# 2급 奎~煉 50자·658획 검토 완료

2026-09-15 · **50자 전부 반영, 보류 0자**

앞서 확인한 奎~湍 23자·291획에 이어 潭~煉 27자·367획을 대조했다.
첫 대조에서 33자가 일치했고, 17자는 보정 후 전체 획을 다시 확인했다.
허가된 중간선 632획을 유지하고 26획을 국소 보정했으며, 3자의 획 순서를 수정했다.

| 보정 대상 | 변경 |
| --- | --- |
| 驥·驪 | 馬의 첫 세로획을 가로획보다 먼저 재생. 驥 7획의 왼쪽 아래 방향 보정 |
| 萊 | 위쪽 두 十 각각 가로획 다음 세로획 순서 |
| 麒·塘·惇·燉·裸·拉·亮·廬·驪 | 각 글자에서 관찰한 세로점으로 보정 |
| 溺 | 7·8·12·13획을 왼쪽 아래 방향으로 보정 |
| 潭 | 覀의 9획을 두 안쪽 세로획 사이의 짧은 가로획으로 보정 |
| 膽·謄 | 言의 첫 획을 짧은 가로획으로 보정 |
| 頓 | 첫 획의 오른쪽→왼쪽 방향 복원 |
| 謄 | 왼쪽 내부 두 점과 윗부분 두 획의 방향·모양 보정 |
| 樑 | 刅의 왼쪽 점인 10획을 왼쪽 아래 방향으로 보정 |
| 亮 | 마지막 획의 앞쪽 가로선을 제거하여 아래 두 다리를 분리 |

부수 유사성으로 승인하지 않았다. 각 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
보정 17자는 변경 획뿐 아니라 전체 획을 재대조했다.

## 근거와 재현

- [initial-observations.json](initial-observations.json): 첫 전체 대조 결과 33자 일치·17자 보정 필요
- [observations.json](observations.json): 보정 후 최종 50자 승인 및 재대조 기록
- [source-checks.json](source-checks.json): 50자의 원문 해시·획별 시간·XML 참조·좌표 변환
- [originals.json](originals.json): 고정한 라이선스 원본의 중간선과 정규화 경로
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응과 국소 보정 이유
- [candidate-paths.json](candidate-paths.json), [review.json](review.json): 승인 경로와 증거 해시
- [prepare.mjs](prepare.mjs): 읽기 전용 승인 데이터 재현
- [verify.mjs](verify.mjs): 재현 결과·공개 데이터·적용 수·다음 후보 검증
- [checks.json](checks.json), [progress.json](progress.json): 이번 검증과 전체 진행 현황
- [next-batch.json](next-batch.json): 다음 漣~紡 50자·674획 후보

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 MM 원본 47자와 Ja 원본 3자(垈·悳·惇)에서
출발했다. 사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.
자형의 구조와 진행 방향을 비교한 것으로 폰트 외곽선의 픽셀 일치나 필기 채점이 아니다.

```bash
node docs/hanja-g2-batch2-2026-09-15/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 247개**, **프로덕션 빌드**가 통과했다.
전체 **1,918/5,978자(32.1%)**, 남은 **4,060자**.
2급 **100/538자(18.6%)**, 남은 **438자**. 8급~3급은 모두 적용되어 있다.
다음 권장 작업은 **漣~紡 50자·674획의 전체 대조**다.

## 이전 중간 기록

`observations-draft.json`, `source-checks-draft.json`, `checks-draft.json`,
`verify-draft.mjs`는 최초 23자 검토 당시 기록이다. 현재 승인은 위 최종 파일을 따른다.
당시 潭 페이지 접근 실패는 권한 부족이 아니라 검토 서버의 가로 이동값 처리 오류였다.
`serve.py`가 원문의 가로 이동을 보존하도록 수정된 뒤 같은 주소에서 검토를 완료했다.
`renderer-checks.json`의 HTTP 확인은 시각 승인을 대신하지 않는다.
