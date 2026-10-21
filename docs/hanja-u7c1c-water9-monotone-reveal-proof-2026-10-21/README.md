# 簜 water9m2 — x-monotone 원 polygon과 arclength-normalized-x 표시정책

이 문서는 원 water9m2 polygon의 정확 유리수 검사와, 그 결과를 사용하는 **새 source-specific half-plane 표시정책**의 수학적 범위를 기록합니다. 기존 round-tube/growing-caps 인증서를 이 마스크에 적용한 결과가 아닙니다. 원 shape·guide·width·weight·필순 데이터는 바꾸지 않습니다. renderer 구현·APP·runtime·실제 native 승인은 모두 false입니다.

## 고정 출처와 범위

- 원 source: `../hanja-source-independent-qq-hv-u7c1c-source-experiment-2026-10-21/`.
- 원 전체 geometry: `f11cd0dae3a1bc09045063834efb7b70529552f11e2e6ae7a0c19e7d2de586a3`, 18pens/19masks/37polygons.
- LEFT 분리 후 source: `../hanja-source-independent-qq-hv-left-u7c1c-source-experiment-2026-10-21/`.
- 현재 전체 geometry: `209c157e9535c7121937dfa7646b52052d05797a76e4de882d70a239b902d00b`, 18pens/20masks/37polygons.
- 현재 config SHA256: `d07cd7a5e5db79eb7a5e9bbbccfdd7d5c852b49a2701e724e27807062c48583e`.
- 현재 preparation SHA256: `339c861507841ff30f46bd39cf8298af5fe4477c82a709733ce5c35de2d12de3`.
- 현재 preparation의 `water9.masksByteUnchanged=true` 기록에 따라 water9 두 마스크는 원 source와 동일합니다. 이번 문서 작성에서 fixture/partition을 재생성하지 않았습니다.
- 대상은 논리획9의 mask2 하나입니다. 전체 mask JSON SHA256: `4318908ec96706388a8788d671b511776c2a878f446242badd93587a37dfd7d2`.
- 기존 초기곡률/normal-map 범위 분석: [이전 분석](../hanja-u7c1c-water9-geometry-analysis-2026-10-21/README.md), 당시 파일 SHA256 `1085d4a2262f14868b8b91fe3509495fb8a4208e779196a7d6b6a772d55f5de9`. 그 성공 산술을 재실행하지 않았습니다.

고정 원 mask 필드는 다음과 같습니다. 좌표를 새로 입력한 geometry를 생성한 것이 아니라, 검사한 원문을 기록한 것입니다.

```text
outline:
M14.55 79.35 L15.25 78.05 L16.25 76.45 L17.5 74.45 L19.05 72.1 L20.9 69.3 L23.1 66.1 L25.6 62.45 L28.45 58.45 L31.65 54 L35.3 49.2 L36.05 49.65 L33.3 55 L30.75 59.85 L28.4 64.2 L26.35 68.05 L24.55 71.45 L23.1 74.4 L21.9 76.9 L21 78.9 L20.4 80.45 L20.2 81.35 Z
bounds: [14.55,49.2,36.05,81.35]
direction: curve
weight: 35.919814
revealPath: M17.4 80.375 Q18.99 75.905 35.685 49.457499999999996
revealWidth: 14
```

## 정확 polygon 검사 결과

outline은 M/L/Z 한 contour, 22개 꼭짓점입니다. polygon 좌표의 모든 decimal은 소수 둘째 자리 이하이므로 100배 정수로 변환하여 orientation, 선분 접촉·교차와 유리수 절단 교점을 검사했습니다. 부동소수 오차 허용값은 사용하지 않았습니다.

- 인접 변과 닫는 인접 변을 제외한 209쌍: 교차·접촉 0.
- 부호 있는 면적: `98819/800` > 0. 따라서 퇴화하지 않은 단순 polygon입니다.
- 최소 x: `291/20 = 14.55`, 유일한 꼭짓점1.
- 최대 x: `721/20 = 36.05`, 유일한 꼭짓점12.
- 최소 x→최대 x의 첫 경계쇄(1based):
  `[1,2,3,4,5,6,7,8,9,10,11,12]`.
- 같은 방향의 반대 경계쇄(1based):
  `[1,22,21,20,19,18,17,16,15,14,13,12]`.
- 두 경계쇄 모두 각 변의 x가 엄격히 증가합니다. 수직 변은 없습니다.
- 고유 x값21개 사이 열린 임계 구간20개: 각 유리수 중점 수직선의 교점이 정확히2개이며, 두 y값은 서로 다릅니다.

각 경계쇄는 x의 연속 piecewise-linear 함수입니다. 단순성 때문에 두 함수가 내부에서 서로 교차하지 않으며, 임계 꼭짓점의 수직절단도 그 연속 극한인 한 닫힌 interval입니다. 열린 구간의 중점 검사만으로 임계점까지 추정한 것이 아니라, 이 경계쇄와 단순성 조건을 함께 사용합니다. 따라서 P는 `u=(1,0)`에 대해 x-monotone입니다. 다른 모든 방향에 대한 단조성은 주장하지 않습니다.

## Half-plane 노출의 별도 성질

`a=291/20`, `b=721/20`으로 놓고, 연속·단조인 h가 `h(0)=a`, `h(1)=b`를 만족할 때 다음 표시정책을 정의합니다.

