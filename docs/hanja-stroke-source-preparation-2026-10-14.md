# 한자 필순 작업 상태 — 2026-10-14

최신 실제 목록 집계: 전체 5,978자, 적용 5,469자, 미적용 509자. 이번 자료 준비 작업은 적용 수에 포함하지 않는다.

| 미적용 급수 | 글자 수 |
| --- | ---: |
| 1급 | 61 |
| 2급 | 1 |
| 특급II | 85 |
| 특급 | 362 |

## 화면을 사용할 수 없는 동안 진행한 작업

- 970–1126 구간의 실제 153개 후보에 원본 해시, 기존 출처 검증의 범위, 엄격한 호출 조건, 확대 검토 항목과 재시작 절차를 기록하고 후보별로 커밋했다. 1063·1064·1093·1094는 없는 폴더이므로 만들지 않았다.
- 俴·驖·顣·茷·諴·餼·甁 7자에는 원본에 따로 존재하는 마지막 윤곽을 같은 획 안에서 재생하는 별도 후보를 준비했다. 원본 좌표·경로·폭·순서와 기존 보류 판정을 유지했다. 俴은 새 후보의 화면 검토를 통과하여 적용했고, 나머지 6자는 미승인이다.
- 暻·蕙·諪·錞·錡·擎·漌·璲·磎·篒 10자에는 구형 자료의 원본·전체 경로·명시적 출처 관계를 검사하는 별도 계약과 기록을 만들고 개별 커밋했다.
- 이 10자 중 漌은 기존 원본 재현 프로그램과 저장된 실행 결과를 확인했다. 나머지 9자의 엔진 재현 근거는 미확인 또는 선언 수준으로 분리했다. 로컬 검사 통과를 원본 재현이나 필순 승인으로 표시하지 않는다.
- 빌드, 배포, 푸시는 실행하지 않았다. 다른 세션의 변경과 스테이징은 커밋마다 보존 여부를 확인했다.

## 다음 실제 화면 검토

916 遄의 전체 자형 6개, 국내 방향 13획, 중간 화면 117개를 실제로 확인했다. 확대 8획, 7·13획의 마스크 경계와 실제 재생도 모두 통과하여 13획 애니메이션을 적용했다. 917 幝의 보정된 국내 방향 15획, 중간 화면 135개, 확대 4획, 2획 마스크 경계 및 2·11획 실제 재생도 통과하여 적용했다. 918 俴의 원본 마지막 윤곽 후보도 전체 10획·90개 중간 화면·9획 확대·2곳 경계 및 실제 재생을 통과하여 적용했다. 이전 후보의 보류 기록은 유지한다. 919 歠의 보정된 19획·171개 중간 화면·15획 확대·13획 경계 및 13·19획 재생 검토도 통과하여 적용했다. 다음 순차 검토 지점은 920 驖이다.

920 驖은 새 후보의 전체 23획 방향·중간 화면·확대·재생 검토가 남아 있다. 920 驖에는 별도 마지막 윤곽 후보를 검토하는 새 서버를 준비했다.

사용자 응답 후 새 검토 탭 142에서 1280×720 화면과 실제 버튼 조작을 복구했다. 이전 검토 탭의 0 크기 상태는 해결된 것으로 기록한다.

관련 진행 기록: [916 화면 검토](hanja-goal-glyphwiki-batch916-2026-10-13/review.json), [915 보류](hanja-goal-glyphwiki-batch915-2026-10-13/README.md).

## 남은 자료의 구분

미적용 509자는 전체 자형 파일 묶음이 있는 411자, 구조 정규화나 일부 구성 자료 확인이 필요한 89자, 다른 교재·사전의 보류 기록에 대응되는 9자로 구분했다. 89자를 모두 구형 자료나 출처 없는 글자로 단정하지 않는다. 새 계약을 만들었다고 기존 자형·방향·재생 보류가 해결되는 것은 아니다.


## 921 襜 완료

