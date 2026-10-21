# 湺 실제 StrokeOutlines 유한 native 관찰

ROOT가 고정 APP3를 RAM transpile/hydrate한 격리 하네스를 검토했습니다. 실제 제품 StrokePlayback·전체 workflow UI·자동재생·runtime 등록 승인은 아닙니다. 원12p13m23/23polygon 및 full5/id3, geometry `643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6`와 모든 원 source/renderer/guide/width/weight는 변경0입니다. 기존 source/snapshot/HOLD의 false 기록도 수정하지 않습니다.

## 확인한 범위

유효 사진은 38장입니다: 초기 idle 전체1, 5target local1e-6 각1=5, near1 각1=5, HV 경계3, QQ 경계3, prefix7/done/idle/replayzero4, 자연 pen3 8, resume7, natural-ended/replay2. 잘못된 괄호의 CUA 호출2회는 UI동작0/증거0으로 제외했습니다.

읽은 상태는 hydrationReady=true, errors=[], 5target bad=[], 관찰한 sameFrame 각키 true였습니다. 최종 natural-ended p1과 root/sample bad=[]도 확인했습니다. 별도 dev.logs warn/error limit10 조회는 빈 배열이며 전체 console 전수감사 주장은 하지 않습니다.

local1 5대상은 DOM 전용 관찰입니다. 1m1/3m1/7m1은 p1 완료였으나 2m1=.9999999999999998,3m2=.9999999999999997은 clock float로 partial이 남았습니다. 이 둘을 exact1/fullround 통과로 세지 않습니다. 반면 정확 prefix7/done/idle에서는 전5target p1·partialnull, 4MQ 원fullroundmask와7 원Pdirect(mask/clip-path 속성없음)를 실제 확인했습니다. local0/replayzero는 선행획은 유지하고 현재 선택획만 미표시하며, 전체빈화면이라는 뜻이 아닙니다.

HV 실제 b=.5112504552906836, 원 UA L54.21999740600586: minus는 H α.9999999229354084, at/plus는 V α7.197542010613207e-8이었습니다. 실험단독 b와 동일하다고 하지 않습니다. QQ b=.3838421566818278: at의3m2 localp=2.385330638171012e-16,plus=1.622963064007302e-10으로 exact0을 주장하지 않으며 관찰한 연결부의 분리섬은 보지 못했습니다.

자연 pen3은 첫사진 p미기록+기록7장(.15573749999404027,.1880249999940388,.2243874999940381,.257812499994041,.289062499994041,.3222749999940388,.3640749999940381)입니다. pause p.4066749999940403이 후속에도 같아 안정됨을 확인했습니다. resume은 첫사진 p미기록+기록6장(.558125,.5914000000000015,.6247625000000008,.6591000000000022,.6894249999999993,.7238125), 후속 natural-ended p1 사진1 및 replay p.061849999994039534 상태/사진1입니다. 전체 RAF·연속8초 영상·모든 구간 단조성·AA·전체 제품UI의 검증으로 확대하지 않습니다.

## 종료와 고정입력

ROOT 서버 PID53113/port59412/session79661은 Ctrl-C exit130/output0 후 ps부재로 종료했습니다. 남긴 소유서버는 없습니다. snapshot7+harness6 직접13 SHA를 review.json에 결박했고 기존101 입력핀은 해당 고정 하네스를 통해 참조합니다(기존 검사 재실행0). 새2 metadata/JSON/핀 확인만 수행합니다.
