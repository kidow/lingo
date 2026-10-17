import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive-order-candidate.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"441a899527e22fdf3c53aa5caa9f784a348b70797610d699e3b0d53b96b64e21")
const manifest={"u9a52":{"identity":{"root":"u9a52","file":"engine-whole-u9a52.json","fileSHA256":"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0"},"fullProofSHA256":"7dc6356e60e854e8e873ff6f9e1c8b4ea9c2b18913d87516926f0ba3fb1acdec","pens":22,"sourceGroups":[[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19],[20,21],[22],[23],[24],[25]]}}
assert.equal(hash(readFileSync(new URL('./server-compile.mjs',import.meta.url))),"051d37e42b0294fc292ad02af97325f013fce7f0fe580e8db6e5cf248fb925cc",'Original caller bytes')
assert.equal(hash(readFileSync(new URL('./progressive-order-candidate.mjs',import.meta.url))),"d199b590df4bc1dee46d57df2c4738aec043aa706a86a0a54f0a7c04daf32907",'Candidate compiler bytes')
const preparation=JSON.parse(readFileSync(new URL('./source-order-candidate-validation.json',import.meta.url)));
assert.deepEqual(preparation.originalPins,{"NOTICE.md":"04df10ffab52ac1d5c9c95c688a8c5e5c39c83273612dfbc7ffb43122a4601d2","candidate-compile-analysis.json":"0093dc66a81a41e882d4fe29c617c2fffcedad8c7331af770a80cf481a492f02","engine-proof.json":"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0","engine-whole-u9a52-ue0100.json":"27f21dcdd526e3b52a7c410a8e567e19415ac06356f27f27b8393390f35ffd19","engine-whole-u9a52.json":"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0","metadata.json":"83f70519db3dd7f6057e8a11aecd332d59f0a4782f416c96ac71ece240759fa7","native-server-preparation-source-analysis.json":"0a881dee44c8e4f96a85ec370be1af1bb6e60d653a9feb964a0d76613a94c37f","native-server-validation.json":"376d99060f1436fe82e0505f589aab622b4bf2b84297908489f5d6ab7c8d7426","progressive.mjs":"441a899527e22fdf3c53aa5caa9f784a348b70797610d699e3b0d53b96b64e21","serve-progressive.py":"d1c73c303418aeed1963b52b6ae5d54b87b85e44e86181180bc2cfe95052aece","serve-whole.py":"b9ca0878722c3b9fc4fbf7fdd73fca166b94df98f7dbf2100c319723fc3b924b","server-compile.mjs":"051d37e42b0294fc292ad02af97325f013fce7f0fe580e8db6e5cf248fb925cc","source-analysis.json":"7f2d99a94a5e0a48ba9535c9e01eb5ee2816109db7a7554c449331b3f3021ec4","source-join-analysis.json":"3085e2339d8df310a3f3dbfbcb7b84739be43662f36c99bbe3ad6621668f71fa","source-preservation-audit.json":"26520509baaab56d4ccaef31feaddb5ccefd37969aa9ae2446228e2ff5fbb128","sources.json":"db555b09dbdb6663e9356092fb8f6938adf8044576bd9187ec601d51c27e51af","verify-source.mjs":"ea4770c856e716b092f4cbe6e24d66d9b62c87dbbfc1bab7795f368ac1793453"})
for(const [file,digest] of Object.entries({...preparation.originalPins,...preparation.additionalProtectedPins,...preparation.newFilesSHA256}))assert.equal(hash(readFileSync(new URL(file,import.meta.url))),digest,'Pinned candidate input '+file)
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false,runtimeApplied:false,identity,compiledSHA256:hash(JSON.stringify(strokes)),fullProofSHA256:hash(JSON.stringify(proof)),pens:strokes.length,masks:strokes.flat().length}))
