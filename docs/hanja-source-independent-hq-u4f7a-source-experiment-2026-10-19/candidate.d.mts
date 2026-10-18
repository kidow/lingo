export type ProofIdentity=Readonly<{"root":"u4f7a";"headerFile":"../hanja-goal-glyphwiki-batch91-2026-09-27/engine-proof.json";"headerFileSHA256":"ab28819ac06092e0987d0fc43f77e48d31c482b43c13baec64b63b85b270472b";"traceFile":"../hanja-goal-glyphwiki-batch91-2026-09-27/draw-trace.json";"traceFileSHA256":"0cfc96491b4e01032af635bd29d5d4a0c5026477c64dea8955e3fa855784902d";"sourceFile":"../hanja-goal-glyphwiki-batch91-2026-09-27/sources.json";"sourceFileSHA256":"7b803c4f27eadae7ed12643d25de0e3c50e47eba8421f44b9aa90e896cf73ce1"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u4f7a'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u4f7a',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number

