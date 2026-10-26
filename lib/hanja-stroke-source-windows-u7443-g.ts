/** 瑃 G: two original-Q0 source-rectangle policies. No app/native approval. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json' with {type:'json'}
const FIXED=fixture['u7443-g'],STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u7443-g-source-window-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU7443GSourceWindowContext=Readonly<{id:'u7443-g-original-13-source-windows'}>
const CONTEXT:ReviewedU7443GSourceWindowContext=Object.freeze({id:'u7443-g-original-13-source-windows'})
export function makeReviewedU7443GSourceWindowContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU7443GSourceWindowContext|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU7443GSourceWindowPolicy=Readonly<{
 id:string;kind:'source-point-window-u7443-g';pen:4|8;mask:1;segment:HanjaOutlineSegment;
 anchor:readonly[number,number];sourceBounds:readonly number[];
 proofFamily:'strict-union-kernel-at-original-Q0'|'source-specific-finite-rect';proofFingerprint:string
}>
const POLICIES:readonly ReviewedU7443GSourceWindowPolicy[]=freeze([
 {id:'u7443-g-source-window-4-1',kind:'source-point-window-u7443-g',pen:4,mask:1,segment:STROKES[3][0],anchor:[6.86,77.5],sourceBounds:STROKES[3][0].bounds,proofFamily:'strict-union-kernel-at-original-Q0',proofFingerprint:'c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8'},
 {id:'u7443-g-source-window-8-1',kind:'source-point-window-u7443-g',pen:8,mask:1,segment:STROKES[7][0],anchor:[64.5,6.87],sourceBounds:STROKES[7][0].bounds,proofFamily:'source-specific-finite-rect',proofFingerprint:'cc04d474edb51c975b06429a74541d2b62fbf1df1e20cd0192b0f0b09c9f41ce'}
] as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU7443GSourceWindowPolicy(context:ReviewedU7443GSourceWindowContext|null,pen:number,mask:number):ReviewedU7443GSourceWindowPolicy|null{
 return context===CONTEXT&&mask===0?POLICIES.find(p=>p.pen===pen+1)??null:null
}
function source(policy:ReviewedU7443GSourceWindowPolicy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 瑃 G policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU7443GSourceWindowFrame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-Q0-point-window'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;anchorIsOriginalQ0:true;authorClock:'source-author-Q0-point-rectangle';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU7443GSourceWindowFrame(policy:ReviewedU7443GSourceWindowPolicy,segment:HanjaOutlineSegment,p:number):ReviewedU7443GSourceWindowFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 瑃 progress required')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax+(x0-ax)*p,y:ay+(y0-ay)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-Q0-point-window',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,anchorIsOriginalQ0:true,authorClock:'source-author-Q0-point-rectangle',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU7443GSourceWindowNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
function opaqueRGB(value:string):boolean{
 const match=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!match)return false
 const slash=match[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/\s+/);let alpha:string|undefined=slash[1]?.trim()
 if(slash.length>2)return false
 if(alpha===undefined&&parts.length===4)alpha=parts.pop()
 return parts.length===3&&parts.every(v=>Number.isFinite(Number(v.replace('%',''))))&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)
}
function cssSourcePath(doc:Document,value:string,outline:string):boolean{
 if(value==='')return true
 const probe=doc.createElementNS(NS,'path');probe.style.setProperty('d','path('+JSON.stringify(outline)+')')
 const expected=probe.style.getPropertyValue('d')
 return expected!==''&&value===expected
}
/** Sole first-mask target. Both targets are independent strokes; no prior-H completion is inferred. */
export function commitReviewedU7443GSourceWindow(policy:ReviewedU7443GSourceWindowPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU7443GSourceWindowNodes){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU7443GSourceWindowFrame(policy,segment,progress)
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-0'))throw Error('Exact 瑃 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 瑃 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u7443-g-source-window-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const expectedCSS=new Map<string,string>()
  for(const [k,v]of Object.entries(shape)){const probe=doc.createElementNS(NS,'rect');probe.style.setProperty(k,String(v)+'px');expectedCSS.set(k,probe.style.getPropertyValue(k))}
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 瑃 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 瑃 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&slot.children.length===1&&slot.children[0]===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===13&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(!exact(visibility,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   for(const node of tree){
    if(!node.isConnected||node.ownerDocument!==doc||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.namespaceURI!==NS||node.parentNode!==parents.get(node)||['transform','filter','mask'].some(k=>node.getAttribute(k)!==null)||(node!==p&&node.getAttribute('clip-path')!==null))return false
    const s=view.getComputedStyle(node)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||(node!==p&&s.clipPath!=='none')||!['','none'].includes(s.getPropertyValue('mask-image'))||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
   }
   const rs=view.getComputedStyle(r)
   if([...expectedCSS].some(([k,v])=>v===''||rs.getPropertyValue(k)!==v))return false
   const paint=view.getComputedStyle(p)
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 瑃 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 瑃 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 瑃 visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,frame:f,cleanup:reset}
 }catch{reset();return {status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U7443_G_SOURCE_WINDOWS=freeze({
 glyph:'瑃',root:'u7443-g',pens:13,masks:14,polygons:25,geometrySHA256:'20d60fad2f377bb20583af6ce87ff23b40a73d07dee52a9442a9ebef5acacabd',
 targetPens:[4,8],unapprovedTarget9:true,sourceAnchorIsQ0:true,sourcePOrQOrWidth14OrCalculatedWeightChanged:false,
 proofFamilies:{4:'strict union kernel at Q0; margin61/4100',8:'source-specific finite rect;87events/86open/86positiveclosed/nozeroarea tail'},
 originalClockEquivalent:false,authorClock:'source-author-Q0-point-rectangle',appRendererConnected:false,nativeApproval:false,runtimeApplied:false
})
export const REVIEWED_U7443_G_SOURCE_WINDOW_INPUT_SHA256=Object.freeze({
 'docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json':'060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66',
 'docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json':'6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a',
 'docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json':'c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8',
 'docs/hanja-source-original-u7443-g-2026-10-26/raw8-point-rect-proof.json':'cc04d474edb51c975b06429a74541d2b62fbf1df1e20cd0192b0f0b09c9f41ce',
 'docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json':'709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2',
 'docs/hanja-source-alternative-u7443-g-2026-10-26/sources.json':'f3d3984cc8d32d7fb6092c203deabebe4db60ee4768f6d5d1df736aba3a92ae1',
 'docs/hanja-actual-engine-capture-u7443-g-2026-10-26/capture.json':'27753f9d6e98323e8d3cb4f59c9f07b32659fc1d1baf3a58df697dab000a3350'
})
