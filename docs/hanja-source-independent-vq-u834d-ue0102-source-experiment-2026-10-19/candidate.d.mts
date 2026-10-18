export type ProofIdentity=Readonly<{"root":"u834d-ue0102";"headerFile":"../hanja-goal-glyphwiki-batch460-2026-10-09/engine-proof.json";"headerFileSHA256":"199040e9ba9ce7c376e318055a90123823eede9c7b630770c3e4b559b94406cf";"traceFile":"../hanja-goal-glyphwiki-batch460-2026-10-09/draw-trace.json";"traceFileSHA256":"dbada9fa83e7ac9c4a76f65401c8890b00176a4e931cfde4836acaf686742f02";"sourceFile":"../hanja-goal-glyphwiki-batch460-2026-10-09/sources.json";"sourceFileSHA256":"eaf53107e897cbd9f0d3dcca909b2e94a718d87d06867acfd3ecc491d4ffa186"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u834d-ue0102'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u834d-ue0102',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
