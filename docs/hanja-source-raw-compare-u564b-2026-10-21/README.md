# 噋 원raw 정적 비교 준비

원batch970의 고정18raw·33polygon을 직접 표시합니다. 기존sourcecompiler/strictadapter·factory·engine·새논리group·기하투영은0입니다. 모든 M/L/Z는 원polygon 좌표를 그대로 직렬화하는 정적 표시이며 새guide·좌표·폭·weight·연결선을 만들지 않습니다. 원HOLD/NOTICE와 native/runtime/app false는 불변입니다.

원연속group최소16>국내15이며 비연속zero-based[9,11]폐합은 승인하지 않습니다. raw 번호와 국내 번호는 독립 선택이고 같은 번호가 같은 획이라는 주장을 하지 않습니다. 정적 대응·prefix만으로 합획·시간적방향·필순을 승인하지 않습니다.

## 실행과 controls

ROOT만 다음 서버를 시작합니다. author 서버/UI0입니다.

```bash
python3 /Users/kidow/Documents/dev/kidow/lingo/docs/hanja-source-raw-compare-u564b-2026-10-21/serve.py --port 0
```

- `/whole`: 국내 전체15 / base 원전체18 / VS0 원전체18
- `/compare?source=base&domestic=1&raw=1`: 각 single
- `/compare?source=base&domestic=15&raw=18&dview=prefix&rview=prefix`: 각 누적 prefix
- `source=base|vs0`, 국내1..15/raw1..18 및 각single/prefix를 독립 선택합니다.
- 모든 SVG520×520. 원source viewBox200, 국내 실제root viewBox `0 0 1024 1152`를 보존합니다.

## 원자료·기존검사 경계

base body3는 기존actualfull5 `engine-proof.json`의 defaults/groups/trace와 정확히 같으며 두 원파일을 각각 고정합니다. VS0는 별도body3-only로 남기고 baseheader를 결합하지 않습니다. original strictidentity5는 config에 그대로 보존하되 호출하지 않습니다. 새static identity3(root/원filename/SHA)는 원compiler id5를 대체하거나 완화한 계약이 아닙니다. 모든원proof키·바이트·raw/trace/polygon을 고정합니다. trace에는18raw에19call 기록이 있으며 원polygon은33개입니다.

기존 serve-native.py는 startup/GET에서 compiled()를 호출하고 비연속 profile을 거절하는 구조입니다. 해당 helper/adapter를 수정·import·실행하지 않습니다. 과거source/HTTP/preflight 검사기록을 새검사로 반복하지 않습니다. 새standalone helper5만 사용하며 梲 helper와 서버·RAM 상태를 공유하지 않습니다.

국내 고정URL·7277bytes·SHA47f79c87cf7b87f1797e85d07984a2b4ff3b037f7dbfeba9ab21aaa18bd263d3를 유지합니다. 최초sandbox 메타조회는 DNS 실패로 bytes0이었고 허용된 escalated RAM조회1에서200·길이·SHA·실제root속성과g transform을 확인했습니다. SVG 원문저장0입니다. 신규helper 실제XML fetch/parser 전체가 이미 검증됐다는 주장은 하지 않습니다. ROOT startup에서만 RAM1회fetch하고 GET은 추가fetch0입니다.

새focused1은 원polygon exact-once·rawsingle/prefix·국내single/prefix·query/identity 실제거부·synthetic XML root/viewBox/title·helperguard/Python AST를 확인합니다. checker는 梲과 byte동일하므로 Node구문은 해당 최초PASS를 결박해 재실행하지 않습니다. 기존source·앱·engine 검사와 실제HTTP/서버/UI/build는0이며 결과는 validation.json에 기록합니다.
