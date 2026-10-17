import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type CandidateProofIdentity=Readonly<{sourceRoot:string;sourceProofFile:string;sourceProofFileSHA256:string;sourceHeaderFile:string;sourceHeaderFileSHA256:string}>
export type FullSourceProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const selectedProofIdentity:CandidateProofIdentity
export declare const sourceRoot:string
export declare const sourceProofFile:string
export declare const sourceWholeFileSHA256:string
export declare const sourceGroups:readonly (readonly number[])[]
export declare const candidateWholeProofs:readonly Readonly<{identity:CandidateProofIdentity;sourceGroups:readonly (readonly number[])[]}>[]
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function buildSourceProof(identity:CandidateProofIdentity):FullSourceProof
export declare function compileProgressive(trace:readonly unknown[],proof:FullSourceProof,identity:CandidateProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:FullSourceProof,identity:CandidateProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
