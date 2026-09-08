/** Experimental composition only. This module cannot write to the runtime approval registry.
 * Inputs contain IDS structure, catalog counts and approved donor paths, never target stroke data.
 */
import { createHash } from 'node:crypto'
import { bounds, fitPaths, type Box } from './hanja-component-geometry.ts'

export type Definition = { character: string; decomposition: string }
export type CatalogCharacter = { glyph: string; strokes: number; readingGrade: string; hun?: string; eum?: string }
export type ApprovedDonor = {
  glyph: string; paths: readonly string[]; pathsSha256?: string
  geometrySource?: string; geometryCorrection?: string
  sourceStrokeIndices?: readonly (number | null)[]; strokeOrder?: readonly number[]
  verificationSource?: string; sourceImage?: string; sourceRow?: number
  sourceReference?: unknown; verifiedAt?: string
}
export type Ids = { glyph: string } | { operator: string; children: Ids[] }
export type Position = 'standalone' | 'left' | 'right' | 'top' | 'bottom' | 'enclosure'
export type Component = {
  id: string; glyph: string; position: Position; donorGlyph: string
  donorPathsSha256: string; approvedPathIndices: number[]; upstreamIndices: (number | null)[]
  paths: string[]; sourceBox: Box; donorBox: Box
  assignment: 'approved-whole-glyph' | 'spatial-partition-inferred' | 'enclosure-rule-inferred'
  evidence: { verificationSource: string; sourceImage?: string; sourceRow?: number; sourceReference?: unknown
    geometrySource?: string; geometryCorrection?: string; verifiedAt?: string }
}
export type Library = {
  version: 'component-pilot-v1'; components: Component[]
  layouts: { operator: string; first: string; second: string; ratio: number; donorGlyph: string }[]
  donorGlyphs: string[]; excludedDonors: { glyph: string; reason: string }[]
  forbiddenGlyphs: string[]; hash: string
}
export type Placement = {
  instance: string; componentId: string; glyph: string; position: Position
  donorGlyph: string; donorPathsSha256: string; approvedPathIndices: number[]
  assignment: Component['assignment']; targetBox: Box
  transform: { sx: number; sy: number; tx: number; ty: number }
}
export type Candidate = {
  glyph: string; expectedStrokes: number; status: 'candidate-unreviewed' | 'abstained'
  reason?: string; paths: string[]; placements: Placement[]
  schedule: { instance: string; componentStroke: number }[]
  libraryHash: string; rules: string[]; provenance: 'component-derived-unreviewed'
}

const arity: Record<string, number> = { '⿰': 2, '⿱': 2, '⿲': 3, '⿳': 3,
  '⿴': 2, '⿵': 2, '⿶': 2, '⿷': 2, '⿸': 2, '⿹': 2, '⿺': 2, '⿻': 2 }
const variantForms = new Set([...'亻氵扌忄艹辶阝礻衤犭灬刂冫饣纟讠⺗'])
export const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const codepointOrder = (a: string, b: string) => (a.codePointAt(0) ?? 0) - (b.codePointAt(0) ?? 0)

export function parseIds(input: string): Ids | null {
  const chars = [...input]; let offset = 0
  function read(depth: number): Ids | null {
    if (depth > 32) return null
    const glyph = chars[offset++]
    if (!glyph || glyph === '？' || glyph === '?' || /\s/u.test(glyph)) return null
    if (!(glyph in arity)) return { glyph }
    const children: Ids[] = []
    for (let i = 0; i < arity[glyph]; i++) { const child = read(depth + 1); if (!child) return null; children.push(child) }
    return { operator: glyph, children }
  }
  const tree = read(0)
  return offset === chars.length ? tree : null
}
export function idsKey(tree: Ids): string {
  return 'glyph' in tree ? tree.glyph : tree.operator + tree.children.map(idsKey).join('')
}
function nodes(tree: Ids): Ids[] { return 'glyph' in tree ? [tree] : [tree, ...tree.children.flatMap(nodes)] }
const leaf = (tree: Ids) => 'glyph' in tree ? tree.glyph : undefined

