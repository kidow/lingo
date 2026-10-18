export type ProofIdentity=Readonly<{"root":"u4e4f-k";"headerFile":"../hanja-goal-glyphwiki-batch65-2026-09-22/engine-proof.json";"headerFileSHA256":"ed3e3b5989ea7dd310731d76d8c5be8ecb9fbba8d32de8142f9d9b0ee6cdee2c";"traceFile":"../hanja-goal-glyphwiki-batch65-2026-09-22/draw-trace.json";"traceFileSHA256":"438f9b1e53639d8230a238e3832677589f109cd26fba72ae77d1f8e624bcf0fe";"sourceFile":"../hanja-goal-glyphwiki-batch65-2026-09-22/sources.json";"sourceFileSHA256":"47ceb766c7e92f459b80975f519e758add9e3848102ed4a34c12fda2cc89189c"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u4e4f-k'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u4e4f-k',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
