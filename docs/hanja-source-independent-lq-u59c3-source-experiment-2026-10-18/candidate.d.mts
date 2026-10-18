export type ProofIdentity=Readonly<{root:'u59c3';headerFile:"../hanja-goal-glyphwiki-batch93-2026-09-27/engine-proof.json";headerFileSHA256:"775ba023fa5e5bc996acdccfe2c29a85b2638411280f2cc23a36f6083b245e96";traceFile:"../hanja-goal-glyphwiki-batch93-2026-09-27/draw-trace.json";traceFileSHA256:"c49272e4a5c7eb2991627e47bb5e167bd1dd2373c1a4f2690ed46f3573c88524";sourceFile:"../hanja-goal-glyphwiki-batch93-2026-09-27/sources.json";sourceFileSHA256:"d1775ed4c6668670c11e628916f95b91c750ecaf5e2dd7303a2f2331066081d2"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u59c3'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function deriveIndependentMasks(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u59c3',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
