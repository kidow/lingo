/** 菰10 preview: strict original-source authored-anchor rectangle. No native/app approval. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-independent-melon-line-q-u83f0-k-source-experiment-2026-10-23/fixtures.json' with {type:'json'}
import assessment from '../docs/hanja-source-pen10-u83f0-k-assessment-2026-10-23/evidence.json' with {type:'json'}
const FIXED=fixture['u83f0-k'],STROKES=FIXED.strokes as HanjaOutlineStrokes,IDENTITY=assessment.sourceIdentity
const NS='http://www.w3.org/2000/svg',PREFIX='data-u83f0-k-source-window10-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED);freeze(IDENTITY)
export type ReviewedU83f0KSourceWindow10Context=Readonly<{id:'u83f0-k-original-12-preview-window10'}>
const CONTEXT:ReviewedU83f0KSourceWindow10Context=Object.freeze({id:'u83f0-k-original-12-preview-window10'})
export function makeReviewedU83f0KSourceWindow10Context(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU83f0KSourceWindow10Context|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,IDENTITY)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU83f0KSourceWindow10Policy=Readonly<{
 id:string;kind:'source-preview-window-u83f0-k-10';pen:10;mask:2;segment:HanjaOutlineSegment;priorSegment:HanjaOutlineSegment;
 anchor:readonly[number,number];sourceBounds:readonly number[];
 proofFamily:'finite-source-rect-intersection-connected';proofFingerprint:string
}>
const POLICIES:readonly ReviewedU83f0KSourceWindow10Policy[]=freeze([
 {id:'u83f0-k-source-window10-10-2',kind:'source-preview-window-u83f0-k-10',pen:10,mask:2,segment:STROKES[9][1],priorSegment:STROKES[9][0],anchor:[63.75,84.5],sourceBounds:STROKES[9][1].bounds,proofFamily:'finite-source-rect-intersection-connected',proofFingerprint:'bc5decaf89bf02f4a7d05c410a92dd8e01beffaa66455b62e6e659f3c0e2b08e'}
] as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU83f0KSourceWindow10Policy(context:ReviewedU83f0KSourceWindow10Context|null,pen:number,mask:number):ReviewedU83f0KSourceWindow10Policy|null{
 return context===CONTEXT&&mask===1?POLICIES.find(p=>p.pen===pen+1)??null:null
}
function source(policy:ReviewedU83f0KSourceWindow10Policy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 菰10 preview policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU83f0KSourceWindow10Frame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-authored-anchor-point-window'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;sourceCalculatedWeight:number;originalQ0:readonly[number,number];authorAnchorOffset:readonly[number,number];anchorIsOriginalQ0:false;authorClock:'source-author-preview-window10';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU83f0KSourceWindow10Frame(policy:ReviewedU83f0KSourceWindow10Policy,segment:HanjaOutlineSegment,p:number,previousMaskProgress=0,priorOpaque=false):ReviewedU83f0KSourceWindow10Frame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 菰10 preview progress required')
 if(p>0&&(previousMaskProgress!==1||priorOpaque!==true))throw Error('Exact completed same-frame original 菰 V required')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax+(x0-ax)*p,y:ay+(y0-ay)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-authored-anchor-point-window',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,sourceCalculatedWeight:segment.weight,originalQ0:Object.freeze([46.2,87.8425] as const),authorAnchorOffset:Object.freeze([policy.anchor[0]-46.2,policy.anchor[1]-87.8425] as const),anchorIsOriginalQ0:false,authorClock:'source-author-preview-window10',originalClockEquivalent:false,UARead:false})
}

/** Actual completed V mask1 in the same pen/SVG/owner/frame; no Q-gap repair. */
export function verifyReviewedU83f0KSourceWindow10Prior(policy:ReviewedU83f0KSourceWindow10Policy,g:SVGGElement|null,previousMaskProgress:number,frameId:string):boolean{
 try{
  if(!policy||!PRIVATE.has(policy)||!g||previousMaskProgress!==1||typeof frameId!=='string'||!frameId||!/^[A-Za-z0-9_:.-]+$/.test(frameId))return false
  source(policy,policy.segment)
  const slot=g.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,clipId=g.getAttribute(PREFIX+'clip')
  if(!slot||slot.nodeType!==1||!owner||!view||view.document!==doc||!clipId||!clipId.endsWith('-9-1')||!/^[A-Za-z0-9_:.-]+$/.test(clipId))return false
  const pen=slot as SVGGElement,outer=pen.parentNode,prior=pen.children[0]as SVGPathElement,ownerKey=clipId+'-owner'
  if(!outer||outer.nodeType!==1||!prior)return false
  const outlines=outer as SVGGElement
  const exact=()=>g.parentNode===pen&&pen.parentNode===outlines&&pen.children.length===2&&pen.children[1]===g&&pen.children[0]===prior&&prior.localName==='path'&&prior.getAttribute('d')===policy.priorSegment.outline&&['mask','clip-path','transform','filter','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>prior.getAttribute(k)===null)&&pen.getAttribute('data-outline-stroke')==='10'&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===12&&outlines.children[9]===pen&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute(PREFIX+'frame')===frameId&&prior.getAttribute(PREFIX+'frame')===frameId&&prior.getAttribute(PREFIX+'progress')==='1'&&[pen,g,prior].every(n=>n.getAttribute(PREFIX+'owner')===ownerKey)
  if(!exact())return false
  const nodes:Element[]=[g,prior],parents=new Map<Element,ParentNode|null>(),seen=new Set<Element>();let n:Element|null=pen
  while(n){if(seen.has(n))return false;seen.add(n);nodes.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)return false
  const valid=(node:Element)=>{
   if(!node.isConnected||node.ownerDocument!==doc||node.namespaceURI!==NS||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||['mask','clip-path','transform','filter'].some(k=>node.getAttribute(k)!==null))return false
   const s=view.getComputedStyle(node)
   return s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.mixBlendMode==='normal'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))
  }
  for(const node of nodes){parents.set(node,node.parentNode);if(!valid(node))return false}
  const paint=view.getComputedStyle(prior)
  if(paint.fillRule!=='nonzero'||paint.stroke!=='none'||!opaqueRGB(paint.fill)||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),policy.priorSegment.outline))return false
  return exact()&&doc.defaultView===view&&view.document===doc&&nodes.every(valid)&&[...parents].every(([node,parent])=>node.parentNode===parent)&&exact()
 }catch{return false}
}

