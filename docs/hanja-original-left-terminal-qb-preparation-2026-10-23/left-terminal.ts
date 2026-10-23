/** Own reveal-side LEFT partition. Original ink, source masks and weights stay unchanged. */
import a from '../hanja-source-original-u7c67-2026-10-23/fixtures.json' with {type:'json'}
import b from '../hanja-source-original-u8627-vs2-2026-10-23/fixtures.json' with {type:'json'}
import proof from './terminal-proof.json' with {type:'json'}
type Segment={outline:string;bounds:number[];direction:string;weight:number;revealPath?:string;revealWidth?:number}
function same(x:unknown,y:unknown):boolean{if(Object.is(x,y))return true;if(!x||!y||typeof x!=='object'||typeof y!=='object'||Object.getPrototypeOf(x)!==Object.getPrototypeOf(y))return false;const keys=Reflect.ownKeys(y);if(Reflect.ownKeys(x).length!==keys.length)return false;return keys.every(k=>{const d=Object.getOwnPropertyDescriptor(x,k),e=Object.getOwnPropertyDescriptor(y,k);return !!d&&!!e&&'value'in d&&'value'in e&&d.enumerable===e.enumerable&&same(d.value,e.value)})}
function freeze<T>(x:T):T{if(x&&typeof x==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(x)))if('value'in d)freeze(d.value);Object.freeze(x)}return x}
const fixed=freeze([{root:'u7c67',entry:a.u7c67,pen:15,maskCount:24,polygonCount:60},{root:'u8627-ue0102',entry:b['u8627-ue0102'],pen:13,maskCount:22,polygonCount:54}])
const contexts=fixed.map(f=>Object.freeze({id:f.root+'-original-left-terminal'}))
export type LeftContext=typeof contexts[number]
const policies=freeze(fixed.map((f,index)=>({id:(index?'u8627':'u7c67')+'-'+f.pen+'-1',kind:'original-left-terminal' as const,root:f.root,pen:f.pen,mask:1,segment:f.entry.strokes[f.pen-1][0] as Segment,originalLogicalPens:f.entry.strokes.length,originalMaskCount:f.maskCount,originalPolygonCount:f.polygonCount})))
export type LeftPolicy=typeof policies[number]
const SHARE=15526797/20526797
export function leftSourceContext(root:string,full:unknown,identity:unknown,strokes:unknown):LeftContext|null{const i=fixed.findIndex(f=>f.root===root);return i>=0&&same(full,fixed[i].entry.fullProof)&&same(identity,fixed[i].entry.identity)&&same(strokes,fixed[i].entry.strokes)?contexts[i]:null}
export function leftWholeContext(root:string,strokes:unknown):LeftContext|null{const i=fixed.findIndex(f=>f.root===root);return i>=0&&same(strokes,fixed[i].entry.strokes)?contexts[i]:null}
export function leftPolicy(context:LeftContext|null,pen:number,mask:number):LeftPolicy|null{const i=contexts.indexOf(context as LeftContext);return i>=0&&pen===fixed[i].pen-1&&mask===0?policies[i]:null}
export function leftFrame(policy:LeftPolicy,segment:Segment,progress:number){
 if(!policies.includes(policy)||!same(segment,policy.segment)||!same(segment,proof.originalSegment))throw Error('Private whole-bound original LEFT policy required')
 if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite original LEFT progress required')
 const bodyProgress=Math.min(1,progress/SHARE),tailProgress=progress<=SHARE?0:progress===1?1:(progress-SHARE)/(1-SHARE)
 return freeze({policyId:policy.id,root:policy.root,progress,phase:progress===0?'empty':progress===1?'complete':progress<=SHARE?'body':'tail',bodyProgress,tailProgress,bodyOutline:proof.bodyOutline,tailOutline:proof.terminalOutline,originalInkOutline:segment.outline,tailRect:{x:63.5-10*tailProgress,y:81.3,width:10*tailProgress,height:3},paintOriginalInkOnce:true,originalLogicalPens:policy.originalLogicalPens,originalMaskCount:policy.originalMaskCount,originalPolygonCount:policy.originalPolygonCount,originalOuterWeight:segment.weight,internalRevealPhases:2,newDisplayMicroclock:true})
}
export const LEFT_PREPARATION=freeze({bodyWeight:31.053594,tailExtent:10,bodyShareExact:[15526797,20526797],bodyShare:SHARE,sourceTerminalFlag:14,sourceInkChanged:false,sourceCoordinatesChanged:false,sourceMaskCountChanged:false,outerWeightChanged:false,nativeApproval:false,runtimeApplied:false})
