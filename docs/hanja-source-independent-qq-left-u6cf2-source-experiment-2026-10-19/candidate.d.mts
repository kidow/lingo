export type ProofIdentity=Readonly<{"root":"u6cf2";"headerFile":"../hanja-goal-glyphwiki-batch146-2026-09-27/engine-proof.json";"headerFileSHA256":"396521c0a420915af02c40c646733fd0d043ef0a77049f6360f00795002f3385";"traceFile":"../hanja-goal-glyphwiki-batch146-2026-09-27/draw-trace.json";"traceFileSHA256":"3aec3388d262d52fc1c123aefbaf9c5ad57d784ea3e7236d2f4158dd2b85fe87";"sourceFile":"../hanja-goal-glyphwiki-batch146-2026-09-27/sources.json";"sourceFileSHA256":"0b3a7c10eff3d81db8266569c5857f8cde18a29bf60eb8f70426552c8f9419fe"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6cf2'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6cf2',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
