# 湺7 원P clip 다음 정책 검토 — QQ3와 분리

이 문서는 원자료와 기존 관찰을 읽은 정책 검토다. **새 산술·renderer·guide·폭·polygon·source mask·APP 구현은0**, native/APP/runtime 승인false다. 원source12p13m23/geometry `643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6`,7m1 mask `1f7c593b97516e4e19525ac968f9cbb8132163beff3ab101b32cc80ce190b185` 및 기존 HOLD는 불변이다.

## 서로 다른 문제 두 가지

湺7은 하나의 MLL mask에 H/B/J가 들어 있는 H→V다. 정확 내부 witness 산술은 원fullround width14 밖에 원body의 열린 영역이 있음을 보였다. 이번 ROOT native에서도 marker 없는 잔여의 수직foot 좌하단 검정 삼각형이 보였다. native L54.21999740600586/point(83.73999786376953,40)는 같은 연결된 원path API값이다. 면적·픽셀수·정확 인과·연속 sweep를 확정한 것은 아니다. 이 고정 fullround를 완료 mask로 그대로 유지하면서 원P 전체를 보존한다는 계약은 성립하지 않는다.

綎의 새 혼합 renderer는 단일11 원P clip의 유한 시작·전환·완료·coarse9·자연 start/end에서 개선 관찰을 얻었지만, **별개 pen1의 독립 QQ가 global.625/220px에서 흰 빈틈과 작은 별도 잉크 조각을 보여 전체 renderer는 HOLD**다. 해당지점520 확대나 universal 원인 판정은 없었다. 이를 綎11 clip 실패로 확대하거나 湺7 HV와 같은 원인으로 묶지 않는다. 동시에 綎11 유한 관찰을 湺7의 native 승인으로 승계하지 않는다.

## 권장 범위 하나: 湺7m1만 원P 직접 clip 후보로 별도 설계

기존 source-analysis의 계산 결과를 재계산하지 않고 사용한다. 원H+상단corner S는 공통직사각형 면적3으로 연결되고 수직단면이 한 interval이다. 원 V-body B는 볼록하며 그 위쪽 edge는 J 안이고 B0는 J의 엄격내부다. 따라서 H 구간에 S의 x-sublevel, V 구간에 S와 B의 y-sublevel을 조합하는 원P 보존 안에는 이상집합의 접촉·포함관계·면적 연속 조건이 있다. 원polygon 절단 결과를 새 source로 저장하거나 connector를 만들라는 뜻이 아니다.

하지만 H 중 J를 완성하고 guide 끝y40까지 진행하는 동안 원B 끝y47까지 공개하는 새 내부 공간배분이다. 원 guide `M56.019999999999996 13.5 L83.74000000000001 13.5 L83.74000000000001 40`/width14/weight54.22/전체 source 시각계약을 바꾸지 않아도 국내 시간방향이 같다는 보장은 없다. 기존 roundmask 완료를 유지하는 안도 아니므로 p1/whole/prefix에서는 원P를 직접 표시하는 독립 표시계약이 필요하다. 기존 fullround coverage FAIL은 그 계약에서 지우지 않는다.

구현 전 남은 조건은 실제 UA 단계전환이다. 고정 원d의 같은 연결 path에서 얻은 같은 frame의 L/point·owner/document/transform 안정성을 사용해야 하며 source weight나 유리수 길이를 UA L로 쓰면 안 된다. 원 source x=83.74000000000001와 실제 endpoint x=83.73999786376953가 다르므로 exact source decimal/분수 공선성/임의epsilon으로 정상 UA를 거부하거나 몰래 경계로 끌어맞추지 않는다. 반대로 finite API값이라는 사실만으로 clip의 단계·단조성·시간대응이 증명되는 것도 아니다. 양자화된 코너 앞/at/후의 일관된 분기·진행정규화 계약이 아직 필요하다. 이 부분이 미정이면 구현준비 완료나 연속성 승인으로 올리지 않는다.

