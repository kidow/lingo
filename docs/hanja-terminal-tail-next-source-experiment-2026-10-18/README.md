# 원 terminal tail 3자 source-only 후보

葸632·鱨635·翛658의 고정 원sourceGroups와 마지막 tail polygon만 사용합니다. 국내 whole·방향·경계·fine·coarse·실재생 승인은 아직 없습니다. 기존 보류와 원자료는 변경하지 않습니다.

|후보|선택 whole|목표획|방향|pen/mask/polygon|mask2 시작|
|---|---|---:|---|---|---:|
|葸632|u8478-var-001|11|up|13/14/29|0.8266063967147433|
|鱨635|u9c68|21|up|25/26/55|0.8902371296786508|
|翛658|u7fdb|8|left|13/14/39|0.8881292053979672|

원56파일과 원997의 UP/LEFT+point 본문 SHA 7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08을 보존합니다. 葸 선택var001 원11획 raw11을 사용하며, 비선택G의 raw10을 같은획으로 간주하지 않습니다. 鱨의 고정 provider0과 葸의 provider3·NOTICE·archive 기록을 보존합니다. 翛은8획만 분리하고11획 등 나머지 원mask는 그대로입니다. 僎645 두 tail은 별도 다중target 계약 검토 전 제외합니다.

신규 compileProgressive는 full5 proof와 정확한 unprefixed id3(root/file/fileSHA256)를 필수3인자로 받습니다. compileSourceWhole은 필수4인자입니다. proof/header4/trace 원closure·입력SHA·identity 전체를 거부검사한 뒤 원legacy2를 호출합니다. 양성baseline은 이 실험의 첫capture이며 과거 독립baseline SHA로 주장하지 않습니다.

원마지막polygon을 기존 primitive로 별도 UP/LEFT mask로 분리하고 body outline/bounds에서 같은polygon을 제외합니다. body guide/width/weight/direction과 다른mask·필순은 보존합니다. body bounds는 남은 원정점으로 재계산하며 새정점·좌표·경로·connector는 만들지 않습니다. 모든 원polygon exact-once 검증을 했습니다.

source-check 단1회: 원compiler 양성 각1(합3), delegate 이전 엄격음성 각17(합51), Python AST1·helper staticguard1 PASS. Node module/source-check 구문 각1 PASS. engine/network/privateHTTP/server 0. fixtures.json은 공개source에서만 계산된 baseline/후보 결과입니다. 면적probe는 tail mask 자체의 localprogress로, 전체획/AA/native 연속성 인증이 아닙니다. 0·epsilon은 roundcap와 경계stamp를 native에서 다시 확인해야 합니다.

직접실행 전용(다른 cached runner로 감싸지 않음):

```sh
python3 -B docs/hanja-terminal-tail-next-source-experiment-2026-10-18/serve.py --target 632 --port 0
```

--target은632/635/658입니다. helper는 fixture를 한 번 RAM cache하고 startup/GET에서 Node/source compiler/engine을 실행하지 않습니다. 국내SVG는 기존고정 sharedrenderer를 통해 RAM에서만 가져옵니다. 520px 세SVG, .0001 slider, 0/epsilon/95/99.99/100·9 coarse·mask경계 전중후·8초 자연재생 UI를 지원합니다. 사용 완료 후 서버와 wrapper를 종료합니다. 원domestic SVG·스크린샷은 저장하지 않습니다.
