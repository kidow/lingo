export type ProofIdentity=Readonly<{"root":"u8fcb";"headerFile":"../hanja-goal-glyphwiki-batch456-2026-10-09/engine-proof.json";"headerFileSHA256":"578dc69da1e2997cb94668c14625d9d0ada324789449edc8e2e4dd3de1c9feda";"traceFile":"../hanja-goal-glyphwiki-batch456-2026-10-09/draw-trace.json";"traceFileSHA256":"7855c424db239182557d1eb17e0e0114a4af35d26aefc2ebad30589269c1964c";"sourceFile":"../hanja-goal-glyphwiki-batch456-2026-10-09/sources.json";"sourceFileSHA256":"3bcefbc3d91f1b6e7008b07b9c79509e18116ed137447bd13f2f1b64c48041ba"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u8fcb'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u8fcb',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
