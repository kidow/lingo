import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type ExplicitOriginalWholeIdentity=Readonly<{root:string;file:string;fileSHA256:string}>
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const sourceRoot:string
export declare const sourceGroups:readonly (readonly number[])[]
export declare const sourceProofFile:string
export declare const sourceProofFileSHA256:string
export declare const sourcePayloadSHA256:string
export declare const supportedWholeRoots:readonly string[]
export declare const wholeSourceIdentities:Readonly<Record<string,ExplicitOriginalWholeIdentity>>
export declare const candidateStrokeCounts:Readonly<Record<string,number>>
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:ExplicitOriginalWholeIdentity):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:ExplicitOriginalWholeIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
