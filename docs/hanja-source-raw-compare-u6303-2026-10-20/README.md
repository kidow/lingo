# 挃 원 raw 정적 비교 하네스

국내9획과 선택base/VS0 원10raw·24polygon을 순수하게 나란히 보는 도구입니다. 원901 whole2 호환 관찰과10raw/국내9 수치 보류는 그대로이며 새 native·필순·경계·애니메이션·runtime 승인은 모두 false입니다. 두raw를 국내 한획으로 합치거나 source8/factory/새기하를 만들지 않습니다.

두 source는 각각 원본 actual full5(engineRevision/engineHashes/groups/trace/defaults) 바이트와 id3(root,file,fileSHA256)를 그대로 고정합니다. 현재 두 파일SHA는 같지만 별개명칭을 보존하며 source를 섞거나 alias/동일버전 승인을 추정하지 않습니다. 원baseheader를 VS0trace와 결합하지 않습니다. capturedRecords4는 원자료 건수이며 closure4나 새로운 engine보증이 아닙니다. 원HOLD/NOTICE/원proof는 변경하지 않습니다.

각raw의 원groups.polygons를 원좌표 그대로 M/L/Z로 직렬화합니다. 모든off=0만 허용하며 source viewBox0 0 200 200을 사용합니다. 정규화·좌표곱셈·보간·새connector·tail분리·order추론은 없습니다. whole은원raw1→10 순서의24polygon을 각1회만 포함합니다. raw선택은 해당 원그룹만, prefix선택은 원1..선택raw까지 순서대로 표시하며 새획그룹이 아닙니다. 국내번호와 원raw번호는 독립선택이고 서로대응 승인이라는 뜻이 아닙니다.

루트 전용 실행(준비 중 실행하지 않음):
```sh
python3 docs/hanja-source-raw-compare-u6303-2026-10-20/serve.py --port 0
```
한개127.0.0.1 서버만 허용합니다. 서버 시작때 고정URL/bytes4529/SHA의 국내SVG를 RAM에서 딱1회 가져옵니다. 원title·transform·9clip→원outline·delay순서를 엄격확인하고 파일/로그에 저장하지 않습니다. 국내참조helper를 import하거나 compile하지 않습니다. 서버준비에 실패하면 추가다운로드/자동재시도 없이 중단합니다. root는 PID/port/session을 기록하고 끝나면 본인서버/래퍼만 종료합니다.

`/` 또는 `/whole`은국내전체/base전체/VS0전체 각520px. `/compare?source=base&domestic=1&raw=1&dview=single&rview=single`은국내선택과원선택 두520패널입니다. 국내1..9, 원raw1..10, 각자료의single/prefix를 독립버튼으로 바꿉니다. `/checks`는정적메타만반환하며 source/privateSVG내용은JSON에넣지않습니다. 픽셀고정520, query빈값/중복/알수없는키/범위밖/원source별칭은거부합니다. prefix의선택polygon숫자는raw그룹수를획수라고부르지않습니다. 동작script/partial애니메이션0입니다.

준비검사는 새JSON/고정핀/두root24polygon exactlyonce/국내metadata9·raw10/신규route·정적표시 계약 한정1회, check Node구문1·Python AST1입니다. 기존901검사/engine/sourcecompiler/브라우저/HTTP/서버/빌드는 실행하지 않습니다. root의추후브라우저확인 전 whole/원획방향/국내원획대응은새승인0입니다.