export type ReviewedU83f0KSourceWindow10Nodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
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
/** Preview only: original Q3P after the actual completed original V2P in this frame. */
export function commitReviewedU83f0KSourceWindow10(policy:ReviewedU83f0KSourceWindow10Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU83f0KSourceWindow10Nodes,previousMaskProgress:number,frameId:string){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const priorValid=()=>verifyReviewedU83f0KSourceWindow10Prior(policy,g,previousMaskProgress,frameId)
  const f=sampleReviewedU83f0KSourceWindow10Frame(policy,segment,progress,previousMaskProgress,progress===0||priorValid())
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-1'))throw Error('Exact 菰10 preview target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 菰10 preview SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u83f0-k-source-window10-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const expectedCSS=new Map<string,string>()
  for(const [k,v]of Object.entries(shape)){const probe=doc.createElementNS(NS,'rect');probe.style.setProperty(k,String(v)+'px');expectedCSS.set(k,probe.style.getPropertyValue(k))}
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 菰10 preview owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 菰10 preview SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&slot.children.length===2&&slot.children[1]===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===12&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(progress>0&&!priorValid())return false
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
  if(!stable('hidden',false))throw Error('Changed 菰10 preview source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 菰10 preview pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 菰10 preview visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,frame:f,cleanup:reset}
 }catch(error){reset();return {status:'hidden' as const,frame:null,reason:error instanceof Error?error.message:'Invalid source-window binding',cleanup:reset}}
}
export const REVIEWED_U83F0_K_SOURCE_WINDOW10=freeze({"glyph":"菰","root":"u83f0-k","pens":12,"masks":13,"polygons":34,"geometrySHA256":"2b7c85d13238aa00e29782f314ef6ec26e87affe01c1c74f8a53ba7580506da4","pen":10,"mask":2,"originalVSourceP":2,"originalQSourceP":3,"originalQ0":[46.2,87.8425],"authorAnchor":[63.75,84.5],"authorClock":"source-author-preview-window10","originalClockEquivalent":false,"originalForwardApproved":false,"R7HeadJustified":false,"previewOnly":true,"finiteEquationCount":200,"eventCount":79,"openIntervals":78,"closedPositiveStates":78,"firstExposureOutsidePrior":"13/152","sourcePOrQOrWidth14OrWeightChanged":false,"sourceVToQGapChanged":false,"sourceVToQGapOriginal200":35.86129529172086,"appRendererConnected":false,"nativeApproval":false,"runtimeApplied":false,"requiredNextReview":"Original microdirection versus new authored frontier; left decoration and right body reveal order are unapproved"})
export const REVIEWED_U83F0_K_SOURCE_WINDOW10_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-full-u83f0-k-2026-10-23/engine-proof.json":"863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5","docs/hanja-source-independent-melon-line-q-u83f0-k-source-experiment-2026-10-23/fixtures.json":"0c123ee5dfaa216583d5201a4dc998250fa6132986b6a91c2dfa187950d3cff6","docs/hanja-source-pen10-u83f0-k-assessment-2026-10-23/evidence.json":"341a98b5d9b0d3b779790ecd1d8dd016ae3cd0b7d52769fc34160e6694867fcd","docs/hanja-source-raw-compare-u83f0-k-2026-10-23/native-static-review.json":"1c004db0a85698efa956a27c0a07655bbf57af79508f226b305a4abbb52de446","docs/hanja-official-media-compare-u83f0-2026-10-23/official-temporal-native-review.json":"08ab76a6600693b63663b7c6525314858112fa905b052df4c0009caf3c8d761c","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b","docs/hanja-source-pen10-u83f0-k-conditions-2026-10-26/original-connected-window-proof.json":"bc5decaf89bf02f4a7d05c410a92dd8e01beffaa66455b62e6e659f3c0e2b08e","docs/hanja-source-pen10-u83f0-k-conditions-2026-10-26/verify-original-connected-window.py":"f41beddd21026cdc0215d9b8462551b68703e2c776442210b0e283d9b995fadf"})
/** identity is the tracked assessment sourceIdentity; old fixture has no identity field. */
export const REVIEWED_U83F0_K_SOURCE_WINDOW10_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:IDENTITY})
