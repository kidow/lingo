/** 藇 original whole-bound initial masks. Provisional; native and full sweep pending. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json' with {type:'json'}
const FIXED_ENTRY=fixture['hkcs_m85c7']
const FIXED_FULL5=FIXED_ENTRY.fullProof
const FIXED_IDENTITY=FIXED_ENTRY.identity
const FIXED_STROKES:HanjaOutlineStrokes=FIXED_ENTRY.strokes as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed();deepFreeze(FIXED_ENTRY)
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU85c7HkcsContext=Readonly<{id:'u85c7-hkcs-original-18-initial-guides'}>
export type ReviewedU85c7HkcsGrowingCertificate=Readonly<{syntax:'MQ'|'MLQ'|'MLQL'|'MLL'|'MQQ'|'MC';initialKind:'single-quadratic'|'straight-first-leg'|'single-cubic';T:string|null;K:string;firstLegLength:string|null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU85c7HkcsPolicy=Readonly<{id:string;kind:'growing-u85c7-hkcs-caps';segment:HanjaOutlineSegment;certificate:ReviewedU85c7HkcsGrowingCertificate}>
const CONTEXT:ReviewedU85c7HkcsContext=Object.freeze({id:'u85c7-hkcs-original-18-initial-guides'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=[{"id":"u85c7-hkcs-5-1","pen":5,"mask":1,"certificate":{"pen":5,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M35 28.0625 Q27 31.2825 18 34.1","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["-8","161/50"],"v":["-1","-161/400"],"lambdaAt":"0","lambda":"185921/2500","cross":"161/25","chordSquaredMinusRadiusSquared":"73710081/2560000","curvatureMargin":"6361857729984961/1562500000000","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"73710081/2560000","curvatureMargin":"6361857729984961/1562500000000","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":18.040272,"maskSHA256":"339dbf6062c80bff7f3aa8bd180bca686f61a21ed03238a4abde12f57c08eb55","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}}] as const
function ownCertificate(stored:typeof TARGETS[number]['certificate']):ReviewedU85c7HkcsGrowingCertificate{ensure(stored.initialSufficientConditions&&stored.syntax==='MQ'&&stored.initialKind==='single-quadratic','Own exact MQ initial certificate required');return deepFreeze({syntax:stored.syntax as 'MQ',initialKind:stored.initialKind as 'single-quadratic',T:stored.T,K:stored.K,firstLegLength:stored.firstLegLength,initialArcMax:7 as const,storedBounds:stored,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})}
const POLICIES:readonly ReviewedU85c7HkcsPolicy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u85c7-hkcs-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:ownCertificate(t.certificate)})))

export function reviewedU85c7HkcsPolicy(context:ReviewedU85c7HkcsContext|null,pen:number,mask:number):ReviewedU85c7HkcsPolicy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u85c7-hkcs-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU85c7HkcsPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'Private whole-bound policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'Original guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax,'Exact original grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU85c7HkcsFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU85c7HkcsNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u85c7HkcsCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 藇 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 藇 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 藇 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 藇 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 藇 SVG coordinate tree')
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
export function measureReviewedU85c7HkcsFrame(policy:ReviewedU85c7HkcsPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU85c7HkcsFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 藇 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 藇 measurement parent required')
  const coordinates=u85c7HkcsCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u85c7-hkcs-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u85c7-hkcs-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 藇 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 藇 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 藇 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('藇 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u85c7-hkcs-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU85c7HkcsCaps(policy:ReviewedU85c7HkcsPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU85c7HkcsNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u85c7-hkcs-caps','private 藇 one prepared exact initial policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 藇 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 藇 SVG binding tree')
    const coordinates=u85c7HkcsCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u85c7-hkcs-progress')===String(progress)&&target.getAttribute('data-u85c7-hkcs-clip')===clipId&&mask.getAttribute('id')===clipId+'-u85c7-hkcs-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u85c7-hkcs-measure'&&guide.getAttribute('id')===clipId+'-u85c7-hkcs-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u85c7-hkcs-growing)'
    if(!bound())throw new Error('Mismatched 藇 SVG binding')
    const frame=measureReviewedU85c7HkcsFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('藇 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('藇 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U85C7_HKCS_CAPS_SOURCE=deepFreeze({"glyph":"藇","root":"hkcs_m85c7","sourceCounts":{"pens":18,"masks":20,"polygons":37},"identity":{"sourceRoot":"hkcs_m85c7","sourceProofFile":"../hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/engine-whole-hkcs_m85c7.json","sourceProofFileSha256":"fec68385651daa6711291f6e1d441333377c01cf1e8baeb2fe3480bb9ab10749","sourceCapsuleFile":"../hanja-source-alternative-u85c7-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"cae48a831179493986a2aa64127c80be2d29b7d6c3d28a750714b3bbe67767f9","sourceChecksFile":"../hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"15ee3e6dd8951dfc0df4c9c080699b6a924b88b78357a426665e36a1c22f2694"},"initialCertificates":1,"fullQCoverageCertificates":3,"preparedPolicies":1,"defaultStripRequiresNative":[[17,1],[18,1]],"notT0WitnessIsNotSafety":true,"fullGrowingIntersectionProof":false,"compoundContactApproved":false,"originalTemporalReviewed":true,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U85C7_HKCS_CAPS_PROOFS=deepFreeze(TARGETS.map(t=>t.certificate))
export const REVIEWED_U85C7_HKCS_CAPS_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json":"fbb7b817d68a9c1a70064f8ab31b49237dbdfbc0ab69e33b6f77f5dd9aa0aed1","docs/hanja-source-original-u85c7-hkcs-2026-10-26/cap5-initial-conditions-proof.json":"e44722535c23d4cf58ed5c89a454823cb1ec7658e4e976864036aa3a46ba337b","docs/hanja-source-original-u85c7-hkcs-2026-10-26/full-Q7-coverage-proof.json":"f0a7869e25b7aa27d50f8009fbcc2ea66556f5cc3c3d68ee1af5412b8ddc4765","docs/hanja-source-original-u85c7-hkcs-2026-10-26/initial-wide-strip-risks-proof.json":"90e383d0b7fffcd4b02683bebe73bd94d01d3777e0940302416b188e18f4cac7","docs/hanja-source-original-u85c7-hkcs-2026-10-26/paint-and-compound-contacts-proof.json":"145b66073163a60abd737344d6204a92a5b34eafa37bc954034fbd31a8f5eebe","docs/hanja-source-original-u85c7-hkcs-2026-10-26/source-projection.json":"23b24b8ca60e6fb37e7df88655881133df76924db70d626de4deca1cfc97ea8a","docs/hanja-official-media-compare-u85c7-2026-10-26/official-temporal-native-review.json":"694da4483afde4d752d764b6284a6ac9e8e71117b1a91a42a5ae3dc96cd619f4","docs/hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/engine-whole-hkcs_m85c7.json":"fec68385651daa6711291f6e1d441333377c01cf1e8baeb2fe3480bb9ab10749","docs/hanja-source-alternative-u85c7-hkcs-2026-10-26/sources.json":"cae48a831179493986a2aa64127c80be2d29b7d6c3d28a750714b3bbe67767f9","docs/hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/capture.json":"15ee3e6dd8951dfc0df4c9c080699b6a924b88b78357a426665e36a1c22f2694"})

export function makeReviewedU85c7HkcsSourceContext(proof:unknown,identity:unknown,outlines:HanjaOutlineStrokes):ReviewedU85c7HkcsContext|null{return arguments.length===3&&sameJSON(proof,FIXED_FULL5)&&sameJSON(identity,FIXED_IDENTITY)&&sameWhole(outlines)?CONTEXT:null}

export const REVIEWED_U85C7_HKCS_SOURCE_INPUT=Object.freeze({fullProof:FIXED_FULL5,identity:FIXED_IDENTITY})
