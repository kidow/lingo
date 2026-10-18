# Compound H→V terminal23 source-only experiment

대상은 咷1101·2획, 描1082(corrected순서 유지)·9획, 鶂1105·15획뿐입니다. 원H/right·V/down primitive의 outline조각·bounds·가중치를 그대로 복원하여 목표pen의mask1개만2개로 나눕니다. 획수·다각형·스타일·순서·좌표·원trace·폭·기존hold/NOTICE는 바꾸지 않습니다. maxY guide연장안은 구현하지 않습니다.

정확히 이어지는 양의H→양의V와 terminal22/23, 원polygon1+2개, 현재고정3점guide만 허용합니다. proof키·identity의대소문자와./접두사는 각 원계약대로 보존합니다. 단순마스크분리는 국내방향승인이 아니며 모든native/runtime승인은 false입니다. 원H/V경계에서의nib 진행,0→epsilon,99.99→100,520px방향/자연재생은 root의 신규시각검토가 필요합니다. 전 production대상 일괄적용안이 아닙니다.

각source양성1회와 strict음성검사·원polygon exactlyonce/면적경계검사를 source-check.mjs로 수행합니다. 원proof+기존strictcompiler가 고정된 상태에서만 동작합니다. 새guide좌표·connector·width 생성0,engine0.

serve.py --target 1101|1082|1105 --port 0 은 고정공개fixtures.json을 캐시하여 startup/GET sourcecompile0입니다. 국내SVG는 root서버의RAM에만 존재합니다. /whole,/pairs?stroke=N,/progressive?stroke=N 및 &coarse=1,520px,0/epsilon/95/99.99/100,경계전중후,9coarse,8초자연재생을 지원합니다. 서버 시작·native검토는 이번준비에서 실행하지 않습니다.

집중검증1회 exit0: 각target양성1compile,描21/咷19/鶂17 strict변형거부,원polygon exactlyonce·목표외pen불변·PythonAST/정적guard각1회 PASS. Node구문2파일각1회 exit0. 공개baseline/파생fixture를 fixtures.json에고정하고RAM에도보존합니다. 원입력은 描37·咷39·鶂31핀(공유핀중복포함)을엄격확인했습니다.

면적probe는 V mask 내부진행률을 기준으로한 부동소수 shoelace입니다(wholepen 99.99가아님). V mask .9999의잔여면적은 描.0000255025/咷.0000299756/鶂.0000224202 정규화면적이며1에서0,0에서0입니다. epsilon 근처2e-13수치는상쇄오차를포함합니다. 이산픽셀/AA나 국내획방향을 보증하지 않습니다. 신규native관찰0,기존보류유지/runtime미적용입니다.
