/** 蒲 전용14p15m30:7m1 Q-growing /7m2 원P x clip. UA·raster·native 미승인;원P/guide/폭/가중치 불변. */
import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

const FIXED_STROKES:HanjaOutlineStrokes=[[{"outline":"M6.05 14.4 L46.95 14.4 L46.95 16.4 L6.05 16.4 Z M46.95 14.4 L34.95 15.4 L40.95 9.4 Z","bounds":[6.05,9.4,46.95,16.4],"direction":"right","weight":40.905}],[{"outline":"M34.8 5.95 L34.8 23.45 L28.8 26.45 L28.8 4.95 Z M34.8 5.95 L36.3 6.95 L33.8 8.45 Z","bounds":[28.8,4.95,36.3,26.45],"direction":"down","weight":19.5075}],[{"outline":"M53 14.4 L93.9 14.4 L93.9 16.4 L53 16.4 Z M93.9 14.4 L81.9 15.4 L87.9 9.4 Z","bounds":[53,9.4,93.9,16.4],"direction":"right","weight":40.905}],[{"outline":"M71.15 5.95 L71.15 23.45 L65.15 26.45 L65.15 4.95 Z M71.15 5.95 L72.65 6.95 L70.15 8.45 Z","bounds":[65.15,4.95,72.65,26.45],"direction":"down","weight":19.5075}],[{"outline":"M14.2 31.95 L16.15 32.3 L18.05 32.45 L19.8 32.75 L21.5 33.1 L23.05 33.5 L24.55 34 L25.95 34.6 L27.25 35.25 L28.45 36 L29.55 36.85 L25.05 40.8 L24.6 40.1 L24.05 39.3 L23.35 38.55 L22.45 37.75 L21.4 36.9 L20.25 36.1 L18.9 35.25 L17.4 34.4 L15.8 33.5 L14 32.85 Z M29.55 36.85 L30.25 39 L29.25 41.05 L27.1 41.8 L25.05 40.8 Z","bounds":[14,31.95,30.25,41.8],"direction":"curve","weight":16.551771,"revealPath":"M13.6325 32.3 Q23.82 34.855000000000004 28.3025 39.965","revealWidth":14}],[{"outline":"M6.45 48.75 L8.55 49.05 L10.55 49.2 L12.45 49.5 L14.2 49.85 L15.85 50.25 L17.35 50.75 L18.75 51.35 L20.05 52 L21.25 52.8 L22.35 53.7 L17.65 57.45 L17.35 56.8 L16.85 56.1 L16.15 55.3 L15.3 54.55 L14.2 53.7 L12.95 52.9 L11.55 52.05 L9.95 51.2 L8.2 50.3 L6.25 49.6 Z M22.35 53.7 L22.95 55.9 L21.9 57.9 L19.65 58.5 L17.65 57.45 Z","bounds":[6.25,48.75,22.95,58.5],"direction":"curve","weight":16.913995,"revealPath":"M5.89 49.09 Q16.8925 51.645 20.9675 56.755","revealWidth":14}],[{"outline":"M7.25 73.2 L10.05 73.6 L12.6 74.25 L14.95 75.25 L17 76.6 L18.75 78.3 L20.25 80.3 L21.35 82.6 L22.05 85.2 L22.45 87.95 L22.45 90.95 L16.5 90.35 L16.8 88 L16.85 85.9 L16.65 84 L16.2 82.25 L15.5 80.65 L14.5 79.15 L13.2 77.75 L11.55 76.4 L9.5 75.15 L7.05 74.05 Z M22.45 90.95 L21.35 92.95 L19.15 93.65 L17.15 92.5 L16.5 90.35 Z","bounds":[7.05,73.2,22.45,93.65],"direction":"curve","weight":22.496628,"revealPath":"M6.705 73.545 Q20.9675 76.83 19.3375 92.16","revealWidth":14},{"outline":"M14.45 78.7 L15.2 77.4 L16.2 75.85 L17.45 73.9 L19.05 71.6 L20.95 68.85 L23.2 65.7 L25.75 62.15 L28.65 58.2 L31.95 53.9 L35.65 49.2 L36.4 49.7 L33.55 54.9 L30.9 59.65 L28.55 63.95 L26.4 67.75 L24.6 71.1 L23.05 73.95 L21.8 76.4 L20.9 78.4 L20.3 79.9 L20.1 80.75 Z","bounds":[14.45,49.2,36.4,80.75],"direction":"curve","weight":35.625301,"revealPath":"M17.3 79.75 Q18.93 75.37 36.045 49.455","revealWidth":14}],[{"outline":"M35.5 40.75 L93.75 40.75 L93.75 42.75 L35.5 42.75 Z M93.75 40.75 L81.75 41.75 L87.75 35.75 Z","bounds":[35.5,35.75,93.75,42.75],"direction":"right","weight":58.24}],[{"outline":"M45.8 51 L45.8 91.35 L39.8 94.35 L39.8 48 Z","bounds":[39.8,48,45.8,94.35],"direction":"down","weight":40.88}],[{"outline":"M42.8 51 L84.4 51 L84.4 53 L42.8 53 Z M87.4 52 L87.4 86.4 L81.4 86.4 L81.4 52 Z M81.4 51 L84.4 48.5 L89.9 53 L87.4 55 L81.4 52 Z M81.4 86.4 L87.4 86.4 L86.2 88.2 L84.4 89.4 L82.6 88.2 Z M87.4 86.4 L87.3 87.7 L87.1 88.95 L86.7 90.15 L86.05 91.25 L85.25 92.3 L84.25 93.1 L83.1 93.7 L81.9 94.1 L80.65 94.35 L79.4 94.4 L79.4 88.4 L80 88.35 L80.45 88.3 L80.75 88.2 L80.9 88.1 L81 88.05 L81.1 87.95 L81.15 87.75 L81.25 87.5 L81.35 87 L81.4 86.4 Z M79.4 91.4 L74.4 89.9 L74.4 88.4 L79.4 88.4 Z","bounds":[42.8,48.5,89.9,94.4],"direction":"curve","weight":83.091068,"revealPath":"M42.8 52.01000000000001 L84.4 52.01000000000001 L84.4 86.43 Q84.4 91.43 79.4 91.43","revealWidth":14}],[{"outline":"M42.8 61.55 L84.4 61.55 L84.4 63.55 L42.8 63.55 Z","bounds":[42.8,61.55,84.4,63.55],"direction":"right","weight":41.6}],[{"outline":"M42.8 72.15 L84.4 72.15 L84.4 74.15 L42.8 74.15 Z","bounds":[42.8,72.15,84.4,74.15],"direction":"right","weight":41.6}],[{"outline":"M66.6 30.6 L66.6 90.65 L60.6 93.65 L60.6 29.6 Z M66.6 30.6 L68.1 31.6 L65.6 33.1 Z","bounds":[60.6,29.6,68.1,93.65],"direction":"down","weight":62.05}],[{"outline":"M70.9 30.45 L72.3 30.65 L73.7 30.65 L75.1 30.75 L76.45 31 L77.75 31.3 L79.05 31.7 L80.3 32.2 L81.55 32.75 L82.7 33.45 L83.85 34.2 L79.65 38.45 L79.05 37.65 L78.45 36.85 L77.75 36.1 L76.95 35.35 L76.15 34.6 L75.2 33.9 L74.2 33.2 L73.15 32.5 L72 31.8 L70.75 31.35 Z M83.85 34.2 L84.7 36.3 L83.9 38.45 L81.75 39.3 L79.65 38.45 Z","bounds":[70.75,30.45,84.7,39.3],"direction":"curve","weight":14.103734,"revealPath":"M70.36 30.84 Q77.64 32.3 82.84 37.41","revealWidth":14}]]

