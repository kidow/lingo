import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 湺 전용 원12p13m23 표시정책. 원source/native false는 유지하며 실제 component/runtime 승인은 별도다. */
const FIXED_STROKES:HanjaOutlineStrokes=[[{"outline":"M13.75 9.75 L15.5 10.25 L17.25 10.65 L18.9 11.2 L20.5 11.85 L21.95 12.55 L23.35 13.4 L24.65 14.3 L25.85 15.35 L26.95 16.45 L27.95 17.7 L22.75 20.65 L22.35 19.65 L21.85 18.65 L21.25 17.6 L20.5 16.6 L19.65 15.55 L18.65 14.55 L17.55 13.55 L16.35 12.5 L15 11.45 L13.45 10.6 Z M27.95 17.7 L28.2 19.95 L26.85 21.8 L24.55 22.05 L22.75 20.65 Z","bounds":[13.45,9.75,28.2,22.05],"direction":"curve","weight":16.679676,"revealPath":"M13.16 10 Q22.16 13.5 26.12 20.5","revealWidth":14}],[{"outline":"M6.9 32.7 L8.8 33.2 L10.65 33.65 L12.4 34.15 L14.05 34.8 L15.55 35.55 L17 36.35 L18.3 37.3 L19.55 38.35 L20.65 39.5 L21.6 40.75 L16.25 43.5 L15.95 42.55 L15.5 41.6 L14.9 40.6 L14.2 39.6 L13.3 38.6 L12.25 37.55 L11.1 36.55 L9.75 35.5 L8.3 34.45 L6.6 33.55 Z M21.6 40.75 L21.75 43.05 L20.3 44.8 L18 44.95 L16.25 43.5 Z","bounds":[6.6,32.7,21.75,44.95],"direction":"curve","weight":16.960908,"revealPath":"M6.32 33 Q16.04 36.5 19.64 43.5","revealWidth":14}],[{"outline":"M7.65 66.2 L10.25 66.85 L12.6 67.95 L14.75 69.5 L16.65 71.5 L18.2 73.9 L19.4 76.65 L20.35 79.7 L20.95 83.05 L21.25 86.75 L21.25 90.7 L15.3 90.25 L15.55 86.75 L15.6 83.5 L15.4 80.6 L14.95 77.95 L14.3 75.65 L13.45 73.55 L12.35 71.7 L10.95 70.05 L9.3 68.5 L7.35 67.05 Z M21.25 90.7 L20.25 92.7 L18.05 93.45 L16.05 92.45 L15.3 90.25 Z","bounds":[7.35,66.2,21.25,93.45],"direction":"curve","weight":27.83515,"revealPath":"M7.04 66.5 Q19.64 71 18.2 92","revealWidth":14},{"outline":"M13.45 74.25 L14.1 72.65 L14.95 70.5 L16.1 67.85 L17.55 64.6 L19.25 60.8 L21.25 56.45 L23.6 51.5 L26.2 46 L29.15 39.9 L32.5 33.3 L33.35 33.65 L30.9 40.65 L28.65 47 L26.6 52.75 L24.8 57.85 L23.2 62.4 L21.9 66.3 L20.8 69.6 L20.05 72.3 L19.5 74.35 L19.3 75.7 Z","bounds":[13.45,33.3,33.35,75.7],"direction":"curve","weight":44.682028,"revealPath":"M16.4 75 Q17.84 69 32.96 33.5","revealWidth":14}],[{"outline":"M50.9 9.5 L49.3 14.95 L47.6 20.25 L45.85 25.4 L44 30.5 L42.05 35.45 L40.05 40.3 L37.9 45 L35.7 49.55 L33.3 53.95 L30.8 58.2 L29.95 57.8 L31.6 53.2 L33.25 48.5 L34.9 43.75 L36.5 38.95 L38.05 34 L39.6 29 L41.05 23.9 L42.45 18.7 L43.8 13.4 L45.05 8 Z M44.95 8.5 L45.3 7.15 L50.9 9.5 Z M50.9 9.5 L52.1 10.85 L49.3 11.7 Z","bounds":[29.95,7.15,52.1,58.2],"direction":"curve","weight":52.790763,"revealPath":"M48.123400000000004 8.3125 Q40.9792 36.1 30.3952 58.0375","revealWidth":14}],[{"outline":"M43.95 37.05 L43.95 90.15 L37.95 93.15 L37.95 36.05 Z M43.95 37.05 L45.45 38.05 L42.95 39.55 Z","bounds":[37.95,36.05,45.45,93.15],"direction":"down","weight":55.0875}],[{"outline":"M59 12.5 L59 47 L53 50 L53 9.5 Z","bounds":[53,9.5,59,50],"direction":"down","weight":26.5}],[{"outline":"M56 12.5 L83.7 12.5 L83.7 14.5 L56 14.5 Z M86.7 13.5 L86.7 44 L80.7 47 L80.7 13.5 Z M80.7 12.5 L83.7 10 L89.2 14.5 L86.7 16.5 L80.7 13.5 Z","bounds":[56,10,89.2,47],"direction":"curve","weight":54.22,"revealPath":"M56.019999999999996 13.5 L83.74000000000001 13.5 L83.74000000000001 40","revealWidth":14}],[{"outline":"M56 39 L83.7 39 L83.7 41 L56 41 Z","bounds":[56,39,83.7,41],"direction":"right","weight":27.72}],[{"outline":"M47 55.5 L92 55.5 L92 57.5 L47 57.5 Z M92 55.5 L80 56.5 L86 50.5 Z","bounds":[47,50.5,92,57.5],"direction":"right","weight":45}],[{"outline":"M72.3 39 L72.3 90 L66.3 93 L66.3 39 Z","bounds":[66.3,39,72.3,93],"direction":"down","weight":51.5}],[{"outline":"M70.3 56.5 L70 57.4 L68.45 61.4 L66.7 65.25 L64.75 68.95 L62.65 72.45 L60.4 75.75 L57.9 78.9 L55.3 81.85 L52.45 84.6 L49.45 87.1 L46.2 89.3 L45.6 88.65 L48.15 85.7 L50.5 82.75 L52.75 79.75 L54.85 76.65 L56.85 73.45 L58.65 70.1 L60.3 66.65 L61.8 63.1 L63.1 59.4 L64 56.5 Z","bounds":[45.6,56.5,70.3,89.3],"direction":"curve","weight":38.82509,"revealPath":"M67.18 56.5 Q60.7 76.5 45.94 89","revealWidth":14}],[{"outline":"M72.45 56.8 L74.3 59.75 L76.1 62.65 L77.9 65.4 L79.8 68 L81.7 70.5 L83.75 72.85 L85.8 75.05 L88 77.15 L90.3 79.1 L92.65 80.9 L88.45 86.05 L86.05 83.7 L83.8 81.3 L81.65 78.7 L79.7 76 L77.9 73.2 L76.25 70.25 L74.75 67.15 L73.45 63.95 L72.4 60.6 L71.6 57.1 Z M88.45 86.05 L92.65 80.9 L93.9 81.95 Z","bounds":[71.6,56.8,93.9,86.05],"direction":"curve","weight":32.854808,"revealPath":"M71.86 56.5 Q78.34 73.5 90.58 83.5","revealWidth":14}]]
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU6e7aContext=Readonly<{id:'u6e7a-watergap-hv'}>
export type ReviewedU6e7aGrowingCertificate=Readonly<{syntax:'MQ';T:string;K:string;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU6e7aGrowingPolicy=Readonly<{id:string;kind:'growing-u6e7a-caps';segment:HanjaOutlineSegment;certificate:ReviewedU6e7aGrowingCertificate}>
export type ReviewedU6e7aHVPolicy=Readonly<{id:'u6e7a-7-1';kind:'original-HJ-B-u6e7a';segment:HanjaOutlineSegment;certificate:Readonly<{kind:'source-HJ-B-halfplanes';nativeBranchQuantizationCertified:false;notRasterProof:true}>}>
export type ReviewedU6e7aPolicy=ReviewedU6e7aGrowingPolicy|ReviewedU6e7aHVPolicy
const CONTEXT:ReviewedU6e7aContext=Object.freeze({id:'u6e7a-watergap-hv'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
// 저장된 source-specific 인증만 결박한다. 기존 초기곡률 산술을 재실행하지 않는다.
const TARGETS=deepFreeze([{"pen":1,"mask":1,"id":"u6e7a-1-1","path":"M13.16 10 Q22.16 13.5 26.12 20.5","certificate":{"pen":1,"mask":1,"syntax":"MQ","T":"1/2","K":"1/20","A":["9/1","7/2"],"B":["-126/25","7/2"],"minimumT":"1/2","speedHalfSquaredLower":"695529/10000","cross":"2457/50","chordSquared":"3161929/40000","chordSquaredMinus49":"1201929/40000","curvatureMargin":"94995559291520889/100000000000000","rK":"7/20","cosLower":"751/800","cosMinusRK":"471/800","sufficientInitialArc7":true}},{"pen":2,"mask":1,"id":"u6e7a-2-1","path":"M6.32 33 Q16.04 36.5 19.64 43.5","certificate":{"pen":2,"mask":1,"syntax":"MQ","T":"1/2","K":"1/20","A":["243/25","7/2"],"B":["-153/25","7/2"],"minimumT":"1/2","speedHalfSquaredLower":"719181/10000","cross":"1386/25","chordSquared":"3448669/40000","chordSquaredMinus49":"1488669/40000","curvatureMargin":"64616379494406741/100000000000000","rK":"7/20","cosLower":"751/800","cosMinusRK":"471/800","sufficientInitialArc7":true}},{"pen":3,"mask":1,"id":"u6e7a-3-1","path":"M7.04 66.5 Q19.64 71 18.2 92","certificate":{"pen":3,"mask":1,"syntax":"MQ","T":"1/2","K":"1/12","A":["63/5","9/2"],"B":["-351/25","33/2"],"minimumT":"28515/130381","speedHalfSquaredLower":"20412324/130381","cross":"6777/25","chordSquared":"6280749/40000","chordSquaredMinus49":"4320749/40000","curvatureMargin":"45864288693287205150411/1385233355060213125","rK":"7/12","cosLower":"239/288","cosMinusRK":"71/288","sufficientInitialArc7":true}},{"pen":3,"mask":2,"id":"u6e7a-3-2","path":"M16.4 75 Q17.84 69 32.96 33.5","certificate":{"pen":3,"mask":2,"syntax":"MQ","T":"1/3","K":"1/11","A":["36/25","-6/1"],"B":["342/25","-59/2"],"minimumT":"0/1","speedHalfSquaredLower":"23796/625","cross":"198/5","chordSquared":"11971081/202500","chordSquaredMinus49":"2048581/202500","curvatureMargin":"7572864386844/29541015625","rK":"7/11","cosLower":"193/242","cosMinusRK":"39/242","sufficientInitialArc7":true}}])
const POLICIES:readonly ReviewedU6e7aPolicy[]=Object.freeze([...TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u6e7a-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:deepFreeze({syntax:'MQ' as const,T:t.certificate.T,K:t.certificate.K,initialArcMax:7 as const,storedBounds:t.certificate,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})})),Object.freeze({id:'u6e7a-7-1' as const,kind:'original-HJ-B-u6e7a' as const,segment:FIXED_STROKES[6][0],certificate:Object.freeze({kind:'source-HJ-B-halfplanes' as const,nativeBranchQuantizationCertified:false as const,notRasterProof:true as const})})])
export function reviewedU6e7aContext(strokes:HanjaOutlineStrokes):ReviewedU6e7aContext|null{return sameWhole(strokes)?CONTEXT:null}
/** pen/mask는 기존 StrokeOutlines와 같은 0-based 인덱스다. */
export function reviewedU6e7aPolicy(context:ReviewedU6e7aContext|null,pen:number,mask:number):ReviewedU6e7aPolicy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u6e7a-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU6e7aPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'private 湺 policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'original 湺 guide/width');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU6e7aFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU6e7aNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u6e7aCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 湺 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 湺 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 湺 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 湺 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 湺 SVG coordinate tree')
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
export function measureReviewedU6e7aFrame(policy:ReviewedU6e7aPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU6e7aFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 湺 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 湺 measurement parent required')
  const coordinates=u6e7aCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6e7a-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u6e7a-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 湺 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 湺 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 湺 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('湺 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u6e7a-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU6e7aCaps(policy:ReviewedU6e7aGrowingPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU6e7aNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u6e7a-caps','private four MQ growing policy only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 湺 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 湺 SVG binding tree')
    const coordinates=u6e7aCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6e7a-progress')===String(progress)&&target.getAttribute('data-u6e7a-clip')===clipId&&mask.getAttribute('id')===clipId+'-u6e7a-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u6e7a-measure'&&guide.getAttribute('id')===clipId+'-u6e7a-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u6e7a-growing)'
    if(!bound())throw new Error('Mismatched 湺 SVG binding')
    const frame=measureReviewedU6e7aFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('湺 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('湺 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

const H='M56 12.5 L83.7 12.5 L83.7 14.5 L56 14.5 Z',B='M86.7 13.5 L86.7 44 L80.7 47 L80.7 13.5 Z',J='M80.7 12.5 L83.7 10 L89.2 14.5 L86.7 16.5 L80.7 13.5 Z'
export const REVIEWED_U6E7A_HV_PARTS=Object.freeze({H,B,J})
export type ReviewedU6e7aHVNodes={measurement:SVGPathElement|null;hclip:SVGClipPathElement|null;bclip:SVGClipPathElement|null;hrect:SVGRectElement|null;brect:SVGRectElement|null;ink:SVGGElement|null;hink:SVGPathElement|null;bink:SVGPathElement|null}
export type ReviewedU6e7aHVFrame=ReviewedU6e7aFrame&Readonly<{phase:'H'|'V';alpha:number;hH:number;hV:number}>
/** 元7 policyと同じ native q に基づく二相。UA量子化の単調性/AAを数学的承認しない。 */
export function commitReviewedU6e7aHV(policy:ReviewedU6e7aHVPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU6e7aHVNodes){
 const{measurement,hclip,bclip,hrect,brect,ink,hink,bink}=nodes
 // 完了は別keyの原Pパス。cleanupはこのpartial inkだけを対象にする。
 const reset=()=>{ink?.setAttribute('visibility','hidden');hrect?.setAttribute('width','0');brect?.setAttribute('height','0');for(const k of['progress','length','distance','end-x','end-y','phase','alpha','h-h','h-v'])ink?.removeAttribute('data-source-clip-'+k)}
 reset()
 try{
  source(policy,segment);ensure(policy.kind==='original-HJ-B-u6e7a'&&segment.outline===H+' '+B+' '+J,'only original 湺7 H/B/J')
  ensure(Number.isFinite(progress)&&progress>=0&&progress<=1&&/^[A-Za-z0-9_:.-]+$/.test(clipId),'clip frame/id')
  if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
  const owner=measurement?.ownerSVGElement,defs=measurement?.parentElement,target=defs?.parentElement
  ensure(owner&&measurement&&defs?.localName==='defs'&&target?.localName==='g'&&hclip&&bclip&&hrect&&brect&&ink&&hink&&bink,'clip DOM nodes')
  const coordinates=u6e7aCoordinateBinding([measurement,hclip,bclip,hrect,brect,ink,hink,bink],owner)
  const bound=()=>coordinates()&&defs.parentElement===target&&measurement.parentElement===defs&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6e7a-progress')===String(progress)&&target.getAttribute('data-u6e7a-clip')===clipId&&measurement.getAttribute('data-growing-owner')===clipId&&measurement.getAttribute('id')===clipId+'-u6e7a-measure'&&measurement.getAttribute('d')===segment.revealPath&&measurement.getAttribute('pathLength')===null&&[hclip,bclip].every(n=>n.localName==='clipPath'&&n.parentElement===defs&&n.getAttribute('clipPathUnits')==='userSpaceOnUse')&&hclip.getAttribute('id')===clipId+'-u6e7a-h-clip'&&bclip.getAttribute('id')===clipId+'-u6e7a-b-clip'&&hrect.parentElement===hclip&&brect.parentElement===bclip&&hrect.localName==='rect'&&brect.localName==='rect'&&hrect.getAttribute('x')==='56'&&hrect.getAttribute('y')==='10'&&hrect.getAttribute('height')==='6.5'&&brect.getAttribute('x')==='80.7'&&brect.getAttribute('y')==='13.5'&&brect.getAttribute('width')==='6'&&ink.parentElement===target&&hink.parentElement===ink&&bink.parentElement===ink&&hink.getAttribute('d')===H+' '+J&&bink.getAttribute('d')===B&&hink.getAttribute('clip-path')==='url(#'+clipId+'-u6e7a-h-clip)'&&bink.getAttribute('clip-path')==='url(#'+clipId+'-u6e7a-b-clip)'&&[hclip,bclip,hrect,brect,ink,hink,bink].every(n=>n.getAttribute('data-growing-owner')===clipId)
  ensure(bound(),'exact clip allfields/owner/attrs/frame')
  const base=measureReviewedU6e7aFrame(policy,segment,progress,measurement)
  ensure(bound(),'clip changed during native read')
  const phase=base.point.y<=13.5?'H' as const:'V' as const
  const alpha=phase==='H'?Math.max(0,Math.min(1,(base.point.x-56.019999999999996)/(83.74000000000001-56.019999999999996))):Math.max(0,Math.min(1,(base.point.y-13.5)/(53/2)))
  const frame:ReviewedU6e7aHVFrame=Object.freeze({...base,phase,alpha,hH:phase==='H'?56+(166/5)*alpha:89.2,hV:phase==='V'?13.5+(67/2)*alpha:13.5})
  const w=frame.hH-56,h=frame.hV-13.5;hrect.setAttribute('width',String(w));brect.setAttribute('height',String(h))
  for(const[k,v]of Object.entries({progress,length:frame.L,distance:frame.d,'end-x':frame.point.x,'end-y':frame.point.y,phase,alpha,'h-h':frame.hH,'h-v':frame.hV}))ink.setAttribute('data-source-clip-'+k,String(v))
  ensure(bound()&&hrect.getAttribute('width')===String(w)&&brect.getAttribute('height')===String(h),'clip changed before visibility')
  ink.setAttribute('visibility','visible');return{status:'visible' as const,frame,cleanup:reset}
 }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U6E7A_SOURCE=Object.freeze({geometrySHA256:'643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6',full5SHA256:'ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9',identityShape:'actual-full5-id3',initialProofSHA256:'1b022108cad73df9d24c1fcb9e565a707d35260e934e59201e0cec930aa09efd',newGeometry:0,newTailPartitions:0,actualComponentApproval:false,runtimeApplied:false})
