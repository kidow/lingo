# Batch995 乏 · native/source 보류 확정

2026-10-18 root 브라우저 패널에서14개 whole과 국내↔후보5개 pen을 실제 비교했다. Base·02·K·VS0·var002의5개 whole만 자형이 호환되며 다른9개는 부적합이었다. 선택 base 후보의3~5획은 국내 획 경계와 일치하지 않는다. 국내3획은 순수 가로,4획은 대각선,5획은 왼쪽 nib과 긴 오른쪽 sweep인데 source 후보는3획에가로+대각선을 묶는다. 승인된 방향 집합은 없고 fine·coarse·재생 검토는0이다.

호환5개 source 모두6raw이며 유일한 정확한 연속 접점은0-based raw2→3(가로→대각선)이다. 이를 묶은 무제약 수치상 최소는5획으로 가능하므로 '모든 source의 최소가5를 초과한다'고 주장하지 않는다. 국내3획 가로를 분리하면6획이다. 국내5획에 필요한 raw4 nib→raw5 sweep의 접점은 base/K/VS0/var002에서(50,130)→(48,130),02에서(106,130.8)→(105,130.8)로 각각Δx=-2/-1이다. raw3→4도 불연속이다. 좌표·방향·경로·폭·polygon을 바꾸거나 connector를 만들지 않고 국내5획 경계로 묶을 수 있는 호환 whole은 확보되지 않았다.

원27개 readiness manifest와 기존 NOTICE·readiness 두 파일까지 총29개를 보존한다. 새 native-hold.json/validation.json/README.md/resume.json만 작성한다. 원래 source·metadata·helper·compiler·NOTICE는 바꾸지 않았다. 실제994 부모SHA를 확인하고 focused 검증1회 PASS했다. 문자열80·객체208개를 포함한56개 resume 참조의288개 고유canonical 보류에 중복이 없으므로 乏1건을 추가해289건이다. 실제 runtime은5,506/5,978자·미적용472자로 유지한다. 다음은996偪11획이다. Native/runtime 승인과 앱 자동재생 UI 검증은 없으며 서버·빌드·Git은 실행하지 않았다.
