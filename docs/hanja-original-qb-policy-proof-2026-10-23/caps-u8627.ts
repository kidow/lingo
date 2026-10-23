/** 蘧 original whole-bound initial masks. Provisional; native and full sweep pending. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline'
import fixture from '../hanja-source-original-u8627-vs2-2026-10-23/fixtures.json' with {type:'json'}
import initial from './initial-feasibility.json' with {type:'json'}
const FIXED_ENTRY=fixture['u8627-ue0102']
const FIXED_FULL5=FIXED_ENTRY.fullProof
const FIXED_IDENTITY=FIXED_ENTRY.identity
const FIXED_STROKES:HanjaOutlineStrokes=FIXED_ENTRY.strokes as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU8627Context=Readonly<{id:'u8627-original-21-initial-guides'}>
export type ReviewedU8627GrowingCertificate=Readonly<{syntax:'MQ'|'MLQ'|'MLQL'|'MLL'|'MQQ'|'MC';initialKind:'single-quadratic'|'straight-first-leg'|'single-cubic';T:string|null;K:string;firstLegLength:string|null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU8627Policy=Readonly<{id:string;kind:'growing-u8627-caps';segment:HanjaOutlineSegment;certificate:ReviewedU8627GrowingCertificate}>
const CONTEXT:ReviewedU8627Context=Object.freeze({id:'u8627-original-21-initial-guides'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=initial.bindings.filter(t=>t.root==='u8627-ue0102').map(t=>({id:'u8627-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,certificate:initial.uniqueCertificates[t.certificateSourceSHA256 as keyof typeof initial.uniqueCertificates]}))
function ownCertificate(stored:typeof TARGETS[number]['certificate']):ReviewedU8627GrowingCertificate{ensure(stored.initialSevenArcAvailable,'Own initial certificate required');const bounds=stored.certificate as Record<string,unknown>;return deepFreeze({syntax:stored.syntax as ReviewedU8627GrowingCertificate['syntax'],initialKind:stored.initialKind as ReviewedU8627GrowingCertificate['initialKind'],T:bounds.T as string|null,K:bounds.K as string,firstLegLength:(bounds.firstLineLength??null) as string|null,initialArcMax:7 as const,storedBounds:bounds,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})}
const POLICIES:readonly ReviewedU8627Policy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u8627-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:ownCertificate(t.certificate)})))
export function reviewedU8627Context(strokes:HanjaOutlineStrokes):ReviewedU8627Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU8627Policy(context:ReviewedU8627Context|null,pen:number,mask:number):ReviewedU8627Policy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u8627-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU8627Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'Private whole-bound policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'Original guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax,'Exact original grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU8627Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU8627Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u8627CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 蘧 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 蘧 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 蘧 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 蘧 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 蘧 SVG coordinate tree')
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
export function measureReviewedU8627Frame(policy:ReviewedU8627Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU8627Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 蘧 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 蘧 measurement parent required')
  const coordinates=u8627CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8627-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u8627-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 蘧 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 蘧 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 蘧 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('蘧 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u8627-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU8627Caps(policy:ReviewedU8627Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU8627Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u8627-caps','private 蘧 thirteen exact initial policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 蘧 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 蘧 SVG binding tree')
    const coordinates=u8627CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8627-progress')===String(progress)&&target.getAttribute('data-u8627-clip')===clipId&&mask.getAttribute('id')===clipId+'-u8627-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u8627-measure'&&guide.getAttribute('id')===clipId+'-u8627-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u8627-growing)'
    if(!bound())throw new Error('Mismatched 蘧 SVG binding')
    const frame=measureReviewedU8627Frame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('蘧 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('蘧 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U8627_SOURCE=Object.freeze({glyph:'蘧',root:'u8627-ue0102',logicalPens:21,nativeApproval:false,registered:false,scope:'initial only; later corners, contacts and full sweep pending'})
export const REVIEWED_U8627_PROOFS=deepFreeze(TARGETS.map(t=>t.certificate))
export const REVIEWED_U8627_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u8627-vs2-2026-10-23/fixtures.json":"25ee5175bb428fa2673b95b4aa2bf4ade6acc1ea49c9f52625865a5054fdd216","docs/hanja-original-qb-policy-proof-2026-10-23/initial-feasibility.json":"2eb16ad8f57414b059703c8345befb880866f3492da22c563482ab3000be55de"})

export function makeReviewedU8627SourceContext(proof:unknown,identity:unknown,outlines:HanjaOutlineStrokes):ReviewedU8627Context|null{return sameJSON(proof,FIXED_FULL5)&&sameJSON(identity,FIXED_IDENTITY)&&sameWhole(outlines)?CONTEXT:null}

