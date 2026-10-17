import type { HanjaOutlineStrokes } from '../../lib/hanja-stroke-outline.ts'

export type SelectedProofIdentity = Readonly<{
  sourceRoot: string
  sourceProofFile: string
  sourceProofFileSha256: string
  sourceHeaderFile: string
  sourceHeaderFileSha256: string
}>
export declare const sourceRoot: string
export declare const sourceProofFile: string
export declare const sourceProofFileSha256: string
export declare const selectedProofIdentity: SelectedProofIdentity
export declare const sourceGroups: readonly (readonly number[])[]
export declare const candidateWholeProofs: readonly Readonly<{ identity: SelectedProofIdentity; sourceGroups: readonly (readonly number[])[] }>[]
export declare function compileProgressive(trace: unknown, proof: unknown, identity: SelectedProofIdentity): HanjaOutlineStrokes
export declare function compileSourceWhole(root: string, trace: unknown, proof: unknown, identity: SelectedProofIdentity): HanjaOutlineStrokes
