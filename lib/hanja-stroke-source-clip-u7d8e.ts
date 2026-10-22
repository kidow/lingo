import type{HanjaOutlineSegment,HanjaOutlineStrokes}from'./hanja-stroke-outline.ts'
import{reviewedU7d8eContext as exactWholeContext}from'./hanja-stroke-start-gate-u7d8e.ts'
/** 綎11 원H/B/J 전용 표시 후보. 원source 불변, 새 공간배분. 기존ROOT관찰은 역사이고 현재native/AA/원시간동일성 승인이 아니다. */
function freeze(v:unknown):void{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v)}}
function ensure(v:unknown,m:string):asserts v{if(!v)throw new Error(m)}
export const REVIEWED_U7D8E_CLIP_SOURCE={"sourceRoot":"u7d8e","identity":{"sourceRoot":"u7d8e","sourceProofFile":"engine-whole-u7d8e.json","sourceProofFileSha256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25"},"sourceFile":"docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json","sourceSHA256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","sourceCacheFile":"docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json","sourceCacheSHA256":"cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c","geometrySHA256":"43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67","pens":13,"masks":15,"polygons":35,"target":[11,1],"raw":[8,9],"flags":[22,113],"maskSHA256":"a28fc333fc2c6241d32fce321060f1aa1dc7cc031f4dd0db80671e5a7a37dcc5","sourcePGuideWidthWeightPreserved":true,"sourcePartition":false,"newInternalSpatialAllocation":true,"originalTimingEquivalent":false,"nativeApproval":false,"actualComponentApproval":false,"AAApproved":false,"UABranchMonotonicityProved":false,"runtimeApplied":false,"priorROOTObservationsHistoricalOnly":true,"inputSHA256":{"docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json":"cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c","docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/config.json":"96e2a43d5020485f6b75e8c12dca8e07825ae9c15719d6f444557ef9beb632f0","docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/render.mjs":"0c1f0ac9e154186745b32a5ab575096663e4e3740fad83f920bdd4f839e4c4ca","docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/review.json":"43cff5019266b20a807b9106f565da1b7aab7bfb6c78c113e66fd3a135357bb7","docs/hanja-u7d8e-pen11-source-clip-feasibility-2026-10-21/README.md":"5d2b4e1444ac45e535685dba1d4b490bee83bf8c302e700b41d29ffb30dde565","lib/hanja-stroke-start-gate-u7d8e.ts":"3d084b8e321ecbc1fcfe4c6f195e0d3d12d72791beba1a68f182cd3c4822bf51"}} as const
const SEGMENT={"outline":"M36.8 15.5 L52.95 15.5 L52.95 17.5 L36.8 17.5 Z M55.6 17 L44.3 49.7 L37.65 50.55 L49.75 16.5 Z M49.95 15.5 L52.95 13 L58.45 17.5 L55.95 19 L49.95 21.5 Z","bounds":[36.8,13,58.45,50.55],"direction":"curve","weight":45.873738,"revealPath":"M36.825 16.5 L52.975 16.5 L43 44.5","revealWidth":14} as const satisfies HanjaOutlineSegment
const H='M36.8 15.5 L52.95 15.5 L52.95 17.5 L36.8 17.5 Z',B='M55.6 17 L44.3 49.7 L37.65 50.55 L49.75 16.5 Z',J='M49.95 15.5 L52.95 13 L58.45 17.5 L55.95 19 L49.95 21.5 Z';
const G=[52.975,16.5],V=[-399/40,28],N=[-28,-399/40],V2=1413601/1600,UMIN=-3899/320,UMAX=1770027/1600,ZMIN=-8827/100,ZMAX=903/10,HMIN=36.8,HMAX=58.45
export const REVIEWED_U7D8E_CLIP_GEOMETRY={H,B,J,hRect:{x:36.8,y:13,height:8.5},projection:{G,V,N,V2,UMIN,UMAX,ZMIN,ZMAX}} as const
freeze(REVIEWED_U7D8E_CLIP_SOURCE);freeze(REVIEWED_U7D8E_CLIP_GEOMETRY);freeze(SEGMENT)
ensure(SEGMENT.outline===H+' '+B+' '+J,'Exact original 綎 H/B/J literal required')
export type ReviewedU7d8eClipContext=Readonly<{id:'u7d8e-clip-exact13'}>
export type ReviewedU7d8eClipPolicy=Readonly<{id:'u7d8e-11-1';kind:'source-clip-hjb-u7d8e';pen:10;mask:0;segment:HanjaOutlineSegment}>
const CONTEXT:ReviewedU7d8eClipContext=Object.freeze({id:'u7d8e-clip-exact13'})
const POLICY:ReviewedU7d8eClipPolicy=Object.freeze({id:'u7d8e-11-1',kind:'source-clip-hjb-u7d8e',pen:10,mask:0,segment:SEGMENT})
export function reviewedU7d8eClipContext(strokes:HanjaOutlineStrokes):ReviewedU7d8eClipContext|null{return exactWholeContext(strokes)?CONTEXT:null}
export function reviewedU7d8eClipPolicy(context:ReviewedU7d8eClipContext|null,pen:number,mask:number):ReviewedU7d8eClipPolicy|null{return context===CONTEXT&&pen===10&&mask===0?POLICY:null}
function owned(policy:ReviewedU7d8eClipPolicy){ensure(policy===POLICY,'Private exact 綎11 policy required')}
function ownData(o:unknown,keys:readonly string[]):o is Record<string,unknown>{return !!o&&typeof o==='object'&&Object.getPrototypeOf(o)===Object.prototype&&Reflect.ownKeys(o).length===keys.length&&keys.every(k=>{const a=Object.getOwnPropertyDescriptor(o,k);return !!a&&a.enumerable&&Object.hasOwn(a,'value')})}
const clamp01=(x:number)=>Math.max(0,Math.min(1,x))
function planePolygon(h:number){const from=(u:number,z:number)=>[G[0]+(V[0]*u+N[0]*z)/V2,G[1]+(V[1]*u+N[1]*z)/V2];return [[UMIN,ZMIN],[h,ZMIN],[h,ZMAX],[UMIN,ZMAX]].map((v,i)=>(i?'L':'M')+from(v[0],v[1]).join(' ')).join(' ')+' Z'}
export type ReviewedU7d8eClipSample=Readonly<{sourceGuide:string;L:number;d:number;point:Readonly<{x:number;y:number}>}>
export type ReviewedU7d8eClipFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'H'|'L'|'full';alpha:number;hH:number;hB:number;hWidth:number;bodyPlaneD:string;L:number|null;d:number|null;point:Readonly<{x:number;y:number}>|null;UARead:boolean;originalPDirect:boolean}>
/** Pure samples are not UA evidence. The DOM adapter below authenticates the connected original path/frame. */
export function sampleReviewedU7d8eClip(policy:ReviewedU7d8eClipPolicy,progress:number,sample?:ReviewedU7d8eClipSample):ReviewedU7d8eClipFrame{
 owned(policy);ensure(Number.isFinite(progress)&&progress>=0&&progress<=1,'Finite 綎11 progress0..1 required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty':'full',alpha:progress,hH:progress===0?HMIN:HMAX,hB:progress===0?UMIN:UMAX,hWidth:0,bodyPlaneD:'',L:null,d:null,point:null,UARead:false,originalPDirect:progress===1})
 ensure(ownData(sample,['sourceGuide','L','d','point'])&&ownData(sample.point,['x','y']),'Own data-only same-frame sample required')
 ensure(sample.sourceGuide===SEGMENT.revealPath&&typeof sample.L==='number'&&Number.isFinite(sample.L)&&sample.L>0&&typeof sample.d==='number'&&sample.d===progress*sample.L,'Original native full-guide L/d required')
 const x=sample.point.x,y=sample.point.y;ensure(typeof x==='number'&&typeof y==='number'&&Number.isFinite(x)&&Number.isFinite(y),'Finite original native point required')
 const phase=y<=G[1]?'H':'L',alpha=phase==='H'?clamp01((x-36.825)/16.15):clamp01((y-G[1])/28),hH=phase==='H'?HMIN+(HMAX-HMIN)*alpha:HMAX,hB=phase==='L'?UMIN+(UMAX-UMIN)*alpha:UMIN
 return Object.freeze({policyId:policy.id,progress,phase,alpha,hH,hB,hWidth:hH-HMIN,bodyPlaneD:planePolygon(hB),L:sample.L,d:sample.d,point:Object.freeze({x,y}),UARead:true,originalPDirect:false})
}
function coordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
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

