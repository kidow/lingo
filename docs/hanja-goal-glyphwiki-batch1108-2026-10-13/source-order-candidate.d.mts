import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
import type {SelectedProofIdentity,Full8Proof} from './strict-source-candidate.mjs'
export declare const selectedProofIdentity:SelectedProofIdentity
export declare const sourceRoot:string
export declare const originalPenOrder:readonly number[]
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function sourceCompileCallCount():number
export declare function compileProgressive(trace:readonly unknown[],proof:Full8Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full8Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
