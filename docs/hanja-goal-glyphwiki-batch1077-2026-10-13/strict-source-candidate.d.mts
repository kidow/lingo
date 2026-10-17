import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type OuterCallerIdentity=Readonly<{root:string;sourceProofFile:string;sourceProofFileSHA256:string;engineHeaderSHA256:string;sourceFileSHA256:string;compilerFileSHA256:string}>
export type OriginalWholeIdentity=Readonly<{sourceRoot:string;sourceProofFile:string;sourceProofFileSha256:string;sourceHeaderFile:string;sourceHeaderFileSha256:string;sourceMetadataFile:string;sourceMetadataFileSha256:string}>
export type SelectedProofIdentity=OuterCallerIdentity
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const selectedProofIdentity:OuterCallerIdentity
export declare const originalWholeIdentity:OriginalWholeIdentity
export declare const sourceRoot:string
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:OuterCallerIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:OuterCallerIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
