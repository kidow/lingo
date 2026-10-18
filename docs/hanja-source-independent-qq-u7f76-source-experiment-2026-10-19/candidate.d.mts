export type ProofIdentity=Readonly<{"root":"u7f76";"headerFile":"../hanja-goal-glyphwiki-batch546-2026-10-11/engine-proof.json";"headerFileSHA256":"9db223033580150433a608008f5e471e9cd5d0fc038468bd86a39f30a8e7e5e5";"traceFile":"../hanja-goal-glyphwiki-batch546-2026-10-11/draw-trace.json";"traceFileSHA256":"06edbb76b03def341664b92b5cd96e781acd00eca4e745fd5f2b9437ddc44599";"sourceFile":"../hanja-goal-glyphwiki-batch546-2026-10-11/sources.json";"sourceFileSHA256":"5f7e00e390257553b1f50766a7592fba1e13762ad3a4491e2c4173c82fc26086"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7f76'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7f76',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
