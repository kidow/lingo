import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u71af","sourceProofFile":"./engine-whole-u71af.json","sourceProofFileSha256":"87e68404750ea316b52488a8d0706b8ee6feb8b5fc9e484ecf99d72ea148cad6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"bcd286b20471c4b8593ace2d2caea6f1605d561e5b217a4f12e5d96403068764","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d421f3ccae4feeaaf5f2f99140a3019368f7603c9e1b7e3e30fb307db94a7249"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.sourceProofFile)),selectedProofIdentity.sourceProofFileSha256);assert.equal(sha(read(selectedProofIdentity.sourceHeaderFile)),selectedProofIdentity.sourceHeaderFileSha256);assert.equal(sha(read(selectedProofIdentity.sourceMetadataFile)),selectedProofIdentity.sourceMetadataFileSha256);assert.equal(sha(read('progressive.mjs')),'08e0deb48ce12a78caf570dec83e4c87d63e9d0eca16a17b301872aa3e13f040');assert.deepEqual(original.selectedProofIdentity,selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]])}
sourcePins()
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected identity7 ./ paths and lowercase Sha256');sourcePins();assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'ee3c8dc23b49cc3911da9eb477f5ef67271ebcbda0861fb854597328962d2c1e','Complete full5 proof unchanged');assert.deepEqual(trace,proof.trace);const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,15);assert.equal(out.flat().length,15);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),32);return out}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
