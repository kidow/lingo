export type ProofIdentity=Readonly<{"root":"u83f9-k";"headerFile":"../hanja-goal-glyphwiki-batch250-2026-10-04/engine-proof.json";"headerFileSHA256":"042193ce17ee38aa345ad7715fefc52d2c2c7c2caf3aa46681799ca776a8154a";"traceFile":"../hanja-goal-glyphwiki-batch250-2026-10-04/draw-trace.json";"traceFileSHA256":"337d65db6ce053f804e4e6dbd95783bc346d5d069f1d1476b26b5b45a80281a6";"sourceFile":"../hanja-goal-glyphwiki-batch250-2026-10-04/sources.json";"sourceFileSHA256":"f635544d6f0e8c6ca97456dc6c1f870b9e62b77d271fb1148ffb0e2522cec31c"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u83f9-k'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u83f9-k',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