function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}

freezeFixed()

function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}

function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}

function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}

function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}

export type ReviewedU84b2Context=Readonly<{id:'u84b2-water7-mixed'}>

export type ReviewedU84b2GrowingCertificate=Readonly<{syntax:'Q';initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>

export type ReviewedU84b2MonotoneCertificate=Readonly<{kind:'original-P-x-monotone';vertices:22;chains:2;slabs:21;nonadjacentPairs:209;intersections:0;area:string;areaDifferenceUpper:'631/20 * abs(delta h)';noCapCertificate:true;positiveSourcePOverlap:true;seedStrictInsidePreviousBody:true;idealPreviousFullRoundSeed:true;seedRoundDistanceSquared:string;notPreviousMaskConnectivityProof:true;notRasterProof:true}>

export type ReviewedU84b2GrowingPolicy=Readonly<{id:string;kind:'growing-u84b2-caps';segment:HanjaOutlineSegment;certificate:ReviewedU84b2GrowingCertificate}>

export type ReviewedU84b2MonotonePolicy=Readonly<{id:string;kind:'original-P-x-u84b2';segment:HanjaOutlineSegment;certificate:ReviewedU84b2MonotoneCertificate}>

export type ReviewedU84b2Policy=ReviewedU84b2GrowingPolicy|ReviewedU84b2MonotonePolicy

const CONTEXT:ReviewedU84b2Context=Object.freeze({id:'u84b2-water7-mixed'})

type Rat=readonly [bigint,bigint]

type Point=readonly [Rat,Rat]

type U84b2Spec=Readonly<{pen:number;mask:number;path:string}>

const TARGETS:readonly U84b2Spec[]=Object.freeze([{"pen":7,"mask":1,"path":"M6.705 73.545 Q20.9675 76.83 19.3375 92.16"},{"pen":7,"mask":2,"path":"M17.3 79.75 Q18.93 75.37 36.045 49.455"}].map(t=>Object.freeze(t)))

const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a

const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}

