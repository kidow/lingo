# 嚌861 grid40 격리 native 실험

이 하위 폴더는 기존 grid200의 12파일과 원36핀을 보존합니다. 원 인증 모듈을 그대로 import하고 grid40 전용 certificate·helper·viewer·설정을 별도로 둡니다. grid200 packet/certificate를 새 viewer에 넣으면 거부합니다. production·국내 방향·기존 보류 해제 승인은 없습니다.

## 실행

저장소 루트에서:

    rtk proxy python3 docs/hanja-vector-clip-certificate-u568c-2026-10-18/grid40/serve-native-vector.py --port 0

PID·포트를 기록하고 root 브라우저 패널로 검토합니다. 현재 worker는 서버를 시작하지 않았습니다. 첫 root 실행 때만 mesh/certificate/field를 각1회 RAM 생성하고 공개 고정 certificate40 수치와 대조합니다. source compiler/engine 실행은 0이며 요청마다 재생성하지 않습니다. 새 40-grid parameter probe는 이미 1회 수행했고 mesh RAM은 파일로 보존하지 않았습니다. 첫 startup은 해당 grid40을 다시 구성하는 명시적 실행이며 숨긴 반복 probe가 아닙니다.

## 고정 결과와 검토

단일 probe 결과는 254정점/420삼각형/108조각, seed11정점/12삼각형입니다. 정확한 원 면적·삼각형 면적은 모두 3626689/52000이며 차이는0/1입니다. p1 잔여 exact0/1, nonseed plateau0, 연결 성분1입니다. mesh JSON10912B+field4270B로 원 grid200 4104삼각형보다 적습니다. 이는 파일 크기·분할 수 비교이며 브라우저 성능 보장은 아닙니다.

grid40은 pixel grid가 아니라 원 vector를 분할하고 scalar를 정의하는 파생 mesh입니다. 마지막 outline을 바꾸지 않지만 seed 집합과 mesh-edge 근사 거리장이 달라집니다. 최대 scalar9.94317278143074이며 grid200과 같은 방향·중간 성장이라고 주장하지 않습니다.

1. 국내 방향 이미지와 양 패널 SVG가 실제520×520인지 확인합니다.
2. 기존 경계 직전/경계/직후, p0·epsilon1e-8·50·95·99.99·100%를 새로 관찰합니다. 왼쪽은 원 renderer, 오른쪽은 원 Q polygon을 affine triangle sublevel로 clip합니다.
3. 완료 V 밖 nib 일괄 출현·AA/triangle edge·양방향 성장·방향 불일치를 확인합니다. p0 빈 신규 mask, p1 동일 threshold이며 unmask fallback이 없습니다.
4. 8초 자연 재생의 실제 시작률과 자연100 종료를 기록합니다. 모든 프레임을 관찰했다는 의미는 아닙니다.
5. 검토 후 해당 child/wrapper를 종료합니다. 다른 세션 서버는 종료하지 않습니다.

domestic SVG는 고정 URL/SHA/17clip 검사 후 RAM에서만 사용하며 xmlns를 유지합니다. private media·screenshot을 파일로 저장하지 않습니다. 기존861 보류, canonical/runtime/registry는 바꾸지 않습니다. 200-grid native 표본 PASS는 새40-grid native 또는 방향 승인으로 승계하지 않습니다.

새 focused test는 grid40 binding의 양성·wrong-grid·certificate 및 field 변조 거부 1개뿐입니다. 기존 인증8/200-grid viewer3 검사는 다시 실행하지 않습니다. 원 좌표·폭·connector·path를 새로 authoring하지 않습니다. rational affine clipping 뒤 SVG Number/AA와 IEEE754 거리 근사는 native 판단 밖으로 감추지 않습니다.
