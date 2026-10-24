import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),s=read('./sources.json'),path='../hanja-source-alternatives-g1-five-2026-10-24.json',old=read(path),start=performance.now()
assert.equal(sha(readFileSync(new URL(path,import.meta.url))),s.provenance.preservedExisting.SHA256)
const root=old.records.find(r=>r.name==='hkcs_m7626');assert(root);assert.equal(s.records.hkcs_m7626.data,root.exactPublicData);assert.equal(s.records.hkcs_m7626.version,2)
assert.equal(s.providerRoot,'hkcs_m7626');assert.equal(s.localArtifactTagIsProviderRoot,false);assert.deepEqual(Object.keys(s.records),s.recordNames);assert.deepEqual(s.versions,s.recordNames.map(n=>[n,s.records[n].version]))
for(const r of s.provenance.newRecords){assert.equal(s.records[r.referenceKey].name,r.responseIdentity.name);assert.equal(s.records[r.referenceKey].version,'2');assert.equal(sha(s.records[r.referenceKey].data),r.sourceDataSHA256);assert.equal(r.query,r.referenceKey+'@2');assert.equal(r.unversionedMatchesExplicitVersion,true)}
const seen=new Set(),stack=new Set(),refs=[];let rows=0,metadata=0
function visit(key){assert(!stack.has(key));if(seen.has(key))return;const r=s.records[key];assert(r,'Missing literal dependency');assert.equal(r.name,key);stack.add(key);for(const row of r.data.split('$')){const a=row.split(':');if(a[0]==='99'){refs.push([key,a[7]]);visit(a[7])}else{assert(Number.isFinite(Number(a[0])));rows++;if(row==='0')metadata++}}stack.delete(key);seen.add(key)}
visit(s.providerRoot);assert.equal(seen.size,3);assert.equal(rows,17);assert.equal(metadata,0)
assert.equal(s.provenance.mixedDateProviderClosure,true);assert.equal(s.provenance.historicalArchiveRestoration,false);assert.equal(s.provenance.aliasInserted,false);assert.equal(s.nativeApproval,false);assert.equal(s.runtimeApplied,false);assert.equal(s.engineRuns,0)
assert.equal(s.sourceOnlyFacts.catalogStrokes,14);assert.equal(s.sourceOnlyFacts.existingDomesticClips,15);assert.equal(s.sourceOnlyFacts.countConflictResolved,false);assert.equal(s.sourceOnlyFacts.oldHoldsResolved,false)
console.log(JSON.stringify({newAuthoredClosureFIRSTPASS:true,root:s.providerRoot,records:3,unexpandedLeafRows:rows,metadata,refs,engine:0,sourceProjection:0,catalog14Domestic15Unchanged:true,SHA256:sha(readFileSync(new URL('./sources.json',import.meta.url))),durationMs:performance.now()-start}))