18획·162단계,9개곡선 및2끝윤곽 확대,11획마스크 경계·92%중간,11/2실제재생 PASS. 원본 metadata/NOTICE 보존. 5,469적용·509미적용. 920 驖은 3~5및14~23획 순서보정 v2 최종검토 대기. 빌드·전체검사 없이 진행.

## 920 驖 최종 v2 완료

국내3~5및14~23순서에맞춰 원본 complete masks만 순열보정. 23획·207단계/10곡선fine/3terminalfine/6및21경계와95%,94%중간/21·6실제재생PASS. 원27파일 metadata,NOTICE및v1후보보존. 5,469적용·509미적용. 다음922餂15획(14획끝윤곽우선),923禘14획. 빌드없음.

## 922 餂 보류

5whole대조/15국내방향(4~7source순서보정),14획9단계및520px99.99→100하단발끝45pxcrop에서완성pop확인. 원vertex[163.2,183]가radius14source밖15.267223. 3compatiblewhole같은끝경로. 경로·폭변경0/런타임미적용/원metadata와NOTICE보존. 5,469적용·509미적용,새보류254. 다음923禘14획. 빌드없음.

## 923 禘 완료

14획·126단계/6곡선fine/12·13terminalfine/13경계96%중간/13·11실제재생PASS. 원metadata/NOTICE보존. 적용5,469·미적용509,특급362. 다음924蝃14획,925遆13획. 빌드없음.


## 2026-10-14 蝃 native 완료

蝃(batch924) 14획·14마스크·32원본 다각형 적용. 국내 자료를 보고 원본 전체마스크 9–12 순서만 보정. 전체2종·14방향·126단계·11확대 fine·2fold끝점·14/2 실제 재생 PASS. 원본16파일/metadata/NOTICE 불변. 누적5470/5978, 미적용508. 다음遆대체전체형 검토 및揥12획. 빌드/전체검사/엔진재실행/배포없음.


## 2026-10-14 揥 native 완료

揥(batch926) 12획·14마스크·33원본 다각형 적용. 전체4종·12방향·108단계·7확대 fine·3terminalfine·2/11꼬리 경계 및96% 연결·11/2 실제재생PASS. 원본metadata/NOTICE 유지. 누적5471/5978, 미적용507. 遆(925) 기존g자형/순서는부적합, var001 별도후보native미승인대기. 다음927/928/929 원본대조. 빌드없음.


## 2026-10-14 遆 보류

6전체형 native비교에서g/var001의one-dot辶 불일치 확인. 초기var001compatible보고정정. Base/jv전체는맞지만exact최소14와dom13차이, raw4/5 gap[-1.99,-2]의동일획근거미확인. 미관찰frames/fine/replay 승인0, 원본유지. 누적5471/미적용507, 보류255. 다음927塚/928潨.


## 2026-10-14 塚 보류

Actual previous source reproduction failed:126.8072221933106 vs126.80722219331061; do not round or regenerate. Catalog13/domestic12. Native two complete source variants g/k observed, their extra internal dot differs; other11notfullyobserved. 원본metadata/NOTICE유지, 새geometry0/재생승인0. 누적5471/5978·미적용507·보류256. 빌드없음.


## 2026-10-14 潨 보류

Native all3whole observed;g/base overallforms compatible,VS0 bottom component differs. Native domestic3/raw3 and4 diagnostic shows same domestic pen split into disjoint original commands; consecutive exact minimum16>domestic15. No original-path connector or same-pen native reveal exists. Filled contact not measured; do not claim permanent impossibility. 원본metadata/NOTICE유지, 새geometry0/재생승인0. 누적5471/5978·미적용507·보류257. 빌드없음.


## 2026-10-14 凗 보류

Native sole whole observed compatible. Stored source grouping [8,14] is nonconsecutive; original raw8 leftV and raw14 laterbottomH cannot be joined from count alone. Raw9/domain8 diagnostic inspected without correspondence approval. No compiler runtime candidate. 원본metadata/NOTICE유지, 새geometry0/재생승인0. 누적5471/5978·미적용507·보류258. 빌드없음.


