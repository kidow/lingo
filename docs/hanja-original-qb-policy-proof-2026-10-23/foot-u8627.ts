/** 蘧 original QB contact clip preparation. New internal display microclock; native pending. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline'
import fixture from '../hanja-source-original-u8627-vs2-2026-10-23/fixtures.json' with {type:'json'}
const FIXED_ENTRY=fixture['u8627-ue0102']
const FIXED_STROKES:HanjaOutlineStrokes=FIXED_ENTRY.strokes as HanjaOutlineStrokes
const FIXED_FULL5=FIXED_ENTRY.fullProof
const FIXED_IDENTITY=FIXED_ENTRY.identity
const FEET=[{"cutX":["28","1"],"phaseShare":["89413","14610284"],"boundary":[[["53","2"],["1617","20"]],[["543","20"],["321","4"]],[["28","1"],["16811","208"]],[["28","1"],["831","10"]]],"triangles":[[[["28","1"],["831","10"]],[["53","2"],["1617","20"]],[["543","20"],["321","4"]]],[[["543","20"],["321","4"]],[["28","1"],["16811","208"]],[["28","1"],["831","10"]]]],"order":[{"triangle":0,"seed":[["541","20"],["1621","20"]],"priorTriangle":null,"shared":null},{"triangle":1,"seed":[["1103","40"],["3267","40"]],"priorTriangle":0,"shared":[[["543","20"],["321","4"]],[["28","1"],["831","10"]]]}],"weights":[["49140","89413"],["40273","89413"]],"footArea":["89413","41600"],"totalArea":["280967","800"],"strictRootMarginSquared":["37249","353800"]}]
export const REVIEWED_U8627_FOOT_SOURCE=Object.freeze({glyph:'蘧',root:'u8627-ue0102',nativeApproval:false,registered:false,originalGuideEndX:89.5,originalPMaxX:95.1,bodyThreshold:'cut + (originalPMaxX-cut) * clamp((UApoint.x-UAstart.x)/(UAend.x-UAstart.x))',newDisplayMicroclock:true,UAOutputUnmodified:true,derivedClipVertices:true,sourceInkChanged:false})
function ensure(v:unknown,message:string):asserts v{if(!v)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object')return false;if(Array.isArray(b)){if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false;for(let i=0;i<b.length;i++){const d=Object.getOwnPropertyDescriptor(a,String(i));if(!d||!d.enumerable||!Object.hasOwn(d,'value')||!sameJSON(d.value,b[i]))return false}return true}if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false;const keys=Object.keys(b);return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(a,k);return!!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,(b as Record<string,unknown>)[k])})}

function freeze<T>(value:T):Readonly<T>{if(value&&typeof value==='object'){for(const child of Object.values(value as object))freeze(child);Object.freeze(value)}return value}
freeze(FIXED_STROKES);freeze(FEET)
export type ReviewedU8627FootContext=Readonly<{id:'u8627-exact21-foot'}>
export type ReviewedU8627FootPolicy=Readonly<{id:'u8627-21-2';kind:'source-foot-x-u8627';segment:HanjaOutlineSegment;footIndex:0}>
const CONTEXT:ReviewedU8627FootContext=Object.freeze({id:'u8627-exact21-foot'})
freeze(FIXED_STROKES);freeze(FIXED_FULL5);freeze(FIXED_IDENTITY);freeze(FEET)
const POLICIES:readonly ReviewedU8627FootPolicy[]=[Object.freeze({id:'u8627-21-2',kind:'source-foot-x-u8627',segment:FIXED_STROKES[20][1],footIndex:0})]
export function makeReviewedU8627FootSourceContext(proof:unknown,identity:unknown,outlines:HanjaOutlineStrokes):ReviewedU8627FootContext|null{return sameJSON(proof,FIXED_FULL5)&&sameJSON(identity,FIXED_IDENTITY)&&sameJSON(outlines,FIXED_STROKES)?CONTEXT:null}
export function reviewedU8627FootContext(outlines:HanjaOutlineStrokes):ReviewedU8627FootContext|null{return sameJSON(outlines,FIXED_STROKES)?CONTEXT:null}
export function reviewedU8627FootPolicy(context:ReviewedU8627FootContext|null,pen:number,mask:number):ReviewedU8627FootPolicy|null{return context===CONTEXT&&mask===1&&pen===20?POLICIES[0]:null}
export type ReviewedU8627FootFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'foot'|'body'|'full';footPathD:string;footFullTriangles:number;footLocal:number;bodyProgress:number;threshold:number;L:number|null;d:number|null;point:Readonly<{x:number;y:number}>|null;UARead:boolean}>
export type ReviewedU8627FootNodes={ink:SVGPathElement|null;foot:SVGPathElement|null;body:SVGPathElement|null;rect:SVGRectElement|null;measurement:SVGPathElement|null}
const frames=new WeakMap<object,{policy:ReviewedU8627FootPolicy;measurement:SVGPathElement;exact:()=>boolean}>()
const committedFull=new WeakSet<SVGPathElement>()
const rat=(v:readonly string[])=>Number(v[0])/Number(v[1]),point=(p:readonly (readonly string[])[])=>p.map(rat)
function polygon(p:readonly (readonly number[])[]){return'M'+p.map(v=>v.join(' ')).join('L')+'Z'}
function foot(index:0,p:number){const data=FEET[index],out:number[][][]=[];let start=0,full=0,local=0;for(let i=0;i<data.order.length;i++){const item=data.order[i],weight=rat(data.weights[i]),end=start+weight;if(p===1||p>=end){out.push(data.triangles[item.triangle].map(point));full++;start=end;continue}if(p>start){local=(p-start)/weight;const seed=point(item.seed);out.push(data.triangles[item.triangle].map(point).map(v=>v.map((x,k)=>seed[k]+local*(x-seed[k]))))}break}return{d:out.map(polygon).join(''),full,local}}
function coordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 蘧 final-m2 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 蘧 final-m2 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 蘧 final-m2 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 蘧 final-m2 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 蘧 final-m2 SVG coordinate tree')
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


/** Original connected UA guide; native endpoint coordinates are not replaced by source-decimal estimates. */
export function measureReviewedU8627FootFrame(policy:ReviewedU8627FootPolicy,progress:number,path:SVGPathElement|null):ReviewedU8627FootFrame{
 ensure(POLICIES.includes(policy),'Private exact 蘧 final-m2 policy required');ensure(Number.isFinite(progress)&&progress>=0&&progress<=1,'Finite 蘧 final-m2 progress required')
 const owner=path?.ownerSVGElement,defs=path?.parentElement,target=defs?.parentElement
 ensure(path&&owner&&defs?.localName==='defs'&&target?.localName==='g'&&target.getAttribute('data-stroke-start-gate')===policy.id,'Connected exact 蘧 final-m2 measurement tree required')
 const coordinates=coordinateBinding([path],owner),originalD=policy.segment.revealPath
 const exact=()=>coordinates()&&path.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-stroke-reveal-progress')===String(progress)&&path.getAttribute('data-u8627-foot-measurement')==='true'&&path.getAttribute('d')===originalD&&path.getAttribute('pathLength')===null
 ensure(exact(),'Original 蘧 final-m2 measurement path required')
 const FOOT_SHARE=rat(FEET[policy.footIndex].phaseShare)
 const phase=progress===0?'empty':progress===1?'full':progress<=FOOT_SHARE?'foot':'body',bodyProgress=progress<=FOOT_SHARE?0:progress===1?1:(progress-FOOT_SHARE)/(1-FOOT_SHARE),fp=foot(policy.footIndex,progress>=FOOT_SHARE?1:progress/FOOT_SHARE),cut=rat(FEET[policy.footIndex].cutX),maxX=policy.segment.bounds[2]
 let L:number|null=null,d:number|null=null,q:Readonly<{x:number;y:number}>|null=null,threshold=phase==='full'?maxX:cut
 if(phase==='body'){
  L=path.getTotalLength();ensure(Number.isFinite(L)&&L>0&&exact(),'Invalid same-path 蘧 final-m2 length');d=bodyProgress*L
  const start=path.getPointAtLength(0);ensure([start.x,start.y].every(Number.isFinite)&&exact(),'Invalid original 蘧 final-m2 start')
  const end=path.getPointAtLength(L);ensure([end.x,end.y].every(Number.isFinite)&&end.x>start.x&&exact(),'Invalid original 蘧 final-m2 end')
  const value=path.getPointAtLength(d);ensure([value.x,value.y].every(Number.isFinite)&&exact(),'Invalid same-frame 蘧 final-m2 point')
  ensure(path.getTotalLength()===L&&exact(),'Changing 蘧 final-m2 path length');q=Object.freeze({x:value.x,y:value.y});threshold=cut+(maxX-cut)*Math.max(0,Math.min(1,(value.x-start.x)/(end.x-start.x)))
  ensure(Number.isFinite(threshold)&&threshold>=cut&&threshold<=maxX,'Source-bound 蘧 final-m2 threshold required')
 }
 const frame=Object.freeze({policyId:policy.id,progress,phase,footPathD:fp.d,footFullTriangles:fp.full,footLocal:fp.local,bodyProgress,threshold,L,d,point:q,UARead:phase==='body'});frames.set(frame,{policy,measurement:path,exact});return frame
}
const NUMERIC=['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y']
const META=['data-u8627-foot-phase','data-u8627-foot-body-progress','data-u8627-foot-UA-read','data-u8627-foot-foot-triangles','data-u8627-foot-foot-local','data-u8627-foot-full-mask','data-monotone-threshold']
function attribute(node:SVGElement,key:string,value:number|null){if(value===null)node.removeAttribute(key);else node.setAttribute(key,String(value))}
/** Own original P is the only ink. p1 is unmasked original P; all writes precede visibility. */
export function commitReviewedU8627FootMask(nodes:ReviewedU8627FootNodes,frame:ReviewedU8627FootFrame):boolean{
 const{ink,foot:footNode,body,rect,measurement}=nodes;ink?.setAttribute('visibility','hidden');for(const k of[...NUMERIC,...META])ink?.removeAttribute(k);footNode?.setAttribute('d','');footNode?.setAttribute('visibility','hidden');body?.setAttribute('visibility','hidden');rect?.setAttribute('width','0')
 try{
  const saved=frames.get(frame);ensure(saved&&ink&&footNode&&body&&rect&&measurement&&saved.measurement===measurement&&saved.exact(),'Private fresh 蘧 final-m2 frame required');const policy=saved.policy,owner=ink.ownerSVGElement,target=ink.parentElement,defs=measurement.parentElement,mask=footNode.parentElement,clip=rect.parentElement,clipId=ink.getAttribute('data-owner')
  ensure(owner&&target?.localName==='g'&&defs?.localName==='defs'&&defs.parentElement===target&&mask?.localName==='mask'&&mask.parentElement===defs&&body.parentElement===mask&&clip?.localName==='clipPath'&&clip.parentElement===defs&&clipId,'Exact 蘧 final-m2 parent binding required')
  const stable=coordinateBinding([ink,footNode,body,rect,measurement],owner),maskURL='url(#'+clipId+'-u8627-foot-foot-x-mask)',bodyURL='url(#'+clipId+'-u8627-foot-body-clip)',bounds=policy.segment.bounds
  const bound=()=>stable()&&saved.exact()&&ink.parentElement===target&&measurement.parentElement===defs&&defs.parentElement===target&&footNode.parentElement===mask&&body.parentElement===mask&&mask.parentElement===defs&&rect.parentElement===clip&&clip.parentElement===defs&&ink.getAttribute('data-owner')===clipId&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.id===clipId+'-u8627-foot-foot-x-mask'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&clip.id===clipId+'-u8627-foot-body-clip'&&clip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&ink.id===clipId+'-u8627-foot-ink'&&footNode.id===clipId+'-u8627-foot-foot'&&body.id===clipId+'-u8627-foot-body'&&rect.id===clipId+'-u8627-foot-rect'&&measurement.id===clipId+'-u8627-foot-measure'&&ink.getAttribute('data-u8627-foot-ink')==='true'&&footNode.getAttribute('data-u8627-foot-foot')==='true'&&body.getAttribute('data-u8627-foot-body')==='true'&&ink.getAttribute('d')===policy.segment.outline&&body.getAttribute('d')===policy.segment.outline&&footNode.getAttribute('fill')==='white'&&footNode.getAttribute('fill-rule')==='nonzero'&&footNode.getAttribute('stroke')==='none'&&body.getAttribute('fill')==='white'&&body.getAttribute('fill-rule')==='nonzero'&&body.getAttribute('stroke')==='none'&&body.getAttribute('clip-path')===bodyURL&&rect.getAttribute('x')===String(bounds[0])&&rect.getAttribute('y')===String(bounds[1])&&rect.getAttribute('height')===String(bounds[3]-bounds[1])&&body.getAttribute('pathLength')===null&&[ink,footNode,body,rect].every(n=>n.getAttribute('stroke-dasharray')===null&&n.getAttribute('stroke-dashoffset')===null)
  ensure(bound()&&(ink.getAttribute('mask')===maskURL||(committedFull.has(ink)&&ink.getAttribute('mask')===null)),'Exact 蘧 final-m2 source/mask attrs required')
  ink.setAttribute('mask',maskURL);committedFull.delete(ink);footNode.setAttribute('d',frame.footPathD);footNode.setAttribute('visibility',frame.footPathD?'visible':'hidden')
  if(frame.phase==='body'||frame.phase==='full'){rect.setAttribute('width',String(frame.threshold-bounds[0]));body.setAttribute('visibility','visible')}
  attribute(ink,'data-growing-progress',frame.progress);attribute(ink,'data-growing-length',frame.L);attribute(ink,'data-growing-distance',frame.d);attribute(ink,'data-growing-radius',null);attribute(ink,'data-growing-end-x',frame.point?.x??null);attribute(ink,'data-growing-end-y',frame.point?.y??null)
  ink.setAttribute('data-u8627-foot-phase',frame.phase);ink.setAttribute('data-u8627-foot-body-progress',String(frame.bodyProgress));ink.setAttribute('data-u8627-foot-UA-read',String(frame.UARead));ink.setAttribute('data-u8627-foot-foot-triangles',String(frame.footFullTriangles));ink.setAttribute('data-u8627-foot-foot-local',String(frame.footLocal));ink.setAttribute('data-u8627-foot-full-mask',String(frame.phase==='full'));attribute(ink,'data-monotone-threshold',frame.phase==='body'?frame.threshold:null)
  if(frame.phase==='full'){ink.removeAttribute('mask');committedFull.add(ink)}
  ensure(bound()&&footNode.getAttribute('d')===frame.footPathD&&rect.getAttribute('width')===String(frame.phase==='body'||frame.phase==='full'?frame.threshold-bounds[0]:0)&&ink.getAttribute('mask')===(frame.phase==='full'?null:maskURL),'Changed 蘧 final-m2 source frame before visibility')
  ink.setAttribute('visibility',frame.progress===0?'hidden':'visible');return true
 }catch{ink?.setAttribute('visibility','hidden');return false}
}

