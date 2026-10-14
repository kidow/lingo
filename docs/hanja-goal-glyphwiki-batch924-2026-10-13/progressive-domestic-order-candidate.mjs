import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-native-adapter.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const PINS={"NOTICE.md":"7158aa1bc7f8c89a991d952725241cc511c04debdadeecdb747e3294bd5229c8","candidate-compile-analysis.json":"4c82fd684decf55d08aa4836fd02da07e97befd59618a3a10e3059e4418ab4ba","engine-proof.json":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd","engine-whole-u8743-ue0100.json":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd","engine-whole-u8743.json":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd","metadata.json":"dd7645c0d6ba02e24f9c32c376c200897a77e7115b89c77b2418f06822fc5515","native-preflight-source-analysis.json":"be9b81c52915a16e1e2f3de69a5ab227895200a7f2956367f0a66f7ea878affc","native-server-input-pins.json":"7a0409832c3c089d828b4c71306edc6354a2fa2002162056a9f6914d5aa10a98","progressive.mjs":"ee83c094984201cf44e713ebaa93567e768c54aca6ed87d3f8d0f9757af35aa8","serve-native.py":"67520cbc7f60cf9530bb61a489cd8afad94151804875e3e4a90aa5645b8caab2","source-analysis.json":"9ad2b219cc9f1e20aa10f49bf55dbb32c295cb8ee0ef81caf5439d7837619670","source-join-analysis.json":"3052818246a09f9cbb8977478034b22ca401ddb94f3b815af4404919babedfd3","sources.json":"3967b27e1afc7ae0ab698fb15581f506dca08c6eee934347820f15cb88319463","strict-native-adapter.mjs":"86fc22638ee490992c55443b392e8098e3d9e20a67fe0dca6202c0ccff403841","strict-native-server-preflight.json":"96e59fdcf0bb2174b8dc5a0d51139f12e9e4918823c8935d3ec6bc5a585823a1","verify-source.mjs":"090842589f2b8c832bc208d2d894bc0dd66f670e0776c42701d45820c3dc5bf9"}
export const domesticToOriginalPen=Object.freeze([1,2,3,4,5,6,7,8,11,12,9,10,13,14])
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7,8],[9],[13,14],[15],[10,11],[12],[16,17],[18]].map(g=>Object.freeze(g)))
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8743","sourceProofFile":"engine-whole-u8743.json","sourceProofFileSha256":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceProofFile=selectedProofIdentity.sourceProofFile
export const sourceWholeFileSHA256=selectedProofIdentity.sourceProofFileSha256
export const candidateWholeProofs=Object.freeze([Object.freeze({identity:selectedProofIdentity,sourceGroups})])
export const nativeApproval=false
export const runtimeApplied=false
export const status='isolated-original-complete-mask-domestic-order-native-pending'
const OLD_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10,11],[12],[13,14],[15],[16,17],[18]]
const OLD_PEN_SHA=["7a78641f9faba28e563c21e11ac9e110efa8b90232d6c81029360c3e33b5a701","e501e5a74a981b473ca038105dfcbac4595584969b1a088927096b1ed32d6e4f","2f34279cdf177643ee998ac32926111f098e8b5d0c6165e518bf0ae26844927a","e3e1ba3ace0e58969838bad719f688fce147da2acfef8dd37b6cb137df6b8687","c7af52104eb49c325f7569dc1320ee942fedb45b580f5ad77f759a9acb3eee6e","859be12882aad66fd89201f76648ca635a707da13bb09e2c65aca21f201b056f","3502c4733c5be6304fbf6b9c342f76022a6a343da1517706dfe268091f730b06","7e8ce0f4d0232463ef73756ebbff9c6c67b44144bb42b83748f8f8cdba88b37e","df069279989833fafb61dff864be04fc25a0f8971f35ede7865ead6b4102cdb8","25506433d4f1adc62def551ca3f5fdfae747da6e4d40eb9d8b10bcc46299a14e","696dd5b8665de8057fa97a53101f9ea22a8e41aed9a7b7da8757dd4e19dd507d","06970adf32e472cfe86835de2be3ce148ae12ea117a567343da646edfea972c8","479cfbfedb76cd51b5e9a291edc2006ebef2bc7996f4d3359f3634e042617f66","d3e5b16e9a81ccd261d57111560ba9341bf484e95c100613a0000a1ff1eab86e"]
function identityGuard(identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original adapter five-key identity and original Sha256 casing')
 for(const[f,pin]of Object.entries(PINS))assert.equal(hash(readFileSync(new URL(f,import.meta.url))),pin,'Frozen original byte pin '+f)
}
export function buildSourceProof(identity){
 identityGuard(identity)
 const body=JSON.parse(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),header=JSON.parse(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url)))
 return {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
}
export function compileProgressive(trace,proof,identity){
 identityGuard(identity)
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.deepEqual(proof,buildSourceProof(identity))
 assert.deepEqual(trace,proof.trace)
 assert.equal(hash(JSON.stringify(proof)),"84634608e382bea1da0938fcaa33276ded246abdfb34e1263d228f51318e1c19")
 assert.deepEqual(original.sourceGroups,OLD_GROUPS)
 const before=JSON.stringify(proof),old=original.compileProgressive(trace,proof,identity)
 assert.equal(old.length,14);assert.equal(old.flat().length,14)
 assert.deepEqual(old.map(p=>hash(JSON.stringify(p))),OLD_PEN_SHA)
 const result=domesticToOriginalPen.map(n=>old[n-1])
 assert.deepEqual([...domesticToOriginalPen].sort((a,b)=>a-b),Array.from({length:14},(_,i)=>i+1))
 assert.deepEqual(result.map(p=>hash(JSON.stringify(p))),domesticToOriginalPen.map(n=>OLD_PEN_SHA[n-1]))
 const polygons=pens=>pens.flat().flatMap(mask=>mask.outline.match(/M[^Z]+Z/g)||[]).sort()
 assert.deepEqual(polygons(result),polygons(old),'All original polygon outline bytes unchanged exactly once')
 assert.deepEqual(result.flat().map(m=>JSON.stringify(m)).sort(),old.flat().map(m=>JSON.stringify(m)).sort(),'All complete unchanged masks exactly once')
 assert.equal(JSON.stringify(proof),before)
 return result
}
export function compileSourceWhole(root,trace,proof,identity){
 assert(identity&&root===identity.sourceRoot)
 return compileProgressive(trace,proof,identity)
}

