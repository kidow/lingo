# 湺7 원P terminal coverage와 보존형 clip 조건

원자료를 읽은 이상기하 분석이다. 원 source/renderer/APP·polygon·guide·폭·weight·순서·mask 수는 변경하지 않았다. **실제 湺 coverage 보드 관찰은 0이고, 새 native/APP/runtime 승인도 false**다. ROOT의 기존 near1→p1 끝모양 차이 HOLD(809288663de9e995a33f091cace3f690bf7cc7c9)를 수학 분석으로 덮거나 인과를 확정하지 않는다.

## 고정 원형

source는 `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/`, 12p13m23, geometry SHA256 `643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6`다. actual full5는 batch1087의 engine-proof.json/id3(sourceRoot=u6e7a, sourceProofFile=engine-proof.json, sourceProofFileSha256=ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9)이고 다른 variant/header를 합성하지 않는다. 단일 7m1의 JSON SHA256은 `1f7c593b97516e4e19525ac968f9cbb8132163beff3ab101b32cc80ce190b185`, direction=curve, width14/r7, weight54.22, bounds[56,10,89.2,47]다.

원 guide 원문은 `M56.019999999999996 13.5 L83.74000000000001 13.5 L83.74000000000001 40`다. 긴 decimal을 56.02/83.74로 바꾸지 않았다. A=(56.019999999999996,13.5), G=(83.74000000000001,13.5), E=(83.74000000000001,40)이며 H 길이는 13860000000000007/500000000000000, V 길이는 53/2다. 이는 source 좌표식이고 UA 전체길이나 시간경계 측정값이 아니다.

원 outline의 세 polygon을 설명상 H/B/J라 부를 뿐 새 분할이나 source mask가 아니다.

- H=[(56,12.5),(83.7,12.5),(83.7,14.5),(56,14.5)].
- B=[(86.7,13.5),(86.7,44),(80.7,47),(80.7,13.5)].
- J=[(80.7,12.5),(83.7,10),(89.2,14.5),(86.7,16.5),(80.7,13.5)].

P=H∪B∪J다. 原trace zero raw8은 H cdDrawLine [112.03999999999999,27,167.48000000000002,27,2,2], raw9는 V cdDrawLine [167.48000000000002,27,167.48000000000002,80,22,23]이다. raw9의 첫4점 B에 아래 foot이 포함되고 마지막5점 J는 **상단 corner**다. 따라서 마지막 polygon을 terminal UP/LEFT quad로 보고 기존 guard를 빌리거나 tail로 분리할 근거가 없다.

## 정확 유리수 반례 — 원 full-round r7은 P 전체를 덮지 못함

새 산술은 source 원 decimal을 유리수로 해석해 미실행 계산 1회만 수행했다. 엄격내부 witness W=(81,234/5)=(81,46.8)에 대한 B의 순서대로 edge cross는 [3477/20,3/10,201/20,999/5]로 모두 양수다. W는 단순 경계 vertex가 아니라 B의 엄격내부다.

W.y>40이므로 마지막 세로 segment의 최근접점은 E다. 거리제곱은

`537476000000000548000000000001/10000000000000000000000000000`

이며 53.7476보다 크고 r²=49보다 엄격히 크다. 첫 H segment까지 거리제곱은 110889/100>49다. H/V의 round/miter join과 첫 cap은 y≤41/2=20.5 안에 있어 y=46.8인 W를 덮지 않는다. 마지막 round cap도 앞 거리 반례 때문에 W를 덮지 못한다. 따라서 W 주변의 작은 열린 영역도 P 내부이면서 전체 원 round/miter width14 stroke 밖이다. **이상집합의 P-minus-fullround에 양의 면적 잔여가 존재한다.** foot vertex(80.7,47)의 거리제곱 582416000000000608000000000001/10000000000000000000000000000>49도 보조값일 뿐 내부 W 반례가 핵심이다.

이 결과는 실제 UA stroke/raster·AA의 화면 잔여를 측정했다는 뜻이 아니다. ROOT는 湺의 99.99/99.999999/100에서 끝형태 차이를 보았으나 coverage는 미실행이다. 앞선 綎11 문서의 실제 검정 삼각 잔여와 UA L45.87373352050781/endpoint(43,44.5)는 **綎만의 관찰**이며 湺로 승계하지 않는다.

## 원형 보존 halfplane clip의 제한된 가능조건

綎의 두 단계 clip 아이디어를 그대로 guard로 차용하지 않고 이 원P에서 필요한 접촉만 새로 확인했다. H/B/J의 연속 삼점 cross는 각각 [277/5,277/5,277/5,277/5], [183,201,201,183], [109/4,89/4,39/2,6,3]으로 모두 양수여서 각각 엄격볼록이다.

