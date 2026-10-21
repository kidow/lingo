import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 訩 전용 원11p13m23 표시정책. 원source/native false는 유지하며 실제 component/runtime 승인은 별도다. */
const FIXED_STROKES:HanjaOutlineStrokes=[[{"outline":"M8.75 14 L33.65 14 L33.65 16 L8.75 16 Z M33.65 14 L23.65 15 L28.65 9.5 Z","bounds":[8.75,9.5,33.65,16],"direction":"right","weight":24.9375}],[{"outline":"M7 27 L37.6 27 L37.6 29 L7 29 Z M37.6 27 L25.6 28 L31.6 22 Z","bounds":[7,22,37.6,29],"direction":"right","weight":30.625}],[{"outline":"M8.75 41 L33.65 41 L33.65 43 L8.75 43 Z M33.65 41 L23.65 42 L28.65 36.5 Z","bounds":[8.75,36.5,33.65,43],"direction":"right","weight":24.9375}],[{"outline":"M8.75 54 L33.65 54 L33.65 56 L8.75 56 Z M33.65 54 L23.65 55 L28.65 49.5 Z","bounds":[8.75,49.5,33.65,56],"direction":"right","weight":24.9375}],[{"outline":"M14.35 66.5 L14.35 91 L8.35 94 L8.35 63.5 Z","bounds":[8.35,63.5,14.35,94],"direction":"down","weight":19}],[{"outline":"M11.35 66.5 L31.05 66.5 L31.05 68.5 L11.35 68.5 Z","bounds":[11.35,66.5,31.05,68.5],"direction":"right","weight":19.6875},{"outline":"M34.05 67.5 L34.05 89.5 L28.05 92.5 L28.05 67.5 Z M28.05 66.5 L31.05 64 L36.55 68.5 L34.05 70.5 L28.05 67.5 Z","bounds":[28.05,64,36.55,92.5],"direction":"down","weight":19}],[{"outline":"M11.35 85.5 L31.05 85.5 L31.05 87.5 L11.35 87.5 Z","bounds":[11.35,85.5,31.05,87.5],"direction":"right","weight":19.6875}],[{"outline":"M82.25 15.15 L79.95 23.45 L77.4 31.35 L74.65 38.85 L71.7 46 L68.55 52.75 L65.15 59.1 L61.55 65.05 L57.7 70.6 L53.6 75.65 L49.25 80.25 L48.6 79.7 L52.1 74.5 L55.45 69.1 L58.7 63.35 L61.8 57.35 L64.7 50.95 L67.4 44.25 L69.95 37.15 L72.3 29.7 L74.45 21.9 L76.45 13.75 Z M76.3 14.25 L76.65 12.9 L82.25 15.15 Z M82.25 15.15 L83.5 16.5 L80.7 17.35 Z","bounds":[48.6,12.9,83.5,80.25],"direction":"curve","weight":72.727591,"revealPath":"M79.5 14 Q69.1 56.5 48.95 80","revealWidth":14}],[{"outline":"M51.2 23.6 L55.1 27.7 L58.75 32 L62.25 36.55 L65.65 41.25 L68.9 46.15 L72 51.2 L75 56.4 L77.9 61.75 L80.65 67.25 L83.3 72.95 L77.75 75.25 L75.45 69.6 L73.05 64.1 L70.55 58.7 L67.95 53.45 L65.25 48.3 L62.45 43.3 L59.55 38.4 L56.6 33.55 L53.55 28.85 L50.5 24.15 Z M83.3 72.95 L83.25 75.2 L81.7 76.85 L79.4 76.85 L77.75 75.25 Z","bounds":[50.5,23.6,83.3,76.85],"direction":"curve","weight":60.310053,"revealPath":"M50.575 23.5 Q68.45 45.5 81.125 75.5","revealWidth":14}],[{"outline":"M47.7 15 L47.7 91.5 L41.7 94.5 L41.7 14 Z M47.7 15 L49.2 16 L46.7 17.5 Z","bounds":[41.7,14,49.2,94.5],"direction":"down","weight":70},{"outline":"M44.7 83.5 L88.6 83.5 L88.6 85.5 L44.7 85.5 Z","bounds":[44.7,83.5,88.6,85.5],"direction":"right","weight":43.875}],[{"outline":"M91.6 15 L91.6 88.5 L85.6 91.5 L85.6 14 Z M91.6 15 L93.1 16 L90.6 17.5 Z","bounds":[85.6,14,93.1,91.5],"direction":"down","weight":70}]]
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU8a29Context=Readonly<{id:'u8a29-q89'}>
export type ReviewedU8a29GrowingCertificate=Readonly<{syntax:'MQ';T:string;K:string;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU8a29Policy=Readonly<{id:string;kind:'growing-u8a29-caps';segment:HanjaOutlineSegment;certificate:ReviewedU8a29GrowingCertificate}>
const CONTEXT:ReviewedU8a29Context=Object.freeze({id:'u8a29-q89'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
// 저장된 source-specific 인증만 결박한다. 기존 초기곡률 산술을 재실행하지 않는다.
const TARGETS=deepFreeze([{"pen":8,"mask":1,"id":"u8a29-8-1","path":"M79.5 14 Q69.1 56.5 48.95 80","certificate":{"pen":8,"mask":1,"rawOneBased":9,"maskSHA256":"7ef49f707c3c2232bb074a6687f588940b9069d7435c5ff45c5b6cf462d409db","guide":"M79.5 14 Q69.1 56.5 48.95 80","width":14,"radius":7,"weight":72.727591,"A":["159/2","14"],"u":["-52/5","85/2"],"v":["-39/4","-19"],"startMembership":{"strictInteriorSubpaths":[],"boundarySubpaths":[],"insideOriginalP":false},"T":"1/2","K":"1/100","lambdaMin":"2115721/1600","lambdaMinAt":"1/2","cross":"24479/40","chordSquaredAtT":"10175129/6400","chordSquaredMinus49":"9861529/6400","curvatureMargin":"5635532537040950361/10240000000000","rK":"7/100","cosLower":"19951/20000","cosMinusRK":"18551/20000","injectiveAxis":"x","derivativeEndpoints":["-104/5","-611/20"],"originalSubpaths":[{"subpath":1,"boundaryDistanceFromStartSquared":"19881/89000","excludedFromInitialArc7Radius14Ball":false},{"subpath":2,"boundaryDistanceFromStartSquared":"10201/5827600","excludedFromInitialArc7Radius14Ball":false},{"subpath":3,"boundaryDistanceFromStartSquared":"9815689/1158800","excludedFromInitialArc7Radius14Ball":false}],"initialCurveConditionsSufficient":true,"PIntersectionConnectedNotProved":true,"fullCoverageNotProved":true,"syntax":"MQ"}},{"pen":9,"mask":1,"id":"u8a29-9-1","path":"M50.575 23.5 Q68.45 45.5 81.125 75.5","certificate":{"pen":9,"mask":1,"rawOneBased":10,"maskSHA256":"c0d93d7d0976cb58f1026b71d55f33be64a30276917a96f2044af1b24cd7ba4f","guide":"M50.575 23.5 Q68.45 45.5 81.125 75.5","width":14,"radius":7,"weight":60.310053,"A":["2023/40","47/2"],"u":["143/8","22"],"v":["-26/5","8"],"startMembership":{"strictInteriorSubpaths":[],"boundarySubpaths":[],"insideOriginalP":false},"T":"1/2","K":"1/100","lambdaMin":"51425/64","lambdaMinAt":"0","cross":"1287/5","chordSquaredAtT":"1361169/1600","chordSquaredMinus49":"1282769/1600","curvatureMargin":"3702970715081/26214400","rK":"7/100","cosLower":"19951/20000","cosMinusRK":"18551/20000","injectiveAxis":"x","derivativeEndpoints":["143/4","611/20"],"originalSubpaths":[{"subpath":1,"boundaryDistanceFromStartSquared":"109561/507200","excludedFromInitialArc7Radius14Ball":false},{"subpath":2,"boundaryDistanceFromStartSquared":"5466469/1600","excludedFromInitialArc7Radius14Ball":true}],"initialCurveConditionsSufficient":true,"PIntersectionConnectedNotProved":true,"fullCoverageNotProved":true,"syntax":"MQ"}}])
const POLICIES:readonly ReviewedU8a29Policy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u8a29-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:deepFreeze({syntax:'MQ' as const,T:t.certificate.T,K:t.certificate.K,initialArcMax:7 as const,storedBounds:t.certificate,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
export function reviewedU8a29Context(strokes:HanjaOutlineStrokes):ReviewedU8a29Context|null{return sameWhole(strokes)?CONTEXT:null}
/** pen/mask는 기존 StrokeOutlines와 같은 0-based 인덱스다. */
export function reviewedU8a29Policy(context:ReviewedU8a29Context|null,pen:number,mask:number):ReviewedU8a29Policy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u8a29-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU8a29Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 訩 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 訩 guide/width');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU8a29Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU8a29Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u8a29CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 訩 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 訩 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 訩 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 訩 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 訩 SVG coordinate tree')
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
export function measureReviewedU8a29Frame(policy:ReviewedU8a29Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU8a29Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 訩 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 訩 measurement parent required')
  const coordinates=u8a29CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8a29-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u8a29-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 訩 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 訩 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 訩 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('訩 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u8a29-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU8a29Caps(policy:ReviewedU8a29Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU8a29Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u8a29-caps','private two 訩 MQ policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 訩 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 訩 SVG binding tree')
    const coordinates=u8a29CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8a29-progress')===String(progress)&&target.getAttribute('data-u8a29-clip')===clipId&&mask.getAttribute('id')===clipId+'-u8a29-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u8a29-measure'&&guide.getAttribute('id')===clipId+'-u8a29-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u8a29-growing)'
    if(!bound())throw new Error('Mismatched 訩 SVG binding')
    const frame=measureReviewedU8a29Frame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('訩 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('訩 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

export const REVIEWED_U8A29_SOURCE=Object.freeze({"geometrySHA256":"217071f7050ebbb9e3f2d63c51fda0401004287c00f90de5210f6bd71d74c3bc","full5SHA256":"b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1","identityShape":"actual-full5-id3","sourceIdentity":{"sourceRoot":"u8a29","sourceProofFile":"engine-whole-u8a29.json","sourceProofFileSha256":"b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1"},"initialProofSHA256":"150c6fa17ee0cedf9e66282baf0b0568f7b48fe2e30366b5e366453754cb6381","standaloneFiniteReviewSHA256":"143d5c1876daec64a24e2ac229ddf7e4050ddc80942fcccfe01b694ded0f1d53","newGeometry":0,"newTailPartitions":0,"actualComponentApproval":false,"runtimeApplied":false})
