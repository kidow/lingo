export type ProofIdentity=Readonly<{"root":"u7e8a";"headerFile":"../hanja-goal-glyphwiki-batch455-2026-10-09/engine-proof.json";"headerFileSHA256":"1acf14b9bfd24ab7171012b7f5c2e5527e94d29e3f3be37751997cf5f012ffb1";"traceFile":"../hanja-goal-glyphwiki-batch455-2026-10-09/draw-trace.json";"traceFileSHA256":"949931403342555f4e039cccafd0a9b05b009c6a513ddb9e71582f2babcfb2ff";"sourceFile":"../hanja-goal-glyphwiki-batch455-2026-10-09/sources.json";"sourceFileSHA256":"da82e4e057b5643b73bb1e00b862f0d94f3845431ea58014a012488ee2ab934e"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7e8a'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7e8a',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
