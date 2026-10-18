export type ProofIdentity=Readonly<{"root":"u59e4";"headerFile":"../hanja-goal-glyphwiki-batch466-2026-10-09/engine-proof.json";"headerFileSHA256":"c346d1eb7036910cb8fc45f648af739adc06fe2fcc09f35dd8540a1d79e84960";"traceFile":"../hanja-goal-glyphwiki-batch466-2026-10-09/draw-trace.json";"traceFileSHA256":"b88dd204d7bfd83b72e87e33dfafde5c32afc96991538dce325f39efb63f4339";"sourceFile":"../hanja-goal-glyphwiki-batch466-2026-10-09/sources.json";"sourceFileSHA256":"126d13d948ace8b55ee770ef0b8f34228b397fa3d2b652ebceecbf257ccd98da"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u59e4'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u59e4',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
