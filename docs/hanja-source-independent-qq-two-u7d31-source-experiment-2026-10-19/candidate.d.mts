export type ProofIdentity=Readonly<{"root":"u7d31";"headerFile":"../hanja-goal-glyphwiki-batch617-2026-10-11/engine-proof.json";"headerFileSHA256":"198850f139985c765cbd4aea4cb21d862c9b01d2438fa126aa01593025d62ea7";"traceFile":"../hanja-goal-glyphwiki-batch617-2026-10-11/draw-trace.json";"traceFileSHA256":"80d35a2b7c44e87987aaad5daeb6c7886038fa201e035747855e89e5c077202b";"sourceFile":"../hanja-goal-glyphwiki-batch617-2026-10-11/sources.json";"sourceFileSHA256":"3441ea1e390025c81040137f85d38edcfbbd502051b6deb8f7cbeb223cb225ba"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7d31'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7d31',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
