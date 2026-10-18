export type ProofIdentity=Readonly<{"root":"u98f1";"headerFile":"../hanja-goal-glyphwiki-batch666-2026-10-11/engine-proof.json";"headerFileSHA256":"51908b1c25a626b662ea766a35306b684388fcbd875ec58cec6ce5489935de56";"traceFile":"../hanja-goal-glyphwiki-batch666-2026-10-11/draw-trace.json";"traceFileSHA256":"5dad80581fca8b348081d312ed69034c047712c8ab85055fe80ef113af6aa012";"sourceFile":"../hanja-goal-glyphwiki-batch666-2026-10-11/sources.json";"sourceFileSHA256":"37f12549fbc0e591bce012ec08f43d32e08d99c4d08d8e45d763d876e52f868c"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u98f1'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u98f1',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
