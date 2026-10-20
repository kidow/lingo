# 迨 VS2 辶 두 번째 점 누락 — HOLD

ROOT가 VS2 원body3 raw12와 국내9획을 실제 정적 화면으로 대조했습니다. 국내7인 辶의 두 번째 왼쪽 점에 대응하는 raw가 없습니다. whole 재관찰에서 VS2는 한 점, 국내는 두 점임을 확인해 whole FAIL로 보류합니다. 기존 원HOLD와 source 자료는 변경하지 않습니다.

## 관찰과 제안 대응

browser2 tab42, viewport1280×720, 원정적 helper의 source는 VS2입니다. 처음 whole 2장을 관찰했을 때는 즉시 합격·불합격을 정하지 않고 single 대조를 계속했습니다. raw1..12 전체 single, domestic1(주화면 raw12 캡처에 남아 있던 국내1 포함) 및 domestic2..9 single을 관찰했습니다. 이후 whole로 돌아와 1회 다시 관찰해 두 번째 점 누락을 확인했습니다.

아래 1-based 대응은 정적 형태의 **제안**일 뿐 합획·시간적 방향·필순 승인이 아닙니다.

| 국내 | 원raw | 관찰 |
|---|---|---|
| 1 | 6+7 | 두 조각 대응 후보 |
| 2 | 8 | 형태 대응 후보 |
| 3 | 9 | 형태 대응 후보 |
| 4 | 10+11 | 두 조각 대응 후보 |
| 5 | 12 | 형태 대응 후보 |
| 6 | 1 | 위쪽 점 |
| 7 | 없음 | 辶 두 번째 왼쪽 점 누락 |
| 8 | 2+3 | H+V 대응 후보 |
| 9 | 4+5 | 왼쪽 내림 말단+긴 오른쪽 꼬리 대응 후보 |

새 sourceGroups는 빈 배열 그대로이며 합친 마스크·새 좌표·연결선·투영을 만들지 않았습니다. prefix·방향·애니메이션·자연재생은 미관찰입니다. 국내7 누락은 새마스크 연결 정책으로 채울 수 있다는 주장이 아닙니다.

## 원자료와 실행 경계

원batch968 선택 `engine-whole-u8fe8-ue0102.json`은 defaults/groups/trace의 실제 body3이며 SHA256 `3f6386eb511ca16586c38568f05a7c6fed3f7a23641d6fbb70a4006d2d3f9950`입니다. 선택VS2의 actualfull5는 없고 base header를 합성하지 않습니다. 원12raw·12calls·23polygon·id3 및 원HOLD/NOTICE는 불변입니다.

ROOT의 첫 sandbox 기동은 listen 전 DNS FAIL이었고, 이후 escalated 기동1회가 성공했습니다. sourceCompiler/engine0이며 성공 기동의 국내SVG는 RAM fetch1입니다. startup 전체 작업이 전혀 실행되지 않았다고 확대하지 않습니다. 서버 PID90960 / port49471 / session63794는 탭 선종료 후 SIGINT exit130(짧은 traceback) 및 PID 부재를 확인했습니다.

native/runtime/app 승인은 false입니다. 새2파일의 JSON·28입력핀·README digest 메타데이터를 1회만 확인하며 기존 source·검사·compiler·engine·브라우저·서버·Git·빌드는 실행하지 않습니다.
