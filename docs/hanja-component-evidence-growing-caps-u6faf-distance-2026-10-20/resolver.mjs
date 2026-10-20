import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const BINDINGS=Object.freeze([{"originalPath":"lib/hanja-stroke-start-gate-can.ts","expectedSHA256":"472be0fadeb11edc77d89fb3645a809f9a9f062387af99fcda335616d8ad60f7","snapshot":"lib__hanja-stroke-start-gate-can.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-can.test.ts","expectedSHA256":"97f12ba390197e4ef5178eed70ef1662b508879656a26690c2bc25d62d504572","snapshot":"lib__hanja-stroke-start-gate-can.test.ts.source.txt"}].map(entry=>Object.freeze(entry)));
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
export const historicalEvidence=Object.freeze({glyph:'澯',intendedBatch:null,batchAssignmentProvisional:true,phase:'app-byte-snapshot-before-component-browser-review',isolatedActualComponentBrowserVerified:false,actualAppUI:false,runtimeRegistered:false,runtimeApplied:false,approvalStatusLivesInFutureRuntimeReview:true});
