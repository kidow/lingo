/** 籧18: strict original-source authored-anchor rectangle. No native/app approval. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u7c67-2026-10-23/fixtures.json' with {type:'json'}
const FIXED=fixture['u7c67'],STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u7c67-source-window18-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU7c67SourceWindow18Context=Readonly<{id:'u7c67-original-23-source-window18'}>
const CONTEXT:ReviewedU7c67SourceWindow18Context=Object.freeze({id:'u7c67-original-23-source-window18'})
export function makeReviewedU7c67SourceWindow18Context(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU7c67SourceWindow18Context|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU7c67SourceWindow18Policy=Readonly<{
 id:string;kind:'source-point-window-u7c67-18';pen:18;mask:1;segment:HanjaOutlineSegment;
 anchor:readonly[number,number];sourceBounds:readonly number[];
 proofFamily:'strict-union-kernel-at-authored-anchor';proofFingerprint:string
}>
const POLICIES:readonly ReviewedU7c67SourceWindow18Policy[]=freeze([
 {id:'u7c67-source-window18-18-1',kind:'source-point-window-u7c67-18',pen:18,mask:1,segment:STROKES[17][0],anchor:[86.8,61],sourceBounds:STROKES[17][0].bounds,proofFamily:'strict-union-kernel-at-authored-anchor',proofFingerprint:'aad19a72e095c65b0f6ba787484579d8ea2de881a5a89acf951055dc3a9b97c7'}
] as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU7c67SourceWindow18Policy(context:ReviewedU7c67SourceWindow18Context|null,pen:number,mask:number):ReviewedU7c67SourceWindow18Policy|null{
 return context===CONTEXT&&mask===0?POLICIES.find(p=>p.pen===pen+1)??null:null
}
function source(policy:ReviewedU7c67SourceWindow18Policy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 籧18 policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU7c67SourceWindow18Frame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-authored-anchor-point-window'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;sourceCalculatedWeight:number;originalQ0:readonly[number,number];authorAnchorOffset:readonly[number,number];anchorIsOriginalQ0:false;authorClock:'source-author-kernel-window18';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU7c67SourceWindow18Frame(policy:ReviewedU7c67SourceWindow18Policy,segment:HanjaOutlineSegment,p:number):ReviewedU7c67SourceWindow18Frame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 籧18 progress required')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax+(x0-ax)*p,y:ay+(y0-ay)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-authored-anchor-point-window',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,sourceCalculatedWeight:segment.weight,originalQ0:Object.freeze([86.5,59.575] as const),authorAnchorOffset:Object.freeze([policy.anchor[0]-86.5,policy.anchor[1]-59.575] as const),anchorIsOriginalQ0:false,authorClock:'source-author-kernel-window18',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU7c67SourceWindow18Nodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
function opaqueRGB(value:string):boolean{
 const match=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!match)return false
 const slash=match[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/\s+/);let alpha:string|undefined=slash[1]?.trim()
 if(slash.length>2)return false
 if(alpha===undefined&&parts.length===4)alpha=parts.pop()
 return parts.length===3&&parts.every(v=>Number.isFinite(Number(v.replace('%',''))))&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)
}
function cssSourcePath(doc:Document,value:string,outline:string):boolean{
 if(value==='')return true
 const probe=doc.createElementNS(NS,'path');probe.style.setProperty('d','path('+JSON.stringify(outline)+')')
 const expected=probe.style.getPropertyValue('d')
 return expected!==''&&value===expected
}
/** Sole original18 first mask. No completion/contact with prior strokes is inferred. */
export function commitReviewedU7c67SourceWindow18(policy:ReviewedU7c67SourceWindow18Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU7c67SourceWindow18Nodes){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU7c67SourceWindow18Frame(policy,segment,progress)
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-0'))throw Error('Exact 籧18 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 籧18 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u7c67-source-window18-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const expectedCSS=new Map<string,string>()
  for(const [k,v]of Object.entries(shape)){const probe=doc.createElementNS(NS,'rect');probe.style.setProperty(k,String(v)+'px');expectedCSS.set(k,probe.style.getPropertyValue(k))}
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 籧18 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 籧18 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&slot.children.length===1&&slot.children[0]===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===23&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(!exact(visibility,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   for(const node of tree){
    if(!node.isConnected||node.ownerDocument!==doc||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.namespaceURI!==NS||node.parentNode!==parents.get(node)||['transform','filter','mask'].some(k=>node.getAttribute(k)!==null)||(node!==p&&node.getAttribute('clip-path')!==null))return false
    const s=view.getComputedStyle(node)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||(node!==p&&s.clipPath!=='none')||!['','none'].includes(s.getPropertyValue('mask-image'))||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
   }
   const rs=view.getComputedStyle(r)
   if([...expectedCSS].some(([k,v])=>v===''||rs.getPropertyValue(k)!==v))return false
   const paint=view.getComputedStyle(p)
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 籧18 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 籧18 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 籧18 visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,frame:f,cleanup:reset}
 }catch{reset();return {status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U7C67_SOURCE_WINDOW18=freeze({
 glyph:'籧',root:'u7c67',pens:23,masks:24,polygons:60,geometrySHA256:'71dd8ca53d86c8808365b831f3b65df0a6d6b50b22c7a6311ede12740518e287',
 targetPens:[18],sourceAnchorIsQ0:false,sourceQ0:[86.5,59.575],authorAnchor:[86.8,61],strictHeadBoxHalfWidth:'71/3400',
 sourcePOrQOrWidth14OrCalculatedWeightChanged:false,proofFamily:'strict original union kernel at authored anchor; one simple exterior27edge cycle',
 originalClockEquivalent:false,authorClock:'source-author-kernel-window18',appRendererConnected:false,nativeApproval:false,runtimeApplied:false,
 oldNative40Replayed:false,oldTerminal15Modified:false
})
export const REVIEWED_U7C67_SOURCE_WINDOW18_INPUT_SHA256=Object.freeze({
 'docs/hanja-source-original-u7c67-2026-10-23/fixtures.json':'ac326e4aa2bf4036cc23049bd84b02948e1e9b296ad4498f5fce9e55575e345d',
 'docs/hanja-source-initial-u7c67-18-2026-10-26/original-kernel-conditions.json':'aad19a72e095c65b0f6ba787484579d8ea2de881a5a89acf951055dc3a9b97c7',
 'docs/hanja-source-initial-u7c67-18-2026-10-26/verify-original-kernel-conditions.py':'11b6cff0c5dcbba7fd0415ed8ecf99c006616690e706142055151bd7c2748074'
})
/** The caller supplies actual complete strokes to the same strict three-argument gate. */
export const REVIEWED_U7C67_SOURCE_WINDOW18_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity})
