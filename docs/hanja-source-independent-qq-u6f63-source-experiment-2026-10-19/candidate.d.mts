export type ProofIdentity=Readonly<{"root":"u6f63";"headerFile":"../hanja-goal-glyphwiki-batch583-2026-10-11/engine-proof.json";"headerFileSHA256":"5fb386659ea438dadb4b91506fa752b4c037d3137a56c5f43b0cc8fe1531f48a";"traceFile":"../hanja-goal-glyphwiki-batch583-2026-10-11/draw-trace.json";"traceFileSHA256":"f091df945828bda6a0d46e4ec4d639c1bc0d1fbe3aba6551fb6cb3e8eb418257";"sourceFile":"../hanja-goal-glyphwiki-batch583-2026-10-11/sources.json";"sourceFileSHA256":"06ceebd24076f995711fbf9e3af291ad1bc1d31abefb78706ede3dd41410c162"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6f63'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6f63',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
