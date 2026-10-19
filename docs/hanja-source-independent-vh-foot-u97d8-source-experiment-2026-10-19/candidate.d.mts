export type ProofIdentity=Readonly<{"root":"u97d8","file":"../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8.json","fileSHA256":"8614f3e6509b3446b2d71cb3d3ce04f38f112f768fee3377d4174c8b529c27b2"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u97d8'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u97d8',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function deriveCardinalSplit(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
