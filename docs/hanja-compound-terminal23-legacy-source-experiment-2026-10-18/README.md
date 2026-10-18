# 레거시 H→V23 표시 마스크 격리 실험

鏜1097 15획·餂922 14획·楅600 7획만 대상으로 합니다. 원 H/right·V/down 호출의 폴리곤과 기존 bounds·길이 weight를 그대로 사용합니다. 새 좌표·guide·폭·연결선·필순은 만들지 않습니다. 원 획수와 전체 outline 바이트는 유지하고 대상 획의 마스크만 1→2개가 됩니다.

- 鏜: 기존 full5/id3 strict API에 위임합니다.
- 餂: uppercase SHA256/unprefixed 원 id5를 유지하며 기존 국내순서 [1,2,3,5,6,7,4,8,9,10,11,12,13,14,15] 후보에 위임합니다.
- 楅: 원 2인수 API는 새 필수3/4인수 경계 내부에서만 호출합니다. 원 raw14→13 순서와 empty raw4를 보존합니다. fileSHA는 이번 신규 캡처이며 독립적인 과거 byte-pin이 아닙니다. 최초 양성 출력의 baseline SHA도 이번 신규 기록입니다. 공개 source closure 6개·full5/header4/별도 trace 일치·고정 engine8 hash를 정적으로 확인했으며 archive를 새로 다운로드하거나 engine을 재실행하지 않았습니다.

엄격 guard가 identity 전체·fullproof 전체·trace·원본 byte-pin·H/V flags/접점/폴리곤을 검사한 뒤에만 원 API를 호출합니다. 원 NOTICE/출처/hold/registry는 불변입니다. 새 공개 fixtures만 저장하고 국내 SVG는 헬퍼의 RAM에서만 사용합니다.

루트 검토용 실행: `python3 -B serve.py --target 1097 --port 0` (922/600 선택 가능). 준비 중 서버는 시작하지 않습니다. 고정 공개 fixture cache로 startup/GET sourcecompile0, engine0. `/whole`, `/pairs?stroke=N`, `/progressive?stroke=N`, `/progressive?stroke=N&coarse=1` 및 `/checks`를 제공합니다. actual520·0/epsilon/95/99.99/100·새 H/V 경계 전/중/후·9coarse·자연재생은 root가 별도로 검토해야 합니다.

source-only 실험입니다. p0/epsilon의 가시 잉크, H→V 경계의 역행/도약, AA, 말단 모양, 국내 방향 적합성은 아직 승인하지 않았습니다. 정적 V-mask 면적 probe는 부동소수점 근사이며 whole-pen 시각 certificate가 아닙니다. nativeApproval=false/runtimeApplied=false, canonical 변경0.

집중 검증 1회 exit0: 양성 각1회(총3), 음성53개 모두 원 API 위임 전에 거절, Python AST1회·헬퍼 static guard1회·Node 구문 각1회 PASS. engine/HTTP/server0. 원 폴리곤은 각각 정확히1회 유지했습니다. 鏜19p20m41poly, 餂15p16m28poly, 楅13p14m21poly. 楅 최초 baseline SHA `9c34755ae51b89d75418559bf7769d613017f524c72aeaea4e7c441b3c6805fc`는 이번 캡처입니다. V-local99.99% 잔여면적은 모두 양수지만100%는0이며, 이 수치만으로 root 시각 승인이나 연속성을 주장하지 않습니다.
