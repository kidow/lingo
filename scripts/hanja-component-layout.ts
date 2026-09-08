import type { Box } from './hanja-component-geometry.ts'

export type Profile = {
  glyph: string
  position: 'left' | 'right' | 'top' | 'bottom'
  sourceBox: Box
  donorBox: Box
  donorGlyph: string
  reviewed: boolean
}
export type LayoutChild = { glyph?: string; intrinsicBox?: Box; profiles: Profile[] }

const GAP = 6 // Runtime stroke width 5 plus at least 1 unit of visible clearance.
const MIN_CELL_EXTENT = 6
const EPSILON = 1e-8
type NormalizedProfile = { donorGlyph: string; splitExtent: number; crossStart: number; crossEnd: number }
type Selection = { profiles: NormalizedProfile[]; reviewed: boolean }

function validateBox(box: Box, label: string, allowLine = false): void {
  if (!box || ![box.x, box.y, box.width, box.height].every(Number.isFinite)
    || !Number.isFinite(box.x + box.width) || !Number.isFinite(box.y + box.height)
    || box.width < 0 || box.height < 0 || (!allowLine && (!box.width || !box.height))
    || (!box.width && !box.height)) throw new Error('Invalid ' + label + ' box')
}

function median(values: number[]): number {
  const ordered = [...values].sort((a, b) => a - b)
  const middle = Math.floor(ordered.length / 2)
  return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2
}

function normalized(value: number): number { return Math.max(0, Math.min(1, value)) }

function selectProfiles(child: LayoutChild, position: Profile['position'], horizontal: boolean): Selection {
  if (!Array.isArray(child.profiles)) throw new Error('Invalid profile collection')
  if (child.glyph !== undefined && [...child.glyph].length !== 1) throw new Error('Invalid component glyph')
  if (child.intrinsicBox !== undefined) validateBox(child.intrinsicBox, 'intrinsic', true)
  for (const profile of child.profiles) {
    if (!profile || !child.glyph || profile.glyph !== child.glyph || profile.position !== position
      || typeof profile.donorGlyph !== 'string' || [...profile.donorGlyph].length !== 1
      || typeof profile.reviewed !== 'boolean') throw new Error('Profile glyph or position mismatch')
    validateBox(profile.sourceBox, 'profile source', true)
    validateBox(profile.donorBox, 'profile donor')
    const source = profile.sourceBox, donor = profile.donorBox
    const tolerance = EPSILON * Math.max(1, donor.width, donor.height)
    if (source.x < donor.x - tolerance || source.y < donor.y - tolerance
      || source.x + source.width > donor.x + donor.width + tolerance
      || source.y + source.height > donor.y + donor.height + tolerance) {
      throw new Error('Profile source falls outside its donor box')
    }
  }
  const reviewed = child.profiles.some(profile => profile.reviewed)
  // An inferred copy of a reviewed donor must not vote twice or overrule its correction.
  const chosen = child.profiles.filter(profile => !reviewed || profile.reviewed)
  const byDonor = new Map<string, NormalizedProfile>()
  for (const profile of chosen) {
    const source = profile.sourceBox, donor = profile.donorBox
    const value = horizontal
      ? { donorGlyph: profile.donorGlyph, splitExtent: normalized(source.width / donor.width),
        crossStart: normalized((source.y - donor.y) / donor.height),
        crossEnd: normalized((source.y + source.height - donor.y) / donor.height) }
      : { donorGlyph: profile.donorGlyph, splitExtent: normalized(source.height / donor.height),
        crossStart: normalized((source.x - donor.x) / donor.width),
        crossEnd: normalized((source.x + source.width - donor.x) / donor.width) }
    const previous = byDonor.get(profile.donorGlyph)
    if (previous && (Math.abs(previous.splitExtent - value.splitExtent) > EPSILON
      || Math.abs(previous.crossStart - value.crossStart) > EPSILON
      || Math.abs(previous.crossEnd - value.crossEnd) > EPSILON)) {
      throw new Error('Conflicting profiles for the same donor')
    }
    if (!previous) byDonor.set(profile.donorGlyph, value)
  }
  return { profiles: [...byDonor.values()].sort((a, b) => a.donorGlyph < b.donorGlyph ? -1 : a.donorGlyph > b.donorGlyph ? 1 : 0), reviewed }
}

function contain(intrinsic: Box, cell: Box): Box {
  // A line retains its zero-width/height axis; fitPaths knows how to center that axis.
  const scale = Math.min(intrinsic.width ? cell.width / intrinsic.width : Infinity,
    intrinsic.height ? cell.height / intrinsic.height : Infinity)
  const width = intrinsic.width * scale, height = intrinsic.height * scale
  return { x: cell.x + (cell.width - width) / 2, y: cell.y + (cell.height - height) / 2, width, height }
}

