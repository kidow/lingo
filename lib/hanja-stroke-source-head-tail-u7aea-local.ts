/** Preview-only local竪 pen7 mask2: source-Q head anchor then cap-free Y tail. No source microclock or native approval. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u7aea,STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u7aea-local-head-tail-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU7aeaLocalHeadTailContext=Readonly<{id:'u7aea-local-original-13-head-tail'}>
const CONTEXT:ReviewedU7aeaLocalHeadTailContext=Object.freeze({id:'u7aea-local-original-13-head-tail'})
export function makeReviewedU7aeaLocalHeadTailContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU7aeaLocalHeadTailContext|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU7aeaLocalHeadTailPolicy=Readonly<{id:string;kind:'source-head-tail-u7aea-local';pen:7;mask:2;segment:HanjaOutlineSegment;anchor:readonly[number,number];sourceBounds:readonly number[];sourceT:0.015625;headBounds:readonly[number,number,number,number];headPhaseShare:number;headSeam:number;priorRequired:boolean;priorSegment:HanjaOutlineSegment|null;proofFingerprint:string;previewOnly:true}>
const POLICIES:readonly ReviewedU7aeaLocalHeadTailPolicy[]=freeze([
 {id:'u7aea-local-head-tail-7-2',kind:'source-head-tail-u7aea-local',pen:7,mask:2,segment:STROKES[6][1],anchor:[343025/4096,62581/4096],sourceBounds:STROKES[6][1].bounds,sourceT:0.015625,headBounds:[35996/455,11,89.5,19.5],headPhaseShare:170/857,headSeam:19.5,priorRequired:true,priorSegment:STROKES[6][0],proofFingerprint:'52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80',previewOnly:true}
]as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU7aeaLocalHeadTailPolicy(context:ReviewedU7aeaLocalHeadTailContext|null,pen:number,mask:number):ReviewedU7aeaLocalHeadTailPolicy|null{
 return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null
}
function source(policy:ReviewedU7aeaLocalHeadTailPolicy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 竪 local policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU7aeaLocalHeadTailFrame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-head-kernel-window'|'source-y-tail'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;anchorIsOriginalQ0:boolean;sourceT:number;headPhaseShare:number;headSeam:number;originalGuideAndWeightUnchanged:true;nativeForwardApproval:false;runtimeApplied:false;priorOpaque:boolean;previewOnly:true;authorClock:'source-author-head-kernel-then-y-tail';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU7aeaLocalHeadTailFrame(policy:ReviewedU7aeaLocalHeadTailPolicy,segment:HanjaOutlineSegment,p:number,priorProgress=0,priorOpaque=false):ReviewedU7aeaLocalHeadTailFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 竪 progress required')
 if(!Number.isFinite(priorProgress)||priorProgress<0||priorProgress>1||typeof priorOpaque!=='boolean')throw Error('Exact unit prior progress and actual DOM guard boolean required')
 if(p>0&&policy.priorRequired&&(priorProgress!==1||!priorOpaque))throw Error('Current-frame exact completed prior original P must be opaque')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const [hx0,hy0,hx1,hy1]=policy.headBounds,q=p/policy.headPhaseShare
 const clip=p>0&&p<1?Object.freeze(p<policy.headPhaseShare?{x:ax+(hx0-ax)*q,y:ay+(hy0-ay)*q,width:(hx1-hx0)*q,height:(hy1-hy0)*q}:{x:x0,y:y0,width:x1-x0,height:policy.headSeam+(y1-policy.headSeam)*((p-policy.headPhaseShare)/(1-policy.headPhaseShare))-y0}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':p<policy.headPhaseShare?'source-head-kernel-window':'source-y-tail',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,anchorIsOriginalQ0:false,sourceT:policy.sourceT,headPhaseShare:policy.headPhaseShare,headSeam:policy.headSeam,originalGuideAndWeightUnchanged:true,nativeForwardApproval:false,runtimeApplied:false,priorOpaque:policy.priorRequired?priorOpaque:false,previewOnly:true,authorClock:'source-author-head-kernel-then-y-tail',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU7aeaLocalHeadTailNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
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
/** New author clock: head-only union kernel is strict inside completed prior H; point rectangles stay above original ornamental maxY19.5. The tail then advances through the exact original Y-monotone union. This does not adopt the original Q clock. */
/** Current-frame canonical render equivalence only, not stylesheet-origin purity. Collapsed nonnegative boxes are valid; source window coordinates never change. */
function canonicalRectGeometry(owner:SVGSVGElement,doc:Document,view:Window,shape:Readonly<{x:number;y:number;width:number;height:number}>){
 const host=doc.createElementNS(NS,'g'),probe=doc.createElementNS(NS,'rect'),keys=['x','y','width','height']as const
 const neutral={display:'inline',visibility:'hidden',opacity:'0',fill:'none',stroke:'none',transform:'none',filter:'none','clip-path':'none','mask-image':'none',translate:'none',rotate:'none',scale:'none',animation:'none',transition:'none'}
 for(const node of[host,probe])for(const[k,v]of Object.entries(neutral))node.style.setProperty(k,v,'important')
 for(const k of keys){probe.setAttribute(k,String(shape[k]));probe.style.setProperty(k,String(shape[k])+'px','important')}
 const inline=new Map(keys.map(k=>[k,probe.style.getPropertyValue(k)]))
 host.appendChild(probe)
 try{
  owner.appendChild(host)
  const exact=()=>host.parentNode===owner&&probe.parentNode===host&&host.children.length===1&&host.children[0]===probe&&host.ownerSVGElement===owner&&probe.ownerSVGElement===owner&&host.ownerDocument===doc&&probe.ownerDocument===doc&&host.isConnected&&probe.isConnected&&doc.defaultView===view&&view.document===doc&&keys.every(k=>probe.getAttribute(k)===String(shape[k])&&probe.style.getPropertyPriority(k)==='important'&&inline.get(k)!==''&&probe.style.getPropertyValue(k)===inline.get(k))
  if(!exact())throw Error('Connected isolated canonical SVG rectangle required')
  for(const node of[host,probe]){
   const style=view.getComputedStyle(node)
   if(style.display==='none'||style.visibility!=='hidden'||Number(style.opacity)!==0||style.fill!=='none'||style.stroke!=='none'||style.transform!=='none'||style.filter!=='none'||style.clipPath!=='none'||!['','none'].includes(style.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(style.getPropertyValue(k))))throw Error('Canonical rectangle probe must have no paint or effects')
  }
  const computed=view.getComputedStyle(probe),css=new Map(keys.map(k=>[k,computed.getPropertyValue(k)])),b=probe.getBBox(),bounds={x:b.x,y:b.y,width:b.width,height:b.height}
  if([...css.values()].some(v=>!v.endsWith('px')||!Number.isFinite(Number(v.slice(0,-2))))||!Object.values(bounds).every(Number.isFinite)||bounds.width<0||bounds.height<0||!exact())throw Error('Finite nonnegative browser-canonical rectangle required')
  return{css,bounds}
 }finally{host.remove()}
}
export function commitReviewedU7aeaLocalHeadTail(policy:ReviewedU7aeaLocalHeadTailPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU7aeaLocalHeadTailNodes,priorProgress=0){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU7aeaLocalHeadTailFrame(policy,segment,progress,priorProgress,verifyReviewedU7aeaLocalHeadTailPriorDOM(policy,g,progress,priorProgress))
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-'+(policy.mask-1)))throw Error('Exact 竪 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 竪 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u7aea-local-head-tail-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const canonical=canonicalRectGeometry(owner,doc,view,shape),expectedCSS=canonical.css
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 竪 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 竪 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&slot.children.length===STROKES[policy.pen-1].length&&slot.children[policy.mask-1]===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===13&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')===String(priorProgress)&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(progress>0&&policy.priorRequired&&!verifyReviewedU7aeaLocalHeadTailPriorDOM(policy,g,progress,priorProgress))return false
   if(!exact(visibility,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   for(const node of tree){
    if(!node.isConnected||node.ownerDocument!==doc||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.namespaceURI!==NS||node.parentNode!==parents.get(node)||['transform','filter','mask'].some(k=>node.getAttribute(k)!==null)||(node!==p&&node.getAttribute('clip-path')!==null))return false
    const s=view.getComputedStyle(node)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||(node!==p&&s.clipPath!=='none')||!['','none'].includes(s.getPropertyValue('mask-image'))||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
   }
   const rs=view.getComputedStyle(r)
   if([...expectedCSS].some(([k,v])=>r.style.getPropertyValue(k)!==''||rs.getPropertyValue(k)!==v))return false
   const actualBox=r.getBBox()
   if(!(['x','y','width','height']as const).every(k=>Number.isFinite(actualBox[k])&&actualBox[k]===canonical.bounds[k]))return false
   const paint=view.getComputedStyle(p)
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 竪 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 竪 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 竪 visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,error:null,frame:f,cleanup:reset}
 }catch(error){reset();return {status:'hidden' as const,error:error instanceof Error?error.message:'Invalid source point-window DOM binding',frame:null,cleanup:reset}}
}

