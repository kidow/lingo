export type SourceIdentity={readonly sourceRoot:'u4f8a';readonly sourceProofFile:'./engine-whole-u4f8a.json';readonly sourceProofFileSha256:'f2ccf3acf2327e9f8725568c722bdcb8481eacbce306f438216a2420dab76380';readonly sourceCapsuleFile:'./sources.json';readonly sourceCapsuleFileSha256:'7faba9a455063475a411c93216f9c34eec555ca923d63d75e0db61e48ada6ba4'}
export interface SourceProof{engineRevision:string;engineHashes:Readonly<Record<string,string>>;defaults:Readonly<Record<string,number>>;groups:readonly unknown[];trace:readonly unknown[]}
export interface SourceMask{outline:string;bounds:readonly[number,number,number,number];direction:'up'|'down'|'left'|'right'|'curve';weight:number;revealPath?:string;revealWidth?:number}
export declare const sourceRoot:'u4f8a'
export declare const sourceProofFile:'./engine-whole-u4f8a.json'
export declare const sourceProofFileSha256:string
export declare const selectedProofIdentity:SourceIdentity
export declare const sourceGroups:readonly(readonly number[])[]
export declare const nativeApproved:false,runtimeApplied:false
export declare function sourceCompileCallCount():number
export declare function compileProgressive(trace:SourceProof['trace'],proof:SourceProof,identity:SourceIdentity):readonly(readonly SourceMask[])[]
export declare function compileSourceWhole(root:'u4f8a',trace:SourceProof['trace'],proof:SourceProof,identity:SourceIdentity):readonly(readonly SourceMask[])[]
export {renderProgressive} from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
