import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity=Readonly<{root:string;sourceProofFile:string;sourceProofFileSHA256:string;engineHeaderSHA256:string;sourceFileSHA256:string;compilerFileSHA256:string}>
export type OriginalWholeIdentity=Readonly<{root:string;file:string;fileSHA256:string}>
export type Full8Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>;sourceRoot:string;sourceProofFile:string;sourceProofFileSHA256:string}>
export declare const selectedProofIdentity:SelectedProofIdentity
export declare const originalWholeIdentity:OriginalWholeIdentity
export declare const sourceRoot:string
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full8Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full8Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
