import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{pathToFileURL}from'node:url'
const d=process.env.REVIEW_DIR,a=JSON.parse(readFileSync(d+'/native-k-source-order-audit.json')),sha=b=>createHash('sha256').update(b).digest('hex')
for(const[f,h]of Object.entries(a.inputSHA256))assert.equal(sha(readFileSync(d+'/'+f)),h,'Exact original/candidate input '+f)
const m=await import(pathToFileURL(d+'/progressive-k-native-order.mjs')),root=process.env.WHOLE_ROOT||a.selectedWhole
assert.equal(root,a.selectedWhole);assert.deepEqual(m.selectedProofIdentity,a.identity);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
const proof=m.buildSourceProof(a.identity);assert.deepEqual(Object.keys(proof).sort(),a.fullProofKeys);assert.equal(sha(JSON.stringify(proof)),a.fullProofSHA256)
const before=JSON.stringify(proof),out=m.compileSourceWhole(root,proof.trace,proof,a.identity)
assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),a.compiledSHA256)
assert.equal(out.length,17);assert.equal(out.flat().length,18)
console.log(JSON.stringify({sourceRoot:root,pens:out.length,masks:out.flat().length,originalPolygons:37,polygonExactOnce:a.localValidation.polygonExactOnce,inputImmutable:true,compiledSHA256:a.compiledSHA256,finePens:a.finePens,maskTransitions:a.maskTransitions,nativeApproval:false,runtimeApplied:false,strokes:out,render:m.renderProgressive.toString()}))
