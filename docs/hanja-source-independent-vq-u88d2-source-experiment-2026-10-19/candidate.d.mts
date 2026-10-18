export type ProofIdentity=Readonly<{"root":"u88d2";"headerFile":"../hanja-goal-glyphwiki-batch609-2026-10-11/engine-proof.json";"headerFileSHA256":"87165a9d11258b4ad64343bba717c37af3f347d10de5ca0550e3a8e0ff31f7a1";"traceFile":"../hanja-goal-glyphwiki-batch609-2026-10-11/draw-trace.json";"traceFileSHA256":"defb082d2e9989e4cf0c5d285defd474f64aa26788c03429232e11a75634719a";"sourceFile":"../hanja-goal-glyphwiki-batch609-2026-10-11/sources.json";"sourceFileSHA256":"52f4f23e98288fa182d200ce4bfa143769b92762afa6352f0a1e483be5fb0f6e"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u88d2'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u88d2',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
