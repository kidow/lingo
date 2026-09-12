# 3급II batch7 통합 감사

결과: **통과 — 오류 0건**. 고정 대상50자·554획 중49자·541획과49개 보정 recipe가 통합됐다. 慈는 배정13획과 출처14획이 달라 보류됐으며 런타임·공유 registry·recipe·public 경로에 없다.

| 검증 | 결과 |
|---|---:|
| 고정 선택·원본 corpus/median/source 행 대조 | 50/50 |
| 실제 `textbookGeometry` 재생성 | 49/49 |
| 실제 `validateTextbookReview` 및 런타임 조회 | 49/49 |
| 새49개를 제외한 전체 객체 canonical SHA | 3/3 기준 일치 |
| 기존 public 한자별 SHA | 787/787 보존 |
| 이전 batch6 문서 SHA | 33/33 보존 |
| peer 최종 경로·recipe·기록·원문·완료 표본 pin | 4파일·22자 일치 |
| 중복 한자·recipe ID / 원본 계보 누락 | 0 / 0 |

- 逸의 원본10 재사용, 莊·葬·著의 원본1 분할, 臟의 원본5 분할, 藏의 원본1 분할을 보존했다.
- 臟19획←원본13·19와 藏15획←원본9·15의 병합 계보가 남아 있다.
- 著9획의 `sourceStroke:null`은 출처에서 직접 확인한 점이며 좌표·검토 메모·원문 SHA가 연결돼 있다.
- 慈는 출처14개 완료 표본만 기록되고 보정 recipe와 공개 경로는 없다.

| 현재 수치 | 개수 |
|---|---:|
| 전체 런타임 애니메이션 | 1,339 |
| 교과서 근거 public 한자 | 836 |
| 공유 검토 기록 / matched | 838 / 836 |
| 공유 보정 recipe | 595 |
| 전체 한자 / 미적용 | 5,978 / 4,639 |
| 3급II 적용 | 349 / 500 (69.8%) |

공개 bundle SHA-256: `5b81074a9b55596e6ff5fac1eb365030907d21c4222348ec00f6999e71aa0815`.

[상세 감사와49개 추가 항목의 hash](integration-audit.json) · [고정 기준](baseline.json) · [검증 실행 기록](verification.json)

감사는 공유 데이터와 이전 문서를 읽기 전용으로 확인했다. 다른 세션의 content/audio/levels 및 spec/WebP 변경은 감사 비교 범위에 포함하지 않았으며, 감사자가 수정하지 않았다. 이 작업에서 작성한 파일은 `integration-audit.json`과 `integration-audit.md`뿐이다.

