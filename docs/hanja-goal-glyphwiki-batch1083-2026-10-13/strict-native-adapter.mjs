import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u85e9","sourceProofFile":"./engine-whole-u85e9.json","sourceProofFileSha256":"e743916c6b79f5fc1afd4903a6d79410299484b3915451847e218b7f77095d06","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"ea9800309c9f81850e3b59f19eb17f392b5ef2357e90ffa5bd4e1aff93736feb",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"eb72e3cb73bdd6343f72e36df502803c41dc4a0cd9db3da41d511ec91f14b8da")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u85e9","sourceProofFile":"./engine-whole-u85e9.json","sourceProofFileSha256":"e743916c6b79f5fc1afd4903a6d79410299484b3915451847e218b7f77095d06","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"7f39c9f75cad337da859997881964545546c42f590ba4648782042b5c721533d",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
