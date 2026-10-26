/** 敝: seven source-bound point rectangles and one original-MLQ body/attached-P5 policy. No app/native approval. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u655d-2026-10-26/fixtures.json' with {type:'json'}
const FIXED=fixture['u655d'],STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u655d-source-window-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU655dSourceWindowContext=Readonly<{id:'u655d-original-11-source-windows'}>
const CONTEXT:ReviewedU655dSourceWindowContext=Object.freeze({id:'u655d-original-11-source-windows'})
export function makeReviewedU655dSourceWindowContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU655dSourceWindowContext|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU655dSourceWindowPolicy=Readonly<{
 id:string;kind:'source-point-window-u655d';pen:1|2|6|7|8|10|11;mask:1;segment:HanjaOutlineSegment;
 anchor:readonly[number,number];sourceBounds:readonly number[];anchorIsOriginalQ0:boolean;
 proofFamily:'strict-union-kernel-at-original-Q0'|'strict-head-union-kernel'|'source-specific-finite-rect';proofFingerprint:string
}>
const POLICIES:readonly ReviewedU655dSourceWindowPolicy[]=freeze([
 {id:'u655d-source-window-1-1',kind:'source-point-window-u655d',pen:1,mask:1,segment:STROKES[0][0],anchor:[21.96,15.12],sourceBounds:STROKES[0][0].bounds,anchorIsOriginalQ0:false,proofFamily:'strict-head-union-kernel',proofFingerprint:'83a64ead07189d9f3396bc4cc84a9f957ac22791027aee4e728cb1611c70b79c'},
 {id:'u655d-source-window-2-1',kind:'source-point-window-u655d',pen:2,mask:1,segment:STROKES[1][0],anchor:[42.56,16.95],sourceBounds:STROKES[1][0].bounds,anchorIsOriginalQ0:false,proofFamily:'strict-head-union-kernel',proofFingerprint:'83a64ead07189d9f3396bc4cc84a9f957ac22791027aee4e728cb1611c70b79c'},
 {id:'u655d-source-window-6-1',kind:'source-point-window-u655d',pen:6,mask:1,segment:STROKES[5][0],anchor:[24,49.5],sourceBounds:STROKES[5][0].bounds,anchorIsOriginalQ0:true,proofFamily:'strict-union-kernel-at-original-Q0',proofFingerprint:'7e1f34c33298e906859acb6fbc5be535c2801941fc04f0e3839c4be0e680070a'},
 {id:'u655d-source-window-7-1',kind:'source-point-window-u655d',pen:7,mask:1,segment:STROKES[6][0],anchor:[38.05,50.96],sourceBounds:STROKES[6][0].bounds,anchorIsOriginalQ0:false,proofFamily:'strict-head-union-kernel',proofFingerprint:'83a64ead07189d9f3396bc4cc84a9f957ac22791027aee4e728cb1611c70b79c'},
 {id:'u655d-source-window-8-1',kind:'source-point-window-u655d',pen:8,mask:1,segment:STROKES[7][0],anchor:[73.429,7.996],sourceBounds:STROKES[7][0].bounds,anchorIsOriginalQ0:false,proofFamily:'strict-head-union-kernel',proofFingerprint:'83a64ead07189d9f3396bc4cc84a9f957ac22791027aee4e728cb1611c70b79c'},
 {id:'u655d-source-window-10-1',kind:'source-point-window-u655d',pen:10,mask:1,segment:STROKES[9][0],anchor:[82.6,31.5],sourceBounds:STROKES[9][0].bounds,anchorIsOriginalQ0:true,proofFamily:'source-specific-finite-rect',proofFingerprint:'7e9f9069add5b79e6d9980561f34fb7945b03f7c311b85dadaf3afc74f662f71'},
 {id:'u655d-source-window-11-1',kind:'source-point-window-u655d',pen:11,mask:1,segment:STROKES[10][0],anchor:[61.86,36.95],sourceBounds:STROKES[10][0].bounds,anchorIsOriginalQ0:false,proofFamily:'source-specific-finite-rect',proofFingerprint:'4803887af31298dfc03f136ee7e4adc7b700ae0f35428e00dab638e6275d976a'}
] as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU655dSourceWindowPolicy(context:ReviewedU655dSourceWindowContext|null,pen:number,mask:number):ReviewedU655dSourceWindowPolicy|null{
 return context===CONTEXT&&mask===0?POLICIES.find(p=>p.pen===pen+1)??null:null
}
function source(policy:ReviewedU655dSourceWindowPolicy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 敝 policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU655dSourceWindowFrame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-point-window'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;anchorIsOriginalQ0:boolean;authorClock:'source-author-point-rectangle';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU655dSourceWindowFrame(policy:ReviewedU655dSourceWindowPolicy,segment:HanjaOutlineSegment,p:number):ReviewedU655dSourceWindowFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 敝 progress required')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax+(x0-ax)*p,y:ay+(y0-ay)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-point-window',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,anchorIsOriginalQ0:policy.anchorIsOriginalQ0,authorClock:'source-author-point-rectangle',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU655dSourceWindowNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
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
/** Sole first-mask target. Both targets are independent strokes; no prior-H completion is inferred. */
export function commitReviewedU655dSourceWindow(policy:ReviewedU655dSourceWindowPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU655dSourceWindowNodes){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU655dSourceWindowFrame(policy,segment,progress)
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-0'))throw Error('Exact 敝 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 敝 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u655d-source-window-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const expectedCSS=new Map<string,string>()
  for(const [k,v]of Object.entries(shape)){const probe=doc.createElementNS(NS,'rect');probe.style.setProperty(k,String(v)+'px');expectedCSS.set(k,probe.style.getPropertyValue(k))}
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 敝 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 敝 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&slot.children.length===1&&slot.children[0]===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===11&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
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
   const clipProbe=doc.createElementNS(NS,'path');clipProbe.style.setProperty('clip-path',p.getAttribute('clip-path')??'none')
   if(paint.clipPath!==clipProbe.style.getPropertyValue('clip-path'))return false
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 敝 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 敝 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 敝 visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,frame:f,cleanup:reset}
 }catch{reset();return {status:'hidden' as const,frame:null,cleanup:reset}}
}

