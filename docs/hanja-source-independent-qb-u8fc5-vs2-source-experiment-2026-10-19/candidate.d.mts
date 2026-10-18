export type ProofIdentity=Readonly<{"root":"u8fc5-ue0102";"headerFile":"../hanja-goal-glyphwiki-batch75-2026-09-22/alternative-engine-proof.json";"headerFileSHA256":"6d3be5181f80a2aa907900411ed6fff9f83091e77d4e537366ad85d677c3d120";"traceFile":"../hanja-goal-glyphwiki-batch75-2026-09-22/alternative-draw-trace.json";"traceFileSHA256":"65a5b37552580b297cc977f3bd61029a423fba7792e070980aacf3df7e9ee43f";"sourceFile":"../hanja-goal-glyphwiki-batch75-2026-09-22/alternative-sources.json";"sourceFileSHA256":"7dd90adb8126e1a50813bafced0b21cfc4a2fd8541d32ea38a1c4b2d8b840db7"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u8fc5-ue0102'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u8fc5-ue0102',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
