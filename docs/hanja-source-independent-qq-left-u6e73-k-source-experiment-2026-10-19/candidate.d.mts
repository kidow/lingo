export type ProofIdentity=Readonly<{"root":"u6e73-k";"headerFile":"../hanja-goal-glyphwiki-batch392-2026-10-09/engine-proof.json";"headerFileSHA256":"e33f8e5a994619093a4bb4f85d531902c03b67ca229170c8adbfec58a80a18ff";"traceFile":"../hanja-goal-glyphwiki-batch392-2026-10-09/draw-trace.json";"traceFileSHA256":"3f2d7564965e998f8f5c372a0d2f81ee6ad6dd65cdbc9f16881c3027cb0e4bb5";"sourceFile":"../hanja-goal-glyphwiki-batch392-2026-10-09/sources.json";"sourceFileSHA256":"096a8dc6e7187f08f6ed97a9be25522001940fca5ae5c8ade417586f5cae2073"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6e73-k'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6e73-k',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
