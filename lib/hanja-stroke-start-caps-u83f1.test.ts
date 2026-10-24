import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync}from'node:fs'
import {createHash}from'node:crypto'
import {makeReviewedU83f1SourceContext,reviewedU83f1Context,reviewedU83f1Policy,reviewedU83f1PreviousComplete,measureReviewedU83f1Frame,commitReviewedU83f1Caps,REVIEWED_U83F1_SOURCE as SOURCE}from'./hanja-stroke-start-caps-u83f1.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(x:Buffer|string)=>createHash('sha256').update(x).digest('hex'),f=JSON.parse(bytes(SOURCE.sourceCacheFile).toString()).u83f1
function binding(policy:any){const style:any={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'rgb(0, 0, 0)',getPropertyValue:()=> 'none'},doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({...style,...n.style})};doc.defaultView=view;const el=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,parentElement:null,ownerSVGElement:null,children:[]as any[],attrs,style:{},getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v},removeAttribute(k:string){delete this.attrs[k]}}as any);const owner=el('svg'),parent=el('g'),previous=el('path',{d:policy.previousSegment?.outline??'independent-unused'}),g=el('g',{'data-stroke-start-gate':policy.id}),defs=el('defs'),measurement=el('path');parent.parentElement=owner;previous.parentElement=parent;g.parentElement=parent;defs.parentElement=g;measurement.parentElement=defs;g.previousElementSibling=previous;previous.nextElementSibling=g;for(const n of[parent,previous,g,defs,measurement])n.ownerSVGElement=owner;return{style,owner,parent,previous,g,defs,measurement,el}}
function measurementBinding(b:any,p:any,progress:number){const id='extra-check',attrs={'data-growing-owner':id},mask=b.el('mask',{id:id+'-u83f1-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}),guide=b.el('path',{...attrs,id:id+'-u83f1-guide',d:p.segment.revealPath,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=b.el('circle',{...attrs}),endCap=b.el('circle',{...attrs}),ink=b.el('path',{...attrs,d:p.segment.outline,mask:'url(#'+id+'-u83f1-growing)'});mask.parentElement=b.defs;for(const n of[guide,startCap,endCap])n.parentElement=mask;ink.parentElement=b.g;for(const n of[mask,guide,startCap,endCap,ink])n.ownerSVGElement=b.owner;Object.assign(b.g.attrs,{'data-u83f1-progress':String(progress),'data-u83f1-clip':id});Object.assign(b.measurement.attrs,{...attrs,id:id+'-u83f1-measure',d:p.segment.revealPath,'data-u83f1-measurement':'true'});const q0=p.segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);b.measurement.getTotalLength=()=>10;b.measurement.getPointAtLength=(d:number)=>({x:q0[0]+d,y:q0[1]});return{id,measurement:b.measurement,guide,startCap,endCap,ink}}
test('菱 three exact source guides share one context and measured growing/direct-prior contracts',()=>{
 assert.equal(sha(bytes(SOURCE.proofFile)),SOURCE.proofSHA256)
 const context=makeReviewedU83f1SourceContext(f.fullProof,f.identity,f.strokes);assert(context);assert.equal(context,reviewedU83f1Context(f.strokes))
 for(const [pen,mask]of[[9,1],[10,2],[11,1]]){
  const p=reviewedU83f1Policy(context,pen-1,mask-1);assert(p);assert.deepEqual(p.segment,f.strokes[pen-1][mask-1]);const b=binding(p),previous=mask===1?NaN:1
  assert.equal(reviewedU83f1PreviousComplete(p,b.g,previous),true)
  for(const progress of[.03,.9]){
   const nodes=measurementBinding(b,p,progress),frame=measureReviewedU83f1Frame(p,p.segment,progress,b.measurement,previous)
   assert.equal(frame.rho,Math.min(7,progress*10));const result=commitReviewedU83f1Caps(p,p.segment,progress,nodes.id,nodes,previous)
   assert.equal(result.status,'visible');assert.equal(nodes.startCap.getAttribute('r'),String(frame.rho));assert.equal(nodes.ink.getAttribute('visibility'),'visible');result.cleanup();assert.equal(nodes.ink.getAttribute('visibility'),'hidden')
  }
  if(mask>1){assert.equal(reviewedU83f1PreviousComplete(p,b.g,.9999999),false);b.previous.attrs.mask='url(#wrong)';assert.equal(reviewedU83f1PreviousComplete(p,b.g,1),false);delete b.previous.attrs.mask}
  assert.throws(()=>measureReviewedU83f1Frame({...p}as never,p.segment,.5,b.measurement,previous));assert.throws(()=>measureReviewedU83f1Frame(p,{...p.segment,weight:p.segment.weight+1},.5,b.measurement,previous))
 }
 const changed=structuredClone(f.strokes);changed[0][0].weight++;assert.equal(reviewedU83f1Context(changed),null)
 assert.equal(makeReviewedU83f1SourceContext(f.fullProof,{...f.identity,sourceRoot:'wrong'},f.strokes),null)
})
