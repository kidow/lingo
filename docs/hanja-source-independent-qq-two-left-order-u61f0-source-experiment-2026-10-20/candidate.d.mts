export type ProofIdentity=Readonly<{"root":"u61f0";"headerFile":"../hanja-goal-glyphwiki-batch545-2026-10-11/engine-proof.json";"headerFileSHA256":"d343723803aec440fe57465a7b2d683631b35263c3c1cdb6c4d0f6f9f29065fb";"traceFile":"../hanja-goal-glyphwiki-batch545-2026-10-11/draw-trace.json";"traceFileSHA256":"b5fba6107a01e830c52a484c7526c6f9479370364e887182eda385cc4a5f5dd8";"sourceFile":"../hanja-goal-glyphwiki-batch545-2026-10-11/sources.json";"sourceFileSHA256":"50025c54e8c73c680843b993d012441c1a078fa3768fb73fadba784c304b041b"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u61f0'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u61f0',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number

