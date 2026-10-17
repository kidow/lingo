import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,5,4,6,7,8,9,10,11,12,13,14,15])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA="4ce4b39b239f4cc1e656becc07e8dac73f9ef52c07d5a8320b85c48b5d57af1f",FINAL_SHA="41de19e78168032476ebc0f33737a6f316c0c557a1c501fd0fc0ac7083ed254d",PEN_SHA=["10eb1fb2785c42d7d8498f410e2b3337603dcf6edf500b31a0a0a16b2f369e4c","688bd7f3d8383ab38eb9cf863ad5b63b247a15e9755db5dbfa2e8789e9cb290f","0f46fa63b3cc6f0e420c6ccf6c252f2e8ebb4786bbf49b207919836d8e67163f","3b16584dbdbefd304310491b0a034a3acac677272fc68a1f2b10c1198ea52c0b","86799d3f5d061e3e88101ed5d0a617f6b60d1c76f9a4a21beb7260d5deb7ad09","9588cdd4b922c6a92e70c299dde7bece6521b0df04e938acc90a0a510a848d2a","012fbf5e1beccda22e0a575369ab0984604dbf0bbfe3f4a84c95661d98a90648","1e1678467b74d32baed4e064152447de003093b777f70ce0800b8af59ca3a222","065ff37402946e8e7b18d67f3f7b2c6a4c4b54580f1eb47c0481eed61f1db58b","cb71a37d1300ddd0f76a7d7d2cb125ca974c9cf3973eeb3f74b178109e7ec45c","0e0cf74e77b3a7f27a77b3f61196563315c16632305286de3e2da44be216f4ab","587cfd25723a026d9f6acd8dcdb9058a313bce7d04d2c4903a1b40dd9e73b433","5d32e97d8cf0c10dc86fbb0d8264ab2026fffc63ac772adc1784ac34f487ad9d","3129f7891123f6ecc9ddcfd520728662ca334ec5732a4f62960aff6c9437cc53","15cd9a4a0eba6bace9e3c5359f5158ca6cd1b30ab5e89a6928d0edddd79ebd3c"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,15);assert.equal(out.flat().length,16);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
