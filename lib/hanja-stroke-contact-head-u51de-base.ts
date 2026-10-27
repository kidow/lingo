/** Exact original-source 凞 contact-head candidates. Authored display clocks; no native/runtime approval. */
import {outlineSegmentProgress,type HanjaOutlineSegment,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU51deBaseSourceRevealContext,reviewedU51deBaseSourceRevealPolicy,verifyReviewedU51deBaseSourceRevealCompletedDOM} from './hanja-stroke-source-reveal-u51de-base.ts'
import fixture from '../docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json' with {type:'json'}
import head3 from '../docs/hanja-source-original-u51de-base-2026-10-27/contact-head-prefix-3-10.json' with {type:'json'}
const FIXED=fixture.u51de,STROKES=FIXED.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',PREFIX='data-u51de-base-contact-head-'
type Point=readonly[number,number]
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
const ratio=(s:string)=>{const[a,b='1']=s.split('/');return Number(a)/Number(b)}
function polygon(s:string):Point[]{return(s.match(/M[^Z]+Z/g)??[]).flatMap(part=>{const n=(part.match(/-?\d+(?:\.\d+)?/g)??[]).map(Number);return Array.from({length:n.length/2},(_,i)=>[n[2*i],n[2*i+1]]as const)})}
freeze(FIXED)
export type ReviewedU51deBaseContactHeadContext=Readonly<{id:'u51de-base-original-16-contact-head'}>
const CONTEXT:ReviewedU51deBaseContactHeadContext=Object.freeze({id:'u51de-base-original-16-contact-head'})
export function makeReviewedU51deBaseContactHeadContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU51deBaseContactHeadContext|null{
 try{return arguments.length===3&&makeReviewedU51deBaseSourceRevealContext(proof,identity,strokes)?CONTEXT:null}catch{return null}
}
export type ReviewedU51deBaseContactHeadPolicy=Readonly<{id:string;kind:'source-contact-head-down-u51de-base';pen:number;mask:2;segment:HanjaOutlineSegment;priorSegment:HanjaOutlineSegment;headPhase:number;headParts:readonly Readonly<{vertices:readonly Point[];seed:Point;share:number}>[];bodyBounds:readonly[number,number,number,number];proofFingerprint:string;previewOnly:true}>
const THREE=head3.results[0].headGrowthSteps!,PARTS3=THREE.map((s,i)=>({vertices:s.sourceClipTriangle.map(p=>p.map(ratio)as unknown as Point),seed:s.edgeMidpointSeed.map(ratio)as unknown as Point,share:i===0?27625/55246:27621/55246}))
const POLICIES:readonly ReviewedU51deBaseContactHeadPolicy[]=freeze([
 {id:'u51de-base-contact-head-3-2',kind:'source-contact-head-down-u51de-base',pen:3,mask:2,segment:STROKES[2][1],priorSegment:STROKES[2][0],headPhase:331476/600981875,headParts:PARTS3,bodyBounds:[22.85,33.015,32.15,70.1],proofFingerprint:'39ecc8281667bbdd06bc84d70a3c356f8f386d6275a11d4611dd160ce1dbb467',previewOnly:true},
 {id:'u51de-base-contact-head-6-2',kind:'source-contact-head-down-u51de-base',pen:6,mask:2,segment:STROKES[5][1],priorSegment:STROKES[5][0],headPhase:500/2799,headParts:[{vertices:polygon(STROKES[5][1].outline.match(/M[^Z]+Z/g)![1]),seed:[2347/40,25933/908],share:1}],bodyBounds:[57.3,28.5,62.8,52.15],proofFingerprint:'a8668e022abea8a937dc7b98b9567a4b16c1404978bbcb64b56f8b7c81430c67',previewOnly:true},
 {id:'u51de-base-contact-head-10-2',kind:'source-contact-head-down-u51de-base',pen:10,mask:2,segment:STROKES[9][1],priorSegment:STROKES[9][0],headPhase:221/1541,headParts:[{vertices:polygon(STROKES[9][1].outline.match(/M[^Z]+Z/g)![1]),seed:[86,411/34],share:1}],bodyBounds:[84.5,12,90.5,42.5],proofFingerprint:'39ecc8281667bbdd06bc84d70a3c356f8f386d6275a11d4611dd160ce1dbb467',previewOnly:true}
])
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU51deBaseContactHeadPolicy(context:ReviewedU51deBaseContactHeadContext|null,pen:number,mask:number):ReviewedU51deBaseContactHeadPolicy|null{return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null}
function source(p:ReviewedU51deBaseContactHeadPolicy,s:HanjaOutlineSegment){if(!p||!PRIVATE.has(p)||!same(s,p.segment))throw Error('Private 凞 contact-head policy and exact original segment required')}
function headPath(policy:ReviewedU51deBaseContactHeadPolicy,progress:number):string{
 let offset=0,out=''
 for(const part of policy.headParts){const t=progress===1?1:Math.min(1,Math.max(0,(progress-offset)/part.share));offset+=part.share;if(t<=0)continue;const points=part.vertices.map(v=>v.map((x,k)=>t===1?x:part.seed[k]+t*(x-part.seed[k])));out+='M'+points.map(p=>p.join(' ')).join(' L')+' Z'}
 return out
}
export type ReviewedU51deBaseContactHeadFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'contact-head'|'contact-body'|'full';visible:boolean;originalPDirect:boolean;outline:string|null;headProgress:number;bodyProgress:number;headPath:string;bodyClip:Readonly<{x:number;y:number;width:number;height:number}>;sourceGuide:string|undefined;sourceWidth:number|undefined;authorClock:'authored-source-contact-head-then-coordinate-y-increasing';originalClockEquivalent:false;previewOnly:true;UARead:false}>
export function sampleReviewedU51deBaseContactHeadFrame(policy:ReviewedU51deBaseContactHeadPolicy,segment:HanjaOutlineSegment,p:number,priorProgress=0,priorOpaque=false):ReviewedU51deBaseContactHeadFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1||!Number.isFinite(priorProgress)||priorProgress<0||priorProgress>1||typeof priorOpaque!=='boolean')throw Error('Finite unit progress and exact prior state required')
 if(p>0&&(priorProgress!==1||!priorOpaque))throw Error('Opaque current-frame completed original prior required')
 const h=Math.min(1,p/policy.headPhase),b=Math.max(0,(p-policy.headPhase)/(1-policy.headPhase)),[x,y,x1,y1]=policy.bodyBounds
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':p<=policy.headPhase?'contact-head':'contact-body',visible:p>0,originalPDirect:p===1,outline:p>0?segment.outline:null,headProgress:h,bodyProgress:b,headPath:headPath(policy,h),bodyClip:Object.freeze({x,y,width:x1-x,height:(y1-y)*b}),sourceGuide:segment.revealPath,sourceWidth:segment.revealWidth,authorClock:'authored-source-contact-head-then-coordinate-y-increasing',originalClockEquivalent:false,previewOnly:true,UARead:false})
}
export type ReviewedU51deBaseContactHeadNodes={group:SVGGElement|null;ink:SVGPathElement|null;head:SVGPathElement|null;body:SVGRectElement|null;mask:SVGMaskElement|null}
function canonicalRectGeometry(owner:SVGSVGElement,doc:Document,view:Window,shape:Readonly<{x:number;y:number;width:number;height:number}>){
 const host=doc.createElementNS(NS,'g'),probe=doc.createElementNS(NS,'rect'),keys=['x','y','width','height']as const
 const neutral={display:'inline',visibility:'hidden',opacity:'0',fill:'none',stroke:'none',transform:'none',filter:'none','clip-path':'none','mask-image':'none',translate:'none',rotate:'none',scale:'none',animation:'none',transition:'none'}
 for(const node of[host,probe])for(const[k,v]of Object.entries(neutral))node.style.setProperty(k,v,'important')
 for(const k of keys){probe.setAttribute(k,String(shape[k]));probe.style.setProperty(k,String(shape[k])+'px','important')}
 const inline=new Map(keys.map(k=>[k,probe.style.getPropertyValue(k)]))
 host.appendChild(probe)
 try{
  owner.appendChild(host)
  const exact=()=>host.parentNode===owner&&probe.parentNode===host&&host.children.length===1&&host.children[0]===probe&&host.ownerSVGElement===owner&&probe.ownerSVGElement===owner&&host.ownerDocument===doc&&probe.ownerDocument===doc&&host.isConnected&&probe.isConnected&&doc.defaultView===view&&view.document===doc&&keys.every(k=>probe.getAttribute(k)===String(shape[k])&&probe.style.getPropertyPriority(k)==='important'&&inline.get(k)!==''&&probe.style.getPropertyValue(k)===inline.get(k))
  if(!exact())throw Error('Connected isolated canonical SVG rectangle required')
  for(const node of[host,probe]){
   const style=view.getComputedStyle(node)
   if(style.display==='none'||style.visibility!=='hidden'||Number(style.opacity)!==0||style.fill!=='none'||style.stroke!=='none'||style.transform!=='none'||style.filter!=='none'||style.clipPath!=='none'||!['','none'].includes(style.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(style.getPropertyValue(k))))throw Error('Canonical rectangle probe must have no paint or effects')
  }
  const computed=view.getComputedStyle(probe),css=new Map(keys.map(k=>[k,computed.getPropertyValue(k)])),b=probe.getBBox(),bounds={x:b.x,y:b.y,width:b.width,height:b.height}
  if([...css.values()].some(v=>!v.endsWith('px')||!Number.isFinite(Number(v.slice(0,-2))))||!Object.values(bounds).every(Number.isFinite)||bounds.width<0||bounds.height<0||!exact())throw Error('Finite nonnegative browser-canonical rectangle required')
  return{css,bounds}
 }finally{host.remove()}
}
function opaqueRGB(value:string):boolean{const m=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!m)return false;const q=m[1].split('/'),v=q[0].replaceAll(',',' ').trim().split(/\s+/);let a:string|undefined=q[1]?.trim();if(q.length>2)return false;if(a===undefined&&v.length===4)a=v.pop();return v.length===3&&v.every(x=>Number.isFinite(Number(x.replace('%',''))))&&(a===undefined||(a.endsWith('%')?Number(a.slice(0,-1))/100:Number(a))===1)}
function cssPath(doc:Document,value:string,d:string):boolean{if(d==='')return value===''||value==='none';if(value==='')return true;const probe=doc.createElementNS(NS,'path');probe.style.setProperty('d','path('+JSON.stringify(d)+')');const expected=probe.style.getPropertyValue('d');return expected!==''&&value===expected}
function canonicalMaskImage(owner:SVGSVGElement,doc:Document,view:Window,id:string){
 const g=doc.createElementNS(NS,'g'),probe=doc.createElementNS(NS,'rect'),value='url(#'+id+')',neutral={display:'inline',visibility:'hidden',opacity:'0',fill:'none',stroke:'none',transform:'none',filter:'none',translate:'none',rotate:'none',scale:'none',animation:'none',transition:'none'}
 for(const node of[g,probe])for(const[k,v]of Object.entries(neutral))node.style.setProperty(k,v,'important')
 for(const k of['x','y','width','height'])probe.setAttribute(k,'0');probe.style.setProperty('mask-image',value,'important');g.appendChild(probe)
 try{owner.appendChild(g);const exact=()=>g.parentNode===owner&&probe.parentNode===g&&g.isConnected&&probe.isConnected&&g.ownerSVGElement===owner&&probe.ownerSVGElement===owner&&probe.ownerDocument===doc&&doc.defaultView===view&&probe.style.getPropertyPriority('mask-image')==='important'&&probe.style.getPropertyValue('mask-image')!=='';if(!exact())throw Error('Connected canonical mask probe required');const result=view.getComputedStyle(probe).getPropertyValue('mask-image');if(!result||result==='none'||!exact())throw Error('Canonical source mask reference required');return result}finally{g.remove()}
}
export function verifyReviewedU51deBaseContactHeadPriorDOM(policy:ReviewedU51deBaseContactHeadPolicy,g:SVGGElement|null,logicalProgress:number,frameId:string):boolean{
 try{
  source(policy,policy.segment);if(!g||!g.parentNode||!frameId)return false
  const slot=g.parentNode as SVGGElement,ctx=makeReviewedU51deBaseSourceRevealContext(FIXED.fullProof,FIXED.identity,STROKES),prior=reviewedU51deBaseSourceRevealPolicy(ctx,policy.pen-1,0)
  return!!prior&&slot.children.length===2&&slot.children[1]===g&&verifyReviewedU51deBaseSourceRevealCompletedDOM(prior,slot.children[0]as SVGGElement,logicalProgress,frameId)
 }catch{return false}
}
export function commitReviewedU51deBaseContactHead(policy:ReviewedU51deBaseContactHeadPolicy,segment:HanjaOutlineSegment,p:number,clipId:string,nodes:ReviewedU51deBaseContactHeadNodes,priorProgress=0,logicalProgress=NaN,frameId=''){
 const{group:g,ink,head,body,mask}=nodes
 const reset=()=>{ink?.setAttribute('visibility','hidden');ink?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const prior=()=>verifyReviewedU51deBaseContactHeadPriorDOM(policy,g,logicalProgress,frameId)
  const frame=sampleReviewedU51deBaseContactHeadFrame(policy,segment,p,priorProgress,p>0&&prior())
  if(!g||!ink||!head||!body||!mask||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-1'))throw Error('Exact contact-head nodes and source id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=mask.parentNode,slot=g.parentNode,outer=slot?.parentNode,key=clipId+'-u51de-base-contact-head-mask'
  if(!owner||!view||view.document!==doc||!defs||!slot||!outer||defs.nodeType!==1||slot.nodeType!==1||outer.nodeType!==1)throw Error('Connected source owner required')
  const amounts=outlineSegmentProgress(STROKES[policy.pen-1],logicalProgress),pen=slot as SVGGElement,outlines=outer as SVGGElement
  const exact=(visibility:string,committed:boolean)=>g.children.length===2&&g.children[0]===defs&&g.children[1]===ink&&defs.children.length===1&&defs.children[0]===mask&&mask.children.length===2&&mask.children[0]===head&&mask.children[1]===body&&mask.id===key&&head.id===clipId+'-u51de-base-contact-head-head'&&body.id===clipId+'-u51de-base-contact-head-body'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(PREFIX+'context')===CONTEXT.id&&g.getAttribute(PREFIX+'clip')===clipId&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')===String(priorProgress)&&g.getAttribute(PREFIX+'logical-progress')===String(logicalProgress)&&g.getAttribute(PREFIX+'frame')===frameId&&!!frameId&&Number.isFinite(logicalProgress)&&amounts[1]===p&&amounts[0]===priorProgress&&outlines.children.length===STROKES.length&&outlines.children[policy.pen-1]===pen&&outlines.getAttribute('data-stroke-outlines')==='true'&&pen.getAttribute('data-outline-stroke')===String(policy.pen)&&pen.children.length===2&&pen.children[1]===g&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('visibility')===visibility&&ink.getAttribute(PREFIX+'committed')===String(committed)&&ink.getAttribute('mask')===(frame.originalPDirect?null:'url(#'+key+')')&&ink.getAttribute('clip-path')===null&&head.getAttribute('d')===frame.headPath&&head.getAttribute('fill')==='white'&&body.getAttribute('fill')==='white'&&Object.entries(frame.bodyClip).every(([k,v])=>body.getAttribute(k)===String(v))&&[['maskUnits','userSpaceOnUse'],['maskContentUnits','userSpaceOnUse'],['x','0'],['y','0'],['width','100'],['height','100']].every(([k,v])=>mask.getAttribute(k)===v)
  head.setAttribute('d',frame.headPath);for(const[k,v]of Object.entries(frame.bodyClip))body.setAttribute(k,String(v))
  if(frame.originalPDirect)ink.removeAttribute('mask');else ink.setAttribute('mask','url(#'+key+')')
  const canonical=canonicalRectGeometry(owner,doc,view,frame.bodyClip),maskCSS=frame.originalPDirect?'none':canonicalMaskImage(owner,doc,view,key)
  const tree:Element[]=[g,ink,defs as Element,mask,head,body],seen=new Set<Element>();let current:Element|null=pen
  while(current){if(seen.has(current))throw Error('Cyclic source owner');seen.add(current);tree.push(current);if(current===owner)break;const parent:ParentNode|null=current.parentNode;current=parent?.nodeType===1?parent as Element:null}
  if(current!==owner)throw Error('Foreign source SVG owner')
  const parents=new Map(tree.map(n=>[n,n.parentNode]))
  const stable=(visibility:string,committed:boolean)=>{
   if(!exact(visibility,committed)||p>0&&!prior()||doc.defaultView!==view||view.document!==doc)return false
   for(const n of tree){
    if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!==NS||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||n.parentNode!==parents.get(n)||['transform','filter','clip-path'].some(k=>n.getAttribute(k)!==null)||(n!==ink&&n.getAttribute('mask')!==null))return false
    const s=view.getComputedStyle(n)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||s.clipPath!=='none'||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k)))||s.getPropertyValue('mask-image')!==(n===ink?maskCSS:'none')||n!==ink&&s.visibility!=='visible')return false
   }
   const paint=view.getComputedStyle(ink),hs=view.getComputedStyle(head),bs=view.getComputedStyle(body)
   if(paint.visibility!==visibility||paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||['pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>ink.hasAttribute(k))||!cssPath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   for(const s of[hs,bs])if(s.stroke!=='none'||Number(s.fillOpacity)!==1||s.fillRule!=='nonzero'||!['white','rgb(255, 255, 255)'].includes(s.fill))return false
   if(!cssPath(doc,hs.getPropertyValue('d').trim(),frame.headPath)||!['','luminance'].includes(view.getComputedStyle(mask).getPropertyValue('mask-type')))return false
   for(const[k,v]of canonical.css)if(body.style.getPropertyValue(k)!==''||bs.getPropertyValue(k)!==v)return false
   const box=body.getBBox();if(!(['x','y','width','height']as const).every(k=>Number.isFinite(box[k])&&box[k]===canonical.bounds[k]))return false
   return exact(visibility,committed)&&(p===0||prior())&&tree.every(n=>n.isConnected&&n.ownerDocument===doc&&n.parentNode===parents.get(n))
  }
  if(!stable('hidden',false))throw Error('Changed contact-head source, frame, prior or mask')
  for(const[k,v]of Object.entries({progress:p,phase:frame.phase,'head-progress':frame.headProgress,'body-progress':frame.bodyProgress,'direct-original':frame.originalPDirect,'source-full':frame.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))ink.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed contact-head previsibility binding')
  ink.setAttribute(PREFIX+'committed','true');ink.setAttribute('visibility',frame.visible?'visible':'hidden')
  if(!stable(frame.visible?'visible':'hidden',true))throw Error('Changed contact-head visible binding')
  return{status:p===0?'empty'as const:p===1?'complete'as const:'visible'as const,error:null,frame,cleanup:reset}
 }catch(error){reset();return{status:'hidden'as const,error:error instanceof Error?error.message:'Invalid contact-head DOM',frame:null,cleanup:reset}}
}
export const REVIEWED_U51DE_BASE_CONTACT_HEAD_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity,strokes:STROKES})
export const REVIEWED_U51DE_BASE_CONTACT_HEAD_INPUT_SHA256=Object.freeze({'lib/hanja-stroke-source-reveal-u51de-base.ts':'c7c5185d1b26e4e8c578d9dcb06f142e016c53245c6d3c636ca9db925eb04633','docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json':'623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255','docs/hanja-source-original-u51de-base-2026-10-27/contact-head-prefix-3-10.json':'39ecc8281667bbdd06bc84d70a3c356f8f386d6275a11d4611dd160ce1dbb467','docs/hanja-source-original-u51de-base-2026-10-27/contact-head-prefix-6.json':'a8668e022abea8a937dc7b98b9567a4b16c1404978bbcb64b56f8b7c81430c67'})
export const REVIEWED_U51DE_BASE_CONTACT_HEAD=freeze({targets:POLICIES.map(p=>({pen:p.pen,mask:p.mask,id:p.id,kind:p.kind,headPhase:p.headPhase})),sourcePreserved:true,newAuthoredClock:true,nativeApproval:false,runtimeApplied:false})