const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}

const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))

const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]

function sourceNumbers(spec:U84b2Spec):Rat[]{
 const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(spec.path)
 ensure(match,'fixed canonical M/Q six-argument source only');return match.slice(1).map(D)
}

function certificate(spec:U84b2Spec,s:HanjaOutlineSegment):ReviewedU84b2GrowingCertificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source Q guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]],A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,2),K=R(1,10),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta)
 ensure(greater(lambda,R(0))&&greater(chord2,R(49)),'own Q initial regularity and arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lambda),lambda))),square(cross)),'own Q exact curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/2,curvatureBound:1/10,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquaredLower:rString(lambda),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}

function monotoneCertificate(s:HanjaOutlineSegment):ReviewedU84b2MonotoneCertificate{
 ensure(sameSegment(s,FIXED_STROKES[6][1]),'only fixed 蒲7m2 P');
 type V=readonly[bigint,bigint];
 const parse=(outline:string):V[]=>{const m=[...outline.matchAll(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)];ensure(m.map(v=>v[0]).join(' ')+' Z'===outline,'canonical single source P');return m.map(v=>{const n=v.slice(1).map(x=>{const a=D(x);ensure(a[0]*100n%a[1]===0n,'source hundredths');return a[0]*100n/a[1]});return[n[0],n[1]]})};
 const vertices=parse(s.outline),previous=parse(FIXED_STROKES[6][0].outline.split(' Z')[0]+' Z');ensure(vertices.length===22&&previous.length===22,'exact source P vertices');
 const orient=(a:V,b:V,c:V)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]),between=(a:bigint,b:bigint,c:bigint)=>c>=(a<b?a:b)&&c<=(a>b?a:b),on=(a:V,b:V,c:V)=>orient(a,b,c)===0n&&between(a[0],b[0],c[0])&&between(a[1],b[1],c[1]),inter=(a:V,b:V,c:V,d:V)=>{const A=orient(a,b,c),B=orient(a,b,d),C=orient(c,d,a),E=orient(c,d,b);return((A>0n&&B<0n||A<0n&&B>0n)&&(C>0n&&E<0n||C<0n&&E>0n))||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b)};
 let pairs=0;for(let i=0;i<22;i++)for(let j=i+1;j<22;j++){if(j===i+1||i===0&&j===21)continue;pairs++;ensure(!inter(vertices[i],vertices[(i+1)%22],vertices[j],vertices[(j+1)%22]),'source nonadjacent P edge intersection')}ensure(pairs===209,'all209source edge pairs');
 ensure(vertices[0][0]===1445n&&vertices[11][0]===3640n,'source P extrema');for(const chain of[vertices.slice(0,12),[vertices[0],...vertices.slice(11).reverse()]])for(let i=1;i<chain.length;i++)ensure(chain[i][0]>chain[i-1][0],'two strict source x chains');
 const xs=[...new Set(vertices.map(v=>String(v[0])))].map(BigInt).sort((a,b)=>a<b?-1:1);ensure(xs.length===22,'21source open slabs');const yAt=(a:V,b:V,x2:bigint):Rat=>R(a[1]*2n*(b[0]-a[0])+(b[1]-a[1])*(x2-2n*a[0]),2n*(b[0]-a[0]));for(let i=0;i<21;i++){const x2=xs[i]+xs[i+1],ys:Rat[]=[];for(let j=0;j<22;j++){let a=vertices[j],b=vertices[(j+1)%22];if(a[0]>b[0])[a,b]=[b,a];if(2n*a[0]<x2&&x2<2n*b[0])ys.push(yAt(a,b,x2))}ensure(ys.length===2&&(greater(ys[0],ys[1])||greater(ys[1],ys[0])),'one positive source interval per slab')}
 const interior=(point:V,polygon:V[])=>{let inside=false;for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length];if(on(a,b,point))return false;if((a[1]>point[1])!==(b[1]>point[1])){const c=orient(a,b,point);if(b[1]>a[1]?c>0n:c<0n)inside=!inside}}return inside};
 ensure(interior(vertices[0],previous),'P2 leftmost seed strictly inside original P1');const witness:V=[1750n,7950n];ensure(interior(witness,previous)&&interior(witness,vertices),'positive source P1/P2 overlap');
 const n1=sourceNumbers(TARGETS[0]),t=R(2,5),u=minus(R(1),t),pointAt:Point=[plus(plus(times(square(u),n1[0]),times(times(times(R(2),u),t),n1[2])),times(square(t),n1[4])),plus(plus(times(square(u),n1[1]),times(times(times(R(2),u),t),n1[3])),times(square(t),n1[5]))],seed:Point=[R(vertices[0][0],100),R(vertices[0][1],100)],distance=vector(seed,pointAt),distance2=dotR(distance,distance);ensure(greater(R(49),distance2),'source seed inside ideal previous full-round sweep');
 let twiceArea=0n;for(let i=0;i<22;i++){const a=vertices[i],b=vertices[(i+1)%22];twiceArea+=a[0]*b[1]-a[1]*b[0]}if(twiceArea<0n)twiceArea=-twiceArea;ensure(twiceArea>0n,'positive source P area');const n=sourceNumbers(TARGETS[1]);ensure(greater(n[2],n[0])&&greater(n[4],n[2]),'own Q2 x strictly increases');ensure(sameSegment(s,FIXED_STROKES[6][1])&&sameJSON(s.bounds,[14.45,49.2,36.4,80.75]),'own exact P bounds');
 return Object.freeze({kind:'original-P-x-monotone',vertices:22,chains:2,slabs:21,nonadjacentPairs:209,intersections:0,area:rString(R(twiceArea,20000)),areaDifferenceUpper:'631/20 * abs(delta h)',noCapCertificate:true,positiveSourcePOverlap:true,seedStrictInsidePreviousBody:true,idealPreviousFullRoundSeed:true,seedRoundDistanceSquared:rString(distance2),notPreviousMaskConnectivityProof:true,notRasterProof:true})
}