```text
R(0) = empty
R(p) = P ∩ { (x,y) : x ≤ h(p) }     (0 < p < 1)
R(1) = P
```

닫힌 half-plane 식만 p=0에 그대로 쓰면 최소 극점 하나가 남습니다. 면적은0이지만, empty라는 API 의미와 실제 paint를 명확히 하기 위해 p=0은 명시적으로 비웁니다. p=1의 P는 같은 clip의 h=b와 수학적으로 동일하며, 끝에서 누락된 영역을 갑자기 unmask하는 우회가 아닙니다. 완료 prefix/whole에서도 원래 P 전체라는 계약을 별도로 지켜야 합니다.

1. **단조성:** h가 증가하면 half-plane이 포함되므로 R도 nested입니다.
2. **대상 단독 연결성:** x-monotone P의 왼쪽 부분집합은 모든 수직절단이 interval이고 두 연속 경계로 이어지므로, 각 h>a에서 연결됩니다.
3. **면적 연속성:** P의 전체 y범위는 `81.35−49.2=643/20`입니다. 따라서 두 threshold에 대해
   `area(R(h2) △ R(h1)) ≤ (643/20)|h2−h1|`.
   연속 h이면 p→0+에서 노출면적→0, p→1−에서 남은 면적→0이며, 유한 양성면적 jump가 없습니다.
4. 위 명제는 target P 단독의 이상적 집합/면적 명제입니다. **선행 mask와의 접촉·연결성**, 모든 픽셀/AA의 시간적 연속성, 실제 UA clip paint는 증명하지 않습니다. 첫 노출 위치가 선행 ink와 떨어져 있을 수도 있으므로 국내 시간적 필순과 같다고 확대하지 않습니다.

고정 roundcap/tube, 반지름7 또는 기존 rK 조건은 이 증명의 전제가 아닙니다. 원 source의 guide/width 필드를 그대로 둔다고 원래 round-sweep와 같은 노출집합이 되는 것은 아닙니다.

## 선택한 arclength-normalized-x timing

원 guide는 단일 quadratic Q입니다. 이상적 parameter t∈[0,1]에서

```text
x′(t) = 159/50 + (3021/100)t > 0
y′(t) = −447/50 − (5494375000000001/125000000000000)t < 0
Qstart.x = 87/5 = 17.4
Qend.x = 7137/200 = 35.685
Qend.x − Qstart.x = 3657/200 = 18.285
Pmax.x − Pmin.x = 43/2 = 21.5
```

원 guide의 실제 UA 전체길이 L과 동일 path의 `nativePoint = getPointAtLength(pL)`를 사용하여, 0<p<1일 때

```text
h(p) = 14.55 + 21.5 * (nativePoint.x − 17.4) / 18.285
     = 291/20 + (4300/3657) * (nativePoint.x − 87/5)
     = (4300/3657) * nativePoint.x − 144071/24380
```

로 정규화합니다. 새 정규화 산술1회에서 양의 기울기 `4300/3657`, 시작 대입값 `291/20`, 끝 대입값 `721/20`을 정확 유리수로 확인했습니다. 이상적 guide의 x가 엄격히 증가하므로 이 timing도 연속·단조이며, P 전체 x범위를 정확히 사용합니다.

`h=nativePoint.x`를 그대로 사용하면 시작부터 P의 양성면적이 노출되고, 끝에서도 P 오른쪽 일부가 남습니다. endpoint 정규화는 이 차이를 해소하는 **명시적인 새 timing 선택**입니다. source trajectory를 새로 만들거나 공식 필순을 추정하는 근거가 아닙니다.

비교용 `h=14.55+21.5p`는 UA 측정 없이 x방향 일정속도로 진행하여 수학·구현이 더 단순합니다. 선택한 arclength 방식은 원 guide의 길이 진행에 따른 x변화를 timing에 사용하지만, 동일 frame의 path/owner/document/transform/진행률과 유한 L·point, 측정 path NOpathLength 등의 실행 가드가 추가로 필요합니다. 이상적 단조성은 브라우저 구현·반올림 오차의 자동 승인이 아니며, 범위를 벗어난 UA 값의 처리나 p=1 clip 구현 결함도 별도 검사 대상입니다. 임의 epsilon/clamp로 이 증명을 넓히지 않습니다.

## 실행 이력과 미승인 범위

- 원 polygon 정확 검사1회 결과를 재사용했습니다. 본 문서 작성 때 209교차/20slab/기존 곡률 산술 반복0.
- 새 정규화 유리수 산술1회: PASS.
- 메타 선택 읽기에서 targets를 배열로 가정한 RAM TypeError1이 있었고, 이미 읽은 dictionary로 복구했습니다. 파일·산술검사·geometry 실행은 없었습니다.
- 문서 최초 저장 전 목적 파일 부재를 확인했습니다. 새 README1만 작성하고, 저장 후 문서 문자열/출처 digest·경로의 메타 검사1회만 수행합니다.
- source geometry/projection/compiler/factory/engine, renderer/module import, 기존 tests, 실제 browser/UI/server/Git/build 실행0.
- root가 발견한 exact-p1 cliprect0 문제는 renderer 구현의 별도 수정 범위입니다. 이 수학 문서가 해당 구현의 정상 동작을 보증하지 않습니다.
- 원 P와 선행 mask의 연결성, 국내 temporal direction/합획, UA raster, 새 정책의 모든 native gate, 실제 APP/runtime: **미승인 false**.
