import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type FixedRecoveryIdentity=Readonly<{sourceRoot:string;sourceProofFile:string;sourceProofFileSha256:string;sourceCapsuleFile:string;sourceCapsuleFileSha256:string;sourceManifestFile:string;sourceManifestFileSha256:string}>
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const selectedProofIdentity:FixedRecoveryIdentity
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproved:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:FixedRecoveryIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
