export type ProofIdentity=Readonly<{"root":"u7d11";"headerFile":"../hanja-goal-glyphwiki-batch607-2026-10-11/engine-proof.json";"headerFileSHA256":"c29e9ccd5570597177b286556b1a555554126de59340e5fda64c75a17c491527";"traceFile":"../hanja-goal-glyphwiki-batch607-2026-10-11/draw-trace.json";"traceFileSHA256":"07c84dc079a05361b769912e8a759ae737858963c6655a5c3757373b921141b1";"sourceFile":"../hanja-goal-glyphwiki-batch607-2026-10-11/sources.json";"sourceFileSHA256":"c1bf1599b432852f049955a5f575e59fdd563b23313dd0df4cdd09e83eb6c7b3"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7d11'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7d11',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
