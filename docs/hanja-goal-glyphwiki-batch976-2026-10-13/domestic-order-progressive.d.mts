import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
import type {Full5Proof,SelectedProofIdentity} from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
export declare const DOMESTIC_ORDER:readonly number[]
export declare function compileDomesticOrder(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