const BODY_PREFIX='data-u655d-source-body-tail-'
const PARTS=Object.freeze(STROKES[3][1].outline.match(/M[^M]+/g)!.map(p=>p.trim()))
if(PARTS.length!==5)throw Error('Exact original five 敝 P required')
const TAIL_POINTS=Object.freeze([[44.5,89.5],[39.5,88],[39.5,86.5],[44.5,86.5]].map(p=>Object.freeze(p)))
export const REVIEWED_U655D_BODY_TAIL_CUT=45/52.071068
export type ReviewedU655dBodyTailPolicy=Readonly<{id:'u655d-source-body-tail-4-2';kind:'source-body-attached-tail-u655d';pen:4;mask:2;segment:HanjaOutlineSegment;priorSegment:HanjaOutlineSegment;sourceParts:readonly string[];anchor:readonly[number,number];tailAnchor:readonly[number,number];sourceBounds:readonly number[];cut:number;proofFingerprint:string}>
const BODY_POLICY:ReviewedU655dBodyTailPolicy=freeze({id:'u655d-source-body-tail-4-2',kind:'source-body-attached-tail-u655d',pen:4,mask:2,segment:STROKES[3][1],priorSegment:STROKES[3][0],sourceParts:PARTS,anchor:[49.5,39.5],tailAnchor:[44.5,88],sourceBounds:STROKES[3][1].bounds,cut:REVIEWED_U655D_BODY_TAIL_CUT,proofFingerprint:'a924973dbcc4e23bd33374f6d484256d749130a56ae1e5b956f560bb543c171f'})
export function reviewedU655dBodyTailPolicy(context:ReviewedU655dSourceWindowContext|null,pen:number,mask:number):ReviewedU655dBodyTailPolicy|null{return context===CONTEXT&&pen===3&&mask===1?BODY_POLICY:null}
function bodySource(policy:ReviewedU655dBodyTailPolicy,segment:HanjaOutlineSegment){if(policy!==BODY_POLICY||!same(segment,policy.segment))throw Error('Private 敝4 policy and unchanged original full MLQ P/width/weight required')}
function unit(p:number){if(!Number.isFinite(p)||p<0||p>1)throw Error('Unit source-author progress required')}
export function sampleReviewedU655dBodyTailFrame(policy:ReviewedU655dBodyTailPolicy,segment:HanjaOutlineSegment,p:number,priorProgress=0,priorOpaque=false,bodyP4Opaque=false){
 bodySource(policy,segment);unit(p);unit(priorProgress)
 if(typeof priorOpaque!=='boolean'||typeof bodyP4Opaque!=='boolean')throw Error('Actual DOM guard boolean required')
 if(p>0&&(priorProgress!==1||!priorOpaque))throw Error('Current opaque exact completed same-pen H required')
 const cut=policy.cut,bodyProgress=p>=cut?1:p/cut,tailProgress=p<=cut?0:p===1?1:(p-cut)/(1-cut)
 if(tailProgress>0&&!bodyP4Opaque)throw Error('Actual complete original P4 opaque same-owner/frame required')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const bodyRect=bodyProgress>0&&bodyProgress<1?Object.freeze({x:ax+(x0-ax)*bodyProgress,y:ay+(y0-ay)*bodyProgress,width:(x1-x0)*bodyProgress,height:(y1-y0)*bodyProgress}):null
 const tailPoints=tailProgress>0&&tailProgress<1?TAIL_POINTS.map(v=>[policy.tailAnchor[0]+tailProgress*(v[0]-policy.tailAnchor[0]),policy.tailAnchor[1]+tailProgress*(v[1]-policy.tailAnchor[1])].join(',')).join(' '):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':p<=cut?'body':'attached-tail',bodyProgress,tailProgress,bodyVisible:bodyProgress>0,tailVisible:tailProgress>0,bodyOriginalPDirect:bodyProgress===1,tailOriginalPDirect:tailProgress===1,fullOriginalPDirect:p===1,bodyRect,tailPoints,sourceParts:PARTS,sourceGuide:segment.revealPath!,sourceWidth:14 as const,sourceCalculatedWeight:segment.weight,cut,authorClock:'source-author-L-chord-weight-body-attached-tail' as const,originalClockEquivalent:false as const,sourceLQRestarted:false as const,bodyP1to4NotOnlyLShape:true as const,UARead:false as const})
}
export type ReviewedU655dBodyTailNodes={group:SVGGElement|null;bodyGroup:SVGGElement|null;bodyInkPaths:readonly(SVGPathElement|null)[];bodyRect:SVGRectElement|null;bodyClipPath:SVGClipPathElement|null;tailInk:SVGPathElement|null;tailPolygon:SVGPolygonElement|null;tailClipPath:SVGClipPathElement|null}
/** Every call reads the current source owner/frame. No boolean completion cache. */
export function verifyReviewedU655dBodyTailPriorDOM(policy:ReviewedU655dBodyTailPolicy,g:SVGGElement|null,p:number,priorProgress:number):boolean{
 try{
  bodySource(policy,policy.segment);unit(p);if(priorProgress!==1||!g)return false
  const slot=g.parentNode,outer=slot?.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!owner||!view||view.document!==doc)return false
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,H=pen.children[0]as SVGPathElement|undefined,id=g.getAttribute(BODY_PREFIX+'clip')
  if(!H||!id||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-3-1'))return false
  const exact=()=>g.parentNode===pen&&pen.children.length===2&&pen.children[0]===H&&pen.children[1]===g&&pen.getAttribute('data-outline-stroke')==='4'&&pen.parentNode===outlines&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===11&&outlines.children[3]===pen&&H.parentNode===pen&&H.localName==='path'&&H.getAttribute('d')===policy.priorSegment.outline&&['pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>H.getAttribute(k)===null)&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(BODY_PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(BODY_PREFIX+'prior-progress')==='1'
  if(!exact())return false
  return opaqueTree([g,H],pen,owner,doc,view,exact)&&opaqueSourcePath(H,policy.priorSegment.outline,doc,view)&&exact()
 }catch{return false}
}
function opaqueSourcePath(p:SVGPathElement,d:string,doc:Document,view:Window):boolean{
 const s=view.getComputedStyle(p)
 return p.getAttribute('d')===d&&['mask','clip-path','transform','filter','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>p.getAttribute(k)===null)&&s.visibility==='visible'&&s.stroke==='none'&&s.fillRule==='nonzero'&&Number(s.fillOpacity)===1&&Number(s.opacity)===1&&opaqueRGB(s.fill)&&cssSourcePath(doc,s.getPropertyValue('d').trim(),d)
}
function opaqueTree(extra:Element[],start:Element,owner:SVGSVGElement,doc:Document,view:Window,exact:()=>boolean):boolean{
 const tree=[...extra],seen=new Set<Element>();let n:Element|null=start
 while(n){if(seen.has(n))return false;seen.add(n);tree.push(n);if(n===owner)break;const a:ParentNode|null=n.parentNode;n=a&&a.nodeType===1?a as Element:null}
 if(n!==owner)return false
 const parents=new Map(tree.map(v=>[v,v.parentNode]))
 const valid=(v:Element)=>{const s=view.getComputedStyle(v);return v.isConnected&&v.ownerDocument===doc&&v.namespaceURI===NS&&(v===owner||(v as SVGElement).ownerSVGElement===owner)&&v.parentNode===parents.get(v)&&['mask','clip-path','transform','filter'].every(k=>v.getAttribute(k)===null)&&s.display!=='none'&&s.visibility==='visible'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.mixBlendMode==='normal'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))}
 return exact()&&tree.every(valid)&&doc.defaultView===view&&view.document===doc&&exact()&&tree.every(v=>v.isConnected&&v.parentNode===parents.get(v))
}
export function verifyReviewedU655dBodyTailBodyDOM(policy:ReviewedU655dBodyTailPolicy,nodes:ReviewedU655dBodyTailNodes,p:number,priorProgress:number):boolean{
 try{
  bodySource(policy,policy.segment);unit(p);if(p<=policy.cut||!verifyReviewedU655dBodyTailPriorDOM(policy,nodes.group,p,priorProgress))return false
  const {group:g,bodyGroup:b,bodyInkPaths:paths}=nodes;if(!g||!b||paths.length!==4||paths.some(v=>!v))return false
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView;if(!owner||!view)return false
  const exact=()=>b.parentNode===g&&g.children[1]===b&&b.children.length===4&&paths.every((v,i)=>b.children[i]===v&&v!.parentNode===b)&&g.getAttribute(BODY_PREFIX+'body-progress')==='1'
  return exact()&&opaqueTree([b,...paths as SVGPathElement[]],g,owner,doc,view,exact)&&paths.every((v,i)=>opaqueSourcePath(v!,policy.sourceParts[i],doc,view))&&verifyReviewedU655dBodyTailPriorDOM(policy,g,p,priorProgress)&&exact()
 }catch{return false}
}

