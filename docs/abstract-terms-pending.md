# 예문을 다시 쓰다 나온 틀린 표제어 — 예문으로는 못 고친다 (2026-10-08)

`quality` · `idea` · `number`의 독일어 · 스페인어 · 프랑스어 · 러시아어 예문
15,192줄을 전수로 다시 쓰던 에이전트 여덟이 짚은 표제어 449개다. 예문은 표제어를
글자 그대로 품어야 해서, 표제어가 그 언어에 없는 말이거나 뜻이 틀리면 어떤 문장도
자연스러울 수 없다. **이 개념들의 예문은 손대지 않고 남겼다** — 표제어를 바꾼 뒤
예문을 새로 쓰고 낱말 · 예문 소리를 다시 만든다.

갈래는 넷이다.

1. **한국어 셈말을 옮긴 말 (약 90)** — `*-count` 개념(«fleur comptée» · «Pferdestück» ·
   «лошадь счётом»). 유럽 네 언어에는 셈말이 없다. 표제어를 바꿀 것이 아니라 **그 언어
   단어를 빼는** 편이 맞다.
2. **그 언어에 없는 말** — 대명사 · 감탄 조각(«ello la cosa» · «es das Ding» · «ha rire» ·
   «эй же»), 만들어 붙인 «X et Y» 짝(«rude et dur» · «áspero y duro» · «суровый и грубый»).
3. **뜻이 틀린 말** — `würzig`(맵다 ✗) · `glücklich`(운 좋은 ✗) · «ferme»(질긴 ✗) ·
   «настоящее»(진짜 ✗, 현재) · `halbe Stunde` · «половина часа»(n시 반 ✗).
4. **표제형이 문장에 그대로 설 수 없는 말** — 쉼표가 빠진 «видно что» · «ниже чем»,
   명사 앞에서만 쓰는 재료 형용사 `hölzern` · `eisern`, 잘린 관용구 «беречь как зеницу».

각 줄의 «제안»은 에이전트의 것이다. 바꾸기 전에 `pnpm define`과 `pnpm dup`으로
다시 본다.


## 처리 (2026-10-08) — 고쳤다

530개를 모두 처리했다.

| 갈래 | 수 | 한 일 |
| --- | --- | --- |
| 글자만 고침 | 49 | «Счёт, пожалуйста» · «видно, что» · «Рождество» — 예문 속 표제어도 같이 |
| 셈말 직역 | 77 | `*-count` 스물하나에서 그 언어 단어를 뺐다(영어 «flower count» 류 21도 함께) |
| 다른 낱말로 | 368 | 에이전트 여덟이 사전 표제어를 고르고 예문 둘을 새로 썼다 |
| 맞는 말이었다 | 15 | 리뷰어가 영어 뜻풀이(anxious · half past)를 보고 짚은 자리 — 예문만 다섯 고쳤다 |
| 그 언어에 없는 말 | 21 | 한국어 조사 · 접사(`held-by-them` ~에게는 · `plural-mark` ~들 · `ordinal-marker` 제~) 아홉, 바꾼 말이 다른 개념과 뜻까지 같은 열둘(тоже · обязательный · vorläufig · ondulé …) |

**뜻이 다른 동음이의어는 그대로 두었다** — `bas`(낮은 / 스타킹) · `scharf`(매운 / 날카로운) ·
`рис`(벼 / 밥). 오답 보기는 정답과 같은 글자를 거르므로(`distractorPool`) 퀴즈가 깨지지
않는다. 이런 쌍은 이 일 전에도 88이었다.

**개념 쪽이 어긋난 자리** — 고치지 않고 적어 둔다:
- `held-by-them` — 뜻은 ~에게는(조사), 영어는 by it, 그림은 외투 주머니. 개념이 하나로 안 선다.
- `stale` — 뜻은 눅눅한, 영어와 그림은 굳은 빵.
- `anxious` — 뜻과 그림은 조급한(impatient). 영어 뜻풀이가 틀렸다.
- `half-past` — 뜻은 삼십 분(동안). 영어 뜻풀이가 틀렸다.

## 독일어 (129) — 고쳤다

