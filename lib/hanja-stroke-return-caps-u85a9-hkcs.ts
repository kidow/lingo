import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU85a9HkcsContext as exactContext,makeReviewedU85a9HkcsSourceContext as exactSourceContext} from './hanja-stroke-start-caps-u85a9-hkcs.ts'
import type {ReviewedU85a9HkcsContext} from './hanja-stroke-start-caps-u85a9-hkcs.ts'
export type ReviewedU85a9HkcsReturnContext=ReviewedU85a9HkcsContext
export type ReviewedU85a9HkcsReturnGrowingCertificate=Readonly<{syntax:'MQ'|'MC';initialKind:'single-quadratic'|'single-cubic';T:string;K:string;firstLegLength:string|null;initialArcMax:1;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU85a9HkcsReturnPolicy=Readonly<{id:string;kind:'growing-u85a9-hkcs-return-caps';segment:HanjaOutlineSegment;previousSegment:HanjaOutlineSegment;requiresCompletedExactPreviousMask:true;certificate:ReviewedU85a9HkcsReturnGrowingCertificate}>
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
function ensure(value:unknown,message:string):asserts value{if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
const SEGMENTS=deepFreeze([{"outline":"M34.25 70.65 L33.95 71.85 L33.45 73.05 L32.85 74.15 L32.1 75.15 L31.2 76.05 L30.15 76.75 L29 77.3 L27.8 77.65 L26.6 77.85 L25.3 77.95 L25.3 71.95 L25.95 71.9 L26.45 71.8 L26.85 71.7 L27.15 71.55 L27.4 71.35 L27.6 71.15 L27.8 70.9 L28 70.55 L28.2 70.05 L28.35 69.4 Z M25.3 74.95 L21.3 73.45 L21.3 71.95 L25.3 71.95 Z","bounds":[21.3,69.4,34.25,77.95],"direction":"curve","weight":7.752775,"revealPath":"M31.335552615098322 70.05318640214702 Q30.325 74.95 25.325 74.95","revealWidth":14}]) as unknown as readonly HanjaOutlineSegment[]
const PREVIOUS=deepFreeze([{"outline":"M23.7 49.4 L25.95 51.05 L28 52.75 L29.8 54.65 L31.3 56.6 L32.55 58.75 L33.5 60.95 L34.2 63.3 L34.6 65.7 L34.75 68.15 L34.55 70.7 L28.1 69.35 L28.55 67.6 L28.8 65.85 L28.85 64.05 L28.7 62.25 L28.35 60.4 L27.75 58.45 L26.95 56.5 L25.9 54.45 L24.6 52.3 L23.05 50.1 Z M28.1 69.35 L34.55 70.7 L26.65 76.35 Z","bounds":[23.05,49.4,34.75,76.35],"direction":"curve","weight":22.223989,"revealPath":"M23.035 49.4375 Q33.565 59.25 31.335552615098322 70.05318640214702","revealWidth":14}]) as unknown as readonly HanjaOutlineSegment[]
const CERTIFICATES=deepFreeze([{"pen":6,"mask":2,"guide":"M31.335552615098322 70.05318640214702 Q30.325 74.95 25.325 74.95","syntax":"MQ","width":14,"radius":7,"weight":7.752775,"initialArcMax":1,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"c3a1463af09275386ef3e6f755b07554160d56a59b5c1371ada403dec8825843","initialKind":"single-quadratic","T":"1/4","K":"3/10","u":["-505276307549161/500000000000000","244840679892649/50000000000000"],"v":["-1994723692450839/500000000000000","-244840679892649/50000000000000"],"lambdaAt":"1/4","cross":"244840679892649/10000000000000","chordSquaredMinusRadiusSquared":"266184670764219457371967920677029/64000000000000000000000000000000","curvatureMargin":"2138331339022261944476909127243680037034563138015027857942685197627640670325564497311295620133421/1600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","cosLower":"191/200","cosMinusRK":"131/200","strictAxis":"x","lambda":"70079144613237198700973699716189/4000000000000000000000000000000","initialArcBoundRadius":1}])
const POLICIES:readonly ReviewedU85a9HkcsReturnPolicy[]=Object.freeze(CERTIFICATES.map((c,i)=>Object.freeze({id:'u85a9-hkcs-'+c.pen+'-'+c.mask,kind:'growing-u85a9-hkcs-return-caps' as const,segment:SEGMENTS[i],previousSegment:PREVIOUS[i],requiresCompletedExactPreviousMask:true as const,certificate:deepFreeze({syntax:'MQ' as const,initialKind:'single-quadratic' as const,T:c.T,K:c.K,firstLegLength:null,initialArcMax:1 as const,storedBounds:c,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
const ADMITTED=new WeakSet<object>()
export function reviewedU85a9HkcsReturnContext(strokes:HanjaOutlineStrokes):ReviewedU85a9HkcsReturnContext|null{const c=exactContext(strokes);if(c)ADMITTED.add(c);return c}
export function makeReviewedU85a9HkcsReturnSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU85a9HkcsReturnContext|null{const c=exactSourceContext(proof,identity,strokes);if(c)ADMITTED.add(c);return c}
export function reviewedU85a9HkcsReturnPolicy(context:ReviewedU85a9HkcsReturnContext|null,pen:number,mask:number):ReviewedU85a9HkcsReturnPolicy|null{if(!context||!ADMITTED.has(context))return null;return POLICIES.find(p=>p.id==='u85a9-hkcs-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU85a9HkcsReturnPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 薩 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 薩 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&((syntax==='MQ'&&policy.certificate.initialKind==='single-quadratic')||(syntax==='MC'&&policy.certificate.initialKind==='single-cubic')),'Exact original 薩 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);const first=policy.certificate.firstLegLength?.split('/').map(Number);return{q0,r:7,minimumLength:first?first[0]/(first[1]??1):7}}
export type ReviewedU85a9HkcsReturnFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU85a9HkcsReturnNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u85a9HkcsReturnCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
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

export function reviewedU85a9HkcsReturnPreviousComplete(policy:ReviewedU85a9HkcsReturnPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean {
 try {
  if(!POLICIES.includes(policy)||previousMaskProgress!==1||!g?.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id)return false
  const expected=policy.previousSegment,previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!previous||!owner||!view||previous.parentElement!==g.parentElement||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
  const paths=previous.localName==='path'?[previous]:Array.from(previous.children).filter(n=>n.localName==='path')
  if(paths.length!==1)return false
  const p=paths[0]
  if(!p.isConnected||p.ownerDocument!==doc||(p as SVGElement).ownerSVGElement!==owner||p.getAttribute('d')!==expected.outline||p.getAttribute('pathLength')!==null)return false
  if(previous.localName!=='path'&&previous.getAttribute('data-stroke-reveal-progress')!=='1')return false
  if(!u85a9HkcsReturnCoordinateBinding([previous as SVGElement,p as SVGElement],owner)())return false
  return [previous,p].every(n=>{const s=view.getComputedStyle(n);return ['transform','filter','mask','clip-path'].every(k=>n.getAttribute(k)===null)&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&s.opacity==='1'&&s.fillOpacity==='1'&&s.stroke==='none'&&s.fill!=='none'&&s.fill!=='transparent'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))})
 } catch {return false}
}
export function measureReviewedU85a9HkcsReturnFrame(policy:ReviewedU85a9HkcsReturnPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null,previousMaskProgress:number):ReviewedU85a9HkcsReturnFrame {
  ensure(previousMaskProgress===1,'Exact completed previous 薩 source-prefix mask required')
  const fixed=source(policy,segment)
  const previousDOM=()=>reviewedU85a9HkcsReturnPreviousComplete(policy,guide?.parentElement?.parentElement as SVGGElement|null,previousMaskProgress)
  ensure(previousDOM(),'Exact actual previous 薩 source-prefix direct P required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 薩 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 薩 measurement parent required')
  const coordinates=u85a9HkcsReturnCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u85a9-hkcs-return-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u85a9-hkcs-return-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact()||!previousDOM())throw new Error('Exact connected 薩 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact()||!previousDOM())throw new Error('Invalid 薩 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact()||!previousDOM())throw new Error('Changed 薩 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('薩 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u85a9-hkcs-return-caps'?Math.min(policy.certificate.initialArcMax,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU85a9HkcsReturnCaps(policy:ReviewedU85a9HkcsReturnPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU85a9HkcsReturnNodes,previousMaskProgress:number) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    ensure(previousMaskProgress===1,'Exact completed previous 薩 source-prefix mask required')
    source(policy,segment);ensure(policy.kind==='growing-u85a9-hkcs-return-caps','private 薩 one exact original return guide only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 薩 frame/id')
    const previousDOM=()=>reviewedU85a9HkcsReturnPreviousComplete(policy,measurement?.parentElement?.parentElement as SVGGElement|null,previousMaskProgress)
    ensure(progress===0||previousDOM(),'Exact actual previous 薩 source-prefix direct P required')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 薩 SVG binding tree')
    const coordinates=u85a9HkcsReturnCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u85a9-hkcs-return-progress')===String(progress)&&target.getAttribute('data-u85a9-hkcs-return-clip')===clipId&&mask.getAttribute('id')===clipId+'-u85a9-hkcs-return-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u85a9-hkcs-return-measure'&&guide.getAttribute('id')===clipId+'-u85a9-hkcs-return-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u85a9-hkcs-return-growing)'
    if(!bound()||!previousDOM())throw new Error('Mismatched 薩 SVG binding')
    const frame=measureReviewedU85a9HkcsReturnFrame(policy,segment,progress,measurement,previousMaskProgress);ensure(frame.rho!==null,'growing frame radius')
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
export const REVIEWED_U85A9_HKCS_RETURN_SOURCE=deepFreeze({"root":"hkcs_m85a9","localArtifactTag":"u85a9-hkcs","sourceCacheFile":"docs/hanja-source-original-u85a9-hkcs-2026-10-24/fixtures.json","sourceCacheSHA256":"05d7a137e69d5de696a195411e990f7ed8777e0c124de2770e022f9093271b53","geometrySHA256":"9dd8e7687f6168de289d8431c60689b3d516a537b36b70587678952df31d0a40","sourceContextModule":"lib/hanja-stroke-start-caps-u85a9-hkcs.ts","sourceContextModuleSHA256":"1665b5770ad478b9656efc1162aaae60de016b00f0da71fa30716741b4edf79d","targets":[[6,2]],"proofFile":"docs/hanja-source-original-u85a9-hkcs-2026-10-24/return-6m2-initial-P-proof.json","proofSHA256":"17d199dbd54f1a07d7789cc83a4173f9019eea272073d2352029aa47c67825ad","actualDOMPreviousCompleteRequired":true,"nativeApproval":false,"runtimeApplied":false,"previousSourcePrefixDirectPRequired":true})
export const REVIEWED_U85A9_HKCS_RETURN_PROOFS=CERTIFICATES
