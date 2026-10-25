import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{makeReviewedU56acGSourceContext,reviewedU56acGContext,reviewedU56acGPolicy,measureReviewedU56acGFrame,commitReviewedU56acGCaps}from'./hanja-stroke-start-caps-u56ac-g.ts'
import{makeReviewedU56acGCardinalSourceContext,reviewedU56acGCardinalPolicy,sampleReviewedU56acGCardinalFrame,verifyReviewedU56acGCardinalPrior}from'./hanja-stroke-cardinal-contact-u56ac-g.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u56ac-g-2026-10-25/fixtures.json',import.meta.url),'utf8')).u56ac_g
const targets=[[9,1],[10,1],[12,1],[18,1],[19,1]],bands=[[2,2],[14,2]]
function measurement(policy:NonNullable<ReturnType<typeof reviewedU56acGPolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u56acg-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u56acg-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g,node('g'),node('g')]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,style,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}

test('u56ac-g exact full5 chooses only own source masks and rejects altered or accessor fields',()=>{
 const c=makeReviewedU56acGSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(c);assert.equal(c,reviewedU56acGContext(f.strokes))
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU56acGPolicy(c,p,m);assert.equal(!!q,targets.some(([a,b])=>a===p+1&&b===m+1));if(q)assert.deepEqual(q.segment,f.strokes[p][m])}
 assert.equal(makeReviewedU56acGSourceContext(f.fullProof,{...f.identity,sourceRoot:'foreign'},f.strokes),null)
 const bad=structuredClone(f.fullProof);bad.groups[0].polygons[0][0].x+=.01;assert.equal(makeReviewedU56acGSourceContext(bad,f.identity,f.strokes),null)
 let getters=0;const g=structuredClone(f.fullProof);Object.defineProperty(g,'trace',{enumerable:true,get(){getters++;return f.fullProof.trace}});assert.equal(makeReviewedU56acGSourceContext(g,f.identity,f.strokes),null);assert.equal(getters,0)
 for(const[p,m]of targets){const ss=structuredClone(f.strokes);ss[p-1][m-1].weight+=.01;assert.equal(reviewedU56acGContext(ss),null)}
})
test('u56ac-g own Q/ML cap radii grow from zero without a completed-prior premise for independent pens',()=>{
 const c=makeReviewedU56acGSourceContext(f.fullProof,f.identity,f.strokes)!,none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const[p,m]of targets){const q=reviewedU56acGPolicy(c,p-1,m-1)!;assert.equal(q.mask,1);assert.equal(commitReviewedU56acGCaps(q,q.segment,0,'own',none).status,'empty')
  for(const t of [Number.EPSILON,1e-15,1e-10,.01,.5,.99999999]){const d=measurement(q,t),r=measureReviewedU56acGFrame(q,q.segment,t,d.guide);assert.equal(r.d,t*100);assert.equal(r.rho,Math.min(7,t*100))}
  assert.equal(commitReviewedU56acGCaps(q,q.segment,1,'own',none).status,'complete');assert.equal(commitReviewedU56acGCaps({...q},q.segment,1,'own',none).status,'hidden')
 }
})
function prior(q:NonNullable<ReturnType<typeof reviewedU56acGCardinalPolicy>>){
 const style:Record<string,string>={};const doc:any={defaultView:null}
 const view:any={document:doc,getComputedStyle:()=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',...style,getPropertyValue:(k:string)=>style[k]??'none'})};doc.defaultView=view
 const node=(localName:string,attrs:Record<string,string>={})=>({namespaceURI:'http://www.w3.org/2000/svg',localName,ownerDocument:doc,ownerSVGElement:null as any,parentElement:null as any,isConnected:true,children:[]as any[],getAttribute:(k:string)=>attrs[k]??null,setAttribute:(k:string,v:string)=>{attrs[k]=v}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(q.pen)}),prev=node('path',{d:q.predecessor.outline}),g=node('g',{'data-stroke-start-gate':q.id,'data-stroke-reveal-policy':q.kind})
 Object.defineProperty(g,'previousElementSibling',{get:()=>pen.children[pen.children.indexOf(g)-1]??null});Object.defineProperty(prev,'nextElementSibling',{get:()=>pen.children[pen.children.indexOf(prev)+1]??null})
 owner.children=[pen];pen.parentElement=owner;pen.children=[prev,g];prev.parentElement=g.parentElement=pen
 for(const n of[pen,prev,g])n.ownerSVGElement=owner
 return{g,prev,pen,style}
}
test('u56ac-g source-bound H/V band stays on exact prior H and fails closed on DOM changes',()=>{
 const c=makeReviewedU56acGCardinalSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(c)
 for(const[p,m]of bands){const q:NonNullable<ReturnType<typeof reviewedU56acGCardinalPolicy>>=reviewedU56acGCardinalPolicy(c,p-1,m-1)!;assert.ok(q)
  for(const t of[0,Number.EPSILON,1e-10,.01,.5,.99999999,1]){const r=sampleReviewedU56acGCardinalFrame(q,q.segment,t,1);assert.equal(r.UARead,false);assert.equal(r.originalPDirect,t===1);if(t>0&&t<1){assert(r.clip);assert.equal(r.clip.y,q.origin-q.negativeExtent*t);assert.equal(r.clip.height,(q.negativeExtent+q.positiveExtent)*t);assert(r.clip.y<=q.origin&&r.clip.y+r.clip.height>=q.origin)}else assert.equal(r.clip,null)}
  assert.throws(()=>sampleReviewedU56acGCardinalFrame(q,q.segment,.1,.999));assert.throws(()=>sampleReviewedU56acGCardinalFrame({...q},q.segment,.1,1));assert.throws(()=>sampleReviewedU56acGCardinalFrame(q,{...q.segment,weight:1},.1,1))
  const n=prior(q);assert.equal(verifyReviewedU56acGCardinalPrior(q,n.g as unknown as SVGGElement,1),true);assert.equal(verifyReviewedU56acGCardinalPrior(q,n.g as unknown as SVGGElement,.999),false)
  n.prev.setAttribute('d',q.predecessor.outline+' ');assert.equal(verifyReviewedU56acGCardinalPrior(q,n.g as unknown as SVGGElement,1),false)
  for(const mutate of[(n:ReturnType<typeof prior>)=>n.style.opacity='.5',(n:ReturnType<typeof prior>)=>n.style.transform='scale(2)',(n:ReturnType<typeof prior>)=>n.pen.children.reverse(),(n:ReturnType<typeof prior>)=>n.style.fill='rgba(0,0,0,0)']){const d=prior(q);mutate(d);assert.equal(verifyReviewedU56acGCardinalPrior(q,d.g as unknown as SVGGElement,1),false)}
 }
})
