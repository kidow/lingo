import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 邰 원8p9m21 고유2MQ 정책. 실제component/runtime 승인은 별도다. */
const FIXED_STROKES:HanjaOutlineStrokes=[[{"outline":"M31.7 9.8 L30.6 12.95 L29.4 16.15 L28.05 19.4 L26.65 22.65 L25.15 26 L23.55 29.4 L21.85 32.8 L20 36.25 L18 39.7 L15.8 43.15 L15 42.8 L16.3 38.9 L17.55 35.15 L18.85 31.5 L20.05 27.95 L21.2 24.45 L22.3 21.05 L23.35 17.7 L24.3 14.45 L25.15 11.25 L25.95 8.1 Z M25.8 8.6 L26.2 7.3 L31.7 9.8 Z M31.7 9.8 L32.85 11.2 L30.05 11.9 Z","bounds":[15,7.3,32.85,43.15],"direction":"curve","weight":37.068259,"revealPath":"M28.985 8.5 Q24.31 24.5 15.4275 43","revealWidth":14},{"outline":"M8.05 40.95 L11.2 40.7 L14.6 40.4 L18.2 40.05 L22.05 39.65 L26.05 39.25 L30.3 38.8 L34.75 38.3 L39.45 37.85 L44.35 37.4 L49.45 37.05 L49.6 37.9 L44.65 39.3 L39.9 40.5 L35.3 41.55 L30.9 42.55 L26.7 43.45 L22.75 44.25 L18.95 45 L15.35 45.7 L12 46.3 L8.8 46.9 Z M8.8 46.9 L7.05 41.05 L8.05 40.95 Z M8.8 46.9 L11.6 45.05 L9.95 48.25 Z","bounds":[7.05,37.05,49.6,48.25],"direction":"curve","weight":42.11216,"revealPath":"M7.9475 44 Q23.8425 42 49.555 37.5","revealWidth":14}],[{"outline":"M37.6 19.5 L40.05 21.35 L42.4 23.4 L44.55 25.55 L46.55 27.9 L48.4 30.35 L50.1 32.9 L51.7 35.55 L53.15 38.3 L54.5 41.2 L55.65 44.15 L49.95 45.95 L49.15 43.15 L48.2 40.45 L47.2 37.75 L46.05 35.15 L44.8 32.55 L43.4 30.05 L41.9 27.55 L40.35 25.1 L38.7 22.65 L36.95 20.15 Z M55.65 44.15 L55.45 46.4 L53.75 47.9 L51.45 47.7 L49.95 45.95 Z","bounds":[36.95,19.5,55.65,47.9],"direction":"curve","weight":31.571053,"revealPath":"M36.9325 19.5 Q48.1525 30.5 53.295 46.5","revealWidth":14}],[{"outline":"M18.75 55.8 L18.75 90.15 L12.75 93.15 L12.75 52.8 Z","bounds":[12.75,52.8,18.75,93.15],"direction":"down","weight":28.89}],[{"outline":"M15.75 55.8 L46.4 55.8 L46.4 57.8 L15.75 57.8 Z M49.4 56.8 L49.4 88.65 L43.4 91.65 L43.4 56.8 Z M43.4 55.8 L46.4 53.3 L51.9 57.8 L49.4 59.8 L43.4 56.8 Z","bounds":[15.75,53.3,51.9,91.65],"direction":"curve","weight":59.52995,"revealPath":"M15.768775000000003 56.805 L46.408725 56.805 L46.408725 85.695","revealWidth":14}],[{"outline":"M15.75 84.65 L46.4 84.65 L46.4 86.65 L15.75 86.65 Z","bounds":[15.75,84.65,46.4,86.65],"direction":"right","weight":30.63995}],[{"outline":"M62 13 L88 13 L88 15 L62 15 Z M90.75 15.1 L89.55 17.65 L88.2 20.25 L86.75 22.85 L85.15 25.55 L83.45 28.25 L81.65 31 L79.7 33.8 L77.6 36.6 L75.3 39.4 L72.85 42.25 L72.1 41.7 L73.75 38.4 L75.3 35.2 L76.85 32.1 L78.35 29.1 L79.75 26.2 L81.05 23.35 L82.25 20.65 L83.3 17.95 L84.3 15.35 L85.2 12.85 Z M85 13 L88 10.5 L93.5 15 L91 16.5 L85 19 Z","bounds":[62,10.5,93.5,42.25],"direction":"curve","weight":58.003906,"revealPath":"M62 14 L88 14 Q83 26.5 72.5 42","revealWidth":14}],[{"outline":"M73.1 41.25 L78.65 43.15 L83.05 46.05 L86.5 49.5 L89.05 53.25 L90.8 57.2 L91.8 61.15 L92.2 64.95 L92.1 68.55 L91.55 71.8 L90.7 74.6 L85.2 72.2 L86 70.3 L86.6 67.8 L86.9 64.95 L86.85 61.85 L86.3 58.55 L85.15 55.2 L83.35 51.85 L80.75 48.55 L77.2 45.4 L72.75 42.1 Z M90.7 74.6 L89.05 76.15 L86.75 76.15 L85.2 74.5 L85.2 72.2 Z M90.7 74.6 L90.15 75.7 L89.5 76.75 L88.75 77.75 L87.85 78.6 L86.85 79.35 L85.8 79.95 L84.65 80.4 L83.45 80.75 L82.25 80.9 L81 81 L81 75 L81.65 74.95 L82.25 74.85 L82.75 74.7 L83.2 74.55 L83.6 74.3 L83.95 74.05 L84.25 73.7 L84.6 73.3 L84.9 72.8 L85.2 72.2 Z M81 78 L75 76.5 L75 75 L81 75 Z","bounds":[72.75,41.25,92.2,81],"direction":"curve","weight":43.83951,"revealPath":"M72.5 41.5 C91.5 49.5 91 66.5 87.99363055707225 73.41464971873383 Q86 78 81 78","revealWidth":14}],[{"outline":"M65 13 L65 91.5 L59 94.5 L59 10 Z","bounds":[59,10,65,94.5],"direction":"down","weight":79}]]
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU90b0Context=Readonly<{id:'u90b0-qq1'}>
export type ReviewedU90b0GrowingCertificate=Readonly<{syntax:'MQ';T:string;K:string;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU90b0Policy=Readonly<{id:string;kind:'growing-u90b0-caps';segment:HanjaOutlineSegment;certificate:ReviewedU90b0GrowingCertificate}>
const CONTEXT:ReviewedU90b0Context=Object.freeze({id:'u90b0-qq1'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
// 저장된 source-specific 인증만 결박한다. 기존 초기곡률 산술을 재실행하지 않는다.
const TARGETS=deepFreeze([{"pen":1,"mask":1,"id":"u90b0-1-1","path":"M28.985 8.5 Q24.31 24.5 15.4275 43","certificate":{"pen":1,"mask":1,"guide":"M28.985 8.5 Q24.31 24.5 15.4275 43","maskSHA256":"c6695c174aceef79976e098e01954e73ca284d14eb07dd613a2f52ef0fae0653","T":"1/3","K":"1/100","initialArcMax":7,"u":["-187/40","16/1"],"v":["-1683/400","5/2"],"lambda":"444569/1600","lambdaAt":"0/1","cross":"22253/400","chordSquaredMinus49":"1083807409/12960000","curvatureMargin":"56172782009872009/10240000000000","cosLower":"19951/20000","cosMinusRK":"18551/20000","strictAxis":"x","derivativeEndpoints":["-187/20","-2431/200"],"PIntersectionConnectivityNotProved":true,"notRasterProof":true,"syntax":"MQ","width":14,"radius":7,"weight":37.068259,"storedCertificate":{"pen":1,"mask":1,"guide":"M28.985 8.5 Q24.31 24.5 15.4275 43","maskSHA256":"c6695c174aceef79976e098e01954e73ca284d14eb07dd613a2f52ef0fae0653","T":"1/3","K":"1/100","initialArcMax":7,"u":["-187/40","16/1"],"v":["-1683/400","5/2"],"lambda":"444569/1600","lambdaAt":"0/1","cross":"22253/400","chordSquaredMinus49":"1083807409/12960000","curvatureMargin":"56172782009872009/10240000000000","cosLower":"19951/20000","cosMinusRK":"18551/20000","strictAxis":"x","derivativeEndpoints":["-187/20","-2431/200"],"PIntersectionConnectivityNotProved":true,"notRasterProof":true},"initialCurveConditionsSufficient":true,"PIntersectionConnectedNotProved":true,"fullCoverageNotProved":true}},{"pen":1,"mask":2,"id":"u90b0-1-2","path":"M7.9475 44 Q23.8425 42 49.555 37.5","certificate":{"pen":1,"mask":2,"guide":"M7.9475 44 Q23.8425 42 49.555 37.5","maskSHA256":"0e07a8d396084e46335aa5f67ec257b2b1380e904b5003a82c673ffd69d57045","T":"1/4","K":"1/100","initialArcMax":7,"u":["3179/200","-2/1"],"v":["3927/400","-5/2"],"lambda":"10266041/40000","lambdaAt":"0/1","cross":"-8041/400","chordSquaredMinus49":"1049773681/40960000","curvatureMargin":"1017296783210759506921/160000000000000000","cosLower":"19951/20000","cosMinusRK":"18551/20000","strictAxis":"x","derivativeEndpoints":["3179/100","29359/800"],"PIntersectionConnectivityNotProved":true,"notRasterProof":true,"syntax":"MQ","width":14,"radius":7,"weight":42.11216,"storedCertificate":{"pen":1,"mask":2,"guide":"M7.9475 44 Q23.8425 42 49.555 37.5","maskSHA256":"0e07a8d396084e46335aa5f67ec257b2b1380e904b5003a82c673ffd69d57045","T":"1/4","K":"1/100","initialArcMax":7,"u":["3179/200","-2/1"],"v":["3927/400","-5/2"],"lambda":"10266041/40000","lambdaAt":"0/1","cross":"-8041/400","chordSquaredMinus49":"1049773681/40960000","curvatureMargin":"1017296783210759506921/160000000000000000","cosLower":"19951/20000","cosMinusRK":"18551/20000","strictAxis":"x","derivativeEndpoints":["3179/100","29359/800"],"PIntersectionConnectivityNotProved":true,"notRasterProof":true},"initialCurveConditionsSufficient":true,"PIntersectionConnectedNotProved":true,"fullCoverageNotProved":true}}])
const POLICIES:readonly ReviewedU90b0Policy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u90b0-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:deepFreeze({syntax:'MQ' as const,T:t.certificate.T,K:t.certificate.K,initialArcMax:7 as const,storedBounds:t.certificate,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})))
export function reviewedU90b0Context(strokes:HanjaOutlineStrokes):ReviewedU90b0Context|null{return sameWhole(strokes)?CONTEXT:null}
/** pen/mask는 기존 StrokeOutlines와 같은 0-based 인덱스다. */
export function reviewedU90b0Policy(context:ReviewedU90b0Context|null,pen:number,mask:number):ReviewedU90b0Policy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u90b0-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU90b0Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 邰 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 邰 guide/width');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU90b0Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU90b0Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u90b0CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 邰 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 邰 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 邰 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 邰 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 邰 SVG coordinate tree')
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
export function measureReviewedU90b0Frame(policy:ReviewedU90b0Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU90b0Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 邰 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 邰 measurement parent required')
  const coordinates=u90b0CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u90b0-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u90b0-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 邰 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 邰 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 邰 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('邰 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u90b0-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU90b0Caps(policy:ReviewedU90b0Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU90b0Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u90b0-caps','private seven 邰 MQ policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 邰 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 邰 SVG binding tree')
    const coordinates=u90b0CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u90b0-progress')===String(progress)&&target.getAttribute('data-u90b0-clip')===clipId&&mask.getAttribute('id')===clipId+'-u90b0-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u90b0-measure'&&guide.getAttribute('id')===clipId+'-u90b0-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u90b0-growing)'
    if(!bound())throw new Error('Mismatched 邰 SVG binding')
    const frame=measureReviewedU90b0Frame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('邰 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('邰 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

export const REVIEWED_U90B0_SOURCE=deepFreeze({"geometrySHA256":"de6862f71c830c487b390f34132364582066e8ee1610295405b2f7bcaa4cc19c","counts":{"pens":8,"masks":9,"polygons":21,"targets":2},"sourceFixture":"docs/hanja-source-independent-qq-u90b0-source-experiment-2026-10-21/fixtures.json","fixtureSHA256":"890b3a0bf255d9736fb85791a8e156c237b70e86dc929ecbdc027c7dabd35e5c","full5SHA256":"d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d","identityShape":"actual-full5-plus-selected-body3-id5","sourceIdentity":{"sourceRoot":"u90b0","sourceProofFile":"engine-whole-u90b0.json","sourceProofFileSha256":"b19f2a5114acb5851aaac25d09b003366d73b2f5f0e70205772716d58313b5c2","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d"},"sourceProofFile":"docs/hanja-goal-glyphwiki-batch966-2026-10-13/engine-proof.json","selectedBodyFile":"docs/hanja-goal-glyphwiki-batch966-2026-10-13/engine-whole-u90b0.json","selectedBodySHA256":"b19f2a5114acb5851aaac25d09b003366d73b2f5f0e70205772716d58313b5c2","sourceGroups":[[0,1],[2],[3],[4,5],[6],[7,8],[9],[10]],"storedExactArithmeticRuns":1,"initialCertificateOnly":true,"initialProofScope":"q(t)=A+2ut+vt²; exact lambda=min|u+tv|² on[0,T]; strict coordinate derivative; chord(T)²>49; 4K²lambda³-cross²>0; 1-(7K)²/2>7K. Initial arc7 ideal conditions only; P intersection/QQ1 continuity/domestic temporal direction/UA raster coverage not proved.","nativeHold":"docs/hanja-source-native-hold-u90b0-qq1-activation-2026-10-21/hold.json","nativeHoldSHA256":"1c4f6f3e7470c695b99994ba62b127aff64519c8eee794dc53f925423952cf45","QQ1GuideGapDisplay":[-7.48,1],"QQ1PreviousPConnectivityNotProved":true,"pen7OriginalCQ414LeftRiskUnchanged":true,"pen3V113AndPen4HV123RisksUnchanged":true,"newGeometry":0,"newTailPartitions":0,"sourceCompiler":0,"engineRuns":0,"actualComponentApproval":false,"standaloneFiniteApproval":false,"runtimeApplied":false,"originalSourceFalseHistoryPreserved":true})
