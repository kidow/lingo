import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {spawnSync} from 'node:child_process'
import {makeReviewedU5ebeCardinalSourceContext,reviewedU5ebeCardinalPolicy,sampleReviewedU5ebeCardinalFrame,verifyReviewedU5ebeCardinalPrior} from './hanja-stroke-cardinal-contact-u5ebe.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u5ebe-ue0102-2026-10-25/fixtures.json',import.meta.url),'utf8')).u5ebe_ue0102
const context=makeReviewedU5ebeCardinalSourceContext(f.fullProof,f.identity,f.strokes)!
const policy=reviewedU5ebeCardinalPolicy(context,7,1)!
test('庾 added8m2 band is source-bound and grows continuously from the original H',()=>{
 assert(context&&policy);assert.deepEqual(policy.segment,f.strokes[7][1]);assert.deepEqual(policy.predecessor,f.strokes[7][0])
 for(let p=0;p<12;p++)for(let m=0;m<f.strokes[p].length;m++)assert.equal(!!reviewedU5ebeCardinalPolicy(context,p,m),p===7&&m===1)
 assert.equal(policy.originY,32);assert.equal(policy.negativeExtent,3.5);assert.equal(policy.positiveExtent,40.6)
 assert.equal(sampleReviewedU5ebeCardinalFrame(policy,policy.segment,0,0).visible,false)
 for(const p of [Number.EPSILON,1e-12,.000001,.01,.03,.5,.99999999]){const x=sampleReviewedU5ebeCardinalFrame(policy,policy.segment,p,1);assert(x.clip);assert.equal(x.clip.y,32-3.5*p);assert.equal(x.clip.height,44.1*p);assert(x.clip.y<=32);assert(x.clip.y+x.clip.height>=32)}
 const full=sampleReviewedU5ebeCardinalFrame(policy,policy.segment,1,1);assert.equal(full.clip,null);assert.equal(full.originalPDirect,true)
 assert.throws(()=>sampleReviewedU5ebeCardinalFrame({...policy},policy.segment,.01,1));assert.throws(()=>sampleReviewedU5ebeCardinalFrame(policy,{...policy.segment,weight:policy.segment.weight+1},.01,1));assert.throws(()=>sampleReviewedU5ebeCardinalFrame(policy,policy.segment,.01,.999))
 assert.equal(makeReviewedU5ebeCardinalSourceContext({...f.fullProof,trace:[]},f.identity,f.strokes),null)
})
function actualPrior(){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(key:string)=>attributes[key]??null,setAttribute:(key:string,value:string)=>{attributes[key]=value}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':'8'}),prior=node('path',{d:policy.predecessor.outline}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind})
 for(const n of [pen,prior,g])n.ownerSVGElement=owner
 pen.parentElement=owner;prior.parentElement=pen;g.parentElement=pen;prior.nextElementSibling=g;g.previousElementSibling=prior;owner.children=[pen];pen.children=[prior,g]
 return{g:g as unknown as SVGGElement,prior,style,pen,owner}
}
test('庾 added8m2 band requires the actual adjacent opaque original H',()=>{
 const d=actualPrior();assert.equal(verifyReviewedU5ebeCardinalPrior(policy,d.g,1),true);assert.equal(verifyReviewedU5ebeCardinalPrior(policy,d.g,.999),false)
 for(const fill of ['transparent','rgba(0,0,0,0)','rgb(0 0 0 / 0)','#0000','#00000000']){const x=actualPrior();x.style.fill=fill;assert.equal(verifyReviewedU5ebeCardinalPrior(policy,x.g,1),false)}
 for(const field of ['opacity','fillOpacity']){const x=actualPrior();x.style[field as 'opacity'|'fillOpacity']='0';assert.equal(verifyReviewedU5ebeCardinalPrior(policy,x.g,1),false)}
 const x=actualPrior();x.prior.setAttribute('d',policy.predecessor.outline+' ');assert.equal(verifyReviewedU5ebeCardinalPrior(policy,x.g,1),false)
 const hidden=actualPrior();hidden.prior.isConnected=false;assert.equal(verifyReviewedU5ebeCardinalPrior(policy,hidden.g,1),false)
 const transformed=actualPrior();transformed.prior.setAttribute('transform','translate(1)');assert.equal(verifyReviewedU5ebeCardinalPrior(policy,transformed.g,1),false)
})
test('庾 remaining exact source conditions are reproducible without an engine',()=>{
 const r=spawnSync('python3',['docs/hanja-source-original-u5ebe-ue0102-2026-10-25/verify-remaining-mask-proof.py','--check'],{cwd:new URL('..',import.meta.url),encoding:'utf8',timeout:30000})
 assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/exact rational proof PASS/)
})
