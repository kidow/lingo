import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u99fd","sourceProofFile":"./engine-whole-u99fd.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.sourceProofFile)),selectedProofIdentity.sourceProofFileSha256);assert.equal(sha(read(selectedProofIdentity.sourceHeaderFile)),selectedProofIdentity.sourceHeaderFileSha256);assert.equal(sha(read(selectedProofIdentity.sourceMetadataFile)),selectedProofIdentity.sourceMetadataFileSha256);assert.equal(sha(read('progressive.mjs')),'924716145002ac4a6bf95f44225329a5418e12e3b13dbc7f52d23de91d01b065');assert.deepEqual(original.selectedProofIdentity,selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19]])}
sourcePins()
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected identity7 ./ paths and lowercase Sha256');sourcePins();assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'3a2bde43c2ada80267c4254680e59629b71e7d0739586a77be47cfd2a4b6bf8e','Complete full5 proof unchanged');assert.deepEqual(trace,proof.trace);const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,17);assert.equal(out.flat().length,19);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),35);return out}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
