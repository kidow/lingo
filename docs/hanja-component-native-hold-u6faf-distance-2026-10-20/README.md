# 澯 실제 컴포넌트 거리 메타데이터 보류

2026-10-20 ROOT가 브라우저 패널에서 실제 StrokeOutlines를 검토했습니다. 기존 준비 자료 commit `70c1a38a1715e64c008086b6f199ff380c253aa2`와 app commit `86c29e9a5a1ea646d7cf789c5caf8104ce2e8d9a`는 수정하지 않습니다.

whole16과 prefix4는 통과했습니다. 첫 pen3의 부분 재생에서 두 번째 마스크의 `data-growing-distance`가 없어 sameFrame의 distanceMatches/radiusMatches/endMatches가 실패했습니다. 실제 setter와 cleanup이 `data-growing-canstance`라는 오타를 사용했고, 관찰 코드는 누락된 속성을 Number(null)=0으로 읽었습니다. 가이드·캡·자형의 실패로 판정하지는 않았지만 이 실행을 승인하지 않습니다. 이후 local/rho/boundary/coverage/coarse/natural 검토는 실행하지 않았습니다.

앞선 독립 읽기 감사는 CAN/DI 문자열 정규화가 이 오타도 바꾸는 점과 실제 DOM setter/read 계약 대조를 놓쳤습니다. 처음의 blocker 0 판단은 철회됐습니다. 브라우저에서 발견한 실패를 지우거나 새 실행의 첫 성공으로 바꾸지 않습니다.

검토 서버 PID2346·127.0.0.1:57422·session18998은 SIGINT로 종료됐고 exit130 및 PID 부재를 확인했습니다. 후속 수정 commit `976217db4ffc58770a773d716320b5c2ce17653f`는 두 키만 수정하고 새 거리·cleanup 회귀 검사 하나와 변경 TS 구문 검사만 통과했습니다. 후속 고정 스냅샷과 실제 검토가 별도로 필요합니다. 원본 기하·필순·폭·weight·인증서 변경, 빌드, source compiler 및 engine 실행은 없습니다.
