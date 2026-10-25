/** 幪 original whole-bound initial masks. Provisional; native and full sweep pending. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
const FIXED_ENTRY=fixture['hkcs_m5e6a']
const FIXED_FULL5=FIXED_ENTRY.fullProof
const FIXED_IDENTITY=FIXED_ENTRY.identity
const FIXED_STROKES:HanjaOutlineStrokes=FIXED_ENTRY.strokes as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&sameJSON(ad.value,bd.value)})}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}
export type ReviewedU5e6aHkcsContext=Readonly<{id:'u5e6a-hkcs-original-17-initial-guides'}>
export type ReviewedU5e6aHkcsGrowingCertificate=Readonly<{syntax:'MQ'|'MLQ'|'MLQL'|'MLL'|'MQQ'|'MC';initialKind:'single-quadratic'|'straight-first-leg'|'single-cubic';T:string|null;K:string;firstLegLength:string|null;initialArcMax:7;storedBounds:Readonly<Record<string,unknown>>;notRasterProof:true;notPreviousMaskConnectivityProof:true;notFullSweepProof:true}>
export type ReviewedU5e6aHkcsPolicy=Readonly<{id:string;kind:'growing-u5e6a-hkcs-caps';segment:HanjaOutlineSegment;certificate:ReviewedU5e6aHkcsGrowingCertificate}>
const CONTEXT:ReviewedU5e6aHkcsContext=Object.freeze({id:'u5e6a-hkcs-original-17-initial-guides'})
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=[{"id":"u5e6a-hkcs-8-1","pen":8,"mask":1,"certificate":{"pen":8,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M44.5 24 Q44.5 32 38.5 38.5","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/10","u":["0","8"],"v":["-6","-3/2"],"lambdaAt":"16/51","lambda":"1024/17","cross":"48","chordSquaredMinusRadiusSquared":"729/64","curvatureMargin":"790753024/122825","cosLower":"151/200","cosMinusRK":"11/200","strictAxis":"y","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":false,"chordMargin":"729/64","curvatureMargin":"-14553344/122825","cosMinusRK":"471/800"},{"T":"1","K":"1/20","ok":false,"chordMargin":"789/4","curvatureMargin":"-14553344/122825","cosMinusRK":"471/800"},{"T":"1/2","K":"1/10","ok":true,"chordMargin":"729/64","curvatureMargin":"790753024/122825","cosMinusRK":"11/200"}],"width":14,"radius":7,"weight":15.692355,"maskSHA256":"adcac151cf3687242921b2fe61d1f28dbdbcc2a28e137a006340f2c3119e414c","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}},{"id":"u5e6a-hkcs-12-1","pen":12,"mask":1,"certificate":{"pen":12,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M65 48 Q57 58 40 64","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["-8","10"],"v":["-9","-4"],"lambdaAt":"0","lambda":"164","cross":"122","chordSquaredMinusRadiusSquared":"2193/16","curvatureMargin":"730636/25","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"2193/16","curvatureMargin":"730636/25","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":29.681644,"maskSHA256":"7696d361b7d9d405fd5da743b48d05d3bfbbf7fecc9e26bb59d355a572039d51","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}},{"id":"u5e6a-hkcs-13-1","pen":13,"mask":1,"certificate":{"pen":13,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M59.5 56 Q72.5 73.5 67.78568733133295 85.82974082574458","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["13","35/2"],"v":["-354286253373341/20000000000000","-258512958712771/50000000000000"],"lambdaAt":"1/2","lambda":"9584660522837042802273351550789/40000000000000000000000000000","cross":"48557420487270583/200000000000000","chordSquaredMinusRadiusSquared":"45944036513151382802273351550789/160000000000000000000000000000","curvatureMargin":"503250020871514008880018671295372080073751301502736057232644440407754741773614383958763819069/6400000000000000000000000000000000000000000000000000000000000000000000000000000000000000","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"45944036513151382802273351550789/160000000000000000000000000000","curvatureMargin":"503250020871514008880018671295372080073751301502736057232644440407754741773614383958763819069/6400000000000000000000000000000000000000000000000000000000000000000000000000000000000000","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":30.959103,"maskSHA256":"09e4d518c48e1a16474f0908e89139958ea7a914175b919d50bf667ead4e0470","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}},{"id":"u5e6a-hkcs-14-1","pen":14,"mask":1,"certificate":{"pen":14,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M64 61 Q55 69.5 39.5 76.5","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["-9","17/2"],"v":["-13/2","-3/2"],"lambdaAt":"0","lambda":"613/4","cross":"275/4","chordSquaredMinusRadiusSquared":"4157/32","curvatureMargin":"200096397/6400","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"4157/32","curvatureMargin":"200096397/6400","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":28.991378,"maskSHA256":"0d2dbdbf84e9e37d4ef9890b914ac9284b6d78dbcc870b03955658fc60388b9b","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}},{"id":"u5e6a-hkcs-15-1","pen":15,"mask":1,"certificate":{"pen":15,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M67.5 69 Q57.5 81 39.5 87","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["-10","12"],"v":["-8","-6"],"lambdaAt":"0","lambda":"244","cross":"156","chordSquaredMinusRadiusSquared":"821/4","curvatureMargin":"3023296/25","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"821/4","curvatureMargin":"3023296/25","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":33.286634,"maskSHA256":"6549b00ab322526effca2d5a108ed1457a38f731725f5d919f51f23b9e54e91e","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}},{"id":"u5e6a-hkcs-16-1","pen":16,"mask":1,"certificate":{"pen":16,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M87 55 Q83 61 74 68","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["-4","6"],"v":["-5","1"],"lambdaAt":"0","lambda":"52","cross":"26","chordSquaredMinusRadiusSquared":"141/8","curvatureMargin":"18252/25","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"141/8","curvatureMargin":"18252/25","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":18.384776,"maskSHA256":"8a09c9c685784ab59464e6900171904f587ee49a8a90c36e51e65c073c6e4ea6","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}},{"id":"u5e6a-hkcs-17-1","pen":17,"mask":1,"certificate":{"pen":17,"mask":1,"syntax":"MQ","initialKind":"single-quadratic","guide":"M67 48 Q74 73.5 90.5 85","initialArcMax":7,"firstLegLength":null,"T":"1/2","K":"1/20","u":["7","51/2"],"v":["19/2","-14"],"lambdaAt":"1/2","lambda":"7685/16","cross":"-1361/4","chordSquaredMinusRadiusSquared":"33465/64","curvatureMargin":"16258029061/16384","cosLower":"751/800","cosMinusRK":"471/800","strictAxis":"x","initialSufficientConditions":true,"attempts":[{"T":"1/2","K":"1/20","ok":true,"chordMargin":"33465/64","curvatureMargin":"16258029061/16384","cosMinusRK":"471/800"}],"width":14,"radius":7,"weight":43.832066,"maskSHA256":"f2ff02d8af9f9047d7614df2bb4d1b2245e73fb57117355297f3edfb76aa6143","notRasterProof":true,"PIntersectionConnectivityNotProved":true,"notFullSweepProof":true,"priorMaskContactClaimed":false}}]
function ownCertificate(stored:typeof TARGETS[number]['certificate']):ReviewedU5e6aHkcsGrowingCertificate{ensure(stored.initialSufficientConditions&&stored.syntax==='MQ'&&stored.initialKind==='single-quadratic','Own exact MQ initial certificate required');return deepFreeze({syntax:stored.syntax as 'MQ',initialKind:stored.initialKind as 'single-quadratic',T:stored.T,K:stored.K,firstLegLength:stored.firstLegLength,initialArcMax:7 as const,storedBounds:stored,notRasterProof:true as const,notPreviousMaskConnectivityProof:true as const,notFullSweepProof:true as const})}
const POLICIES:readonly ReviewedU5e6aHkcsPolicy[]=Object.freeze(TARGETS.map(t=>Object.freeze({id:t.id,kind:'growing-u5e6a-hkcs-caps' as const,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:ownCertificate(t.certificate)})))
export function reviewedU5e6aHkcsContext(strokes:HanjaOutlineStrokes):ReviewedU5e6aHkcsContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU5e6aHkcsPolicy(context:ReviewedU5e6aHkcsContext|null,pen:number,mask:number):ReviewedU5e6aHkcsPolicy|null{if(context!==CONTEXT)return null;return POLICIES.find(t=>t.id==='u5e6a-hkcs-'+(pen+1)+'-'+(mask+1))??null}
function source(policy:ReviewedU5e6aHkcsPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy)&&sameSegment(segment,policy.segment),'Private whole-bound policy and exact original fields required');ensure(segment.revealWidth===14&&segment.direction==='curve'&&segment.revealPath,'Original guide/width');const syntax=(segment.revealPath.match(/[MLQC]/g)||[]).join('');ensure(syntax===policy.certificate.syntax,'Exact original grammar required');const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);return{q0,r:7,minimumLength:7}}
export type ReviewedU5e6aHkcsFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number|null;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU5e6aHkcsNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}
function u5e6aHkcsCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 幪 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 幪 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 幪 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 幪 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 幪 SVG coordinate tree')
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
export function measureReviewedU5e6aHkcsFrame(policy:ReviewedU5e6aHkcsPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU5e6aHkcsFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 幪 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 幪 measurement parent required')
  const coordinates=u5e6aHkcsCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u5e6a-hkcs-progress')===String(progress)&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u5e6a-hkcs-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 幪 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 幪 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 幪 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('幪 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:policy.kind==='growing-u5e6a-hkcs-caps'?Math.min(7,d):null,q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
export function commitReviewedU5e6aHkcsCaps(policy:ReviewedU5e6aHkcsPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU5e6aHkcsNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment);ensure(policy.kind==='growing-u5e6a-hkcs-caps','private 幪 seven prepared exact initial policies only')
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 幪 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 幪 SVG binding tree')
    const coordinates=u5e6aHkcsCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u5e6a-hkcs-progress')===String(progress)&&target.getAttribute('data-u5e6a-hkcs-clip')===clipId&&mask.getAttribute('id')===clipId+'-u5e6a-hkcs-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u5e6a-hkcs-measure'&&guide.getAttribute('id')===clipId+'-u5e6a-hkcs-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u5e6a-hkcs-growing)'
    if(!bound())throw new Error('Mismatched 幪 SVG binding')
    const frame=measureReviewedU5e6aHkcsFrame(policy,segment,progress,measurement);ensure(frame.rho!==null,'growing frame radius')
    if(!bound())throw new Error('幪 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('幪 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
export const REVIEWED_U5E6A_HKCS_CAPS_SOURCE=deepFreeze({"glyph":"幪","root":"hkcs_m5e6a","sourceCounts":{"pens":17,"masks":21,"polygons":38},"identity":{"sourceRoot":"hkcs_m5e6a","sourceProofFile":"../hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/engine-whole-hkcs_m5e6a.json","sourceProofFileSha256":"e8831644fbe62a6af83581d45c4024cf2c324732b731ada72372309ef62ccb11","sourceCapsuleFile":"../hanja-source-alternative-u5e6a-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"47c4f8b2cde48170e8daf50dc220f616b61a2327b062d76491b8498069f25be8","sourceChecksFile":"../hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"1891922869a639a68e31dfd9d2721c6e802d9619bdc05b5473c5492de5e4ffe8"},"initialCertificates":7,"fullQCoverageCertificates":7,"preparedPolicies":7,"heldCompound":[[2,3],[9,2],[13,2]],"failedInitial":[[2,3],[9,2],[13,2]],"fullGrowingIntersectionProof":false,"compoundContactApproved":false,"flag5TerminalApproved":false,"edgeOnlySeamRetained":true,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U5E6A_HKCS_CAPS_PROOFS=deepFreeze(TARGETS.map(t=>t.certificate))
export const REVIEWED_U5E6A_HKCS_CAPS_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json":"9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/caps-conditions-proof.json":"5c28ef663d7ff37f3965b6b239c3f7b55787c142fc3cb4146ff8c1404573fb52","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/verify-caps-initial-conditions.py":"f47c26c878f7f7ad6ed8ac7e656c66aa8bf5160720b295460a430eb053ef0093","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/verify-caps-full-Q7.py":"e7dd5c35c97600db76c3d5e4da0cad7a9981b4cf7a7ef2f03f12cd20a2f916eb"})

export function makeReviewedU5e6aHkcsSourceContext(proof:unknown,identity:unknown,outlines:HanjaOutlineStrokes):ReviewedU5e6aHkcsContext|null{return sameJSON(proof,FIXED_FULL5)&&sameJSON(identity,FIXED_IDENTITY)&&sameWhole(outlines)?CONTEXT:null}
