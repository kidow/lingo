export type ProofIdentity=Readonly<{"root":"u511b";"headerFile":"../hanja-goal-glyphwiki-batch574-2026-10-11/engine-proof.json";"headerFileSHA256":"8e68eab5eb16db0e58cc7e806a09e7d9bf8269a4ce92fc394a2290b0e173e8d7";"traceFile":"../hanja-goal-glyphwiki-batch574-2026-10-11/draw-trace.json";"traceFileSHA256":"0d5df2ab1fa6e3db530cd1fb781dc456166fa5893cfb24b4407f161cc92725fe";"sourceFile":"../hanja-goal-glyphwiki-batch574-2026-10-11/sources.json";"sourceFileSHA256":"80791e3265cd336c54aa6f5d8f060aaae7a4bfc3b8f4ede7a500561f58627792"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u511b'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u511b',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
