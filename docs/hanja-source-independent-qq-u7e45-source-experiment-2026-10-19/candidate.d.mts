export type ProofIdentity=Readonly<{"root":"u7e45";"headerFile":"../hanja-goal-glyphwiki-batch659-2026-10-11/engine-proof.json";"headerFileSHA256":"515b51101863b4984b513f0b9f7b55c24d49ee47e0f9d63d0c9171c1392d28cc";"traceFile":"../hanja-goal-glyphwiki-batch659-2026-10-11/draw-trace.json";"traceFileSHA256":"d5fefa3ed378031e64d4ed16c5223c86fe532e8b3a37eb48d314abad961bd28f";"sourceFile":"../hanja-goal-glyphwiki-batch659-2026-10-11/sources.json";"sourceFileSHA256":"a31da0eef5e4c47f37566b14c7dc52c8d4f3abb41ec48d20ddd66c9fcec158f1"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7e45'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7e45',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
