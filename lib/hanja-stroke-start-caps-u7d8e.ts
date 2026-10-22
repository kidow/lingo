import{isReviewedU7dc5ReuseContext,type ReviewedU7dc5ReuseContext}from'./hanja-stroke-source-reuse-u7dc5.ts'
import type{HanjaOutlineSegment,HanjaOutlineStrokes}from'./hanja-stroke-outline.ts'
import{reviewedU7d8eContext as exactWholeContext}from'./hanja-stroke-start-gate-u7d8e.ts'
/** 綎 원1m1/2m1/12m1 전용 growth. 저장된 고유 초기증명만 결박하며 현재native/AA/전체연속성 승인은 아니다. */
function freeze(v:unknown):void{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v)}}
function ensure(v:unknown,m:string):asserts v{if(!v)throw new Error(m)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
export const REVIEWED_U7D8E_STARTS_SOURCE={"sourceRoot":"u7d8e","sourceFile":"docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json","sourceSHA256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","fixture":"docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json","fixtureSHA256":"cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c","geometrySHA256":"43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67","pens":13,"masks":15,"polygons":35,"targets":[[1,1],[2,1],[12,1]],"sourcePGuideWidthWeightPreserved":true,"sourcePartition":false,"storedOwnMathOnly":true,"mathGenerationRuns":0,"oldMathLoopsRepeated":0,"nativeApproval":false,"actualComponentApproval":false,"runtimeApplied":false,"priorROOTObservationsHistoricalOnly":true,"inputSHA256":{"docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json":"cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c","docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/config.json":"96e2a43d5020485f6b75e8c12dca8e07825ae9c15719d6f444557ef9beb632f0","docs/hanja-u7d8e-start-geometry-proof-2026-10-21/README.md":"40cd9f09bf92c580af78385c6ed3d727cb030cb2c143db5aa29672b3416b3e7c","docs/hanja-source-native-hold-u7d8e-startcaps-terminal-2026-10-21/hold.json":"1822634ff57513cbf3d947a2e0c919ed16a0d312b435279afa441eca01acc7b5","docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/render.mjs":"0c1f0ac9e154186745b32a5ab575096663e4e3740fad83f920bdd4f839e4c4ca","docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/review.json":"43cff5019266b20a807b9106f565da1b7aab7bfb6c78c113e66fd3a135357bb7","lib/hanja-stroke-start-gate-u7d8e.ts":"3d084b8e321ecbc1fcfe4c6f195e0d3d12d72791beba1a68f182cd3c4822bf51"},"identity":{"sourceRoot":"u7d8e","sourceProofFile":"engine-whole-u7d8e.json","sourceProofFileSha256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25"},"actualFull5Keys":["engineRevision","engineHashes","groups","trace","defaults"]} as const
export type ReviewedU7d8eStartsContext=Readonly<{id:'u7d8e-three-starts'}>
export type ReviewedU7d8eStartsPolicy=Readonly<{id:string;kind:'growing-u7d8e-starts';pen:number;mask:number;segment:HanjaOutlineSegment;certificate:Readonly<Record<string,unknown>>}>
const CONTEXT:ReviewedU7d8eStartsContext=Object.freeze({id:'u7d8e-three-starts'})
const POLICIES:readonly ReviewedU7d8eStartsPolicy[]=[{"id":"u7d8e-1-1","pen":1,"mask":1,"kind":"growing-u7d8e-starts","segment":{"outline":"M26 9.65 L24.95 11.6 L23.85 13.55 L22.75 15.45 L21.6 17.4 L20.4 19.25 L19.2 21.15 L17.9 22.95 L16.6 24.75 L15.2 26.5 L13.75 28.2 L12.95 27.75 L13.7 25.65 L14.45 23.55 L15.2 21.5 L15.95 19.45 L16.75 17.4 L17.5 15.4 L18.3 13.35 L19.05 11.3 L19.75 9.3 L20.45 7.25 Z M20.25 7.7 L20.75 6.6 L26 9.65 Z M26 9.65 L26.95 11.15 L24.05 11.5 Z","bounds":[12.95,6.6,26.95,28.2],"direction":"curve","weight":22.394321,"revealPath":"M23.45 8 Q18.9 18.5 13.375 28","revealWidth":14},"certificate":{"kind":"fixed-Q-initial","T":"1/2","K":"1/100","minimumT":"1/2","halfSpeedSquaredLower":"802409/6400","chordSquaredMinus49":"2023489/25600","curvatureMargin":"373331548254503929/655360000000000","cosLowerMinus7K":"18551/20000","cross":"1183/80","cosLower":"19951/20000","storedOwnProof":true,"notRasterProof":true,"notPolygonConnectivityProof":true,"notFullSweepProof":true}},{"id":"u7d8e-2-1","pen":2,"mask":1,"kind":"growing-u7d8e-starts","segment":{"outline":"M35.3 21.25 L33.4 24.8 L31.4 28.35 L29.35 31.85 L27.25 35.3 L25.15 38.75 L22.95 42.15 L20.7 45.5 L18.4 48.8 L15.95 52.05 L13.4 55.2 L12.65 54.75 L14.35 51.05 L16.1 47.45 L17.9 43.85 L19.65 40.25 L21.45 36.7 L23.2 33.1 L24.9 29.5 L26.6 25.85 L28.3 22.25 L29.95 18.6 Z M29.7 19.05 L30.2 18.05 L35.3 21.25 Z M35.3 21.25 L36.25 22.8 L33.3 23.05 Z","bounds":[12.65,18.05,36.25,55.2],"direction":"curve","weight":40.660554,"revealPath":"M32.875 19.5 Q23.775 38 13.05 55","revealWidth":14},"certificate":{"kind":"fixed-Q-initial","T":"1/2","K":"1/100","minimumT":"1/2","halfSpeedSquaredLower":"2645249/6400","chordSquaredMinus49":"9469041/25600","curvatureMargin":"17257462126068373249/655360000000000","cosLowerMinus7K":"18551/20000","cross":"3497/80","cosLower":"19951/20000","storedOwnProof":true,"notRasterProof":true,"notPolygonConnectivityProof":true,"notFullSweepProof":true}},{"id":"u7d8e-12-1","pen":12,"mask":1,"kind":"growing-u7d8e-starts","segment":{"outline":"M43 43.5 L55.8 43.5 L55.8 45.5 L43 45.5 Z M58.8 44.7 L57.85 52.35 L56.55 59.45 L54.85 65.95 L52.75 71.85 L50.2 77.15 L47.3 81.85 L44 85.95 L40.3 89.3 L36.2 92 L31.75 93.9 L31.4 93.05 L35.15 90.4 L38.5 87.3 L41.5 83.8 L44.1 79.8 L46.4 75.3 L48.4 70.2 L50 64.6 L51.3 58.4 L52.2 51.6 L52.8 44.25 Z M52.8 43.5 L55.8 41 L61.3 45.5 L58.8 47 L52.8 49.5 Z","bounds":[31.4,41,61.3,93.9],"direction":"curve","weight":67.486235,"revealPath":"M43 44.5 L55.825 44.5 Q52.975 83.5 31.6 93.5","revealWidth":14},"certificate":{"kind":"MLQ-first-straight-prefix","firstLine":"513/40","firstLineNumeric":12.825,"curvatureBound":0,"tangent":[1,0],"initialArcMax":7,"initialCorners":0,"notLaterCornerProof":true,"storedOwnProof":true,"notRasterProof":true,"notPolygonConnectivityProof":true,"notFullSweepProof":true}}]
freeze(POLICIES);freeze(REVIEWED_U7D8E_STARTS_SOURCE)
export function reviewedU7d8eStartsContext(strokes:HanjaOutlineStrokes):ReviewedU7d8eStartsContext|null{return exactWholeContext(strokes)?CONTEXT:null}
export function reviewedU7d8eStartsPolicy(context:ReviewedU7d8eStartsContext|null,pen:number,mask:number):ReviewedU7d8eStartsPolicy|null{return context===CONTEXT?POLICIES.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
function source(policy:ReviewedU7d8eStartsPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameJSON(segment,policy.segment),'Private exact 綎 start policy and all source fields required');return{q0:policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),r:7,minimumLength:policy.pen===12?12.825:7}}
export type ReviewedU7d8eStartsFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU7d8eStartsNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function startsCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 綎 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 綎 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 綎 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 綎 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 綎 SVG coordinate tree')
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
/** L과 endpoint는 pathLength 없는 동일 connected 원 path에서 같은 frame에 읽는다. */
export function measureReviewedU7d8eStartsFrame(policy:ReviewedU7d8eStartsPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU7d8eStartsFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 綎 start progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 綎 measurement parent required')
  const coordinates=startsCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-stroke-reveal-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u7d8e-starts-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 綎 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 綎 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 綎 guide or invalid endpoint')
  if(guide!.getTotalLength()!==L||!exact())throw new Error('Changing 綎 native length/frame')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU7d8eStartsCaps(policy:ReviewedU7d8eStartsPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU7d8eStartsNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u7d8e-starts','private three source-specific growing policies')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 綎 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 綎 SVG binding tree')
    const coordinates=startsCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-stroke-reveal-progress')===String(progress)&&mask.getAttribute('id')===clipId+'-u7d8e-starts-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u7d8e-starts-measure'&&guide.getAttribute('id')===clipId+'-u7d8e-starts-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u7d8e-starts-growing)'
    if(!bound()||startCap===endCap||startCap.localName!=='circle'||endCap.localName!=='circle'||[startCap,endCap].some(n=>n.getAttribute('fill')!=='white'||n.getAttribute('stroke')!=='none')||ink.getAttribute('stroke')!=='none'||ink.getAttribute('fill-rule')!=='nonzero')throw new Error('Mismatched 綎 SVG binding')
    const frame=measureReviewedU7d8eStartsFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('綎 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound()||startCap.getAttribute('r')!==String(frame.rho)||endCap.getAttribute('r')!==String(frame.rho)||startCap.getAttribute('cx')!==String(frame.q0[0])||startCap.getAttribute('cy')!==String(frame.q0[1])||endCap.getAttribute('cx')!==String(frame.point.x)||endCap.getAttribute('cy')!==String(frame.point.y))throw new Error('綎 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

/** 緅先頭2つのQ1だけ。綎12m1や他glyphへ移譲しない。 */
export function reviewedU7dc5StartsAliasPolicy(context:ReviewedU7dc5ReuseContext|null,pen:number,mask:number):ReviewedU7d8eStartsPolicy|null{return isReviewedU7dc5ReuseContext(context)&&(pen===0||pen===1)&&mask===0?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null}
