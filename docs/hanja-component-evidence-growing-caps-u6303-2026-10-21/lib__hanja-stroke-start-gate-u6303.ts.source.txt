import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 挃 고정9p11m24·2m1 MLQ 초기L78 및 네 개 source-specific Q만 허용한다. */
const FIXED_STROKES=[[{"outline":"M7.15 26.5 L38.7 26.5 L38.7 28.5 L7.15 28.5 Z M38.7 26.5 L26.7 27.5 L32.7 21.5 Z","bounds":[7.15,21.5,38.7,28.5],"direction":"right","weight":31.5375}],[{"outline":"M25.75 8 L25.75 85.5 L19.75 85.5 L19.75 7 Z M25.75 8 L27.25 9 L24.75 10.5 Z M19.75 85.5 L25.75 85.5 L24.55 87.3 L22.75 88.5 L20.95 87.3 Z M25.75 85.5 L25.65 86.75 L25.45 88 L25.05 89.2 L24.4 90.35 L23.6 91.35 L22.6 92.15 L21.45 92.8 L20.25 93.2 L19 93.4 L17.75 93.5 L17.75 87.5 L18.35 87.45 L18.8 87.35 L19.1 87.25 L19.25 87.2 L19.35 87.1 L19.45 87 L19.5 86.85 L19.6 86.55 L19.7 86.1 L19.75 85.5 Z","bounds":[17.75,7,27.25,93.5],"direction":"curve","weight":85.071068,"revealPath":"M22.75 7.5 L22.75 85.5 Q22.75 90.5 17.75 90.5","revealWidth":14},{"outline":"M17.75 90.5 L10.75 89 L10.75 87.5 L17.75 87.5 Z","bounds":[10.75,87.5,17.75,90.5],"direction":"left","weight":7}],[{"outline":"M6.7 58.05 L9.9 56.7 L13.1 55.4 L16.3 54.05 L19.45 52.75 L22.6 51.4 L25.75 50.05 L28.9 48.75 L32.05 47.45 L35.25 46.25 L38.45 45.1 L38.9 45.85 L36.15 47.9 L33.3 49.85 L30.4 51.65 L27.5 53.45 L24.5 55.2 L21.5 56.9 L18.45 58.6 L15.4 60.25 L12.3 61.9 L9.2 63.5 Z M9.2 63.5 L5.8 58.45 L6.7 58.05 Z M9.2 63.5 L11.3 60.9 L10.75 64.45 Z","bounds":[5.8,45.1,38.9,64.45],"direction":"curve","weight":34.815666,"revealPath":"M7.525 61 Q23.8375 53.5 38.7 45.5","revealWidth":14}],[{"outline":"M40.75 15.5 L92.35 15.5 L92.35 17.5 L40.75 17.5 Z M92.35 15.5 L80.35 16.5 L86.35 10.5 Z","bounds":[40.75,10.5,92.35,17.5],"direction":"right","weight":51.6}],[{"outline":"M66.65 16.5 L66.05 17.7 L64.65 20.3 L63.2 22.95 L61.65 25.65 L60.05 28.35 L58.3 31.1 L56.5 33.9 L54.6 36.7 L52.6 39.55 L50.45 42.4 L48.1 45.2 L47.35 44.75 L48.8 41.4 L50.3 38.2 L51.75 35.1 L53.2 32.05 L54.6 29.1 L55.95 26.2 L57.2 23.35 L58.4 20.6 L59.5 17.9 L60.05 16.5 Z","bounds":[47.35,16.5,66.65,45.2],"direction":"curve","weight":32.484152,"revealPath":"M63.337500000000006 16.5 Q57.425 29.5 47.75 45","revealWidth":14},{"outline":"M40.7 43.45 L44.55 42.9 L48.45 42.35 L52.45 41.75 L56.55 41.2 L60.75 40.6 L65.05 40.05 L69.4 39.45 L73.85 38.9 L78.45 38.45 L83.1 38.05 L83.3 38.9 L78.8 40.3 L74.4 41.55 L70 42.7 L65.75 43.75 L61.55 44.8 L57.4 45.75 L53.4 46.7 L49.45 47.6 L45.55 48.5 L41.75 49.35 Z M41.75 49.35 L39.7 43.6 L40.7 43.45 Z M41.75 49.35 L44.45 47.35 L43 50.65 Z","bounds":[39.7,38.05,83.3,50.65],"direction":"curve","weight":43.209535,"revealPath":"M40.7625 46.5 Q60.1125 43 83.225 38.5","revealWidth":14}],[{"outline":"M73.65 25 L76.15 26.7 L78.4 28.5 L80.5 30.45 L82.4 32.45 L84.15 34.5 L85.7 36.65 L87.15 38.8 L88.4 41.05 L89.55 43.35 L90.5 45.65 L84.75 47.4 L84.2 45.35 L83.5 43.25 L82.7 41.15 L81.75 39 L80.6 36.9 L79.35 34.75 L77.95 32.55 L76.45 30.3 L74.8 28 L73.05 25.65 Z M90.5 45.65 L90.2 47.95 L88.45 49.4 L86.2 49.15 L84.75 47.4 Z","bounds":[73.05,25,90.5,49.4],"direction":"curve","weight":27.486406,"revealPath":"M73.0125 25 Q84.3 35.5 88.0625 48","revealWidth":14}],[{"outline":"M41.8 65.5 L88.6 65.5 L88.6 67.5 L41.8 67.5 Z M88.6 65.5 L76.6 66.5 L82.6 60.5 Z","bounds":[41.8,60.5,88.6,67.5],"direction":"right","weight":46.7625}],[{"outline":"M66.85 50 L66.85 90.5 L60.85 90.5 L60.85 49 Z M66.85 50 L68.35 51 L65.85 52.5 Z","bounds":[60.85,49,68.35,90.5],"direction":"down","weight":40}],[{"outline":"M32.15 88.5 L93.95 88.5 L93.95 90.5 L32.15 90.5 Z M93.95 88.5 L81.95 89.5 L87.95 83.5 Z","bounds":[32.15,83.5,93.95,90.5],"direction":"right","weight":61.8125}]] as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU6303Context=Readonly<{id:'u6303-five-curves'}>
export type ReviewedU6303Certificate=Readonly<{syntax:'Q'|'MLQ';initialArcMax:7;parameterBound:number;curvatureBound:number;firstL?:number;followingQ314Unchanged?:true;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedU6303Policy=Readonly<{id:string;kind:'growing-u6303-caps';segment:HanjaOutlineSegment;certificate:ReviewedU6303Certificate}>
const CONTEXT:ReviewedU6303Context=Object.freeze({id:'u6303-five-curves'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type U6303Spec=Readonly<{pen:number;mask:number;path:string;kind:'Q'|'MLQ';K?:string;lambdaLower?:number;crossUpper?:number}>
const TARGETS:readonly U6303Spec[]=Object.freeze([{"pen":2,"mask":1,"path":"M22.75 7.5 L22.75 85.5 Q22.75 90.5 17.75 90.5","kind":"MLQ"},{"pen":3,"mask":1,"path":"M7.525 61 Q23.8375 53.5 38.7 45.5","kind":"Q","K":"1/500","lambdaLower":309,"crossUpper":20},{"pen":5,"mask":1,"path":"M63.337500000000006 16.5 Q57.425 29.5 47.75 45","kind":"Q","K":"1/100","lambdaLower":203,"crossUpper":35},{"pen":5,"mask":2,"path":"M40.7625 46.5 Q60.1125 43 83.225 38.5","kind":"Q","K":"1/1000","lambdaLower":386,"crossUpper":7},{"pen":6,"mask":1,"path":"M73.0125 25 Q84.3 35.5 88.0625 48","kind":"Q","K":"1/50","lambdaLower":201,"crossUpper":102}].map(t=>Object.freeze(t)) as U6303Spec[])
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:U6303Spec):Rat[]{
 const pattern=spec.kind==='MLQ'?/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/:/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/
 const match=pattern.exec(spec.path)
 ensure(match,'fixed canonical source M/L/Q complete arity');return match.slice(1).map(D)
}
function certificate(spec:U6303Spec,s:HanjaOutlineSegment):ReviewedU6303Certificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]]
 if(spec.kind==='MLQ'){
  ensure(n.length===8&&spec.pen===2&&spec.mask===1,'only exact source 2m1 MLQ')
  const v=vector(P1,P0),q=vector(P2,P1),cross=minus(times(v[0],q[1]),times(v[1],q[0])),joinDot=dotR(v,q)
  ensure(v[0][0]===0n&&rString(v[1])==='78/1'&&greater(dotR(v,v),R(49)),'source first L78 before arc7')
  ensure(cross[0]===0n&&rString(joinDot)==='390/1','source unchanged L/Q tangent cross0 dot390')
  return Object.freeze({syntax:'MLQ',initialArcMax:7,parameterBound:7/78,curvatureBound:0,firstL:78,followingQ314Unchanged:true,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({firstL:'78/1',initialArc:'7/1',cross:'0/1',joinDot:'390/1',curvatureUpper:'0/1',scope:'first L only; later Q314 is not an initial-arc theorem'})})
 }
 ensure(spec.K&&spec.lambdaLower!==undefined&&spec.crossUpper!==undefined,'private own Q bounds')
 const [kn,kd]=spec.K.split('/').map(BigInt),A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,3),K=R(kn,kd),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta),lo=R(spec.lambdaLower),upper=R(spec.crossUpper)
 ensure(greater(lambda,lo)&&greater(upper,absR(cross))&&greater(chord2,R(49)),'own Q conservative lambda/cross/chord arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lo),lo))),square(upper)),'own Q exact conservative curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/3,curvatureBound:Number(kn)/Number(kd),exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquared:rString(lambda),lambdaLower:rString(lo),crossUpper:rString(upper),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u6303-'+t.pen+'-'+t.mask,kind:'growing-u6303-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU6303Context(strokes:HanjaOutlineStrokes):ReviewedU6303Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU6303Policy(context:ReviewedU6303Context|null,pen:number,mask:number):ReviewedU6303Policy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU6303Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 挃 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed five target guide required');const start=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (?:Q|L)/.exec(spec.path);ensure(start,'fixed original M decimal spelling');return{q0:[Number(start[1]),Number(start[2])],r:7,minimumLength:spec.kind==='MLQ'?78:7}}
export type ReviewedU6303Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU6303Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function canCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 挃 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 挃 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 挃 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 挃 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 挃 SVG coordinate tree')
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
export function measureReviewedU6303CapsFrame(policy:ReviewedU6303Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU6303Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 挃 source progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 挃 measurement parent required')
  const coordinates=canCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u6303-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 挃 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 挃 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 挃 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('挃 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 MLQ/Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU6303Caps(policy:ReviewedU6303Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU6303Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 挃 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 挃 SVG binding tree')
    const coordinates=canCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u6303-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u6303-measure'&&guide.getAttribute('id')===clipId+'-u6303-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u6303-growing)'
    if(!bound())throw new Error('Mismatched 挃 SVG binding')
    const frame=measureReviewedU6303CapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('挃 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('挃 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
