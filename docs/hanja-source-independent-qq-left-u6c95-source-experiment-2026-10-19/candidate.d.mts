export type ProofIdentity=Readonly<{"root":"u6c95";"headerFile":"../hanja-goal-glyphwiki-batch89-2026-09-27/engine-proof.json";"headerFileSHA256":"13926813b6e83c1543da35a24c455dee01195ef2dbf18eee54528506dd1338fb";"traceFile":"../hanja-goal-glyphwiki-batch89-2026-09-27/draw-trace.json";"traceFileSHA256":"657acc4747dad88bca4d4d3e0bf8c81bb656192994406d12c32f07ebe7cd9215";"sourceFile":"../hanja-goal-glyphwiki-batch89-2026-09-27/sources.json";"sourceFileSHA256":"4e2e2b85dbcab5565aa6c43cce53460884674bc7386a13665e3011b31553b147"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6c95'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6c95',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
