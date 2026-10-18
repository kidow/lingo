export type ProofIdentity=Readonly<{sourceRoot:"u4f8a";sourceProofFile:"./engine-whole-u4f8a.json";sourceProofFileSha256:"f2ccf3acf2327e9f8725568c722bdcb8481eacbce306f438216a2420dab76380";sourceCapsuleFile:"./sources.json";sourceCapsuleFileSha256:"7faba9a455063475a411c93216f9c34eec555ca923d63d75e0db61e48ada6ba4"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u4f8a'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Readonly<{baseline:Strokes;strokes:Strokes}>
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function compileSourceWhole(root:'u4f8a',trace:FullProof['trace'],proof:FullProof,id:ProofIdentity):Strokes
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function sourceCompileCallCount():number
