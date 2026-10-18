export type SourceIdentity={readonly sourceRoot:'u6678';readonly sourceProofFile:'./engine-whole-u6678.json';readonly sourceProofFileSha256:'6fa18ca35d149aa31fc313faf2e0ae7770556aa07129e4bc9e76355a0c59c8e9';readonly sourceCapsuleFile:'./sources.json';readonly sourceCapsuleFileSha256:'9b62cdba5b2944811484211675c32a57ee2993c3f3147aa419c70b0b4817a80f'}
export interface SourceProof{engineRevision:string;engineHashes:Readonly<Record<string,string>>;defaults:Readonly<Record<string,number>>;groups:readonly unknown[];trace:readonly unknown[]}
export interface SourceMask{outline:string;bounds:readonly[number,number,number,number];direction:'up'|'down'|'left'|'right'|'curve';weight:number;revealPath?:string;revealWidth?:number}
export declare const sourceRoot:'u6678'
export declare const sourceProofFile:'./engine-whole-u6678.json'
export declare const sourceProofFileSha256:string
export declare const selectedProofIdentity:SourceIdentity
export declare const sourceGroups:readonly(readonly number[])[]
export declare const nativeApproved:false,runtimeApplied:false
export declare function sourceCompileCallCount():number
export declare function compileProgressive(trace:SourceProof['trace'],proof:SourceProof,identity:SourceIdentity):readonly(readonly SourceMask[])[]
export declare function compileSourceWhole(root:'u6678',trace:SourceProof['trace'],proof:SourceProof,identity:SourceIdentity):readonly(readonly SourceMask[])[]
export {renderProgressive} from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
