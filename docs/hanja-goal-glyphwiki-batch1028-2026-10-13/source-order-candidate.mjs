import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,4,5,6,7,8,9,10,11,14,15,16,17,13,12])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='5acd3f87b4df6a9d56cbb5453e2ef05d0d44d9262dfcff342c4d506964d53c96',FINAL_SHA='d4985bc3dd738eeaa75e21e7045fb6e1d4ccd9f22475252dddcc717c3e52264d',PEN_SHA=["c7bd93e27dc0e6f4c8dcb195d6d93ce16a8ae5fdc15435545a96261843832d5d","a10d7bb8dfbcc2bb2aafaf4545abd5b2d37677421ffc2b427bd2280262335741","27c8ad59c5ee6617a257b9f2208ac3b99950ea0ee76ab5b277b1ebe554ad07a8","de5cd5acad9e50ffb73166740c12e19a7177a4847dd96d5a0c217e01baa3d8b4","ee0a003ebfbd878905b6722a8593f2508c64b98b270678f10e1ff72900858683","1d399d6e40289bda02aa1b5fffeb9ee1adcd3fd2b846110a0a98806156d15185","22275535c6ed4a41e824f8d3a7038b548fe57889468500b043af44e18f5ff8eb","e27c160a82f2228dca68b47283149c88adf85b79a9fccac966f824fbba0f2fb5","b338ddd2a35e0c11b07641b969ceac2b5fdc73efb7464f61140038d2cb62e4ef","5069ef02caddf16a826199f45b49214986852e1a9d13fc96567b84a5af070a9f","df2b1e3df2bd492bfaded6aca796ea00894527fef433b3f7510e0dacc4750d82","cb35940d8aefccf6eb0036594702223d2df95895fe957e96776460728b87f021","c2a7bafa032dd7afd9134e8694fe005f81b5724aeb4065ba307ec7b8f40b31cd","5b6b4e463c27d77da081e2ced71b0ce7496974062ec499cced2e67a30d43eb04","418a39b51ff860a4f72cb03fbc09d3e3157015019423463ecde7d163204da514","08b374d5b6f54e44664dfda4bf56f1fb356f62e18c747c8ad8738e8e16aa74b0","0de03ba608c206b04e4a0f526c8e05384f8b0db848a738a3f0a264f6360c3fab"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,17);assert.equal(out.flat().length,17);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
