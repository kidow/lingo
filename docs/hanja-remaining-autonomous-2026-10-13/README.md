# 미적용 한자 작업 목록

2026-10-13T08:28:34.268Z UTC에 커밋 ccae139606411b4b36dd77e61234c63ffefcd58f를 기준으로 새 프로세스에서 확인했다. 5,978자 중 실제 재생 가능 5,403자, 미적용 575자다. 런타임·사전 입력 1,161개 파일의 해시가 검사 전후 같고 해당 고정 커밋과 일치했다. 이후 작업은 이 스냅샷에 포함되지 않는다. 빌드는 하지 않았다.

## 급수

| 급수 | 미적용 |
|---|---:|
| 1급 | 63 |
| 특급 | 426 |
| 특급II | 85 |
| 2급 | 1 |

## 진행 상황

이번 연속 작업은 5,392자 적용·586자 미적용에서 시작했다. 775~805의 31자를 검토하여 11자를 새로 적용하고 20자를 보류했다. 모든 자별 완료 커밋과 metadata·review·validation 파일의 해시를 고정 커밋에서 대조했다. 직전 스냅샷 이후 驈·檼·訔·薿 4자를 남은 목록에서 제외했다.

806~984의 179개 자료 패키지를 관찰했다. 이 중 806~814는 현재 브라우저 검토 범위로 따로 표시한다. 후보 컴파일러가 수치 검증을 통과하거나 원본 자료가 준비되어도 국내 자형·필순·방향·프레임·재생·런타임 승인을 의미하지 않는다. 기존 보류 기록은 유지하고 새 준비 상태와 분리했다. 원본 의존성 누락, 일부 whole의 불완전한 자료, 전체 자형 적합성 미확인은 그대로 남겼다.

985~994는 다른 에이전트가 캡처 중인 범위로, 이 스냅샷의 완료·준비 집계에서 제외했다. 생성 중 폴더를 완료 후보로 세지 않는다.

## 대기 상태

| 상태 | 글자 수 |
|---|---:|
| newCandidateNoIndexedEvidence | 98 |
| existingReviewUnknown | 85 |
| existingHold | 193 |
| heldReviewed | 20 |
| activeReview | 9 |
| sourcePreparedAwaitingNativeReview | 163 |
| sourceMissingAwaitingEvidence | 7 |

## 후보 컴파일 상태

| 상태 | 패키지 수 |
|---|---:|
| prepared | 82 |
| blocked | 97 |

이 숫자는 806~984의 source-only 상태다. blocked는 원본 부족·단절·수치/자형 문제로 후보 컴파일을 준비하지 않은 상태이며, 국내 시각 검토의 최종 보류 판정과 구분한다.

## 기록된 검토 사유

| 유형 | 글자 수 |
|---|---:|
| unknown | 237 |
| glyphFormMismatch | 25 |
| pathContinuity | 70 |
| directionMismatch | 29 |
| penBoundary | 35 |
| maskOrTerminal | 56 |
| countMismatch | 11 |
| activeReview | 9 |
| sourceMissing | 8 |
| sourceCandidateBlockedPendingNativeReview | 17 |
| awaitingNativeReview | 170 |
| orderReview | 1 |

한 글자에 사유가 여러 개면 중복 집계한다. 문서에 기록된 사유의 분류이며 새 검토나 승인이 아니다. completedHeldReviews는 existingHoldsForRecheck의 부분집합이고, 나머지 주요 큐는 겹치지 않는다.

## 다음 순서

1. 806~814의 전체 자형·필순·방향·말단·재생을 브라우저 패널에서 확인한다.
2. 나머지 source-only 후보도 실제 자형과 펜 경계를 먼저 대조한다.
3. 누락 원본은 복구하거나 별도 완전한 출처를 확보한다. 최신 의존성을 고정 원본에 섞지 않는다.
4. 기존 보류·미확인 기록을 대조한다. 검색되지 않은 기록을 근거가 없는 상태로 단정하지 않는다.

## 근거 범위와 한계

metadata·review·validation 및 작은 source-analysis·candidate-compile-analysis 파일을 확인했다. 실제 출처 검증기나 후보 컴파일러를 이 현황 갱신에서 다시 실행하지 않았다. 100KB를 넘는 새 근거는 읽지 않았으며, 기존 큰 legacy 파일 6개도 skippedEvidence에 유지했다. 사전 이미지/SVG·브라우저·공용 런타임을 조작하지 않았다. 준비 자료는 관찰 시각 기준이고 다른 세션이 계속 작업할 수 있다.

파일: [inventory.json](./inventory.json)
