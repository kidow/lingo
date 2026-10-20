import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 牷 원10p11m22·1m1/4m1/5m1/6m2의 네 source-specific Q 인증만 허용한다. */
const FIXED_STROKES=[[{"outline":"M19.75 14.75 L19.15 19.05 L18.45 23.25 L17.6 27.3 L16.65 31.25 L15.6 35.1 L14.4 38.8 L13.1 42.35 L11.65 45.8 L10.05 49.05 L8.2 52.15 L7.4 51.8 L8.25 48.35 L9.15 44.9 L9.95 41.4 L10.75 37.8 L11.45 34.1 L12.1 30.3 L12.65 26.45 L13.1 22.45 L13.5 18.4 L13.8 14.2 Z M13.75 14.7 L13.9 13.1 L19.75 14.75 Z M19.75 14.75 L21.15 15.9 L18.55 17.15 Z","bounds":[7.4,13.1,21.15,52.15],"direction":"curve","weight":39.055863,"revealPath":"M16.85 14 Q14.8 36 7.83 52","revealWidth":14}],[{"outline":"M13.95 31 L42.65 31 L42.65 33 L13.95 33 Z M42.65 31 L30.65 32 L36.65 26 Z","bounds":[13.95,26,42.65,33],"direction":"right","weight":28.7}],[{"outline":"M30.1 7.5 L30.1 91.5 L24.1 94.5 L24.1 6.5 Z M30.1 7.5 L31.6 8.5 L29.1 10 Z","bounds":[24.1,6.5,31.6,94.5],"direction":"down","weight":86}],[{"outline":"M8.3 63 L11.1 62 L14.05 60.9 L17.1 59.8 L20.25 58.65 L23.5 57.45 L26.85 56.3 L30.35 55.05 L34 53.85 L37.75 52.7 L41.65 51.55 L42 52.4 L38.5 54.45 L35.05 56.3 L31.65 58.1 L28.35 59.75 L25.15 61.4 L22.05 62.9 L19.05 64.4 L16.15 65.85 L13.35 67.2 L10.7 68.55 Z M10.7 68.55 L7.4 63.4 L8.3 63 Z M10.7 68.55 L12.85 65.95 L12.2 69.5 Z","bounds":[7.4,51.55,42,69.5],"direction":"curve","weight":35.662866,"revealPath":"M9.059999999999999 66 Q23 60 41.86 52","revealWidth":14}],[{"outline":"M67.7 12.5 L67.2 13.6 L65 18.3 L62.55 22.85 L59.85 27.3 L56.95 31.55 L53.8 35.6 L50.4 39.55 L46.75 43.3 L42.9 46.85 L38.75 50.2 L34.3 53.3 L33.75 52.65 L37.45 48.8 L41 44.95 L44.35 41.1 L47.45 37.1 L50.4 33.1 L53.1 28.95 L55.55 24.7 L57.8 20.35 L59.8 15.9 L61.1 12.5 Z","bounds":[33.75,12.5,67.7,53.3],"direction":"curve","weight":50.625,"revealPath":"M64.425 12.5 Q54.975 36 34.05 53","revealWidth":14}],[{"outline":"M50.55 11.5 L69.15 11.5 L69.15 13.5 L50.55 13.5 Z M69.15 11.5 L59.15 12.5 L64.15 7 Z","bounds":[50.55,7,69.15,13.5],"direction":"right","weight":18.5625},{"outline":"M66.35 12.75 L69.1 17.15 L71.75 21.25 L74.4 25.1 L77 28.65 L79.65 31.95 L82.3 34.9 L85 37.55 L87.7 39.9 L90.45 41.95 L93.2 43.7 L89.6 49.25 L86.6 46.9 L83.75 44.3 L81.05 41.4 L78.4 38.2 L75.9 34.75 L73.55 31 L71.3 27 L69.2 22.7 L67.25 18.05 L65.55 13.1 Z M89.6 49.25 L93.2 43.7 L95.1 44.95 Z","bounds":[65.55,12.75,95.1,49.25],"direction":"curve","weight":42.590169,"revealPath":"M65.775 12.5 Q76.9125 37 91.425 46.5","revealWidth":14}],[{"outline":"M48.9 44.5 L79.25 44.5 L79.25 46.5 L48.9 46.5 Z M79.25 44.5 L67.25 45.5 L73.25 39.5 Z","bounds":[48.9,39.5,79.25,46.5],"direction":"right","weight":30.375}],[{"outline":"M45.5 65.5 L82.65 65.5 L82.65 67.5 L45.5 67.5 Z M82.65 65.5 L70.65 66.5 L76.65 60.5 Z","bounds":[45.5,60.5,82.65,67.5],"direction":"right","weight":37.125}],[{"outline":"M66.75 45.5 L66.75 89.5 L60.75 89.5 L60.75 45.5 Z","bounds":[60.75,45.5,66.75,89.5],"direction":"down","weight":42}],[{"outline":"M37.75 87.5 L90.05 87.5 L90.05 89.5 L37.75 89.5 Z M90.05 87.5 L78.05 88.5 L84.05 82.5 Z","bounds":[37.75,82.5,90.05,89.5],"direction":"right","weight":52.3125}]] as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU7277Context=Readonly<{id:'u7277-four-q'}>
export type ReviewedU7277Certificate=Readonly<{syntax:'Q';initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedU7277Policy=Readonly<{id:string;kind:'growing-u7277-caps';segment:HanjaOutlineSegment;certificate:ReviewedU7277Certificate}>
const CONTEXT:ReviewedU7277Context=Object.freeze({id:'u7277-four-q'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type U7277Spec=Readonly<{pen:number;mask:number;path:string}>
const TARGETS:readonly U7277Spec[]=Object.freeze([{"pen":1,"mask":1,"path":"M16.85 14 Q14.8 36 7.83 52"},{"pen":4,"mask":1,"path":"M9.059999999999999 66 Q23 60 41.86 52"},{"pen":5,"mask":1,"path":"M64.425 12.5 Q54.975 36 34.05 53"},{"pen":6,"mask":2,"path":"M65.775 12.5 Q76.9125 37 91.425 46.5"}].map(t=>Object.freeze(t)))
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:U7277Spec):Rat[]{
 const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(spec.path)
 ensure(match,'fixed canonical M/Q six-argument source only');return match.slice(1).map(D)
}
function certificate(spec:U7277Spec,s:HanjaOutlineSegment):ReviewedU7277Certificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source Q guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]],A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,3),K=R(1,20),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta)
 ensure(greater(lambda,R(0))&&greater(chord2,R(49)),'own Q initial regularity and arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lambda),lambda))),square(cross)),'own Q exact curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/3,curvatureBound:1/20,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquaredLower:rString(lambda),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u7277-'+t.pen+'-'+t.mask,kind:'growing-u7277-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU7277Context(strokes:HanjaOutlineStrokes):ReviewedU7277Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU7277Policy(context:ReviewedU7277Context|null,pen:number,mask:number):ReviewedU7277Policy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU7277Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 牷 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed four target guide required');const start=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q/.exec(spec.path);ensure(start,'fixed original M decimal spelling');return{q0:[Number(start[1]),Number(start[2])],r:7,minimumLength:7}}
export type ReviewedU7277Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU7277Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function canCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 牷 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 牷 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 牷 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 牷 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 牷 SVG coordinate tree')
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
export function measureReviewedU7277CapsFrame(policy:ReviewedU7277Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU7277Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 牷 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 牷 measurement parent required')
  const coordinates=canCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u7277-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 牷 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 牷 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 牷 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('牷 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU7277Caps(policy:ReviewedU7277Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU7277Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 牷 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 牷 SVG binding tree')
    const coordinates=canCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u7277-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u7277-measure'&&guide.getAttribute('id')===clipId+'-u7277-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u7277-growing)'
    if(!bound())throw new Error('Mismatched 牷 SVG binding')
    const frame=measureReviewedU7277CapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('牷 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('牷 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
