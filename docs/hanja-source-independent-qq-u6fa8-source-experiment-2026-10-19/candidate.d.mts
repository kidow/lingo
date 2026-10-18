export type ProofIdentity=Readonly<{"root":"u6fa8";"headerFile":"../hanja-goal-glyphwiki-batch639-2026-10-11/engine-proof.json";"headerFileSHA256":"cd8b75f14cdeb6fde759219249c49665f58cb4c197187ead52b4ca33c21f3a39";"traceFile":"../hanja-goal-glyphwiki-batch639-2026-10-11/draw-trace.json";"traceFileSHA256":"0a3be3ef95085af0b94f3359d322d9bab7a51256089ed2603b394b86786fe9fe";"sourceFile":"../hanja-goal-glyphwiki-batch639-2026-10-11/sources.json";"sourceFileSHA256":"4e4091102237a738c69ae1ca623b35f8ed631c3d107e03af0c1ca5de4fb4574f"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6fa8'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6fa8',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
