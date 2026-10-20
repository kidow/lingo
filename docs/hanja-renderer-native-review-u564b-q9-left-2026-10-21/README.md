# 噋 Q9·LEFT10 source-native 부분 관찰

ROOT가 15획·17마스크·33폴리곤의 source/renderer 후보를 tab60에서 관찰했습니다. 국내·baseline·candidate의 전체 자형 3개를 각 522px, 두 화면으로 확인해 호환 PASS를 기록합니다. 실제 컴포넌트·앱·런타임 적용 승인은 아직 없습니다.

- LEFT10: 99.99% / 99.999999% / 100% candidate 522px 3표본 PASS. 원 tip pop이 사라졌습니다.
- Q9m2: 실제 samples SVG4의 local 0 / 0.000001 / 0.95 / 0.9999 / 0.99999999 / 1 여섯 표본, rho ±1e-10 세 표본, 펜9 경계 0.6092369035989366 ±1e-10의 before/at/after 세 표본 모두 PASS입니다. coverage는 실제 SVG3의 흰색 P-minus-fullround 522px 한 표본 PASS입니다.
- 펜9 coarse: 실제 새 표본 SVG4/10/16/20의 네 화면으로 9개 표본(222px)을 모두 관찰해 PASS했습니다. 다른 14획 coarse는 미실행입니다.
- fine 45표본은 서로 다른 범위를 합한 수입니다. 펜1~8·11~15의 global 완료 39표본, LEFT10의 앞선 global 완료 3표본, Q9의 앞선 local 0.9999 / 0.99999999 / 1 세 표본을 대응해 기록했습니다. Q9의 새 global 완료 3표본을 별도로 관찰했다고 하지 않습니다.
- 자연9: 첫 DOM play 후 candidate 클릭 CDP 3000ms deadline으로 시작 근거는 없고 종료 1 화면만 확인했습니다. 두 번째 native pressKey(index22)의 시작 0.073375에서는 candidate 대부분이 화면 밖이라 전체 시작 화면은 미확인입니다. 이후 scroll+Space는 p1에서 변화가 없어 새 재생 시도나 세 번째 시작으로 세지 않습니다. 자연10과 다른 획 자연재생은 미실행입니다. 시작·종료 전체 통과나 8초 연속 프레임 관찰을 주장하지 않습니다.
- local 첫 0/epsilon/0.95의 main SVG2 클릭은 current0을 보여 잘못된 대상이었으므로 제외했습니다. 올바른 samples SVG4에서 여섯 표본을 새로 관찰한 결과만 위 local6에 포함합니다. 새 국내 single의 시간·방향 검토는 미실행입니다.

ROOT는 tab60을 먼저 닫고 PID58081 / port58436 / session12345를 SIGINT로 종료했습니다(exit130, 빈 출력). 후속 ps는 exit1·빈 출력으로 PID 부재를 확인했습니다. 원 HOLD·source·renderer·준비 false 이력은 변경하지 않습니다.

신규 두 파일 메타데이터·고정핀 검사 1회만 수행했습니다. 이 기록 작성자의 기존 검사·source projection/compiler/factory/engine/기하·UI·서버·Git·build 실행은 0입니다.
