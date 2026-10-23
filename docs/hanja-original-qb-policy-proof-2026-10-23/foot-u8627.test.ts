import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU8627FootContext,reviewedU8627FootPolicy,makeReviewedU8627FootSourceContext,measureReviewedU8627FootFrame,commitReviewedU8627FootMask,REVIEWED_U8627_FOOT_SOURCE as SOURCE} from './foot-u8627.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(readFileSync(new URL('../hanja-source-original-u8627-vs2-2026-10-23/fixtures.json',import.meta.url),'utf8'))['u8627-ue0102'],proof=f.fullProof,strokes=f.strokes,identity=f.identity,context=reviewedU8627FootContext(strokes),policies=[reviewedU8627FootPolicy(context,20,1)],code=readFileSync(new URL('./foot-u8627.ts',import.meta.url),'utf8'),allFeet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u8627-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u8627-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u8627-foot-ink','data-owner':'test','data-u8627-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u8627-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u8627-foot-foot','data-u8627-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u8627-foot-body','data-u8627-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u8627-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u8627-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u8627-foot-measure','data-u8627-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**3*q[0]+3*t*(1-t)**2*q[2]+3*t*t*(1-t)*q[4]+t**3*q[6],y:(1-t)**3*q[1]+3*t*(1-t)**2*q[3]+3*t*t*(1-t)*q[5]+t**3*q[7]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}
function runDOM(index:number){
 const s=setup(index),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU8627FootFrame(s.policy,p,s.nodes.measurement)}
 const feet=allFeet[index],share=Number(feet.phaseShare[0])/Number(feet.phaseShare[1])
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU8627FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU8627FootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU8627FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU8627FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup(index);own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU8627FootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU8627FootMask(own.nodes,f8),false)
 const forged=setup(index);forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU8627FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU8627FootMask(forged.nodes,{...f}),false)
 const transformed=setup(index);transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU8627FootFrame(transformed.policy,.8,transformed.nodes.measurement))
}

test('蘧 QB original foot finite DOM source binding',()=>{assert(context);assert.equal(makeReviewedU8627FootSourceContext(proof,identity,strokes),context);for(const key of Object.keys(proof)){const bad=clone(proof);delete bad[key];assert.equal(makeReviewedU8627FootSourceContext(bad,identity,strokes),null)}for(const key of Object.keys(identity)){const bad=clone(identity);delete bad[key];assert.equal(makeReviewedU8627FootSourceContext(proof,bad,strokes),null)}runDOM(0)})
test('蘧 original cubic UA89.5 maps source ink95.1 without altering point',()=>{
 const s=setup(),share=Number(allFeet[0].phaseShare[0])/Number(allFeet[0].phaseShare[1]);
 for(const raw of[26.5-2**-20,89.5,89.5+2**-20]){const p=.8;s.g.setAttribute('data-stroke-reveal-progress',String(p));s.nodes.measurement.getPointAtLength=(d:number)=>({x:d===0?26.5:d===40?89.5:raw,y:80.2});const frame=measureReviewedU8627FootFrame(s.policy,p,s.nodes.measurement);assert.equal(frame.point!.x,raw);assert.equal(frame.threshold,raw<26.5?28:95.1);assert.equal(commitReviewedU8627FootMask(s.nodes,frame),true)}
 assert.equal(SOURCE.originalGuideEndX,89.5);assert.equal(SOURCE.originalPMaxX,95.1);assert.equal(SOURCE.UAOutputUnmodified,true)
})

