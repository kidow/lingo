import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {historicalAppSnapshotBindings,verifyHistoricalAppSnapshotBytes,readHistoricalAppSnapshot,historicalEvidence} from './resolver.mjs';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const EXPECTED=[{"originalPath":"lib/hanja-stroke-start-gate.ts","expectedSHA256":"1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704","snapshot":"lib__hanja-stroke-start-gate.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate.test.ts","expectedSHA256":"0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8","snapshot":"lib__hanja-stroke-start-gate.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"f729f0db65f84dee49182a104d874fe48b347f05dbaeb0283e1a0777434c1900","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}],OWN={"resolver.mjs":"915a7903306235d067a3d4e8cbb3fdb5bda36802f7b20fac3639d75ff708f428","resolver.d.mts":"30c2648925c7fe80747cfe9ead8ed47781256015f48a4fb0d8410203779d2e64","README.md":"69ef687f0772f0393c7d0bbbf3dc97bbbbe2d3824c3651d8b297c6cf6ada3618"};
for(const[name,h]of Object.entries(OWN))assert.equal(sha(readFileSync(new URL(name,import.meta.url))),h,name);
const entries=historicalAppSnapshotBindings();assert.deepEqual(entries,EXPECTED);assert.equal(entries.length,3);
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
console.log(JSON.stringify({passed:true,focusedExecutions:1,snapshots:3,negative,exactPathAndExpectedSHAPairs:true,snapshotTamperingRejected:true,privateBindingsUnchanged:true,liveAppFilesReadThisCheck:0,componentBrowserReviewed:false,actualAppUI:false,runtime:false,sourceCompiles:0,engineRuns:0,oldActualRerun:false,UI:0,server:0,Git:0,build:0}));
