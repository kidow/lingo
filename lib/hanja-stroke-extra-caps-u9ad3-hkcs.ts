import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU9ad3HkcsContext as exactContext,makeReviewedU9ad3HkcsSourceContext as exactSourceContext} from './hanja-stroke-start-caps-u9ad3-hkcs.ts'
import type {ReviewedU9ad3HkcsContext} from './hanja-stroke-start-caps-u9ad3-hkcs.ts'
export type ReviewedU9ad3HkcsExtraContext=ReviewedU9ad3HkcsContext
export type ReviewedU9ad3HkcsExtraGrowingCertificate=Readonly<{syntax:'MQ'|'MC';initialKind:'single-quadratic'|'single-cubic';T:string;K:string;firstLegLength:string|null;initialArcMax:1|7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU9ad3HkcsExtraPolicy=Readonly<{id:string;kind:'growing-u9ad3-hkcs-extra-caps';segment:HanjaOutlineSegment;previousSegment:HanjaOutlineSegment|null;previousCompletion:'independent'|'cardinal-direct-P'|'original-Q-tube';requiresCompletedExactPreviousMask:boolean;certificate:ReviewedU9ad3HkcsExtraGrowingCertificate}>
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
function ensure(value:unknown,message:string):asserts value{if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
const SEGMENTS=deepFreeze([{"outline":"M42.35 39.3 L41.9 40.05 L41.4 40.8 L40.9 41.55 L40.3 42.3 L39.7 43.05 L39.05 43.85 L38.35 44.65 L37.6 45.45 L36.8 46.25 L36.2 47.2 L35.4 46.75 L35.85 45.75 L36 44.65 L36.15 43.6 L36.3 42.6 L36.45 41.65 L36.55 40.75 L36.6 39.9 L36.65 39.1 L36.65 38.35 L36.6 37.65 Z M36.5 37.5 L39.5 35 L45 39.5 L42.5 41 L36.5 43.5 Z","bounds":[35.4,35,45,47.2],"direction":"curve","weight":9.264406,"revealPath":"M39.515 38.5 Q38.51 42 35.83 47","revealWidth":14},{"outline":"M36.8 86 L36.75 87.25 L36.5 88.5 L36.1 89.7 L35.5 90.85 L34.65 91.85 L33.65 92.65 L32.55 93.3 L31.3 93.7 L30.1 93.9 L28.8 94 L28.8 88 L29.4 87.95 L29.85 87.85 L30.15 87.75 L30.35 87.7 L30.4 87.6 L30.5 87.5 L30.6 87.35 L30.7 87.05 L30.75 86.6 L30.8 86 Z M28.8 91 L23.8 89.5 L23.8 88 L28.8 88 Z","bounds":[23.8,86,36.8,94],"direction":"curve","weight":7.071068,"revealPath":"M33.82 86 Q33.82 91 28.82 91","revealWidth":14},{"outline":"M88.6 74 L88.5 75.25 L88.3 76.5 L87.9 77.7 L87.25 78.85 L86.45 79.85 L85.45 80.65 L84.3 81.3 L83.1 81.7 L81.85 81.9 L80.6 82 L80.6 76 L81.2 75.95 L81.65 75.85 L81.95 75.75 L82.1 75.7 L82.2 75.6 L82.3 75.5 L82.35 75.35 L82.45 75.05 L82.55 74.6 L82.6 74 Z M80.6 79 L74.6 77.5 L74.6 76 L80.6 76 Z","bounds":[74.6,74,88.6,82],"direction":"curve","weight":7.071068,"revealPath":"M85.6 74 Q85.6 79 80.6 79","revealWidth":14},{"outline":"M37.45 86.95 L38.65 86.05 L39.85 85.15 L41.1 84.2 L42.4 83.2 L43.7 82.2 L45.05 81.15 L46.4 80.05 L47.85 78.95 L49.35 77.9 L50.75 76.7 L51.4 77.25 L50.35 78.8 L49.45 80.45 L48.5 81.95 L47.5 83.45 L46.5 84.85 L45.5 86.2 L44.55 87.55 L43.55 88.85 L42.55 90.1 L41.55 91.3 Z M41.55 91.3 L36.7 87.65 L37.45 86.95 Z M41.55 91.3 L42.7 88.15 L43.3 91.7 Z","bounds":[36.7,76.7,51.4,91.7],"direction":"curve","weight":17.281046,"revealPath":"M39.16 89.5 Q44.965 84 51.0925 77","revealWidth":14},{"outline":"M51.05 75.2 L53.05 77.6 L55 79.65 L57.1 81.4 L59.4 82.75 L62.25 83.85 L65.8 84.7 L70.25 85.2 L75.75 85.4 L82.45 85.25 L90.5 84.7 L90.95 91.25 L82.6 91.5 L75.55 91.3 L69.6 90.7 L64.65 89.65 L60.6 88.2 L57.25 86.35 L54.65 84.05 L52.7 81.5 L51.3 78.7 L50.25 75.65 Z M90.95 91.25 L90.5 84.7 L96 84.3 Z","bounds":[50.25,75.2,96,91.5],"direction":"curve","weight":42.35679,"revealPath":"M50.447500000000005 75 C55.6075 85 61.09 90 90.75999999999999 88","revealWidth":14}]) as unknown as readonly HanjaOutlineSegment[]
const PREVIOUS=deepFreeze([{"outline":"M11 37.5 L39.5 37.5 L39.5 39.5 L11 39.5 Z","bounds":[11,37.5,39.5,39.5],"direction":"right","weight":28.475},{"outline":"M36.8 50 L36.8 86 L30.8 86 L30.8 50 Z M30.8 49 L33.8 46.5 L39.3 51 L36.8 53 L30.8 50 Z M30.8 86 L36.8 86 L35.6 87.8 L33.8 89 L32 87.8 Z","bounds":[30.8,46.5,39.3,89],"direction":"down","weight":36},{"outline":"M88.6 47 L88.6 74 L82.6 74 L82.6 47 Z M82.6 46 L85.6 43.5 L91.1 48 L88.6 50 L82.6 47 Z M82.6 74 L88.6 74 L87.35 75.8 L85.6 77 L83.8 75.8 Z","bounds":[82.6,43.5,91.1,77],"direction":"down","weight":27},null,{"outline":"M37.45 86.95 L38.65 86.05 L39.85 85.15 L41.1 84.2 L42.4 83.2 L43.7 82.2 L45.05 81.15 L46.4 80.05 L47.85 78.95 L49.35 77.9 L50.75 76.7 L51.4 77.25 L50.35 78.8 L49.45 80.45 L48.5 81.95 L47.5 83.45 L46.5 84.85 L45.5 86.2 L44.55 87.55 L43.55 88.85 L42.55 90.1 L41.55 91.3 Z M41.55 91.3 L36.7 87.65 L37.45 86.95 Z M41.55 91.3 L42.7 88.15 L43.3 91.7 Z","bounds":[36.7,76.7,51.4,91.7],"direction":"curve","weight":17.281046,"revealPath":"M39.16 89.5 Q44.965 84 51.0925 77","revealWidth":14}]) as unknown as readonly (HanjaOutlineSegment|null)[]
const CERTIFICATES=deepFreeze([{"pen":6,"mask":2,"guide":"M39.515 38.5 Q38.51 42 35.83 47","syntax":"MQ","width":14,"radius":7,"weight":9.264406,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"ff7b14bcbccac829c2551654cadd5e73d09b4a5373f2d429e1134a1c8ebb3184","initialKind":"single-quadratic","T":"1","K":"1/20","u":["-201/200","7/2"],"v":["-67/40","3/2"],"lambdaAt":"0","cross":"871/200","chordSquaredMinusRadiusSquared":"1473169/40000","curvatureMargin":"27832618438071201/6400000000000000","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","lambda":"530401/40000","previousCompletion":"cardinal-direct-P"},{"pen":8,"mask":3,"guide":"M33.82 86 Q33.82 91 28.82 91","syntax":"MQ","width":14,"radius":7,"weight":7.071068,"initialArcMax":1,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"4f5eca2df5fad1bb6ea0f386b172be29d182e876b58b62d9c1dd9f69c4e5c97d","initialKind":"single-quadratic","T":"1/4","K":"3/10","u":["0","5"],"v":["-5","-5"],"lambdaAt":"1/4","cross":"25","chordSquaredMinusRadiusSquared":"497/128","curvatureMargin":"383125/512","cosLower":"191/200","cosMinusRK":"131/200","strictAxis":"y","lambda":"125/8","previousCompletion":"cardinal-direct-P"},{"pen":17,"mask":3,"guide":"M85.6 74 Q85.6 79 80.6 79","syntax":"MQ","width":14,"radius":7,"weight":7.071068,"initialArcMax":1,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"525e1ea49a13c4fae675a6f572443af8031a20924bd9f480cf46227b4edd0f2e","initialKind":"single-quadratic","T":"1/4","K":"3/10","u":["0","5"],"v":["-5","-5"],"lambdaAt":"1/4","cross":"25","chordSquaredMinusRadiusSquared":"497/128","curvatureMargin":"383125/512","cosLower":"191/200","cosMinusRK":"131/200","strictAxis":"y","lambda":"125/8","previousCompletion":"cardinal-direct-P"},{"pen":23,"mask":1,"guide":"M39.16 89.5 Q44.965 84 51.0925 77","syntax":"MQ","width":14,"radius":7,"weight":17.281046,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"d5a8a27930d16ecefc6102d1a9db9c1e8e63f0552b51a2664f78777d5ec02f9c","initialKind":"single-quadratic","T":"1/2","K":"1/20","u":["1161/200","-11/2"],"v":["129/400","-3/2"],"lambdaAt":"0","cross":"-5547/800","chordSquaredMinusRadiusSquared":"51599889/2560000","curvatureMargin":"16428682292624940961/6400000000000000","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","lambda":"2557921/40000","previousCompletion":"independent"},{"pen":23,"mask":2,"guide":"M50.447500000000005 75 C55.6075 85 61.09 90 90.75999999999999 88","syntax":"MC","width":14,"radius":7,"weight":42.35679,"initialArcMax":7,"initialSufficientConditions":true,"notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"firstLegLength":null,"newSourceCondition":true,"maskSHA256":"4af5ca8ce3a3040640c4e04a46afb6aae467cce9d07f8103e1160d6457744f5d","initialKind":"single-cubic","T":"1/4","K":"1/10","u":["1031999999999999/200000000000000","10"],"v":["64500000000001/200000000000000","-5"],"w":["4772999999999997/200000000000000","-2"],"derivativeComponentLower":["1031999999999999/200000000000000","59/8"],"lambdaLower":"3240648999999997936000000000001/40000000000000000000000000000","crossBernstein":["-1161000000000001/40000000000000","-12029250000000001/200000000000000","-268319999999999969/3200000000000000"],"crossAbsoluteUpper":"268319999999999969/3200000000000000","chordSquaredMinusRadiusSquared":"1994936888999995703526000000001521/163840000000000000000000000000000","curvatureMargin":"126304946293923171385958508751325894108154634559674681760000202520114999999944272000000000009/6400000000000000000000000000000000000000000000000000000000000000000000000000000000000000","cosLower":"151/200","cosMinusRK":"11/200","strictAxis":"x","curvatureBound":"rprime=3q,rsecond=6(v+wt); kappaSquared <=4crossMaxSquared/(9lambdaLowerCubed)","previousCompletion":"original-Q-tube"}])
const POLICIES:readonly ReviewedU9ad3HkcsExtraPolicy[]=Object.freeze(CERTIFICATES.map((c,i)=>Object.freeze({id:'u9ad3-hkcs-extra-'+c.pen+'-'+c.mask,kind:'growing-u9ad3-hkcs-extra-caps' as const,segment:SEGMENTS[i],previousSegment:PREVIOUS[i],previousCompletion:c.previousCompletion as 'independent'|'cardinal-direct-P'|'original-Q-tube',requiresCompletedExactPreviousMask:c.previousCompletion!=='independent',certificate:deepFreeze({syntax:c.syntax as 'MQ'|'MC',initialKind:c.initialKind as 'single-quadratic'|'single-cubic',T:c.T,K:c.K,firstLegLength:null,initialArcMax:c.initialArcMax as 1|7,storedBounds:c,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
const ADMITTED=new WeakSet<object>()
export function reviewedU9ad3HkcsExtraContext(strokes:HanjaOutlineStrokes):ReviewedU9ad3HkcsExtraContext|null{const c=exactContext(strokes);if(c)ADMITTED.add(c);return c}
export function makeReviewedU9ad3HkcsExtraSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU9ad3HkcsExtraContext|null{const c=exactSourceContext(proof,identity,strokes);if(c)ADMITTED.add(c);return c}
export function reviewedU9ad3HkcsExtraPolicy(context:ReviewedU9ad3HkcsExtraContext|null,pen:number,mask:number):ReviewedU9ad3HkcsExtraPolicy|null{if(!context||!ADMITTED.has(context))return null;return POLICIES.find(p=>p.id==='u9ad3-hkcs-extra-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU9ad3HkcsExtraPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 髓 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 髓 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&((syntax==='MQ'&&policy.certificate.initialKind==='single-quadratic')||(syntax==='MC'&&policy.certificate.initialKind==='single-cubic')),'Exact original 髓 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);const first=policy.certificate.firstLegLength?.split('/').map(Number);return{q0,r:7,minimumLength:first?first[0]/(first[1]??1):7}}
export type ReviewedU9ad3HkcsExtraFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU9ad3HkcsExtraNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u9ad3HkcsExtraCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 髓 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 髓 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 髓 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 髓 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 髓 SVG coordinate tree')
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

export function reviewedU9ad3HkcsExtraPreviousComplete(policy:ReviewedU9ad3HkcsExtraPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean {
 try {
  if(!POLICIES.includes(policy)||!g?.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id)return false
  if(policy.previousCompletion==='independent')return policy.previousSegment===null
  if(previousMaskProgress!==1||!policy.previousSegment)return false
  const expected=policy.previousSegment,previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!previous||!owner||!view||previous.parentElement!==g.parentElement||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
  const paths=previous.localName==='path'?[previous]:Array.from(previous.children).filter(n=>n.localName==='path')
  const visible=paths.filter(n=>{const s=view.getComputedStyle(n);return s.visibility==='visible'&&s.display!=='none'&&s.opacity!=='0'})
  if(visible.length!==1)return false
  const p=visible[0]
  if(!p.isConnected||p.ownerDocument!==doc||(p as SVGElement).ownerSVGElement!==owner||p.getAttribute('d')!==expected.outline||p.getAttribute('pathLength')!==null)return false
  if(previous.localName!=='path'&&previous.getAttribute('data-stroke-reveal-progress')!=='1')return false
  const painted=()=>[previous,p].every(n=>{const s=view.getComputedStyle(n);return ['transform','filter','clip-path'].every(k=>n.getAttribute(k)===null)&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&s.visibility==='visible'&&s.display!=='none'&&s.opacity==='1'&&s.fillOpacity==='1'&&s.stroke==='none'&&s.fill!=='none'&&s.fill!=='transparent'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))})
  if(!painted())return false
  if(policy.previousCompletion==='cardinal-direct-P')return paths.length===1&&[previous,p].every(n=>n.getAttribute('mask')===null&&['','none'].includes(view.getComputedStyle(n).getPropertyValue('mask-image')))&&u9ad3HkcsExtraCoordinateBinding([previous as SVGElement,p as SVGElement],owner)()
  const clip=previous.getAttribute('data-u9ad3-hkcs-extra-clip')
  if(previous.localName!=='g'||previous.getAttribute('data-stroke-start-gate')!=='u9ad3-hkcs-extra-23-1'||previous.getAttribute('data-u9ad3-hkcs-extra-progress')!=='1'||!clip||!/^[A-Za-z0-9_:.-]+$/.test(clip)||previous.getAttribute('mask')!==null||p.getAttribute('mask')!=='url(#'+clip+')'||p.getAttribute('data-u9ad3-hkcs-extra-full-original-q-tube')!=='true'||p.getAttribute('data-u9ad3-hkcs-extra-full-committed')!=='true')return false
  const defs=Array.from(previous.children).filter(n=>n.localName==='defs');if(defs.length!==1)return false
  const masks=Array.from(defs[0].children).filter(n=>n.localName==='mask'&&n.getAttribute('id')===clip);if(masks.length!==1)return false
  const mask=masks[0],guide=mask.children[0]
  if(mask.children.length!==1||guide?.localName!=='path'||mask.getAttribute('maskUnits')!=='userSpaceOnUse'||mask.getAttribute('maskContentUnits')!=='userSpaceOnUse'||['x','y'].some(k=>mask.getAttribute(k)!=='0')||['width','height'].some(k=>mask.getAttribute(k)!=='100'))return false
  if(guide.getAttribute('d')!==expected.revealPath||guide.getAttribute('fill')!=='none'||guide.getAttribute('stroke')!=='white'||guide.getAttribute('stroke-width')!==String(expected.revealWidth)||guide.getAttribute('stroke-linecap')!=='round'||guide.getAttribute('stroke-linejoin')!=='miter'||guide.getAttribute('pathLength')!=='1'||guide.getAttribute('stroke-dasharray')!=='1 2'||guide.getAttribute('stroke-dashoffset')!=='0'||['mask','clip-path','transform','filter'].some(k=>guide.getAttribute(k)!==null))return false
  if(!u9ad3HkcsExtraCoordinateBinding([previous as SVGElement,p as SVGElement,defs[0] as SVGElement,mask as SVGElement,guide as SVGElement],owner)())return false
  const s=view.getComputedStyle(guide)
  return s.fill==='none'&&['white','rgb(255, 255, 255)'].includes(s.stroke)&&parseFloat(s.strokeWidth)===expected.revealWidth&&s.strokeLinecap==='round'&&s.strokeLinejoin==='miter'&&s.opacity==='1'&&s.strokeOpacity==='1'&&s.visibility==='visible'&&s.display!=='none'&&view.getComputedStyle(mask).opacity==='1'
 }catch{return false}
}

export function measureReviewedU9ad3HkcsExtraFrame(policy:ReviewedU9ad3HkcsExtraPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null,previousMaskProgress:number):ReviewedU9ad3HkcsExtraFrame {
  ensure(policy.previousCompletion==='independent'||previousMaskProgress===1,'Exact completed previous 髓 H/V mask required')
  const fixed=source(policy,segment)
  const previousDOM=()=>reviewedU9ad3HkcsExtraPreviousComplete(policy,guide?.parentElement?.parentElement as SVGGElement|null,previousMaskProgress)
  ensure(previousDOM(),'Exact actual previous 髓 H/V source P required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 髓 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 髓 measurement parent required')
  const coordinates=u9ad3HkcsExtraCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u9ad3-hkcs-extra-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u9ad3-hkcs-extra-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact()||!previousDOM())throw new Error('Exact connected 髓 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact()||!previousDOM())throw new Error('Invalid 髓 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact()||!previousDOM())throw new Error('Changed 髓 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('髓 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u9ad3-hkcs-extra-caps'?Math.min(policy.certificate.initialArcMax,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU9ad3HkcsExtraCaps(policy:ReviewedU9ad3HkcsExtraPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU9ad3HkcsExtraNodes,previousMaskProgress:number) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    ensure(policy.previousCompletion==='independent'||previousMaskProgress===1,'Exact completed previous 髓 H/V mask required')
    source(policy,segment);ensure(policy.kind==='growing-u9ad3-hkcs-extra-caps','private 髓 two exact original compound guides only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 髓 frame/id')
    const previousDOM=()=>reviewedU9ad3HkcsExtraPreviousComplete(policy,measurement?.parentElement?.parentElement as SVGGElement|null,previousMaskProgress)
    ensure(progress===0||previousDOM(),'Exact actual previous 髓 H/V source P required')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 髓 SVG binding tree')
    const coordinates=u9ad3HkcsExtraCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u9ad3-hkcs-extra-progress')===String(progress)&&target.getAttribute('data-u9ad3-hkcs-extra-clip')===clipId&&mask.getAttribute('id')===clipId+'-u9ad3-hkcs-extra-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u9ad3-hkcs-extra-measure'&&guide.getAttribute('id')===clipId+'-u9ad3-hkcs-extra-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u9ad3-hkcs-extra-growing)'
    if(!bound()||!previousDOM())throw new Error('Mismatched 髓 SVG binding')
    const frame=measureReviewedU9ad3HkcsExtraFrame(policy,segment,progress,measurement,previousMaskProgress);ensure(frame.rho!==null,'growing frame radius')
    if(!bound()||!previousDOM())throw new Error('髓 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound()||!previousDOM())throw new Error('髓 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    if(!bound()||!previousDOM())throw new Error('髓 previous P changed after visibility commit')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U9AD3_HKCS_EXTRA_SOURCE=deepFreeze({"root":"hkcs_m9ad3","localArtifactTag":"u9ad3-hkcs","sourceCacheFile":"docs/hanja-source-original-u9ad3-hkcs-2026-10-24/fixtures.json","sourceCacheSHA256":"7fdbb4c5403f12809c8f08161235f6a9e54b3c0ad3226ebb2667f3f79ee0773a","geometrySHA256":"e5abfd7fc4b7db418b2911a477bf0b800b6b0be6f45b2f21e422d7a0d7068899","sourceContextModule":"lib/hanja-stroke-start-caps-u9ad3-hkcs.ts","sourceContextModuleSHA256":"6883d6f77152e3d22529b80d300424ae52ad25bd9819220a29d66adf2e2a3584","targets":[[6,2],[8,3],[17,3],[23,1],[23,2]],"proofFile":"docs/hanja-source-original-u9ad3-hkcs-2026-10-24/initial-caps-extra-proof.json","proofSHA256":"d7df53395f86156f5fe4e9935687bebd30fb202c935c6cae9fcdd6f647814bc0","actualDOMPreviousCompletionRequired":true,"independent23m1PriorConnectionClaimed":false,"partialCapUsesCertificateInitialArcMax":true,"fullQTubePreviousContract":{"strokeLinecap":"round","strokeLinejoin":"miter","pathLength":"1","strokeDasharray":"1 2","strokeDashoffset":"0","strokeWidth":"14","maskContentUnits":"userSpaceOnUse"},"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U9AD3_HKCS_EXTRA_PROOFS=CERTIFICATES
