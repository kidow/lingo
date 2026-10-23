import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU9d25Context,makeReviewedU9d25SourceContext} from './hanja-stroke-start-caps-u9d25.ts'
/** Source-only adaptation of existing u68b4 contact-origin affine clipping; no invented V guide, MQ inference, or source clock change. Actual native approval remains pending. */
const TARGET={"outline":"M41.75 19 L41.75 43 L35.75 46 L35.75 19 Z M35.75 18 L38.75 15.5 L44.25 20 L41.75 22 L35.75 19 Z","bounds":[35.75,15.5,44.25,46],"direction":"down","weight":22} as const
const PRIOR={"outline":"M12.85 18 L38.75 18 L38.75 20 L12.85 20 Z","bounds":[12.85,18,38.75,20],"direction":"right","weight":25.905} as const
Object.freeze(TARGET.bounds);Object.freeze(TARGET);Object.freeze(PRIOR.bounds);Object.freeze(PRIOR)
const CONTEXT=Object.freeze({id:'u9d25-original-down-cardinal-contact' as const})
export type ReviewedU9d25CardinalContext=typeof CONTEXT
const POLICY=Object.freeze({id:'u9d25-3-2' as const,kind:'cardinal-contact-prefix-u9d25' as const,segment:TARGET,predecessor:PRIOR})
export type ReviewedU9d25CardinalPolicy=typeof POLICY
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU9d25CardinalContext(strokes:HanjaOutlineStrokes):ReviewedU9d25CardinalContext|null{return reviewedU9d25Context(strokes)?CONTEXT:null}
export function makeReviewedU9d25CardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU9d25CardinalContext|null{return makeReviewedU9d25SourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU9d25CardinalPolicy(context:ReviewedU9d25CardinalContext|null,pen:number,mask:number):ReviewedU9d25CardinalPolicy|null{return context===CONTEXT&&pen===2&&mask===1?POLICY:null}
export type ReviewedU9d25CardinalFrame=Readonly<{policyId:'u9d25-3-2';progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:35.75;y:number;width:8.5;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU9d25CardinalFrame(policy:ReviewedU9d25CardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU9d25CardinalFrame{
 if(policy!==POLICY||!exact(segment,TARGET))throw Error('Private 鴥3m2 exact original P/direction/weight and no-guide fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original segment progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Completed original 鴥3m1 H required in this frame')
 if(progress===0||progress===1)return Object.freeze({policyId:POLICY.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const y=19-3.5*progress,bottom=19+27*progress
 return Object.freeze({policyId:POLICY.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze({x:35.75 as const,y,width:8.5 as const,height:bottom-y}),requiresCompletedOriginalPredecessor:true,UARead:false})
}
export const REVIEWED_U9D25_CARDINAL_SOURCE=Object.freeze({"fixture":"docs/hanja-source-original-u9d25-2026-10-24/fixtures.json","fixtureSHA256":"93506634ad7e1d55f9447fa0fc058db96f794cda2a6a0bb6827dd44cfe75655f","geometrySHA256":"fe5acd75682b5dac9aa80d300ace9f1fdc27f8f015477c677c0e210c8e597716","sourceFull5AndWholeGuard":"makeReviewedU9d25SourceContext","sourceCapsModuleSHA256":"679e1e7785a8c07342732c0e305946cf37ef4adb11266629c4499d28d28a127f","originalDirection":"down","originalWeight":22,"sourcePChanged":false,"sourceGuideInvented":false,"sourceOuterClockChanged":false,"newDisplayClipLawExplicit":true,"requiresCompletedOpaqueOriginalPredecessor":true,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U9D25_CARDINAL_PROOF=Object.freeze({"convexTurns":[["144","162","162","144"],["109/4","89/4","39/2","6","3"]],"witness":"x36.75,y19+min(13.5*p,.1),0<p<=1","clip":[35.75,"19-3.5p",8.5,"30.5p"],"priorOriginalH":[12.85,18,38.75,20]})
