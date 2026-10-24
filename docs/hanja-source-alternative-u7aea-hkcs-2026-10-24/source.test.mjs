import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),s=read('./sources.json'),p='../hanja-source-alternatives-g1-five-2026-10-24.json',old=read(p),start=performance.now()
assert.equal(sha(readFileSync(new URL(p,import.meta.url))),s.provenance.preservedExisting.SHA256);assert.equal(s.providerRoot,'hkcs_m7aea');assert.equal(s.provenance.aliasInserted,false)
for(const n of s.provenance.preservedExisting.recordNames){const r=old.records.find(x=>x.name===n);assert(r);assert.equal(s.records[n].data,r.exactPublicData);assert.equal(s.records[n].version,r.version);assert.equal(s.records[n].name,r.name)}
assert.deepEqual(Object.keys(s.records),s.recordNames);assert.deepEqual(s.versions,s.recordNames.map(n=>[n,s.records[n].version]))
const seen=new Set(),stack=new Set(),refs=[];let rows=0,type101=0
function visit(n){assert(!stack.has(n));if(seen.has(n))return;const r=s.records[n];assert(r,'No missing references');assert.equal(r.name,n);stack.add(n);for(const row of r.data.split('$')){const a=row.split(':');if(a[0]==='99'){refs.push([n,a[7]]);visit(a[7])}else{assert(Number.isFinite(Number(a[0])));rows++;if(a[0]==='101')type101++}}stack.delete(n);seen.add(n)}
visit(s.providerRoot);assert.equal(seen.size,3);assert.equal(rows,16);assert.equal(type101,4);assert.equal(s.closure.complete,true);assert.equal(s.provenance.mixedDateProviderClosure,true);assert.equal(s.provenance.historicalArchiveRestoration,false)
const r=s.provenance.newRecords[0];assert.equal(r.query,'hkcs_m81e4-p03-s00@3');assert.equal(r.HTTPStatus,200);assert.equal(s.nativeApproval,false);assert.equal(s.runtimeApplied,false)
console.log(JSON.stringify({newAuthoredClosureFIRSTPASS:true,root:s.providerRoot,records:3,unexpandedLeafRows:rows,originalType101Rows:type101,refs,engine:0,sourceProjection:0,SHA256:sha(readFileSync(new URL('./sources.json',import.meta.url))),durationMs:performance.now()-start}))
