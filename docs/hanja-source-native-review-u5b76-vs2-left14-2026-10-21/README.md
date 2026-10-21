# 孶 VS2 LEFT12 분리 후보 — 제한 native 관찰

ROOT가 source8 commit prefix `cef3a673`의 변경된 logical12만 실제 검토했습니다. 이전 near1/1 foot shape jump는 이번 완료 부근3샘플에서 관찰되지 않았고, 새 body/tail 경계3샘플에서도 큰 새 꼬리 조각 jump는 관찰되지 않았습니다. 이는 한자 전체 완료나 source/native 전체·UA 연속성·방향·APP/runtime 승인이 아닙니다. 기존 초기 cap10대상 HOLD는 그대로이며 이번에 재검사하지 않았습니다.

## ROOT 실제 관찰

browser2/tab63, port59412/PID8119/session98411에서 다음을 관찰했습니다.

| 범위 | 실제 샘플 | 관찰 |
| --- | --- | --- |
| logical12 완료 부근 | global .9999 / .99999999 / 1, main candidate SVG520 3샘플 | 이전 foot shape jump 미관찰 |
| logical12 내부 body/tail 경계 | 0.7155540830106484의 before/at/after, SVG520 3샘플 | 큰 새 꼬리 조각 jump 미관찰 |
| logical12 coarse | 0/.125/.25/.375/.5/.625/.75/.875/1, candidate SVG220 9샘플 | body 아래쪽에서 tail 왼쪽으로 진행 표시 |

서로 다른 관찰 case는15개입니다. coarse .125는 rect x12.3295/y81.5625/width220으로 한 번 더 확인했으며 **같은 case의 추가 관찰1**입니다. 이를 새 coarse 단계나 독립 테스트로 더하지 않습니다. 경계 before/after의 delta는 이번 전달에 없으므로 추정하지 않습니다. 시간연속 전체영상이나 모든 RAF 관찰을 주장하지 않습니다.

`#status`가 없어 selector timeout1이 있었고 이후 body DOM을 확인했습니다. console 검사는0이므로 errors[]를 주장하지 않습니다. ROOT 서버는 Ctrl-C/SIGINT exit130, 출력0 후 ps에서 PID8119 부재를 확인했습니다. 작성자는 UI/서버를 실행하지 않았습니다.

## 고정 출처와 미승인 범위

- source8: `../hanja-source-independent-vs2-pairs-left-u5b76-source-experiment-2026-10-21/`
- 13p19m44, 원18raw/19calls·44polygon.
- 기하 SHA256: `572250853463ea4b80aa45e778d9fcc0a4f27dada4dc6b8d5c1b9b090103945b`
- fixture SHA256: `f531fad7b23c8302c721d632e3a14e5ef7e19b1f41de568c9aff5464944ef889`
- VS2 actualfull5/id3 단일 출처 및 원 guide14/bodyweight25.156068·다른12획·5pair gap은 그대로입니다.
- logical12만 원 LEFT14 quad로 분리하며 active bodybounds minX35→45를 명시한 후보입니다. 이전13p18m44와 모든 원 HOLD/NOTICE/preparation false를 변경하지 않습니다.
- baseline은 같은 source projection clone이므로 독립 정답 근거가 아닙니다.

초기9MQ+1MLQ cap10개는 기존 HOLD 그대로입니다. 11m1 단일 epsilon 빈 화면을 일반 시작 PASS로 바꾸지 않습니다. 이번 제한 관찰로 다른 pen, whole, 국내 방향/시간적 합획, 전체 native, 실제 APP controller/routes/storage 또는 runtime을 승인하지 않습니다. 과거 source와 초기기하 proof의 false/제한 범위도 그대로입니다.

새 두 파일의 JSON/README digest·입력52핀을 메타1회 확인합니다. 기존 검사·산술·source projection/derive/compiler/factory/engine·build/TSC·UI/서버·Git0입니다.
