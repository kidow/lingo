# 啍·騢 H→V23 표시 마스크 격리 실험

啍972 2획과 騢997 12획만 대상으로 합니다. 기존 eligible+derive 함수 본문 d59eb13f…53fe를 바이트 그대로 재사용합니다. 대상의 원 H/right·V/down 호출 polygon·outline을 나누어 참조하며 새 좌표·guide·width·connector·필순은 작성하지 않습니다. 대상획만1→2mask로 바꾸고 다른 획은 그대로입니다.

- 啍: 원 legacy2args는 새 full5/id3·명시3/4인수 guard 내부에서만 호출합니다. 원 full5 engine header와 별도 whole3 proof의 일치, 명시 file SHA, 전체 proof/trace와 모든 입력핀을 검사합니다. 외부 identity와 baseline은 이번 실험의 신규 binding/첫 양성 캡처이며 독립적인 과거 baseline 핀으로 주장하지 않습니다. 원 빈 raw4를 whole proof에 보존하고 보이는 획으로 만들지 않습니다.
- 騢: 원 full5/id7의 ./ prefix·Sha256 casing을 보존하고 기존 baseline cd24df57…64dfd를 확인합니다. 이번 대상은12획뿐입니다. 원16획 maximum vertex distance15.251311419022304>width14 위험은 미관측 상태로 보존하며 이 실험이16획을 수정하거나 승인하지 않습니다.

원 NOTICE·source·proof·기존 보류·registry는 불변입니다. 공개 baseline/strokes fixture만 저장하고 국내 SVG는 RAM에서만 읽습니다. helper는 고정 공개fixture를 사용해 startup/GET sourcecompile0·engine0이며 actual520·경계 전/중/후·epsilon/50/95/99.99/100·9coarse·자연8초 재생을 지원합니다. Root 실행: python3 -B serve.py --target 972 --port 0 (997도 선택 가능). 준비 작업에서는 서버를 시작하지 않습니다.

source-only 집중검증을 통과했습니다. 양성 각1회(총2)·음성38개(17+21)는 모두 원 API 위임 전 거절했고 Node구문 각1/PythonAST1/helper staticguard1을 통과했습니다. 啍11p13m24poly, 騢19p21m39poly이며 원 polygon 각각 정확히1회·타획 불변입니다. native/runtime 승인0, canonical/기존hold 변경0입니다. V-local 면적 수치는 부동소수점 근사이며 whole-pen/AA/방향/경계의 native 합격을 뜻하지 않습니다.

啍 신규 첫 baseline SHA256은 d836f8960e06bbf1df5fb2e2b873a92a4aacc876c02e3a3aa802484449d322e3이며 독립적인 기존 compiled 해시로 주장하지 않습니다. 파생 경계는 啍2획 .3049756710092607, 騢12획 .4258373205741626입니다. 원16획 위험을 포함한 fresh native 검증은 아직 하지 않았습니다.
