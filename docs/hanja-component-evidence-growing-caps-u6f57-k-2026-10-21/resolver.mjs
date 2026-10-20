import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const BINDINGS=Object.freeze([{"originalPath":"lib/hanja-stroke-start-gate-u6f57.ts","expectedSHA256":"a7b35a0aae7b35afede3d123cfc8b736a6d56ae46cb54bbd5b3286949896cac5","snapshot":"lib__hanja-stroke-start-gate-u6f57.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-u6f57.test.ts","expectedSHA256":"ab7e27b0204d958b678bf745b4861c948a6a1925ee77d079c9476896e65f092c","snapshot":"lib__hanja-stroke-start-gate-u6f57.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"71dbffca2248381c0208dc5a4657b0d7acda13a7fac4a59fe8498e85386579f5","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}].map(entry=>Object.freeze(entry)));
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
export const historicalEvidence=Object.freeze({glyph:'潗',intendedBatch:null,batchAssignmentProvisional:true,phase:'app-byte-snapshot-before-component-browser-review',isolatedActualComponentBrowserVerified:false,actualAppUI:false,runtimeRegistered:false,runtimeApplied:false,approvalStatusLivesInFutureRuntimeReview:true});
