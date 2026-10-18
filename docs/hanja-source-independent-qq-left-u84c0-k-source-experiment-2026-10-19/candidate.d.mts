export type ProofIdentity=Readonly<{"root":"u84c0-k";"headerFile":"../hanja-goal-glyphwiki-batch286-2026-10-05/engine-proof.json";"headerFileSHA256":"146651b6ebbbe60507001682b67f2b67e717d575f5720d5a193cc3649b75c59f";"traceFile":"../hanja-goal-glyphwiki-batch286-2026-10-05/draw-trace.json";"traceFileSHA256":"d2eb2956417a5c9c2a80fa01de19fedfcd714ba582cc4ea6a0e90af463b4a0b6";"sourceFile":"../hanja-goal-glyphwiki-batch286-2026-10-05/sources.json";"sourceFileSHA256":"75e160ae5169e44bb2548d623a1253b5f762bdbc5e233be07ef3801ad52b766f"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u84c0-k'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u84c0-k',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
