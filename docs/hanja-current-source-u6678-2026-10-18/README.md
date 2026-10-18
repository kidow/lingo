# 晸 현재 고정 공개 source-only 준비

공식 API의 u6678@15 → u6678-jn@2 및 고정 하위 부품 4개를 사용합니다. 현재 기본 정의는 batch234 아카이브와 달라 별도 스냅샷으로 보존했습니다. 관련 글리프 목록 원문과 주요 5개 root의 응답은 저장하지만 엔진 실행·whole proof는 기본 u6678 한 개뿐입니다. 다른 변형의 자형·필순·연속 최소획수는 주장하지 않습니다.

원시 14개, 24개 다각형에서 raw1→2의 정확한 끝점 (151,21.93)만 합쳐 13획·13마스크를 구성합니다. 모든 원 다각형을 정확히 한 번 사용하며 새 좌표·폭·연결선을 만들지 않았습니다. catalog12/국내13 충돌은 그대로입니다. 순서는 원시 source 순서이며 국내 방향 검토가 필요합니다.

progressive.mjs의 compileBound 전체 본문은 기존 瘨 source compiler와 바이트 동일합니다. 외부 API는 compileProgressive(trace,full5Proof,identity) 3개, compileSourceWhole(root,trace,full5Proof,identity) 4개의 명시 인수를 요구합니다. identity 5키와 proof 전체·trace·groups·header, 원 source 핀을 엄격히 검사합니다.

고정 KAGE 엔진 8개 SHA를 검증하고 VM을 한 번 실행했습니다. source compiler 양성 한 번 뒤 공개 compiled-u6678.json을 먼저 저장했습니다. 검증 스크립트는 캐시 다각형/출처/거부 계약만 검사하며 source compiler 양성을 재실행하지 않습니다. 런타임 등록·국내 미디어 저장·서버·브라우저 검토는 없습니다. 현재 nativeApproved/runtimeApplied=false, sourceVerified=null입니다. 과거 batch234의 국내 관찰은 새 후보 승인으로 승계하지 않습니다.