const POLICIES:readonly ReviewedU84b2Policy[]=Object.freeze(TARGETS.map((t,i)=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return i===0?Object.freeze({id:'u84b2-'+t.pen+'-'+t.mask,kind:'growing-u84b2-caps' as const,segment,certificate:certificate(t,segment)}):Object.freeze({id:'u84b2-'+t.pen+'-'+t.mask,kind:'original-P-x-u84b2' as const,segment,certificate:monotoneCertificate(segment)})}))

export function reviewedU84b2Context(strokes:HanjaOutlineStrokes):ReviewedU84b2Context|null{return sameWhole(strokes)?CONTEXT:null}

export function reviewedU84b2Policy(context:ReviewedU84b2Context|null,pen:number,mask:number):ReviewedU84b2Policy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}

function source(policy:ReviewedU84b2Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 蒲 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two target guide required');sourceNumbers(spec);const q0=spec.path.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}

export type ReviewedU84b2Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;clipX:number|null;clipWidth:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>

export type ReviewedU84b2Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function u84b2CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 蒲 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 蒲 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 蒲 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 蒲 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 蒲 SVG coordinate tree')
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

export function measureReviewedU84b2Frame(policy:ReviewedU84b2Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU84b2Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 蒲 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 蒲 measurement parent required')
  const coordinates=u84b2CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u84b2-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 蒲 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 蒲 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 蒲 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('蒲 UA start differs from exact M')
  let clipX:number|null=null,clipWidth:number|null=null;if(policy.kind==='original-P-x-u84b2'){ensure(point.x>=17.3-1e-4&&point.x<=36.045+1e-4&&point.y>=49.455-1e-4&&point.y<=79.75+1e-4,'UA point outside fixed Q2 envelope');clipX=progress===0?14.45:progress===1?36.4:Math.max(14.45,Math.min(36.4,14.45+(4390/3749)*(point.x-17.3)));clipWidth=clipX-14.45}return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u84b2-caps'?Math.min(fixed.r,d):null,clipX,clipWidth,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}

export function commitReviewedU84b2Caps(policy:ReviewedU84b2GrowingPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU84b2Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u84b2-caps','private Q1 growing policy only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 蒲 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 蒲 SVG binding tree')
    const coordinates=u84b2CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u84b2-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u84b2-measure'&&guide.getAttribute('id')===clipId+'-u84b2-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u84b2-growing)'
    if(!bound())throw new Error('Mismatched 蒲 SVG binding')
    const frame=measureReviewedU84b2Frame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('蒲 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('蒲 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

export type ReviewedU84b2MonotoneNodes={measurement:SVGPathElement|null;rect:SVGRectElement|null;ink:SVGPathElement|null}

export function commitReviewedU84b2Monotone(policy:ReviewedU84b2MonotonePolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU84b2MonotoneNodes){
 const{measurement,rect,ink}=nodes
 const reset=()=>{ink?.setAttribute('visibility','hidden');rect?.setAttribute('width','0');for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y','data-monotone-threshold'])ink?.removeAttribute(key)}
 reset()
 try{
  source(policy,segment);ensure(policy.kind==='original-P-x-u84b2','only private Q2 original-P policy');ensure(Number.isFinite(progress)&&progress>=0&&progress<=1&&/^[A-Za-z0-9_:.-]+$/.test(clipId),'finite Q2 frame/id')
  // Exact completion is a separate original-P React path with no mask/clip reference.
  if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
  const owner=measurement?.ownerSVGElement,defs=measurement?.parentElement,target=defs?.parentElement,clip=rect?.parentElement
  ensure(owner&&measurement&&rect&&ink&&defs?.localName==='defs'&&target?.localName==='g'&&clip?.localName==='clipPath','original-P SVG binding tree')
  const coordinates=u84b2CoordinateBinding([measurement,rect,ink],owner)
  const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&clip.parentElement===defs&&rect.parentElement===clip&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&clip.getAttribute('id')===clipId+'-u84b2-monotone'&&clip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&rect.getAttribute('id')===clipId+'-u84b2-rect'&&rect.getAttribute('x')==='14.45'&&rect.getAttribute('y')==='49.2'&&rect.getAttribute('height')==='31.55'&&[measurement,rect,ink].every(n=>n.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u84b2-measure'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('clip-path')==='url(#'+clipId+'-u84b2-monotone)'&&ink.getAttribute('mask')===null
  ensure(bound(),'exact source P/clip coordinate binding')
  const frame=measureReviewedU84b2Frame(policy,segment,progress,measurement)
  ensure(frame.clipX!==null&&frame.clipWidth!==null&&bound(),'source P binding changed during UA')
  rect.setAttribute('width',String(frame.clipWidth))
  for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y,'data-monotone-threshold':frame.clipX}))ink.setAttribute(key,String(value))
  ensure(bound(),'source P binding changed before visibility')
  ink.setAttribute('visibility','visible')
  return{status:'visible' as const,frame,cleanup:reset}
 }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

export const U84B2_NATIVE_APPROVAL=false,U84B2_RUNTIME_APPLIED=false

export const REVIEWED_U84B2_SOURCE=Object.freeze({geometrySHA256:'185c361ed9dd5505518ac6bb446fbc8b8ee567eccda754a1639adba42150a8e5',full5SHA256:'c2da80aa5b6392cdf8986c8b6d0383e4ddf47fd854e48b0c496bf9fc17ac4ed0',identityShape:'actual-full5-id3',pens:14,masks:15,polygons:30,newGeometry:0,newTailPartitions:0,Q2CurvatureCapGuardRejected:true,nativeApproval:false,runtimeApplied:false})
