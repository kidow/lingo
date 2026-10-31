# 한능검 미추적 검토 자료 정리 — 2026-11-01

대상은 정리 시작 시점의 `docs/hanja-*` 미추적 파일 78개(29개 폴더)이다. 65개를 원문 그대로 보존하고, 후속 자료로 대체되었거나 적용이 금지된 임시 파일 13개를 삭제했다. 등록 데이터·재생 구현·기존 추적 자료는 변경하지 않았다.

## 보존 기준

- 필순·자형·방향·재생 관찰 기록, 실패·보류 이유, 출처와 수치 검증은 역사 근거로 보존한다. 오래된 `pending`, `HOLD`, `runtimeApplied: false` 표시는 당시 상태이며 현재 등록 상태로 바꾸지 않는다.
- 검토를 재현하는 설정·공개 유래 경로·스크립트·브라우저 관찰 snippet을 함께 보존한다. 문서에 직접 참조되지 않아도 독립적인 조사 결과나 재현 입력이면 남긴다.
- 파일명뿐 아니라 전체 경로·동일 폴더의 상대 참조·SHA256 참조·후속 적용 기록을 대조했다. 경로만으로 불필요하다고 판단하지 않았다.
- 원본 사전 이미지·SVG, 인증정보, 학습 기록을 새로 추가하지 않는다. 이번 자료 보존은 새로운 필순 승인이나 재생 검증이 아니다.

## 보존한 65개

아래 경로는 `docs/` 기준이다. 해당 폴더의 기존 추적 파일은 그대로 두고, 이번 미추적 자료만 추가했다.

| 검토 폴더 | 추가 파일 수 | 보존 목적 |
| --- | ---: | --- |
| `hanja-authored-component-u7472-hans-cang10-2026-10-30` | 2 | fixture guard·원본 변환 관찰 snippet |
| `hanja-authored-component-u9714-japanese-zhu5-2026-10-30` | 2 | fixture guard·위험 구간 관찰 snippet |
| `hanja-authored-component-u9a2d-complete-step-var002-2026-10-30` | 1 | 폭 22 fixture guard |
| `hanja-authored-engine-u9a2d-pen8-terminal0-2026-10-29` | 10 | 공개 경로 실험 입력·재현 도구·실패 및 HOLD 관찰 |
| `hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29` | 1 | 배치 1530의 제한된 RAM 점검 결과 |
| `hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29` | 2 | rebase 및 등록 준비 검증 기록 |
| `hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29` | 1 | 최종 준비 기록이 참조하는 중간 rebase 패치 |
| `hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29` | 1 | 폭 22 검토 입력·준비 해시 |
| `hanja-authored-ownstroke-u97b9-2026-10-28` | 2 | 정규화 경로 초안·제한된 코드 검증 |
| `hanja-display-contact-u85da-pen9-14-2026-10-29` | 4 | 접촉 문제의 증명·시제품·검증 도구 |
| `hanja-official-media-compare-u55f8-2026-10-29` | 3 | 기존 관찰 기록의 재현 설정·도구 |
| `hanja-official-media-compare-u7217-2026-10-29` | 5 | 원본 19획 관찰·재현 설정·도구 |
| `hanja-official-media-compare-u97e1-2026-10-29` | 5 | 원본 20획 관찰·재현 설정·도구 |
| `hanja-official-media-compare-u9a2d-pen9-2026-10-29` | 4 | 원본 9획 관찰·재현 설정·도구 |
| `hanja-original-3p-head-prefix-u7c67-2026-10-23` | 1 | 기존 prefix 증명의 재현 스크립트 |
| `hanja-source-component-u7217-grass-body-2026-10-29` | 3 | 조합·배치 불가 조건 및 수치 검증 |
| `hanja-source-independent-qq-three-u727c-source-experiment-2026-10-23` | 3 | 역사 검토에서 참조하는 fixture·설정·생성 도구 |
| `hanja-source-inventory-u7472-2026-10-30` | 1 | 자료 후보와 당시 미확정 조건 |
| `hanja-source-inventory-u85da-2026-10-29` | 2 | 공개 출처 조사·당시 검토 준비 상태 |
| `hanja-source-inventory-u97e1-2026-10-29` | 2 | 획수 차이 조사와 원본 대조 한계 |
| `hanja-source-mapping-u821d-vs0-original13-2026-10-30` | 2 | 원본 fixture guard·위험 구간 관찰 snippet |
| `hanja-source-pen10-u83f0-k-assessment-2026-10-23` | 3 | 연결 prefix 증명·보고서·재현 도구 |
| `hanja-source-phase-u7e98-pen12-contact-2026-10-29` | 1 | 당시 strict support 검증 기록 |
| `hanja-source-raw-compare-u97e1-publisher20-2026-10-29` | 4 | 획수 차이의 비교 설정·가설·재현 도구 |

