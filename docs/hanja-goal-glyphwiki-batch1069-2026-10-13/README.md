# 灌 — native/source 보류

Root가 전체 자형10개와 국내21획 방향을 실제 브라우저에서 대조했습니다. 선택 base는 풀초의 가로를 공유하여 국내의 두 가로·4획과 다르고, 물수변 V/올림의 경계도 국내3획과 다릅니다. 방향 관측은 승인 결과가 아닙니다. coarse/fine/경계/replay는 실시하지 않았습니다.

Root가 자형 호환을 확인한 VS2·var001은 모두 raw24·polygon41입니다. 원 연속접점은 0-based9→10,13→14 두 곳뿐이므로 원 authored 경로를 잇는 계약의 최소는22획입니다(목표21). 물수변 raw2→3의 끝→시작은 VS2 `(37.875,184)→(34,150)`, 거리34.22010556675709; var001 `(41.75,184)→(37.1,150)`, 거리34.31650477539925입니다. 이 뒤로 돌아가는 간격에 새 연결선을 만들거나 좌표·폭·방향을 바꾸는 것은 승인되지 않았습니다. 단순 완성획 순열로 경계 차이를 해결할 수 없습니다. outline 접촉이나 가시적 연속성은 이번에 계산·관측하지 않았으며, 이를 자동 승인하지 않습니다.

기존 compiler는 base/G/H/J/K/T/VS0/VS1만 지원합니다. 호환 두 whole의 profile은 없으며 새 adapter/실험은 만들지 않습니다. 원본24+strict 준비6 및 shared3 핀을 고정합니다. 기존 metadata/readiness의 source-ready 주장은 과거 source-only 상태로 보존하며 native 승인으로 해석하지 않습니다.

1068 실제 부모SHA21301e85aa4f4f97e56ab29197611e46a9cb4ce8d348db93b72dc0abb66c8c40에 연결했습니다. 집중 검증 정확1회 exit0:128개 resume의 문자열80+객체239=319에서 灌/u704c 중복0, 원30+shared3 핀불변, registry5547·대상0·lookupnull입니다. 신규1자 보류로 canonical320, 적용5547/5978·잔여431입니다. 검증 subprocess 성공 후 REPL RAM 저장 시 변수 선언 오류가 있었으나 저장된 stdout을 복구했고 검증은 재실행하지 않았습니다. sourcecompile/engine/HTTP/서버/빌드/Git 실행0; runtime 적용0.
