# UP/LEFT terminal 꼬리 추가 4자 source 실험

耼509 8획·譈515 14획·舃643 G 8획·駪688 16획의 원 terminal314/14/14/5 polygon을 기존997 point·terminalUpTail·terminalLeftTail 함수 그대로 확인한 뒤, 원 전체mask의 마지막 꼬리 polygon만 별도mask로 옮깁니다. 새 좌표·연결선·폭·guide·weight·획순을 만들지 않습니다. 나머지 획 및 모든 원 polygon은 정확한 번씩 보존합니다.

원 compiler는 2인자 legacy입니다. 새 외부 API는 고정 full5 proof와 명시적 id3(root/file/fileSHA256)를 받아 필수3/4인자를 확인한 후 원2인자로만 위임합니다. source/header/draw-trace/전체 dependency closure/고정 provider/NOTICE 바이트를 핀으로 묶습니다. 譈 u6566@8·u6535-02@9 및 기존 비연속 sourceGroups[13,15],駪 source순서를 보존합니다.

이번 byte pin과 baseline hash는 새 최초캡처이며 과거 독립 baseline 해시로 주장하지 않습니다. 이전 native 보류는 그대로이며 이 실험의 native/runtime 승인은 false입니다. 특히 譈는 과거 전체검토가 완료되지 않았습니다. 이번 target 이외의 모서리·방향·자형·경계·재생과 전체 필순은 root가 새로 확인해야 합니다.

공개 파생 fixtures만 파일에 저장합니다. 국내 SVG는 고정 URL/SHA로 RAM에서만 읽으며 파일로 저장하지 않습니다. helper는 fixtures 캐시를 사용하므로 sourcecompile/engine은 시작·GET 모두0이고 localhost port0을 지원합니다.

실행: `python3 -B serve.py --target 509 --port 0` (515/643/688도 선택 가능). `/whole`, `/pairs?stroke=N`, `/progressive?stroke=N` 및 `&coarse=1`을 제공합니다. 화면은 국내/기존/실험 세 칸이며 실제520px, 0·epsilon·50·95·99.99·100%, 경계 직전/경계/직후, 자연8초 재생을 제공합니다. 서버는 root가 필요할 때만 실행하고 검토 후 종료합니다.

수학적 tail clipping 면적 검사는 local tail-mask progress 기준의 부동소수점 보조검사이며 AA·전체 획의 연속성·원vector 방향/native 승인 증명이 아닙니다. 원 body guide는 변경하지 않으며 원 body terminal coverage 위험은 별도 native gate로 남습니다.