export function verifyReviewedU7aeaLocalHeadTailPriorDOM(policy:ReviewedU7aeaLocalHeadTailPolicy,g:SVGGElement|null,p:number,priorProgress:number):boolean{
 try{
  source(policy,policy.segment);if(!Number.isFinite(p)||p<0||p>1||!policy.priorRequired||!policy.priorSegment||priorProgress!==1||!g)return false
  const slot=g.parentNode,outer=slot?.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!owner||!view||view.document!==doc)return false
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,H=pen.children[0]as SVGPathElement|undefined,id=g.getAttribute(PREFIX+'clip')
  if(!H||!id||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-'+(policy.pen-1)+'-'+(policy.mask-1)))return false
  const exact=()=>g.parentNode===pen&&pen.children.length===STROKES[policy.pen-1].length&&pen.children[policy.mask-2]===H&&pen.children[policy.mask-1]===g&&pen.getAttribute('data-outline-stroke')===String(policy.pen)&&pen.parentNode===outlines&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===13&&outlines.children[policy.pen-1]===pen&&H.parentNode===pen&&H.localName==='path'&&H.getAttribute('d')===policy.priorSegment!.outline&&['pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>H.getAttribute(k)===null)&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')==='1'
  if(!exact())return false
  return opaqueTree([g,H],pen,owner,doc,view,exact)&&opaqueSourcePath(H,policy.priorSegment!.outline,doc,view)&&exact()
 }catch{return false}
}
function opaqueSourcePath(p:SVGPathElement,d:string,doc:Document,view:Window):boolean{
 const s=view.getComputedStyle(p)
 return p.getAttribute('d')===d&&['mask','clip-path','transform','filter','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>p.getAttribute(k)===null)&&s.visibility==='visible'&&s.stroke==='none'&&s.fillRule==='nonzero'&&Number(s.fillOpacity)===1&&Number(s.opacity)===1&&opaqueRGB(s.fill)&&cssSourcePath(doc,s.getPropertyValue('d').trim(),d)
}
function opaqueTree(extra:Element[],start:Element,owner:SVGSVGElement,doc:Document,view:Window,exact:()=>boolean):boolean{
 const tree=[...extra],seen=new Set<Element>();let n:Element|null=start
 while(n){if(seen.has(n))return false;seen.add(n);tree.push(n);if(n===owner)break;const a:ParentNode|null=n.parentNode;n=a&&a.nodeType===1?a as Element:null}
 if(n!==owner)return false
 const parents=new Map(tree.map(v=>[v,v.parentNode]))
 const valid=(v:Element)=>{const s=view.getComputedStyle(v);return v.isConnected&&v.ownerDocument===doc&&v.namespaceURI===NS&&(v===owner||(v as SVGElement).ownerSVGElement===owner)&&v.parentNode===parents.get(v)&&['mask','clip-path','transform','filter'].every(k=>v.getAttribute(k)===null)&&s.display!=='none'&&s.visibility==='visible'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.mixBlendMode==='normal'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))}
 return exact()&&tree.every(valid)&&doc.defaultView===view&&view.document===doc&&exact()&&tree.every(v=>v.isConnected&&v.parentNode===parents.get(v))
}
export const REVIEWED_U7AEA_LOCAL_HEAD_TAIL_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json":"9b6539a02fcad5e919ba79b193463f1e26556d434098f0154df0cb8a54a2c91e","docs/hanja-source-original-u7aea-local-2026-10-27/five-prefix-conditions-proof.json":"52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80","docs/hanja-source-original-u7aea-local-2026-10-27/verify-five-prefix-conditions.py":"f61d280a2efec8aeeac5b4ed01074aed51248d7d4dea21aef780462e706db48f","docs/hanja-official-media-compare-u7aea-2026-10-27/native-direction-review.json":"32fedac3cf918dfefa6dce1de9df8eebe895c68deb271221961eaa2ee5a2f43a"})
export const REVIEWED_U7AEA_LOCAL_HEAD_TAIL=freeze({"glyph":"竪","root":"lingo-u7aea-no-extra-v1","locallyAuthoredRoot":true,"mixedParts":false,"originalPublicWholeClaim":false,"fixtureSHA256":"9b6539a02fcad5e919ba79b193463f1e26556d434098f0154df0cb8a54a2c91e","geometrySHA256":"c59c97d44ce071358ae98d1e01b34d32447276e5ab736f88d59766262dc0f110","targetPens":[7],"targets":[{"pen":7,"mask":2,"sourceT":0.015625,"anchor":[83.746337890625,15.278564453125],"headSeam":19.5,"headPhaseShare":0.1983663943990665,"priorRequired":true}],"sourcePOrQOrBoundsOrWidthOrWeightChanged":false,"geometryFamily":"source-bounded head union kernel + exact original Y tail; prior H opaque required","sourceQForwardTimingApproved":false,"authorClock":"source-author-head-kernel-then-y-tail","previewOnly":true,"appRendererConnected":false,"nativeApproval":false,"runtimeApplied":false})
