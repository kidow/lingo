import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 澯 원16p17m36·3m1/3m2의 두 source-specific Q 인증만 허용한다. */
const FIXED_STROKES=[[{"outline":"M13.95 9.7 L15.8 10.2 L17.65 10.65 L19.4 11.15 L21.05 11.8 L22.6 12.5 L24.05 13.35 L25.4 14.25 L26.7 15.3 L27.85 16.4 L28.9 17.65 L23.75 20.75 L23.3 19.7 L22.75 18.7 L22.1 17.7 L21.3 16.65 L20.35 15.6 L19.3 14.6 L18.1 13.55 L16.75 12.5 L15.3 11.45 L13.65 10.55 Z M28.9 17.65 L29.2 19.9 L27.9 21.75 L25.6 22.05 L23.75 20.75 Z","bounds":[13.65,9.7,29.2,22.05],"direction":"curve","weight":17.31655,"revealPath":"M13.3575 10 Q22.92 13.5 27.1275 20.5","revealWidth":14}],[{"outline":"M6.7 32.7 L8.7 33.2 L10.65 33.6 L12.45 34.15 L14.2 34.75 L15.8 35.5 L17.3 36.3 L18.7 37.25 L19.95 38.3 L21.1 39.45 L22.15 40.7 L16.85 43.6 L16.5 42.65 L16 41.65 L15.35 40.65 L14.55 39.65 L13.6 38.65 L12.5 37.6 L11.2 36.55 L9.8 35.55 L8.2 34.45 L6.4 33.55 Z M22.15 40.7 L22.35 43 L20.95 44.8 L18.65 45 L16.85 43.6 Z","bounds":[6.4,32.7,22.35,45],"direction":"curve","weight":17.622238,"revealPath":"M6.09 33 Q16.4175 36.5 20.2425 43.5","revealWidth":14}],[{"outline":"M7.45 66.2 L10.15 66.8 L12.7 67.9 L14.95 69.45 L16.9 71.45 L18.55 73.85 L19.85 76.6 L20.8 79.65 L21.45 83.05 L21.8 86.75 L21.8 90.7 L15.8 90.25 L16.1 86.75 L16.1 83.5 L15.9 80.6 L15.45 78 L14.7 75.7 L13.8 73.6 L12.6 71.75 L11.1 70.05 L9.3 68.5 L7.15 67.05 Z M21.8 90.7 L20.75 92.75 L18.6 93.45 L16.55 92.4 L15.8 90.25 Z","bounds":[7.15,66.2,21.8,93.45],"direction":"curve","weight":28.122061,"revealPath":"M6.855 66.5 Q20.2425 71 18.7125 92","revealWidth":14},{"outline":"M13.85 74.25 L14.55 72.6 L15.45 70.45 L16.65 67.8 L18.2 64.55 L20 60.75 L22.1 56.4 L24.55 51.45 L27.3 45.95 L30.45 39.9 L33.95 33.3 L34.8 33.65 L32.15 40.65 L29.75 47.05 L27.55 52.8 L25.6 57.9 L23.9 62.45 L22.45 66.35 L21.35 69.65 L20.5 72.35 L19.95 74.4 L19.7 75.7 Z","bounds":[13.85,33.3,34.8,75.7],"direction":"curve","weight":45.07587,"revealPath":"M16.8 75 Q18.33 69 34.395 33.5","revealWidth":14}],[{"outline":"M51.05 6.9 L51.05 24.2 L45.05 24.2 L45.05 5.9 Z M51.05 6.9 L52.55 7.9 L50.05 9.4 Z","bounds":[45.05,5.9,52.55,24.2],"direction":"down","weight":16.8}],[{"outline":"M48.05 13.55 L63 13.55 L63 15.55 L48.05 15.55 Z M63 13.55 L55 14.55 L59 10.05 Z","bounds":[48.05,10.05,63,15.55],"direction":"right","weight":14.98575}],[{"outline":"M42.85 19.9 L42.3 22.2 L41.55 24.35 L40.7 26.4 L39.7 28.35 L38.5 30.15 L37.2 31.8 L35.75 33.35 L34.15 34.7 L32.45 35.85 L30.65 36.95 L30.1 36.25 L31.4 34.7 L32.45 33.1 L33.45 31.5 L34.3 29.85 L35.05 28.2 L35.65 26.5 L36.15 24.75 L36.5 22.95 L36.75 21.05 L36.9 19.1 Z M36.85 19.6 L37.05 18.1 L42.85 19.9 Z M42.85 19.9 L44.2 21.1 L41.55 22.25 Z","bounds":[30.1,18.1,44.2,36.95],"direction":"curve","weight":20.039965,"revealPath":"M39.98575 19.0375 Q38.448750000000004 30.325 30.3795 36.625","revealWidth":14}],[{"outline":"M39.6 22.75 L57.25 22.75 L57.25 24.75 L39.6 24.75 Z M60.2 24.35 L58.95 28.6 L57.3 32.6 L55.25 36.25 L52.8 39.6 L49.95 42.65 L46.75 45.35 L43.2 47.7 L39.3 49.7 L35.1 51.3 L30.5 52.5 L30.2 51.65 L34.35 49.55 L38.05 47.35 L41.4 45 L44.3 42.45 L46.9 39.75 L49.05 36.85 L50.9 33.75 L52.35 30.45 L53.5 26.9 L54.3 23.15 Z M54.25 22.75 L57.25 20.25 L62.75 24.75 L60.25 26.25 L54.25 28.75 Z","bounds":[30.2,20.25,62.75,52.5],"direction":"curve","weight":56.754881,"revealPath":"M39.6015 23.7625 L57.277 23.7625 Q53.05024999999999 44.5 30.3795 52.1125","revealWidth":14}],[{"outline":"M37.5 29.3 L38.8 29.75 L40.15 30 L41.4 30.3 L42.6 30.7 L43.7 31.15 L44.7 31.65 L45.7 32.2 L46.6 32.85 L47.4 33.6 L48.15 34.45 L42.75 37.1 L42.75 36.6 L42.6 36.05 L42.4 35.4 L42 34.75 L41.5 34 L40.9 33.25 L40.15 32.45 L39.3 31.6 L38.35 30.75 L37.15 30.1 Z M48.15 34.45 L48.25 36.75 L46.75 38.45 L44.5 38.6 L42.75 37.1 Z","bounds":[37.15,29.3,48.25,38.6],"direction":"curve","weight":11.95807,"revealPath":"M36.91175 29.5375 Q43.82825 32.425 46.13375 37.15","revealWidth":14}],[{"outline":"M61.45 10.95 L87 10.95 L87 12.95 L61.45 12.95 Z M89.85 12.85 L87.85 18.1 L85.6 23 L83.1 27.5 L80.35 31.6 L77.3 35.35 L74 38.65 L70.45 41.6 L66.7 44.05 L62.65 46.05 L58.4 47.55 L58.05 46.7 L61.75 44.35 L65.15 41.85 L68.35 39.05 L71.3 36 L74 32.65 L76.5 29 L78.75 25 L80.75 20.7 L82.55 16.05 L84.15 11.05 Z M84 10.95 L87 8.45 L92.5 12.95 L90 14.45 L84 16.95 Z","bounds":[58.05,8.45,92.5,47.55],"direction":"curve","weight":70.974874,"revealPath":"M61.463875 11.986750000000002 L87.01468750000001 11.986750000000002 Q78.7279375 38.48350000000001 58.24125 47.1355","revealWidth":14}],[{"outline":"M62.8 22.05 L66.55 23.65 L70.2 25.5 L73.6 27.65 L76.85 30 L79.95 32.55 L82.85 35.35 L85.6 38.3 L88.2 41.5 L90.6 44.85 L92.85 48.4 L87.55 51.25 L85.75 47.85 L83.8 44.55 L81.7 41.45 L79.4 38.45 L76.95 35.55 L74.35 32.85 L71.6 30.2 L68.65 27.7 L65.6 25.25 L62.35 22.85 Z M92.85 48.4 L93.05 50.7 L91.6 52.5 L89.35 52.7 L87.55 51.25 Z","bounds":[62.35,22.05,93.05,52.7],"direction":"curve","weight":40.802731,"revealPath":"M62.1544375 22.261000000000003 Q80.5694375 31.9945 90.927875 51.191125","revealWidth":14}],[{"outline":"M42.65 50.9 L44.15 51.65 L45.7 52.2 L47.1 52.85 L48.45 53.55 L49.7 54.35 L50.85 55.15 L51.9 56.05 L52.9 57 L53.8 58 L54.6 59.1 L49.15 61.65 L48.95 60.8 L48.65 59.9 L48.25 59 L47.75 58 L47.1 57 L46.35 56 L45.5 54.9 L44.55 53.8 L43.5 52.65 L42.2 51.7 Z M54.6 59.1 L54.7 61.4 L53.15 63.1 L50.9 63.15 L49.15 61.65 Z","bounds":[42.2,50.9,54.7,63.15],"direction":"curve","weight":14.991174,"revealPath":"M42.0375 51.0625 Q49.65 55.5625 52.55 61.75","revealWidth":14}],[{"outline":"M80.7 52.3 L79.85 53.5 L78.9 54.7 L77.9 55.95 L76.85 57.25 L75.65 58.55 L74.4 59.95 L73.05 61.4 L71.6 62.85 L70.05 64.35 L68.45 65.95 L67.75 65.4 L68.85 63.45 L69.8 61.55 L70.75 59.7 L71.6 58 L72.4 56.4 L73.15 54.85 L73.8 53.4 L74.4 52 L74.95 50.7 L75.4 49.5 Z M75.15 49.95 L75.65 49 L80.7 52.3 Z M80.7 52.3 L81.55 53.9 L78.65 54.05 Z","bounds":[67.75,49,81.55,65.95],"direction":"curve","weight":18.266983,"revealPath":"M78.2875 50.5 Q75.025 56.6875 68.1375 65.6875","revealWidth":14}],[{"outline":"M30.05 64.65 L92.05 64.65 L92.05 66.65 L30.05 66.65 Z M92.05 64.65 L80.05 65.65 L86.05 59.65 Z","bounds":[30.05,59.65,92.05,66.65],"direction":"right","weight":61.9875}],[{"outline":"M63.85 47.05 L63.85 90.05 L57.85 93.05 L57.85 46.05 Z M63.85 47.05 L65.35 48.05 L62.85 49.55 Z","bounds":[57.85,46.05,65.35,93.05],"direction":"down","weight":45}],[{"outline":"M62.25 65.65 L61.35 67.1 L59.15 70.5 L56.8 73.65 L54.15 76.65 L51.35 79.45 L48.3 82.05 L45.05 84.4 L41.55 86.55 L37.9 88.45 L34 90.05 L29.85 91.4 L29.5 90.55 L33.15 88.35 L36.55 86.1 L39.75 83.8 L42.75 81.35 L45.5 78.85 L48.05 76.15 L50.35 73.4 L52.45 70.5 L54.35 67.45 L55.25 65.65 Z","bounds":[29.5,65.65,62.25,91.4],"direction":"curve","weight":38.493151,"revealPath":"M58.7125 65.6875 Q49.65 82.5625 29.7125 91","revealWidth":14}],[{"outline":"M62.95 65.8 L65.45 68.2 L67.95 70.5 L70.45 72.65 L73.05 74.7 L75.75 76.55 L78.6 78.35 L81.5 79.95 L84.55 81.4 L87.75 82.75 L91.05 83.95 L88.65 90.1 L85.15 88.45 L81.85 86.65 L78.7 84.7 L75.7 82.55 L72.9 80.25 L70.3 77.8 L67.9 75.2 L65.75 72.45 L63.85 69.5 L62.25 66.35 Z M88.65 90.1 L91.05 83.95 L94.4 85.25 Z","bounds":[62.25,65.8,94.4,90.1],"direction":"curve","weight":34.869659,"revealPath":"M62.3375 65.6875 Q72.4875 80.3125 89.8875 87.0625","revealWidth":14}]] as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedCanContext=Readonly<{id:'u6faf-two-q'}>
export type ReviewedCanCertificate=Readonly<{syntax:'Q';initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedCanPolicy=Readonly<{id:string;kind:'growing-can-caps';segment:HanjaOutlineSegment;certificate:ReviewedCanCertificate}>
const CONTEXT:ReviewedCanContext=Object.freeze({id:'u6faf-two-q'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type CanSpec=Readonly<{pen:number;mask:number;path:string}>
const TARGETS:readonly CanSpec[]=Object.freeze([{"pen":3,"mask":1,"path":"M6.855 66.5 Q20.2425 71 18.7125 92"},{"pen":3,"mask":2,"path":"M16.8 75 Q18.33 69 34.395 33.5"}].map(t=>Object.freeze(t)))
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:CanSpec):Rat[]{
 const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(spec.path)
 ensure(match,'fixed canonical M/Q six-argument source only');return match.slice(1).map(D)
}
function certificate(spec:CanSpec,s:HanjaOutlineSegment):ReviewedCanCertificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source Q guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]],A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,3),K=R(1,11),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta)
 ensure(greater(lambda,R(0))&&greater(chord2,R(49)),'own Q initial regularity and arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lambda),lambda))),square(cross)),'own Q exact curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/3,curvatureBound:1/11,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquaredLower:rString(lambda),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u6faf-'+t.pen+'-'+t.mask,kind:'growing-can-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedCanContext(strokes:HanjaOutlineStrokes):ReviewedCanContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedCanPolicy(context:ReviewedCanContext|null,pen:number,mask:number):ReviewedCanPolicy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedCanPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 澯 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two target guide required');const n=sourceNumbers(spec);return{q0:[Number(n[0][0])/Number(n[0][1]),Number(n[1][0])/Number(n[1][1])],r:7,minimumLength:7}}
export type ReviewedCanFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedCanNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function canCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 澯 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 澯 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 澯 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 澯 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 澯 SVG coordinate tree')
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
export function measureReviewedCanCapsFrame(policy:ReviewedCanPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedCanFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 澯 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 澯 measurement parent required')
  const coordinates=canCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-can-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 澯 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 澯 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 澯 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('澯 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedCanCaps(policy:ReviewedCanPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedCanNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 澯 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 澯 SVG binding tree')
    const coordinates=canCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-can-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-can-measure'&&guide.getAttribute('id')===clipId+'-can-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-can-growing)'
    if(!bound())throw new Error('Mismatched 澯 SVG binding')
    const frame=measureReviewedCanCapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('澯 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('澯 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
