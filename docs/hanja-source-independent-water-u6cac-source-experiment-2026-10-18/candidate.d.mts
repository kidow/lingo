export type ProofIdentity=Readonly<{root:"u6cac";headerFile:"../hanja-goal-glyphwiki-batch562-2026-10-11/engine-proof.json";headerFileSHA256:"b7a778e92dae2c50c18200499500428169649c1220c8da742d16846c4400b13f";traceFile:"../hanja-goal-glyphwiki-batch562-2026-10-11/draw-trace.json";traceFileSHA256:"87fb4b6dadbed5a462816fca2a835ae514a4676e8a1d0403a76b2790a569784a";sourceFile:"../hanja-goal-glyphwiki-batch562-2026-10-11/sources.json";sourceFileSHA256:"c1b4934813fecdc15b8b5ddce1dbcb3ab50323b95adfb51f3eeb17e6ad89134e"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u6cac'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureRawGeometry(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Readonly<{rawBaseline:Strokes;strokes:Strokes}>
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6cac',trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