## 정리한 임시 파일 13개

아래 경로는 `docs/` 기준이다. 각 파일의 전체 경로와 파일 SHA256을 참조하는 기존 추적 파일이 없음을 확인했다. 남길 65개 안에도 삭제 파일의 경로·해시·동일 폴더 파일명 참조가 없다.

| 삭제 파일 | 대체 근거 |
| --- | --- |
| `hanja-authored-mm-u5b7d-components-2026-10-28/actual-H-v2-transform-observer.patch` | v2 임시 관찰 패치. 기존 `observer-matrix-fix.json`, v3 통합 패치와 최종 관찰 기록을 보존한다. |
| `hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/actual-H-integration.patch` | rebase 전 초안. 기존 `actual-H-integration.rebased-d2f7a3.patch` 및 최종 준비 기록으로 대체되었다. |
| `hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/actual-H-preparation.json` | 위 rebase 전 패치에만 대응하는 중간 준비 결과. `actual-H-rebase-final-preparation.json`을 보존한다. |
| `hanja-authored-sameglyph-u6adc-hkm-dr-v2-2026-10-29/batch1534-NOTICE-draft.md` | 출처와 라이선스는 기존 `batch1534-NOTICE.md`에 포함되어 있고 승인 관찰 기록도 연결되어 있다. |
| `hanja-display-contact-u55f8-u76cc-folds-2026-10-29/pending-extension/helper.pending.patch` | 기존 불변 helper의 계약을 바꾸는 금지된 초안. `scoped-extension/preparation.json`에 DO-NOT-APPLY 사유가 명시되어 있다. |
| `hanja-display-contact-u55f8-u76cc-folds-2026-10-29/pending-extension/preparation.json` | 금지된 확장 초안의 준비 결과. 후속 `scoped-extension` 준비·적용 기록을 보존한다. |
| `hanja-display-contact-u55f8-u76cc-folds-2026-10-29/pending-extension/tests.pending.patch` | 금지된 초안과 함께 사용하려던 테스트 패치. 후속 분리 helper와 적용 검증 기록이 존재한다. |
| `hanja-original-left-terminal-qb-preparation-2026-10-23/future96-u7c67/future96-left-dom.ts` | 독립 초안 복사본. 기존 `future96-dom.patch` 및 실제 적용 준비 기록을 보존한다. |
| `hanja-original-left-terminal-qb-preparation-2026-10-23/future96-u7c67/future96-left-policy.ts` | 독립 초안 본문이 기존 `future96-policy.patch`에 포함되어 있다. |
| `hanja-original-left-terminal-qb-preparation-2026-10-23/queued-u8627/future-left-dom.patch` | 대기 중이던 독립 모듈 초안. 기존 `left-dom-u8627.ts`와 제품 구현을 보존한다. |
| `hanja-original-left-terminal-qb-preparation-2026-10-23/queued-u8627/future-left-policy.patch` | 대기 중이던 정책 초안. 기존 `left-terminal.ts`·제품의 대상별 정책과 준비 기록을 보존한다. |
| `hanja-source-foot-u727c-preparation-2026-10-23/future94-helper-base92.patch` | base92 초안. 기존 `future94-helper-base93.patch`가 `future94-preparation.json`의 채택된 입력이다. |
| `hanja-source-foot-u727c-preparation-2026-10-23/future94-tsx-base92.patch` | base92 초안. 기존 `future94-tsx-base93.patch`와 적용 기록을 보존한다. |

이전 문서의 `pending-extension/` 언급은 삭제된 실험의 역사 설명으로 유지한다. 승인된 실제 입력을 가리키는 것으로 해석하지 않는다.

## 검증 범위

- 보존 JSON 42개 구문 분석, JavaScript 9개 구문 검사, Python 11개 AST 구문 분석: 실패 0. 스크립트의 외부 호출·engine capture·서버 실행은 하지 않았다.
- 보존 파일과 정리 대상의 원문 SHA256을 작업 전후 대조한다. 기존 추적 자료의 원문을 갱신하거나 과거 검증 상태를 승격하지 않는다.
- `public-world-combination-feasibility.json`의 기존 EOF 빈 줄 1개는 원문 해시 보존을 위해 유지한다. 해당 파일에만 `blank-at-eof` 검사를 제외하고, 나머지 공백 검사를 적용한다. 저장소 공백 설정은 변경하지 않는다.
- 빌드·전체 타입 검사·새 재생 관찰은 실행하지 않는다. 앱·등록 데이터 변경이 없는 자료 정리 작업이다.
- `lib/levels-stamp.ts`, 기존 Python 캐시 삭제 2개, 별도 시험 자료 문서와 `:memory:.ses`는 이번 작업에 포함하지 않는다.
