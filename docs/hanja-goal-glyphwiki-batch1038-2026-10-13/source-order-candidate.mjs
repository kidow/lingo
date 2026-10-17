import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,4,5,6,7,8,9,11,10,12])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA="164482f25f11e8ec7a1743741a4d6ee24c222d91e647d77836ab5607df435566",FINAL_SHA="37b4ca01ab45cd1bdb6304f3d7e4fa3e0297eb9bd32b2b8fc50c915dc1e5f666",PEN_SHA=["55c25aaea3b296518eb85773631486ec5f710efcfbe07ae1f5b8d35296129a9c","091686f1f9b5d2d164ba8d9f434e4ca4bca5627b4e0d461ca0c9c58306861d50","825e020c070eebf4976bb8cfe55fb79fa4f734a324b8de43e72127ad258d520b","0dddb54d4335de55d5a1f644a6e6aecfed5f7457d90a1b502457f636193bf91a","0f14c1cc151af0bb60b935e6733869878304f5cce668f749daab47a257d674de","f1680eb22ecb18e5fecad613e7170fc6c6767532479f35239f29ca214a9c7d21","70e0dde077e81b3f1e62632e9ad2adbfdb65066ee71384b4ac1dc274163f0653","8f1ac5b8db522b0024cc9908eb8f7cfd3f195486ed168fe397ae1e8901247ee7","bdfaa59160ac5c169bbdc7b1d10dea6b63f677926925afb489cca8daaba8a3e5","5de670b7baefd8b6009e3e4936c1e9ec76bc3190541f7a278dba4b64e1db0352","aae58e86176ba797e031c08230ba41687b4dfd7c6de9a579cfe02fdae36241bb","0e30909ca29c4d9d63971acd65c616875b47663e4395ff2c34cc7176b9c03c92"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,12);assert.equal(out.flat().length,12);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
