import assert from 'node:assert/strict'
import { test } from 'node:test'
import { judgeExample, judgeWord, whyCapital, whyLateVerb, whyMissing, whyStuck } from './headword.ts'

/*
 * 아래 예문은 전부 **실제로 경고가 났던 줄**이다. 2026-09-18부터 열두 회차를
 * 도는 동안 `pnpm check`가 짚었고, 고친 뒤 커밋에 적어 두었다.
 */

test('공백만 다른 자리 — ja 표제어 안이 벌어졌다', () => {
  assert.match(whyMissing('ゆうがたに カーテンを ひく。', 'カーテンをひく', 'ja'), /붙여 쓰세요/)
})

test('zu가 분리동사 안에 끼었다 — de', () => {
  const said = whyMissing('Leichter ist es aufzurunden als zu teilen.', 'aufrunden', 'de')
  assert.match(said, /aufzurunden/)
  assert.match(said, /화법조동사/)
})

test('표제어 사이에 다른 말이 끼었다 — de 어순', () => {
  assert.match(
    whyMissing('Ohne Notiz wird sich alles überschneiden.', 'sich überschneiden', 'de'),
    /사이에 다른 말/,
  )
})

test('꼴이 바뀐 자리 — 네 언어가 같은 뿌리다', () => {
  /* de 형용사 어미 */
  assert.match(whyMissing('Ein routinierter Torwart liest den Schuss früh.', 'routiniert', 'de'), /routinierter/)
  /* de 격변화 — 표제어의 첫 낱말이 바뀐다 */
  assert.match(
    whyMissing('Die Sommer verbrachte man bei der mütterlichen Familie.', 'mütterliche Familie', 'de'),
    /mütterlichen/,
  )
  /* en 동사구의 머리가 활용됐다 */
  assert.match(whyMissing('Clear varnish stops it laddering the stocking.', 'ladder the stocking', 'en'), /laddering/)
  /* es 재귀 수동 */
  assert.match(whyMissing('Nadie discute si se canta el marcador.', 'cantar el marcador', 'es'), /canta/)
  /* fr 여성형 */
  assert.match(whyMissing('Une route sinueuse ralentit les camions.', 'sinueux', 'fr'), /sinueuse/)
})

test('짚을 것이 없으면 아무 말도 안 한다', () => {
  assert.equal(whyMissing('The cat sat on the mat.', 'bicycle', 'en'), '')
  /* 어간이 네 글자를 못 넘으면 닮았다고 하지 않는다 — 우연히 걸리는 자리다 */
  assert.equal(whyMissing('Two cars pass.', 'cat', 'en'), '')
})

test('대문자 — 문장 첫머리와 명사화를 가른다', () => {
  assert.match(whyCapital('Housework fills the morning.', 'housework'), /첫머리/)
  assert.match(whyCapital('Ein wenig Ei reicht zum Garnieren.', 'garnieren'), /zu 부정사/)
})

test('못 뚫는 자리 — 앞에 붙은 아포스트로피', () => {
  assert.match(
    whyStuck("L'étiquette d'entretien est cousue dans la couture.", "étiquette d'entretien"),
    /아포스트로피/,
  )
  assert.equal(whyStuck('Une étiquette d’entretien est cousue.', "étiquette d'entretien"), '')
})

test('짧은 동사가 통째로 앞머리인 자리 — set↔setting', () => {
  assert.match(
    whyMissing('Rain stopped them setting off fireworks.', 'set off fireworks', 'en'),
    /setting/,
  )
})

test('한 낱말만 갈린 자리 — 꼴이 아니라 말이 다르다', () => {
  assert.match(
    whyMissing('Er wollte damit niemanden tief verletzen.', 'jemanden tief verletzen', 'de'),
    /"jemanden"만 예문에 없습니다/,
  )
})

/*
 * `judgeExample`은 `pnpm check`와 `pnpm ex`가 함께 쓰는 잣대다. 세 갈래를
 * 가르는 자리라, 갈래마다 **실제로 걸렸던 줄**을 하나씩 박아 둔다.
 */

test('멀쩡한 예문은 걸리지 않는다', () => {
  assert.equal(judgeExample('The officials arrive an hour early.', 'officials', 'en'), null)
})

test('문장 첫머리 대문자는 capital이다 — 회차마다 나오는 자리', () => {
  const snag = judgeExample('Employment rose after the mill opened.', 'employment', 'en')
  assert.equal(snag?.kind, 'capital')
  assert.match(snag?.said ?? '', /첫머리/)
})

