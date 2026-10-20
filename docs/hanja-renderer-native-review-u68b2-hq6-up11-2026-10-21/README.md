# 梲 HQ6·UP11 source-native 부분 관찰

ROOT가 새 UP source의 11획·13마스크·29폴리곤 후보를 독립 브라우저 패널에서 관찰했습니다. 전체 자형 3개(국내·baseline·candidate)는 각 520px로 두 화면에서 호환을 확인했습니다. 전체 11획의 완료 직전·완료 33표본은 PASS입니다. 시간에 따른 국내 필순·방향, 실제 앱 컴포넌트와 런타임 적용 승인은 포함하지 않습니다.

- Q6m2: local 6표본·rho 경계 3표본·펜6 경계 ±1e-10의 3표본·coarse 9표본 PASS. 펜6 경계는 0.480603834439137입니다.
- UP11: 완료 3표본(전체 33표본에 포함)·coarse 9표본 PASS. HTML range가 허용한 0.7972460103 / 0.7972460104 / 0.7972460105만 관찰했습니다. 정확 경계 0.7972460104016366 입력은 step 제약으로 1회 거절됐으므로 정확 경계 표본은 미실행입니다.
- 새 UP source의 coverage 검토는 미실행입니다. 이전 Q6m2의 흰색 P-minus-fullround 관찰만 재사용합니다. 원 Q mask·guide와 coverage 함수 바이트 동일성을 고정했으며, 이를 UP11 coverage 승인으로 확대하지 않습니다.
- 자연재생6은 두 번째 Space 시도에서 0.095062499994041 → 1을 관찰했습니다. 첫 DOM deadline 시도는 시작 근거가 없어 제외합니다. 자연재생11의 시작 0.11157499999404535에서는 SVG 하단 18px이 viewport 밖이므로 전체 520px 시작 관찰이라고 하지 않습니다. 종료 1의 candidate 520px와 errors=[]만 확인했습니다. 두 재생 모두 시작·종료 관찰이며 8초 전체 프레임 관찰이 아닙니다.
- 다른 9획 coarse·다른 획 자연재생·새 국내 시간/방향·실제 컴포넌트 검토는 미실행입니다. 이전 HOLD와 원 source/renderer의 false 이력은 그대로입니다.

ROOT의 tab59를 먼저 닫고 PID50430 / port57433 / session72258을 SIGINT로 종료했습니다(exit130, 짧은 traceback). 후속 ps는 exit1·빈 출력으로 PID 부재를 확인했습니다. 이 기록 작성자는 UI·서버·원 검사를 실행하지 않았습니다. 현재 적용 5,748자·미적용 230자이며 梲은 아직 미적용입니다.

메타데이터 초회는 README 끝 개행에 따른 SHA assertion 실패 1회, 후속은 동일 파일명 배열의 cross-realm 비교 assertion 실패 1회였습니다. 두 번 모두 입력핀 검사 도달은 0입니다. 통과한 README SHA 검사는 반복하지 않고 실패 지점·남은 메타/핀 계약만 1회 이어서 PASS했습니다. source/compiler/factory/engine/geometry/기존 검사/build/Git 실행은 0입니다.

