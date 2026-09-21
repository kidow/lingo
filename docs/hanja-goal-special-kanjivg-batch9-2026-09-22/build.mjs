/** Reproduce reviewed KanjiVG curves without private dictionary graphics. */
import { readFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { normalizeKanjiVGPath } from "../../lib/hanja-stroke-kanjivg-geometry.ts"
const read = name => readFileSync(new URL(name, import.meta.url))
const sha = bytes => createHash("sha256").update(bytes).digest("hex")
const source = JSON.parse(read("candidates.json"))
const findings = JSON.parse(read("findings.json"))
const reviewSha = sha(read("findings.json"))
if (findings.entries.some(e => e.decision === "normalized-review-pending")) throw new Error("Incomplete review")
const entries = findings.entries.filter(e => e.decision === "approved")
console.log(JSON.stringify(entries.map(review => {
  const entry = source.entries.find(e => e.glyph === review.glyph && e.candidate.id === review.candidate)
  if (review.rendering.sourceSha256 !== entry.candidate.sha256 || review.rendering.normalizedStrokeWidth !== ({ "髢": 5 })[entry.glyph]) throw new Error("Unreviewed rendering width")
  const paths = review.sourceStrokeIndices.map(i => normalizeKanjiVGPath(entry.paths[i - 1]))
  return {
    glyph: entry.glyph, verificationSource: "ehanja-crosschecked", verifiedAt: "2026-09-22",
    geometrySource: entry.candidate.sha256,
    geometryCorrection: "kanjivg-uniform-scale-100-over-109-reviewed-order-v1",
    sourceStrokeIndices: review.sourceStrokeIndices, pathsSha256: sha(JSON.stringify(paths)),
    sourceReference: {
      orderUrl: entry.dictionary.url, dictionarySvgUrl: entry.dictionary.url,
      dictionarySvgSha256: entry.dictionary.sha256,
      dictionaryDirectionStrokes: paths.map((_, i) => i + 1).join(","),
      orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: reviewSha,
    },
    geometryLicense: { ...source.license, sourceUrl: entry.candidate.url, revision: source.revision,
      modifications: "Uniform coordinate scaling by 100/109; original stroke order. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging." },
    strokeWidth: review.rendering.normalizedStrokeWidth,
    paths,
  }
}), null, 2))