export function commitReviewedU655dBodyTail(policy:ReviewedU655dBodyTailPolicy,segment:HanjaOutlineSegment,p:number,priorProgress:number,clipId:string,nodes:ReviewedU655dBodyTailNodes){
 const {group:g,bodyGroup:b,bodyInkPaths:paths,bodyRect:r,bodyClipPath:bc,tailInk:t,tailPolygon:poly,tailClipPath:tc}=nodes
 const reset=()=>{for(const ink of[...paths,t]){ink?.setAttribute('visibility','hidden');ink?.setAttribute(BODY_PREFIX+'committed','false')}}
 reset()
 try{
  bodySource(policy,segment);unit(p);unit(priorProgress)
  if(!g||!b||!r||!bc||!t||!poly||!tc||paths.length!==4||paths.some(v=>!v)||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-3-1'))throw Error('Exact 敝 body/tail nodes required')
  const bodyPaths=paths as SVGPathElement[],owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=bc.parentNode
  if(!owner||!view||view.document!==doc||!defs||defs.nodeType!==1||tc.parentNode!==defs)throw Error('Same 敝 clip owner required')
  const d=defs as SVGDefsElement,bodyKey=clipId+'-u655d-body-clip',tailKey=clipId+'-u655d-tail-clip'
  const priorOK=p===0?false:verifyReviewedU655dBodyTailPriorDOM(policy,g,p,priorProgress)
  const bodyFrame=sampleReviewedU655dBodyTailFrame(policy,segment,Math.min(p,policy.cut),priorProgress,priorOK,false)
  const shape=bodyFrame.bodyRect??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const[k,v]of Object.entries(shape)){r.setAttribute(k,String(v));r.style.setProperty(k,String(v)+'px')}
  if(bodyFrame.bodyOriginalPDirect)b.removeAttribute('clip-path');else b.setAttribute('clip-path','url(#'+bodyKey+')')
  g.setAttribute(BODY_PREFIX+'body-progress',String(bodyFrame.bodyProgress))
  const tree:Element[]=[g,d,bc,r,tc,poly,b,...bodyPaths,t],parents=new Map(tree.map(n=>[n,n.parentNode]))
  const styleShape=(node:Element,values:Record<string,string>)=>{const cs=view.getComputedStyle(node);return Object.entries(values).every(([k,v])=>{const probe=doc.createElementNS(NS,node.localName);(probe as SVGElement).style.setProperty(k,v);const expected=(probe as SVGElement).style.getPropertyValue(k);return expected!==''&&cs.getPropertyValue(k)===expected})}
  const bodyExact=()=>g.localName==='g'&&b.localName==='g'&&d.localName==='defs'&&bc.localName==='clipPath'&&tc.localName==='clipPath'&&r.localName==='rect'&&poly.localName==='polygon'&&t.localName==='path'&&g.children.length===3&&g.children[0]===d&&g.children[1]===b&&g.children[2]===t&&d.parentNode===g&&b.parentNode===g&&t.parentNode===g&&d.children.length===2&&d.children[0]===bc&&d.children[1]===tc&&bc.children.length===1&&bc.children[0]===r&&r.parentNode===bc&&tc.children.length===1&&tc.children[0]===poly&&poly.parentNode===tc&&b.children.length===4&&bodyPaths.every((ink,i)=>ink.localName==='path'&&b.children[i]===ink&&ink.parentNode===b&&ink.getAttribute('d')===policy.sourceParts[i])&&t.getAttribute('d')===policy.sourceParts[4]&&bc.getAttribute('id')===bodyKey&&tc.getAttribute('id')===tailKey&&bc.getAttribute('clipPathUnits')==='userSpaceOnUse'&&tc.getAttribute('clipPathUnits')==='userSpaceOnUse'&&b.getAttribute('clip-path')===(bodyFrame.bodyOriginalPDirect?null:'url(#'+bodyKey+')')&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))&&g.getAttribute(BODY_PREFIX+'body-progress')===String(bodyFrame.bodyProgress)&&g.getAttribute(BODY_PREFIX+'clip')===clipId
  const localSafe=()=>{
   if(!bodyExact())return false
   for(const n of tree){
    if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!==NS||(n as SVGElement).ownerSVGElement!==owner||n.parentNode!==parents.get(n)||['transform','mask','filter'].some(k=>n.getAttribute(k)!==null)||(n!==b&&n!==t&&n.getAttribute('clip-path')!==null))return false
    const cs=view.getComputedStyle(n)
    if(cs.display==='none'||Number(cs.opacity)!==1||Number(cs.fillOpacity)!==1||cs.transform!=='none'||cs.filter!=='none'||cs.mixBlendMode!=='normal'||!['','none'].includes(cs.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(cs.getPropertyValue(k))))return false
    if(n!==b&&n!==t&&cs.clipPath!=='none')return false
    if(n===b||n===t){const probe=doc.createElementNS(NS,'path');probe.style.setProperty('clip-path',n.getAttribute('clip-path')??'none');if(cs.clipPath!==probe.style.getPropertyValue('clip-path'))return false}
   }
   if(!styleShape(r,Object.fromEntries(Object.entries(shape).map(([k,v])=>[k,String(v)+'px']))))return false
   for(const ink of[...bodyPaths,t]){const cs=view.getComputedStyle(ink);if(cs.stroke!=='none'||!opaqueRGB(cs.fill)||cs.fillRule!=='nonzero'||['pathLength','stroke-dasharray','stroke-dashoffset','mask'].some(k=>ink.getAttribute(k)!==null)||!cssSourcePath(doc,cs.getPropertyValue('d').trim(),ink.getAttribute('d')!))return false}
   return bodyExact()&&(p===0||verifyReviewedU655dBodyTailPriorDOM(policy,g,p,priorProgress))
  }
  if(!localSafe())throw Error('Exact body paint and source rect required')
  for(const ink of bodyPaths)ink.setAttribute('visibility',bodyFrame.bodyVisible?'visible':'hidden')
  if(!localSafe()||bodyPaths.some(ink=>view.getComputedStyle(ink).visibility!==(bodyFrame.bodyVisible?'visible':'hidden')))throw Error('Body visibility changed')
  const bodyOK=p>policy.cut?verifyReviewedU655dBodyTailBodyDOM(policy,nodes,p,priorProgress):false
  const frame=sampleReviewedU655dBodyTailFrame(policy,segment,p,priorProgress,priorOK,bodyOK)
  const points=frame.tailPoints??'44.5,88 44.5,88 44.5,88 44.5,88';poly.setAttribute('points',points)
  if(frame.tailOriginalPDirect)t.removeAttribute('clip-path');else t.setAttribute('clip-path','url(#'+tailKey+')')
  const tailExact=()=>poly.getAttribute('points')===points&&t.getAttribute('clip-path')===(frame.tailOriginalPDirect?null:'url(#'+tailKey+')')
  if(!localSafe()||!tailExact()||(frame.tailVisible&&!verifyReviewedU655dBodyTailBodyDOM(policy,nodes,p,priorProgress)))throw Error('Current exact complete P4 required for attached P5')
  t.setAttribute('visibility',frame.tailVisible?'visible':'hidden')
  const final=()=>localSafe()&&tailExact()&&view.getComputedStyle(t).visibility===(frame.tailVisible?'visible':'hidden')&&bodyPaths.every(ink=>view.getComputedStyle(ink).visibility===(frame.bodyVisible?'visible':'hidden'))&&(!frame.tailVisible||verifyReviewedU655dBodyTailBodyDOM(policy,nodes,p,priorProgress))
  if(!final())throw Error('Paint changed during tail commit')
  for(const ink of[...bodyPaths,t])ink.setAttribute(BODY_PREFIX+'committed','true')
  if(!final())throw Error('Paint changed after commit')
  return{status:p===0?'empty' as const:p===1?'complete' as const:'visible' as const,frame,cleanup:reset}
 }catch(error){reset();return{status:'hidden' as const,error:error instanceof Error?error.message:String(error),cleanup:reset}}
}

