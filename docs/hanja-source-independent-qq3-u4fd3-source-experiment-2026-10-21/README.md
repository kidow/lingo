# 俓 QQ 세 쌍 source-only 후보

기존 단일 actualfull5 engine-proof.json과 일치 body3를 그대로 고정한 9획·12마스크·27폴리곤 후보입니다. ROOT가 관찰한 정적 구성 대응만 사용하며 방향·시간·합획 애니메이션·전체 순서·APP·runtime 승인은 모두 false입니다. 원1067의 min12>국내9 HOLD, 원 sourceGroups=[], 원165 국내4·5·6 부분검토 및 NOTICE는 변경하지 않았습니다.

- sourceGroups(1-based): [[1],[2],[3],[4,5],[6,7],[8,9],[10],[11],[12]]
- 논리4/5/6의 각 QQ는 원 raw gap(-41/40,-2), 표시 gap(-41/80,-1)을 보존하는 독립2마스크입니다. 정확 접합·새 연결자·guide 합성·폭/weight/flags 변경은 없습니다. 나머지 여섯획은 원single입니다.
- 실제 full5 파일 SHA256: 655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936. 선택 body3 SHA256: a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4. id3(root/file/fileSHA256), strict3/4 인수 계약이며 header 재결합이 없습니다.
- 기하 SHA256(JSON.stringify strokes): f731ac914a72e3021f43db274bca35d7b4f91968e964601f9112bdb900052726. 공개 fixture 파일 SHA256: 8774215fd380fe4bf3a410d65f6fdf3a2b8442ef13cc7085b146e1e34339b04d. 모든 원27폴리곤은 정확히 한 번씩 사용하고 모든 raw mask 필드를 보존합니다. baseline은 동일 논리배열의 clone으로 독립적인 정답이 아닙니다.
- 경계: pen4 0.47406444445912105, pen5 0.47406444445912105, pen6 0.4748798932013256. 공식 방향·시간·시작 연결성을 승인한 수치가 아닙니다.

원래 8067바이트 순수 projector 본문을 그대로 가져와 새 root에 FIRST1 실행했고 내부 rawprojector 실행도 1입니다. 결과는 다른 검사보다 먼저 fixtures.json에 저장했습니다. 기존 compiler/factory/engine 실행은 각각0이며 꼬리 분리도0입니다. fixture가 존재하면 capture는 거부됩니다. 이후 양성 검사는 public 캐시만 사용합니다. 시작/완료 꼬리 flags, coverage, QQ의 시작epsilon·경계·global62.5% 연결성은 미검토이며 ROOT의 fresh 위험게이트가 필요합니다. 다른 글자 정책이나 승인 승계는 없습니다.

새 최초 focused는 캐시 양성1·정확 폴리곤/원필드 대응까지 통과 후 factory 본문 추출의 마지막 개행 누락(8066 vs 8067) 단언에서 실패했습니다. 실제 projector 본문은 변경하지 않았습니다. 첫 tail 복구는 원 prior wrapper의 추가 구분 개행 때문에 비교가 다시 실패했고, 함수의 고정8067바이트/SHA 경계로 한정한 두 번째 tail 복구가 통과했습니다. --resume-after-factory-extraction은 통과 prefix SHA 9761e82ccae7c7b6009f5e521f998cd719baf14512a309424e8c5b145c59745c와 직접입력4핀을 확인한 뒤 실패 단언·미실행 음성/helper만 수행하며 캐시 양성·투영을 반복하지 않습니다. focused 실제실행3회(first FAIL + tail FAIL + failed-only tail PASS), 캐시 양성 누계1/투영누계1, 음성28/query음성14, PythonAST1/helperguard1/embedded JS구문1을 기록했습니다. 새 Node구문2/선언AST1/실제UTF8 CLI --help1도 최초 통과했습니다. 최종 JSON/핀 메타1로 마감하며 기존 통과 prefix·원 검사를 반복하지 않습니다. 이미 성공한 원 검사는 실행하지 않습니다.

기하 전 Node REPL import에서 process 전역 부재1, node:process 금지1이 발생했습니다. 네이티브 Node 단일 capture로 회복했으며 실패 둘은 투영/원 compiler 실행0입니다. 작성용 RAM 구문 오류는 파일·검사·기하 실행 전 오류로 별도 기록합니다. 실패 후 성공한 영역을 반복하지 않습니다.

ROOT 전용 검토 CLI(작성자는 서버를 실행하지 않음):

```sh
python3 docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/serve.py --target u4fd3 --port 59412
```

/whole → /progressive?stroke=4&coarse=1 → pen4/5/6의 0·epsilon·각경계·62.5%를 먼저 확인합니다. /pairs는 정적 방향 참고 화면입니다. 모든9획 링크·coarse220·메인520·8초 재생을 제공합니다. 국내 SVG는 기존 정적 helper의 원4660바이트/SHA를 RAM에서만 검증하여 사용하며 저장하지 않습니다. ROOT가 사용한 서버의 PID/포트를 기록하고 사용 후 종료해야 합니다. 이 후보의 작성자는 HTTP/UI/server/Git/build/TSC를 실행하지 않습니다.
