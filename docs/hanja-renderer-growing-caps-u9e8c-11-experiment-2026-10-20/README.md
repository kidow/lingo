# 麌11획첫mask · butt prefix + growing caps 격리 실험

새순서고정source의18p20m48/SHA d697a545504cc475de264b657c28f9b5b857278e4813c4ebf3c96dba2c37464d를참조합니다. 원fixture는복제하지않고원outline/guide/폭14/weight/필순/UPtail은수정하지않습니다. 기존order renderer6와source8을고정하며원render.mjs 전체13417바이트를새모듈앞부분에그대로보존합니다. 그러므로9획둘째Q의기존circleOR함수/fields/동작은그대로입니다. 새display분기11획첫mask만추가합니다.

## 새표시정책과엄격범위

원guide `M61.5 30.4 L61.5 42.2 Q61.5 47.2 66.5 47.2 L90 47.2` 및정확전체strokes/maskguard를사용합니다. 첫L길이11.8≥r7,전체L≥r,두L/Q접점의단위접선일치/정규Q를검사합니다. linejoin은기존miter를유지합니다. d=min(pL,L),rho=min(r,d),표시mask는원guide의butt dashprefix(p)와circle(q0,rho),circle(q(d),rho)의합집합입니다. q0는원M,q(d)는동일한원guide의브라우저getPointAtLength(d)입니다. 이점은표시용측정값이며새source좌표/path/connector를생성하지않습니다.

같은연결된DOMpath에서실제getTotalLength와getPointAtLength를읽고같은p·원guide의dash와원을한SVG문자열로동기구성합니다. pathLength1은dash에만사용하고길이/점API는user units를사용합니다. 화면밖visibility:hidden 측정SVG1개가추가되며.pair3개실제패널과구별합니다. 별도React/SSR앱통합은이번범위가아닙니다.

p0는명시적으로target비표시합니다. p1/완료prefix/whole은이전확정fullroundmask함수의반환문자열을그대로사용하고원P를unmask하지않습니다. 최초r만큼은직선이므로면적상한2rd+2πd²→0이며시작원/끝원은반경d가늘어중첩됩니다. r이후는원fullradius stroke와같아현재정규LQL에서이상집합은단조·면적연속입니다. 원P와교차전mask는연결되지만교차후잉크연결성은보장하지않습니다.

## 한계와반례

L<r이면완료반경이r에못미치므로거부합니다. 최초r안에서급꺾임이나cusp가있으면같은연속성주장을하지않습니다. 예:r1/첫직선.25후90도꺾임의roundjoin은π(1-.25²)/4면적을갑자기추가할수있습니다. 이원본은첫L11.8과G1접점guard로해당반례를피하지만다른한자승인을상속하지않습니다. 실제AA/alpha면적·BrowserLength/곡선점정밀도·화면상흰틈/연결성은rootfresh검토대상입니다. NodeQ수치적분·원guide참고끝점계산은UA측정을대신하지않습니다.

## root전용검토

python3 docs/hanja-renderer-growing-caps-u9e8c-11-experiment-2026-10-20/serve.py --target u9e8c --port 0

- /progressive?stroke=11 : 가운데shared43/오른쪽새growingcaps. oldgate=1이면가운데이전circleOR로비교합니다.
- /whole?oldgate=1 : 기존fullround와새fullround의전체자형대조.
- /progressive?stroke=11&coverage=11 : 두패널각P-minus-old/new-fullround 빨간잔여. coverage=9는변경없는9mask의잔여입니다.
- coarse=1 : 각220px9단계.
- rho=r와firstL-end before/at/after버튼은실제BrowserL에서local진행률을구하고11첫maskweight비율로전체획진행률에변환합니다. 기존multi9·11/0/epsilon.0001%/95/99.99/99.999999/100버튼과8초재생도유지합니다.

기존HOLD2의natural11 start2.60375000%흰틈+분리섬FAIL과100완료일치/STOP143은그대로보존합니다. 새native/runtimefalse이며앱/lib/shared43/registry/기존스냅샷/evidence/HOLD/source변경0,sourcegeometry/compiler/engine0,UI/server/Git/build0입니다.

커밋메시지: test(hanja): isolate 麌11 growing-cap display policy
