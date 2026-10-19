export type ProofIdentity=Readonly<{"root":"u9af3";"headerFile":"../hanja-goal-glyphwiki-batch576-2026-10-11/engine-proof.json";"headerFileSHA256":"da713b9af3f88cc33d98b42c72cadb7e840f9b5a49cadd2179827645f90283b5";"traceFile":"../hanja-goal-glyphwiki-batch576-2026-10-11/draw-trace.json";"traceFileSHA256":"399d05cff9a849609eb8f0ffd86efae4f36994594914e28b392c94ada7f71d2c";"sourceFile":"../hanja-goal-glyphwiki-batch576-2026-10-11/sources.json";"sourceFileSHA256":"fc0803f622a70bcf68a3388f148e646ad2aa9c94e0ca1636050cd72820f8ed78"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u9af3'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u9af3',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
