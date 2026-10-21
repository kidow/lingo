import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const BINDINGS=Object.freeze([{"originalPath":"lib/hanja-stroke-start-gate-u7c1c.ts","expectedSHA256":"0a915bbaba4bdb858b4349fbb9b16bd413cd34700a4321fbf36a1e73a1433f73","snapshot":"lib__hanja-stroke-start-gate-u7c1c.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate-u7c1c.test.ts","expectedSHA256":"09c414c8a2f010ecfa5c25026124b699944e96937edae80ae2fc076520b58bde","snapshot":"lib__hanja-stroke-start-gate-u7c1c.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"1a0f49eb55cc4ab85c618b46a55bc08b5137de5951db46b5731744020664143f","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}].map(e=>Object.freeze(e)));
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
export const historicalEvidence=Object.freeze({glyph:'簜',intendedBatch:null,batchAssignmentProvisional:true,phase:'app-byte-snapshot-before-component-browser-review',isolatedActualComponentBrowserVerified:false,actualAppUI:false,runtimeRegistered:false,runtimeApplied:false,approvalStatusLivesInFutureRuntimeReview:true});
