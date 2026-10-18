export type ProofIdentity=Readonly<{"root":"u6cdb";"headerFile":"../hanja-goal-glyphwiki-batch145-2026-09-27/engine-proof.json";"headerFileSHA256":"b9056ee51c4a2ce71d50f28e1dab92374b05f1b137989c1ad9b2bb50418e7adc";"traceFile":"../hanja-goal-glyphwiki-batch145-2026-09-27/draw-trace.json";"traceFileSHA256":"4e8f341ee3b23715634cc4d461228a8070e7f8cefc94d219ebf9faf080214adf";"sourceFile":"../hanja-goal-glyphwiki-batch145-2026-09-27/sources.json";"sourceFileSHA256":"29b252860de81ccb764b52245e9549c517440eed737b7bc8fd027f5382d0fe25"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6cdb'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6cdb',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
