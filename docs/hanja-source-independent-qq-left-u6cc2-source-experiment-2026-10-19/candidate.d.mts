export type ProofIdentity=Readonly<{"root":"u6cc2";"headerFile":"../hanja-goal-glyphwiki-batch137-2026-09-27/engine-proof.json";"headerFileSHA256":"2f484eb154bad48659c383270d44f989d7fb3eee03e2bcc953dfee4852d4672a";"traceFile":"../hanja-goal-glyphwiki-batch137-2026-09-27/draw-trace.json";"traceFileSHA256":"6b45c228d0979da19c27794043cbb99e9d1a589f15d2941ba40e61e02e5b4c07";"sourceFile":"../hanja-goal-glyphwiki-batch137-2026-09-27/sources.json";"sourceFileSHA256":"b39d2db300b2ee2ea88751bcbd15b7c345ea88bac33ec2f1a5e84a21abfd8afc"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6cc2'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6cc2',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
