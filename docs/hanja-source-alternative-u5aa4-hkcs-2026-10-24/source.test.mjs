import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),s=read('./sources.json'),oldPath='../hanja-source-alternatives-g1-five-2026-10-24.json',old=read(oldPath),start=performance.now()
assert.equal(sha(readFileSync(new URL(oldPath,import.meta.url))),s.provenance.preservedExisting.SHA256)
assert.equal(s.providerRoot,'hkcs_m5aa4');assert.equal(s.localArtifactTagIsProviderRoot,false);assert.equal(s.provenance.aliasInserted,false)
assert.deepEqual(Object.keys(s.records),s.recordNames);assert.equal(s.recordNames.length,4)
for(const n of s.provenance.preservedExisting.recordNames){const r=old.records.find(x=>x.name===n);assert(r);assert.equal(s.records[n].name,r.name);assert.equal(s.records[n].data,r.exactPublicData);assert.equal(s.records[n].related,r.related);assert.equal(s.records[n].version,r.version)}
const seen=new Set(),active=new Set(),missing=[],refs=[];let leafRows=0
function visit(n){assert(!active.has(n),'No source cycle');if(seen.has(n))return;const r=s.records[n];if(!r){missing.push(n);return}assert.equal(r.name,n);assert(Number(r.version)>0);assert(!r.data.startsWith('[['));active.add(n);for(const row of r.data.split('$')){const a=row.split(':');if(a[0]==='99'){assert(a[7]);refs.push([n,a[7]]);visit(a[7])}else{assert(Number.isFinite(Number(a[0])));leafRows++}}active.delete(n);seen.add(n)}
visit(s.providerRoot);assert.deepEqual(missing,[]);assert.equal(seen.size,4);assert.equal(leafRows,14);assert.equal(s.sourceOnlyFacts.unexpandedLeafDrawingSourceRows,14);assert.equal(s.closure.complete,true)
assert.deepEqual(s.versions,s.recordNames.map(n=>[n,s.records[n].version]));assert.equal(s.provenance.mixedDateProviderClosure,true);assert.equal(s.provenance.historicalArchiveRestoration,false)
for(const e of s.provenance.newRecords){const r=s.records[e.responseIdentity.name];assert.equal(e.query,r.name+'@'+r.version);assert.deepEqual(e.responseIdentity,{name:r.name,version:r.version,related:r.related});assert.equal(e.HTTPStatus,200)}
for(const k of['nativeApproval','runtimeApplied','productionImportAllowed'])assert.equal(s[k],false)
console.log(JSON.stringify({newAuthoredClosureFIRSTPASS:true,root:s.providerRoot,records:4,versions:s.versions,references:refs,unexpandedLeafRows:leafRows,closureComplete:true,engine:0,sourceProjection:0,nativeApproval:false,SHA256:sha(readFileSync(new URL('./sources.json',import.meta.url))),durationMs:performance.now()-start}))
