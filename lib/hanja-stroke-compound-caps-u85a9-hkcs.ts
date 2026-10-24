import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU85a9HkcsContext as exactContext,makeReviewedU85a9HkcsSourceContext as exactSourceContext} from './hanja-stroke-start-caps-u85a9-hkcs.ts'
import type {ReviewedU85a9HkcsContext} from './hanja-stroke-start-caps-u85a9-hkcs.ts'
export type ReviewedU85a9HkcsCompoundContext=ReviewedU85a9HkcsContext
export type ReviewedU85a9HkcsCompoundGrowingCertificate=Readonly<{syntax:'MQ'|'MC';initialKind:'single-quadratic'|'single-cubic';T:string;K:string;firstLegLength:string|null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU85a9HkcsCompoundPolicy=Readonly<{id:string;kind:'growing-u85a9-hkcs-compound-caps';segment:HanjaOutlineSegment;previousSegment:HanjaOutlineSegment;requiresCompletedExactPreviousMask:true;certificate:ReviewedU85a9HkcsCompoundGrowingCertificate}>
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
function ensure(value:unknown,message:string):asserts value{if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
const SEGMENTS=deepFreeze([{"outline":"M35.95 31.95 L35.15 33.65 L34.25 35.4 L33.25 37.15 L32.15 38.95 L31 40.75 L29.7 42.6 L28.3 44.45 L26.8 46.3 L25.1 48.15 L23.4 50.05 L22.65 49.55 L23.75 47.25 L24.7 45 L25.65 42.85 L26.55 40.8 L27.4 38.85 L28.15 36.9 L28.8 35.1 L29.4 33.3 L29.9 31.6 L30.3 30 Z M30.15 29.95 L33.15 27.45 L38.65 31.95 L36.15 33.45 L30.15 35.95 Z","bounds":[22.65,27.45,38.65,50.05],"direction":"curve","weight":21.388343,"revealPath":"M33.16 30.990000000000002 Q30.325 39.2325 23.035 49.83","revealWidth":14},{"outline":"M45.6 65.5 L45.35 69.2 L44.95 72.75 L44.35 76.05 L43.6 79.1 L42.7 82 L41.6 84.65 L40.3 87.05 L38.8 89.2 L37.1 91 L35.2 92.5 L34.55 91.9 L35.6 89.9 L36.5 87.8 L37.3 85.6 L38.05 83.3 L38.6 80.8 L39.05 78.15 L39.4 75.3 L39.6 72.25 L39.65 68.95 L39.6 65.5 Z","bounds":[34.55,65.5,45.6,92.5],"direction":"curve","weight":27.778519,"revealPath":"M42.6 65.53 Q42.6 83.97749999999999 34.9 92.22","revealWidth":14}]) as unknown as readonly HanjaOutlineSegment[]
const PREVIOUS=deepFreeze([{"outline":"M15.3 29.95 L33.15 29.95 L33.15 31.95 L15.3 31.95 Z","bounds":[15.3,29.95,33.15,31.95],"direction":"right","weight":17.82},{"outline":"M45.6 52.75 L45.6 65.5 L39.6 65.5 L39.6 49.75 Z M39.6 65.5 L45.6 65.5 L44.4 67.3 L42.6 68.5 L40.8 67.3 Z","bounds":[39.6,49.75,45.6,68.5],"direction":"down","weight":11.775}]) as unknown as readonly HanjaOutlineSegment[]
const CERTIFICATES=deepFreeze([{"pen":5,"mask":2,"guide":"M33.16 30.990000000000002 Q30.325 39.2325 23.035 49.83","syntax":"MQ","width":14,"radius":7,"weight":21.388343,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"b1fd98125f6fc7d32c30c3b2ed99be16eae12e6613495f4587d89dc7fed5d98d","initialKind":"single-quadratic","T":"1/2","K":"1/20","u":["-567/200","4121249999999999/500000000000000"],"v":["-891/200","1177500000000001/500000000000000"],"lambdaAt":"0","cross":"1502195624999999271/50000000000000000","chordSquaredMinusRadiusSquared":"178334412499999894025000000000009/4000000000000000000000000000000","curvatureMargin":"5442142697526351213003179089589124630851522203090509483117187760798442187499975272500000000001/1562500000000000000000000000000000000000000000000000000000000000000000000000000000000000000","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","lambda":"18994007812499991757500000000001/250000000000000000000000000000"},{"pen":13,"mask":2,"guide":"M42.6 65.53 Q42.6 83.97749999999999 34.9 92.22","syntax":"MQ","width":14,"radius":7,"weight":27.778519,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"f0f21fc5fdd1b01072c01c34c7af680af855581f47700eebe42e1fcd2f1e7fbc","initialKind":"single-quadratic","T":"1/2","K":"1/20","u":["0","1844749999999999/100000000000000"],"v":["-77/10","-510249999999999/50000000000000"],"lambdaAt":"1/2","cross":"142045749999999923/1000000000000000","chordSquaredMinusRadiusSquared":"8295855562499993641500000000001/40000000000000000000000000000","curvatureMargin":"51614752064872221903326749999994071/1000000000000000000000000000000","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"y","lambda":"7716461/40000"}])
const POLICIES:readonly ReviewedU85a9HkcsCompoundPolicy[]=Object.freeze(CERTIFICATES.map((c,i)=>Object.freeze({id:'u85a9-hkcs-'+c.pen+'-'+c.mask,kind:'growing-u85a9-hkcs-compound-caps' as const,segment:SEGMENTS[i],previousSegment:PREVIOUS[i],requiresCompletedExactPreviousMask:true as const,certificate:deepFreeze({syntax:'MQ' as const,initialKind:'single-quadratic' as const,T:c.T,K:c.K,firstLegLength:null,initialArcMax:7 as const,storedBounds:c,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
const ADMITTED=new WeakSet<object>()
export function reviewedU85a9HkcsCompoundContext(strokes:HanjaOutlineStrokes):ReviewedU85a9HkcsCompoundContext|null{const c=exactContext(strokes);if(c)ADMITTED.add(c);return c}
export function makeReviewedU85a9HkcsCompoundSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU85a9HkcsCompoundContext|null{const c=exactSourceContext(proof,identity,strokes);if(c)ADMITTED.add(c);return c}
export function reviewedU85a9HkcsCompoundPolicy(context:ReviewedU85a9HkcsCompoundContext|null,pen:number,mask:number):ReviewedU85a9HkcsCompoundPolicy|null{if(!context||!ADMITTED.has(context))return null;return POLICIES.find(p=>p.id==='u85a9-hkcs-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU85a9HkcsCompoundPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 薩 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 薩 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&((syntax==='MQ'&&policy.certificate.initialKind==='single-quadratic')||(syntax==='MC'&&policy.certificate.initialKind==='single-cubic')),'Exact original 薩 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);const first=policy.certificate.firstLegLength?.split('/').map(Number);return{q0,r:7,minimumLength:first?first[0]/(first[1]??1):7}}
export type ReviewedU85a9HkcsCompoundFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU85a9HkcsCompoundNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u85a9HkcsCompoundCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 薩 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 薩 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 薩 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 薩 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 薩 SVG coordinate tree')
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

export function reviewedU85a9HkcsCompoundPreviousComplete(policy:ReviewedU85a9HkcsCompoundPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean {
 try {
  if(!POLICIES.includes(policy)||previousMaskProgress!==1||!g?.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id)return false
  const expected=policy.previousSegment,previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!previous||!owner||!view||previous.parentElement!==g.parentElement||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
  const paths=previous.localName==='path'?[previous]:Array.from(previous.children).filter(n=>n.localName==='path')
  if(paths.length!==1)return false
  const p=paths[0]
  if(!p.isConnected||p.ownerDocument!==doc||(p as SVGElement).ownerSVGElement!==owner||p.getAttribute('d')!==expected.outline||p.getAttribute('pathLength')!==null)return false
  if(previous.localName!=='path'&&previous.getAttribute('data-stroke-reveal-progress')!=='1')return false
  if(!u85a9HkcsCompoundCoordinateBinding([previous as SVGElement,p as SVGElement],owner)())return false
  return [previous,p].every(n=>{const s=view.getComputedStyle(n);return ['transform','filter','mask','clip-path'].every(k=>n.getAttribute(k)===null)&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&s.opacity==='1'&&s.fillOpacity==='1'&&s.stroke==='none'&&s.fill!=='none'&&s.fill!=='transparent'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))})
 } catch {return false}
}
export function measureReviewedU85a9HkcsCompoundFrame(policy:ReviewedU85a9HkcsCompoundPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null,previousMaskProgress:number):ReviewedU85a9HkcsCompoundFrame {
  ensure(previousMaskProgress===1,'Exact completed previous 薩 H/V mask required')
  const fixed=source(policy,segment)
  const previousDOM=()=>reviewedU85a9HkcsCompoundPreviousComplete(policy,guide?.parentElement?.parentElement as SVGGElement|null,previousMaskProgress)
  ensure(previousDOM(),'Exact actual previous 薩 H/V source P required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 薩 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 薩 measurement parent required')
  const coordinates=u85a9HkcsCompoundCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u85a9-hkcs-compound-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u85a9-hkcs-compound-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact()||!previousDOM())throw new Error('Exact connected 薩 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact()||!previousDOM())throw new Error('Invalid 薩 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact()||!previousDOM())throw new Error('Changed 薩 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('薩 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u85a9-hkcs-compound-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU85a9HkcsCompoundCaps(policy:ReviewedU85a9HkcsCompoundPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU85a9HkcsCompoundNodes,previousMaskProgress:number) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    ensure(previousMaskProgress===1,'Exact completed previous 薩 H/V mask required')
    source(policy,segment);ensure(policy.kind==='growing-u85a9-hkcs-compound-caps','private 薩 two exact original compound guides only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 薩 frame/id')
    const previousDOM=()=>reviewedU85a9HkcsCompoundPreviousComplete(policy,measurement?.parentElement?.parentElement as SVGGElement|null,previousMaskProgress)
    ensure(progress===0||previousDOM(),'Exact actual previous 薩 H/V source P required')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 薩 SVG binding tree')
    const coordinates=u85a9HkcsCompoundCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u85a9-hkcs-compound-progress')===String(progress)&&target.getAttribute('data-u85a9-hkcs-compound-clip')===clipId&&mask.getAttribute('id')===clipId+'-u85a9-hkcs-compound-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u85a9-hkcs-compound-measure'&&guide.getAttribute('id')===clipId+'-u85a9-hkcs-compound-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u85a9-hkcs-compound-growing)'
    if(!bound()||!previousDOM())throw new Error('Mismatched 薩 SVG binding')
    const frame=measureReviewedU85a9HkcsCompoundFrame(policy,segment,progress,measurement,previousMaskProgress);ensure(frame.rho!==null,'growing frame radius')
    if(!bound()||!previousDOM())throw new Error('薩 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound()||!previousDOM())throw new Error('薩 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    if(!bound()||!previousDOM())throw new Error('薩 previous P changed after visibility commit')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U85A9_HKCS_COMPOUND_SOURCE=deepFreeze({"root":"hkcs_m85a9","localArtifactTag":"u85a9-hkcs","sourceCacheFile":"docs/hanja-source-original-u85a9-hkcs-2026-10-24/fixtures.json","sourceCacheSHA256":"05d7a137e69d5de696a195411e990f7ed8777e0c124de2770e022f9093271b53","geometrySHA256":"9dd8e7687f6168de289d8431c60689b3d516a537b36b70587678952df31d0a40","sourceContextModule":"lib/hanja-stroke-start-caps-u85a9-hkcs.ts","sourceContextModuleSHA256":"1665b5770ad478b9656efc1162aaae60de016b00f0da71fa30716741b4edf79d","targets":[[5,2],[13,2]],"proofFile":"docs/hanja-source-original-u85a9-hkcs-2026-10-24/compound-5-13-initial-P-proof.json","proofSHA256":"08aee70116ff09032d0a96b16984d7194ad2f6b9ec88c40c6eaa124a1b4a1a2a","actualDOMPreviousCompleteRequired":true,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U85A9_HKCS_COMPOUND_PROOFS=CERTIFICATES
