import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {historicalAppSnapshotBindings,verifyHistoricalAppSnapshotBytes,readHistoricalAppSnapshot,historicalEvidence} from './resolver.mjs';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const EXPECTED=[{"originalPath":"lib/hanja-stroke-start-gate.ts","expectedSHA256":"fd291f88e6039519ed50d721efc3cc09d393d86af571f2403f2df20e49647f0d","snapshot":"lib__hanja-stroke-start-gate.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate.test.ts","expectedSHA256":"445cb7bf57fe1293ea270a7626c25a122756771c09255bf2188d0c5c7f5873a3","snapshot":"lib__hanja-stroke-start-gate.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"40dfc67744e21021545db018876fe95d0d9918053244def58e70df0d45abc513","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}],OWN={"resolver.mjs":"f5190bf6d363c42f046113443fdbf47ca507927ba012eb5caa4d4bce96270a72","resolver.d.mts":"5ba68a233a367eaddcaa24ec33ed1adf44b24a499fafe1339673cb3c62d2fb62","README.md":"3756da837fa936c1b031ffa84da11d555cbb55dd4f64b9e2999215fedc150246"};
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
