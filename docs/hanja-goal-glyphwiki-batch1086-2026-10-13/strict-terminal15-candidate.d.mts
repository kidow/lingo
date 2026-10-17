import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity=Readonly<{sourceRoot:string;sourceProofFile:string;sourceProofFileSha256:string;sourceHeaderFile:string;sourceHeaderFileSha256:string;sourceMetadataFile:string;sourceMetadataFileSha256:string}>
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type WholeProfile=Readonly<{sourceRoot:string;identity:SelectedProofIdentity;fullProofSHA256:string;sourceGroups:readonly(readonly number[])[];pens:number;masks:number;polygons:number;compiledSHA256:string;orderedPenMaskSHA256:readonly string[];finePens:readonly number[];terminals:readonly unknown[];maskBoundaries:readonly unknown[]}>
export declare const candidateWholeProofs:readonly WholeProfile[]
export declare const selectedProofIdentity:SelectedProofIdentity
export declare const sourceRoot:string
export declare const sourceGroups:readonly(readonly number[])[]
export declare const wholeSourceIdentities:Readonly<Record<string,SelectedProofIdentity>>
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
export declare let legacyDelegateCount:number