/**
 * Pure v2 layout heuristic. The caller supplies direct-root component profiles from
 * permitted training donors; this helper cannot inspect targets, files, or holdouts.
 *
 * 1. For each child, reviewed profiles replace inferred profiles. Duplicate donors
 *    vote once. Geometry is normalized against that donor's whole centerline box.
 * 2. Median split-axis extents supply relative child widths (LR) or heights (TB).
 *    With two nonzero estimates they are normalized to sum to one; with only one,
 *    its observed whole-donor fraction is used and the other gets the remainder.
 *    Zero-width/height line profiles cannot estimate a split. No estimates means
 *    the caller's fallback ratio. These are donor-based estimates, not target rules.
 * 3. Allocate two cells separated by 6 units. Neither cell may be less than 6
 *    units on the split axis. Impossible layouts throw instead of silently overlap.
 * 4. LR profiles set each child's vertical start/end; TB profiles set horizontal
 *    start/end. Separate endpoint medians preserve containment and cannot invert.
 *    Without a profile, uniformly contain intrinsic geometry in its cell; without
 *    intrinsic geometry (e.g. a compound child), leave the full cell available.
 *
 * Returned boxes bound centerlines, not painted strokes. The split-axis gap stays
 * >=6 even after containment. This improves proportions; it does not verify joins,
 * Korean glyph identity, stroke direction/order, or a component's review status.
 */
export function resolveComponentLayout(operator: '⿰' | '⿱', box: Box,
  children: [LayoutChild, LayoutChild], fallbackRatio: number): {
    boxes: [Box, Box]; sourceDonors: string[]; mode: string
  } {
  if (operator !== '⿰' && operator !== '⿱') throw new Error('Unsupported layout operator')
  validateBox(box, 'layout')
  if (!Number.isFinite(fallbackRatio) || fallbackRatio <= 0 || fallbackRatio >= 1) throw new Error('Invalid fallback ratio')
  if (!Array.isArray(children) || children.length !== 2) throw new Error('Layout needs exactly two children')
  const horizontal = operator === '⿰'
  if (Math.min(box.width, box.height) < MIN_CELL_EXTENT) throw new Error('Insufficient layout space')
  const selected = children.map((child, index) => selectProfiles(child,
    horizontal ? (index ? 'right' : 'left') : (index ? 'bottom' : 'top'), horizontal))
  const extents = selected.map(selection => {
    const values = selection.profiles.map(profile => profile.splitExtent).filter(value => value > EPSILON)
    return values.length ? median(values) : undefined
  })
  let ratio = fallbackRatio
  if (extents[0] !== undefined && extents[1] !== undefined) ratio = extents[0] / (extents[0] + extents[1])
  else if (extents[0] !== undefined) ratio = extents[0]
  else if (extents[1] !== undefined) ratio = 1 - extents[1]
  const usable = (horizontal ? box.width : box.height) - GAP
  const firstExtent = usable * ratio, secondExtent = usable * (1 - ratio)
  if (firstExtent < MIN_CELL_EXTENT || secondExtent < MIN_CELL_EXTENT) throw new Error('Insufficient layout space')
  const cells: [Box, Box] = horizontal
    ? [{ ...box, width: firstExtent }, { ...box, x: box.x + firstExtent + GAP, width: secondExtent }]
    : [{ ...box, height: firstExtent }, { ...box, y: box.y + firstExtent + GAP, height: secondExtent }]
  const boxes = cells.map((cell, index) => {
    const selection = selected[index]
    if (selection.profiles.length) {
      const start = median(selection.profiles.map(profile => profile.crossStart))
      const end = median(selection.profiles.map(profile => profile.crossEnd))
      return horizontal
        ? { ...cell, y: box.y + box.height * start, height: box.height * (end - start) }
        : { ...cell, x: box.x + box.width * start, width: box.width * (end - start) }
    }
    return children[index].intrinsicBox ? contain(children[index].intrinsicBox!, cell) : cell
  }) as [Box, Box]
  const sourceDonors = [...new Set(selected.flatMap(selection => selection.profiles.map(profile => profile.donorGlyph)))].sort()
  const modes: string[] = []
  if (selected.some(selection => selection.profiles.length && selection.reviewed)) modes.push('reviewed-profile')
  if (selected.some(selection => selection.profiles.length && !selection.reviewed)) modes.push('inferred-profile')
  if (selected.some((selection, index) => !selection.profiles.length && children[index].intrinsicBox)) modes.push('intrinsic-contain')
  if (selected.some((selection, index) => !selection.profiles.length && !children[index].intrinsicBox)) modes.push('cell-fallback')
  return { boxes, sourceDonors, mode: modes.join('+') }
}