## 2026-10-14 鄹 native 완료

K원본鄹(batch930) 17획·18마스크·37원본다각형 적용. 全3종/K17방향/153단계/10확대fine/2terminalfine/16경계95%/16과9실제재생PASS. 귀 耳 전체mask순서만보정,原geometry/metadata/NOTICE 유지. 누적5472/5978·미적용506·보류258. 다음萑12획보정후보검토. 빌드없음.


## 931 萑 runtime review · 2026-10-14

- Whole VS2 matches domestic form; 9 source routes / 8 distinct images, VS1 resolves to VS0 alias.
- All 12 domestic directions and 108 progressive frames passed. Same-position 45 frames reused after exact mask SHA validation; 63 corrected frames newly observed.
- Fine 5/7, original terminal 6 and corrected 11, and actual replay 5/11 passed.
- Complete source masks reordered [1,2,4,3,5,6,7,9,10,11,8,12]; 12 pens / 12 masks / 25 polygons. Geometry and raw empty row unchanged.
- Original metadata and NOTICE bytes preserved; source verifier reused without reexecution. No build.
- Runtime: 5,473 applied / 505 remaining; next 932 緅, then 933 棸.


## 932 緅 held · 2026-10-14

- Both complete source profiles viewed; whole shape compatible.
- Strict consecutive minimum 16 > domestic 14; unrestricted matching lower bound 15 is not a usable 14-pen compiler.
- No candidate compiler, direction approval, progressive frames, fine or replay. Original 13 files byte pinned; no forced joins.
- Existing source PASS/8 engine files reused; no build or engine rerun.
- Runtime remains 5,473 / 505; next 933 棸.


## 933 棸 runtime review · 2026-10-14

- Three whole forms viewed: base and -01 compatible; var-001 shared top form differs. Base selected.
- All 12 domestic directions / 108 progressive frames passed. Unchanged 8 pens / 72 frames reused only with exact complete mask SHA; corrected 3–6 newly observed 36 frames.
- Fine 5/7/8/11/12, original terminal 6, actual replay 7/5 passed.
- Complete masks permuted [1,2,4,5,6,3,7,8,9,10,11,12]; 12 pens / 12 masks / 21 polygons. Original metadata and NOTICE untouched.
- Original source PASS8 reused, no engine rerun/build. Runtime 5,474 applied / 504 remaining; next 934 麤 then935 鵻.


## 934 麤 held · 2026-10-14

- Native whole 3 profiles viewed; source-form eligibility not approved. var-001 upper dot/shared horizontal differs.
- All source profiles strict consecutive minimum 36 > domestic33 (39 raw / 48 draw calls, 99/99/96 original polygons).
- No active compiler/progressive/fine/replay. No forced grouping or same-pen assumption.
- 16 existing files byte pinned; metadata and NOTICE unchanged. Prior source PASS/8engine reused; no build.
- Runtime remains 5,474 applied / 504 remaining; next935 鵻.


## 935 鵻 runtime review · 2026-10-14

- Whole base/VS0 compatible; base selected. All19 directions and171 progressive frames passed.
- Unchanged16pens/144frames reused only after exact mask SHA; corrected16–18 newly observed27frames.
- Fine1/3/7/8/9/10/11/12/14, terminal1/13/18, native tail7 boundary before/at/after and95% connected reveal passed. Actual replay7/18 completed.
- Whole-mask permutation [1–15,17,18,16,19];19pens20masks40polygons. 原7tail [64.852726,8], .8901894213265267 preserved.
- All16 original files/metadata/NOTICE byte unchanged; full5 proof+2arg primitive and original explicit5Upper identity retained. SourcePASS8 reused, no build.
- Runtime5,475 applied /503remaining; next936縐 then937蓫.
