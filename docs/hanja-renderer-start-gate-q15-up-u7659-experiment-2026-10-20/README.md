# 癙 Q15 분리 기하에 결박한 세 시작 게이트 실험

새 source8의18p21m46 공개fixture를 직접 참조합니다. 원본source8·oldgate6·HOLD·NOTICE와 shared43·앱·registry는 바꾸지 않습니다. 실제full5/id3와 원engine8개 hash를 고정합니다. 원source/engine 호출과 renderer 기하/꼬리 파생은0입니다.

18획은 source 단계에서 원5polygon을4body+1UP로만 분리했습니다. body bounds/guide/폭/weight37.201503은 그대로이며 tailweight12.5가 추가되어 전체49.701503으로 timing이 증가합니다. 원46polygon은 exact-once이고 다른17획 및12·15획의 두Q필드는 모두 deepJSON 그대로입니다.

render.mjs는 oldgate6의 FIXED_STROKES를 새기하로 재결박하고, 원필드를그대로가진18m1 body-Q를 세번째exacttarget으로추가합니다. 원수식/클리핑math는변경하지않습니다. 원수식 R=P∩roundSweep(p)∩nestedStartGate(p), originalsingle-Q start/tangent/반폭, tau=min(1,revealWidth/Browser SVG getTotalLength(originalguide))는 변경하지 않습니다. Node Simpson 길이는 참고값이며 Browser 길이/래스터면적/coverage 증명이 아닙니다. 대상은12m2 raw13·15m2 raw15·18m1 raw16 body-Q만입니다. p=1·완료prefix·whole에서도 세Q의 fullroundsweep mask를 유지합니다. 각target12/15/18body P-minus-full-round-sweep 잔여 패널이 있습니다.

원oldgate6는 새기하를 거부했고 이검사는 source단계에서 단1회 통과했습니다. 새gate6도 기존미분리기하·타필드변경을 거부합니다. 양쪽 renderer 비교에는 같은 새기하를 사용하며 원미분리18획의 before/after 비교가 아닙니다.

이전root whole1호환 뒤18 fine99.99→100 오른후보 UPtip 약35px 추가FAIL과 STOP143(PID75056/port63698/session75822)은 config.previous observation에 보존합니다. 당시12·15 startgatecoverage/multi/방향/coarse/자연재생은0입니다. 이번 새조합의 native/runtime/coverage는false이며 root freshwhole·전18방향·fine18·모든multi12/15/18·각Qcoverage12/15/18body·각자연재생이 필요합니다. 이준비는 승인증거가 아닙니다.

helper는 기존공개fixture와 고정국내자료를 RAM으로 사용합니다. root가 실행할 때만 국내SVG를 불러오며 startup/GETsourcecompile0·engine0입니다. 국내→같은기하의shared43→새gate 세SVG520, coarse9개220, 0/epsilon.0001%/95/99.99/100, 모든multi경계직전/경계/직후, 8초자연재생 및Q12/Q15/Q18body 잔여패널을 제공합니다. 이작업에서 UI/서버/HTTP/앱/build/Git은 실행하지 않습니다.

초기 두Q 결박검사는 양성1/음성48·882monotone로 통과했습니다. 추가18body 한정검사는 `node check.mjs --added-target-only`로 새math/음성/렌더조합을 검사하고12/15의 통과math를 반복하지 않습니다. 일반 `node check.mjs`는 세target 전체를 재현할 수 있으나 이번작업에서는 실행하지 않습니다.
