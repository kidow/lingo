# 僎 두 UP-tail의 독립 분리 실험

선택u50ce의 원16raw·14획·14mask·40polygon을 유지하면서 원5획raw5와8획raw9의 마지막 UP tail polygon만 따로 옮겨14획·16mask·40polygon을 만듭니다. 두 꼬리는 기존997 point/terminalUpTail/terminalLeftTail 함수를 byte동일 재사용하며 원polygon과 정확일치하는 경우에만 허용합니다.

원baseline compiler는 한 번만 호출합니다. 두 target 각각 같은 원baseline에서 독립 derive한 후 해당5·8획 mask만 조합합니다. 변경된baseline에 순차derive하지 않습니다. bodyguide·width·weight·다른mask와 원sourceGroups·모든 원polygon을 보존하며 새 좌표·연결선·순서를 만들지 않습니다.

원source/header/drawtrace/NOTICE/전체dependencyclosure의 핀, 고정full5와 명시id3(root/file/fileSHA256),외부필수3/4→legacy2 내부guard를 유지합니다. 이번baseline/bytepin은 새최초캡처로 과거 독립compiled해시가 아닙니다. 이전645wholebase/VS0호환·14방향·126normal관찰(108승인)은 과거이력이며 현재native승인이 아닙니다. 원5/8끝 보류와fine6/13/14·재생미검토도 보존합니다.

공개fixtures만 저장합니다. 국내SVG는 고정 URL/SHA로 RAM에서만 읽고 파일에 저장하지 않습니다. helper는 frozen 공개fixtures로 startup/GET sourcecompile0·engine0입니다. root가 필요할 때 `python3 -B serve.py --target 645 --port 0`으로 실행하고 검토 후 종료합니다.

`/whole`, `/pairs?stroke=5`, `/pairs?stroke=8`, `/progressive?stroke=5`, `/progressive?stroke=8`, `&coarse=1`을 제공합니다. 각 target의 실제경계가 선택획에 따라 바뀌며 0/epsilon/50/95/99.99/100,전중후,9coarse·자연8초재생을 각각 선택할 수 있습니다. fine/pair는 국내·기존·실험3SVG 각각520px이며, coarse grid의 기존·실험SVG는 각각220px입니다.

꼬리면적 검사는 국소mask 부동소수점 보조검사이며 bodyclipping·AA·전체native연속성·방향을 증명하지 않습니다. native/runtime승격·registry·canonical보류 변경은 하지 않습니다.
