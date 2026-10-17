import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive-order-candidate.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"991e7b29dd5283197cce7687c88eb1f565bcc654f9b266ab90756cb72fd2800c")
const manifest={"u6913":{"identity":{"root":"u6913","file":"engine-whole-u6913.json","fileSHA256":"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772"},"fullProofSHA256":"49ef345819177270739876a5319cc29e96dac1764210b0f4abfa5cd6f0e2880e","pens":12,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[11],[9],[10]]}}
assert.equal(hash(readFileSync(new URL('./server-compile.mjs',import.meta.url))),"6938609204cced9616949f8486233b8b24fa2feb97c4ea0045827677c94c5b59",'Original caller bytes')
assert.equal(hash(readFileSync(new URL('./progressive-order-candidate.mjs',import.meta.url))),"5433cf65aa8495020c15d56bf60d061936a24fb32d31e0b1b73593023ba2c51a",'Candidate compiler bytes')
const preparation=JSON.parse(readFileSync(new URL('./source-order-candidate-validation.json',import.meta.url)));
assert.deepEqual(preparation.originalPins,{"NOTICE.md":"689542a0750e250b258d8e146dfc25cbbbfec62202ed6ea78ecba52827df8ca4","candidate-compile-analysis.json":"6b1fda7c48ad0d3d217f92e8964fd0816519f28450ac9508de9cc80d7cab68d0","engine-proof.json":"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772","engine-whole-u6913-ue0100.json":"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772","engine-whole-u6913.json":"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772","metadata.json":"b4fdbc2260490d204c270139cf5f15d188b0850f34cf192c5f664554b7f45795","native-server-preparation-source-analysis.json":"dedcbf535d97e6cec3088a1b0810b1a813873a4f42c8bd204888d8815a100b4a","native-server-validation.json":"c211a29845af024b4b7f4acdcd7ac176d173897f546b8b3c1a71a7eed4d09c91","progressive.mjs":"991e7b29dd5283197cce7687c88eb1f565bcc654f9b266ab90756cb72fd2800c","serve-progressive.py":"2378f99b1f978d45a5f57334daf6d8ddc7dea8d35dc15380f74dd1237bb718fc","serve-whole.py":"f6ea8e12cc3a6bd6665e6ad2817f500907930c04568c0c7ec52fc8b6a8fd846e","server-compile.mjs":"6938609204cced9616949f8486233b8b24fa2feb97c4ea0045827677c94c5b59","source-analysis.json":"4225c60c05f53014fc0d4ebbf18cf2046703c1b6f389e2cda009874bfc4c0bfa","source-join-analysis.json":"95b274c9d57a49d6345d4676a9c0b5c75cf56a501011b084138e804fa4c048c1","source-preservation-audit.json":"2c91ce3f23458c66f1820c7739750ad37d3032c4ece14a40b14d668c7a56d746","sources.json":"a312fab489d2b0c8cc4911857e880d7331975cb6b5a639b08614a99a36bea98c","verify-source.mjs":"79572a923506fd8ed96cf0fdce3360426ab954d0e85cba1da683afe5b66b9a6e"})
for(const [file,digest] of Object.entries({...preparation.originalPins,...preparation.additionalProtectedPins,...preparation.newFilesSHA256}))assert.equal(hash(readFileSync(new URL(file,import.meta.url))),digest,'Pinned candidate input '+file)
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false,runtimeApplied:false,identity,compiledSHA256:hash(JSON.stringify(strokes)),fullProofSHA256:hash(JSON.stringify(proof)),pens:strokes.length,masks:strokes.flat().length}))
