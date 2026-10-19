import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const BINDINGS=Object.freeze([{"originalPath":"lib/hanja-stroke-start-gate.ts","expectedSHA256":"1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704","snapshot":"lib__hanja-stroke-start-gate.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate.test.ts","expectedSHA256":"0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8","snapshot":"lib__hanja-stroke-start-gate.test.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-si.ts","expectedSHA256":"57806d5be50d813dfbfbcb21ffc2056aa968a2f900cf4da72ba649582eecce73","snapshot":"lib__hanja-stroke-start-gate-si.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-si.test.ts","expectedSHA256":"f939e0d4113e3cce88fba3c6f61be47fa4e6f1543236c31ddee360bea112b515","snapshot":"lib__hanja-stroke-start-gate-si.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"eb846b8a42ed171800c059737fdffd9f7aad4b85321c545f6cec7b7c531b87f6","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}].map(entry=>Object.freeze(entry)));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function exactBinding(originalPath,expectedSHA256){
 if(typeof originalPath!=='string'||typeof expectedSHA256!=='string')throw Error('Exact historical path and SHA strings required');
 const entry=BINDINGS.find(e=>e.originalPath===originalPath&&e.expectedSHA256===expectedSHA256);
 if(!entry)throw Error('Unapproved historical snapshot path/SHA pair');return entry;
}
export function historicalAppSnapshotBindings(){
 if(arguments.length!==0)throw Error('No binding-list arguments accepted');return BINDINGS.map(entry=>({...entry}));
}
export function verifyHistoricalAppSnapshotBytes(originalPath,expectedSHA256,bytes){
 if(arguments.length!==3)throw Error('Three exact verification arguments required');exactBinding(originalPath,expectedSHA256);
 if(!Buffer.isBuffer(bytes))throw Error('Historical snapshot bytes must be a Buffer');
 if(sha(bytes)!==expectedSHA256)throw Error('Historical snapshot differs from fixed app SHA');return bytes;
}
export function readHistoricalAppSnapshot(originalPath,expectedSHA256){
 if(arguments.length!==2)throw Error('Two exact read arguments required');const entry=exactBinding(originalPath,expectedSHA256);
 return verifyHistoricalAppSnapshotBytes(originalPath,expectedSHA256,readFileSync(new URL(entry.snapshot,import.meta.url)));
}
export const historicalEvidence=Object.freeze({glyph:'緦',intendedBatch:null,batchAssignmentProvisional:true,phase:'app-byte-snapshot-before-component-browser-review',isolatedActualComponentBrowserVerified:false,actualAppUI:false,runtimeRegistered:false,runtimeApplied:false,approvalStatusLivesInFutureRuntimeReview:true});
