import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
import type {Full5Proof,ExplicitOriginalWholeIdentity} from './progressive.mjs'
export type {Full5Proof,ExplicitOriginalWholeIdentity} from './progressive.mjs'
export type Outer6ProofIdentity=Readonly<{root:string;sourceProofFile:string;sourceProofFileSHA256:string;engineHeaderSHA256:string;sourceFileSHA256:string;compilerFileSHA256:string}>
export declare const selectedProofIdentity:ExplicitOriginalWholeIdentity
export declare const outerProofIdentity:Outer6ProofIdentity
export declare const sourceRoot:string
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:ExplicitOriginalWholeIdentity):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:ExplicitOriginalWholeIdentity):HanjaOutlineStrokes
export declare function compileWithOuterIdentity(trace:readonly unknown[],proof:Full5Proof,identity:Outer6ProofIdentity):HanjaOutlineStrokes
export {renderProgressive} from './progressive.mjs'