| 낱말 | 지금 표제어 | 문제 | 제안 |
| --- | --- | --- | --- |
| `idea/a-special-skill` | Spezialkönnen | not an established word | Spezialität / besondere Fähigkeit |
| `idea/and-you` | und du dann | not a German expression; 'Meine ist leer, und du dann.' is ungrammatical | und du? / und bei dir? |
| `idea/anything-whatever` | irgendetwas beliebig | redundant pairing, not German | irgendetwas / egal was |
| `idea/apology` | Abbitte | archaic, used almost only in the fixed phrase 'Abbitte leisten'; not the everyday word for apology | Entschuldigung |
| `idea/belonging-to` | gehörig zu | not current German; examples ('Das Kalb gehörig zu jener Kuh') are ungrammatical | zugehörig / gehörend zu |
| `idea/bond-tie` | Bindeglied | means a connecting link/intermediary piece, not an emotional bond between people (유대); 'Das Bindeglied hielt jahrelang' is unnatural | Bindung / Band |
| `idea/counterpart` | Gegenpart | means an opposite role/part (e.g. in a play or duet); not the usual word for the other party in a deal (상대편) | Gegenseite / Gegenüber |
| `idea/dark-horse` | schwarzes Pferd | English idiom calque; in German it only means a literal black horse | Geheimfavorit / Außenseiter |
| `idea/family-feeling` | Blutsbindung | very rare coinage; the established expression is the plural 'Blutsbande' | Blutsbande |
| `idea/grounds-given` | angeführter Grund | not a lexical unit; the participle forces an ending (keinen angeführten Grund), so both examples are ungrammatical | Begründung / angegebener Grund (as a phrase only) |
| `idea/have-ever` | je einmal | not idiomatic; 'Er ist je einmal auf diesen Baum gestiegen' is ungrammatical | schon einmal / jemals |
| `idea/he-that-one` | er selbst | means 'he himself', not 'he / that one'; examples were ungrammatical and have been rewritten with the emphatic sense | er / jener |
| `idea/held-by-them` | bei dem | German uses the pronominal adverb; examples are ungrammatical | dabei / daneben |
| `idea/hinge-on` | abhängen von | verb + preposition cannot appear verbatim in a natural sentence (both examples end in '... abhängen von.') | abhängen (sentence: 'Alles wird vom Wetter abhängen.') |
| `idea/hold-in-awe` | ehrfürchtig scheuen | not a natural collocation; examples sound invented | Ehrfurcht haben vor / ehrfürchtig verehren |
| `idea/if-it-be` | falls denn | not an established expression; examples are ungrammatical/awkward and ko does not match | falls / sofern |
| `idea/in-that-while` | in jener Zeit | means 'in those days', not 'in the meantime' (그 사이에) | in der Zwischenzeit / inzwischen |
| `idea/inspection-test` | Laborprobe | Laborprobe means a lab sample (specimen), not the act of inspection/testing; sentences like 'Die Laborprobe dauert zwei Minuten' cannot work | Untersuchung (or Test / Prüfung) |
| `idea/it-takes-doing` | es braucht das | not German; examples are ungrammatical | dazu braucht es … / das erfordert |
| `idea/it-the-thing` | es das Ding | pronoun + noun juxtaposed is not German; examples are ungrammatical | es / das Ding |
| `idea/know-when-enough` | Genügsamkeit kennen | not an idiomatic collocation; examples are unnatural | genügsam sein / maßhalten |
| `idea/look-straight-at` | gerade ansehen | 'gerade' reads as 'just now'; examples are ungrammatical | direkt ansehen / in die Augen sehen |
| `idea/lying-within` | im Inneren liegend | participle phrase, not a lexical unit; 'war im Inneren liegend' is ungrammatical | innewohnend / inner |
| `idea/mm-yes` | mhm ja | not a lexical item; 'mhm' alone is the interjection | mhm |
| `idea/not-a-thing` | nicht eine Sache | English calque; 'sagten sie nicht eine Sache' is not German | nichts / gar nichts |
| `idea/out-of-it` | aus dem | German uses the pronominal adverb; 'Rauch kam aus dem.' is ungrammatical | daraus |
| `idea/plural-mark` | Mehrzahlzeichen | describes the Korean particle -들; German has no such marker, so the examples are fragments | Pluralendung (or drop the concept for German) |
| `idea/run-right-through` | durchgehend verlaufen | means 'run continuously / without a break', not 'pierce right through' (관통); also not a lexical unit, only a free adverb+verb pair | durchqueren / hindurchführen (or durchziehen) |
| `idea/savouring` | Würdigung | means appreciation in the sense of acknowledgement/tribute (a speech honouring someone), not savouring/enjoying (감상) | Genuss / Genießen |
| `idea/something-or-other` | irgendetwas da | not a lexical unit; examples are unnatural | irgendetwas / irgendwas |
| `idea/spirit-vigour` | Geisteskraft | means intellectual/mental power, not morale or fighting spirit (정신, 기백) | Kampfgeist / Tatkraft |
| `idea/structure` | Tragwerk | Tragwerk는 건축 공학의 '하중을 받치는 골조'라는 전문어. 일반적인 '구조'는 Struktur | Struktur |
| `idea/the-very-last` | das Allerletzte | colloquially means 'the absolute worst/the pits'; 'das Allerletzte des Buches' is wrong | das Letzte / der (die, das) allerletzte + noun |
| `idea/they-the-things` | sie die Dinge | pronoun + noun juxtaposed is not German; examples are ungrammatical | sie / die Sachen |
| `idea/together-with-it` | mitsamt dem | preposition needs a following noun; 'Das Dach ging mitsamt dem.' is ungrammatical | mitsamt (+ noun) / samt |
| `idea/trials-gone-through` | durchgestandene Prüfungen | free participle phrase, not lexical; examples are unnatural | Prüfungen / Schicksalsschläge |
| `idea/up-on-it` | auf dem | German uses the pronominal adverb; 'Stell die Lampe auf dem.' is ungrammatical | darauf |
| `idea/well-put-together` | stimmig gefügt | not a lexical unit; attributive use forces endings so both examples are ungrammatical | stimmig / gut gefügt |
| `idea/what-it-does` | Aufgabe davon | not a lexical unit; 'seine Aufgabe davon' is ungrammatical | Aufgabe / Funktion |
| `idea/what-it-teaches` | was es lehrt | not a lexical unit; examples ('Der gefallene Baum zeigt, was es lehrt.') are nonsense | Lehre |
| `idea/where-it-rests` | wo es bleibt | not a lexical unit; examples are nonsense | Verbleib / wo es endet |
| `idea/win-back-face` | sich bewähren | means 'prove oneself', not 'regain face' (체면을 세우다); 1031 rewritten with the 'prove oneself' sense | das Gesicht wahren |
| `idea/you-singular` | du selbst | means 'you yourself' (emphatic), not plain 'you'; examples were ungrammatical and have been rewritten with the emphatic sense | du |
| `number/article-count` | Schriftstück | real word but means 'a document', not a counter for written pieces (편) | (none; 'ein Artikel / ein Text') |
| `number/building-count` | Gebäudeteil | means 'part of a building', not a counter for buildings (동) | (none; 'ein Gebäude') |
| `number/bulk` | großer Menge | inflected fragment (dative), not a dictionary form; sentences work only inside 'in großer Menge' | in großer Menge / in großen Mengen |
| `number/drop-range` | Rückgangsspanne | not an established word | Rückgang / Kursrückgang |
| `number/flat-piece-count` | Stück flach gezählt | not German at all; examples are nonsense | (none) — drop for German |
| `number/flat-plane` | flache Fläche | pleonasm; not the mathematical term | Ebene |
| `number/flower-count` | Blütenstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'eine Blume') |
| `number/guest-count` | Personenstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'eine Person') |
| `number/half-past` | halbe Stunde | means 'half an hour' (duration), not 'half past' on the clock; examples use the duration sense | halb (e.g. 'halb drei') |
| `number/horse-count` | Pferdestück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Pferd') |
| `number/lamp-count` | Lampenstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'eine Lampe') |
| `number/leave-a-remainder` | einen Rest lassen | not the idiomatic phrasing; 'Elf durch drei wird einen Rest lassen' is unnatural | einen Rest ergeben / Rest bleiben |
| `number/meal-count` | Mahlzeitstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'eine Mahlzeit') |
| `number/number-of-times` | Anzahl der Male | stilted, not idiomatic | wie oft / Häufigkeit |
| `number/ordinal-marker` | Ordnungszeichen | describes the Korean prefix 제~; no such German sign, examples are nonsense | (none; German ordinals use a period: '3.') |
| `number/round-count` | Gangstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'eine Runde / ein Gang') |
| `number/session-count` | Ausgabenstück | Korean counter-word calque; not a German word, examples are nonsense ('Ausgaben' = expenses/issues) | (none; 'eine Folge / eine Runde') |
| `number/set-count` | Garniturstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'eine Garnitur / ein Satz') |
| `number/share-count` | Anteilsstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Anteil') |
| `number/sheet-count` | Blattstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Blatt') |
| `number/ship-count` | Schiffseinheit | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Schiff') |
| `number/showing-count` | Aufführungsstück | Korean counter-word calque; not a German word, examples are nonsense (reads as 'a stage play') | (none; 'eine Aufführung / Vorstellung') |
| `number/stick-count` | Stiftstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Stift') |
| `number/strand-count` | Strangstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Strang') |
| `number/tree-count` | Baumstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Baum') — drop for German |
| `number/vehicle-count` | Fahrzeugstück | Korean counter-word calque; not a German word, examples are nonsense; 'drei Fahrzeugstück' is ungrammatical | (none; German counts directly: 'drei Autos') — drop for German |
| `number/volume-count` | Bandstück | Korean counter-word calque; not a German word, examples are nonsense | (none; 'ein Band') |
| `number/weight-set` | Gewichtsatz | misspelled: the compound takes a linking s | Gewichtssatz |
| `quality/a-certain-few` | gewisse wenige | 독일어에서 쓰지 않는 조합. 원어민은 einige wenige | einige wenige |
| `quality/a-good-current` | gute Strömung | 한국어 '좋은 기운'을 옮긴 말로 독일어에서 그런 뜻이 없다(Strömung = 물살·사조). 두 예문 모두 뜻이 안 통함 | gute Stimmung / gute Atmosphäre |
| `quality/adhesive` | klebend | klebend는 서술어로 쓰지 않는다(Der Streifen ist klebend ×). 원어민은 klebt / selbstklebend | selbstklebend |
| `quality/anxious` | ungeduldig werden | ungeduldig werden은 '조급해지다'이지 '불안한(anxious)'이 아니다 | ängstlich / besorgt (scared·worried와 겹치면 concept 재검토) |
| `quality/bother` | Umstand | 단수 Umstand는 '사정·상황'. '번거로움'은 복수 Umstände(machen)로만 쓴다. 두 예문 모두 어색함 | Umstände (sich Umstände machen) |
| `quality/brisk-and-open` | frisch und unumwunden | 원어민이 쓰지 않는 조합(frisch는 성격에 안 맞음). 1번 예문은 어순도 틀림 | offen und direkt |
| `quality/businesslike` | geschäftlich | geschäftlich는 '업무상의·사업차'이지 '사무적인(businesslike)'이 아니다. 'Der Ton ist geschäftlich'는 뜻이 안 맞음 | sachlich / geschäftsmäßig |
| `quality/dietary` | diätetisch | 전문·의학 용어라 일상에서 거의 안 쓰고, 'Die Kost ist diätetisch'도 어색. ko '저칼로리'와도 뜻이 다르다 | Diät- / Ernährungs- (명사 합성) |
| `quality/firm-beyond-doubt` | unbedingt fest | 관용 표현이 아니다. 두 예문 모두 어미가 빠졌고(Ein unbedingt fest Recht) 뜻도 통하지 않음 | felsenfest / unumstößlich |
| `quality/fit-exactly` | übereinstimmen | übereinstimmen은 수치·의견이 '일치하다'이지 물건이 '꼭 들어맞다'가 아니다. 분리동사라 본동사 자리에선 'stimmen … überein'이 되어 표제어가 깨진다 | passen / genau passen |
| `quality/fortunate` | glückhaft | glückhaft는 거의 쓰지 않는 문어·고어. 두 예문(…war in jener Nacht glückhaft / Wenn ein Jahr glückhaft ist…)도 부자연스럽다 | Glück haben / glücklich (lucky와 겹치면 concept 재검토) |
| `quality/ha-laugh` | ha lachen | 독일어 표현이 아니다(Der ganze Raum machte ha lachen). 웃음소리는 haha | haha / lachen |
| `quality/habitual` | gewohnt | gewohnt는 '익숙한·늘 하던'이고 '습관적인'은 아니다. 'Der Fehler war gewohnt'는 틀림 | gewohnheitsmäßig |
| `quality/haughty-and-distant` | hochmütig und fern | fern은 사람의 태도에 쓰지 않는다(거리를 두는 = distanziert). 1번 예문은 쉼표·어순도 틀림 | hochmütig und distanziert |
| `quality/heart-full-of` | voller Herz | 문법적으로 틀린 말(Herz voller …가 맞다). 두 예문 모두 뜻이 통하지 않는다 | das Herz voller … / von Herzen |
| `quality/hey-there` | he du | 감탄사라 문장 안에서는 따옴표 속 대문자 'He du!'가 된다. 두 예문(Er rief he du über den Hof)은 표기가 틀림 | He! / Hallo! |
| `quality/high-rise` | hochragend | hochragend는 드문 문어(우뚝 솟은)이고 서술어로 안 쓴다. '고층'은 명사 Hochhaus | Hochhaus |
| `quality/higher-level` | höher | höher는 단순 비교급 '더 높은'이고 '상급의·고등(higher-level)'이 아니다. 원래 예문(höher gestellte Prüfung / höher angesiedelte Werkstatt)은 뜻이 안 맞아 비교급으로 고쳤다 | Ober- / gehoben (Oberstufe) |
| `quality/higher-than` | oberhalb von | oberhalb von은 공간적 '위쪽에'이지 수량 '…보다 높은'이 아니다. 두 예문(…oberhalb von allen früheren/der Schätzung)은 틀림 | über / höher als |
| `quality/household` | häuslich | häuslich는 '가정적인·집 안의'(사람 성향)이지 '가정용(household)'이 아니다. 'Das Gerät ist häuslich'는 틀림 | Haushalts- (Haushaltsgerät) |
| `quality/intensify` | erstarken | erstarken은 경제·정당·운동이 '힘을 얻다'에만 쓴다. 바람·서리가 '세지다'(원래 예문)는 sich verstärken / stärker werden. 예문은 경제·운동 주어로 고쳤다 | sich verstärken / zunehmen |
| `quality/intercity` | überregional | überregional은 '지역을 넘어서는(전국적)'이지 '도시 간'이 아니다. 'Der Verkehr ist überregional'도 어색 | Fern- (Fernbus, Fernverkehr) / zwischen den Städten |
| `quality/just-right-measure` | genau im Maß | 독일어 관용구가 아니다. 두 예문(Die Hitze war genau im Maß / …schnitt den Balken genau im Maß)도 어색함 | genau richtig / nach Maß |
| `quality/large-sized` | groß gewachsen | groß gewachsen은 '키가 큰(사람·나무)'이지 '대형의·큼직한'이 아니다. 0번 예문(어획이 groß gewachsen)은 뜻이 안 맞아 사람으로 고쳤다 | großformatig / groß (big과 겹침) |
| `quality/leather` | ledern | 서술적 ledern은 '질긴·지루한'으로 읽힘. 재료는 수식어로만(Der Riemen ist ledern ×) | aus Leder |
| `quality/loud-sound` | lautstark | lautstark는 사람의 항의·응원 같은 '떠들썩한' 소리에 쓴다. 엔진·기계 소리에는 laut. 예문은 사람 주어로 고쳤다 | laut (단, noisy와 겹침) |
| `quality/lower-than` | unterhalb von | unterhalb von은 공간적 '아래쪽에'이지 수량 '…보다 낮은'이 아니다. 두 예문(…unterhalb von der letzten/der alten Marke)은 격도 어색함 | unter / niedriger als |
| `quality/lucky` | glücklich | 서술적 glücklich는 '행복한'이지 '운이 좋은'이 아니다. 두 예문 모두 happy로 읽힘 | Glück haben (Wir hatten Glück mit dem Wetter.) |
| `quality/made-of-iron` | eisern | 문자 그대로의 '쇠로 된'은 수식어로만 쓰고, 서술적 eisern은 '굳센·완고한'으로 읽힘(Das Gartentor ist eisern ×) | aus Eisen |
| `quality/made-of-stone` | steinern | 서술적 steinern은 '돌처럼 굳은(표정)'으로 읽힘. 재료는 수식어로만(Die Brücke ist steinern ×) | aus Stein |
| `quality/many-talented` | vielbegabt | 드물게 쓰는 말. 원어민은 vielseitig begabt | vielseitig begabt |
| `quality/medium-grade` | mittlere Güte | 문장 안에서는 속격 'mittlerer Güte'가 되어야 해서 표제어가 그대로 남을 수 없다(두 예문 모두 'Mehl mittlere Güte'처럼 틀림) | mittlerer Güte |
| `quality/nearby` | nahe gelegen | nahe gelegen(nahegelegen)은 수식어로만 자연스럽다. 서술적 'ist nahe gelegen'은 원어민이 쓰지 않아 두 예문 모두 부자연스럽다(571: '…war nahe gelegen und versiegte nie', 572: 'Wenn der Laden nahe gelegen ist…') | in der Nähe |
| `quality/of-cultivated-manners` | gebildet im Umgang | 관용 표현이 아니다(gebildet = 학식 있는). 1번 예문(Sie sprachen gebildet im Umgang)은 뜻이 안 통함 | kultiviert / gute Umgangsformen haben |
| `quality/opposite-side` | Gegenseite | 일상어 Gegenseite는 주로 '상대편(소송·협상)'. 길 '맞은편'은 die andere Straßenseite / gegenüber | gegenüber / die andere Seite |
| `quality/ought-by-rights` | gebühren | gebühren은 '(존경·몫이) 누구에게 마땅히 돌아가다'(Ihm gebührt Dank)이지 '…해야 마땅하다'가 아니다. 두 예문(es wird gebühren, zuerst zu zahlen)은 뜻이 틀림 | sollte eigentlich / von Rechts wegen |
| `quality/pleasing-to-have` | angenehm zu haben | 독일어 표현이 아니다. 두 예문(Ein angenehm zu haben Zimmer…)은 문법도 틀림 | angenehm / gemütlich |
| `quality/preliminary` | vorbereitend | vorbereitend는 '준비하는'이지 '예비의·잠정적(preliminary)'이 아니다. 두 예문 모두 뜻이 어긋남 | vorläufig (temporary와 겹침) / Vor- (Vorrunde, Vorgespräch) |
| `quality/professional` | beruflich | beruflich는 '직업상의·업무의'이지 '전문가급(professional)'이 아니다. 'Die Kamera ist beruflich'는 틀림 | professionell |
| `quality/residential` | bewohnt | bewohnt는 '사람이 사는(inhabited)'이지 '주거용(residential)'이 아니다 | Wohn- (Wohngebiet) / zum Wohnen |
| `quality/satisfying` | befreiend | befreiend는 '후련한·해방감을 주는'이지 '만족스러운'이 아니다. 1번 예문(Ein befreiend klarer Sieg folgte)도 부자연스럽다 | befriedigend |
| `quality/seem-to-be` | scheint zu sein | 보통 'scheint … zu sein'으로 사이에 말이 들어가 표제어가 붙어 나오지 않는다. 두 예문(…scheint zu sein dünner…)은 어순이 틀렸다 | scheinen / anscheinend |
| `quality/settle-for` | sich begnügen mit | 보통 어순은 'sich mit etw. begnügen'이라 표제어가 붙어 나오려면 'mit dem, was …'처럼 뒤로 뺄 때뿐. 원래 예문(…sich begnügen mit dem kurzen Seil)은 어순이 틀렸다 | sich begnügen (mit은 빼기) |
| `quality/short-height` | kleinwüchsig | kleinwüchsig는 식물 품종·견종이나 의학적 왜소증에 쓰는 말이라 사람에게는 조심스럽고, 울타리·의자(원래 예문)에는 못 쓴다 | klein |
| `quality/single-berth` | einzeln | einzeln은 '하나씩·따로'이지 '1인용'이 아니다. 'Die Kabine ist einzeln'은 틀림 | Einzelkabine / Einzel- (명사 합성) |
| `quality/someone-elses` | fremd | 서술적 fremd는 '낯선'이지 '남의 것인'이 아니다(Der Schirm war fremd ×). '남의 것'은 fremdes Eigentum처럼 수식어로만 | gehört jemand anderem / fremdes Eigentum |
| `quality/spicy` | würzig | würzig = 양념·향이 진한(savory), 매운맛(scharf)이 아니다. ko '맵다'와 어긋남 | scharf (sharp와 겹치면 ko를 '양념이 진하다'로) |
| `quality/steel` | stählern | 서술적 stählern은 '강철 같은(근육·의지)'으로 읽힘. 재료는 수식어로만(Das Tor bleibt stählern ×) | aus Stahl |
| `quality/subtle` | fein abgestuft | fein abgestuft는 '잘게 단계를 나눈'이지 '미묘한(subtle)'이 아니다. 1번 예문(Nur fein abgestuft trennen sie sich)은 뜻이 안 통한다 | subtil / fein |
| `quality/super-grade` | super | 구어 super는 '끝내주는'이지 '특급·최상급'이라는 등급이 아니다. 원래 예문(super ausgesuchten Tee / Ein super Posten)은 부자연스러워 구어 뜻으로 고쳤다 | erstklassig / Spitzen- (Spitzenqualität) |
| `quality/sway-in-waves` | kräuseln | kräuseln은 '잔물결이 일다·곱슬해지다'이지 천·풀이 '일렁이다'가 아니다. 예문은 물·머리카락으로 고쳤다 | wogen / sich wiegen |
| `quality/tall-straight` | hochaufragend | 드문 문어이고 서술어로 쓰지 않는다. 두 예문(…wächst hochaufragend / Ein hochaufragend Mast) 모두 부자연스럽거나 어미가 빠짐 | hoch und gerade / schlank |
| `quality/type-kind` | Typologie | Typologie는 '유형론(학문적 분류 체계)'이지 '종류·유형' 하나가 아니다. 'Diese Typologie verkauft sich am besten'은 틀림 | Typ / Art / Sorte |
| `quality/unmoved-either-way` | völlig gleichgültig dabei | dabei가 붙은 꼴은 독일어 표현이 아니다. 1번 예문(…lassen Alte völlig gleichgültig dabei)은 틀리고, 두 ko(마을은 그러했다 / 묵은 이는 그러하다)는 뜻이 비어 있다 | völlig gleichgültig |
| `quality/unpleasant-to-hear` | misstönend | 거의 쓰지 않는 문어. 원어민은 schrill / unangenehm laut / klingt schief | schrill |
| `quality/vermilion` | Zinnoberrot | 형용사는 소문자 zinnoberrot. 대문자는 색 이름(명사)이라 'in Zinnoberrot'로만 쓸 수 있어 예문을 그렇게 고쳤다 | zinnoberrot (다른 색 형용사처럼) |
| `quality/virtual` | gedacht | gedacht는 '생각된·상상의'이고 '가상(virtual)'이 아니다. 'eine gedachte Linie'처럼 수식어로만 써서 맨 형태가 남지 않고, 두 예문(gedacht entworfenes Modell / gedacht gezogene Linie)은 틀림 | virtuell |
| `quality/wooden` | hölzern | 문자 그대로의 '나무로 된'은 거의 수식어로만 쓰고, 서술적 hölzern은 '어색한·뻣뻣한'으로 읽힘 | aus Holz |

