export type SourceIdentity={readonly sourceRoot:'u7628';readonly sourceProofFile:'./engine-whole-u7628.json';readonly sourceProofFileSha256:'c0c83445cf0994d69e83ec74439753c7bcd6e3176e70d5dfc156669c3e13614f';readonly sourceCapsuleFile:'./sources.json';readonly sourceCapsuleFileSha256:'df44e2b2b0ca0bc7770d13834a454f2973b7ecbd29f9455df5a8579ccbe42212'}
export interface SourceProof{engineRevision:string;engineHashes:Readonly<Record<string,string>>;defaults:Readonly<Record<string,number>>;groups:readonly unknown[];trace:readonly unknown[]}
export interface SourceMask{outline:string;bounds:readonly[number,number,number,number];direction:'up'|'down'|'left'|'right'|'curve';weight:number;revealPath?:string;revealWidth?:number}
export declare const sourceRoot:'u7628'
export declare const sourceProofFile:'./engine-whole-u7628.json'
export declare const sourceProofFileSha256:string
export declare const selectedProofIdentity:SourceIdentity
export declare const sourceGroups:readonly(readonly number[])[]
export declare const nativeApproved:false,runtimeApplied:false
export declare function sourceCompileCallCount():number
export declare function compileProgressive(trace:SourceProof['trace'],proof:SourceProof,identity:SourceIdentity):readonly(readonly SourceMask[])[]
export declare function compileSourceWhole(root:'u7628',trace:SourceProof['trace'],proof:SourceProof,identity:SourceIdentity):readonly(readonly SourceMask[])[]
export {renderProgressive} from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
