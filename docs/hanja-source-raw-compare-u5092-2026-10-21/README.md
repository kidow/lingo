# 傒 원 raw 정적 비교 준비

현재 실제224 미적용 중 傒(u5092)를 확인한 뒤 준비한 정적 helper입니다. 국내12획과 base 원raw14개를 whole·single·prefix로 독립 대조합니다. 같은 번호 대응·새 그룹·합획·방향·시간·애니메이션·native/APP/runtime 승인은 모두 없습니다. 기존 원1021 exactjoin0/min14>12 HOLD와 sourceGroups=[] 및 NOTICE는 불변입니다.

## 고정 출처

단일 actualfull5 `docs/hanja-goal-glyphwiki-batch1021-2026-10-13/engine-proof.json` (SHA256 `4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d`)의 defaults·engineHashes·engineRevision·groups·trace 5키를 직접 읽고 root/file/SHA identity3를 검사합니다. 같은 선택 body3 `engine-whole-u5092.json` (SHA256 `6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e`)의 defaults/groups/trace와 정확히 같음을 별도 확인했습니다. header/body 혼합·다른 variant 이식·기존 progressive/serve 실행은0입니다.

원14raw/14calls/35polygon을 원좌표 M/L/Z로 표시합니다. 원raw/guide/폭/weight/기하를 재생성하거나 source를 투영하지 않습니다. 원VS0의 body바이트가 같아도 이 helper의 선택은 base 하나뿐이며 VS0의 새로운 근거로 승계하지 않습니다.

국내 고정 URL `http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5092.svg`, 6159bytes, SHA256 `62fca9865335de4abdb2fc3a39d4b5a9ed707091f67588f30394b5a88349551d`를 ROOT 서버 startup RAM에서1회 검증합니다. 실제 root XML viewBox·group transform을 해당 XML에서 읽어 그대로 표시하고 작성 시 추정하지 않습니다. GET fetch0·미디어 저장0이며 author HTTP/실제XML/서버/UI0입니다.

## ROOT 실행

```sh
PYTHONIOENCODING=utf-8 rtk proxy python3 -B docs/hanja-source-raw-compare-u5092-2026-10-21/serve.py --help
PYTHONIOENCODING=utf-8 rtk proxy python3 -B docs/hanja-source-raw-compare-u5092-2026-10-21/serve.py --port 0
```

author는 UTF-8 `--help`만 최초1회 실행하며 서버는 시작하지 않습니다. `--help`는 argparse가 startup fetch 전에 종료합니다. ROOT가 출력된 localhost 포트와 PID를 기록하고 검토 종료 후 해당 서버만 종료합니다. 현재 다른 후보의 ROOT 서버는 건드리지 않습니다.

먼저 `/whole`의 국내12/base14를 비교합니다. `/compare?source=base&domestic=1&raw=1`에서 국내1~12와 원raw1~14 single을 독립 선택합니다. 같은 번호가 맞는다는 가정은 없습니다. 두 prefix도 `dview=prefix&rview=prefix`로 별도 선택합니다. 예: `/compare?source=base&domestic=12&raw=14&dview=prefix&rview=prefix`. 이 route는 정적 누적 표시일 뿐 시간적 경로 승인이 아닙니다.

## 현재 누락 확인과 검증 범위

232 manifest와 이전 actual225 RAM에서 傒를 확인했습니다. 현재 registry에서 ROOT1338 import/spread 정확2줄만 RAM 역제거했을 때 기존 `03cb710005014bf848864f4c72e46a7d0f247b83096585cae6ee9fafb35f7197` 바이트 SHA로 복원되고, 새해소는 湺 한 글자뿐입니다. 1338 resume 실제5754/224를 읽었으며 registry 모듈 평가0입니다. 후속 u5092 자료는 원batch1021만 있고 별도 정적 helper/native 관찰 기록은 발견하지 못했습니다.

새 계약검사 최초1회와 필요한 Node/Python 구문·UTF-8 help·최종metadata만 확인합니다. 합성 국내 XML은 parser 계약만 검증하며 실제 HTTP/XML/native 관찰을 대신하지 않습니다. 기존 원source/APP/검사·compiler/factory/engine/projection/Git/build/TSC는 실행하지 않습니다. 실제 검사 결과와 정확 파일핀은 validation.json에 기록합니다.

최초 결과: 새focused1 PASS(raw single14/prefix14·원35polygon exact-once·합성 국내 single/prefix24·query19/identity4/proof-role2/XML3 반례). 새Node구문1/PythonAST1/helperguard1 및 UTF-8 CLI --help1(exit0) 모두 첫PASS입니다. HTTP/실제XML/서버/기하·projection·compiler·engine·기존검사0이고 작성 실패/반복0입니다. 원입력12+own4핀 불일치0이며 이후 실행은 README ownpin/최종JSON·exact5 metadata1뿐입니다.
