export interface OriginalWholeIdentity { readonly root: 'u99dc'; readonly file: 'engine-whole-u99dc.json'; readonly fileSHA256: string }
export interface Full5Proof { readonly defaults: Readonly<Record<string,number>>; readonly engineHashes: Readonly<Record<string,string>>; readonly engineRevision: string; readonly groups: readonly unknown[]; readonly trace: readonly unknown[] }
export interface CandidateMask { readonly outline: string; readonly direction: string; readonly weight: number; readonly [key: string]: unknown }
export type CandidateStrokes = readonly (readonly CandidateMask[])[]
export declare const sourceRoot: 'u99dc'
export declare const sourceProofFile: 'engine-whole-u99dc.json'
export declare const sourceProofFileSHA256: string
export declare const sourcePayloadSHA256: string
export declare const domesticOrderPermutation: readonly number[]
export declare const sourceGroups: readonly (readonly number[])[]
export declare const wholeSourceIdentities: Readonly<{ u99dc: OriginalWholeIdentity }>
export declare const supportedWholeRoots: readonly ['u99dc']
export declare const nativeApproval: false
export declare const runtimeApplied: false
export declare const nativeDirectionsReviewed: 0
export declare const nativeFramesReviewed: 0
export declare const nativeReplaysReviewed: 0
export declare function compileProgressive(trace: readonly unknown[], proof: Full5Proof, identity: OriginalWholeIdentity): CandidateStrokes
export declare function compileSourceWhole(root: 'u99dc', trace: readonly unknown[], proof: Full5Proof, identity: OriginalWholeIdentity): CandidateStrokes
export declare function renderProgressive(strokes: CandidateStrokes, stroke: number, progress: number, prefix?: string): string
