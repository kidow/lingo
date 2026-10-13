# 미적용 한자 작업 목록

2026-10-13T06:48:48.252Z에 HEAD 10cf16a698acda9a9414efc537584bc20ad56355에서 새 프로세스로 배정한자 5,978자와 실제 재생 가능 여부를 확인했다. 재생 가능 5399자, 미적용 579자다. 이후 다른 작업이 진행되면 이 스냅샷과 달라질 수 있다. 빌드는 하지 않았다.

## 급수

| 급수 | 미적용 |
|---|---:|
| 1급 | 63 |
| 특급 | 430 |
| 특급II | 85 |
| 2급 | 1 |

## 대기 상태

| 상태 | 글자 수 |
|---|---:|
| newCandidateNoIndexedEvidence | 158 |
| existingReviewUnknown | 85 |
| existingHold | 193 |
| heldReviewed | 11 |
| activeReview | 12 |
| sourcePreparedAwaitingNativeReview | 116 |
| sourceMissingAwaitingEvidence | 4 |

775~792의 자별 review 커밋을 확인했다. 秞·槱·曘·醹·莠·牖 6자는 실제 재생이 등록되어 남은 목록에서 제외했다. 완료 보류는 기존 5자와 萸·滺·褎·楰·輶·緌 6자를 합한 11자다. 각 실제 커밋과 마지막 792 resume 근거를 inventory에 기록했다. 보류 검토 완료는 적용이나 필순 전체 승인을 뜻하지 않는다.

805~924는 원본 자료 준비 범위다. 필요한 출처·분석·검증기 파일이 갖춰진 후보, 원본 의존성이 누락된 후보, 준비 중 후보를 따로 표시한다. 빈 폴더 0개는 한자에 임의로 대응시키거나 완료 후보로 집계하지 않았다. 원본 캡처만으로 native 검토·런타임 적용을 승인하지 않는다.

## 기록된 검토 사유

| 유형 | 글자 수 |
|---|---:|
| unknown | 296 |
| glyphFormMismatch | 23 |
| pathContinuity | 62 |
| directionMismatch | 30 |
| penBoundary | 35 |
| maskOrTerminal | 56 |
| countMismatch | 8 |
| activeReview | 12 |
| awaitingNativeReview | 116 |
| sourceMissing | 4 |
| orderReview | 1 |

한 글자에 사유가 여러 개면 중복 집계한다. 기록된 문구의 분류이며 새 필순 승인을 뜻하지 않는다. completedHeldReviews는 existingHoldsForRecheck의 부분집합이고, 나머지 주요 큐는 서로 겹치지 않는다.

## 다음 순서

1. 793~804의 브라우저 검토 결과를 반영한다.
2. sourcePreparedAwaitingNativeReview 후보의 전체 자형·필순·방향·말단·재생을 브라우저 패널에서 확인한다.
3. sourceMissingAwaitingEvidence의 누락 원본을 복구하거나 별도 완전한 출처를 확보한다. 최신 의존성을 고정 원본에 섞지 않는다.
4. 기존 보류와 미확인 후보는 최신 기록을 대조한다. 기록이 검색되지 않았다는 이유로 근거가 없다고 단정하지 않는다.

## 근거 범위와 한계

기존 evidence 경로·기록 위치·보류 사유를 유지하고, 이번에 작은 metadata/review/source-analysis 320개를 추가 대조했다. 792 resume는 요청된 완료 인계 확인을 위해 예외적으로 읽었다. 기존 큰 legacy 파일 6개는 여전히 skippedEvidence에 남겨 미확인 상태를 유지했다. 출처나 사전 이미지/SVG는 읽지 않았고 공용 런타임은 수정하지 않았다.

파일: [inventory.json](./inventory.json)
