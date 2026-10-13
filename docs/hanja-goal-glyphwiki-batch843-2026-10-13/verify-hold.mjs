import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),copy=x=>JSON.parse(JSON.stringify(x))
const pins={
'sources.json':{file:'773c1308a3588d1a36d0dbe082805db5b9e4ddfcf76c45f3c8cb11e0f5393b13',payload:'ce25582f0d032d912e6ca344c211cb1f05f0b3133677d36331a133ce905763a0'},
'metadata.json':{file:'cb5f25fdf4f9e652374be538a82c25cf6ad83afb5d23e929be82daf98dbaf1af',payload:'d2dbda3324c4177c3dec8b327b8111c70d2852dac351e7efe333e8fd76977924'},
'engine-proof.json':{file:'13bfc42adb0ade45738ed049df9548a767452920a6cc448bedc0eb70637649f9',payload:'0ce8f38ea819d7d2c220f6395eea313df9cc0cdac8dbc897241839e2eb207b44'}
}
const read=n=>{const b=fs.readFileSync(new URL(n,import.meta.url));assert.equal(sha(b),pins[n].file);return JSON.parse(b)}
const source=read('sources.json'),proof=read('engine-proof.json'),meta=read('metadata.json')
function verify(s,p,m){
 assert.equal(digest(s),pins['sources.json'].payload,'All fixed original bodies/history/related identities are immutable')
 assert.equal(digest(p),pins['engine-proof.json'].payload,'The original unavailable-whole proof and eight-engine pins are immutable')
 assert.equal(digest(m),pins['metadata.json'].payload)
 assert.equal(s.root,'u9085');assert.deepEqual(s.missing,['u56de-j']);assert.deepEqual(s.renderableWholeNames,[])
 assert.equal(s.sourceMissingHold,true);assert.equal(s.approvalBlocked,true);assert.equal(s.latestSubstitution,false);assert.equal(s.supplementalUsedForWholeReplay,false)
 assert.equal(p.renderable,false);assert.equal(p.sourceMissingHold,true);assert.equal(p.affectedWholeRoots.length,5)
 for(const w of p.affectedWholeRoots){assert.equal(w.approvalBlocked,true);assert.deepEqual(w.originalRecord,s.records[w.root]);assert(w.error.includes('u56de-j'))}
 for(const k of ['groups','trace','defaults'])assert.equal(p[k],undefined,'Missing original geometry/presets must remain absent')
 assert.equal(Object.keys(p.engineHashes).length,8)
 assert.deepEqual(s.providerVersions.map(x=>x.name),['u4eb6@4','u56de@5'])
 assert.equal(s.supplementalSources['u56de-j'].usedInWholeCompilation,false)
 assert.equal(s.supplementalSources['u56de-j'].originalArchiveIdentityProven,false)
 assert.equal(m.dictionary.clips,17);assert.equal(m.runtimeApplied,false);assert.equal(m.proofRoot,null)
}
verify(source,proof,meta)
const mutations={
originalRootBody:s=>s.records.u9085.data+=' ',
relatedIdentity:s=>s.records.u9085.related='altered',
explicitHistoryIdentity:s=>s.providerVersions[0].version='5',
missingFlag:s=>s.sourceMissingHold=false,
latestSubstitution:s=>s.latestSubstitution=true,
supplementalUsed:s=>s.supplementalUsedForWholeReplay=true
}
let rejected=0;for(const mutate of Object.values(mutations)){const bad=copy(source);mutate(bad);assert.throws(()=>verify(bad,proof,meta));rejected++}
for(const key of ['groups','trace','defaults']){const bad=copy(proof);bad[key]=key==='defaults'?{kWidth:5}:[];assert.throws(()=>verify(source,bad,meta));rejected++}
const bad=copy(proof);bad.engineHashes['2d.js']='altered';assert.throws(()=>verify(source,bad,meta));rejected++
assert.equal(fs.existsSync(new URL('progressive.mjs',import.meta.url)),false)
console.log(JSON.stringify({batch:843,glyph:'邅',passed:true,sourceMissingHold:true,blockedWholeRoots:5,renderableWholeRoots:0,compilerCreated:false,geometryPresetsAbsent:true,sourceAndProofBodiesImmutable:true,guardsRejected:rejected,mutationClasses:[...Object.keys(mutations),'fabricatedGroups','fabricatedTrace','fabricatedPreset','engineHash'],catalogStrokes:17,domesticClips:17,nativeApproval:false,runtimeApplied:false,privateMediaSaved:false,inputPins:pins}))
