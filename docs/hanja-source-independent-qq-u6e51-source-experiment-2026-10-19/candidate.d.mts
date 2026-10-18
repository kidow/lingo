export type ProofIdentity=Readonly<{"root":"u6e51";"headerFile":"../hanja-goal-glyphwiki-batch638-2026-10-11/engine-proof.json";"headerFileSHA256":"8373c143cfc458f712ccde37ba3c091d410709e734f9da9a10bb000bd6eabae0";"traceFile":"../hanja-goal-glyphwiki-batch638-2026-10-11/draw-trace.json";"traceFileSHA256":"09287ab49244f7a42ea87a7f3fced6410aeeb92eb37e2667dd4416a223629164";"sourceFile":"../hanja-goal-glyphwiki-batch638-2026-10-11/sources.json";"sourceFileSHA256":"9b9d55bee8ce448157696b22b57b242bd3e6d5a29c71eae2bd8d077b9a5e88ea"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6e51'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6e51',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
