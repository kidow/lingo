import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 紽 고정11p14m37·11m1 MLQL 첫L50.5 및 네 source-specific Q만 허용한다. */
const FIXED_STROKES=[[{"outline":"M28.2 9.75 L27 11.75 L25.8 13.65 L24.55 15.6 L23.25 17.5 L21.9 19.4 L20.55 21.25 L19.15 23.05 L17.65 24.85 L16.1 26.55 L14.45 28.25 L13.75 27.7 L14.65 25.6 L15.55 23.5 L16.45 21.4 L17.4 19.35 L18.35 17.3 L19.3 15.25 L20.2 13.2 L21.1 11.15 L21.95 9.15 L22.8 7.1 Z M22.6 7.55 L23.1 6.55 L28.2 9.75 Z M28.2 9.75 L29.1 11.35 L26.15 11.55 Z","bounds":[13.75,6.55,29.1,28.25],"direction":"curve","weight":23.133107,"revealPath":"M25.75 8 Q20.5 18.5 14.125 28","revealWidth":14},{"outline":"M6.9 22.35 L8.75 23.2 L10.55 24.1 L12.3 25.1 L13.9 26.25 L15.4 27.55 L16.8 28.9 L18.05 30.4 L19.25 32 L20.3 33.7 L21.25 35.5 L15.65 37.6 L15.2 36.05 L14.65 34.5 L14 33 L13.25 31.55 L12.4 30.1 L11.45 28.65 L10.35 27.25 L9.15 25.85 L7.9 24.4 L6.4 23.1 Z M21.25 35.5 L21.15 37.8 L19.5 39.4 L17.2 39.25 L15.65 37.6 Z","bounds":[6.4,22.35,21.25,39.4],"direction":"curve","weight":20.070189,"revealPath":"M6.25 22.5 Q15.25 28 19 38","revealWidth":14}],[{"outline":"M38.95 21.4 L36.75 24.95 L34.45 28.45 L32.15 31.95 L29.8 35.45 L27.35 38.85 L24.85 42.25 L22.3 45.6 L19.7 48.9 L16.95 52.1 L14.1 55.25 L13.35 54.7 L15.4 51 L17.5 47.35 L19.6 43.75 L21.7 40.15 L23.8 36.55 L25.85 32.95 L27.85 29.35 L29.85 25.7 L31.8 22.1 L33.75 18.45 Z M33.5 18.85 L34 17.95 L38.95 21.4 Z M38.95 21.4 L39.75 23 L36.85 23.05 Z","bounds":[13.35,17.95,39.75,55.25],"direction":"curve","weight":42.23169,"revealPath":"M36.625 19.5 Q26.125 38 13.75 55","revealWidth":14},{"outline":"M7.1 53.45 L10.1 53.2 L13.1 52.9 L16.05 52.6 L19 52.25 L21.95 51.9 L24.85 51.5 L27.75 51.1 L30.65 50.7 L33.55 50.35 L36.5 50.05 L36.7 50.9 L34.05 52.15 L31.3 53.3 L28.55 54.3 L25.7 55.2 L22.8 56.05 L19.9 56.8 L16.95 57.55 L13.95 58.2 L10.9 58.8 L7.85 59.4 Z M7.85 59.4 L6.1 53.55 L7.1 53.45 Z M7.85 59.4 L10.65 57.5 L9.05 60.75 Z","bounds":[6.1,50.05,36.7,60.75],"direction":"curve","weight":30.226489,"revealPath":"M7 56.5 Q22.75 54.5 36.625 50.5","revealWidth":14}],[{"outline":"M29.4 39 L30.95 40.05 L32.5 41.2 L33.95 42.5 L35.3 43.9 L36.55 45.45 L37.7 47.1 L38.75 48.9 L39.7 50.75 L40.6 52.7 L41.35 54.75 L35.55 56.3 L35.2 54.4 L34.8 52.55 L34.3 50.8 L33.75 49.1 L33.1 47.45 L32.4 45.8 L31.6 44.25 L30.75 42.65 L29.85 41.1 L28.8 39.65 Z M41.35 54.75 L41.05 57.05 L39.25 58.45 L36.95 58.1 L35.55 56.3 Z","bounds":[28.8,39,41.35,58.45],"direction":"curve","weight":20.652255,"revealPath":"M28.75 39 Q35.875 45.5 38.875 57","revealWidth":14}],[{"outline":"M27.25 53.5 L27.25 91.5 L21.25 94.5 L21.25 53.5 Z","bounds":[21.25,53.5,27.25,94.5],"direction":"down","weight":38.5}],[{"outline":"M18.15 64.3 L17.65 67.1 L17 69.85 L16.2 72.6 L15.25 75.25 L14.2 77.9 L13 80.5 L11.7 83.05 L10.2 85.55 L8.5 87.9 L6.6 90.2 L5.85 89.75 L6.85 87 L7.8 84.35 L8.7 81.7 L9.5 79.1 L10.2 76.55 L10.8 73.95 L11.3 71.4 L11.7 68.8 L12 66.25 L12.2 63.65 Z M12.15 64.15 L12.3 62.6 L18.15 64.3 Z M18.15 64.3 L19.55 65.45 L16.9 66.65 Z","bounds":[5.85,62.6,19.55,90.2],"direction":"curve","weight":27.986604,"revealPath":"M15.25 63.5 Q13.75 77.5 6.25 90","revealWidth":14}],[{"outline":"M29.75 61 L31.3 62.2 L32.8 63.45 L34.15 64.9 L35.45 66.5 L36.6 68.2 L37.7 70 L38.7 71.95 L39.6 74 L40.4 76.15 L41.1 78.4 L35.25 79.6 L34.95 77.55 L34.55 75.55 L34.1 73.6 L33.6 71.75 L33.05 69.95 L32.4 68.2 L31.7 66.5 L30.9 64.85 L30.1 63.2 L29.1 61.65 Z M41.1 78.4 L40.65 80.65 L38.8 81.95 L36.55 81.5 L35.25 79.6 Z","bounds":[29.1,61,41.1,81.95],"direction":"curve","weight":21.636558,"revealPath":"M29.125 61 Q35.875 68 38.5 80.5","revealWidth":14}],[{"outline":"M68 8.9 L68 23.7 L62 23.7 L62 7.9 Z M68 8.9 L69.5 9.9 L67 11.4 Z","bounds":[62,7.9,69.5,23.7],"direction":"down","weight":14.26}],[{"outline":"M44.05 17.35 L44.4 20.25 L44.7 22.9 L44.85 25.4 L44.9 27.7 L44.8 29.85 L44.6 31.8 L44.25 33.6 L43.75 35.3 L43.05 36.8 L42.1 38.2 L37.85 34 L38.4 33.6 L39.05 32.9 L39.7 31.95 L40.3 30.65 L40.9 29.1 L41.45 27.25 L41.95 25.15 L42.4 22.8 L42.85 20.25 L43.15 17.4 Z M42.1 38.2 L40 39.05 L37.9 38.25 L37 36.1 L37.85 34 Z","bounds":[37,17.35,44.9,39.05],"direction":"curve","weight":20.812119,"revealPath":"M43.61 16.903999999999996 Q43.92 32.222 38.96 37.19","revealWidth":14}],[{"outline":"M43.9 22.1 L88.55 22.1 L88.55 24.1 L43.9 24.1 Z M91.35 24.15 L90.75 25.15 L90.1 26.2 L89.35 27.3 L88.6 28.45 L87.75 29.7 L86.9 30.95 L85.9 32.25 L84.9 33.6 L83.75 35 L82.75 36.55 L81.95 36.15 L82.6 34.4 L83.05 32.7 L83.5 31.05 L83.95 29.55 L84.35 28.1 L84.7 26.7 L85.05 25.4 L85.3 24.2 L85.55 23.1 L85.75 22.05 Z M85.55 22.1 L88.55 19.6 L94.05 24.1 L91.55 25.6 L85.55 28.1 Z","bounds":[43.9,19.6,94.05,36.55],"direction":"curve","weight":59.267013,"revealPath":"M43.92 23.114 L88.56 23.114 Q86.7 28.082000000000004 82.36 36.362","revealWidth":14}],[{"outline":"M85.4 47.85 L82.45 49.2 L79.45 50.55 L76.4 51.85 L73.25 53.15 L70 54.45 L66.7 55.75 L63.35 57 L59.9 58.2 L56.3 59.35 L52.65 60.4 L52.3 59.55 L55.55 57.6 L58.8 55.75 L62 54 L65.15 52.3 L68.2 50.6 L71.25 48.95 L74.2 47.35 L77.1 45.7 L79.9 44.1 L82.65 42.55 Z M82.2 42.75 L86.8 47.15 L85.4 47.85 Z M86.8 47.15 L86.85 48.8 L83.8 47.55 Z","bounds":[52.3,42.55,86.85,60.4],"direction":"curve","weight":35.341194,"revealPath":"M84.5 45 Q70 52.5 52.5 60","revealWidth":14}],[{"outline":"M55.5 33 L55.5 83 L49.5 83 L49.5 32 Z M55.5 33 L57 34 L54.5 35.5 Z M49.5 83 L55.5 83 L54.3 84.8 L52.5 86 L50.7 84.8 Z M55.5 83 L55.5 83.6 L55.6 84.05 L55.7 84.35 L55.75 84.5 L55.85 84.6 L55.95 84.7 L56.1 84.75 L56.4 84.85 L56.85 84.95 L57.5 85 L57.5 91 L56.2 90.9 L54.95 90.7 L53.75 90.3 L52.6 89.65 L51.6 88.85 L50.8 87.85 L50.15 86.7 L49.75 85.5 L49.55 84.25 L49.5 83 Z M57.5 85 L59.6 85.9 L60.5 88 L59.6 90.1 L57.5 91 Z M57.5 85 L90 85 L90 91 L57.5 91 Z M90 85 L91.8 86.2 L93 88 L91.8 89.8 L90 91 Z","bounds":[49.5,32,93,91],"direction":"curve","weight":90.071068,"revealPath":"M52.5 32.5 L52.5 83 Q52.5 88 57.5 88 L90 88","revealWidth":14},{"outline":"M90 85 L87 85 L90 72.5 L91 72.5 Z","bounds":[87,72.5,91,85],"direction":"up","weight":12.5}]]
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU7d3dContext=Readonly<{id:'u7d3d-five-targets'}>
export type ReviewedU7d3dCertificate=Readonly<{syntax:'Q'|'MLQL';initialArcMax:7;parameterBound:number;curvatureBound:number;firstL?:number;followingSourceTailSplitPreserved?:true;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedU7d3dPolicy=Readonly<{id:string;kind:'growing-u7d3d-caps';segment:HanjaOutlineSegment;certificate:ReviewedU7d3dCertificate}>
const CONTEXT:ReviewedU7d3dContext=Object.freeze({id:'u7d3d-five-targets'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type U7d3dSpec=Readonly<{pen:number;mask:number;path:string;kind:'Q'|'MLQL';K?:string;T?:string;lambdaLower?:number;crossUpper?:number}>
const TARGETS:readonly U7d3dSpec[]=Object.freeze([{"pen":11,"mask":1,"path":"M52.5 32.5 L52.5 83 Q52.5 88 57.5 88 L90 88","kind":"MLQL"},{"pen":1,"mask":1,"path":"M25.75 8 Q20.5 18.5 14.125 28","kind":"Q","K":"1/20","T":"1/3","lambdaLower":130,"crossUpper":18},{"pen":1,"mask":2,"path":"M6.25 22.5 Q15.25 28 19 38","kind":"Q","K":"1/10","T":"1/2","lambdaLower":70,"crossUpper":70},{"pen":2,"mask":1,"path":"M36.625 19.5 Q26.125 38 13.75 55","kind":"Q","K":"1/20","T":"1/3","lambdaLower":434,"crossUpper":51},{"pen":2,"mask":2,"path":"M7 56.5 Q22.75 54.5 36.625 50.5","kind":"Q","K":"1/20","T":"1/3","lambdaLower":232,"crossUpper":36}].map(t=>Object.freeze(t)) as U7d3dSpec[])
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:U7d3dSpec):Rat[]{const pattern=spec.kind==='MLQL'?/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/:/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/;const match=pattern.exec(spec.path);ensure(match,'own canonical M/L/Q complete arity');return match.slice(1).map(D)}
function certificate(spec:U7d3dSpec,s:HanjaOutlineSegment):ReviewedU7d3dCertificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]]
 if(spec.kind==='MLQL'){
 ensure(n.length===10&&spec.pen===11&&spec.mask===1,'only exact 11m1 MLQL');const v=vector(P1,P0),q=vector(P2,P1),cross=minus(times(v[0],q[1]),times(v[1],q[0])),joinDot=dotR(v,q);ensure(v[0][0]===0n&&rString(v[1])==='101/2'&&greater(dotR(v,v),R(49)),'own firstL50.5 before arc7');ensure(cross[0]===0n&&rString(joinDot)==='505/2','own original L/Q tangent');return Object.freeze({syntax:'MLQL',initialArcMax:7,parameterBound:14/101,curvatureBound:0,firstL:50.5,followingSourceTailSplitPreserved:true,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({firstL:'101/2',initialArc:'7/1',cross:'0/1',joinDot:'505/2',curvatureUpper:'0/1',scope:'first L only; original later Q/L and UP split unchanged'})})
 }
 ensure(spec.K&&spec.T&&spec.lambdaLower!==undefined&&spec.crossUpper!==undefined,'private own Q bounds')
 const [kn,kd]=spec.K.split('/').map(BigInt),A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(...spec.T.split('/').map(BigInt) as [bigint,bigint]),K=R(kn,kd),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta),lo=R(spec.lambdaLower),upper=R(spec.crossUpper)
 ensure(greater(lambda,lo)&&greater(upper,absR(cross))&&greater(chord2,R(49)),'own Q conservative lambda/cross/chord arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lo),lo))),square(upper)),'own Q exact conservative curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:Number(T[0])/Number(T[1]),curvatureBound:Number(kn)/Number(kd),exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquared:rString(lambda),lambdaLower:rString(lo),crossUpper:rString(upper),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u7d3d-'+t.pen+'-'+t.mask,kind:'growing-u7d3d-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU7d3dContext(strokes:HanjaOutlineStrokes):ReviewedU7d3dContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU7d3dPolicy(context:ReviewedU7d3dContext|null,pen:number,mask:number):ReviewedU7d3dPolicy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU7d3dPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 紽 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed five target guide required');const start=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (?:Q|L)/.exec(spec.path);ensure(start,'fixed original M decimal spelling');return{q0:[Number(start[1]),Number(start[2])],r:7,minimumLength:spec.kind==='MLQL'?50.5:7}}
export type ReviewedU7d3dFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU7d3dNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function canCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 紽 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 紽 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 紽 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 紽 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 紽 SVG coordinate tree')
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
export function measureReviewedU7d3dCapsFrame(policy:ReviewedU7d3dPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU7d3dFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 紽 source progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 紽 measurement parent required')
  const coordinates=canCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u7d3d-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 紽 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 紽 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 紽 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('紽 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 MLQ/Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU7d3dCaps(policy:ReviewedU7d3dPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU7d3dNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 紽 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 紽 SVG binding tree')
    const coordinates=canCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u7d3d-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u7d3d-measure'&&guide.getAttribute('id')===clipId+'-u7d3d-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u7d3d-growing)'
    if(!bound())throw new Error('Mismatched 紽 SVG binding')
    const frame=measureReviewedU7d3dCapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('紽 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('紽 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