export function structureGroup(glyph: string, definitions: ReadonlyMap<string, string>): string {
  const tree = parseIds(definitions.get(glyph) ?? '')
  if (!tree || 'glyph' in tree) return 'other'
  if (nodes(tree).some(n => 'glyph' in n && variantForms.has(n.glyph))) return 'positional-variant'
  if (tree.operator === '⿰' || tree.operator === '⿲') return 'left-right'
  if (tree.operator === '⿱' || tree.operator === '⿳') return 'top-bottom'
  if (['⿴', '⿵', '⿶', '⿷', '⿸', '⿹', '⿺'].includes(tree.operator)) return 'enclosure'
  return 'other'
}

/** Selection precedes extraction and scoring. Generation failures must not replace selected targets. */
export function selectHoldout(glyphs: readonly string[], definitions: ReadonlyMap<string, string>, count = 100): string[] {
  if (count !== 100 || glyphs.length < count || new Set(glyphs).size !== glyphs.length) throw new Error('Expected 100 unique held-out targets')
  const order = [...glyphs].sort((a, b) => digest(['component-pilot-holdout-v1', a]).localeCompare(digest(['component-pilot-holdout-v1', b])))
  const quotas: [string, number][] = [['left-right', 25], ['top-bottom', 25], ['positional-variant', 25], ['enclosure', 15], ['other', 10]]
  const result = quotas.flatMap(([group, n]) => order.filter(g => structureGroup(g, definitions) === group).slice(0, n))
  for (const glyph of order) if (result.length < count && !result.includes(glyph)) result.push(glyph)
  return result
}

function containsForbidden(glyph: string, definitions: ReadonlyMap<string, string>, forbidden: ReadonlySet<string>, patterns: ReadonlySet<string>): boolean {
  const seen = new Set<string>()
  function visit(name: string, depth: number): boolean {
    if (forbidden.has(name.normalize('NFC'))) return true
    if (seen.has(name) || depth > 32) return false
    seen.add(name)
    const tree = parseIds(definitions.get(name) ?? '')
    if (!tree) return false
    for (const node of nodes(tree)) {
      if ('glyph' in node) { if (node.glyph !== name && visit(node.glyph, depth + 1)) return true }
      else if (patterns.has(idsKey(node))) return true
    }
    return false
  }
  return visit(glyph, 0)
}

function component(donor: ApprovedDonor, glyph: string, position: Position, indices: number[], assignment: Component['assignment']): Component {
  const paths = indices.map(i => donor.paths[i])
  const upstream = donor.sourceStrokeIndices ?? donor.strokeOrder
  const record: Omit<Component, 'id'> = {
    glyph, position, donorGlyph: donor.glyph, donorPathsSha256: digest(donor.paths),
    approvedPathIndices: indices.map(i => i + 1),
    upstreamIndices: indices.map(i => upstream ? upstream[i] : donor.geometrySource ? i + 1 : null),
    paths, sourceBox: bounds(paths), donorBox: bounds(donor.paths), assignment,
    evidence: { verificationSource: donor.verificationSource ?? 'eomunhoe-f37',
      ...(donor.sourceImage ? { sourceImage: donor.sourceImage, sourceRow: donor.sourceRow } : {}),
      ...(donor.sourceReference ? { sourceReference: donor.sourceReference } : {}),
      ...(donor.geometrySource ? { geometrySource: donor.geometrySource } : {}),
      ...(donor.geometryCorrection ? { geometryCorrection: donor.geometryCorrection } : {}),
      ...(donor.verifiedAt ? { verifiedAt: donor.verifiedAt } : {}) }
  }
  return { id: digest(record).slice(0, 24), ...record }
}

