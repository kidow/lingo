# Batch1221 褊 native HOLD checkpoint

Root가 선택 hkcs_u890a whole1을 실제 관찰해 국내 첫 세로/戶 첫 가로·올림과 source 점/점의 형상 불일치를 확인했습니다. 2SVG260 방향1·6도 FAIL이며 나머지12방향/fine/coarse/경계/자연재생은 미실시입니다. 다른whole/옛PASS를 승계하지 않습니다. runtime/native승인false입니다.

원source7+native5와 공개proof/NOTICE는 불변입니다. native config22입력핀에는 source7이 포함되고 native 자체5를 합쳐 실제27핀입니다. 원full5·특수id7 capsule/checks ../경로·Sha256, compileProgressive(trace,full5,id7) 필수3을 보존하며 원compileSourceWhole/root export는 없습니다. 원source검증14p15m30 SHA0af2c8473617933322bc4489e8347c55fc1f367212fbf6dfd89c0a27ad377587을 고정할 뿐 checkpoint source compile0입니다.

Root 원helper startup sourcecompiler1·request0·engine0이며 PID25859/session58308/port49311 정확종료true, wrapper 별도poll은 확인하지 않았습니다. 국내SVG는 RAM전용입니다. 새server/HTTP/build/Git0입니다.

부모1220 SHAe6a775da494d1b32e2d77ea08b1e4fed7e1fe061fb335510fc35a8f03678a465 actual5643/335·hist345/res87/active258/refs277를 승계합니다. 기존chain褊중복0→신규object1로 hist346/res87/active259/refs278, runtime수는 그대로입니다. 집중1/구문1 각각 exit0 PASS 및 root actualabsence1회 exit0 PASS로 확정했습니다. 실제褊14 lookupnull/registryglyph0·unique5643/잔335이며 actualCheckpoint/Registry/runtimeAbsenceVerified=true입니다. native/runtime등록승인false는 그대로입니다.

Root actual 명령:
```sh
rtk proxy node --input-type=module <<'JS'
import assert from'node:assert/strict';import{HANJA_STROKES,hanjaStrokeData}from'./lib/hanja-strokes.ts';const unique=new Set(HANJA_STROKES.map(x=>x.glyph));assert.equal(unique.size,5643);const records=HANJA_STROKES.filter(x=>x.glyph==='褊');assert.equal(records.length,0);assert.equal(hanjaStrokeData({glyph:'褊',strokes:14}),null);console.log(JSON.stringify({batch:1221,glyph:'褊',passed:true,lookupNull:true,registryGlyphRecords:records.length,registryCount:unique.size,remaining:5978-unique.size,sourceCompilations:0,engineRuns:0,build:false}));
JS
```
