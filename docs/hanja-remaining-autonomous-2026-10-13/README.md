# 미적용 한자 작업 목록

2026-10-13T10:10:53.912Z UTC. 런타임은 고정 커밋 6e96cd46802b3135eb2c87ece64e7c3414d841c0 (814)에서만 읽었다. 5,978자 중 실제 재생 가능 **5,409자**, 미적용 **569자**다. 고정 Git blob의 TypeScript/JSON 모듈을 RAM에서 import하고 hanjaStrokeData로 확인했다. 입력 **1173개**의 검사 전후 SHA256은 ebc73920fec843a286249426eacf99d4e2c3a48dee6bd3f828b6288c94be30d9 로 같았다. 이후 checkout 변경은 포함하지 않는다.

## 고정 완료와 이후 진행

775–814의 **40건**은 개별 완료 커밋과 고정 git show의 metadata·review·validation 120개 파일을 대조했다. SHA256과 Git blob SHA1은 inventory에 기록했다. 이번 연속 작업은 5,392자 적용에서 **17자 적용·23자 보류**까지 완료되어 5,409자가 되었다.

815는 고정 스냅샷 이후 native 완료다. root가 현재 5,410/568을 보고했으나 이 inventory의 고정 완료·적용 숫자에는 포함하지 않는다. 816은 현재 native 검토 대기/진행 상태로 표시한다.

## 준비 자료 관찰

815–1062의 **248개** source-only 패키지와 1065–1092의 **28개** 재검토 패키지를 확인했다. 준비 관찰 시각은 위 UTC 및 각 package의 observedFrom/observedUntil이다. 1055–1062도 source-only 준비 완료 범위에 포함한다. 준비 완료는 native 완료가 아니다.

원본 확보와 numeric compiler 통과는 국내 whole·필순·방향·프레임·재생 승인이 아니다. explicit 원본/header/file SHA identity와 numeric-only 상태, 기존 metadata/partial/unknown 경고를 유지했다. 오래된 unknown을 native 완료로 승격하지 않았다.

## 미적용 급수

| 급수 | 글자 수 |
|---|---:|
| 1급 | 63 |
| 특급 | 420 |
| 특급II | 85 |
| 2급 | 1 |

## 대기 상태

| 상태 | 글자 수 |
|---|---:|
| sourcePreparedAwaitingNativeReview | 259 |
| newCandidateNoIndexedEvidence | 5 |
| existingReviewUnknown | 76 |
| sourceMissingAwaitingEvidence | 15 |
| existingHold | 189 |
| heldReviewed | 23 |
| postFrozenNativeCompleted | 1 |
| activeReview | 1 |

## source-only 후보 compiler

| 상태 | 패키지 수 |
|---|---:|
| prepared | 212 |
| blocked | 64 |
| notObserved | 0 |

총 276개 준비 패키지의 문서 관찰이다. blocked는 출처·연속성·수치 문제의 기록이며 native 최종 보류와 구분한다. compiler를 직접 재실행하지 않았다.

이전 sourceMissing 기준 **7자**를 보존했다. 현재 준비 문서의 누락은 **15패키지**, 부분 whole family는 **15패키지**다. 완전한 numeric 후보가 있더라도 일부 whole의 bare 누락을 지우지 않았다. 최신 API를 고정 원본에 대체하지 않는다. exact missing 이름·차단 whole·compiler 상태는 inventory에 있다.

## 기록된 사유

| 유형 | 글자 수 |
|---|---:|
| awaitingNativeReview | 260 |
| unknown | 136 |
| sourceMissing | 15 |
| sourceCandidateBlockedPendingNativeReview | 64 |
| glyphFormMismatch | 23 |
| pathContinuity | 65 |
| directionMismatch | 36 |
| penBoundary | 55 |
| maskOrTerminal | 56 |
| countMismatch | 9 |
| postFrozenNativeCompletion | 1 |
| activeReview | 1 |
| orderReview | 1 |

사유는 겹쳐 집계한다. completedHeldReviews는 existingHoldsForRecheck의 부분집합이며 나머지 주요 큐는 서로 겹치지 않는다. 큐는 entries의 id를 참조하며 상세 근거는 각 entry와 file SHA로 연결한다.

## 범위와 다음 작업

815 이후의 국내 whole·필순·방향·말단·누적 프레임·실제 재생을 이어서 검토한다. 준비/numeric 검사로 승인하지 않는다. 누락·partial family와 기존 보류·unknown 근거를 각각 확인한다.

808·809·810·811의 이전 출처 통계값은 다른 세션이 정정 중이다. 여기서는 고정814의 원래 blob을 보존하며 해당 통계를 승인·적용 숫자의 근거로 사용하지 않았다. 원본 geometry와 native 판정은 변하지 않았다는 보고를 별도로 기록했다.

고정 Git blob과 작은 JSON 문서만 읽었다. 사전 SVG/이미지·브라우저·공용 런타임·빌드를 조작하지 않았다. 출처 검증기/compiler를 다시 실행하지 않았고 이전 skippedEvidence를 유지했다. 준비 자료는 다른 세션에서 계속 바뀔 수 있다.

파일: [inventory.json](./inventory.json)