/** Conservative disjoint-axis partition. Never use foreign corpus stroke numbers. */
function partition(paths: readonly string[], axis: 'x' | 'y', counts: (number | undefined)[]): number[][] | null {
  const boxes = paths.map(p => bounds([p]))
  const extent = axis === 'x' ? 'width' : 'height'
  const options: number[][][] = []
  // A validated left/right or top/bottom donor must already use that global order.
  for (let k = 1; k < paths.length; k++) {
    if (counts[0] !== undefined && k !== counts[0] || counts[1] !== undefined && paths.length - k !== counts[1]) continue
    const before = Math.max(...boxes.slice(0, k).map(b => b[axis] + b[extent]))
    const after = Math.min(...boxes.slice(k).map(b => b[axis]))
    // Runtime paths use width 5 with round caps: centerline separation alone is insufficient.
    if (after - before >= 6) options.push([Array.from({ length: k }, (_, i) => i), Array.from({ length: paths.length - k }, (_, i) => i + k)])
  }
  return options.length === 1 ? options[0] : null
}

export function buildLibrary(approved: readonly ApprovedDonor[], definitions: ReadonlyMap<string, string>, catalog: ReadonlyMap<string, CatalogCharacter>, forbiddenGlyphs: readonly string[] = []): Library {
  const forbidden = new Set(forbiddenGlyphs.map(g => g.normalize('NFC')))
  const patterns = new Set(forbiddenGlyphs.map(g => parseIds(definitions.get(g) ?? '')).filter((t): t is Ids => !!t && !('glyph' in t)).map(idsKey))
  const components: Component[] = [], layouts: Library['layouts'] = [], donorGlyphs: string[] = [], excludedDonors: Library['excludedDonors'] = []
  const unique = new Set<string>()
  for (const donor of [...approved].sort((a, b) => codepointOrder(a.glyph, b.glyph))) {
    if (unique.has(donor.glyph)) throw new Error('Duplicate approved donor')
    unique.add(donor.glyph)
    if (forbidden.has(donor.glyph.normalize('NFC'))) { excludedDonors.push({ glyph: donor.glyph, reason: 'held-out-target' }); continue }
    if (containsForbidden(donor.glyph, definitions, forbidden, patterns)) { excludedDonors.push({ glyph: donor.glyph, reason: 'contains-held-out-component' }); continue }
    if (donor.pathsSha256 && donor.pathsSha256 !== digest(donor.paths)) throw new Error('Stale approved donor paths hash: ' + donor.glyph)
    if (catalog.get(donor.glyph)?.strokes !== donor.paths.length) throw new Error('Approved donor/catalog count mismatch: ' + donor.glyph)
    for (const [name, mapping] of [['sourceStrokeIndices', donor.sourceStrokeIndices], ['strokeOrder', donor.strokeOrder]] as const) {
      if (mapping !== undefined && (!Array.isArray(mapping) || mapping.length !== donor.paths.length
        || Array.from(mapping).some(n => !(name === 'sourceStrokeIndices' && n === null) && (!Number.isInteger(n) || Number(n) < 1)))) {
        throw new Error('Invalid upstream mapping: ' + donor.glyph + ':' + name)
      }
    }
    donorGlyphs.push(donor.glyph)
    components.push(component(donor, donor.glyph, 'standalone', donor.paths.map((_, i) => i), 'approved-whole-glyph'))
    const tree = parseIds(definitions.get(donor.glyph) ?? '')
    if (!tree || 'glyph' in tree || tree.children.length !== 2) continue
    const first = leaf(tree.children[0]), second = leaf(tree.children[1])
    if (!first || !second) continue
    if (tree.operator === '⿰' || tree.operator === '⿱') {
      const axis = tree.operator === '⿰' ? 'x' : 'y'
      const groups = partition(donor.paths, axis, [catalog.get(first)?.strokes, catalog.get(second)?.strokes])
      if (!groups) continue
      const positions: Position[] = axis === 'x' ? ['left', 'right'] : ['top', 'bottom']
      const parts = [first, second].map((g, i) => component(donor, g, positions[i], groups[i], 'spatial-partition-inferred'))
      components.push(...parts)
      const whole = bounds(donor.paths), a = parts[0].sourceBox, b = parts[1].sourceBox
      const size = axis === 'x' ? 'width' : 'height'
      if (whole[size] > 0) layouts.push({ operator: tree.operator, first, second,
        ratio: Math.max(.25, Math.min(.75, ((a[axis] + a[size] + b[axis]) / 2 - whole[axis]) / whole[size])), donorGlyph: donor.glyph })
    } else if (tree.operator === '⿴' && first === '囗' && catalog.get(second)?.strokes === donor.paths.length - 3) {
      // The Korean 囚 rule: two opening strokes, interior, final closing stroke.
      const end = donor.paths.length - 1
      const outer = component(donor, first, 'enclosure', [0, 1, end], 'enclosure-rule-inferred')
      const inner = component(donor, second, 'standalone', Array.from({ length: end - 2 }, (_, i) => i + 2), 'enclosure-rule-inferred')
      const o = outer.sourceBox, b = inner.sourceBox
      if (b.x - o.x >= 6 && b.y - o.y >= 6 && o.x + o.width - b.x - b.width >= 6 && o.y + o.height - b.y - b.height >= 6) components.push(outer, inner)
    }
  }
  const value = { version: 'component-pilot-v1' as const, components, layouts, donorGlyphs, excludedDonors, forbiddenGlyphs: [...forbiddenGlyphs] }
  return { ...value, hash: digest(value) }
}