## 스페인어 (106) — 고쳤다

| 낱말 | 지금 표제어 | 문제 | 제안 |
| --- | --- | --- | --- |
| `idea/as-well` | también así | not idiomatic; sentences read as broken | también |
| `idea/be-self-aware` | darse cuenta por sí | truncated; the expression is «darse cuenta por sí mismo» | darse cuenta por sí mismo |
| `idea/below-the-mind` | lo que está bajo la mente | not Spanish; calque | el subconsciente / el inconsciente |
| `idea/category-sort` | clase de pieza | not a fixed expression for category/sort; «su clase de pieza» is meaningless | clase / tipo / categoría |
| `idea/choice-option` | opción de elección | redundant calque; natives just say «opción» | opción / alternativa |
| `idea/compromise` | compromiso mutuo | compromiso in Spanish mainly means commitment/engagement; compromiso mutuo reads as mutual commitment, not compromise | término medio / concesión mutua / acuerdo intermedio |
| `idea/family-feeling` | cariño de sangre | not an existing Spanish expression (calque of 혈육의 정) | lazos de sangre / cariño familiar |
| `idea/get-along-with` | llevarse con | incomplete: «llevarse con» alone does not mean get along; needs «bien/mal» | llevarse bien con |
| `idea/hang-upon-it` | pender de ello | archaic/odd; ko and sentences do not fit | depender de ello |
| `idea/held-by-them` | junto a ello | «ello» cannot refer to a concrete object | junto a eso / al lado |
| `idea/hold-sway-over` | regir sobre | «regir» is transitive; «regir sobre» is unidiomatic, and «Un sello no debe regir sobre un pueblo» is meaningless | dominar / regir |
| `idea/inside-of-it` | dentro de ello | «ello» cannot refer to a concrete object | dentro / dentro de eso |
| `idea/it-the-thing` | ello la cosa | not Spanish (two pronoun/noun forms glued together); sentences ungrammatical | ello / eso / la cosa |
| `idea/lying-within` | que reside dentro | relative-clause fragment, not a term; sentences («Su valor era que reside dentro») ungrammatical | interior / que lleva dentro |
| `idea/morale` | moral de tropa | without article it is not idiomatic («subió la moral de tropa»); natives say «la moral de la tropa» or just «la moral» | moral / moral de la tropa |
| `idea/no-wonder-then` | con razón entonces | the idiom is «con razón»; «entonces» glued on is unnatural | con razón / no me extraña |
| `idea/none-other-than` | nada menos que eso | the idiom is «nada menos que» + noun; with «eso» the sentences («era nada menos que eso») mean nothing | nada menos que |
| `idea/oh-there` | ay así | not a Spanish interjection; sentences ungrammatical | ¡ah, ya! / ¡ah, así! |
| `idea/out-of-it` | de dentro de ello | «ello» cannot refer to a concrete object in Spanish; ungrammatical | de dentro / de ahí dentro |
| `idea/physical-effect` | acción física | not an idiomatic term for a physical effect; sentences («El calor ejerce acción física») cannot be natural | efecto físico |
| `idea/savouring` | apreciación | means appreciation/assessment, not savouring/enjoying; «Pasa las noches en apreciación» is meaningless | disfrute / deleite (o «saborear») |
| `idea/sense-by-body` | percibir por el cuerpo | not idiomatic; natives say «sentir en el cuerpo / en la piel» | sentir en el cuerpo |
| `idea/shall-we` | vale así | not Spanish for «shall we»; sentences («empecemos vale así») are ungrammatical | ¿vamos? / ¿te parece? / ¿vale? |
| `idea/that-much-so` | tan así | colloquial/regional and ungrammatical before «que» («se llenó tan así que») | tanto / tan |
| `idea/they-the-things` | ellas las cosas | not Spanish; sentences ungrammatical | ellas / esas cosas |
| `idea/together-with-it` | junto con ello | «ello» for concrete objects is ungrammatical («El tejado se fue junto con ello») | junto con eso / con él |
| `idea/trials-gone-through` | pruebas pasadas | not a set expression (reads as «past tests») | pruebas superadas / penalidades vividas |
| `idea/truly-so` | de veras así | not a set expression; reads as two words glued | de veras / realmente |
| `idea/up-on-it` | encima de ello | «ello» cannot refer to a concrete object; natives say «encima» | encima / encima de eso |
| `idea/urge-earnestly` | encarecer | primarily means «to raise the price»; the «urge» sense is archaic, and «solía encarecer antes de cada viaje» is meaningless | insistir / rogar encarecidamente / recomendar encarecidamente |
| `idea/worry-trouble` | quebradero | not used alone; the expression is «quebradero de cabeza» | quebradero de cabeza / preocupación |
| `idea/would-rather` | preferir antes | not a set expression; «preferir» already means would rather, «antes» is redundant | preferir / antes ... que |
| `number/angle-finder` | buscador de ángulos | literal calque of «angle finder»; not the usual Spanish name of the tool | medidor de ángulos / goniómetro |
| `number/article-count` | pieza escrita | calque of a Korean counter (편); not a Spanish expression | artículo / texto |
| `number/bottom-line` | línea mínima | not idiomatic for «bottom line / minimum acceptable limit» | línea roja / límite mínimo |
| `number/divide-exactly` | dividir exacto | adverb error («exacto» for «exactamente»); natives say «ser divisible» or «dar exacto» | dividir exactamente / ser divisible entre |
| `number/flat-piece-count` | unidad plana | calque of Korean counter (낱/장); not Spanish | pieza / unidad |
| `number/flat-plane` | plano llano | redundant; not a set expression | plano / superficie plana |
| `number/flower-count` | flor contada | calque of Korean counter (송이); not Spanish | flor |
| `number/guest-count` | persona contada | calque of Korean counter (분); sentences ungrammatical | persona / invitado |
| `number/horse-count` | cabeza de caballo | means literally a horse's head; Spanish counts «cabezas de ganado», not «cabeza de caballo» | caballo |
| `number/item-count` | pieza contada | calque of Korean counter (개); not Spanish | pieza |
| `number/lamp-count` | lámpara contada | calque of Korean counter (잔); not Spanish | lámpara |
| `number/meal-count` | comida contada | calque of Korean counter (끼); not Spanish | comida |
| `number/round-count` | asalto contado | calque of Korean counter (판/번); not Spanish | asalto |
| `number/session-count` | edición contada | calque of Korean counter (회); not Spanish | edición / sesión |
| `number/set-count` | juego contado | calque of Korean counter (조); not Spanish | juego |
| `number/sheet-count` | hoja contada | calque of Korean counter (장); not Spanish | hoja |
| `number/ship-count` | casco de barco | «casco» is the hull; not a counter for ships | barco (no counter needed) |
| `number/stick-count` | pieza de pincel | calque of Korean counter (자루); not Spanish | pincel |
| `number/strand-count` | tira contada | calque of Korean counter (가닥); sentences («una tira contada de tres») ungrammatical | hebra / tira |
| `number/tree-count` | pie de árbol | calque of a Korean counter (그루); «Plantaron un pie de árbol» is unnatural | árbol (no counter needed) |
| `number/volume-count` | tomo contado | calque of Korean counter (권); not Spanish | tomo |
| `quality/a-certain-few` | unos ciertos | ungrammatical in modern Spanish (article + 'ciertos'); first sentence also breaks agreement | algunos / ciertos |
| `quality/a-good-current` | corriente buena | not idiomatic for 'good vibes' | buen ambiente / buena energía |
| `quality/a-plain-fool` | bobo de remate | the set phrase is 'tonto de remate' | tonto de remate |
| `quality/a-real-headache` | de quebradero de cabeza | ungrammatical; the expression is 'un quebradero de cabeza' (noun phrase) | un quebradero de cabeza |
| `quality/ache-for-someone` | dolerse por | dolerse = complain/grieve; not the usual way to say 'feel sorry for someone' | compadecerse de / sentir lástima por |
| `quality/all-of-it` | todo el lote | 'el lote' = batch/lot; 'all of it' is simply 'todo' / 'todo entero' | todo / entero |
| `quality/anxious` | impacientarse | verb meaning 'to get impatient', not the adjective 'anxious' | ansioso / inquieto |
| `quality/beyond-all-comparison` | sin comparación posible | ad-hoc phrase; both sentences ('fue sin comparación posible') are ungrammatical | incomparable / sin comparación |
| `quality/bright-and-handsome` | luminoso y vistoso | ad-hoc pair; both sentences break gender agreement ('la sala ... luminoso y vistoso') | vistoso / luminoso (one word) |
| `quality/brisk-and-open` | llano y resuelto | ad-hoc adjective pair, not a lexical unit | campechano / franco |
| `quality/burning-with-feeling` | de pasión ardiente | ad-hoc; 'Cantaron de pasión ardiente' is ungrammatical | apasionado |
| `quality/businesslike` | de negocios | 'de negocios' = business-related (cena de negocios), not 'businesslike' (a manner); 'El tono es de negocios' is not idiomatic | profesional / formal (if the concept is the manner), else relabel concept as 'business' |
| `quality/clear-and-telling` | nítido y expresivo | ad-hoc adjective pair; both sentences break gender agreement | expresivo / elocuente |
| `quality/clumsy-and-poor` | torpe y pobre | ad-hoc adjective pair; 'pobre' does not mean poorly made | chapucero / mal hecho |
| `quality/cold-right-through` | frío hasta la médula | 'hasta la médula' is physical cold (or 'to the core' with a noun); as an invariable adjective it breaks agreement ('una norma frío...') | despiadado / frío como el hielo |
| `quality/daily` | cotidiano | cotidiano = everyday/ordinary (vida cotidiana); 'daily' as in once a day is 'diario' (un informe diario) | diario |
| `quality/deadly` | mortal de veras | ad-hoc phrase; the adjective is just 'mortal' | mortal |
| `quality/empty-echoing` | vacío y silencioso | ad-hoc adjective pair, not a lexical unit | desierto / vacío |
| `quality/fierce-and-hard` | feroz y duro | ad-hoc adjective pair, not a lexical unit | feroz / violento |
| `quality/fortunate` | venturoso | literary/archaic; learners almost never meet it (afortunado is the everyday word) | afortunado (if not clashing with 'lucky') or keep venturoso marked as literary |
| `quality/ha-laugh` | ja risa | not a real expression ('risa' is the noun 'laugh'); the interjection is 'ja, ja' | ja, ja |
| `quality/haggling-over-crumbs` | regatear por migajas | ad-hoc calque, not a set expression | discutir por tonterías / mirar el céntimo |
| `quality/haughty-and-distant` | altivo y distante | ad-hoc adjective pair, not a lexical unit | altivo / altanero |
| `quality/heart-full-of` | con el pecho lleno | not idiomatic; second sentence uses it for a grain measure (nonsense) | con el corazón lleno de |
| `quality/hey-there` | eh oye | not a real expression; Spanish uses either '¡eh!' or '¡oye!' | oye |
| `quality/if-it-happens` | si por caso | archaic/rare; modern Spanish uses 'por si acaso' or 'si acaso' | si acaso / en caso de que |
| `quality/in-a-slump` | en baja continua | not an idiomatic expression | en declive / en crisis / de capa caída |
| `quality/in-every-way` | de todas formas | 'de todas formas' = 'anyway', not 'in every possible way'; both sentences use the wrong sense | de todas las maneras posibles / por todos los medios |
| `quality/instead` | en vez | never used alone; the expression is 'en vez de' (+ noun/infinitive), so the blanked chunk is a fragment | en vez de (or 'en cambio' for the standalone adverb) |
| `quality/many-sided` | de muchas ramas | not an idiomatic Spanish expression | polifacético / multifacético |
| `quality/many-talented` | de muchas artes | not an idiomatic Spanish expression | polifacético / habilidoso |
| `quality/more-of-it` | más de ello | stilted; natives say 'más' / 'un poco más' | más |
| `quality/nasty-harsh` | áspero y duro | ad-hoc pair of adjectives, not a lexical unit; no natural sentence needs exactly this phrase | duro / riguroso (tiempo riguroso) |
| `quality/neck-and-neck` | parejos del todo | ad-hoc; the idiom is 'muy parejos' or 'codo con codo' / 'cabeza a cabeza' | cabeza a cabeza |
| `quality/not-necessarily-so` | no forzosamente cierto | ad-hoc phrase; sentences built on it are ungrammatical ('es no forzosamente cierto mal') | no necesariamente |
| `quality/of-actual-practice` | de uso real | ad-hoc phrase; 'Un asunto de uso real lo decidió' is nonsense | práctico |
| `quality/ought-by-rights` | deber por derecho | not a Spanish expression; sentences ('ha de deber por derecho pagar') are ungrammatical | corresponder (le corresponde pagar) / tener derecho a |
| `quality/paid` | pagado | for 'paid (requires payment)' Spanish uses 'de pago' (aparcamiento de pago); 'pagado' = already paid / remunerated | de pago |
| `quality/pleasing-to-have` | grato de tener | not idiomatic | agradable / grato |
| `quality/rare-precious` | raro y valioso | ad-hoc pair of adjectives, not a lexical unit | preciado / valioso |
| `quality/satisfying` | placentero | placentero = pleasant/pleasurable; 'satisfying' (통쾌한, rewarding) is 'satisfactorio' / 'gratificante' | gratificante |
| `quality/stale` | rancio | rancio means rancid (fats, oil, cured meat); stale bread/cake is 'duro' or 'pasado', so the concept 'stale' only partly fits | keep rancio only if the concept is 'rancid'; otherwise use 'pasado' (pan pasado) / 'duro' |
| `quality/straightforward` | tajante | tajante = curt, categorical; 'straightforward' is 'sencillo' (simple) or 'directo' (frank) | directo / sencillo |
| `quality/striking` | con mucho garbo | 'con garbo' = gracefully/with flair (manner adverbial), not the adjective 'striking' | llamativo / vistoso (or relabel concept as 'with flair') |
| `quality/struck-by-misfortune` | de mala fortuna | 'estar de mala fortuna' is not idiomatic; ko is a placeholder ('그러했다') | desafortunado / tener mala suerte |
| `quality/sunk-in-worry` | hundirse en la pesadumbre | literary ad-hoc phrase; ko is a placeholder ('그리 되었다') | estar muy preocupado / angustiarse |
| `quality/tactful` | con rodeos | 'con rodeos' = beating around the bush (negative), not 'tactful'; 'un modo con rodeos de negarse' is ungrammatical | con tacto / diplomático |
| `quality/toughness` | resistencia tenaz | ad-hoc noun+adjective pair; not an expression a native would look up | resistencia / tenacidad |
| `quality/type-kind` | tipología | technical/academic word (typology); everyday 'type/kind' is 'tipo' or 'clase' | tipo |
| `quality/unmoved-either-way` | indiferente a todo ello | ad-hoc phrase with a dangling 'ello'; second sentence breaks agreement; ko is a placeholder ('그러했다') | impasible / indiferente |
| `quality/virtual` | imaginario | imaginario = imaginary; 'virtual' (digital/simulated) is 'virtual' | virtual |
| `quality/voluntary` | espontáneo | espontáneo = spontaneous/unplanned, not 'voluntary'; both sentences use it as 'volunteer', which is wrong | voluntario |
| `quality/whether` | si acaso | 'si acaso' = 'in case / if by any chance'; 'whether' in indirect questions is plain 'si' | si |