export const REVIEWED_U655D_SOURCE_WINDOWS=freeze({glyph:'敝',root:'u655d',pens:11,masks:13,polygons:28,geometrySHA256:FIXED.geometrySHA256,pointPens:[1,2,6,7,8,10,11],bodyTailPen4Mask2:true,sourcePOrQOrWidth14OrCalculatedWeightChanged:false,originalClockEquivalent:false,appRendererConnected:false,nativeApproval:false,runtimeApplied:false,bodyCut:REVIEWED_U655D_BODY_TAIL_CUT,bodyCutSource:'first original L chord45 / unchanged mask weight52.071068; author clock only',singleRect47over53CounterexamplePreserved:true})
export const REVIEWED_U655D_SOURCE_WINDOW_INPUT_SHA256=Object.freeze({"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","docs/hanja-source-original-u655d-2026-10-26/fixtures.json":"a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6","docs/hanja-source-original-u655d-2026-10-26/source-projection.json":"25540ad408269f15b544896e28162e37ffd4232748198de95373c9a7abddfb9d","docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json":"564eccc7b899422d3cacee4a16aa8a51d2fb57532390d4e0e197b50814bb24ec","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396","docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json":"7e1f34c33298e906859acb6fbc5be535c2801941fc04f0e3839c4be0e680070a","docs/hanja-source-original-u655d-2026-10-26/verify-mask-union-start-kernels.py":"cbe9bde4ad8335a81529f1233306778e99ae5d444a32ece73533b9e68390ce6f","docs/hanja-source-original-u655d-2026-10-26/first-head-kernel-anchor-proof.json":"83a64ead07189d9f3396bc4cc84a9f957ac22791027aee4e728cb1611c70b79c","docs/hanja-source-original-u655d-2026-10-26/10-start-rect-conditions-proof.json":"7e9f9069add5b79e6d9980561f34fb7945b03f7c311b85dadaf3afc74f662f71","docs/hanja-source-original-u655d-2026-10-26/4-11-point-rect-conditions-proof.json":"4803887af31298dfc03f136ee7e4adc7b700ae0f35428e00dab638e6275d976a","docs/hanja-source-original-u655d-2026-10-26/4-body-attached-tail-conditions-proof.json":"a924973dbcc4e23bd33374f6d484256d749130a56ae1e5b956f560bb543c171f","docs/hanja-source-original-u655d-2026-10-26/4-11-start-contact-conditions-proof.json":"9662e370bef98d2b2100dad8001bee6d453413659210eaf92a36957f6086e407"})
export const REVIEWED_U655D_SOURCE_WINDOW_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity})
