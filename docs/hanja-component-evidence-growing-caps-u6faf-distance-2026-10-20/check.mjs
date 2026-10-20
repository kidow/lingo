import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {historicalAppSnapshotBindings,verifyHistoricalAppSnapshotBytes,readHistoricalAppSnapshot,historicalEvidence} from './resolver.mjs';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const EXPECTED=[{"originalPath":"lib/hanja-stroke-start-gate-can.ts","expectedSHA256":"472be0fadeb11edc77d89fb3645a809f9a9f062387af99fcda335616d8ad60f7","snapshot":"lib__hanja-stroke-start-gate-can.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-can.test.ts","expectedSHA256":"97f12ba390197e4ef5178eed70ef1662b508879656a26690c2bc25d62d504572","snapshot":"lib__hanja-stroke-start-gate-can.test.ts.source.txt"}],OWN={"resolver.mjs":"801a66a6585d9682b08b4a8f55675d5265c0e0242c407db9f2dce45a1e823c9e","resolver.d.mts":"7528771623d79e864bebea358664068be4b7084b05ab67275672164ee38e42c0","README.md":"fd42784aadbdcfb593909a160bcb4a1ca1ab0873369c4460f563a734d0172f4a"};
for(const[name,h]of Object.entries(OWN))assert.equal(sha(readFileSync(new URL(name,import.meta.url))),h,name);
const entries=historicalAppSnapshotBindings();assert.deepEqual(entries,EXPECTED);assert.equal(entries.length,2);
assert(Object.isFrozen(historicalEvidence));assert.equal(historicalEvidence.isolatedActualComponentBrowserVerified,false);assert.equal(historicalEvidence.actualAppUI,false);assert.equal(historicalEvidence.runtimeRegistered,false);assert.equal(historicalEvidence.runtimeApplied,false);assert.equal(historicalEvidence.approvalStatusLivesInFutureRuntimeReview,true);
let negative=0;const reject=fn=>{assert.throws(fn);negative++};
for(const e of entries){const b=readHistoricalAppSnapshot(e.originalPath,e.expectedSHA256);assert(Buffer.isBuffer(b));assert.equal(sha(b),e.expectedSHA256);assert.equal(sha(readFileSync(new URL(e.snapshot,import.meta.url))),e.expectedSHA256);assert.strictEqual(verifyHistoricalAppSnapshotBytes(e.originalPath,e.expectedSHA256,b),b);
 for(const altered of[Buffer.concat([b,Buffer.from(' ')]),b.subarray(0,b.length-1),Buffer.concat([Buffer.from([239,187,191]),b]),Buffer.alloc(0)]){reject(()=>verifyHistoricalAppSnapshotBytes(e.originalPath,e.expectedSHA256,altered));reject(()=>verifyHistoricalAppSnapshotBytes(e.originalPath,sha(altered),altered));}
 const bit=Buffer.from(b);bit[0]^=1;reject(()=>verifyHistoricalAppSnapshotBytes(e.originalPath,e.expectedSHA256,bit));reject(()=>verifyHistoricalAppSnapshotBytes(e.originalPath,e.expectedSHA256,b.toString('utf8')));
 for(const p of['./'+e.originalPath,'../'+e.originalPath,e.originalPath+' ',e.snapshot,e.originalPath.toUpperCase()])reject(()=>readHistoricalAppSnapshot(p,e.expectedSHA256));
 for(const h of['0'.repeat(64),e.expectedSHA256.toUpperCase()])reject(()=>readHistoricalAppSnapshot(e.originalPath,h));
 const other=entries.find(x=>x.originalPath!==e.originalPath);reject(()=>verifyHistoricalAppSnapshotBytes(e.originalPath,e.expectedSHA256,readHistoricalAppSnapshot(other.originalPath,other.expectedSHA256)));
 for(const args of[[],[e.originalPath],[e.originalPath,e.expectedSHA256,'extra']])reject(()=>Reflect.apply(readHistoricalAppSnapshot,null,args));
 for(const args of[[],[e.originalPath,e.expectedSHA256],[e.originalPath,e.expectedSHA256,b,'extra']])reject(()=>Reflect.apply(verifyHistoricalAppSnapshotBytes,null,args));
}
reject(()=>readHistoricalAppSnapshot('lib/hanja-strokes.ts',entries[0].expectedSHA256));reject(()=>readHistoricalAppSnapshot(null,entries[0].expectedSHA256));reject(()=>readHistoricalAppSnapshot(entries[0].originalPath,null));reject(()=>historicalAppSnapshotBindings('extra'));reject(()=>{historicalEvidence.runtimeRegistered=true});
const changed=historicalAppSnapshotBindings();changed[0].originalPath='changed';changed[0].expectedSHA256='0'.repeat(64);assert.deepEqual(historicalAppSnapshotBindings(),EXPECTED);
console.log(JSON.stringify({passed:true,focusedExecutions:1,snapshots:2,negative,exactPathAndExpectedSHAPairs:true,snapshotTamperingRejected:true,privateBindingsUnchanged:true,liveAppFilesReadThisCheck:0,componentBrowserReviewed:false,actualAppUI:false,runtime:false,sourceCompiles:0,engineRuns:0,oldActualRerun:false,UI:0,server:0,Git:0,build:0}));
