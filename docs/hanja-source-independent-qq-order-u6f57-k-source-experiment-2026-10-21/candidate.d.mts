export type ProofIdentity=Readonly<{root:'u6f57-k';file:'../hanja-goal-glyphwiki-batch902-2026-10-13/engine-whole-u6f57-k.json';fileSHA256:'46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6f57-k',sourceGroups:readonly(readonly number[])[],nativeApproval:false,runtimeApplied:false
export function captureProjection(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes;strokes:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6f57-k',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceProjectionCallCount():number
export function internalProjectionCallCount():number
export function sourceCompileCallCount():number
export function sourceFactoryCallCount():number
export function cachedPositiveCallCount():number
