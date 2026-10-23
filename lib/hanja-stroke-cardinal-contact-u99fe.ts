import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU99feContext,makeReviewedU99feSourceContext} from './hanja-stroke-start-caps-u99fe.ts'
/** Source-only adaptation of existing u68b4 contact-origin affine clipping; no invented V guide, MQ inference, or source clock change. Actual native approval remains pending. */
const TARGET={"outline":"M86.2 36 L86.2 61 L80.2 64 L80.2 36 Z M80.2 35 L83.2 32.5 L88.7 37 L86.2 39 L80.2 36 Z","bounds":[80.2,32.5,88.7,64],"direction":"down","weight":21} as const
const PRIOR={"outline":"M54.55 35 L83.2 35 L83.2 37 L54.55 37 Z","bounds":[54.55,35,83.2,37],"direction":"right","weight":28.65} as const
Object.freeze(TARGET.bounds);Object.freeze(TARGET);Object.freeze(PRIOR.bounds);Object.freeze(PRIOR)
const CONTEXT=Object.freeze({id:'u99fe-original-down-cardinal-contact' as const})
export type ReviewedU99feCardinalContext=typeof CONTEXT
const POLICY=Object.freeze({id:'u99fe-14-2' as const,kind:'cardinal-contact-prefix-u99fe' as const,segment:TARGET,predecessor:PRIOR})
export type ReviewedU99feCardinalPolicy=typeof POLICY
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU99feCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU99feCardinalContext|null{return reviewedU99feContext(strokes)?CONTEXT:null}
export function makeReviewedU99feCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU99feCardinalContext|null{return makeReviewedU99feSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU99feCardinalPolicy(context:ReviewedU99feCardinalContext|null,pen:number,mask:number):ReviewedU99feCardinalPolicy|null{return context===CONTEXT&&pen===13&&mask===1?POLICY:null}
export type ReviewedU99feCardinalFrame=Readonly<{policyId:'u99fe-14-2';progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:80.2;y:number;width:8.5;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU99feCardinalFrame(policy:ReviewedU99feCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU99feCardinalFrame{
 if(policy!==POLICY||!exact(segment,TARGET))throw Error('Private 駾14m2 exact original P/direction/weight and no-guide fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original segment progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Completed original 駾14m1 H required in this frame')
 if(progress===0||progress===1)return Object.freeze({policyId:POLICY.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const y=36-3.5*progress,bottom=36+28*progress
 return Object.freeze({policyId:POLICY.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze({x:80.2 as const,y,width:8.5 as const,height:bottom-y}),requiresCompletedOriginalPredecessor:true,UARead:false})
}
export const REVIEWED_U99FE_CARDINAL_SOURCE=Object.freeze({"fixture":"docs/hanja-source-original-u99fe-2026-10-24/fixtures.json","fixtureSHA256":"2a829f327bc1b9e749e1c2f077588ff47e421b901b2ebfc09c31bbe39933df64","geometrySHA256":"94c064150bb05b8c637e35ef2e21033143b89d5cc27707f37637697b6b3de8ee","sourceFull5AndWholeGuard":"existing makeReviewedU99feSourceContext, unchanged original fixture","sourceCapsModuleSHA256":"056c1816c915ddd937f2e4820efb912a981e7dcc614e93ee0904e6a63cf50660","originalDirection":"down","originalWeight":21,"sourcePChanged":false,"sourceGuideInvented":false,"sourceOuterClockChanged":false,"newDisplayClipLawExplicit":true,"requiresCompletedOpaqueOriginalPredecessor":true,"DOMAdapterPrepared":false,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U99FE_CARDINAL_PROOF=Object.freeze({"convexTurns":[["150","168","168","150"],["109/4","89/4","39/2","6","3"]],"x81.2Sections":[["36","127/2"],["205/6","73/2"]],"priorH":["35","37"],"witness":"x406/5,y36+min(14*p,1/10),0<p<=1","clipY":"36-7*p/2","clipBottom":"36+28*p","clipHeight":"63*p/2","scope":"Both original convex P pieces intersect at same positive-area witness in completed original H for every positive display band; no raster/all-time AppUI approval."})
