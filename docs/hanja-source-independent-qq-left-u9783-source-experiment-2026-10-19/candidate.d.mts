export type ProofIdentity=Readonly<{"root":"u9783";"headerFile":"../hanja-goal-glyphwiki-batch457-2026-10-09/engine-proof.json";"headerFileSHA256":"d4d01aef452f413d94dcd79203f6bf36af37726b625104553e821c64844dc4aa";"traceFile":"../hanja-goal-glyphwiki-batch457-2026-10-09/draw-trace.json";"traceFileSHA256":"cf6aa372765d8496f2b8e0af1e22037c98f9090cff71d6dc54c702c8128a7690";"sourceFile":"../hanja-goal-glyphwiki-batch457-2026-10-09/sources.json";"sourceFileSHA256":"2b14ffe3638198d9c5e3476221b495fb5c705d47931190ba390835aefacf022b"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u9783'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u9783',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
