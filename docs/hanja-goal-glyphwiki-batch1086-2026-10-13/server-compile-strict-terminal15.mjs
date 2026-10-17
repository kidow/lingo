import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './strict-terminal15-candidate.mjs'
const hash = value => createHash('sha256').update(value).digest('hex')
assert.equal(hash(readFileSync(new URL('./strict-terminal15-candidate.mjs',import.meta.url))),"f48ade7818ccb4428f03b9a0b2908e995229ef58f64b04d349f379057843c074",'Frozen terminal15 candidate compiler')
const root = process.env.WHOLE_ROOT || process.argv[2] || 'u7501'
const selected = candidateWholeProofs.find(value=>value.identity.sourceRoot===root)
assert(selected,'Only a pinned terminal15 original whole profile is supported')
const id=selected.identity
const bytes=readFileSync(new URL(id.sourceProofFile,import.meta.url)),headerBytes=readFileSync(new URL(id.sourceHeaderFile,import.meta.url))
assert.equal(hash(bytes),id.sourceProofFileSha256)
assert.equal(hash(headerBytes),id.sourceHeaderFileSha256)
assert.equal(hash(readFileSync(new URL(id.sourceMetadataFile,import.meta.url))),id.sourceMetadataFileSha256)
const raw=JSON.parse(bytes),header=JSON.parse(headerBytes),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before)
console.log(JSON.stringify({sourceRoot:root,identity:id,sourceGroups:selected.sourceGroups,pens:strokes.length,masks:strokes.flat().length,strokes,render:renderProgressive.toString(),nativeApproval:false,runtimeApplied:false}))

