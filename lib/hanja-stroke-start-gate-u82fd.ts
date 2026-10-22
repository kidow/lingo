import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 苽 원9p10m22 고유2MQ 정책. 실제component/runtime 승인은 별도다. */
const FIXED_STROKES:HanjaOutlineStrokes=[[{"outline":"M6.45 13.3 L46.75 13.3 L46.75 15.3 L6.45 15.3 Z M46.75 13.3 L36.75 14.3 L41.75 8.8 Z","bounds":[6.45,8.8,46.75,15.3],"direction":"right","weight":40.2975}],[{"outline":"M34.8 4.9 L34.8 22.3 L28.8 25.3 L28.8 3.9 Z M34.8 4.9 L36.3 5.9 L33.8 7.4 Z","bounds":[28.8,3.9,36.3,25.3],"direction":"down","weight":19.38}],[{"outline":"M52.7 13.3 L93 13.3 L93 15.3 L52.7 15.3 Z M93 13.3 L81 14.3 L87 8.3 Z","bounds":[52.7,8.3,93,15.3],"direction":"right","weight":40.2975}],[{"outline":"M70.65 4.9 L70.65 22.3 L64.65 25.3 L64.65 3.9 Z M70.65 4.9 L72.15 5.9 L69.65 7.4 Z","bounds":[64.65,3.9,72.15,25.3],"direction":"down","weight":19.38}],[{"outline":"M76.65 31.5 L72.9 32.3 L68.85 33.05 L64.5 33.75 L59.85 34.35 L54.85 34.9 L49.55 35.35 L43.95 35.75 L38 36.1 L31.75 36.25 L25.15 36.25 L25.1 35.35 L31.6 34.35 L37.75 33.4 L43.6 32.5 L49.1 31.6 L54.25 30.7 L59.1 29.75 L63.6 28.8 L67.75 27.8 L71.6 26.75 L75.05 25.7 Z M74.6 25.85 L80.2 30.55 L76.65 31.5 Z M80.2 30.55 L80.35 32.05 L76.8 30.4 Z","bounds":[25.1,25.7,80.35,36.25],"direction":"curve","weight":51.742542,"revealPath":"M76.375 28.5025 Q58.645 33.3925 25.155 35.8375","revealWidth":14}],[{"outline":"M28.15 34.8 L28.15 56.6 L22.15 56.6 L22.15 31.8 Z M22.15 56.6 L28.15 56.6 L26.95 58.4 L25.15 59.6 L23.35 58.4 Z M28.15 56.7 L27.6 62.1 L26.8 67.15 L25.7 71.85 L24.25 76.25 L22.5 80.25 L20.45 83.95 L18.1 87.2 L15.4 90.1 L12.4 92.5 L9.15 94.45 L8.6 93.7 L11.15 91.1 L13.4 88.3 L15.4 85.3 L17.15 82.1 L18.65 78.55 L19.85 74.8 L20.8 70.7 L21.5 66.25 L21.95 61.55 L22.15 56.5 Z","bounds":[8.6,31.8,28.15,94.45],"direction":"curve","weight":61.643776,"revealPath":"M25.155 35.8375 L25.155 56.62 Q24.17 83.515 8.9025 94.11","revealWidth":14}],[{"outline":"M49.8 33.6 L49.8 86.55 L43.8 86.55 L43.8 33.6 Z","bounds":[43.8,33.6,49.8,86.55],"direction":"down","weight":50.9375},{"outline":"M43.65 84.2 L45.65 83.55 L47.7 82.95 L49.75 82.4 L51.85 81.85 L54 81.3 L56.2 80.8 L58.4 80.35 L60.7 79.95 L63.05 79.65 L65.4 79.4 L65.65 80.25 L63.5 81.3 L61.45 82.35 L59.35 83.3 L57.35 84.25 L55.35 85.2 L53.4 86.1 L51.45 87 L49.6 87.9 L47.75 88.85 L45.95 89.75 Z M45.95 89.75 L42.75 84.6 L43.65 84.2 Z M45.95 89.75 L48.15 87.2 L47.45 90.75 Z","bounds":[42.75,79.4,65.65,90.75],"direction":"curve","weight":22.411799,"revealPath":"M44.3625 87.1825 Q54.2125 83.1075 65.53999999999999 79.8475","revealWidth":14}],[{"outline":"M57.3 72.75 L59.1 73.5 L60.9 74.25 L62.6 75.15 L64.2 76.25 L65.7 77.4 L67.1 78.7 L68.4 80.15 L69.6 81.65 L70.7 83.3 L71.7 85.05 L66.1 87.3 L65.65 85.75 L65.05 84.25 L64.4 82.8 L63.65 81.4 L62.8 80.05 L61.85 78.7 L60.8 77.35 L59.6 76.05 L58.35 74.7 L56.85 73.55 Z M71.7 85.05 L71.65 87.35 L70 88.95 L67.75 88.9 L66.1 87.3 Z","bounds":[56.85,72.75,71.7,88.95],"direction":"curve","weight":19.472466,"revealPath":"M56.675 72.92 Q65.53999999999999 77.81 69.48 87.59","revealWidth":14}],[{"outline":"M67.45 30.15 L68.85 38.55 L70.4 46.35 L72.2 53.5 L74.35 60 L76.8 65.9 L79.55 71.15 L82.6 75.8 L85.9 79.8 L89.55 83.2 L93.45 86.05 L89.75 91.5 L85.4 87.9 L81.5 83.7 L78 78.9 L75.05 73.6 L72.5 67.7 L70.4 61.3 L68.7 54.35 L67.5 46.85 L66.75 38.8 L66.6 30.25 Z M89.75 91.5 L93.45 86.05 L95.3 87.3 Z","bounds":[66.6,30.15,95.3,91.5],"direction":"curve","weight":64.013462,"revealPath":"M67.0175 29.725 Q69.9725 74.1425 91.6425 88.8125","revealWidth":14}]]
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU82fdContext=Readonly<{id:'u82fd-vs3-q78'}>
export type ReviewedU82fdGrowingCertificate=Readonly<{syntax:'MQ';T:string;K:string;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU82fdPolicy=Readonly<{id:string;kind:'growing-u82fd-caps';segment:HanjaOutlineSegment;certificate:ReviewedU82fdGrowingCertificate}>
const CONTEXT:ReviewedU82fdContext=Object.freeze({id:'u82fd-vs3-q78'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
// 저장된 source-specific 인증만 결박한다. 기존 초기곡률 산술을 재실행하지 않는다.
const TARGETS=deepFreeze([{"pen":7,"mask":2,"id":"u82fd-7-2","path":"M44.3625 87.1825 Q54.2125 83.1075 65.53999999999999 79.8475","certificate":{"pen":7,"mask":2,"syntax":"MQ","maskSHA256":"84db175cd0e8457defb54f1970e28d198a86a605d592f1bed12437bc8b721406","guide":"M44.3625 87.1825 Q54.2125 83.1075 65.53999999999999 79.8475","width":14,"radius":7,"weight":22.411799,"T":"1/2","K":"1/100","storedCertificate":{"proof":"docs/hanja-u82fd-vs3-q7-start-geometry-proof-2026-10-21/README.md","proofSHA256":"903d9cc50472e32741b27e560775044c3f855171cea057f874b169ff41b254fd"},"initialCurveConditionsSufficient":true,"PIntersectionConnectedNotProved":true,"fullCoverageNotProved":true}},{"pen":8,"mask":1,"id":"u82fd-8-1","path":"M56.675 72.92 Q65.53999999999999 77.81 69.48 87.59","certificate":{"pen":8,"mask":1,"syntax":"MQ","maskSHA256":"d07782810a244eb9ad67ff11992bc8f4fb8878219ca4938d1e09efe9deafce86","guide":"M56.675 72.92 Q65.53999999999999 77.81 69.48 87.59","width":14,"radius":7,"weight":19.472466,"T":"1/2","K":"1/25","storedCertificate":{"proof":"docs/hanja-u82fd-vs3-unmodified-start-geometry-proof-2026-10-21/README.md","proofSHA256":"22d851aac8a21280e4781186b5f1e589dcd81a70e3c9a96de65c93f2cc5c46bb"},"initialCurveConditionsSufficient":true,"PIntersectionConnectedNotProved":true,"fullCoverageNotProved":true}}])
const POLICIES:readonly ReviewedU82fdPolicy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u82fd-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:deepFreeze({syntax:'MQ' as const,T:t.certificate.T,K:t.certificate.K,initialArcMax:7 as const,storedBounds:t.certificate,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
export function reviewedU82fdContext(strokes:HanjaOutlineStrokes):ReviewedU82fdContext|null{return sameWhole(strokes)?CONTEXT:null}
/** pen/mask는 기존 StrokeOutlines와 같은 0-based 인덱스다. */
export function reviewedU82fdPolicy(context:ReviewedU82fdContext|null,pen:number,mask:number):ReviewedU82fdPolicy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u82fd-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU82fdPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 苽 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 苽 guide/width');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU82fdFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU82fdNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u82fdCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 苽 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 苽 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 苽 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 苽 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 苽 SVG coordinate tree')
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
export function measureReviewedU82fdFrame(policy:ReviewedU82fdPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU82fdFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 苽 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 苽 measurement parent required')
  const coordinates=u82fdCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u82fd-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u82fd-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 苽 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 苽 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 苽 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('苽 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u82fd-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU82fdCaps(policy:ReviewedU82fdPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU82fdNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u82fd-caps','private seven 苽 MQ policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 苽 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 苽 SVG binding tree')
    const coordinates=u82fdCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u82fd-progress')===String(progress)&&target.getAttribute('data-u82fd-clip')===clipId&&mask.getAttribute('id')===clipId+'-u82fd-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u82fd-measure'&&guide.getAttribute('id')===clipId+'-u82fd-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u82fd-growing)'
    if(!bound())throw new Error('Mismatched 苽 SVG binding')
    const frame=measureReviewedU82fdFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('苽 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('苽 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

export const REVIEWED_U82FD_SOURCE=deepFreeze({"geometrySHA256":"4a842b0535cbeee6a9392eb1be179c0aed335617db1019ba558b2cf9cfab0698","counts":{"pens":9,"masks":10,"polygons":22,"targets":2},"sourceFixture":"docs/hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/fixtures.json","fixtureSHA256":"b9e95f18387c30c92b7e71772fb15ea562d1f8d9a8ed8249c5a62e84f9d483f5","full5SHA256":"9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840","identityShape":"actual-full5-id3","sourceIdentity":{"sourceRoot":"u82fd-ue0103","sourceProofFile":"engine-whole-u82fd-ue0103.json","sourceProofFileSha256":"9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840"},"initialProofs":[{"path":"docs/hanja-u82fd-vs3-q7-start-geometry-proof-2026-10-21/README.md","SHA256":"903d9cc50472e32741b27e560775044c3f855171cea057f874b169ff41b254fd"},{"path":"docs/hanja-u82fd-vs3-unmodified-start-geometry-proof-2026-10-21/README.md","SHA256":"22d851aac8a21280e4781186b5f1e589dcd81a70e3c9a96de65c93f2cc5c46bb"}],"standaloneFiniteReview":"docs/hanja-renderer-native-review-u82fd-vs3-q7-2026-10-21/review.json","standaloneFiniteReviewSHA256":"28ee75aff0fb6fcd5357aa209ff49d15dc3adf26a0ef2c959a0efb9000b9aa9d","standaloneFullCharacterApproval":false,"pen8OldInitialFailurePreserved":true,"newGeometry":0,"newTailPartitions":0,"actualComponentApproval":false,"runtimeApplied":false,"originalSourceFalseHistoryPreserved":true})