const frames=new WeakMap<object,{measurement:SVGPathElement;exact:()=>boolean}>()
export function measureReviewedU7d8eClipFrame(policy:ReviewedU7d8eClipPolicy,progress:number,path:SVGPathElement|null):ReviewedU7d8eClipFrame{
 owned(policy);ensure(Number.isFinite(progress)&&progress>=0&&progress<=1,'Finite 綎11 progress required')
 const owner=path?.ownerSVGElement,defs=path?.parentElement,target=defs?.parentElement
 ensure(path&&owner&&defs?.localName==='defs'&&target?.localName==='g','Connected original 綎11 measurement required')
 const coordinates=coordinateBinding([path],owner),exact=()=>coordinates()&&path.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-stroke-reveal-progress')===String(progress)&&path.getAttribute('data-u7d8e-source-clip-measurement')==='true'&&path.getAttribute('d')===SEGMENT.revealPath&&path.getAttribute('pathLength')===null&&path.getAttribute('stroke')==='none'&&path.getAttribute('fill')==='none'
 ensure(exact(),'Exact original 綎11 guide/frame required');let sample:ReviewedU7d8eClipSample|undefined
 if(progress>0&&progress<1){const L=path.getTotalLength();ensure(Number.isFinite(L)&&L>0&&exact(),'Invalid changing 綎11 native L');const d=progress*L,q=path.getPointAtLength(d);ensure([q.x,q.y].every(Number.isFinite)&&exact()&&path.getTotalLength()===L&&exact(),'Changing 綎11 native q/L/frame');sample={sourceGuide:SEGMENT.revealPath,L,d,point:{x:q.x,y:q.y}}}
 const frame=sampleReviewedU7d8eClip(policy,progress,sample);frames.set(frame,{measurement:path,exact});return frame
}
export type ReviewedU7d8eClipNodes={measurement:SVGPathElement|null;hRect:SVGRectElement|null;bPlane:SVGPathElement|null;hInk:SVGPathElement|null;bInk:SVGPathElement|null;partial:SVGGElement|null;ink:SVGPathElement|null}
const META=['progress','phase','alpha','h-h','h-b','UA-read','full'].map(k=>'data-u7d8e-source-clip-'+k)
const NUMERIC=['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y']
function attribute(node:SVGElement,key:string,value:number|null){if(value===null)node.removeAttribute(key);else node.setAttribute(key,String(value))}
export function commitReviewedU7d8eClip(nodes:ReviewedU7d8eClipNodes,frame:ReviewedU7d8eClipFrame):boolean{
 const{measurement,hRect,bPlane,hInk,bInk,partial,ink}=nodes
 const reset=()=>{ink?.setAttribute('visibility','hidden');partial?.setAttribute('visibility','hidden');hRect?.setAttribute('width','0');bPlane?.setAttribute('d','');for(const k of[...META,...NUMERIC])ink?.removeAttribute(k)}
 reset()
 try{
  const saved=frames.get(frame);ensure(saved&&measurement&&hRect&&bPlane&&hInk&&bInk&&partial&&ink&&saved.measurement===measurement&&saved.exact(),'Private fresh 綎11 frame required')
  const owner=measurement.ownerSVGElement,defs=measurement.parentElement,target=defs?.parentElement,hClip=hRect.parentElement,bClip=bPlane.parentElement,id=ink.getAttribute('data-owner')
  ensure(owner&&defs?.localName==='defs'&&target?.localName==='g'&&hClip?.localName==='clipPath'&&bClip?.localName==='clipPath'&&id,'Exact 綎11 parents required')
  const stable=coordinateBinding([measurement,hRect,bPlane,hInk,bInk,partial,ink],owner)
  const bound=()=>stable()&&saved.exact()&&defs.parentElement===target&&measurement.parentElement===defs&&hClip.parentElement===defs&&bClip.parentElement===defs&&hRect.parentElement===hClip&&bPlane.parentElement===bClip&&partial.parentElement===target&&ink.parentElement===target&&hInk.parentElement===partial&&bInk.parentElement===partial&&ink.getAttribute('data-owner')===id&&measurement.id===id+'-u7d8e-clip-measure'&&hClip.id===id+'-u7d8e-h-plane'&&bClip.id===id+'-u7d8e-b-plane'&&hRect.id===id+'-u7d8e-h-rect'&&bPlane.id===id+'-u7d8e-b-plane-path'&&partial.id===id+'-u7d8e-clip-partial'&&ink.id===id+'-u7d8e-clip-ink'&&hInk.id===id+'-u7d8e-hj-ink'&&bInk.id===id+'-u7d8e-b-ink'&&hClip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&bClip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&hRect.getAttribute('x')==='36.8'&&hRect.getAttribute('y')==='13'&&hRect.getAttribute('height')==='8.5'&&hInk.getAttribute('d')===H+' '+J&&bInk.getAttribute('d')===B&&ink.getAttribute('d')===SEGMENT.outline&&hInk.getAttribute('clip-path')==='url(#'+hClip.id+')'&&bInk.getAttribute('clip-path')==='url(#'+bClip.id+')'&&[ink,hInk,bInk].every(n=>n.getAttribute('stroke')==='none'&&n.getAttribute('fill-rule')==='nonzero'&&n.getAttribute('pathLength')===null&&n.getAttribute('stroke-dasharray')===null&&n.getAttribute('stroke-dashoffset')===null)&&ink.getAttribute('mask')===null&&ink.getAttribute('clip-path')===null&&[measurement,hRect,bPlane,hInk,bInk,partial].every(n=>n.getAttribute('data-owner')===id)
  ensure(bound(),'Exact 綎11 original H/B/J/source clip attrs required')
  hRect.setAttribute('width',String(frame.hWidth));bPlane.setAttribute('d',frame.bodyPlaneD)
  attribute(ink,'data-growing-progress',frame.progress);attribute(ink,'data-growing-length',frame.L);attribute(ink,'data-growing-distance',frame.d);attribute(ink,'data-growing-radius',null);attribute(ink,'data-growing-end-x',frame.point?.x??null);attribute(ink,'data-growing-end-y',frame.point?.y??null)
  for(const[k,v]of Object.entries({progress:frame.progress,phase:frame.phase,alpha:frame.alpha,'h-h':frame.hH,'h-b':frame.hB,'UA-read':frame.UARead,full:frame.originalPDirect}))ink.setAttribute('data-u7d8e-source-clip-'+k,String(v))
  ensure(bound()&&hRect.getAttribute('width')===String(frame.hWidth)&&bPlane.getAttribute('d')===frame.bodyPlaneD,'Changed 綎11 source clip before visibility')
  if(frame.phase==='full')ink.setAttribute('visibility','visible')
  else partial.setAttribute('visibility',frame.phase==='empty'?'hidden':'visible')
  return true
 }catch{reset();return false}
}
