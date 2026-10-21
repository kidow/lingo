# 湺 실제 StrokeOutlines 격리 검토

원12p13m23/23polygon, geometry 643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6, actualfull5/id3 원본을 그대로 씁니다. 원 APP 3파일을 고정한 snapshot resolver로 읽고 RAM CJS/ESM transpile하여 실제 StrokeOutlines를 SSR/hydrate합니다. 가짜 renderer로 APP를 대체하지 않습니다. source/compiler/factory/engine/registry 실행0입니다. 기존 glyph는18 frozen resolver를 참조하고 재복제하지 않습니다.

## 실행 (ROOT 전용)

`python3 docs/hanja-component-growing-source-clip-u6e7a-harness-2026-10-21/serve.py --port 59412`

서버는 저자가 실행하지 않았습니다. startup의 RAM transpile/vendor/SSR 준비는 UI서버 prerequisite이며 기존 테스트 재실행이 아닙니다. 검토 뒤 tab 먼저 닫고 정확 session/PID만 종료하세요.

## 제어와 증거

whole idle/done와 정확 manual prefix0/3/6/7/12, 각12획, global/local0·1e-6·.95·near1·1, 4MQ rho, native7 H/V 분기 probe, QQ3 경계3, coarse9 후보220 및 compact9 후보150(reference숨김), 8초 재생/pause/resume/replay를 제공합니다. clock은 실제 StrokeOutlines API에 전달하는 격리 controller이며 제품 StrokePlayback 전체 UI 승인을 대신하지 않습니다.

매RAF status는 root와 sample각5target을 pen+mask 키로 유일조회하고 원 DOM L/q와 canonical d/rho 또는 sourceclip phase/alpha/rect, cleanup/complete 속성을 드러냅니다. near1는 exact1/fullround와 구분됩니다. float clock global1이 targetlocal1과 같다는 보장은 하지 않으며 whole/manual 완료가 별도입니다.

4MQ의 coverage는 원P-minus-original-fullround입니다. 7 원P-minus-같은완료P는 tautology로 라벨링하며 coverage 증명으로 취급하지 않습니다. 기존7 originalfullround 잔여도 별도버튼으로 보존합니다. 새원P·guide·width·weight·연결자·기하 생성0입니다.

## 검증과 미승인

새 snapshot 바이트/입력핀·strict resolver 음성·원 full5/전체source·resource SSR6/5target partials·새 phase/prefix 및 reporter/route 계약만 최초검사합니다. 이전 APP8/actualtarget3·ordinary72·원source/곡률 산술은 재실행하지 않습니다. 실제hydration·DOM정상 UA·QQ3 연결성·방향·natural·제품APP·runtime 승인은 ROOT 후속이며 현재 false입니다.

APP 작성이력: 최초 test fixture root u6e7a 누락으로 prerequisite8FAIL, 해당키만 교정후 실패8복구PASS; 후속컴포넌트 변경과 독립되도록 지문검사1을 원5maskSHA 계약으로 치환후 해당1PASS; 실제 TSX 새3 FIRSTPASS. 이 도구는 그 기존검사를 반복하지 않습니다.

## 준비 실패/복구 이력

첫 준비에서 snapshot43음성·입력/source guards 통과 뒤 timing 선언이 파일 첫16KB 밖이라 리소스 준비 전 실패했습니다. 정확3선언을 bounded chunk scan으로 읽도록 교정했고 snapshot/입력검사 prefix는 반복하지 않았습니다. 복구에서 resource SSR6 + phase/prefix SSR7,5target·25material negatives·oldchild 역복원은 통과했지만 reporter의 runtime prefix+distance 구성이 정적 literal 검사와 불일치하여 중단했습니다. canonical data-growing-distance를 명시하고 reporter 이후7route음성 tail만 복구PASS, SSR/resources 반복0입니다. 별도 실제 reporter 함수 mock5양성/20음성(거리 missing/empty/bad·중복 target)도 첫PASS이며 UA/mock은 브라우저 승인이 아닙니다.
