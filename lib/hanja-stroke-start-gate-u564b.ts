import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 噋 actual full5/id5+selectedbody3 · new15p17m33 · Q9m2만의 조건부 source-specific 인증. 전체fields 고정/native·runtime 미승인. */
const FIXED_STROKES=[[{"outline":"M13.2 20.85 L13.2 73.1 L7.2 76.1 L7.2 17.85 Z","bounds":[7.2,17.85,13.2,76.1],"direction":"down","weight":44.28}],[{"outline":"M10.2 20.85 L26.7 20.85 L26.7 22.85 L10.2 22.85 Z M29.7 21.85 L29.7 70.1 L23.7 73.1 L23.7 21.85 Z M23.7 20.85 L26.7 18.35 L32.2 22.85 L29.7 24.85 L23.7 21.85 Z","bounds":[10.2,18.35,32.2,73.1],"direction":"curve","weight":60.7955,"revealPath":"M10.229750000000001 21.86 L26.745250000000002 21.86 L26.745250000000002 66.14","revealWidth":14}],[{"outline":"M10.2 65.1 L26.7 65.1 L26.7 67.1 L10.2 67.1 Z","bounds":[10.2,65.1,26.7,67.1],"direction":"right","weight":16.5155}],[{"outline":"M51.4 7.5 L51.4 21 L45.4 21 L45.4 6.5 Z M51.4 7.5 L52.9 8.5 L50.4 10 Z","bounds":[45.4,6.5,52.9,21],"direction":"down","weight":13}],[{"outline":"M33.2 19 L65.05 19 L65.05 21 L33.2 21 Z M65.05 19 L53.05 20 L59.05 14 Z","bounds":[33.2,14,65.05,21],"direction":"right","weight":31.878}],[{"outline":"M43.05 27.5 L43.05 44 L37.05 47 L37.05 24.5 Z","bounds":[37.05,24.5,43.05,47],"direction":"down","weight":13}],[{"outline":"M40.05 27.5 L56.75 27.5 L56.75 29.5 L40.05 29.5 Z M59.75 28.5 L59.75 42.5 L53.75 45.5 L53.75 28.5 Z M53.75 27.5 L56.75 25 L62.25 29.5 L59.75 31.5 L53.75 28.5 Z","bounds":[40.05,25,62.25,45.5],"direction":"curve","weight":29.6635,"revealPath":"M40.092 28.5 L56.7555 28.5 L56.7555 41.5","revealWidth":14}],[{"outline":"M40.05 40.5 L56.75 40.5 L56.75 42.5 L40.05 42.5 Z","bounds":[40.05,40.5,56.75,42.5],"direction":"right","weight":16.6635}],[{"outline":"M35.35 52.5 L58.2 52.5 L58.2 54.5 L35.35 54.5 Z","bounds":[35.35,52.5,58.2,54.5],"direction":"right","weight":22.82175},{"outline":"M60.65 55.15 L59.55 56.45 L58.4 57.7 L57.3 58.85 L56.15 59.95 L55.05 61 L53.9 62 L52.8 62.9 L51.65 63.75 L50.45 64.5 L49.45 65.3 L48.8 64.65 L49.5 63.6 L50.1 62.4 L50.75 61.2 L51.4 59.95 L52.1 58.7 L52.75 57.4 L53.5 56.05 L54.2 54.65 L54.95 53.25 L55.7 51.8 Z M55.2 52.5 L58.2 50 L63.7 54.5 L61.2 56 L55.2 58.5 Z","bounds":[48.8,50,63.7,65.3],"direction":"curve","weight":14.637816,"revealPath":"M58.204499999999996 53.5 Q53.49525 60.5 49.148250000000004 65","revealWidth":14}],[{"outline":"M52.1 61.5 L52.1 86 L46.1 86 L46.1 60.5 Z M52.1 61.5 L53.6 62.5 L51.1 64 Z M46.1 86 L52.1 86 L50.9 87.8 L49.1 89 L47.3 87.8 Z M52.1 86 L52.05 87.25 L51.85 88.5 L51.45 89.7 L50.8 90.85 L50 91.85 L49 92.65 L47.85 93.3 L46.65 93.7 L45.4 93.9 L44.1 94 L44.1 88 L44.75 87.95 L45.2 87.85 L45.5 87.75 L45.65 87.7 L45.75 87.6 L45.85 87.5 L45.9 87.35 L46 87.05 L46.1 86.6 L46.1 86 Z","bounds":[44.1,60.5,53.6,94],"direction":"curve","weight":32.071068,"revealPath":"M49.148250000000004 61 L49.148250000000004 86 Q49.148250000000004 91 44.148250000000004 91","revealWidth":14},{"outline":"M44.1 91 L34.1 89.5 L34.1 88 L44.1 88 Z","bounds":[34.1,88,44.1,91],"direction":"left","weight":10}],[{"outline":"M34.15 73.45 L37.4 72.9 L40.6 72.3 L43.7 71.7 L46.75 71.1 L49.7 70.4 L52.6 69.75 L55.5 69.05 L58.3 68.35 L61.05 67.65 L63.8 67.05 L64.15 67.9 L61.75 69.45 L59.2 70.85 L56.55 72.15 L53.8 73.35 L50.95 74.5 L48 75.55 L44.95 76.55 L41.85 77.55 L38.65 78.45 L35.35 79.3 Z M35.35 79.3 L33.2 73.65 L34.15 73.45 Z M35.35 79.3 L38 77.25 L36.65 80.6 Z","bounds":[33.2,67.05,64.15,80.6],"direction":"curve","weight":31.037998,"revealPath":"M34.296 76.5 Q51.32175 73 64.0005 67.5","revealWidth":14}],[{"outline":"M77.35 7.9 L76.35 12.9 L75.25 17.7 L74.05 22.4 L72.7 26.9 L71.25 31.2 L69.7 35.4 L68 39.4 L66.15 43.2 L64.1 46.8 L61.9 50.2 L61.1 49.75 L62.4 46 L63.65 42.15 L64.9 38.2 L66.1 34.15 L67.2 30 L68.25 25.65 L69.15 21.2 L70 16.65 L70.75 11.9 L71.4 7 Z M71.35 7.5 L71.55 6 L77.35 7.9 Z M77.35 7.9 L78.65 9.15 L75.95 10.25 Z","bounds":[61.1,6,78.65,50.2],"direction":"curve","weight":44.91406,"revealPath":"M74.47469999999998 7 Q70.5831 32.5 61.5027 50","revealWidth":14}],[{"outline":"M69.25 30.5 L93.25 30.5 L93.25 32.5 L69.25 32.5 Z M93.25 30.5 L83.25 31.5 L88.25 26 Z","bounds":[69.25,26,93.25,32.5],"direction":"right","weight":23.9982}],[{"outline":"M87.15 31.7 L86 41.2 L84.4 50 L82.35 58.1 L79.9 65.55 L76.95 72.25 L73.55 78.25 L69.7 83.45 L65.4 87.95 L60.7 91.6 L55.55 94.35 L55.1 93.6 L59.5 90.1 L63.5 86.05 L67.1 81.45 L70.3 76.3 L73.1 70.45 L75.5 64 L77.5 56.8 L79.15 49 L80.35 40.45 L81.2 31.25 Z","bounds":[55.1,31.25,87.15,94.35],"direction":"curve","weight":68.842614,"revealPath":"M84.2037 31.5 Q80.3121 80 55.340999999999994 94","revealWidth":14}],[{"outline":"M67.8 36.95 L69.25 44.2 L70.85 50.9 L72.7 57.15 L74.75 62.85 L77.1 68 L79.65 72.7 L82.5 76.85 L85.6 80.45 L88.95 83.6 L92.55 86.3 L88.75 91.65 L84.75 88.25 L81.2 84.35 L78 80 L75.2 75.2 L72.8 69.95 L70.8 64.25 L69.2 58.1 L67.95 51.5 L67.2 44.5 L66.9 37 Z M88.75 91.65 L92.55 86.3 L94.25 87.45 Z","bounds":[66.9,36.95,94.25,91.65],"direction":"curve","weight":57.458279,"revealPath":"M67.3401 36.5 Q70.9074 75 90.68969999999999 89","revealWidth":14}]];
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU564bContext=Readonly<{id:'u564b-q9'}>
export type ReviewedU564bCertificate=Readonly<{syntax:'Q';initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedU564bPolicy=Readonly<{id:string;kind:'growing-u564b-caps';segment:HanjaOutlineSegment;certificate:ReviewedU564bCertificate}>
const CONTEXT:ReviewedU564bContext=Object.freeze({id:'u564b-q9'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type U564bSpec=Readonly<{pen:number;mask:number;path:string}>
const TARGETS:readonly U564bSpec[]=Object.freeze([{pen:9,mask:2,path:"M58.204499999999996 53.5 Q53.49525 60.5 49.148250000000004 65"}].map(t=>Object.freeze(t)))
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:U564bSpec):Rat[]{
 const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(spec.path)
 ensure(match,'fixed canonical M/Q six-argument source only');return match.slice(1).map(D)
}
function certificate(spec:U564bSpec,s:HanjaOutlineSegment):ReviewedU564bCertificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source Q guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]],A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,2),K=R(1,50),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta)
 ensure(greater(lambda,R(0))&&greater(chord2,R(49)),'own Q initial regularity and arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lambda),lambda))),square(cross)),'own Q exact curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/2,curvatureBound:1/50,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquaredLower:rString(lambda),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u564b-'+t.pen+'-'+t.mask,kind:'growing-u564b-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU564bContext(strokes:HanjaOutlineStrokes):ReviewedU564bContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU564bPolicy(context:ReviewedU564bContext|null,pen:number,mask:number):ReviewedU564bPolicy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU564bPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 噋 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two target guide required');sourceNumbers(spec);const q0=spec.path.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU564bFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU564bNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function u564bCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 噋 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 噋 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 噋 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 噋 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 噋 SVG coordinate tree')
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
export function measureReviewedU564bCapsFrame(policy:ReviewedU564bPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU564bFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 噋 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 噋 measurement parent required')
  const coordinates=u564bCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u564b-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 噋 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 噋 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 噋 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('噋 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU564bCaps(policy:ReviewedU564bPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU564bNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 噋 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 噋 SVG binding tree')
    const coordinates=u564bCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u564b-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u564b-measure'&&guide.getAttribute('id')===clipId+'-u564b-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u564b-growing)'
    if(!bound())throw new Error('Mismatched 噋 SVG binding')
    const frame=measureReviewedU564bCapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('噋 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('噋 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
