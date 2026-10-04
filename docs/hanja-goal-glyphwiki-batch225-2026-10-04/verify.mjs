import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
const here=new URL('./',import.meta.url)
const read=n=>JSON.parse(readFileSync(new URL(n,here)))
const source=read('sources.json'),engine=read('engine-proof.json'),trace=read('draw-trace.json'),findings=read('findings.json'),alternatives=read('alternatives.json')
const hash=b=>createHash('sha256').update(b).digest('hex')
export function validateWithheldSource(){
 assert.equal(hash(readFileSync(new URL('sources.json',here))),"fe3bfad39f6606f5122a63ce99d675e95ded5a28a87d4809a38f7a7bc39fab1c")
 assert.equal(source.root,'u838e-k');assert.deepEqual(source.missing,[])
 for(const s of [source,...alternatives])for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
 assert.equal(Object.keys(source.records).length,7);assert.equal(Object.keys(engine.engineHashes).length,8)
 assert.equal(engine.groups.length,12);assert.equal(trace.flat().length,13)
 assert.deepEqual(trace,engine.trace);assert.equal(findings.runtimeAdded,0);assert.equal(findings.domesticReview.fullAnimationApproved,false)
 const end=trace[6][0].args.slice(4,6),start=trace[7][0].args.slice(0,2)
 assert.deepEqual(end,[40.25,184.56]);assert.deepEqual(start,[36,160.25]);assert.notDeepEqual(end,start)
 assert.equal(Math.hypot(end[0]-start[0],end[1]-start[1]),findings.originalDomestic7.gapInSourceUnits)
 for(const s of alternatives)assert.equal(s.records['u6c35-01'].data,source.records['u6c35-01'].data)
 assert.equal(read('metadata.json').dictionary.sha256,'1fd6ff9ffd895fe245c8b0348e54f4bacba37eb86845e2480d766fcda5e67176')
 return {passed:true,runtimeAdded:0,exactSourceClosure:true,alternativeWholeRoots:alternatives.length,gapInSourceUnits:findings.originalDomestic7.gapInSourceUnits,privateMediaSaved:false}
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log(JSON.stringify(validateWithheldSource()))
