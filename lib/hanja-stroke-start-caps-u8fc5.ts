/** 迅 exact-source provisional initial caps. Eight original source masks stay unchanged. Native approval is pending; pen1 must use the separate original-UP-tail policy. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline'
const FIXED_STROKES:HanjaOutlineStrokes=[[{"outline":"M35 14.5 L75.5 14.5 L75.5 16.5 L35 16.5 Z M78.45 15.55 L78.25 27.55 L78.35 38.3 L78.85 47.8 L79.65 55.95 L80.8 62.85 L82.25 68.45 L83.9 72.65 L85.75 75.45 L87.5 76.95 L89.25 77.5 L88.7 83.45 L84.6 82.15 L81.2 79.35 L78.6 75.35 L76.5 70.3 L74.9 64.1 L73.7 56.75 L72.85 48.2 L72.4 38.5 L72.25 27.55 L72.5 15.4 Z M72.5 14.5 L75.5 12 L81 16.5 L78.5 18 L72.5 20.5 Z M89.25 77.5 L91.25 78.6 L91.95 80.75 L90.85 82.75 L88.7 83.45 Z M89 78 L86 78 L89 65 L90 65 Z","bounds":[35,12,91.95,83.45],"direction":"curve","weight":106.887122,"revealPath":"M35 15.5 L75.5 15.5 Q73.5 79 89 80.5","revealWidth":14}],[{"outline":"M36.25 46.45 L38 46.15 L40.1 45.85 L42.65 45.45 L45.5 45 L48.75 44.5 L52.4 43.95 L56.45 43.35 L60.85 42.7 L65.65 42.1 L70.9 41.55 L71.05 42.4 L66.05 43.95 L61.4 45.35 L57.1 46.55 L53.2 47.65 L49.65 48.65 L46.5 49.55 L43.75 50.35 L41.35 51.05 L39.3 51.7 L37.7 52.25 Z M37.7 52.25 L35.25 46.7 L36.25 46.45 Z M37.7 52.25 L40.25 50.1 L39 53.5 Z","bounds":[35.25,41.55,71.05,53.5],"direction":"curve","weight":35.305807,"revealPath":"M36.5 49.5 Q44.5 47.5 71 42","revealWidth":14}],[{"outline":"M57 21.45 L56.8 30.5 L56.4 38.9 L55.75 46.6 L54.85 53.7 L53.7 60.1 L52.3 65.85 L50.6 70.9 L48.65 75.3 L46.4 78.9 L43.8 81.75 L43.15 81.2 L44.75 77.95 L46.2 74.2 L47.5 69.9 L48.6 64.95 L49.5 59.35 L50.25 53.1 L50.75 46.2 L51.05 38.65 L51.1 30.4 L51 21.5 Z M51 22 L50.95 20.3 L57 21.45 Z M57 21.45 L58.5 22.45 L56 23.95 Z","bounds":[43.15,20.3,58.5,81.75],"direction":"curve","weight":61.404397,"revealPath":"M54 21 Q54.5 68 43.5 81.5","revealWidth":14}],[{"outline":"M14.1 10.3 L16.05 10.9 L17.95 11.55 L19.75 12.3 L21.5 13.1 L23.2 14.05 L24.8 15.1 L26.35 16.2 L27.8 17.35 L29.15 18.65 L30.5 20 L25.7 23.6 L24.85 22.25 L23.95 20.95 L23 19.65 L21.95 18.4 L20.8 17.15 L19.55 15.9 L18.25 14.7 L16.85 13.45 L15.35 12.2 L13.75 11.1 Z M30.5 20 L31 22.2 L29.9 24.2 L27.65 24.7 L25.7 23.6 Z","bounds":[13.75,10.3,31,24.7],"direction":"curve","weight":19.912308,"revealPath":"M13.5 10.5 Q23 15 29 23","revealWidth":14}],[{"outline":"M8.6 28.25 L10.55 28.8 L12.45 29.3 L14.3 30 L16.1 30.75 L17.85 31.65 L19.55 32.6 L21.2 33.65 L22.75 34.8 L24.3 36.05 L25.75 37.35 L21.25 41.3 L20.25 39.95 L19.15 38.6 L18.05 37.35 L16.85 36.1 L15.6 34.85 L14.25 33.65 L12.85 32.5 L11.4 31.3 L9.9 30.15 L8.25 29.1 Z M25.75 37.35 L26.45 39.55 L25.45 41.6 L23.3 42.3 L21.25 41.3 Z","bounds":[8.25,28.25,26.45,42.3],"direction":"curve","weight":20.402206,"revealPath":"M8 28.5 Q17.5 32.5 24.5 40.5","revealWidth":14}],[{"outline":"M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z","bounds":[7,50,30.5,80.5],"direction":"curve","weight":43.5,"revealPath":"M7 53.5 L25 53.5 L25 79","revealWidth":14}],[{"outline":"M6.9 86.65 L8.8 85.7 L10.7 84.8 L12.65 83.8 L14.6 82.8 L16.6 81.8 L18.6 80.75 L20.7 79.7 L22.8 78.65 L25 77.65 L27.2 76.6 L27.75 77.35 L26 79.05 L24.2 80.75 L22.45 82.3 L20.65 83.85 L18.85 85.3 L17.05 86.65 L15.25 88 L13.45 89.35 L11.65 90.6 L9.9 91.8 Z M9.9 91.8 L6.05 87.15 L6.9 86.65 Z M9.9 91.8 L11.75 89 L11.55 92.6 Z","bounds":[6.05,76.6,27.75,92.6],"direction":"curve","weight":23.16247,"revealPath":"M8 89.5 Q17.5 84 27.5 77","revealWidth":14},{"outline":"M27.15 76.1 L29.75 78.4 L32.45 80.35 L35.4 82.05 L39 83.4 L43.55 84.5 L49.3 85.3 L56.5 85.8 L65.45 85.95 L76.3 85.75 L89.35 85.2 L89.6 91.75 L76.45 92 L65.35 91.85 L56.15 91.3 L48.6 90.4 L42.5 89.05 L37.55 87.3 L33.6 85.15 L30.55 82.65 L28.2 79.8 L26.4 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z","bounds":[26.4,76.1,95,92],"direction":"curve","weight":64.228109,"revealPath":"M26.5 76 C34 86 42 90.5 89.5 88.5","revealWidth":14}]]
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU8fc5Context=Readonly<{id:'u8fc5-eight-initial-guides'}>
export type ReviewedU8fc5GrowingCertificate=Readonly<{syntax:'MQ'|'MLQ'|'MLL'|'MC';initialKind:'single-quadratic'|'straight-first-leg'|'single-cubic';T:string|null;K:string;firstLegLength:string|null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU8fc5Policy=Readonly<{id:string;kind:'growing-u8fc5-caps';segment:HanjaOutlineSegment;certificate:ReviewedU8fc5GrowingCertificate}>
const CONTEXT:ReviewedU8fc5Context=Object.freeze({id:'u8fc5-eight-initial-guides'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=deepFreeze([{"pen":1,"mask":1,"id":"u8fc5-1-1","certificate":{"syntax":"MLQ","initialKind":"straight-first-leg","T":null,"K":"0","firstLegLength":"81/2","initialSufficientConditions":true,"firstLegSquared":"6561/4","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M35 15.5 L75.5 15.5 Q73.5 79 89 80.5","originalWeight":106.887122}},{"pen":2,"mask":1,"id":"u8fc5-2-1","certificate":{"syntax":"MQ","initialKind":"single-quadratic","T":"1/2","K":"1/20","firstLegLength":null,"initialSufficientConditions":true,"lambdaMin":"68","cross":"9","chordSquaredAtT":"5365/32","laterNoReturnAxis":"x","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M36.5 49.5 Q44.5 47.5 71 42","originalWeight":35.305807}},{"pen":3,"mask":1,"id":"u8fc5-3-1","certificate":{"syntax":"MQ","initialKind":"single-quadratic","T":"1/2","K":"1/20","firstLegLength":null,"initialSufficientConditions":true,"lambdaMin":"7541/8","cross":"2095/4","chordSquaredAtT":"47921/32","laterNoReturnAxis":"y","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M54 21 Q54.5 68 43.5 81.5","originalWeight":61.404397}},{"pen":4,"mask":1,"id":"u8fc5-4-1","certificate":{"syntax":"MQ","initialKind":"single-quadratic","T":"1/2","K":"1/20","firstLegLength":null,"initialSufficientConditions":true,"lambdaMin":"793/8","cross":"49","chordSquaredAtT":"3305/32","laterNoReturnAxis":"x","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M13.5 10.5 Q23 15 29 23","originalWeight":19.912308}},{"pen":5,"mask":1,"id":"u8fc5-5-1","certificate":{"syntax":"MQ","initialKind":"single-quadratic","T":"1/2","K":"1/20","firstLegLength":null,"initialSufficientConditions":true,"lambdaMin":"9216/89","cross":"48","chordSquaredAtT":"6641/64","laterNoReturnAxis":"x","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M8 28.5 Q17.5 32.5 24.5 40.5","originalWeight":20.402206}},{"pen":6,"mask":1,"id":"u8fc5-6-1","certificate":{"syntax":"MLL","initialKind":"straight-first-leg","T":null,"K":"0","firstLegLength":"18","initialSufficientConditions":true,"firstLegSquared":"324","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M7 53.5 L25 53.5 L25 79","originalWeight":43.5}},{"pen":7,"mask":1,"id":"u8fc5-7-1","certificate":{"syntax":"MQ","initialKind":"single-quadratic","T":"1/2","K":"1/20","firstLegLength":null,"initialSufficientConditions":true,"lambdaMin":"241/2","cross":"-23/2","chordSquaredAtT":"4069/32","laterNoReturnAxis":"x","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M8 89.5 Q17.5 84 27.5 77","originalWeight":23.16247}},{"pen":7,"mask":2,"id":"u8fc5-7-2","certificate":{"syntax":"MC","initialKind":"single-cubic","T":"1/4","K":"3/35","firstLegLength":null,"initialSufficientConditions":true,"speedSquaredLower":"248625/256","crossUpper":"4761/2","chordSquaredAtT":"167297/2048","laterNoReturn":"strictly increasing x; concave y endpoint lower bound","sourceProof":"docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py","originalWidth":14,"originalGuide":"M26.5 76 C34 86 42 90.5 89.5 88.5","originalWeight":64.228109}}])
function ownCertificate(stored:typeof TARGETS[number]['certificate']):ReviewedU8fc5GrowingCertificate{ensure(stored.initialSufficientConditions,'迅 own initial certificate required');return deepFreeze({syntax:stored.syntax as ReviewedU8fc5GrowingCertificate['syntax'],initialKind:stored.initialKind as ReviewedU8fc5GrowingCertificate['initialKind'],T:stored.T,K:stored.K,firstLegLength:stored.firstLegLength,initialArcMax:7 as const,storedBounds:stored,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})}
const POLICIES:readonly ReviewedU8fc5Policy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u8fc5-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:ownCertificate(t.certificate)})))
export function reviewedU8fc5Context(strokes:HanjaOutlineStrokes):ReviewedU8fc5Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU8fc5Policy(context:ReviewedU8fc5Context|null,pen:number,mask:number):ReviewedU8fc5Policy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u8fc5-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU8fc5Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 迅 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 迅 guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax&&((syntax==='MQ'&&policy.certificate.initialKind==='single-quadratic')||(syntax==='MC'&&policy.certificate.initialKind==='single-cubic')||((syntax==='MLQ'||syntax==='MLL')&&policy.certificate.initialKind==='straight-first-leg')),'Exact original 迅 grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU8fc5Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU8fc5Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u8fc5CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 迅 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 迅 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 迅 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 迅 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 迅 SVG coordinate tree')
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
export function measureReviewedU8fc5Frame(policy:ReviewedU8fc5Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU8fc5Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 迅 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 迅 measurement parent required')
  const coordinates=u8fc5CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8fc5-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u8fc5-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 迅 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 迅 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 迅 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('迅 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u8fc5-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU8fc5Caps(policy:ReviewedU8fc5Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU8fc5Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u8fc5-caps','private 迅 six exact MQ policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 迅 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 迅 SVG binding tree')
    const coordinates=u8fc5CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8fc5-progress')===String(progress)&&target.getAttribute('data-u8fc5-clip')===clipId&&mask.getAttribute('id')===clipId+'-u8fc5-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u8fc5-measure'&&guide.getAttribute('id')===clipId+'-u8fc5-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u8fc5-growing)'
    if(!bound())throw new Error('Mismatched 迅 SVG binding')
    const frame=measureReviewedU8fc5Frame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('迅 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('迅 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U8FC5_SOURCE=deepFreeze({root:'u8fc5-ue0102',geometrySHA256:'780347f088e4ec9baeba17018b1c64c7be9538ffd5da3cd424d326968cd3d8e7',counts:{pens:7,masks:8,polygons:23,targets:8},sourceFixture:'docs/hanja-source-independent-qb-u8fc5-vs2-source-experiment-2026-10-19/fixtures.json',sourceFixtureTarget:'u8fc5-ue0102',originalHeader4SeparateTrace7Preserved:true,newFull5Projection:false,originalPGuideWidthWeightUnchanged:true,newNativeRecoveryApproved:false,actualAppUI:false,runtimeApplied:false})
export const REVIEWED_U8FC5_PROOFS=deepFreeze(TARGETS.map(t=>t.certificate))
export const REVIEWED_U8FC5_INPUT_SHA256=Object.freeze({'docs/hanja-source-independent-qb-u8fc5-vs2-source-experiment-2026-10-19/fixtures.json':'6d61dce090101293999a78f83fba373d5b93d77dc53ab14e4e8a76c0e4f2598f'})
