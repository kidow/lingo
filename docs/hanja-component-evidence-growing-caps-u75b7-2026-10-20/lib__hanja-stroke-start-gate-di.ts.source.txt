import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 疷 원10p13m26·여섯 source-specific 인증만 허용. 기존 정책 모듈은 불변. */
const FIXED_STROKES=[[{"outline":"M58 7 L58 20.5 L52 20.5 L52 6 Z M58 7 L59.5 8 L57 9.5 Z","bounds":[52,6,59.5,20.5],"direction":"down","weight":13}],[{"outline":"M24 18.5 L93 18.5 L93 20.5 L24 20.5 Z M93 18.5 L81 19.5 L87 13.5 Z","bounds":[24,13.5,93,20.5],"direction":"right","weight":69}],[{"outline":"M27 18.5 L27 49 L21 49 L21 15.5 Z M21 49 L27 49 L25.8 50.8 L24 52 L22.2 50.8 Z M27 49 L26.65 55.25 L26 61.15 L24.95 66.7 L23.6 71.85 L21.85 76.6 L19.75 80.95 L17.3 84.9 L14.45 88.35 L11.3 91.35 L7.75 93.85 L7.2 93.1 L9.95 90 L12.35 86.7 L14.5 83.15 L16.35 79.3 L17.85 75.1 L19.1 70.6 L20 65.75 L20.65 60.5 L20.95 54.95 L21 49 Z","bounds":[7.2,15.5,27,93.85],"direction":"curve","weight":76.96051,"revealPath":"M24 19.5 L24 49 Q24 80.5 7.5 93.5","revealWidth":14}],[{"outline":"M7.65 26.9 L9 27.75 L10.4 28.6 L11.75 29.6 L13 30.75 L14.15 32.05 L15.2 33.5 L16.15 35.05 L17.05 36.7 L17.85 38.45 L18.55 40.3 L12.7 41.7 L12.45 40.05 L12.15 38.45 L11.8 36.95 L11.35 35.45 L10.85 34.05 L10.25 32.7 L9.6 31.35 L8.9 30.05 L8.1 28.75 L7.1 27.65 Z M18.55 40.3 L18.15 42.55 L16.3 43.95 L14.05 43.55 L12.7 41.7 Z","bounds":[7.1,26.9,18.55,43.95],"direction":"curve","weight":17.923448,"revealPath":"M7 27 Q13.5 32 16 42.5","revealWidth":14}],[{"outline":"M6.35 61 L7.7 60.6 L9.15 60.15 L10.7 59.6 L12.3 58.95 L13.95 58.25 L15.65 57.45 L17.45 56.6 L19.3 55.7 L21.25 54.75 L23.2 53.6 L23.75 54.35 L22.15 55.95 L20.6 57.55 L19.05 59 L17.55 60.35 L16 61.6 L14.5 62.8 L13 63.85 L11.5 64.85 L10 65.75 L8.55 66.55 Z M8.55 66.55 L5.4 61.4 L6.35 61 Z M8.55 66.55 L10.8 64.05 L10.05 67.6 Z","bounds":[5.4,53.6,23.75,67.6],"direction":"curve","weight":19.293781,"revealPath":"M7 64 Q14.5 61 23.5 54","revealWidth":14}],[{"outline":"M79.6 34 L76 35.05 L72.3 36 L68.6 36.85 L64.8 37.65 L61 38.35 L57.15 38.95 L53.3 39.4 L49.35 39.75 L45.4 39.95 L41.35 39.95 L41.25 39.1 L45.1 38.1 L48.95 37.1 L52.7 36.2 L56.4 35.2 L60.1 34.2 L63.7 33.15 L67.25 32.05 L70.8 30.85 L74.25 29.6 L77.65 28.35 Z M77.2 28.5 L82.5 33 L79.6 34 Z M82.5 33 L82.6 34.55 L79.2 33.1 Z","bounds":[41.25,28.35,82.6,39.95],"direction":"curve","weight":38.749395,"revealPath":"M79.14 31.025 Q61.14 37.225 41.34 39.55","revealWidth":14}],[{"outline":"M44.3 38.55 L44.3 82 L38.3 82 L38.3 35.55 Z","bounds":[38.3,35.55,44.3,82],"direction":"down","weight":41.4625},{"outline":"M32.1 80.65 L34.8 80.1 L37.65 79.5 L40.6 78.85 L43.65 78.1 L46.8 77.3 L50.05 76.45 L53.4 75.55 L56.85 74.6 L60.45 73.7 L64.2 72.8 L64.5 73.65 L61.15 75.5 L57.8 77.15 L54.5 78.65 L51.3 80.05 L48.15 81.35 L45.05 82.55 L42.05 83.65 L39.15 84.65 L36.3 85.6 L33.5 86.5 Z M33.5 86.5 L31.1 80.9 L32.1 80.65 Z M33.5 86.5 L36.05 84.3 L34.85 87.7 Z","bounds":[31.1,72.8,64.5,87.7],"direction":"curve","weight":33.704977,"revealPath":"M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625","revealWidth":14}],[{"outline":"M41.3 55.95 L91.35 55.95 L91.35 57.95 L41.3 57.95 Z M91.35 55.95 L79.35 56.95 L85.35 50.95 Z","bounds":[41.3,50.95,91.35,57.95],"direction":"right","weight":50.04}],[{"outline":"M66.3 35.25 L66.5 43.25 L67.1 50.55 L68.2 57.1 L69.75 62.95 L71.75 68.1 L74.25 72.55 L77.25 76.35 L80.8 79.6 L85 82.25 L89.85 84.35 L87.85 90 L82.15 87.55 L77.15 84.35 L72.85 80.45 L69.25 75.85 L66.3 70.65 L64.05 64.8 L62.3 58.35 L61.15 51.25 L60.5 43.6 L60.3 35.25 Z","bounds":[60.3,35.25,89.85,90],"direction":"curve","weight":57.875031,"revealPath":"M63.3 35.2875 C63.3 63.575 70.14 80.625 88.86 87.2125","revealWidth":14},{"outline":"M89.85 84.35 L91.5 85.9 L91.65 88.2 L90.1 89.85 L87.85 90 Z","bounds":[87.85,84.35,91.65,90],"direction":"right","weight":3.8},{"outline":"M88.85 84.7 L85.85 84.7 L88.85 71.7 L89.85 71.7 Z","bounds":[85.85,71.7,89.85,84.7],"direction":"up","weight":13}],[{"outline":"M34.85 90.05 L77.3 90.05 L77.3 92.05 L34.85 92.05 Z M77.3 90.05 L65.3 91.05 L71.3 85.05 Z","bounds":[34.85,85.05,77.3,92.05],"direction":"right","weight":42.48}]] as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&a.bounds.every((v,i)=>Object.is(v,b.bounds[i])):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k]))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&strokes.every((m,p)=>Array.isArray(m)&&m.length===FIXED_STROKES[p].length&&m.every((s,i)=>sameSegment(s,FIXED_STROKES[p][i])))}
export type ReviewedDiContext=Readonly<{id:'u75b7-six-curves'}>
export type ReviewedDiCertificate=Readonly<{syntax:'MLQ'|'Q'|'Q7'|'C';initialArcMax:7;firstLine?:number;parameterBound?:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedDiPolicy=Readonly<{id:string;kind:'growing-di-caps';segment:HanjaOutlineSegment;certificate:ReviewedDiCertificate}>
const CONTEXT:ReviewedDiContext=Object.freeze({id:'u75b7-six-curves'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type DiSpec=Readonly<{pen:number;mask:number;kind:ReviewedDiCertificate['syntax'];path:string}>
const TARGETS:readonly DiSpec[]=Object.freeze([{"pen":3,"mask":1,"kind":"MLQ","path":"M24 19.5 L24 49 Q24 80.5 7.5 93.5"},{"pen":4,"mask":1,"kind":"Q","path":"M7 27 Q13.5 32 16 42.5"},{"pen":5,"mask":1,"kind":"Q","path":"M7 64 Q14.5 61 23.5 54"},{"pen":6,"mask":1,"kind":"Q","path":"M79.14 31.025 Q61.14 37.225 41.34 39.55"},{"pen":7,"mask":2,"kind":"Q7","path":"M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625"},{"pen":9,"mask":1,"kind":"C","path":"M63.3 35.2875 C63.3 63.575 70.14 80.625 88.86 87.2125"}].map(t=>Object.freeze(t as DiSpec)))
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:DiSpec):Rat[]{
 const num='(-?\\d+(?:\\.\\d+)?)',patterns={Q:'^M'+num+' '+num+' Q'+num+' '+num+' '+num+' '+num+'$',Q7:'^M'+num+' '+num+' Q'+num+' '+num+' '+num+' '+num+'$',MLQ:'^M'+num+' '+num+' L'+num+' '+num+' Q'+num+' '+num+' '+num+' '+num+'$',C:'^M'+num+' '+num+' C'+num+' '+num+' '+num+' '+num+' '+num+' '+num+'$'}
 const match=new RegExp(patterns[spec.kind]).exec(spec.path);ensure(match,'fixed canonical M/L/Q/C arity');return match.slice(1).map(D)
}
function certificate(spec:DiSpec,s:HanjaOutlineSegment):ReviewedDiCertificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source guide/width/direction')
 const n=sourceNumbers(spec),points:Point[]=Array.from({length:n.length/2},(_,i)=>[n[2*i],n[2*i+1]]),[P0,P1,P2,P3]=points
 let firstLine:number|undefined,parameterBound:number|undefined,curvatureBound:number,bounds:Record<string,string>
 if(spec.kind==='MLQ'){
  const v=vector(P1,P0),q=vector(P2,P1)
  ensure(rString(v[0])==='0/1'&&rString(v[1])==='59/2'&&greater(v[1],R(7)),'exact original initial L29.5')
  ensure(rString(q[0])==='0/1'&&greater(q[1],R(0)),'original L/Q positive vertical tangent')
  firstLine=29.5;curvatureBound=0;bounds={firstL:'59/2',curvatureUpper:'0/1',rKUpper:'0/1'}
 }else if(spec.kind==='C'){
  const v0=vector(P1,P0),v1=vector(P2,P1),v2=vector(P3,P2),dv0=vector(v1,v0),dv1=vector(v2,v1),T=R(1,8),u=minus(R(1),T)
  ensure(greater(v0[1],v1[1])&&greater(v1[1],v2[1])&&greater(v2[1],R(0)),'exact decreasing positive cubic derivative Bernstein y controls')
  const ymin=times(R(3),plus(plus(times(square(u),v0[1]),times(times(times(R(2),u),T),v1[1])),times(square(T),v2[1])))
  const a=dotR(dv0,dv0),b=dotR(dv1,dv1),M2=times(R(36),greater(a,b)?a:b)
  const chord:Point=[0,1].map(i=>minus(plus(plus(times(times(square(u),u),P0[i]),times(times(times(R(3),square(u)),T),P1[i])),plus(times(times(times(R(3),u),square(T)),P2[i]),times(times(square(T),T),P3[i]))),P0[i])) as unknown as Point,chord2=dotR(chord,chord),K=R(1,50),kr=R(7,50)
  ensure(rString(ymin)==='39153/512'&&rString(M2)==='360861561/40000'&&rString(chord2)==='8536867781/83886080','exact original C9 rational bounds')
  ensure(greater(chord2,R(49))&&greater(times(square(K),square(square(ymin))),M2),'C9 arc7 and curvature bound')
  const cosLower=minus(R(1),times(R(1,2),square(kr)));ensure(greater(cosLower,kr),'C9 initial normal-strip cosine lower bound')
  parameterBound=1/8;curvatureBound=1/50;bounds={tUpper:'1/8',derivativeYLower:rString(ymin),secondDerivativeNormSquaredUpper:rString(M2),chordSquared:rString(chord2),curvatureUpper:'1/50',rKUpper:'7/50',cosLower:rString(cosLower)}
 }else{
  const params=spec.kind==='Q7'?{t:R(1,4),norm:14,cross:36,K:R(1,150)}:spec.pen===4?{t:R(1,2),norm:8,cross:56,K:R(11,200)}:spec.pen===5?{t:R(1,2),norm:8,cross:26,K:R(13,500)}:{t:R(1,4),norm:19,cross:81,K:R(3,500)}
  const A=vector(P1,P0),B:Point=[0,1].map(i=>plus(minus(P0[i],times(R(2),P1[i])),P2[i])) as unknown as Point,t=params.t,lo=R(params.norm),cross=absR(minus(times(A[0],B[1]),times(A[1],B[0]))),K=params.K,kr=times(R(7),K)
  const chord:Point=[0,1].map(i=>plus(times(times(R(2),A[i]),t),times(B[i],square(t)))) as unknown as Point,chord2=dotR(chord,chord),speed2=dotR(A,A),AB=dotR(A,B)
  ensure(greater(AB,R(0))&&greater(speed2,square(lo)),'fixed Q speed norm increasing and strict lower bound')
  ensure(greater(R(params.cross),cross)&&greater(times(times(R(2),times(square(lo),lo)),K),R(params.cross)),'exact original Q curvature upper bound')
  ensure(greater(chord2,R(49)),'arc7 occurs before fixed t')
  const cosLower=minus(R(1),times(R(1,2),square(kr)));ensure(greater(cosLower,kr),'initial normal-strip cosine lower bound')
  parameterBound=Number(t[0])/Number(t[1]);curvatureBound=Number(K[0])/Number(K[1]);bounds={tUpper:rString(t),halfSpeedLower:rString(lo),crossAbs:rString(cross),crossAbsUpper:String(params.cross)+'/1',curvatureUpper:rString(K),chordSquared:rString(chord2),rKUpper:rString(kr),cosLower:rString(cosLower)}
 }
 return Object.freeze({syntax:spec.kind,initialArcMax:7,firstLine,parameterBound,curvatureBound,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze(bounds)})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u75b7-'+t.pen+'-'+t.mask,kind:'growing-di-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedDiContext(strokes:HanjaOutlineStrokes):ReviewedDiContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedDiPolicy(context:ReviewedDiContext|null,pen:number,mask:number):ReviewedDiPolicy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedDiPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 疷 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed six target guide required');const n=sourceNumbers(spec);return{q0:[Number(n[0][0])/Number(n[0][1]),Number(n[1][0])/Number(n[1][1])],r:7,minimumLength:policy.certificate.firstLine??7}}
export type ReviewedDiFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedDiNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function diCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 疷 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 疷 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 疷 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 疷 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 疷 SVG coordinate tree')
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
export function measureReviewedDiCapsFrame(policy:ReviewedDiPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedDiFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 疷 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 疷 measurement parent required')
  const coordinates=diCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-di-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 疷 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 疷 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 疷 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('疷 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedDiCaps(policy:ReviewedDiPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedDiNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 疷 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 疷 SVG binding tree')
    const coordinates=diCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-di-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-di-measure'&&guide.getAttribute('id')===clipId+'-di-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-di-growing)'
    if(!bound())throw new Error('Mismatched 疷 SVG binding')
    const frame=measureReviewedDiCapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('疷 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('疷 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
