# 綎11 원P terminal coverage 검토 보드

원13p15m35/geometry `43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67`의11m1만 읽습니다. 원P/guide `M36.825 16.5 L52.975 16.5 L43 44.5`/width14/weight45.873738와 raw8·9의 원 flags22/113을 고정합니다. 원source·원polygon·guide끝·폭·순서·tail분할 변경0, 신규source/factory/compiler/engine/geometry 실행0입니다.

세 비교패널은 같은 viewBox0 0 100 100/동일520px 배율(패널간1:1)입니다. 첫째는원P, 둘째는원guide의전체 round/miter stroke width14, 셋째는 흰배경 mask에서 같은 full guide를 검정으로 빼고 원P검정을 표시한 잔여입니다. 명목원source좌표를1SVGpixel로바꾸지않습니다. fullguide에는pathLength/dasharray/dashoffset이없고 원전체path를그립니다. 같은연결된mask guide의 실제UA getTotalLength와그L의endpoint를같은호출에서읽으며 수학L/추정L로대체하지않습니다. 문서/owner/부모/transform/source필드를전·중·후확인하고실패시잔여ink를숨기며 ready=false/errors를명시합니다. ready=true만검토가능표시이고 nativePASS가아닙니다.

witness버튼은 별도네번째패널에서만 marker를보입니다. 잔여패널에는 marker/주석/선이덮이지않습니다. 기존읽기산술값을그대로저장했고다시계산하지않습니다. 원foot vertex=(753/20,1011/20)의마지막segment거리²2609/40>49입니다. strict-interior witness=(3027/80,50201/1000)는원4점body polygon의네edge orientation양성이고 마지막segment projection>1/거리²236611229/4000000>49입니다. join의최대y23.5보다아래에있다는이상기하반례만보존합니다. 이것을ROOT native near1→1형태차이의원인으로확정하거나 actualUA coverage를보았다고하지않습니다. 원마지막5점polygon은상단corner이며foot의별도tail이아니므로기존UP/LEFTguard를임의확장하지않습니다.

ROOT CLI: `python3 docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/serve.py --port 59412`

`/coverage`(기본 `/` 동일), `/checks`만제공합니다. ROOT가잔여실화면과nativeL/endpoint/ready/error를함께확인해야합니다. 실제browser/server/UI는저자가실행하지않았습니다. 수학witness표시/UA mock은실제coverage승인이아닙니다. 원HOLD2/source8/proof1/false는불변이며 nativeCoverage/actualAPP/runtimefalse입니다.

신규검사1은 source핀/원mask/명시route/uniquecontrol-mask IDs/0geometry/실제길이API호출순서 mock/변조negative와PythonAST·embeddedJS구문을확인합니다. 이전기하·source·math·renderer suite는재실행하지않습니다.