S=H∪J는 원 직사각형 [807/10,837/10]×[25/2,27/2] 전체(면적3)를 공유한다. x 중첩구간의 수직단면은 이 공통 y구간을 포함하므로 S의 각 수직단면이 하나의 interval이다. B의 위쪽 edge 전체는 J 안에 있고, B0=(86.7,13.5)에 대한 J edge cross [18,23/4,15/2,18,6]은 모두 양수다. B0는 J의 엄격내부다.

이에 따라 아래 **미구현 표시계약 후보**는 이상집합 수준에서 검토할 수 있다. 원 polygon의 좌표를 바꾸거나 새 connector를 넣는 안은 아니다.

1. 원 H 진행점 q가 A→G에 있을 때 αH=(q.x−A.x)/(G.x−A.x), hH=56+(166/5)αH로 두고 S∩{x≤hH}만 보인다. B는 아직 숨긴다. αH=0은 면적0 경계선이고 p0는 명시적으로 빈 현재획, αH=1은 S 전체다. 포함관계로 증가하고 최대 높이13/2에 의해 면적변화≤(13/2)|ΔhH|이며 H/J의 공통 단면이 접촉을 유지한다.
2. 원 V 진행점 q가 G→E에 있을 때 αV=(q.y−27/2)/(53/2), hV=27/2+(67/2)αV로 두고 S∪(B∩{y≤hV})를 보인다. B는 볼록하고 그 top edge는 이미 S 안이며 B0가 J의 엄격내부여서 새 얇은 strip이 S와 접촉한다. 최대 B 폭6이므로 면적변화≤6|ΔhV|, 시작 새면적→0·마지막 누락면적→0이고 마지막에는 원P다. V source 좌표 진행 대비 threshold 비는67/53이다.

이는 시작과 끝에서 면적점프 없이 원P를 보존할 수 있는 **이상기하 조건**일 뿐 승인된 renderer가 아니다. H 중에 상단 corner J 전체를 완성하고 V 끝40까지 진행하는 동안 원body의47까지를 공개하므로 내부 공간배분 의미가 달라진다. 원 weight54.22나 전체 시간값을 바꾸지 않아도 국내 시간방향이 보존된다는 결론은 나오지 않는다. 기존 fullround 교집합은 원P를 덮지 못하므로 중간과 p1/whole/prefix에서 그대로 유지하면 이 제안의 완전coverage 조건은 성립하지 않는다. 별도 원P 직접표시 계약이 필요하다.

실제 구현 검토 전에는 whole12p13m23/7m1/allfields·원M/L/L grammar·각 polygon 원문을 exact guard하고 연결된 같은 원guide DOM에서 같은 frame의 UA getTotalLength/getPointAtLength를 사용해야 한다. source H 길이·weight로 UA L을 대체하거나 임의 epsilon으로 H/V를 바꾸지 않는다. 코너 양자화·부동소수점에서 branch continuity와 유효 원segment상의 q 검증이 불명확하면 fail-closed해야 한다. AA·픽셀 잔여·초기 cap·연결성·국내 방향·자연재생·p1 DOM은 아직 native 미검증이다.

## 수행 범위와 핀

초기 메타 키 탐색 오류1과 유리수 파서 콜백 인자 오류1은 기하 산술 실행 전에 발생했다. 파서 호출만 고친 뒤 미실행 정확 산술1회 PASS를 저장했으며 통과 산술 반복0이다. 이 README의 입력8핀·기록 메타 검사1회만 추가한다. compiler/factory/engine/projection/새기하/기존검사/build/TSC/UI/server/Git 실행0, 원파일 변경0, 새 문서1이다.

| 고정 입력 | SHA256 |
| --- | --- |
| `docs/hanja-goal-glyphwiki-batch1087-2026-10-13/engine-proof.json` | `ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9` |
| `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/config.json` | `aae777e3fd0680c43e6e0aade49749bc120b7f727292e3ae555cb827777a1a92` |
| `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/fixtures.json` | `247767960d239c885d98e1975f0774de34fac914ab1a9402bcf602d78e8f8aa4` |
| `docs/hanja-source-native-hold-u6e7a-startcaps-terminal-2026-10-21/README.md` | `05dcec8b3e4fe2d1cd54000b4762ce520b2369b033c96faa2e5f58b6cdac1275` |
| `docs/hanja-source-native-hold-u6e7a-startcaps-terminal-2026-10-21/hold.json` | `098cdb85403ca79f729d0aff2d7e5d5b5cffb33b76e925673a6adf1c0bc62cfd` |
| `docs/hanja-u7d8e-pen11-source-clip-feasibility-2026-10-21/README.md` | `5d2b4e1444ac45e535685dba1d4b490bee83bf8c302e700b41d29ffb30dde565` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/README.md` | `53250b54873b8f631bf83b69add9cccd3d8a58be8dca203bcc0ed79b9d7e4360` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-native-2026-10-21/README.md` | `97a5b33a8f65f504c003a947bebd8a20603b49a88078c94e90b775a342cbd8fb` |