미래 별도 실험에서 whole geometry/7m1/allfields·원H/B/J·MLL 문법을 exact 결박하고 다른11획은 원표시 그대로 둬야 한다. 선택7의0/epsilon, H/V전환 전·at·후, near1/실제exact1, whole/prefix, coarse·native start/end를 실제 target에서 봐야 한다. p1에서 원P 직접표시와 clip 제거 상태를 구분한다. **P-minus-same-P가 흰 것은 자명하므로 coverage 증거로 사용하지 않는다.** 원fullround 잔여는 원한계 비교자료로 남기고, 새clip의 중간 누락·분리섬·마지막 jump를 별도 관찰한다. 원guide·폭 확대·새좌표·기존 terminal guard 차용은 제안하지 않는다.

## 물변 QQ3는 별도 필수 gate

원 pen3은 두 독립 Q mask이며 원source metadata에 raw pair[2,3], exact raw gap[-18/5,-34], connector=false/guideJoined=false가 기록되어 있다. guide는 각각 `M7.04 66.5 Q19.64 71 18.2 92`와 `M16.4 75 Q17.84 69 32.96 33.5`다. 각 width14/weight27.83515·44.682028도 그대로다. 원캐시 global 경계는 .3838421566818278이다. 기존 source HOLD에서3m2 after의 finite cap은 실제 FAIL이므로 같은 정책 재관찰로 해결을 주장하지 않는다.

7m1 원P clip은 이 gap과 QQ3 표시시간을 전혀 해결하지 않는다. QQ3의 새 source-bound 정책을 별도 승인받는 경우에도 개별 시작면적0·regular 초기곡선·fullcoverage만으로 P교집합의 두 mask 사이 연결성을 보장할 수 없다. 시작/경계와 함께 이른·중간 coarse(특히 두번째 mask가 막 공개된 구간)에서 현재후보와 원표시/국내 기준의 실제 연결성·시간대응을 확인해야 한다. 綎 .625를 湺에도 동일실패지점이라고 정하지 않으며 새로운 임의 gap connector·guide 연결·outline 절단을 넣지 않는다. 아직 QQ3의 새 정책이나 연결성 승인은 없다.

결론은 **단일HV7의 원P clip을 한정 후보로 계속 검토하되 UA 단계계약부터 명확히 하고, QQ3는 독립한 실패·검증 큐로 유지하는 것**이다. 다른 시작HOLD1/2·물변전체·전12획·APP/runtime을 이 문서로 승인하지 않는다. ROOT만 향후 서버/native를 실행하며 이번 저자 HTTP/UI/server/Git/build/TSC/compiler/factory/engine/projection/산술 재실행0이다.

## 고정 근거와 확인

초회 새 문서 메타에서 입력7핀 중 綎2의 동시변경을 감지해 실패1회가 있었다(문서 단언 도달0). 변경은 ROOT의 서버 포트 null→59412 보완뿐이고 관찰·정책 내용은 같았다. 해당2핀만 최신값으로 갱신한 실패꼬리에서 변경2핀과 미실행 문서메타를 확인한다. 앞서 일치한5핀 반복0, 산술·원검사 재실행0이다. 기존 분석·coverage/native 기록·source·Tin renderer/HOLD 파일은 저자가 변경하지 않는다.

| 입력 | SHA256 |
| --- | --- |
| `docs/hanja-u6e7a-pen7-terminal-source-analysis-2026-10-21/README.md` | `2b0c70ec00aa871e8050820e14f943ac2e218de57cf84f78945e726c33b40e2e` |
| `docs/hanja-u6e7a-pen7-terminal-coverage-native-2026-10-21/README.md` | `b50e9d777d78e6c61eda3eafc3f5e768b355db137c34188c54d35234a88c8833` |
| `docs/hanja-u6e7a-pen7-terminal-coverage-native-2026-10-21/review.json` | `826387aae60de4c9de368caf1a5a5e46ef55237fc617cd45e0fb9d19dfea2848` |
| `docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/README.md` | `93b1562404186b6746c764c68d1fc9c319688957fdfea0ef5f4ec97d0df5e363` |
| `docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/review.json` | `43cff5019266b20a807b9106f565da1b7aab7bfb6c78c113e66fd3a135357bb7` |
| `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/config.json` | `aae777e3fd0680c43e6e0aade49749bc120b7f727292e3ae555cb827777a1a92` |
| `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/fixtures.json` | `247767960d239c885d98e1975f0774de34fac914ab1a9402bcf602d78e8f8aa4` |
