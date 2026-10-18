export type ProofIdentity=Readonly<{"root":"u748a";"headerFile":"../hanja-goal-glyphwiki-batch578-2026-10-11/engine-proof.json";"headerFileSHA256":"9b4b04e83ae0714defa10cc9bc6f023fa4421d7207fadbdcb6195ca7e4baba76";"traceFile":"../hanja-goal-glyphwiki-batch578-2026-10-11/draw-trace.json";"traceFileSHA256":"0c24611c7d5a8c086d28ce77e98a723c70dc663d95e60108599493f2050159bf";"sourceFile":"../hanja-goal-glyphwiki-batch578-2026-10-11/sources.json";"sourceFileSHA256":"8838ca5804b3d024ee5817ef765ed7e6ceb9be53193acc2630b4261fec47ba1c"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u748a'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u748a',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
