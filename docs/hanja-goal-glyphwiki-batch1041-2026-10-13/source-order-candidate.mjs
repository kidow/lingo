import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,4,5,7,6,8,9,10,11,13,14,12,15,16,17])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA="ffb13b0449acf86abb5272c1453807cc0738db22f6c44d0050b4ba0f32c1e0bc",FINAL_SHA="7ac55236fd417fbb00fe824b4d53dc5f1ad2eac97a6cc3b96675080ffa50f63a",PEN_SHA=["61007fb07426ed7edfeaef95c967902e8e32fcaef31932630b352d9c9d1935fd","eec82209318966c012c144a0bd9523f258aed5efbaf5b8a135b1fcc97cad957d","e07acbbdbc706ed92d24612e9f6e11db4afe907fcc4da71787ec5a74fb2d9450","e69a444557280908aea4274a4d02bafcdf516ba48df21af90e1cdddc40d0f28c","e038992074fb5ad33b69980b01d2b321413a740c4bb3a76f05d76a9b6a96071f","3ae8a7084bce2bbaf0026bbb39e50570c8bd6a352b11fc3b3a4d2278334e8404","ae2a88979c0cf29cc589620a66f68c7a2033c8568a0d181322eae12b8c26249a","88a545e4814ace63c6d79843e15c7d47008b05f55e072adebe88a55b0fdd0f14","9b54a4feba2695d0bf6cf3c70097ba68c7f7cd20f70ab3c07c5b893c54d35988","39d778a6ce887ef2baf5d392025c48bbe35a6ba8d92a6b8bf7dd39cf053d76b7","b73cf67740cf7e2fed41f5bbbbc6bc98afae76483b1d08dfb7fe6054e7ee0aba","a5f56be0f4c637e2912896f0dd80528bd09c15afb858d5fd4e6890e1ed028c99","f19e45e1d3ecb246e38ab87bc80deb51a26fe61e220002e8ed52ced36913e190","6fea943ad614cd5cfa6ed543a36f0b4e9ba26605e311e6aefa8cd84f889de77e","262e530683ae3d4cbf46652085b90b298a92d05a517f97beba2ca09d71f4f2af","92e4acc22b9aaf152f0901af939288b1647345c93015877c1437fdac15519ad2","cfee4b72666eacf303099b32e0edf078aff8d0ba1606ec03947292de714c8530"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,17);assert.equal(out.flat().length,18);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
