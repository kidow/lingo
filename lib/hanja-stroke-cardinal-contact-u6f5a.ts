import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU6f5aContext,makeReviewedU6f5aSourceContext} from './hanja-stroke-start-caps-u6f5a.ts'
function deepFreeze<T>(v:T):T{if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)deepFreeze(d.value)}Object.freeze(v)}return v}
const TARGETS=deepFreeze([{"id":"u6f5a-4-2","pen":4,"mask":2,"segment":{"outline":"M83.55 16.5 L83.55 41.5 L77.55 44.5 L77.55 16.5 Z M77.55 15.5 L80.55 13 L86.05 17.5 L83.55 19.5 L77.55 16.5 Z","bounds":[77.55,13,86.05,44.5],"direction":"down","weight":21},"predecessor":{"outline":"M38 15.5 L80.55 15.5 L80.55 17.5 L38 17.5 Z","bounds":[38,15.5,80.55,17.5],"direction":"right","weight":42.5625},"originY":16.5},{"id":"u6f5a-11-2","pen":11,"mask":2,"segment":{"outline":"M52.65 75.5 L52.65 89.1 L47.15 91.85 L47.15 75.5 Z M47.15 74.5 L49.9 72 L55.15 76.5 L52.65 78.25 L47.15 75.5 Z","bounds":[47.15,72,55.15,91.85],"direction":"down","weight":15},"predecessor":{"outline":"M36.85 74.5 L49.9 74.5 L49.9 76.5 L36.85 76.5 Z","bounds":[36.85,74.5,49.9,76.5],"direction":"right","weight":13.0525},"originY":75.5}] as const)
const CONTEXT=Object.freeze({id:'u6f5a-original-cardinal-contact' as const})
export type ReviewedU6f5aCardinalContext=typeof CONTEXT
const POLICIES=TARGETS.map(t=>Object.freeze({...t,kind:'cardinal-contact-prefix-u6f5a' as const}))
export type ReviewedU6f5aCardinalPolicy=typeof POLICIES[number]
function same(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})}
export function reviewedU6f5aCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU6f5aCardinalContext|null{return reviewedU6f5aContext(strokes)?CONTEXT:null}
export function makeReviewedU6f5aCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU6f5aCardinalContext|null{return makeReviewedU6f5aSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU6f5aCardinalPolicy(context:ReviewedU6f5aCardinalContext|null,pen:number,mask:number):ReviewedU6f5aCardinalPolicy|null{return context===CONTEXT?POLICIES.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
/** Source direction/weight remain fixed; display clip expands from the connected H origin. */
export function sampleReviewedU6f5aCardinalFrame(policy:ReviewedU6f5aCardinalPolicy,segment:HanjaOutlineSegment,p:number,previousMaskProgress:number){
 if(!POLICIES.includes(policy)||!same(segment,policy.segment))throw Error('Exact 潚 original cardinal target required')
 if(![p,previousMaskProgress].every(Number.isFinite)||p<0||p>1||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite 潚 progress required')
 if(p>0&&previousMaskProgress!==1)throw Error('Completed opaque original 潚 H predecessor required')
 const b=policy.segment.bounds,y=policy.originY-(policy.originY-b[1])*p,bottom=policy.originY+(b[3]-policy.originY)*p
 return Object.freeze({policyId:policy.id,progress:p,previousMaskProgress,phase:p===0?'empty' as const:p===1?'full' as const:'contact-prefix' as const,visible:p>0,originalPDirect:p===1,clip:p===0||p===1?null:Object.freeze({x:b[0],y,width:b[2]-b[0],height:bottom-y}),requiresCompletedOriginalPredecessor:true as const,UARead:false as const})
}
export const REVIEWED_U6F5A_CARDINAL=Object.freeze({pens:Object.freeze([4,11]),mask:2,sourceFieldsUnchanged:true,sourceOuterClockChanged:false,newDisplayClipLaw:true,nativeApproval:false,runtimeApplied:false})
