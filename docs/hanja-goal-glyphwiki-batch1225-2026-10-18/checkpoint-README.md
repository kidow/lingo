# Batch1225 邅 recovered direct variant HOLD

Root가 선택u9085-var-001 whole1을 실제2SVG520에서 관찰해 국내辶두점/후보한점 wholeFAIL을확인했습니다. 방향1–4도실제2SVG520에서모두FAIL,5–17은미관찰이며 fine/coarse/경계/자연재생0에서중단했습니다. 다른whole/current-fixed version/과거PASS를승계하지않습니다. native/runtime승인false입니다.

원recoveredsource7/proof/full5/id7/NOTICE·old843보류와고정mixed-date provenance는불변입니다. native config19입력(원source7·기존native3포함)+신규native5=24핀입니다. 원compileProgressive(trace,full5,id7) 명시3인자를nativecaller의필수arity3guard로1회호출했고GETcache0/engine0입니다. compileSourceWhole/root export는없습니다. 17p17m32 SHAc163013d34fe0cbe45aca05f0a79b72b55ad4b7ccc82b8b3c84d39d150c82a60을고정할뿐checkpoint compile0입니다.

Root PID60381/session26553/port61191 정확종료true,wrapper별도poll미확인입니다. 기존843원archive dependency누락원문은삭제하지않고이번recovery를원archive동일정체성으로주장하지않습니다. 국내SVG RAMonly/새serverHTTPbuildGit0입니다.

부모1224 actual SHA92803365bad36adba7730533b9dd9f260827b31019ae39ebeeecea100017f943·5645/333 hist346res88active258refs281을승계합니다. canonical843邅object1 중복을유지하여신규hold0/해제0/runtime0,refs282입니다. 집중1/구문1 각exit0 PASS 및 rootactualabsence1회 exit0 PASS로 확정했습니다. 邅17 lookupnull/registryglyph0·unique5645/잔333, actualCheckpoint/Registry/runtimeAbsenceVerified=true이며 native/runtime등록false는 그대로입니다.

Root actual 명령:
```sh
rtk proxy node --input-type=module <<'JS'
import assert from'node:assert/strict';import{HANJA_STROKES,hanjaStrokeData}from'./lib/hanja-strokes.ts';const unique=new Set(HANJA_STROKES.map(x=>x.glyph));assert.equal(unique.size,5645);const records=HANJA_STROKES.filter(x=>x.glyph==='邅');assert.equal(records.length,0);assert.equal(hanjaStrokeData({glyph:'邅',strokes:17}),null);console.log(JSON.stringify({batch:1225,glyph:'邅',passed:true,lookupNull:true,registryGlyphRecords:records.length,registryCount:unique.size,remaining:5978-unique.size,sourceCompilations:0,engineRuns:0,build:false}));
JS
```
