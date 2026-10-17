import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity=Readonly<{sourceRoot:string;sourceProofFile:string;sourceProofFileSha256:string;sourceHeaderFile:string;sourceHeaderFileSha256:string}>
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const selectedProofIdentity:SelectedProofIdentity
export declare const originalPenOrder:readonly number[]
export declare const originalSourceGroups:readonly (readonly number[])[]
export declare const sourceRoot:string
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