class CannotCompose extends Error { }
const median = (values: number[]) => { const sorted = [...values].sort((a, b) => a - b); return sorted[Math.floor(sorted.length / 2)] ?? .5 }

export function compose(target: { glyph: string; strokes: number }, definitions: ReadonlyMap<string, string>, library: Library): Candidate {
  const { hash, ...libraryValue } = library
  if (hash !== digest(libraryValue)) throw new Error('Component library hash mismatch')
  for (const component of library.components) {
    const { id, ...record } = component
    if (id !== digest(record).slice(0, 24) || component.paths.length !== component.approvedPathIndices.length
      || component.paths.length !== component.upstreamIndices.length
      || component.approvedPathIndices.some((n, i, indices) => !Number.isInteger(n) || n < 1 || i > 0 && n <= indices[i - 1])) {
      throw new Error('Component identity or approved path mapping mismatch')
    }
  }
  const placements: Placement[] = [], rules = new Set<string>()
  type Piece = { path: string; instance: string; componentStroke: number }
  const available = new Map<string, Component[]>()
  for (const part of library.components) available.set(part.glyph, [...(available.get(part.glyph) ?? []), part])
  function emit(glyph: string, position: Position, box: Box, instance: string, ancestry: string[]): Piece[] {
    if (ancestry.includes(glyph) || ancestry.length > 12) throw new CannotCompose('cyclic-or-deep-decomposition:' + glyph)
    const choices = (available.get(glyph) ?? []).filter(c => c.donorGlyph !== target.glyph && (c.position === position || c.position === 'standalone'))
    choices.sort((a, b) => Number(b.position === position) - Number(a.position === position)
      || Number(a.assignment !== 'approved-whole-glyph') - Number(b.assignment !== 'approved-whole-glyph') || a.id.localeCompare(b.id))
    const part = choices[0]
    if (part) {
      if (library.forbiddenGlyphs.includes(part.donorGlyph) || !library.donorGlyphs.includes(part.donorGlyph)) throw new Error('Forbidden donor leaked into generation')
      const fitted = fitPaths(part.paths, box)
      placements.push({ instance, componentId: part.id, glyph, position, donorGlyph: part.donorGlyph,
        donorPathsSha256: part.donorPathsSha256, approvedPathIndices: part.approvedPathIndices,
        assignment: part.assignment, targetBox: box, transform: fitted.transform })
      if (position !== 'standalone' && part.position === 'standalone') rules.add('whole-form-position-adaptation-unreviewed')
      return fitted.paths.map((path, i) => ({ path, instance, componentStroke: i + 1 }))
    }
    const tree = parseIds(definitions.get(glyph) ?? '')
    if (!tree || 'glyph' in tree) throw new CannotCompose('missing-component:' + glyph)
    return visit(tree, box, instance, [...ancestry, glyph])
  }
  function visit(tree: Ids, box: Box, address: string, ancestry: string[]): Piece[] {
    if ('glyph' in tree) return emit(tree.glyph, 'standalone', box, address, ancestry)
    const op = tree.operator
    if (op === '⿰' || op === '⿱') {
      rules.add(op === '⿰' ? 'left-before-right' : 'top-before-bottom')
      const first = leaf(tree.children[0]), second = leaf(tree.children[1])
      const matching = library.layouts.filter(l => l.operator === op && (l.first === first || l.second === second))
      const ratio = matching.length ? median(matching.map(l => l.ratio)) : .5
      const horizontal = op === '⿰', gap = 6
      const usable = (horizontal ? box.width : box.height) - gap
      if (usable < 12) throw new CannotCompose('insufficient-layout-space')
      const boxes: Box[] = horizontal
        ? [{ ...box, width: usable * ratio }, { ...box, x: box.x + usable * ratio + gap, width: usable * (1 - ratio) }]
        : [{ ...box, height: usable * ratio }, { ...box, y: box.y + usable * ratio + gap, height: usable * (1 - ratio) }]
      return tree.children.flatMap((child, i) => {
        const position: Position = horizontal ? (i ? 'right' : 'left') : (i ? 'bottom' : 'top')
        return 'glyph' in child ? emit(child.glyph, position, boxes[i], address + '.' + i, ancestry)
          : visit(child, boxes[i], address + '.' + i, ancestry)
      })
    }
    if (op === '⿴' && leaf(tree.children[0]) === '囗') {
      if (Math.min(box.width, box.height) * .2 < 6) throw new CannotCompose('insufficient-layout-space')
      rules.add('enclosure-opening-interior-closing')
      const outer = emit('囗', 'enclosure', box, address + '.0', ancestry)
      if (outer.length !== 3) throw new CannotCompose('enclosure-opening-count')
      const innerBox = { x: box.x + box.width * .2, y: box.y + box.height * .2, width: box.width * .6, height: box.height * .6 }
      const inner = visit(tree.children[1], innerBox, address + '.1', ancestry)
      return [...outer.slice(0, 2), ...inner, outer[2]]
    }
    throw new CannotCompose('unsupported-operator:' + op)
  }
  const base = { glyph: target.glyph, expectedStrokes: target.strokes, libraryHash: library.hash, provenance: 'component-derived-unreviewed' as const }
  try {
    const tree = parseIds(definitions.get(target.glyph) ?? '')
    if (!tree || 'glyph' in tree) throw new CannotCompose('missing-compound-definition')
    const pieces = visit(tree, { x: 10, y: 10, width: 80, height: 80 }, 'root', [target.glyph])
    if (pieces.length !== target.strokes) throw new CannotCompose('target-stroke-count:' + pieces.length + '/' + target.strokes)
    const schedule = pieces.map(({ instance, componentStroke }) => ({ instance, componentStroke }))
    if (new Set(schedule.map(s => s.instance + ':' + s.componentStroke)).size !== pieces.length) throw new Error('Duplicated component stroke in schedule')
    return { ...base, status: 'candidate-unreviewed', paths: pieces.map(p => p.path), placements, schedule, rules: [...rules] }
  } catch (error) {
    if (!(error instanceof CannotCompose)) throw error
    return { ...base, status: 'abstained', reason: error.message, paths: [], placements: [], schedule: [], rules: [...rules] }
  }
}
