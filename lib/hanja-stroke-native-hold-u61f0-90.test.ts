import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const dir='../docs/hanja-source-cached-order2-u61f0-2026-10-23/'
test('懰 shared90 native HOLD metadata preserves 40 images and 39 scopes without approval',()=>{
 const bytes=readFileSync(new URL(dir+'initial-native-hold.json',import.meta.url)),r=JSON.parse(bytes.toString()),p=JSON.parse(readFileSync(new URL(dir+'native-preparation-state.json',import.meta.url),'utf8')),o=r.observations
 assert.equal(createHash('sha256').update(bytes).digest('hex'),p.nativeRecordSHA256)
 assert.deepEqual([o.screenshots,o.uniqueScopes,o.extraRepeatedFailedScope,o.uniquePassedScopes,o.uniqueFailedScopes],[40,39,1,38,1])
 assert.deepEqual([o.epsilon.passed,o.localPoint03.passed,o.localPoint03.failed,o.originalFullRoundResidual.white],[13,12,1,13])
 assert.equal(o.passedScreenshots+o.failedScreenshots,40);assert.equal(o.allBadAndErrorsEmpty,true);assert.equal(o.emptyBadAndErrorsDoNotOverrideVisualFailure,true)
 assert.deepEqual([r.failure.pen,r.failure.mask,r.failure.localProgressRequested,r.failure.globalProgress],[5,2,.03,.5009887427846339])
 assert.deepEqual(r.failure.UA,{L:18.11495018005371,d:.5434485054015988,q:{x:32.896705627441406,y:34.64826202392578}})
 assert.deepEqual(r.failure.previousVisibleMaskBounds,{xmin:33.95,ymax:32.95})
 assert.equal(o.originalFullRoundResidual.modeLabel,'u7e58');assert.equal(o.originalFullRoundResidual.actualPAndProfileRoot,'u61f0-order2')
 assert.deepEqual([r.SSR.CJS,r.SSR.ESM,r.server.PID,r.server.session,r.server.exitCode],[102,102,57632,28110,130]);assert.equal(r.server.emptyOutputConfirmed,true)
 for(const k of['nativeApproval','runtimeApplied','registered']){assert.equal(r[k],false);assert.equal(p[k],false)}
 assert.equal(r.isolatedActualComponentBrowserVerified,false);assert.equal(p.sourceContactGatePassed,false);assert.deepEqual(p.failedTargets,[[5,2]])
 assert.equal(r.inputSHA256['components/hanja/stroke-outlines.tsx'],'65a5fb6fa26f94b06c57d463f5206dbc36b2e3470630204948db8e411f9d7092')
 assert.equal(r.inputSHA256['scripts/hanja-actual-component-review.mjs'],'94f7e350a6a281e7470e46b2cf985aa90c9ce9ee89ba901248ce01b758594db2')
 assert.equal(r.inputSHA256[r.profile],'8d671a94dd685c9ac0b612f31a90405db0270e664c21137bd4e33c4b9d523d9e')
 console.log(JSON.stringify({metadataPass:true,screenshots:40,uniqueScopes:39,failedTarget:'5m2',nativeApproval:false,registered:false,renderReruns:0}))
})