test('프랑스어 축약은 stuck이다 — 들어는 있고 못 뚫는다', () => {
  const snag = judgeExample("Le graphique montre l'écart.", 'écart', 'fr')
  assert.equal(snag?.kind, 'stuck')
  assert.match(snag?.said ?? '', /아포스트로피/)
})

test('꼴이 바뀐 자리는 missing이다', () => {
  assert.equal(judgeExample('Frost stops them excavating.', 'excavate', 'en')?.kind, 'missing')
})

test('예문 둘 중 하나만 뚫리면 못 뚫은 자리는 접는다', () => {
  const texts = ['Une heure de la marée décale.', "Le pêcheur lit l'heure de la marée."]
  assert.deepEqual(judgeWord(texts, 'heure de la marée', 'fr'), [])
})

test('둘 다 막히면 뒤엣것 하나만 낸다 — check가 오래 그렇게 해 왔다', () => {
  const texts = ["Il lit l'écart.", "Le graphique montre l'écart."]
  const snags = judgeWord(texts, 'écart', 'fr')
  assert.equal(snags.length, 1)
  assert.equal(snags[0].at, 1)
})

test('없는 자리는 뚫린 예문이 있어도 그대로 짚는다', () => {
  const texts = ['Frost stops them excavating.', 'They excavate the trench by hand.']
  const snags = judgeWord(texts, 'excavate', 'en')
  assert.equal(snags.length, 1)
  assert.equal(snags[0].kind, 'missing')
})

/*
 * 독일어 동사 괄호. 아래는 전부 `content/`에 실제로 들어 있던 줄이다 —
 * 걸려야 하는 것과 걸리면 안 되는 것을 나란히 둔다.
 */

test('동사구가 문장 끝에 안 오면 걸린다 — 정형 동사가 아예 없는 자리', () => {
  const said = whyLateVerb('Sie instand halten die Pumpe monatlich.', 'instand halten', 'de', '동사')
  assert.match(said, /둘째 자리/)
  assert.match(said, /"die"/)
})

test('조동사를 세우고 끝으로 보내면 안 걸린다', () => {
  assert.equal(whyLateVerb('Sie müssen die Pumpe monatlich instand halten.', 'instand halten', 'de', '동사'), '')
  assert.equal(whyLateVerb('Staub lässt sich schwer instand halten.', 'instand halten', 'de', '동사'), '')
})

test('종속절은 동사가 끝에 온다 — 뒤의 정형 동사는 흠이 아니다', () => {
  assert.equal(
    whyLateVerb('Mauern fallen wenn man sie auf einmal überrennen kann.', 'sie auf einmal überrennen', 'de', '동사'),
    '',
  )
})

test('뒤에 절이 이어지는 자리도 아니다', () => {
  assert.equal(
    whyLateVerb('Hinter der Scheune soll sich befinden, was Wasser gibt.', 'sich befinden', 'de', '동사'),
    '',
  )
  assert.equal(whyLateVerb('Sie kamen herein, um sich wärmen zu lassen.', 'sich wärmen', 'de', '동사'), '')
})

test('명사로 쓴 자리는 동사구가 아니다 — beim Bomben abwerfen', () => {
  assert.equal(whyLateVerb('Beim Bomben abwerfen trafen sie die Brücke.', 'Bomben abwerfen', 'de', '동사'), '')
})

test('독일어 동사구가 아니면 아예 안 본다', () => {
  assert.equal(whyLateVerb('They set off fireworks at dusk today.', 'set off fireworks', 'en', '동사'), '')
  assert.equal(whyLateVerb('Sie instand halten die Pumpe monatlich.', 'instand halten', 'de', '명사'), '')
  assert.equal(whyLateVerb('Sie wollen aufrunden bei jedem Preis.', 'aufrunden', 'de', '동사'), '')
})

test('표제어가 정형 동사로 끝나면 안 본다 — 왼쪽 괄호다', () => {
  assert.equal(whyLateVerb('Ich glaube, es ist seines.', 'es ist', 'de', '동사'), '')
  /* 부정사와 꼴이 같은 haben·werden은 빼지 않는다 */
  assert.match(whyLateVerb('Sie nicht haben genug Salz.', 'nicht haben', 'de', '동사'), /둘째 자리/)
  assert.match(
    whyLateVerb('Diese Pfanne kann verwendet werden für Salz.', 'verwendet werden', 'de', '동사'),
    /둘째 자리/,
  )
})
