export type ProofIdentity=Readonly<{"root":"u576e";"headerFile":"../hanja-goal-glyphwiki-batch117-2026-09-27/engine-proof.json";"headerFileSHA256":"3c19d50186d79b3f80b91c8840a7878d6df4b7897e261f4d2f4a4d9511b333dc";"traceFile":"../hanja-goal-glyphwiki-batch117-2026-09-27/draw-trace.json";"traceFileSHA256":"cc0947b9816f203a99ad3dd4d1ba0d8a744345328258301aec92f9daeec9d4fd";"sourceFile":"../hanja-goal-glyphwiki-batch117-2026-09-27/sources.json";"sourceFileSHA256":"aab8d794087c0d5fff3e1acfa49067aa8dce88565b4f92c6302513eb815ed092"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u576e'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u576e',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
