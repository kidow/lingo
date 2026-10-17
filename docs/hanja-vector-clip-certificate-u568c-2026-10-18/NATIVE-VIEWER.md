# 嚌861 인증 mesh native viewer — 격리 실험

기존 certificate 5파일과 원형 36핀을 보존한 새 6파일입니다. production 적용·기존 보류 해제·국내 방향 승인은 없습니다. grid200만 허용합니다.

## 실행과 종료

저장소 루트에서 아래 명령으로 실행합니다.

    rtk proxy python3 docs/hanja-vector-clip-certificate-u568c-2026-10-18/serve-native-vector.py --port 0

출력된 PID/포트를 기록하고 브라우저 패널에서 해당 localhost를 엽니다. 검토가 끝나면 해당 PID와 실행 래퍼만 종료합니다. 이 준비 작업에서는 서버·HTTP·native 검토를 실행하지 않았습니다.

시작 시 고정 public proof에서 mesh 생성·mesh 인증·거리장 생성 각 1회이며 engine/source compiler 실행은 0입니다. 원 certificate의 면적·성분·scalar·95/99.99/100% 수치를 비교한 후 RAM에 보관합니다. 요청마다 재생성하지 않고 원형/신규 asset/config 핀만 확인합니다. 큰 packet은 RAM HTTP 응답이고 파일로 저장하지 않습니다. domestic SVG는 기존 renderer의 URL·bytes·SHA·17clip 검증을 거쳐 RAM에서만 다루며 외부 SVG xmlns를 보장합니다.

## root native 절차

1. 양 패널의 실제 SVG가 각각 520×520인지 확인합니다. 왼쪽은 원 V+Q renderer, 오른쪽은 완료 V 위에 원 Q outline을 derived mesh로 clip한 실험입니다. 아래 이미지는 고정 국내17획의 12획입니다.
2. 기존 경계 직전/경계/직후는 원 mask 경계 0.4648569065497792의 ±1e-10을 새 rise-local 진행률로 환산합니다. 이어 0%, epsilon(1e-8), 50%, 95%, 99.99%, 100%를 비교합니다.
3. 특히 기존 V 외부에 새 nib이 일괄 출현하는지, 이동 방향/성장이 국내 연속획과 맞는지, AA나 공유 triangle edge가 보이는지 확인합니다. 단독 clip의 seed 면적과 기존 완료 V를 합성한 신규 가시 잉크를 구분합니다.
4. 8초 자연 재생을 실행하고 시작 진행률 및 자연 100% 종료를 기록합니다. 벽시계 requestAnimationFrame 기준이며 무거운 rational SVG 생성으로 표시 프레임을 건너뛸 수 있습니다.
5. 실패하면 기존 보류를 유지합니다. 이 viewer에는 승격·runtime·registry·canonical 카운터 변경 코드가 없습니다.

## 바인딩과 제한

서버가 같은 mesh에 대해 방금 계산한 certifyMesh 결과만 buildField에 전달합니다. 임의 certificate 인자는 받지 않습니다. browser는 고정 certificate 원문 SHA와 mesh·stored scalar JSON SHA를 HTML의 startup binding과 먼저 비교합니다. grid, 차원, scalar 범위와 triangle index를 검사한 뒤에만 렌더합니다. source proof/module SHA도 동일 바인딩에 묶여 있습니다. 이는 고정된 helper/asset 핀을 신뢰하는 localhost 실험이며 별도 원격 서명 체계는 아닙니다.

p0에서 새 clip은 비웁니다. p>0와 p1 모두 같은 rational affine threshold clipping을 사용합니다. p1에서 unmask, 전체 outline 교체, 임의 fill을 하지 않습니다. 새 원획 좌표/폭/connector는 없지만 mesh/intersection vertex와 scalar field는 명시적인 파생 표현입니다. source geometry를 원좌표/2 외에 변경하지 않습니다.

이상적 mesh 면적/경계/연결성과 browser SVG rasterization은 별개입니다. 숫자 출력 시 rational→Number 변환, AA·공유 edge·픽셀, mesh-edge IEEE754 거리와 8초 프레임 비용은 native 판정 대상입니다. 정확한 intrinsic geodesic 또는 국내 필순/궤적 인증이라고 주장하지 않습니다.

새 focused 검사는 합성 triangle의 affine clip·p0/p1 규칙·원문/mesh/scalar 바인딩 변조 거부에 한정합니다. 기존 certificate 8검사는 다시 실행하지 않습니다. 실제 source mesh/field는 root의 첫 서버 실행 시 인증값과 재대조됩니다.
