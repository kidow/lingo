export type ProofIdentity=Readonly<{"sourceRoot":"u68b2";"sourceProofFile":"engine-whole-u68b2.json";"sourceProofFileSha256":"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u68b2'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u68b2',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
