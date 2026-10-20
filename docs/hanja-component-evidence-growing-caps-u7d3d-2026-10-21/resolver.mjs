import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const BINDINGS=Object.freeze([{"originalPath":"lib/hanja-stroke-start-gate-u7d3d.ts","expectedSHA256":"f821ad2913459ae6a37d3bc84b211ce9f84b06f87fcaa3ec3c2f63008b891a44","snapshot":"lib__hanja-stroke-start-gate-u7d3d.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-u7d3d.test.ts","expectedSHA256":"4005a619a9261899925eb3cec178820ce30ffcc201beb0bbf85e9d41c514608b","snapshot":"lib__hanja-stroke-start-gate-u7d3d.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"931ed46affc81ba3c852862a1174872d03e653207958cda58daf37411a5163f8","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}].map(entry=>Object.freeze(entry)));
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
export const historicalEvidence=Object.freeze({glyph:'紽',intendedBatch:null,batchAssignmentProvisional:true,phase:'app-byte-snapshot-before-component-browser-review',isolatedActualComponentBrowserVerified:false,actualAppUI:false,runtimeRegistered:false,runtimeApplied:false,approvalStatusLivesInFutureRuntimeReview:true});
