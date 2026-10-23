import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU6d8fContext as baseContext,makeReviewedU6d8fSourceContext as baseSourceContext} from './hanja-stroke-start-caps-u6d8f.ts'
const FIXED_SEGMENT:HanjaOutlineSegment={"outline":"M50.7 17 L38.1 49.75 L31.45 50.35 L44.8 16.5 Z M45 15.5 L48 13 L53.5 17.5 L51 19 L45 21.5 Z","bounds":[31.45,13,53.5,50.35],"direction":"curve","weight":30.092368,"revealPath":"M48.025 16.5 L37 44.5","revealWidth":14}
Object.freeze(FIXED_SEGMENT.bounds);Object.freeze(FIXED_SEGMENT)
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return baseContext(strokes)!==null}
export type ReviewedU6d8fMLContext=Readonly<{id:'u6d8f-ml-one-initial-guide'}>
export type ReviewedU6d8fMLGrowingCertificate=Readonly<{syntax:'ML';initialKind:'straight-first-leg';T:null;K:string;firstLegLength:null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU6d8fMLPolicy=Readonly<{id:string;kind:'growing-u6d8f-caps';segment:HanjaOutlineSegment;certificate:ReviewedU6d8fMLGrowingCertificate}>
const CONTEXT:ReviewedU6d8fMLContext=Object.freeze({id:'u6d8f-ml-one-initial-guide'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=[{"pen":8,"mask":2,"id":"u6d8f-8-2","certificate":{"pen":8,"mask":2,"guide":"M48.025 16.5 L37 44.5","maskSHA256":"3b4572a4de0b72cbda17c20253acaad4dd7c25e4afcf941cddfdf95312035b3a","syntax":"ML","width":14,"radius":7,"weight":30.092368,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"initialKind":"straight-first-leg","T":null,"K":"0","firstLegLength":null,"firstLegSquared":"1448881/1600","firstLegSquaredMinus49":"1370481/1600","curvature":"0","arbitraryStraightDirectionAllowed":true,"originalGuidePreserved":true,"terminalOriginalStopPoint":["629/20","1007/20"],"endpointDistanceSquared":"2601/40","fullRadius7TerminalCoverageProved":false}}]
function ownCertificate(stored:typeof TARGETS[number]['certificate']):ReviewedU6d8fMLGrowingCertificate{ensure(stored.initialSufficientConditions&&stored.syntax==='ML'&&stored.initialKind==='straight-first-leg','Original straight ML first-arc certificate');return deepFreeze({syntax:'ML' as const,initialKind:'straight-first-leg' as const,T:null,K:stored.K,firstLegLength:null,initialArcMax:7 as const,storedBounds:stored,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})}
const POLICIES:readonly ReviewedU6d8fMLPolicy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u6d8f-caps' as const,segment:FIXED_SEGMENT,certificate:ownCertificate(t.certificate)})))
export function reviewedU6d8fMLContext(strokes:HanjaOutlineStrokes):ReviewedU6d8fMLContext|null{return sameWhole(strokes)?CONTEXT:null}
export function makeReviewedU6d8fMLSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU6d8fMLContext|null{return !!baseSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU6d8fMLPolicy(context:ReviewedU6d8fMLContext|null,pen:number,mask:number):ReviewedU6d8fMLPolicy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u6d8f-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU6d8fMLPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 涏 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 涏 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&(syntax==='ML'&&policy.certificate.initialKind==='straight-first-leg'),'Exact original 涏 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU6d8fMLFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU6d8fMLNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u6d8fCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 涏 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 涏 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 涏 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 涏 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 涏 SVG coordinate tree')
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
export function measureReviewedU6d8fMLFrame(policy:ReviewedU6d8fMLPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU6d8fMLFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 涏 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 涏 measurement parent required')
  const coordinates=u6d8fCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6d8f-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u6d8f-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 涏 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 涏 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 涏 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('涏 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u6d8f-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU6d8fMLCaps(policy:ReviewedU6d8fMLPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU6d8fMLNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u6d8f-caps','private 涏 eight exact original initial guides only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 涏 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 涏 SVG binding tree')
    const coordinates=u6d8fCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6d8f-progress')===String(progress)&&target.getAttribute('data-u6d8f-clip')===clipId&&mask.getAttribute('id')===clipId+'-u6d8f-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u6d8f-measure'&&guide.getAttribute('id')===clipId+'-u6d8f-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u6d8f-growing)'
    if(!bound())throw new Error('Mismatched 涏 SVG binding')
    const frame=measureReviewedU6d8fMLFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('涏 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('涏 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U6d8fML_SOURCE=deepFreeze({"root":"u6d8f","geometrySHA256":"546f47697255ca1cda78deceea6804653ed627d10fb97faf580cedb5182c60b4","counts":{"pens":10,"masks":13,"polygons":23,"targets":1},"sourceIdentity":{"sourceRoot":"u6d8f","sourceProofFile":"../hanja-goal-glyphwiki-batch853-2026-10-13/engine-whole-u6d8f.json","sourceProofFileSha256":"a795484e0b8159d34d16c3ccb76f4d3e3dcd3c73647d52d0fe5e506bcba71879","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch853-2026-10-13/sources.json","sourceCapsuleFileSha256":"02ab5375b5b76c97e2571e87a57d9a613150807f19325d5381449c6178c3a8d5","sourceChecksFile":"../hanja-goal-glyphwiki-batch853-2026-10-13/metadata.json","sourceChecksFileSha256":"5708570958fd6b22bac317bef287f20f03a5c3223ad060612052c8c495732d59"},"originalFull5SHA256":"a795484e0b8159d34d16c3ccb76f4d3e3dcd3c73647d52d0fe5e506bcba71879","nativeApproval":false,"runtimeApplied":false,"scope":"Original8m2 diagonal ML initial arc7 only; endpoint stop-P coverage is unresolved separately.","terminalOriginalStopPoint":["629/20","1007/20"],"endpointDistanceSquared":"2601/40","fullRadius7TerminalCoverageProved":false})
export const REVIEWED_U6d8fML_PROOFS=deepFreeze([{"pen":8,"mask":2,"guide":"M48.025 16.5 L37 44.5","maskSHA256":"3b4572a4de0b72cbda17c20253acaad4dd7c25e4afcf941cddfdf95312035b3a","syntax":"ML","width":14,"radius":7,"weight":30.092368,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"initialKind":"straight-first-leg","T":null,"K":"0","firstLegLength":null,"firstLegSquared":"1448881/1600","firstLegSquaredMinus49":"1370481/1600","curvature":"0","arbitraryStraightDirectionAllowed":true,"originalGuidePreserved":true,"terminalOriginalStopPoint":["629/20","1007/20"],"endpointDistanceSquared":"2601/40","fullRadius7TerminalCoverageProved":false}])
export const REVIEWED_U6d8fML_CONTACT=deepFreeze({sameFramePriorCompleteRequired:true,nativeRequired:true,noWholePrefixIntersectionClaim:true,terminalCoverageUnresolved:true})
export const REVIEWED_U6d8fML_INPUT_SHA256=deepFreeze({"docs/hanja-source-original-u6d8f-2026-10-24/fixtures.json":"e2d0de3052cff4932964d8dbd12fb00115eb975de8a8b40b9252d1df553370c0","lib/hanja-stroke-start-caps-u6d8f.ts":"19a4fbedb2c1b302771566ac8c4989cb698df23696849e250f878b5895888f44"})
