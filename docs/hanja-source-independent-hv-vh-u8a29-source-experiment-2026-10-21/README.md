# 訩 고정 actualfull5 독립 H/V·V/H source-only 후보

원 `docs/hanja-goal-glyphwiki-batch1055-2026-10-13/engine-whole-u8a29.json` 자체5키/full SHA `b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1`와정확id3를고정했습니다. 다른root/header/body의혼합은0입니다. 기존원HOLD/countguard 최소12>국내11/NOTICE/historyfalse는변경하지않습니다. ROOT 정적대응은 `../hanja-source-raw-review-u8a29-2026-10-21/README.md`와review의28유효표본에근거하며 폰트차이·정적대응만확인했음을유지합니다. 방향·시간·합획·nativeanimation·APP/runtime승인은모두false입니다.

1based정적그룹 `[[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,13],[12]]`를그대로고정합니다. raw6끝=7시작(62.125,135),raw11끝=13시작(89.45,169)은각gap0이지만 두pair를**모두 독립2mask**로유지합니다. 원H/V·V/H를한mask로합치거나joinedguide를추가하지않습니다. raw12만원13뒤로옮겨마지막logical11로둡니다. 기존0based[4,7](표시raw5/8)은국내별획이라묶지않습니다.

고정결과는 **11p13m23**, geometry `217071f7050ebbb9e3f2d63c51fda0401004287c00f90de5210f6bd71d74c3bc`입니다. 원raw13개각1mask의모든필드·guide·width·weight·원23polygon을보존하여논리그룹만flatMap합니다. 원flags raw7=22/123,raw11=0/13,raw12=0/23및curve raw9/10도그대로입니다. 원P는기존순수projector의방향정규화/반좌표직렬화만사용하며새점·폭·guide·connector·tailpartition0입니다. 두pair의weights는6:[19.6875,19],10:[70,43.875],경계는6:0.5088852988691438/10:0.6147091108671789입니다. 가중내부배분의표시값일뿐실제국내획시간검증아닙니다.

기존8067byte compileBound 본문을닫힌새pure rawprojector로바이트동일보존합니다. 원engine/compiler/factory실행0이며**새pureprojection FIRST1/internalRawProjector1** 후결과를즉시fixtures.json에저장했습니다. 이후추가projection/재산출0이고publicfixture의고정SHA를우선읽습니다. candidate의capture는이미fixture가있으면거부합니다. 정상cachedpositive는1회만검사합니다. 역사projection1과현재compileProgressive에서의projection0을구분합니다.

fixture baseline은원순서의기존최소12개논리그룹이되각rawmask는독립입니다. 후보10은baseline12,후보11은baseline11을대조하므로누적prefix차이가있습니다. baseline이정답이라는뜻이아니며원기하·maskfields는같습니다.

ROOT CLI: `python3 docs/hanja-source-independent-hv-vh-u8a29-source-experiment-2026-10-21/serve.py --port 59412`. UTF-8선언을명시하고 `--help`1회로실제CLI구문을확인합니다. default10, `/whole`, `/pairs?stroke=6`, `/progressive?stroke=10`, `&coarse=1`을제공합니다. 실제국내XML은고정rawhelper의fetch/parser함수만사용해ROOTstartupRAM1회읽으며viewBox·transform을추정하지않습니다. originallegacy/compilerhelper를import/run하지않습니다. 새Pythonhelper의startup/GET는fixture와shared43본문만읽고Node/compiler/engine/projector를호출하지않습니다.

신규검사는고유strictfull5/id3/arity/모든field·그룹·mask/23poly exactlyonce·cachedpositive1·음성·신규구문/메타최초만입니다. 원scalarcardinal시작finitechunk/terminal13·23형태차이와2curve의고정roundcap초기닙·후반coverage는아직미검토입니다. ROOT가첫새native실패에서멈춰판단해야합니다. 이source생성으로이위험을해결했다고주장하지않습니다. 작성HTTP/서버/UI/Git/build/TSC0입니다.
