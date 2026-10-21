# 孶 VS2 원 LEFT14 quad 캐시 분리 — source-only

선택 VS2 actualfull5/id3와 고정 parent13p18m44에서 logical12의 원 tail quad 하나만 분리한 별도8파일입니다. 실산출은 **13p19m44**입니다. 새 source/native/APP/runtime 승인은 false이며 공유43 기존 renderer로 비교할 뿐 초기 성장 정책을 구현하지 않았습니다. 초기9MQ+1MLQ의 cap HOLD 10대상은 **미해결**입니다.

## 출처와 정확한 변경

- parent: `../hanja-source-independent-vs2-pairs-u5b76-source-experiment-2026-10-21/`, commit `5ef55cb4f7e158e994fbecf0d8ad217ec9528b49`
- parent 기하: `d08f44b6a8a1233cf8bf685cfc5305be1efb9e8ffea4af750af15ebf4c438727`
- 선택 actualfull5: `../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json`, SHA256 `21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0`
- 전체 proof canonical SHA256: `13963a3e69966dbb29354a335493976b0783c69129b228ff3cca2ec8f0b7d874`
- 원 trace/groups/defaults/engineHashes/engineRevision과 root/file/fileSHA identity3, progressive3/whole4를 엄격 결박합니다. 다른 root/body/header 혼합0입니다.
- 근거: `../hanja-u5b76-vs2-left14-eligibility-review-2026-10-21/README.md`. 기존 terminalLeftTail/eligible/derive 본문을 복사하며 old module을 import/호출하지 않습니다. batch997 exactLEFT14 guard와 원 terminal quad가 일치할 때만 분리합니다.

logical12의 원 raw17은 V `[100,136.06,100,172.23,0,1]`와 Q `[100,172.23,100,182.23,90,182.23,1,14]`입니다. ta2%100=14/cy=y2/cx>x2, width6/jump20과 마지막 원 quad SHA256 `ef4880294f155987fd0dc401f1823b52a274fd0410b9f95c5ffa66762b458f90`를 모두 고정합니다. 해당 quad는 원44polygon에 정확히 한 번이며 새 점·connector·guide·폭·weight retune은 없습니다.

| 필드 | 원 body | 새 body / tail |
| --- | --- | --- |
| bounds | [35,67.5,54.5,94.1] | body [45,67.5,54.5,94.1] / tail [35,88.1,45,91.1] |
| guide | `M50 68.03 L50 86.115 Q50 91.115 45 91.115` | body 동일 / tail 기존 left cardinal |
| revealWidth | 14 | body14 동일 / tail 원 quad bounds |
| bodyweight | 25.156068 | 25.156068 동일 |
| tailweight | body에 포함된 원 shape | 추가 mask allocation10=jump/2 |
| 원 polygon | 5개 | body4 + tail1, 원44개 전체는 정확히 한 번 |

body bounds minX35→45는 기존 蓀 active-bounds 재산출 정책과 같이 명시합니다. 瀷 특화예시의 bounds 불변 assert를 이 대상으로 확장하거나 느슨하게 바꾸지 않았습니다. 다른12획은 parent 전체 필드와 deepJSON 동일합니다. 다섯 pair5/6/8/9/11의 마스크·gap·경계는 그대로입니다. 획12 내부 body/tail 배분은 달라지며 고정8초에 시간을 더하는 변화가 아닙니다. 경계 정확 유리수는 6289017/8789017, 기존 JS weight 합산 기준은 0.7155540830106484입니다.

새 기하 canonical SHA256 `572250853463ea4b80aa45e778d9fcc0a4f27dada4dc6b8d5c1b9b090103945b`, fixture 파일 SHA256 `f531fad7b23c8302c721d632e3a14e5ef7e19b1f41de568c9aff5464944ef889`입니다. 원 P의 union은 마지막 원 outline chunk를 독립 mask로만 옮겨 보존합니다. 원 guide r7 ideal sweep 밖에 있던 tail 부분의 별도 노출을 위한 준비이며 이것만으로 coverage·연결·raster·완료 차이가 해결됐다고 주장하지 않습니다.

## 실행 경계와 아직 미승인인 부분

원 compiler/factory/engine/sourceprojection을 호출하지 않았습니다. 원 공개 parent fixture만 읽고 **cached tail derivation 최초1회** 후 **즉시 새 fixture.json을 먼저 저장**했습니다. fixture가 있으면 captureDerivation을 거부하며 이후 캐시 양성검사와 startup/GET은 sourcegeometry/derive/projection/compiler/engine0입니다. parent가 과거에 수행한 projection1/사전핀경로FAIL1 이력과 원822 min/HOLD/NOTICE·false는 변경하지 않았습니다.

원 HOLD의 시작 FAIL10(5/6/8/9 각두MQ,11Q,12MLQ)은 여전히 미해결입니다. 11H 단일 epsilon 화면에서 새 ink가 보이지 않았던 사실은 전체 시작 PASS가 아닙니다. parent12의 near1/1 left-foot 형태 차이는 별도 관찰이며 새 분리후 completion 승인이 아닙니다. 초기 arc7 수학조건은 원P coverage/후반 Q/UA/합획 연결성이나 국내 시간·방향 승인으로 확대하지 않습니다. epsilon .0001%는 현재 논리획 global1e-6이고 mask-local은 별도 미계측입니다.

## ROOT 검토 CLI와 최초 검사

`rtk proxy python3 -B docs/hanja-source-independent-vs2-pairs-left-u5b76-source-experiment-2026-10-21/serve.py --port 0`

`/whole`, `/pairs?stroke=12`, `/progressive?stroke=12&coarse=1`, `/progressive?stroke=12`와 미해결5/6/8/9/11 링크를 제공합니다. 국내/원논리baseline/후보3SVG520, coarse9각220, 고정8초 재생과 모든 다중 경계 before/at/after·0/epsilon/95/fine controls입니다. 국내SVG는 고정 rawhelper를 ROOT startup RAM1회 사용하며 저장하지 않습니다. baseline은 같은 source논리projection clone이라 독립 정답 근거가 아닙니다.

새 focused는 캐시양성1·필요음성, exactquad/원44poly once/다른12획 deepJSON/guide·폭·bodyweight 보존·activebounds/원 커널·derive 본문을 한 번 검사합니다. 필요한 새 Node2/선언AST1/PythonAST1/embeddedJS1/helperguard1/최종메타1만 수행하고 기존 통과 검사·수학·sourceprojection/derive를 반복하지 않습니다. UI/server/Git/build/TSC0이며 결과는 prep.json에 별도로 남깁니다.

최초 새 focused는 캐시양성1·실질음성24, 다른12획 deepJSON·원44polygon/quad exact-once·원guide/revealWidth/bodyweight·activebounds35→45·기존 kernel/eligible/derive 본문 바이트 보존을 PASS했습니다. Node구문 candidate/check 각1·선언AST1·PythonAST1·embeddedJS1·helperguard1/query양성6·음성14도 모두 처음 실행에서 PASS했습니다. cached tail derivation 성공1 뒤 재실행0이며 기존 통과 검사·산술 반복0입니다. 최종메타는 exact8/own7핀·캐시digest·결과필드만1회 확인합니다. cap10대상 미해결 및 새후보 completion/native/APP/runtime 미승인은 그대로입니다.
