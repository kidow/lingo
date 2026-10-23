import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU852dKContext as baseContext,makeReviewedU852dKSourceContext as baseSourceContext} from './hanja-stroke-start-caps-u852d-k.ts'
const FIXED_SEGMENT:HanjaOutlineSegment={"outline":"M82.1 51.5 L67.9 63.7 L61.75 61.05 L73.6 51 Z M75.25 50 L78.25 47.5 L83.75 52 L81.25 53.5 L75.25 56 Z","bounds":[61.75,47.5,83.75,63.7],"direction":"curve","weight":17.591375,"revealPath":"M78.25 51.0075 L64.8375 62.39","revealWidth":14}
Object.freeze(FIXED_SEGMENT.bounds);Object.freeze(FIXED_SEGMENT)
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return baseContext(strokes)!==null}
export type ReviewedU852dKMLContext=Readonly<{id:'u852d-k-ml-one-initial-guide'}>
export type ReviewedU852dKMLGrowingCertificate=Readonly<{syntax:'ML';initialKind:'straight-first-leg';T:null;K:string;firstLegLength:null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU852dKMLPolicy=Readonly<{id:string;kind:'growing-u852d-k-caps';segment:HanjaOutlineSegment;certificate:ReviewedU852dKMLGrowingCertificate}>
const CONTEXT:ReviewedU852dKMLContext=Object.freeze({id:'u852d-k-ml-one-initial-guide'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=[{"pen":11,"mask":2,"id":"u852d-k-11-2","certificate":{"pen":11,"mask":2,"guide":"M78.25 51.0075 L64.8375 62.39","maskSHA256":"7b59115915cb4fb30755dafa197869dbd37d6cad1e692fef99cb91e1bf90606b","syntax":"ML","width":14,"radius":7,"weight":17.591375,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"initialKind":"straight-first-leg","T":null,"K":"0","firstLegLength":null,"firstLegSquared":"24756517/80000","firstLegSquaredMinus49":"20836517/80000","curvature":"0","arbitraryStraightDirectionAllowed":true,"originalGuidePreserved":true}}]
function ownCertificate(stored:typeof TARGETS[number]['certificate']):ReviewedU852dKMLGrowingCertificate{ensure(stored.initialSufficientConditions&&stored.syntax==='ML'&&stored.initialKind==='straight-first-leg','Original straight ML first-arc certificate');return deepFreeze({syntax:'ML' as const,initialKind:'straight-first-leg' as const,T:null,K:stored.K,firstLegLength:null,initialArcMax:7 as const,storedBounds:stored,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})}
const POLICIES:readonly ReviewedU852dKMLPolicy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u852d-k-caps' as const,segment:FIXED_SEGMENT,certificate:ownCertificate(t.certificate)})))
export function reviewedU852dKMLContext(strokes:HanjaOutlineStrokes):ReviewedU852dKMLContext|null{return sameWhole(strokes)?CONTEXT:null}
export function makeReviewedU852dKMLSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU852dKMLContext|null{return !!baseSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU852dKMLPolicy(context:ReviewedU852dKMLContext|null,pen:number,mask:number):ReviewedU852dKMLPolicy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u852d-k-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU852dKMLPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 蔭 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 蔭 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&(syntax==='ML'&&policy.certificate.initialKind==='straight-first-leg'),'Exact original 蔭 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU852dKMLFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU852dKMLNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u852dKCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 蔭 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 蔭 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 蔭 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 蔭 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 蔭 SVG coordinate tree')
  }
  return()=>{
    if(owner.ownerDocument!==document||document.defaultView!==view||view.document!==document)return false
    for(const[node,parent]of parents){
      if(!node.isConnected||node.ownerDocument!==document||node.parentElement!==parent||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.getAttribute('transform')!==null)return false
      const style=view.getComputedStyle(node)
      if(style.transform!=='none'||['translate','rotate','scale'].some(key=>{const value=style.getPropertyValue(key);return value!==''&&value!=='none'}))return false
    }
    return true
  }
}
export function measureReviewedU852dKMLFrame(policy:ReviewedU852dKMLPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU852dKMLFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 蔭 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 蔭 measurement parent required')
  const coordinates=u852dKCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u852d-k-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u852d-k-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 蔭 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 蔭 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 蔭 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('蔭 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u852d-k-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU852dKMLCaps(policy:ReviewedU852dKMLPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU852dKMLNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u852d-k-caps','private 蔭 eight exact original initial guides only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 蔭 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 蔭 SVG binding tree')
    const coordinates=u852dKCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u852d-k-progress')===String(progress)&&target.getAttribute('data-u852d-k-clip')===clipId&&mask.getAttribute('id')===clipId+'-u852d-k-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u852d-k-measure'&&guide.getAttribute('id')===clipId+'-u852d-k-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u852d-k-growing)'
    if(!bound())throw new Error('Mismatched 蔭 SVG binding')
    const frame=measureReviewedU852dKMLFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('蔭 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('蔭 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U852dKML_SOURCE=deepFreeze({"root":"u852d-k","geometrySHA256":"9f67b6ca577ac7e8fa3b9802de8c0718fad4b635e7eb47d50b0f9d9f211dee5e","counts":{"pens":15,"masks":19,"polygons":36,"targets":1},"sourceIdentity":{"sourceRoot":"u852d-k","sourceProofFile":"../hanja-goal-glyphwiki-batch803-2026-10-13/engine-whole-u852d-k.json","sourceProofFileSha256":"96ed622d7b6f588da0aa02b1c91278ab7d1208b13a79137b2bddc1c329a10b6e","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch803-2026-10-13/sources.json","sourceCapsuleFileSha256":"1c3fed99740de1f584182349d71702596bd0f530f223392935bbb45d7f2b16b0","sourceChecksFile":"../hanja-goal-glyphwiki-batch803-2026-10-13/metadata.json","sourceChecksFileSha256":"99e1cbc7cfef163ea3fa8a84cac612d8ecf51750cb15268660519e7669b90bbc"},"originalFull5SHA256":"96ed622d7b6f588da0aa02b1c91278ab7d1208b13a79137b2bddc1c329a10b6e","nativeApproval":false,"runtimeApplied":false,"scope":"Original11m2 ML only; base whole context is delegated unchanged."})
export const REVIEWED_U852dKML_PROOFS=deepFreeze([{"pen":11,"mask":2,"guide":"M78.25 51.0075 L64.8375 62.39","maskSHA256":"7b59115915cb4fb30755dafa197869dbd37d6cad1e692fef99cb91e1bf90606b","syntax":"ML","width":14,"radius":7,"weight":17.591375,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"initialKind":"straight-first-leg","T":null,"K":"0","firstLegLength":null,"firstLegSquared":"24756517/80000","firstLegSquaredMinus49":"20836517/80000","curvature":"0","arbitraryStraightDirectionAllowed":true,"originalGuidePreserved":true}])
export const REVIEWED_U852dKML_CONTACT=deepFreeze({"sameFramePriorCompleteRequired":true,"nativeRequired":true,"noWholePrefixIntersectionClaim":true})
export const REVIEWED_U852dKML_INPUT_SHA256=deepFreeze({"docs/hanja-source-original-u852d-k-2026-10-24/fixtures.json":"afea4717944cb28e6d04a47df4705a8c13cfd1235b6523a9a448ab643baf2dbf","lib/hanja-stroke-start-caps-u852d-k.ts":"1b7fa805ec3010bcc971259f25bb954907b12a7840a8022863f7d8701f16ec12"})
