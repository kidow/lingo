import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const BINDINGS=Object.freeze([{"originalPath":"lib/hanja-stroke-start-gate.ts","expectedSHA256":"ce2960e7be5c976b6ba29430187732ef414b75af934ae001177c858ae3b08db8","snapshot":"lib__hanja-stroke-start-gate.ts.source.txt"},{"originalPath":"lib/hanja-stroke-start-gate.test.ts","expectedSHA256":"0b477719fdd215d93a6ebbc3fb2aa55e6fb02594d26335f69a7b60e5dc445646","snapshot":"lib__hanja-stroke-start-gate.test.ts.source.txt"},{"originalPath":"components/hanja/stroke-outlines.tsx","expectedSHA256":"58b3f80a4a86093708a322315fc8137fc8b7bee18ce2c385b297c50b04075a3e","snapshot":"components__hanja__stroke-outlines.tsx.source.txt"}].map(x=>Object.freeze(x)));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function exactBinding(originalPath,expectedSHA256){
 if(typeof originalPath!=='string'||typeof expectedSHA256!=='string')throw Error('Exact historical path and SHA strings required');
 const entry=BINDINGS.find(x=>x.originalPath===originalPath&&x.expectedSHA256===expectedSHA256);
 if(!entry)throw Error('Unapproved historical snapshot path/SHA pair');return entry;
}
export function historicalAppSnapshotBindings(){return BINDINGS.map(x=>({...x}))}
export function verifyHistoricalAppSnapshotBytes(originalPath,expectedSHA256,bytes){
 exactBinding(originalPath,expectedSHA256);
 if(!Buffer.isBuffer(bytes))throw Error('Historical snapshot bytes must be a Buffer');
 if(sha(bytes)!==expectedSHA256)throw Error('Historical snapshot bytes differ from approved SHA');return bytes;
}
export function readHistoricalAppSnapshot(originalPath,expectedSHA256){
 const entry=exactBinding(originalPath,expectedSHA256);
 return verifyHistoricalAppSnapshotBytes(originalPath,expectedSHA256,readFileSync(new URL(entry.snapshot,import.meta.url)));
}
export const historicalApproval={batch:1316,glyph:'棖',review:'docs/hanja-goal-glyphwiki-batch1316-2026-10-20/review.json',reviewSHA256:'f4a2e0258f78778b13abf72380e2a3bd25890fd8ca69d1f027dd7200a08a7c8a',nativeReview:'docs/hanja-renderer-start-gate-u68d6-native-review-2026-10-20/native-review.json',nativeReviewSHA256:'4c65b6ce19f3b635780ce3027a08ca06e7bce242c44f988e05162d8dca86f06b'};
