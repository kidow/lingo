# 簜 원 QQ9·LEFT16 source-native HOLD

이 기록의 대상은 원 source18p19m37(geometry f11cd0dae3a1bc09045063834efb7b70529552f11e2e6ae7a0c19e7d2de586a3)입니다. 새 LEFT16 분리 후보18p20m37(209c157e9535c7121937dfa7646b52052d05797a76e4de882d70a239b902d00b)는 아직 native 미관찰이며 이번 결과를 그 후보의 결과로 옮기지 않습니다. 원 source/fixture/HOLD/NOTICE는 그대로입니다.

ROOT가 사용자 접속 확인 뒤 기존 허용 port59412의 tab62에서 실제 관찰했습니다. viewport518×766에 source SVG520의 흰 여백 약2px은 밖이었지만 ink는 모두 보였습니다. 전체 520px을 잘림 없이 관찰했다는 주장은 하지 않습니다.

- QQ9: boundary1-at에서는 첫 Q 완료만 보이고, boundary1-after에서 두 번째 Q의 유한하고 큰 초기 stub이 갑자기 나타났습니다. 실제 candidate SVG2를 각각 한 화면으로 확인한 최초 activation FAIL입니다. Q9m1 자체 초기 시작은 미관찰입니다.
- after 클릭 뒤 DOM range value는 38.6655, step .0001%, min0/max100이었습니다. 실제 숨은 global 값을 별도 관측하지 않았습니다. 고정 viewer는 button onclick의 show(p)가 전달받은 p를 renderProgressive에 먼저 그대로 넘긴 후 range.value=p*100을 설정합니다. source에서 산출한 at=0.3866547471255951 / after=0.3866547472255951, delta1e-10은 구현상 선언된 전달값으로만 기록하며 DOM에서 독립 측정한 값이라고 하지 않습니다.
- LEFT16: /progressive?stroke=16의 99.99%와 100% actual candidate SVG2 두 화면에서 원 끝quad가 완료 때 튀어나오는 최초 completion FAIL을 확인했습니다. 99.999999%는 이번에 관찰하지 않았습니다.
- 새 coverage·natural·coarse·다른 fine·전체 자형·국내 방향/시간 검토는 미실행입니다. 두 실패를 source 전체 성공이나 합획 승인으로 해석하지 않습니다.

ROOT가 원 서버 PID64437 / port59412 / session62119를 Ctrl+C(SIGINT)로 종료했습니다(exit130, 짧은 traceback). 후속 ps는 exit1·빈 출력으로 PID 부재를 확인했습니다. 사용자 tab62는 닫지 않았습니다. ROOT가 같은 허용 port에 다른 梲 harness를 교체했으며 이 기록 작성자는 해당 서버를 조작하지 않았습니다. 다른 포트로 접근 차단을 우회하지 않았습니다.

신규 기록2의 메타데이터·고정핀 검사 1회만 수행했습니다. source projection/compiler/factory/engine/기하·기존 검사·UI·서버·Git·build 실행0, APP/runtime/native 전체 승인false입니다.
