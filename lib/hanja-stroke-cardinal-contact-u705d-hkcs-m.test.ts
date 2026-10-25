import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU705dHkcsMCardinalSourceContext,reviewedU705dHkcsMCardinalPolicy,sampleReviewedU705dHkcsMCardinalFrame,verifyReviewedU705dHkcsMCardinalPrior} from './hanja-stroke-cardinal-contact-u705d-hkcs-m.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u705d-hkcs-m-2026-10-26/fixtures.json',import.meta.url),'utf8')).hkcs_m705d
const context=makeReviewedU705dHkcsMCardinalSourceContext(f.fullProof,f.identity,f.strokes)!
function dom(q:NonNullable<ReturnType<typeof reviewedU705dHkcsMCardinalPolicy>>){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attrs:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attrs[k]??null,attrs,style:{...style}})
 doc.defaultView.getComputedStyle=(n?:unknown)=>n?(n as ReturnType<typeof node>).style:style
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(q.pen)}),prev=node('path',{d:q.predecessor.outline}),g=node('g',{'data-stroke-start-gate':q.id,'data-stroke-reveal-policy':q.kind})
 for(const n of[pen,prev,g])n.ownerSVGElement=owner
 pen.parentElement=owner;prev.parentElement=pen;g.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=[prev,g];owner.children=[pen]
 return {g:g as unknown as SVGGElement,prev,pen}
}
test('灝 exact source selects only three H/V original masks',()=>{
 assert.ok(context);let count=0
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU705dHkcsMCardinalPolicy(context,p,m);assert.equal(!!q,m===1&&[4,10,18].includes(p));if(q){count++;assert.deepEqual(q.segment,f.strokes[p][m]);assert.deepEqual(q.predecessor,f.strokes[p][0])}}
 assert.equal(count,3);const changed=JSON.parse(JSON.stringify(f.strokes));changed[4][1].weight+=.001;assert.equal(makeReviewedU705dHkcsMCardinalSourceContext(f.fullProof,f.identity,changed),null)
})
test('灝 nested band is empty at zero and restores exact full P',()=>{
 for(const pen of[5,11,19]){const q=reviewedU705dHkcsMCardinalPolicy(context,pen-1,1)!
 for(const p of[0,Number.EPSILON,1e-10,.01,.5,.99999999,1]){const r=sampleReviewedU705dHkcsMCardinalFrame(q,q.segment,p,1);assert.equal(r.UARead,false);assert.equal(r.originalPDirect,p===1);if(p>0&&p<1){assert(r.clip);assert.equal(r.clip.y,q.origin-q.negativeExtent*p);assert.equal(r.clip.height,(q.negativeExtent+q.positiveExtent)*p)}else assert.equal(r.clip,null)}
 assert.throws(()=>sampleReviewedU705dHkcsMCardinalFrame(q,q.segment,.1,.999));assert.throws(()=>sampleReviewedU705dHkcsMCardinalFrame({...q},q.segment,.1,1));assert.throws(()=>sampleReviewedU705dHkcsMCardinalFrame(q,q.segment,NaN,1))}
})
test('灝 band requires same-frame exact opaque original H',()=>{
 for(const pen of[5,11,19]){const q=reviewedU705dHkcsMCardinalPolicy(context,pen-1,1)!,a=dom(q);assert.equal(verifyReviewedU705dHkcsMCardinalPrior(q,a.g,1),true);assert.equal(verifyReviewedU705dHkcsMCardinalPrior(q,a.g,.999),false);a.prev.attrs.d+=' ';assert.equal(verifyReviewedU705dHkcsMCardinalPrior(q,a.g,1),false);const b=dom(q);b.prev.style.opacity='.5';assert.equal(verifyReviewedU705dHkcsMCardinalPrior(q,b.g,1),false);const c=dom(q);c.pen.children.push({});assert.equal(verifyReviewedU705dHkcsMCardinalPrior(q,c.g,1),false)}
})
