export type ProofIdentity=Readonly<{root:"u5a0d";headerFile:"../hanja-goal-glyphwiki-batch655-2026-10-11/engine-proof.json";headerFileSHA256:"c7c68c4c406a1d2979a9d0528292f83b6036c40831ee29c8a4a33e99231e2553";traceFile:"../hanja-goal-glyphwiki-batch655-2026-10-11/draw-trace.json";traceFileSHA256:"cf99ddf035d2351cfa7818d508cb6ac7407c5b5e1db9409a2211971786a92b04";sourceFile:"../hanja-goal-glyphwiki-batch655-2026-10-11/sources.json";sourceFileSHA256:"ed39dfc3b1df765a4b41229a225b71d36f8dc582842d04a6972ae5d7209c4188"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u5a0d'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureRawGeometry(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Readonly<{rawBaseline:Strokes;baseline:Strokes;strokes:Strokes}>
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function compileSourceWhole(root:'u5a0d',trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
