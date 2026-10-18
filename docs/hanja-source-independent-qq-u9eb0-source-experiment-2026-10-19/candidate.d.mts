export type ProofIdentity=Readonly<{"root":"u9eb0";"headerFile":"../hanja-goal-glyphwiki-batch569-2026-10-11/engine-proof.json";"headerFileSHA256":"a03ce8f93ab86faadcebe86927978fd1299a3f0e7f6265112d19008e2b2624e5";"traceFile":"../hanja-goal-glyphwiki-batch569-2026-10-11/draw-trace.json";"traceFileSHA256":"5eaf0846f07ce332ddd4ec393cdc74c9315e4fd537aad5499fb1fd693023c313";"sourceFile":"../hanja-goal-glyphwiki-batch569-2026-10-11/sources.json";"sourceFileSHA256":"48157b29c4e83b3247718e5698917c7e477f952573586d341cdcf9ad5de419cb"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u9eb0'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u9eb0',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
