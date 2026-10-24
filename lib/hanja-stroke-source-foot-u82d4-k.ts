import type{HanjaOutlineSegment,HanjaOutlineStrokes}from'./hanja-stroke-outline.ts'
import{makeReviewedU82d4KSourceContext,reviewedU82d4KContext}from'./hanja-stroke-start-caps-u82d4-k.ts'
function freeze<T>(x:T):T{if(x&&typeof x==='object'){for(const v of Object.values(x))freeze(v);Object.freeze(x)}return x}
const POLICY=freeze({"id":"u82d4-k-source-foot-5-2","kind":"source-foot-x-u82d4-k","pen":5,"mask":2,"segment":{"outline":"M13.8 55.05 L18.95 54.85 L24.4 54.65 L30.15 54.45 L36.2 54.2 L42.55 53.9 L49.2 53.6 L56.2 53.3 L63.45 53 L71.05 52.75 L78.95 52.55 L79 53.45 L71.2 54.65 L63.7 55.65 L56.45 56.55 L49.55 57.4 L42.9 58.15 L36.55 58.8 L30.5 59.45 L24.75 60 L19.3 60.55 L14.15 61 Z M14.15 61 L12.8 55.1 L13.8 55.05 Z M14.15 61 L17.05 59.35 L15.25 62.45 Z","bounds":[12.8,52.55,79,62.45],"direction":"curve","weight":65.694387,"revealPath":"M13.5 58.075 Q39 56.56 79 53.025","revealWidth":14},"previousSegment":{"outline":"M49.3 33.2 L47.7 35.6 L45.95 38 L44.05 40.4 L42 42.8 L39.8 45.25 L37.45 47.7 L34.95 50.15 L32.25 52.6 L29.4 55 L26.3 57.35 L25.65 56.7 L28.05 53.65 L30.3 50.75 L32.5 47.95 L34.6 45.2 L36.5 42.55 L38.35 39.95 L40 37.45 L41.5 34.95 L42.9 32.55 L44.15 30.2 Z M43.9 30.65 L44.4 29.75 L49.3 33.2 Z M49.3 33.2 L50.1 34.85 L47.2 34.9 Z","bounds":[25.65,29.75,50.1,57.35],"direction":"curve","weight":33.231311,"revealPath":"M47 31.31 Q40 43.43 26 57.065","revealWidth":14},"cutX":30,"bodyEndX":79,"phaseShare":0.3671187667340502,"phaseShareExact":"3711565983/10109987065","bounds":[12.8,52.55,79,62.45],"previousCompletedRequired":true,"previousCompletion":"original-Q7-tube","originalPOnce":true,"originalGuideUnchanged":true,"originalWeightUnchanged":true} as const)
const FOOT=freeze({"triangles":[[[["283","20"],["61","1"]],[["64","5"],["551","10"]],[["69","5"],["1101","20"]]],[[["283","20"],["61","1"]],[["69","5"],["1101","20"]],[["379","20"],["1097","20"]]],[[["283","20"],["61","1"]],[["379","20"],["1097","20"]],[["122","5"],["1093","20"]]],[[["283","20"],["61","1"]],[["122","5"],["1093","20"]],[["30","1"],["125247","2300"]]],[[["283","20"],["61","1"]],[["30","1"],["125247","2300"]],[["30","1"],["27369","460"]]],[[["283","20"],["61","1"]],[["30","1"],["27369","460"]],[["99","4"],["60","1"]]],[[["99","4"],["60","1"]],[["193","10"],["1211","20"]],[["28051","1732"],["131678","2165"]]],[[["283","20"],["61","1"]],[["99","4"],["60","1"]],[["28051","1732"],["131678","2165"]]],[[["28051","1732"],["131678","2165"]],[["61","4"],["1249","20"]],[["283","20"],["61","1"]]]],"order":[{"triangle":4,"seed":[["53","2"],["284","5"]],"priorTriangle":null,"shared":null},{"triangle":3,"seed":[["883","40"],["265547","4600"]],"priorTriangle":4,"shared":[[["283","20"],["61","1"]],[["30","1"],["125247","2300"]]]},{"triangle":5,"seed":[["883","40"],["55429","920"]],"priorTriangle":4,"shared":[[["283","20"],["61","1"]],[["30","1"],["27369","460"]]]},{"triangle":2,"seed":[["771","40"],["2313","40"]],"priorTriangle":3,"shared":[[["283","20"],["61","1"]],[["122","5"],["1093","20"]]]},{"triangle":7,"seed":[["389","20"],["121","2"]],"priorTriangle":5,"shared":[[["283","20"],["61","1"]],[["99","4"],["60","1"]]]},{"triangle":1,"seed":[["331","20"],["2317","40"]],"priorTriangle":2,"shared":[[["283","20"],["61","1"]],[["379","20"],["1097","20"]]]},{"triangle":6,"seed":[["35459","1732"],["130789","2165"]],"priorTriangle":7,"shared":[[["28051","1732"],["131678","2165"]],[["99","4"],["60","1"]]]},{"triangle":8,"seed":[["131397","8660"],["263743","4330"]],"priorTriangle":7,"shared":[[["283","20"],["61","1"]],[["28051","1732"],["131678","2165"]]]},{"triangle":0,"seed":[["559","40"],["2321","40"]],"priorTriangle":1,"shared":[[["69","5"],["1101","20"]],[["283","20"],["61","1"]]]}],"weights":[["530651026","1237188661"],["222839120","1237188661"],["484960","1237188661"],["216160095","1237188661"],["3006560","3711565983"],["203910525","1237188661"],["1520760","1237188661"],["62999300","3711565983"],["118860665","3711565983"]],"boundary":[[["64","5"],["551","10"]],[["69","5"],["1101","20"]],[["379","20"],["1097","20"]],[["122","5"],["1093","20"]],[["30","1"],["125247","2300"]],[["30","1"],["27369","460"]],[["99","4"],["60","1"]],[["193","10"],["1211","20"]],[["28051","1732"],["131678","2165"]],[["61","4"],["1249","20"]],[["283","20"],["61","1"]]],"footArea":["3711565983","39836000"],"totalArea":["87912931","346400"]})
const CONTEXT=Object.freeze({id:'u82d4-k-source-foot5m2-original-P'})
export type ReviewedU82d4KFootContext=typeof CONTEXT
export type ReviewedU82d4KFootPolicy=typeof POLICY
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU82d4KFootContext(strokes:HanjaOutlineStrokes):ReviewedU82d4KFootContext|null{return reviewedU82d4KContext(strokes)?CONTEXT:null}
export function makeReviewedU82d4KFootSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU82d4KFootContext|null{return makeReviewedU82d4KSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU82d4KFootPolicy(context:ReviewedU82d4KFootContext|null,pen:number,mask:number):ReviewedU82d4KFootPolicy|null{return context===CONTEXT&&pen===4&&mask===1?POLICY:null}
const rat=(x:readonly string[])=>Number(x[0])/Number(x[1]),point=(p:readonly(readonly string[])[])=>p.map(rat)
const path=(p:readonly(readonly number[])[])=>p.map((q,i)=>(i?'L':'M')+q[0]+' '+q[1]).join(' ')+' Z'
export function sampleReviewedU82d4KFootFrame(policy:ReviewedU82d4KFootPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number){
 if(policy!==POLICY||!exact(segment,POLICY.segment))throw Error('Exact private original-P foot and segment required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite bounded original mask progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed exact original Q7 predecessor required')
 const footComplete=progress>=policy.phaseShare,footProgress=footComplete?1:progress/policy.phaseShare,bodyProgress=footComplete?(progress-policy.phaseShare)/(1-policy.phaseShare):0
 let footPathD='',footFullTriangles=0,footLocal=0,remaining=footProgress
 if(progress>0&&!footComplete)for(let i=0;i<FOOT.order.length;i++){const item=FOOT.order[i],w=rat(FOOT.weights[i]),triangle=FOOT.triangles[item.triangle].map(point);if(remaining>=w){footPathD+=path(triangle)+' ';remaining-=w;footFullTriangles++;continue}if(remaining>0){footLocal=Math.sqrt(remaining/w);const seed=point(item.seed);footPathD+=path(triangle.map(q=>q.map((v,k)=>seed[k]+(v-seed[k])*footLocal)))+' '}break}
 const fullFootClip=Object.freeze({x:policy.bounds[0],y:policy.bounds[1],width:footComplete?policy.cutX-policy.bounds[0]:0,height:policy.bounds[3]-policy.bounds[1]})
 const bodyClip=Object.freeze({x:policy.cutX,y:policy.bounds[1],width:(policy.bodyEndX-policy.cutX)*bodyProgress,height:policy.bounds[3]-policy.bounds[1]})
 const fullOriginalClip=Object.freeze({x:policy.bounds[0],y:policy.bounds[1],width:policy.bounds[2]-policy.bounds[0],height:progress===1?policy.bounds[3]-policy.bounds[1]:0})
 return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty' as const:progress===1?'full' as const:footComplete?'body' as const:'foot' as const,footProgress,bodyProgress,footPathD:footPathD.trim(),footFullTriangles:footComplete?FOOT.order.length:footFullTriangles,footLocal,fullFootClip,bodyClip,fullOriginalClip,visible:progress>0,requiresCompletedOriginalPredecessor:true,paintOriginalPOnce:true,originalPDirect:progress===1,originalSourceFull:progress===1,originalMaskRequiredAtCompletion:false,completionDirectOriginalOutlineRequired:true,zeroRetraceOriginalPathPreserved:true,UARead:false})
}
export const REVIEWED_U82d4K_FOOT_SOURCE=freeze({"root":"u82d4-k","fixture":"docs/hanja-source-original-u82d4-k-2026-10-25/fixtures.json","fixtureSHA256":"8daca33d9ff6e7275d2a19432dd03805f98034353872eabcb4d40cfb2a8e6fbd","geometrySHA256":"11d744af7cc605e1f23081f08534f7b3bd73dc4ef7624c504867f1a5e606b20d","target":[5,2],"sourceMaskSHA256":"fe8638eb742a06cbf064ddc64da0ca84f0a191c6bf13aae35254ee788a01dab0","previousMaskSHA256":"626bce9f59dbd891b5fb04038063a389a6b9835a083dacb1d28d3bcd16529c7a","proof":"docs/hanja-source-original-u82d4-k-2026-10-25/source-foot-proof.json","proofSHA256":"e90ca125ecf8d7dbf95e4dbe6e67136cb72f214baa52114a6ca0520512b24307","triangles":9,"bodySlabs":16,"cutX":"30","phaseShareExact":"3711565983/10109987065","guideGapPreserved":true,"originalSourceStringUnchanged":true,"newDisplayClockExplicit":true,"sourceTimingEquivalent":false,"nativeApproval":false,"runtimeApplied":false,"productionImportAllowed":false})

function u82d4KFootCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 苔 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 苔 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 苔 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 苔 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 苔 SVG coordinate tree')
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

export function verifyReviewedU82d4KFootPrior(policy:ReviewedU82d4KFootPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean {
 try {
  if(policy!==POLICY||!g?.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id)return false
  if(previousMaskProgress!==1||!policy.previousSegment)return false
  const expected=policy.previousSegment,previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!previous||!owner||!view||previous.parentElement!==g.parentElement||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
  const paths=previous.localName==='path'?[previous]:Array.from(previous.children).filter(n=>n.localName==='path')
  const visible=paths.filter(n=>{const s=view.getComputedStyle(n);return s.visibility==='visible'&&s.display!=='none'&&s.opacity!=='0'})
  if(paths.length!==1||visible.length!==1)return false
  const p=visible[0]
  if(!p.isConnected||p.ownerDocument!==doc||(p as SVGElement).ownerSVGElement!==owner||p.getAttribute('d')!==expected.outline||p.getAttribute('pathLength')!==null)return false
  if(previous.localName!=='path'&&previous.getAttribute('data-stroke-reveal-progress')!=='1')return false
  const painted=()=>[previous,p].every(n=>{const s=view.getComputedStyle(n);return ['transform','filter','clip-path'].every(k=>n.getAttribute(k)===null)&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&s.visibility==='visible'&&s.display!=='none'&&s.opacity==='1'&&s.fillOpacity==='1'&&s.stroke==='none'&&s.fill!=='none'&&s.fill!=='transparent'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))})
  if(!painted())return false
  for(const start of[g,previous]){let n:Element|null=start;while(n){const st=view.getComputedStyle(n);if(!n.isConnected||n.ownerDocument!==doc||st.opacity!=='1'||st.visibility!=='visible'||st.display==='none'||st.filter!=='none'||st.clipPath!=='none'||!['','none'].includes(st.getPropertyValue('mask-image'))||['transform','filter','mask','clip-path'].some(k=>n!.getAttribute(k)!==null))return false;if(n===owner)break;n=n.parentElement}if(n!==owner)return false}
  const clip=previous.getAttribute('data-u82d4-k-clip')
  if(previous.localName!=='g'||previous.getAttribute('data-stroke-start-gate')!=='u82d4-k-5-1'||previous.getAttribute('data-u82d4-k-progress')!=='1'||!clip||!/^[A-Za-z0-9_:.-]+$/.test(clip)||previous.getAttribute('mask')!==null||p.getAttribute('mask')!=='url(#'+clip+')'||p.getAttribute('data-u82d4-k-full-original-q-tube')!=='true'||p.getAttribute('data-u82d4-k-full-committed')!=='true')return false
  const defs=Array.from(previous.children).filter(n=>n.localName==='defs');if(defs.length!==1)return false
  const masks=Array.from(defs[0].children).filter(n=>n.localName==='mask'&&n.getAttribute('id')===clip);if(masks.length!==1)return false
  const mask=masks[0],guide=mask.children[0]
  if(mask.children.length!==1||guide?.localName!=='path'||mask.getAttribute('maskUnits')!=='userSpaceOnUse'||mask.getAttribute('maskContentUnits')!=='userSpaceOnUse'||['x','y'].some(k=>mask.getAttribute(k)!=='0')||['width','height'].some(k=>mask.getAttribute(k)!=='100'))return false
  if(guide.getAttribute('d')!==expected.revealPath||guide.getAttribute('fill')!=='none'||guide.getAttribute('stroke')!=='white'||guide.getAttribute('stroke-width')!==String(expected.revealWidth)||guide.getAttribute('stroke-linecap')!=='round'||guide.getAttribute('stroke-linejoin')!=='miter'||guide.getAttribute('pathLength')!=='1'||guide.getAttribute('stroke-dasharray')!=='1 2'||guide.getAttribute('stroke-dashoffset')!=='0'||['mask','clip-path','transform','filter'].some(k=>guide.getAttribute(k)!==null))return false
  if(!u82d4KFootCoordinateBinding([previous as SVGElement,p as SVGElement,defs[0] as SVGElement,mask as SVGElement,guide as SVGElement],owner)())return false
  const s=view.getComputedStyle(guide)
  return s.fill==='none'&&['white','rgb(255, 255, 255)'].includes(s.stroke)&&parseFloat(s.strokeWidth)===expected.revealWidth&&s.strokeLinecap==='round'&&s.strokeLinejoin==='miter'&&s.opacity==='1'&&s.strokeOpacity==='1'&&s.visibility==='visible'&&s.display!=='none'&&view.getComputedStyle(mask).opacity==='1'
 }catch{return false}
}
