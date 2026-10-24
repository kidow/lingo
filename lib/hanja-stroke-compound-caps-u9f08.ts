import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU9f08Context as exactContext,makeReviewedU9f08SourceContext as exactSourceContext} from './hanja-stroke-start-caps-u9f08.ts'
import type {ReviewedU9f08Context} from './hanja-stroke-start-caps-u9f08.ts'
export type ReviewedU9f08CompoundContext=ReviewedU9f08Context
export type ReviewedU9f08CompoundGrowingCertificate=Readonly<{syntax:'MQ'|'MC';initialKind:'single-quadratic'|'single-cubic';T:string;K:string;firstLegLength:string|null;initialArcMax:1;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU9f08CompoundPolicy=Readonly<{id:string;kind:'growing-u9f08-compound-caps';segment:HanjaOutlineSegment;previousSegment:HanjaOutlineSegment;requiresCompletedExactPreviousMask:true;certificate:ReviewedU9f08CompoundGrowingCertificate}>
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
function ensure(value:unknown,message:string):asserts value{if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
const SEGMENTS=deepFreeze([{"outline":"M51 35 L50.9 36.25 L50.7 37.5 L50.3 38.7 L49.65 39.85 L48.85 40.85 L47.85 41.65 L46.7 42.3 L45.5 42.7 L44.25 42.9 L43 43 L43 37 L43.6 36.95 L44.05 36.85 L44.35 36.75 L44.5 36.7 L44.6 36.6 L44.7 36.5 L44.75 36.35 L44.85 36.05 L44.95 35.6 L45 35 Z M43 40 L38 38.5 L38 37 L43 37 Z","bounds":[38,35,51,43],"direction":"curve","weight":7.071068,"revealPath":"M48 35 Q48 40 43 40","revealWidth":14},{"outline":"M46.05 84.45 L46.05 85.05 L46.05 85.55 L46.1 85.85 L46.2 86.1 L46.25 86.25 L46.35 86.4 L46.55 86.55 L46.9 86.7 L47.4 86.85 L48.05 86.95 L48.05 91.95 L46.8 91.9 L45.6 91.75 L44.45 91.4 L43.35 90.9 L42.35 90.15 L41.55 89.2 L40.9 88.1 L40.45 86.95 L40.15 85.7 L40.05 84.45 Z M48.05 86.95 L49.8 87.7 L50.55 89.45 L49.8 91.2 L48.05 91.95 Z","bounds":[40.05,84.45,50.55,91.95],"direction":"curve","weight":7.071068,"revealPath":"M43.08 84.4625 Q43.08 89.4625 48.08 89.4625","revealWidth":14}]) as unknown as readonly HanjaOutlineSegment[]
const PREVIOUS=deepFreeze([{"outline":"M51 19.5 L51 35 L45 35 L45 19.5 Z M45 18.5 L48 16 L53.5 20.5 L51 22.5 L45 19.5 Z M45 35 L51 35 L49.8 36.8 L48 38 L46.2 36.8 Z","bounds":[45,16,53.5,38],"direction":"down","weight":15.5},{"outline":"M46.05 44.15 L46.05 84.45 L40.05 84.45 L40.05 44.15 Z M40.05 84.45 L46.05 84.45 L44.85 86.25 L43.05 87.45 L41.25 86.25 Z","bounds":[40.05,44.15,46.05,87.45],"direction":"down","weight":39.275}]) as unknown as readonly HanjaOutlineSegment[]
const CERTIFICATES=deepFreeze([{"pen":4,"mask":3,"guide":"M48 35 Q48 40 43 40","segmentSHA256":"4d120f037b518ee250a3eb06463c14b8866c704f45ea2df599b2b99832e9ba61","previousSegmentSHA256":"181dc55445de56cdd8ee6ed7ecc653f0dab2ce9c3e71ff8011dc78415fa63980","u":["0","5"],"v":["-5","-5"],"T":"1/2","K":"3/10","initialArcMax":1,"radius":1,"runtimeMaxCapRadius":7,"lambda":"25/2","lambdaAt":"1/2","cross":"25","chordSquaredMinus1":"117/8","curvatureMargin":"625/8","cosLower":"191/200","cosMinusRK":"131/200","strictAxis":"y","derivativeEndpoints":["10","5"],"reusedExactDerivativeCondition":true,"reusedFrom":"lib/hanja-stroke-start-caps-u6f11.ts","xReflection":true,"fullPInUnionOfOriginalGuideEndpointRadius7Disks":true,"endpointDiskPieces":[{"polygon":1,"nearestEndpoint":"start","vertices":12,"maxSquaredDistance":"6989/200"},{"polygon":1,"nearestEndpoint":"end","vertices":12,"maxSquaredDistance":"6989/200"},{"polygon":2,"nearestEndpoint":"end","vertices":4,"maxSquaredDistance":"34"}],"exactOriginalPriorSharedVertices":[["51","35"],["45","35"]],"requiresCompletedExactPreviousMask":true,"arc1To7NativeRequired":true,"growingPIntersectionAllProgressProved":false,"nativeApproval":false},{"pen":17,"mask":2,"guide":"M43.08 84.4625 Q43.08 89.4625 48.08 89.4625","segmentSHA256":"bbdff2a93ec7990e2e5c06f910b64dc644b5d86d5e6e7cf779f3cf14c034c753","previousSegmentSHA256":"586896f64ed5e5eb941964d534d816e2921c0045e2c26581fd9b25298f20c6aa","u":["0","5"],"v":["5","-5"],"T":"1/2","K":"3/10","initialArcMax":1,"radius":1,"runtimeMaxCapRadius":7,"lambda":"25/2","lambdaAt":"1/2","cross":"-25","chordSquaredMinus1":"117/8","curvatureMargin":"625/8","cosLower":"191/200","cosMinusRK":"131/200","strictAxis":"y","derivativeEndpoints":["10","5"],"reusedExactDerivativeCondition":true,"reusedFrom":"lib/hanja-stroke-start-caps-u6f11.ts","xReflection":false,"fullPInUnionOfOriginalGuideEndpointRadius7Disks":true,"endpointDiskPieces":[{"polygon":1,"nearestEndpoint":"start","vertices":14,"maxSquaredDistance":"2024509/61250"},{"polygon":1,"nearestEndpoint":"end","vertices":12,"maxSquaredDistance":"2024509/61250"},{"polygon":2,"nearestEndpoint":"end","vertices":5,"maxSquaredDistance":"1010169/160000"}],"exactOriginalPriorSharedVertices":[["921/20","1689/20"],["801/20","1689/20"]],"requiresCompletedExactPreviousMask":true,"arc1To7NativeRequired":true,"growingPIntersectionAllProgressProved":false,"nativeApproval":false}])
const POLICIES:readonly ReviewedU9f08CompoundPolicy[]=Object.freeze(CERTIFICATES.map((c,i)=>Object.freeze({id:'u9f08-'+c.pen+'-'+c.mask,kind:'growing-u9f08-compound-caps' as const,segment:SEGMENTS[i],previousSegment:PREVIOUS[i],requiresCompletedExactPreviousMask:true as const,certificate:deepFreeze({syntax:'MQ' as const,initialKind:'single-quadratic' as const,T:c.T,K:c.K,firstLegLength:null,initialArcMax:1 as const,storedBounds:c,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
const ADMITTED=new WeakSet<object>()
export function reviewedU9f08CompoundContext(strokes:HanjaOutlineStrokes):ReviewedU9f08CompoundContext|null{const c=exactContext(strokes);if(c)ADMITTED.add(c);return c}
export function makeReviewedU9f08CompoundSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU9f08CompoundContext|null{const c=exactSourceContext(proof,identity,strokes);if(c)ADMITTED.add(c);return c}
export function reviewedU9f08CompoundPolicy(context:ReviewedU9f08CompoundContext|null,pen:number,mask:number):ReviewedU9f08CompoundPolicy|null{if(!context||!ADMITTED.has(context))return null;return POLICIES.find(p=>p.id==='u9f08-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU9f08CompoundPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 鼈 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 鼈 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&((syntax==='MQ'&&policy.certificate.initialKind==='single-quadratic')||(syntax==='MC'&&policy.certificate.initialKind==='single-cubic')),'Exact original 鼈 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);const first=policy.certificate.firstLegLength?.split('/').map(Number);return{q0,r:7,minimumLength:first?first[0]/(first[1]??1):7}}
export type ReviewedU9f08CompoundFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU9f08CompoundNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u9f08CompoundCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 鼈 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 鼈 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 鼈 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 鼈 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 鼈 SVG coordinate tree')
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
export function measureReviewedU9f08CompoundFrame(policy:ReviewedU9f08CompoundPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null,previousMaskProgress:number):ReviewedU9f08CompoundFrame {
  ensure(previousMaskProgress===1,'Exact completed previous 鼈 V mask required')
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 鼈 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 鼈 measurement parent required')
  const coordinates=u9f08CompoundCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u9f08-compound-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u9f08-compound-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 鼈 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 鼈 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 鼈 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('鼈 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u9f08-compound-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU9f08CompoundCaps(policy:ReviewedU9f08CompoundPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU9f08CompoundNodes,previousMaskProgress:number) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    ensure(previousMaskProgress===1,'Exact completed previous 鼈 V mask required')
    source(policy,segment);ensure(policy.kind==='growing-u9f08-compound-caps','private 鼈 two exact original compound guides only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 鼈 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 鼈 SVG binding tree')
    const coordinates=u9f08CompoundCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u9f08-compound-progress')===String(progress)&&target.getAttribute('data-u9f08-compound-clip')===clipId&&mask.getAttribute('id')===clipId+'-u9f08-compound-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u9f08-compound-measure'&&guide.getAttribute('id')===clipId+'-u9f08-compound-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u9f08-compound-growing)'
    if(!bound())throw new Error('Mismatched 鼈 SVG binding')
    const frame=measureReviewedU9f08CompoundFrame(policy,segment,progress,measurement,previousMaskProgress);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('鼈 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('鼈 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U9F08_COMPOUND_SOURCE=deepFreeze({"root":"u9f08","sourceCacheFile":"docs/hanja-source-original-u9f08-2026-10-24/fixtures.json","sourceCacheSHA256":"2429c5557e056c72da95208953c67ea71c9c011588c0b514f872bb48f9a26e05","geometrySHA256":"a00876552fed6d4f6d033055935cbf7d99724f779aa4ebf33c4d3f7264ff230a","sourceContextModule":"lib/hanja-stroke-start-caps-u9f08.ts","sourceContextModuleSHA256":"0e4c39c169279566ec3cb3d2c3dbdc214b924ee7a46de3d40781b30e4bc5453b","targets":[[4,3],[17,2]],"proofFile":"docs/hanja-source-original-u9f08-2026-10-24/compound-short-Q-proof.json","proofSHA256":"a39bc3531398f03305be57e2e13e193ea39e355414118a6487fe7041298f2aff","nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U9F08_COMPOUND_PROOFS=CERTIFICATES