## 프랑스어 (109) — 고쳤다

| 낱말 | 지금 표제어 | 문제 | 제안 |
| --- | --- | --- | --- |
| `idea/as-well` | de même aussi | «de même aussi» is redundant and not idiomatic | aussi / de même |
| `idea/be-self-aware` | prendre conscience soi-même | «prendre conscience soi-même» is not idiomatic | prendre conscience de soi / avoir conscience de soi |
| `idea/choice-option` | option au choix | Redundant and not a set expression | option / choix |
| `idea/come-to-pass` | aller s'accomplissant | «aller s'accomplissant» is archaic and broken with «va» | se réaliser / s'accomplir |
| `idea/dark-horse` | cheval noir | Calque; «cheval noir» is not used for 'dark horse' in French | outsider |
| `idea/envy` | envie jalouse | Not a set expression; French says «envie» or «jalousie» (sentences were kept and fixed for elision) | jalousie |
| `idea/have-ever` | déjà une fois | «déjà une fois» is regional (Belgian) filler; standard French uses «déjà» | déjà |
| `idea/he-that-one` | lui-même | «lui-même» means 'himself', not 'he / that one' (sentences rewritten as 'himself') | lui / celui-là |
| `idea/held-by-them` | auprès de cela | «auprès de cela» is unnatural | à côté / près de là |
| `idea/inside-of-it` | à l'intérieur de cela | «à l'intérieur de cela» is unnatural | dedans |
| `idea/insist-on-it` | s'obstiner à cela | «s'obstiner à cela» is unnatural; the sentences are ungrammatical | s'obstiner / insister |
| `idea/it-the-thing` | cela la chose | «cela la chose» is not French | cela / la chose |
| `idea/keep-ones-word` | tenir parole donnée | «tenir parole donnée» is ungrammatical | tenir parole / tenir sa parole |
| `idea/make-things-hard` | mettre des bâtons | Cut-off idiom; the full form is «mettre des bâtons dans les roues» | mettre des bâtons dans les roues |
| `idea/mm-yes` | hum oui | «hum oui» is not a lexical item | hum / oui |
| `idea/none-other-than` | rien de moins que cela | «rien de moins que cela» does not mean 'none other than' | nul autre que |
| `idea/not-a-thing` | pas une chose | «pas une chose» is unnatural; French says «rien» | rien / pas une seule chose |
| `idea/out-of-it` | hors de cela | «hors de cela» is unnatural | dehors / en sortir |
| `idea/savouring` | appréciation | «appréciation» means assessment or valuation, not savouring something; current sentences are nonsense | dégustation (food) / plaisir de savourer |
| `idea/shall-we` | d'accord alors | «d'accord alors» does not mean 'shall we'; the sentences are ungrammatical | allons-y / on y va ? |
| `idea/standard` | étalon | 'étalon' = measurement standard or stallion; general 'standard' is 'norme'. Row 0 also glues l' to the term (L'étalon). | norme |
| `idea/supply-and-demand` | offre et demande | Not used without articles; the fixed phrase is «l'offre et la demande», so the bare term cannot appear verbatim | l'offre et la demande |
| `idea/that-much-so` | si tant | «si tant» is not standard French (only inside «si tant est que») | tellement / à ce point |
| `idea/the-real-thing` | la vraie chose | Calque of 'the real thing'; «la vraie chose» is not idiomatic | l'authentique / le vrai |
| `idea/the-very-last` | l'ultime | «l'ultime» used as a noun is unnatural, and the elision is built into the term | le tout dernier |
| `idea/they-the-things` | ceux-là les choses | «ceux-là les choses» is not French | ces choses-là |
| `idea/up-on-it` | sur cela | «sur cela» is unnatural for 'on it' | dessus |
| `idea/what-it-does` | fonction remplie | «fonction remplie» is not a noun phrase in use | fonction / rôle |
| `idea/what-thing` | quelle chose | «quelle chose» is unnatural for 'what' | quoi / ce que |
| `idea/where-it-went` | trace du départ | «trace du départ» does not mean 'where it went' | où il est allé / destination |
| `idea/you-singular` | toi-même | «toi-même» means 'yourself', not singular 'you' (sentences rewritten as 'yourself') | tu / toi |
| `number/an-index-number` | indice chiffré | «indice chiffré» is not a set term | indice |
| `number/article-count` | pièce écrite | Counting calque; «pièce écrite» is not used to count articles | article / texte |
| `number/equation` | égalité numérique | «égalité numérique» is not the word for equation | équation |
| `number/every-single-one` | chaque fois | «chaque fois» means 'each time', not 'every single one' | chacun / tous sans exception |
| `number/flat-piece-count` | pièce plate | Counting calque; «pièce plate» is not a counter | pièce |
| `number/flat-plane` | plan plat | «plan plat» is redundant | plan |
| `number/flower-count` | fleur comptée | Counting calque; «fleur comptée» is not French | fleur |
| `number/guest-count` | personne comptée | Counting calque; «personne comptée» is not French | personne / couvert |
| `number/horse-count` | tête de cheval | Counting calque; «tête de cheval» means a horse's head | cheval (tête only for herds: «têtes de bétail») |
| `number/item-count` | pièce comptée | Counting calque; «pièce comptée» is not French | pièce / article |
| `number/lamp-count` | lampe comptée | Counting calque; «lampe comptée» is not French | lampe |
| `number/meal-count` | repas compté | Counting calque; «repas compté» is not French | repas |
| `number/round-count` | manche comptée | Counting calque; «manche comptée» is not French | manche |
| `number/scale-model` | échelle du modèle | «échelle du modèle» is not a set term (row 1 also has an elision) | échelle |
| `number/session-count` | édition comptée | Counting calque; «édition comptée» is not French | édition / séance |
| `number/set-count` | jeu compté | Counting calque; «jeu compté» is not French | jeu |
| `number/share-count` | part comptée | Counting calque; «part comptée» is not French | part |
| `number/sheet-count` | feuille comptée | Counting calque; «feuille comptée» is not French | feuille |
| `number/ship-count` | coque de navire | Counting calque; «coque de navire» means a hull | navire |
| `number/showing-count` | représentation comptée | Counting calque; «représentation comptée» is not French | représentation |
| `number/stick-count` | unité de pinceau | Counting calque; «unité de pinceau» is not French | pinceau |
| `number/strand-count` | bande comptée | Counting calque; «bande comptée» is not French | brin |
| `number/tree-count` | pied d'arbre | Counting calque; «pied d'arbre» means the foot of a tree | arbre |
| `number/vehicle-count` | unité de véhicule | Counting calque from Korean 대; not French | véhicule |
| `number/volume-count` | tome compté | Counting calque; «tome compté» is not French | tome |
| `quality/a-certain-few` | certains quelques | Ungrammatical combination of two determiners. | quelques-uns |
| `quality/a-good-current` | bon courant | Not a French expression ('le courant passe' is the idiom). | bonne ambiance |
| `quality/a-real-headache` | casse tête | Misspelled (casse-tête) and it is a noun: 'Ce compte était casse tête' is ungrammatical. | un casse-tête |
| `quality/anxious` | s'impatienter | 's'impatienter' = to grow impatient, not anxious. | anxieux / s'inquiéter |
| `quality/burning-with-feeling` | d'ardente passion | Not idiomatic; 'Ils chantèrent d'ardente passion' is ungrammatical. | passionné / avec passion |
| `quality/businesslike` | d'affaires | 'd'affaires' = 'of business' (lettre d'affaires), not 'businesslike'; 'Le courrier est d'affaires' is ungrammatical. | sérieux / professionnel |
| `quality/chewy` | ferme | 'ferme' means firm, not chewy; both sentences teach the wrong meaning (ko 쫄깃). | élastique / qui a de la mâche |
| `quality/chopping-and-changing` | changeant sans cesse | Constructed; row 1 has agreement error ('sont changeant'). | changeant / versatile |
| `quality/clear-and-telling` | net et parlant | Constructed pair; row 1 agreement error ('une marque net et parlant'). | éloquent |
| `quality/clumsy-and-poor` | maladroit et pauvre | Constructed pair; 'pauvre' does not mean poor-quality here. | médiocre / grossier |
| `quality/cold-right-through` | froid jusqu'à l'os | Only physical cold ('glacé jusqu'aux os'), not 'cruel'; row 1 agreement error. | glacial / impitoyable |
| `quality/confused` | confus | For a person, 'confus' means 'embarrassed/sorry', not 'confused'; it only means 'unclear' for things. Sentences were rewritten in the 'unclear' sense. | perplexe (person) — or keep confus with the 'unclear' sense |
| `quality/corrugated` | cannelé | 'cannelé' is fluted (columns, pastry); a corrugated roof is 'en tôle ondulée'. | en tôle ondulée (ondulé is already used for 'wavy') |
| `quality/countless` | innombrable | Used almost only in the plural; both sentences are broken ('en nombre innombrable', 'des fissures innombrable'). | innombrables |
| `quality/dead-lifeless` | desséché | 'desséché' means dried out, not dead; ko says 죽었다. | mort |
| `quality/deadly` | qui coûte la vie | Constructed relative clause; 'une eau qui coûte la vie' is unnatural. | mortel |
| `quality/economical` | parcimonieux | 'parcimonieux' means stingy/sparing (negative); not 'economical'. | économe |
| `quality/fierce-and-hard` | violent et dur | Constructed pair; row 0 uses it adverbially with wrong agreement. | violent |
| `quality/fishy-smelling` | de poisson | 'de poisson' = 'of fish'; 'Le seau sentait de poisson' is ungrammatical (sentir le poisson). | qui sent le poisson |
| `quality/front-and-back` | avant et arrière | Needs articles ('l'avant et l'arrière'); without them both sentences are ungrammatical. | devant et derrière |
| `quality/good-looking` | présentable | 'présentable' means decent/fit to be seen, not good-looking. | beau |
| `quality/ha-laugh` | ha rire | Not French ('faire ha rire' is meaningless). | ha ha |
| `quality/hair-raising` | à couper le souffle | Means 'breathtaking' (beautiful), not hair-raising. | à faire dresser les cheveux sur la tête |
| `quality/hang-back-shyly` | se gêner | 'se gêner' = to hold back out of politeness ('ne te gêne pas'), not to hang back shyly. | rester timidement en retrait |
| `quality/hey-there` | eh dis | Not a usable interjection as a term; 'Il a lancé eh dis' is unnatural. | hé ! |
| `quality/highest` | suprême | 'suprême' = supreme (Cour suprême); both sentences are nonsense ('Le grade suprême est allé à un seul lot'). | le plus haut / maximal |
| `quality/inside-and-out` | dedans et dehors | Calque of 'inside and out'; French says 'comme sa poche' / 'de fond en comble'. | à l'intérieur et à l'extérieur / comme sa poche |
| `quality/just-right-measure` | à point nommé | Means 'at just the right moment', not 'the right amount'; both sentences misuse it. | juste ce qu'il faut |
| `quality/kind-hearted` | bon de cœur | Not idiomatic; 'Cette maison a toujours été bon de cœur' is ungrammatical. | qui a bon cœur |
| `quality/low` | abaissé | 'abaissé' = lowered (past participle), not 'low'; 'un mur abaissé' is unnatural. | bas |
| `quality/many-sided` | pluriel | 'pluriel' as 'many-sided' is jargon; 'Le commerce est devenu pluriel' is unnatural. | varié / aux multiples facettes |
| `quality/nasty-harsh` | rude et dur | Constructed pair, not an expression; row 1 also has agreement error ('Une pente rude et dur'). | rude |
| `quality/of-actual-practice` | de mise en pratique | Constructed; both sentences unnatural. | pratique / concret |
| `quality/of-cultivated-manners` | de manières cultivées | Not idiomatic; 'Ils parlèrent de manières cultivées' means 'talked about manners'. | raffiné / bien élevé |
| `quality/of-noble-bearing` | de noble tenue | Not idiomatic; 'une réponse de noble tenue' is meaningless. | à l'allure noble |
| `quality/ought-by-rights` | devoir de droit | Not French; ko are placeholders. | devoir en toute justice |
| `quality/plain-sailing` | vent en poupe | Only works in 'avoir le vent en poupe'; 'La traversée fut vent en poupe' is ungrammatical. | avoir le vent en poupe / sans encombre |
| `quality/pleasantly-content` | bien aise | Archaic; 'La pièce était bien aise' is wrong (only persons). | content / satisfait |
| `quality/pleasing-to-have` | agréable à avoir | Calque; ko placeholder ('그런 자리'). | agréable |
| `quality/silent` | sans bruit | Adverbial only ('marcher sans bruit'); 'Le moteur est sans bruit' was wrong. Sentences rewritten adverbially; the adjective is 'silencieux'. | silencieux |
| `quality/solid-and-rich` | massif | 'massif' = massive/solid wood; not 'sound, robust'. Both sentences broken (agreement 'La base est massif'; 'Un fonds massif les a portés'). | solide |
| `quality/still-yet` | toujours pas éteint | A sentence fragment rather than an expression for 'still/yet'. Sentences were fixed with 'n'est toujours pas éteint', but the term itself is odd. | toujours pas / encore |
| `quality/straightforward` | net et tranchant | Constructed pair meaning 'sharp and cutting', not straightforward; row 0 agreement error ('Sa réponse était net et tranchant'). | direct / franc |
| `quality/sunk-in-worry` | sombrer dans le souci | Not idiomatic; ko are placeholders ('그리 되었다'). | être rongé par l'inquiétude |
| `quality/super-grade` | super | 'super' is colloquial 'great'; 'un thé super choisi', 'un lot super' are not French. | de qualité supérieure / extra |
| `quality/tactful` | en douceur | 'en douceur' = gently/smoothly, not tactful; 'Un mot en douceur' is not French. | plein de tact / diplomate |
| `quality/that-fellow-there` | type là | Should be 'ce type-là'; 'Le type là' is not French. | ce type-là |
| `quality/the-very-one` | ce même | Needs a noun; 'ils trouvèrent ce même' is ungrammatical. | celui-là même |
| `quality/toughness` | résistance tenace | Constructed collocation, not French. | solidité / robustesse |
| `quality/type-kind` | typologie | 'typologie' = typology (a classification system), not 'type/kind'. | type / sorte |
| `quality/unaffected` | sans détour | 'sans détour' = frankly/bluntly, not unaffected/naive (ko 순박). | naturel / simple |
| `quality/useful` | profitable | 'profitable' means beneficial/lucrative, not useful; 'un outil profitable' is not French. | utile |
| `quality/virtual` | fictif | 'fictif' = fictitious; virtual is 'virtuel'. | virtuel |

## 러시아어 (105) — 고쳤다

| 낱말 | 지금 표제어 | 문제 | 제안 |
| --- | --- | --- | --- |
| `idea/aftereffect` | отдалённый отголосок | Значит «далёкое эхо», а не «후유증»; примеры 853, 854 используют слово в чужом значении. | «последствия» или «отголосок» (в переносном), для мед. смысла «осложнение» |
| `idea/as-well` | тоже же | «тоже же» не употребляется; 969, 970 ломаные. | «тоже» / «также» |
| `idea/be-self-aware` | сознавать самому | Несочетаемо: «сознавать» не управляет дательным «самому»; 1003, 1004 ломаные. | «осознавать (самому)» → лучше «осознавать», «понимать самому» или «сам осознаёт» |
| `idea/commemoration` | памятование | «Памятование» — редкое книжное/церковное слово, в обычной речи не употребляется; для «기념» естественных предложений с ним нет. | поминовение (церковное) или чествование / празднование годовщины; нейтрально: «память» в «день памяти» |
| `idea/counts-as` | считается за | «Считаться за» — просторечие; литературно «считается» + твор. п. («считается скамьёй») или «сойти за». Примеры 1013, 1014 неестественны. | «считается» (+ твор.) / «сходит за» |
| `idea/desire` | вожделение | Слово значит плотское/жадное влечение и звучит книжно-иронично; в нейтральном смысле «욕망» не годится, примеры 799, 800 из-за этого бессмысленны. | «желание» (уже занято), «страсть» или «жажда» (жажда денег) |
| `idea/grounds-given` | приведённый довод | Причастный оборот, а не словарная единица; «дать приведённый довод» бессмысленно (867, 868). | «довод» или «приведённый довод» заменить на «аргумент»; «привести довод» как глагольное сочетание |
| `idea/hold-precious` | беречь как зеницу | Обрубок фразеологизма: только «беречь как зеницу ока». 1029, 1030 без «ока» звучат как ошибка. | «беречь как зеницу ока» |
| `idea/human-relations` | людские связи | Не устойчивое сочетание; в значении «대인 관계» говорят «отношения с людьми» / «человеческие отношения». Примеры 839, 840 к тому же с ошибкой падежа («на людские связи», «в людские связи»). | «отношения с людьми» или «связи» (деловые связи) |
| `idea/inner-heart` | глубина души | В значении «마음속» живёт только в обороте «в глубине души»; в именительном «глубина души» значит «душевная глубина, глубокомыслие», поэтому 679/680 («Скрытой осталась глубина души», «Им открыта глубина души») неисправимы без смены формы. | сделать термином «в глубине души» (тогда пример: «В глубине души он был рад.») или «душа» / «сердце» |
| `idea/it-the-thing` | оно то | Не русское выражение (калька «그것»); «оно то» без дефиса и смысла. 965, 966 ломаные. | «оно» или «это»; «то самое» |
| `idea/just-as` | точно так как | Нормой будет «точно так же, как» или «точно как»; «точно так как» — ошибка. Примеры 999, 1000 к тому же без запятой. | «точно так же, как» |
| `idea/no-wonder-then` | неудивительно тогда | Не устойчивый порядок; говорят «тогда неудивительно, что» / «неудивительно, что». 1083, 1084 к тому же без запятых. | «неудивительно, что» / «немудрено» |
| `idea/none-other-than` | не что иное, как это | Хвост «это» лишний: оборот — «не что иное, как» + сущ.; 1079, 1080 ломаные. | «не что иное, как» |
| `idea/oh-there` | ах вот | Обрывок: живут «ах вот оно что» / «ах вот как»; одно «ах вот» в 971, 972 звучит неестественно. | «ах вот оно что» / «ах вот как» |
| `idea/one-can-tell` | видно что | Без запятой ошибочно: союз требует «видно, что». Примеры 919, 920 из-за этого пунктуационно неверны. | «видно, что» (с запятой в термине) |
| `idea/past-all-understanding` | уму непостижимый | Живёт как предикатив «уму непостижимо»; полное прилагательное редко и в 1093, 1094 стоит не в той форме. | «уму непостижимо» / «непостижимый» |
| `idea/plural-mark` | знак множества | Описание корейской частицы -들, в русском нет такого понятия; 961, 962 бессмысленны. | убрать из ru или дать «множественное число» / «окончание множественного числа» |
| `idea/putting-into-practice` | воплощение на деле | Смешение «воплощение в жизнь» и «на деле»; так не говорят. В 869 вдобавок «занял» при среднем роде. | «воплощение в жизнь» / «претворение в жизнь» / «осуществление» |
| `idea/sense-by-body` | телесно чуять | Так не говорят; «чуять» — нюхом/интуицией. 1037, 1038 неестественны. | «чувствовать телом» / «ощущать всем телом» |
| `idea/sign-trace` | примета следа | Не существующее сочетание: «примета» (признак, примета-суеверие) + «след» не дают смысла «징조/흔적»; оба примера (755, 756) бессмысленны. | «след» (흔적) или «признак» / «примета» (징조) — выбрать по смыслу 징조 |
| `idea/string-of` | нанизанный друг за другом | Калька с «줄줄이»: причастие с «друг за другом» по-русски не сочетается («нанизанный друг за другом ряд» не говорят); 779, 780 неестественны. | «один за другим» или «чередой» (Ошибки пошли одна за другой.) |
| `idea/the-real-thing` | настоящее | Субстантив «настоящее» значит «настоящее время», а не «подлинная вещь»; 1045, 1046 читаются неверно. | «подлинник» / «настоящая вещь» / «оригинал» |
| `idea/the-very-last` | самый конечный | Плеоназм, так не говорят («конечный» не имеет степени); 1053, 1054 ломаные. | «самый последний» / «конечный» |
| `idea/they-the-things` | они те вещи | Не русское выражение; 967, 968 ломаные («пришли они те вещи»). | «они» / «те вещи» |
| `idea/tone-of-voice` | оттенок речи | Не устойчивое выражение; «말투» по-русски — «тон», «манера речи», «интонация». Примеры 855, 856 неестественны. | «тон» / «манера речи» / «интонация» |
| `idea/unjust-wrong` | обида незаслуженная | Постпозиция прилагательного — поэтическая инверсия; как словарная единица должно быть «незаслуженная обида». Примеры 847, 848 звучат как стихи. | «незаслуженная обида» |
| `idea/upright-spirit` | дух правоты | Не устойчивое сочетание, смысл неясен; 1043, 1044 непонятны. | «прямота» / «честность» / «принципиальность» |
| `idea/urge-earnestly` | настойчиво наказывать | «Наказывать» в значении «велеть, наставлять» устарело; ученик прочтёт «наказывать = карать». 907, 908 читаются как «настойчиво наказывать (бить)». | «настойчиво просить» / «строго наказать (сов., «велеть»)» / «наставлять» |
| `idea/where-it-rests` | где оно осядет | Придаточное, а не словарная единица; «귀착점» — «итог», «конечная точка». 1027 бессмыслен. | «итог» / «конечная точка» / «чем всё кончится» |
| `number/article-count` | статья счётом | Калька счётного слова (편); «статья счётом одна» не русский; 1679, 1680 ломаные (ещё и падеж). | «статья» без «счётом» |
| `number/building-count` | строение счётом | Калька счётного слова (동); 1683, 1684 ломаные. | «строение» / «корпус» |
| `number/common-era` | наша эра | В именительном почти не употребляется; живёт как «нашей эры (н. э.)». 1727, 1728 с падежными ошибками. | «нашей эры» / «н. э.» |
| `number/flat-piece-count` | штука плоского счёта | Выдуманное выражение (калька 낱/장); 1757, 1758 ломаные. | «штука» / «лист» |
| `number/flower-count` | цветок счётом | Калька счётного слова (송이); 1691, 1692 ломаные. | «цветок» / «бутон» |
| `number/greater-than` | больше чем | В сравнении придаточного/члена нужна запятая («больше, чем прежняя»); без запятой — только в устойчивом «больше чем друг». 1725, 1726 пунктуационно неверны. | «больше, чем» или «больше» + род. п. |
| `number/guest-count` | персона счётом | Калька счётного слова (분); 1735, 1736 ломаные («на три персона»). | «персона» («стол на три персоны») |
| `number/half-past` | половина часа | «Половина часа» = «полчаса» (30 минут), а «n시 반» по-русски — «половина» + род. п. следующего часа («половина третьего») или «… тридцать». Пример 1353 («На циферблате половина часа») бессмыслен. | «половина» (половина третьего) или «полчаса» если имелось в виду 30 минут |
| `number/horse-count` | лошадь счётом | Калька счётного слова (필); 1693, 1694 ломаные. | «лошадь» / «голова (скота)» |
| `number/item-count` | штука счётом | Калька счётного слова (개); 1749, 1750 ломаные. | «штука» |
| `number/lamp-count` | лампа счётом | Калька счётного слова (잔/등); 1705, 1706 ломаные (и падеж). | «лампа» |
| `number/level-it-off` | сровнять под гребло | «Под гребло» — устаревший мерный оборот, современному ученику непонятен; 1755, 1756 неестественны (ещё и без запятой). | «выровнять» / «срезать вровень с краем» |
| `number/meal-count` | приём пищи счётом | Калька счётного слова (끼); 1709, 1710 ломаные. | «приём пищи» / «раз в день» |
| `number/ordinal-marker` | знак порядка | Описание корейского префикса 제~, в русском такого понятия нет; 1731, 1732 бессмысленны. | убрать из ru или «порядковое числительное» |
| `number/round-count` | схватка счётом | Калька счётного слова (판/번); 1717, 1718 ломаные. | «раунд» / «схватка» |
| `number/session-count` | созыв счётом | Калька счётного слова (회); 1701, 1702 ломаные. | «созыв» / «по счёту» («десятый по счёту») |
| `number/set-count` | набор счётом | Калька счётного слова (조); 1695, 1696 ломаные. | «набор» / «комплект» |
| `number/share-count` | доля счётом | Калька счётного слова (몫); 1711, 1712 ломаные (падеж). | «доля» |
| `number/sheet-count` | лист счётом | Калька счётного слова (장); 1729, 1730 ломаные. | «лист» |
| `number/ship-count` | судно счётом | Калька счётного слова (척); 1685, 1686 ломаные («с каждого судно счётом»). | «судно» |
| `number/showing-count` | показ счётом | Калька счётного слова (회); 1715, 1716 ломаные. | «показ» / «спектакль» |
| `number/stick-count` | перо счётом | Калька счётного слова (자루); к тому же «перо» ≠ карандаш/кисть; 1699, 1700 ломаные. | «штука» / «карандаш» |
| `number/strand-count` | полоса счётом | Калька счётного слова (가닥), к тому же «полоса» ≠ «прядь»; 1733, 1734 ломаные. | «прядь» / «нить» |
| `number/tree-count` | дерево счётом | Калька корейского счётного слова (그루); «дерево счётом три» по-русски не говорят — счёт выражается числительным («три дерева»). 1677, 1678 ломаные. | в ru не нужен отдельный термин; если оставлять — «дерево» / «штука» |
| `number/volume-count` | том счётом | Калька счётного слова (권); 1697, 1698 ломаные. | «том» |
| `quality/a-full-whole` | целиком | Means 'entirely, as a whole' (съел целиком); 'a whole week' is «целую неделю» — rows misuse it. | целый (целую неделю, всю ночь) |
| `quality/a-good-current` | доброе течение | Not a Russian idiom ('good flow/vibe' is not expressed this way). | хорошая атмосфера / добрая аура |
| `quality/amphibious` | земноводный | Biology-only adjective; natives use the noun земноводное (лягушка — земноводное); for vehicles 'амфибия/плавающий'. Sentences built with it are poetic inversions. | земноводное (noun) / плавающий |
| `quality/at-a-standstill` | в покое | Means 'at rest, left alone' (оставь в покое), not 'at a standstill'. | на месте / стоит (работа стоит) |
| `quality/be-infatuated` | быть без ума | Infinitive 'быть' breaks with a subject («стал быть» is ungrammatical); natural usage is «без ума от…». | без ума (от) |
| `quality/be-unable-to` | быть не в силах | Infinitive 'быть' cannot stay with a subject in present/past; real sentences use «не в силах» / «был не в силах», so the term never fits verbatim. | не в силах |
| `quality/bright-and-handsome` | яркий и пригожий | Ad-hoc pair with folk-archaic пригожий; row 1 has gender error (ткань … яркий). | нарядный / красивый |
| `quality/brisk-and-open` | прямой и лёгкий | Ad-hoc pair, not a lexical unit for 'brisk and open'. | открытый / прямолинейный |
| `quality/complete-whole` | целостный | Means 'holistic, integral' (целостный подход); not said of an intact set or pot. | целый |
| `quality/concrete-specific` | предметный | Means 'object-related' (предметный указатель); 'concrete/specific plan' is 'конкретный'. | конкретный |
| `quality/convenient` | практичный | Means 'practical', not 'convenient' (of a shop/location); sentences with it describing a shop are wrong-sense. | удобный |
| `quality/countless` | бесчисленный | Used almost only in the plural (бесчисленные звёзды); singular masc forms give broken sentences. | бесчисленные |
| `quality/crystal-clear` | искристый | Means 'sparkling, glittering' (снег, вино), not 'crystal-clear'; row 1 is also missing its noun. | кристально чистый / прозрачный |
| `quality/desperate` | безвыходный | Means 'hopeless, with no way out' and only collocates with положение/ситуация (neuter/fem); not a person or masc noun; sentences built are ungrammatical. | отчаянный |
| `quality/early-period` | начальная пора | Not an idiomatic collocation; natives say начальный период / ранний период / начало. | начальный период |
| `quality/formal` | формальный | Means 'perfunctory, nominal'; a formal dinner/tone is 'официальный'. | официальный |
| `quality/generic` | безымянный | Means 'nameless, unnamed'; not used for generic/no-brand goods. | небрендовый / без бренда (or дженерик for medicine) |
| `quality/ha-laugh` | ха смех | Not Russian (interjection + noun glued together). | ха-ха |
| `quality/haggling-over-crumbs` | торговаться из за мелочей | Misspelled: «из-за» needs a hyphen; and an infinitive phrase cannot follow «провели» / «пристало» naturally as in the rows. | торговаться из-за мелочей |
| `quality/hazardous` | азартный | Means 'gambling, reckless-excited', not 'hazardous'. | опасный |
| `quality/heart-full-of` | полный грудью | Not a Russian expression (the idiom is «дышать полной грудью» = breathe deeply); both rows are nonsense. | переполненный (чувствами) |
| `quality/hey-there` | эй же | Not Russian; «же» cannot follow the interjection. | эй |
| `quality/higher-than` | выше чем | Same as ниже чем: correct Russian writes 'выше, чем'. | выше, чем |
| `quality/ill-at-ease` | стеснённый | Means 'constrained, cramped' (стеснённые обстоятельства); 'ill at ease' is «не в своей тарелке» / «неловко». | неловко / скованный |
| `quality/invisible` | незримый | Poetic/bookish; everyday 'invisible' is невидимый. | невидимый |
| `quality/less-than-that` | менее | Bookish; cannot stand alone as 'less' (взяла менее) — that is «меньше». | меньше |
| `quality/let-alone-that` | не говоря уже о том | Requires «, что» + clause or is used as «не говоря уже о + prep.»; both rows («о том что ребёнок») are ungrammatical. | не говоря уже о |
| `quality/lively` | активный | Means 'active'; a lively market/class is 'оживлённый'; 'рынок был активный' is a calque. | оживлённый / живой |
| `quality/lower-than` | ниже чем | Standard punctuation requires a comma (ниже, чем), so the term never appears verbatim in a correct sentence. | ниже, чем |
| `quality/messed-up` | скверный | Means 'nasty, bad' (скверная погода), not 'messed-up/in disorder'. | испорченный / в беспорядке |
| `quality/messy` | беспорядочный | Means 'disorderly, chaotic' (беспорядочный образ жизни); not said of a messy desk or room. | неубранный (стол, комната) / неряшливый (person) |
| `quality/more-of-it` | более | Bookish; cannot stand alone as 'more' (просили более) — that is «больше». | больше |
| `quality/nasty-harsh` | суровый и грубый | Ad-hoc pair of adjectives, not a lexical unit; cannot serve as a single answer. | суровый (or резкий) |
| `quality/not-necessarily-so` | не обязательно так | Not a unit; it only works as part of «не обязательно так» + predicate, so row 1 is nonsense. | не обязательно |
| `quality/padded` | мягкий с подкладкой | Not a fixed expression; the phrase cannot sit naturally before a noun ('мягкий с подкладкой конверт' is ungrammatical word order). | мягкий конверт (envelope) / утеплённый (vest) |
| `quality/quaint-and-plain` | старинно простой | Not a Russian expression (adverb старинно + adjective is ungrammatical). | старинный и простой / незатейливый |
| `quality/serious-grave` | угрожающий | Means 'threatening'; also needs instrumental after выглядит; 'serious' = серьёзный. | серьёзный |
| `quality/square-shaped` | угловатый | Means 'angular, awkward' (угловатый подросток), not 'square-shaped'. | квадратный |
| `quality/straightforward` | категоричный | Means 'categorical, peremptory', not 'straightforward'. | прямой / простой |
| `quality/super-grade` | супер | Indeclinable slang interjection/prefix; not a grade adjective for goods. | высший сорт / первоклассный |
| `quality/sway-in-waves` | зыбиться | Archaic/poetic; learners won't meet it, sentences sound bookish. | колыхаться / волноваться |
| `quality/tactful` | обтекаемый | Means 'streamlined' / 'evasive, vague' (обтекаемый ответ), not 'tactful'. | тактичный |
| `quality/taut` | напряжённый | Means 'tense, strained'; a taut rope/wire is 'натянутый' — 'трос напряжённый' is a wrong-sense calque. | натянутый |
| `quality/that-fellow-there` | тип этот | Postposed colloquial order; the dictionary form is «этот тип», and the rows (должен денег тип этот) sound like a parody. | этот тип |
| `quality/that-thing` | то вон | Colloquial filler, not a dictionary unit; substandard in writing. | вон то / то |
| `quality/thirsty` | жаждущий | Bookish participle ('craving'); not used for ordinary thirst — natives say «хочет пить», no natural A2 sentence fits. | хочет пить (phrase) / or noun жажда |
| `quality/this-thing` | это вот | Colloquial filler, not a dictionary unit; «Возьми это вот» is substandard. | вот это / это |
| `quality/type-kind` | типология | Means 'typology' (a classification system), not a type/kind of thing. | тип / вид |
| `quality/unmoved-either-way` | безучастный ко всему этому | Ad-hoc phrase, not a lexical unit; both rows ungrammatical (осталась безучастный) and ko is meaningless. | безучастный |
| `quality/virtual` | мнимый | Means 'imaginary, sham', not 'virtual'. | виртуальный |

## 러시아어 — 나머지 파일의 둘째 예문에서 (2026-10-08, 81) — 고쳤다

추상어 세 파일 밖의 러시아어 둘째 예문 7,564줄을 다시 쓰며 나왔다. 마흔은 상황 표현의
«пожалуйста» 앞뒤 쉼표가 빠진 것이다(«Счёт пожалуйста» → «Счёт, пожалуйста»).

| 낱말 | 지금 표제어 | 문제 | 제안 |
| --- | --- | --- | --- |
| `action/and-with` | и вместе с | not a lexical unit; «и» + «вместе с» only co-occur by accident, sentences built around it are broken | вместе с / а также |
| `action/face-up-to` | встречать лицом | not an idiom on its own; the expression is «встречать лицом к лицу» (or «смотреть в лицо»), so no natural sentence keeps the bare term | встречать лицом к лицу / смотреть в лицо |
| `action/it-is` | это есть | «это есть» is not used as a copula in modern Russian (present copula is zero); no natural sentence contains it | это / является |
| `action/it-is-said` | говорят что | standard spelling needs a comma «говорят, что»; the comma-less term can only appear in an ungrammatical sentence | говорят, что / говорят |
| `action/look-back-critically` | держать ответ перед собой | not an idiom; «держать ответ» is answering to someone else, «перед собой» makes it a calque for 반성하다 | оглядываться назад / подводить итоги / анализировать свои ошибки |
| `action/on-the-spot` | на месте же | not idiomatic; Russian says «тут же», «на месте» or «сразу на месте» | на месте / тут же |
| `action/out-of-joint` | разойтись со звеном | not a Russian expression (nonsense calque); cannot carry «out of joint» | выйти из строя / пойти не так / не клеиться |
| `body/shin` | голень спереди | «голень спереди» is not a term; the shin is «голень» (or «передняя часть голени»); the extra word also forces gender errors («принял голень») | голень |
| `body/the-immune-disease` | иммунная болезнь | not a standard term; the ko gloss means AIDS, which is «СПИД» / «иммунодефицит»; «иммунная болезнь» also forces wrong-case sentences | иммунодефицит / СПИД / аутоиммунная болезнь |
| `city/hard-to-face` | неловко подступиться | not an idiom; both examples are ungrammatical around it | неловко / стыдно (показаться на глаза) |
| `city/point-against-point` | сходиться остриём к острию | calque of 針鋒相對, not used in Russian | находить коса на камень / стоять друг против друга |
| `city/the-ruling-power` | власть в руках | not a lexical unit; «власть» plus a dangling «в руках» (in whose hands?) only fits in broken sentences | власть / правящая власть |
| `city/there-that-place` | там на том месте | redundant calque («там» + «на том месте»), not a lexical unit; sentences built on it read unnaturally | там / на том месте |
| `clothes/toe-cap` | носок ботинка усиленный | postposed adjective makes it a non-term; Russian says «усиленный носок ботинка» (or «подносок»); the bare form only fits broken sentences | усиленный носок / подносок |
| `job/commuter` | пассажир-ежедневник | «ежедневник» is a diary/planner; «пассажир-ежедневник» is not a Russian word for a commuter | ежедневный пассажир (or пригородный пассажир) |
| `nature/a-land-measure` | мера земли | расплывчато, не термин | мера площади / десятина |
| `nature/field-path` | межа между полями | плеоназм «межа между полями» | межа |
| `nature/residue-left` | остаточный след | плеоназм «остаточный след», неестественно | остаток / осадок |
| `nature/rice-plant` | рисовое растение | калька, по-русски так не говорят | рис |
| `nature/vitality-spark` | жизненная искра | неустойчивое сочетание | искра жизни |
| `nature/waning-and-worn` | убывать и щербиться | искусственная пара глаголов, не выражение | убывать (о луне) / стираться |
| `nature/well-worth-seeing` | весьма достойный взгляда | неестественно | достойный внимания / стоит посмотреть |
| `office/herewith-this` | настоящим сим | «настоящим сим» — бессмыслица | настоящим |
| `office/reserves` | запасы залежи | «запасы залежи» — не сочетание | запасы (полезных ископаемых) |
| `office/trade-surplus` | превышение вывоза | не термин | профицит торгового баланса |
| `scene/anaesthetic-please` | Сделайте обезболивание пожалуйста | нет запятой при «пожалуйста» | Сделайте обезболивание, пожалуйста |
| `scene/apologize-please` | Извинитесь пожалуйста | нет запятой при «пожалуйста» | Извинитесь, пожалуйста |
| `scene/by-airmail` | Авиапочтой пожалуйста | нет запятой при «пожалуйста» | Авиапочтой, пожалуйста |
| `scene/call-tow` | Пришлите эвакуатор пожалуйста | нет запятой при «пожалуйста» | Пришлите эвакуатор, пожалуйста |
| `scene/change-into-coins` | Разменяйте пожалуйста на монеты | нет запятой при «пожалуйста» | Разменяйте, пожалуйста, на монеты |
| `scene/check-please` | Счёт пожалуйста | нет запятой при «пожалуйста» | Счёт, пожалуйста |
| `scene/color-sample` | Покажите пожалуйста оттенки | нет запятой при «пожалуйста» | Покажите, пожалуйста, оттенки |
| `scene/fluoride` | Нанесите фтор пожалуйста | нет запятой при «пожалуйста» | Нанесите фтор, пожалуйста |
| `scene/get-home-safe` | Доберитесь спокойно | не устойчивое выражение | Доберитесь благополучно / Счастливо добраться |
| `scene/grind-please` | Смелите пожалуйста | нет запятой при «пожалуйста» | Смелите, пожалуйста |
| `scene/help-me` | Помогите пожалуйста | нет запятой при «пожалуйста» | Помогите, пожалуйста |
| `scene/leave-in-locker` | Оставьте в ячейке пожалуйста | нет запятой при «пожалуйста» | Оставьте в ячейке, пожалуйста |
| `scene/less-sweet` | Пожалуйста, менее сладкий | неестественно | Не так сладко, пожалуйста / Поменьше сахара, пожалуйста |
| `scene/meat-by-gram` | Триста граммов пожалуйста | нет запятой при «пожалуйста» | Триста граммов, пожалуйста |
| `scene/menu-please` | Меню пожалуйста | нет запятой при «пожалуйста» | Меню, пожалуйста |
| `scene/more-photos` | Пришлите пожалуйста ещё фото | нет запятой при «пожалуйста» | Пришлите, пожалуйста, ещё фото |
| `scene/no-ice` | Без льда пожалуйста | нет запятой при «пожалуйста» | Без льда, пожалуйста |
| `scene/no-thanks` | Спасибо не нужно | нет запятой | Спасибо, не нужно |
| `scene/not-spicy` | Не острое пожалуйста | нет запятой при «пожалуйста» | Не острое, пожалуйста |
| `scene/oil-change` | Замените моторное масло пожалуйста | нет запятой при «пожалуйста» | Замените моторное масло, пожалуйста |
| `scene/one-more` | Ещё один пожалуйста | нет запятой при «пожалуйста» | Ещё один, пожалуйста |
| `scene/pay-utility-bill` | Где оплатить коммунальные | обрывок, «коммунальные» без существительного | Где оплатить коммунальные услуги |
| `scene/please-eat-first` | Ешьте первым | неестественно; «первым» не согласовано | Начинайте без меня |
| `scene/please-repeat` | Повторите пожалуйста | нет запятой при «пожалуйста» | Повторите, пожалуйста |
| `scene/receipt-please` | Чек пожалуйста | нет запятой при «пожалуйста» | Чек, пожалуйста |
| `scene/remove-bone` | Уберите кость пожалуйста | нет запятой при «пожалуйста» | Уберите кость, пожалуйста |
| `scene/replace-router` | Замените роутер пожалуйста | нет запятой при «пожалуйста» | Замените роутер, пожалуйста |
| `scene/replace-zipper` | Замените молнию пожалуйста | нет запятой при «пожалуйста» | Замените молнию, пожалуйста |
| `scene/resident-certificate` | Одну справку о регистрации пожалуйста | нет запятой при «пожалуйста» | Одну справку о регистрации, пожалуйста |
| `scene/seat-with-socket` | Место рядом с розеткой пожалуйста | нет запятой при «пожалуйста» | Место рядом с розеткой, пожалуйста |
| `scene/slice-thin` | Нарежьте тонко пожалуйста | нет запятой при «пожалуйста» | Нарежьте тонко, пожалуйста |
| `scene/take-photo` | Сфотографируйте нас пожалуйста | нет запятой при «пожалуйста» | Сфотографируйте нас, пожалуйста |
| `scene/text-when-done` | Пришлёте сообщение когда будет готово | нет запятой перед «когда» | Пришлёте сообщение, когда будет готово |
| `scene/this-please` | Вот это пожалуйста | нет запятой при «пожалуйста» | Вот это, пожалуйста |
| `scene/ticket-please` | Один билет пожалуйста | нет запятой при «пожалуйста» | Один билет, пожалуйста |
| `scene/tighten-screw` | Подтяните пожалуйста винт | нет запятой при «пожалуйста» | Подтяните, пожалуйста, винт |
| `scene/to-the-airport` | В аэропорт пожалуйста | нет запятой при «пожалуйста» | В аэропорт, пожалуйста |
| `scene/top-up-card` | Пополните эту карту пожалуйста | нет запятой при «пожалуйста» | Пополните эту карту, пожалуйста |
| `scene/update-passbook` | Обновите мне сберкнижку пожалуйста | нет запятой при «пожалуйста» | Обновите мне сберкнижку, пожалуйста |
| `scene/washer-fluid` | Долейте пожалуйста омывайку | нет запятой при «пожалуйста» | Долейте, пожалуйста, омывайку |
| `scene/water-please` | Воды пожалуйста | нет запятой при «пожалуйста» | Воды, пожалуйста |
| `scene/weigh-parcel` | Взвесьте пожалуйста | нет запятой при «пожалуйста» | Взвесьте, пожалуйста |
| `scene/wrap-please` | Заверните пожалуйста | нет запятой при «пожалуйста» | Заверните, пожалуйста |
| `scene/write-it-down` | Напишите пожалуйста | нет запятой при «пожалуйста» | Напишите, пожалуйста |
| `school/apply-for-exam` | подать на экзамен | not idiomatic (needs «заявление»); sentence cannot hold it naturally | записаться на экзамен |
| `school/compulsory-course` | непременный | means 'indispensable', not 'compulsory (course)'; current sentence is ungrammatical («стали непременный порядок») | обязательный |
| `school/course-credit` | учебный кредит | in Russian means a student loan, not a course credit | зачётная единица |
| `school/grade-level` | класс обучения | not a natural Russian expression; «класс» alone means grade/year | класс |
| `time/afterwards` | после того | incomplete without «как»; standalone 'afterwards' is «после этого» | после этого |
| `time/at-the-juncture` | в пору когда | needs a comma before «когда» («в пору, когда»), so cannot appear verbatim in a correct sentence | в пору, когда |
| `time/christmas` | рождество | the holiday is capitalized in Russian; lowercase form does not match correct spelling | Рождество |
| `time/solar-term` | солнечный сезон | not an existing Russian term for the 24 solar terms | сезон солнечного календаря |
| `time/time-lapse` | замедленная съёмка | means slow motion, the opposite of time-lapse | интервальная съёмка |
| `time/year-after-next` | послеследующий год | not a real Russian expression | через два года |
| `transport/congested` | заторный | not a standard Russian adjective; current sentence («Слишком заторный мост») sounds unnatural | загруженный / перегруженный |
| `transport/timing-belt` | ремень грм | «ГРМ» is an abbreviation and must be capitalized; current sentence is also inverted («Зубья внутри имеет ремень грм») | ремень ГРМ |

## 러시아어 — 첫째 예문을 다시 쓰다 나온 것 (2026-10-08, 21) — 고쳤다

2026-10-09에 고쳤다 — 열일곱을 바꾸고(«физиотерапевт» · «кешбэк» · «люверс» · «опечатка»), «спиртовка»는
뜻이 알코올램프라 두고, scene-setting · freight · janitor는 같은 뜻의 낱말이 이미 다른 개념에 있어 뺐다.

추상어 세 파일 밖의 러시아어 첫째 예문 7,563줄을 다시 쓰며 나왔다. 예문은 손대지 않았다 —
표제어를 바꾼 뒤 새로 쓴다. «терапевт»(일반의 ✗ 치료사) · «фрахт»(용선료 ✗ 화물) ·
«завхоз»(관리 책임자 ✗ 경비원) · «спиртовка»(알코올램프 ✗ 분젠버너)처럼 뜻이 틀린 것이 많다.

| 낱말 | 지금 표제어 | 문제 | 제안 |
| --- | --- | --- | --- |
| `action/act-for-another` | действовать за | not an idiomatic Russian expression for 'act on someone's behalf'; current sentence is nonsense | действовать от имени / заменять |
| `action/cause-a-mishap` | устроить происшествие | unnatural collocation (an object cannot 'устроить происшествие'); not a set expression | привести к аварии / стать причиной несчастного случая |
| `action/finish-off` | кончать | valid but colloquial with a vulgar slang sense; risky for learners (sentence was rewritten anyway) | заканчивать |
| `action/remain-over` | оставаться в остатке | "в остатке" is arithmetic jargon (remainder); not a natural everyday expression for 'be left over', no natural A2 sentence | оставаться |
| `body/beauty-care` | уход за красотой | calque; Russian says «уход за собой» or «косметический уход»; current sentence «Ею изучается уход за красотой.» is also broken | уход за собой |
| `city/scene-setting` | выстроенная сцена | not a set expression for 'scene-setting'; only a literal 'built stage scene' | мизансцена / обстановка |
| `clothes/grommet` | металлическая люверса | the noun is masculine «люверс» (cf. shoe-eyelet «люверс на ботинке»); «люверса» is a non-standard feminine form; sentence «Разрыв остановила…» is also odd | металлический люверс |
| `clothes/snag-the-zip` | заедать молнию | «заедать» is intransitive with zip as subject («молнию заело», «молния заедает»); transitive «заедать молнию» is not idiomatic | заедать (о молнии) / молния заедает |
| `home/burglar-proof` | противоугонный | «противоугонный» means anti-theft for vehicles (угон = car theft); it does not describe a burglar-proof shed, door or lock | противовзломный |
| `job/therapist` | терапевт | in Russian «терапевт» is a general practitioner (internist), not a therapist who shows exercises; the second example («Давление измерил терапевт») also uses the GP sense, so the term does not match 치료사 | физиотерапевт (physio) / психотерапевт (talk therapy) |
| `nature/grass-clump` | куст травы | Not an established expression; «куст» is a shrub, a clump of grass is «пучок травы» or «кочка» (sentence «Зайца укрыл куст травы.» is also inverted/odd). | пучок травы / кочка |
| `nature/new-energy` | новая энергетика | Calque of Chinese 新能源; not a standard Russian term (sentence «Посёлок питает новая энергетика.» is also unnatural). | возобновляемая энергетика / альтернативная энергетика |
| `office/money-handed-back` | возврат части | Not an idiomatic term for a rebate/cashback; sentence «Мельница даёт возврат части за объём.» is also unnatural. | кешбэк / скидка за объём / частичный возврат |
| `school/a-level-reached` | достигнутая высота | unnatural for "level reached" (skill); sentence nonsense | достигнутый уровень |
| `school/a-wrong-character` | описка в знаке | unnatural calque | описка / неверно написанный иероглиф |
| `school/an-unknown-quantity` | оставшаяся неизвестность | not a natural expression; sentence nonsense | неизвестная величина / тёмная лошадка |
| `school/brain-score` | коэффициент ума | not an established expression | коэффициент интеллекта (IQ) |
| `school/bunsen-burner` | спиртовка | спиртовка is an alcohol lamp, not a Bunsen burner | газовая горелка (горелка Бунзена) |
| `school/janitor` | завхоз | завхоз = supply manager, not janitor | уборщик / сторож |
| `time/right-after` | сразу за тем | incomplete fragment, cannot stand alone | сразу после этого / сразу за ним |
| `transport/freight` | фрахт | фрахт = charter/freight fee, not cargo itself | груз |
