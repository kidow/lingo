# 콘텐츠 후속 작업 인계 (2026-11)

[source-examples-audit-2026-09-29.md](source-examples-audit-2026-09-29.md)의 마지막 절
「긴 slug 개념의 표제어 · 영어 한국어 줄」에서 이어진다. 임시 폴더의 자료가 사라지기 전에
옮겨 둔 것이다.

## 작업 절차

```bash
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
node scripts/romanize.ts; node scripts/tocfl.ts; node scripts/ipa.ts; node scripts/ipa-fr.ts
node scripts/levels.ts; node scripts/audio.ts manifest; node scripts/split.ts; pnpm check
```

- 예문 문장을 바꾸면 `pnpm check`가 낡은 예문 소리를 «남은 소리»로 찍는다. 그 파일을 임시 폴더로
  옮긴다. 표제어를 바꾸면 `public/audio/<언어>/<slug>.mp3`도 옮긴다.
- 소리는 `node scripts/audio.ts make <언어> all 12` (낱말, API 크레딧) →
  `audio.ts ex <언어> all` (로컬) → `audio.ts sync` → `audio.ts manifest` →
  `audio.ts peaks <언어>` 순서다. 끝나면 `public/peaks`를 커밋한다. 한국어 줄과 `meaning_ko`만
  바꾸면 소리는 다시 만들 필요가 없다.
- 번체 변환이 막히면 `traditional`을 손으로 채운다. 길이가 `text`와 같아야 한다.
- `node scripts/batch.ts`에 slug를 변수로 넘길 때 zsh는 낱말을 나누지 않는다.
  한 덩어리로 넘어가 «그런 개념이 없습니다»로 멈춘다. `${=slugs}`로 넘긴다.
- `pnpm check`의 독일어 어순 경고 중 `belong-to` · `one-can-tell` · `be-made-up-of-it`은
  오탐이다. 문장은 맞다.
- 커밋은 `git commit -o <경로>`로 한다. `lib/levels-stamp.ts` · `lib/audio-have.ts`,
  hanja 쪽 파일, `docs/exam-materials-feasibility-2026-09-27.md`는 싣지 않는다.

## 1. 뜻이 겹치는 개념

표제어를 정리할 때 새 낱말이 겹쳐 한쪽의 그 언어 낱말을 뺀 자리다. 38개 slug가 «뺀 쪽»이다.
개념째 합칠지는 정해지지 않았다. **두 개념의 그림과 뜻이 정말 같은지 보고 판단한다.** 뜻이
갈리면 그대로 두고, 뺀 언어 낱말을 다른 말로 채울지 본다.

진도는 slug로 저장되고 옮기는 코드가 없다(`lib/progress.ts`). 지운 개념의 학습 기록은 이어지지
않으므로, **지우기 전에 목록을 사용자에게 보이고 승인을 받는다.** 지울 때는 개념 블록과 함께
`public/concepts/<slug>.webp`, 낱말 · 예문 소리도 치운다.

| 남긴 쪽 | 뺀 쪽 | 부딪친 낱말 |
| --- | --- | --- |
| `a-joining-into-one-body` 묶어 세운 모임 | `a-union-of-states` 연방체 | es federación · fr fédération |
| `a-mere-trifle-of-a-thing` 보잘것없는 | `all-small-and-fiddly` 자질구레하다 | es insignificante · fr insignifiant |
| `air-of-the-place` 분위기 | `the-mood-a-thing-gives-off` 자아내는 멋 | ru атмосфера |
| `argue-it-out-by-reason` 이치를 따지다 | `reason-the-thing-out-aloud` 따져 말하다 | de argumentieren · es razonar |
| `as-if-seen-somewhere-before` 어디서 본 듯하다 | `known-by-heart-already` 귀에 익다 | de bekannt vorkommen |
| `as-though-it-were` ~인 양 | `as-if-it-were` ~같다 | de als ob |
| `be-lost-and-gone` 죽어 없어지다 | `go-under-for-good` 망하여 없어지다 | es perecer · fr périr |
| `bear-it-well-in-mind` 꼭 새겨 두다 | `cut-it-deep-in-mind` 깊이 새기다 | ru зарубить на носу |
| `bring-it-in-from-outside` 실어 들이다 | `bring-it-in-by-cart` 실어 오다 | de anliefern |
| `call-for-it-to-be-given` 내놓으라 하다 | `apply-for-it-and-draw-it` 신청해 받아 오다 | fr réclamer |
| `chase` 쫓다 | `hound-them-for-it` 박해하다 | de verfolgen |
| `chew-it-over-again` 곱씹다 | `turning-it-over-and-over-in-the-mind` 잊지 못하고 되뇌다 | de grübeln · es darle vueltas · ru прокручивать в голове |
| `chew-it-over-again` 곱씹다 | `turn-it-over-in-ones-mind` 곰곰 생각하다 | es darle vueltas |
| `coming-at-set-times` 규칙적인 | `coming-all-the-time` 늘 오는 | fr régulier |
| `every-move-one-makes` 몸짓 하나하나 | `every-word-and-every-deed` 말 한마디 몸짓 하나 | fr faits et gestes |
| `feeling-the-very-same-way` 같이 느낌 | `a-head-for-other-peoples-feelings` 마음 헤아리는 밝기 | es empatía · fr empathie |
| `go-by-and-be-gone` 지나가 버리다 | `shift-as-the-seasons-pass` 때가 흘러 옮아가다 | es transcurrir |
| `hold-them-back-at-the-gate` 붙들어 두다 | `withheld-and-not-granted` 주지 않다 | fr retenir |
| `in-front-of-it` ~ 앞에 | `out-in-front-there` 앞에 | fr devant |
| `keep-at-it-steadily` 꾸준히 하다 | `never-slackening-of-oneself` 스스로 힘써 쉬지 않다 | fr persévérer |
| `lump-it-all-together` 뭉뚱그리다 | `lump-them-all-together` 한데 묶어 말하다 | es meter en el mismo saco |
| `make-the-whole-thing-up` 지어내다 | `fake-it-and-pass-it-off` 거짓을 꾸미다 | es inventarse |
| `march-in-and-take-it` 침략하다 | `break-in-and-do-harm` 침범해 해치다 | es invadir |
| `never-tiring-of-it` 귀찮아하지 않다 | `why-go-to-the-trouble` 구태여 | fr se donner la peine |
| `of-no-great-account` 대수롭지 않다 | `all-small-and-fiddly` 자질구레하다 | ru пустяковый |
| `of-things-to-eat` 먹을거리의 | `enough-to-live-on` 먹고사는 | fr alimentaire |
| `on-edge-and-fretting` 초조하다 | `burning-up-with-worry` 속이 타다 | es en ascuas |
| `plan-it-all-as-one` 두루 꿰어 짜다 | `take-it-in-under-one` 끌어들여 넣다 | fr intégrer |
| `pour-out-ones-troubles` 하소연하다 | `pour-out-all-the-talk` 이야기를 다 쏟다 | fr vider son sac |
| `rain-fire-on-them` 폭격하다 | `drop-bombs-on-it` 폭탄을 떨구다 | es bombardear |
| `reach-them-too-in-the-end` 번져 가다 | `break-in-and-do-harm` 침범해 해치다 | de übergreifen |
| `settle-exactly-into-place` 제자리에 놓이다 | `match-what-is-needed` 걸맞다 | es encajar |
| `sift-them-out-one-by-one` 걸러 내다 | `knock-out-of-contest` 도태시키다 | ru отсеивать |
| `stand-aside-from-the-vote` 기권하다 | `on-no-account-do-it` 절대 삼가라 | es abstenerse · fr s'abstenir |
| `strive-hard-for-it` 힘써 구하다 | `go-after-it-and-get-it` 꾀하여 얻다 | de anstreben |
| `the-colour-runs` 물이 빠지다 | `soaked-in-without-noticing` 모르는 새 물들다 | de abfärben |
| `the-feel-of-a-place` 그 고장 정취 | `the-mood-a-thing-gives-off` 자아내는 멋 | de Flair |
| `thick-skinned-about-it` 뻔뻔하다 | `with-no-restraint-at-all` 거리낌 없이 굴다 | ru наглый |
| `what-lies-behind-it` 내막 | `the-head-and-tail-of-it` 앞뒤 내력 | es entresijos · ru подоплёка |
| `with-no-warmth-in-it` 인정머리 없는 | `without-a-shred-of-feeling` 인정이 없다 | de herzlos · es sin corazón · fr sans cœur |
| `with-the-heart-in-ones-mouth` 조마조마하다 | `burning-up-with-worry` 속이 타다 | ru как на иголках |
| `write-it-in-between` 적어 넣다 | `put-notes-to-the-text` 풀이를 달다 | es anotar |

## 2. 뜻줄 후보

영어 한국어 줄 점검에서 «뜻줄 풀이말을 그대로 넣었다»고 고친 줄이 나온 개념 743개다. **743개
모두 뜻줄이 틀린 것은 아니다.** 뜻줄은 멀쩡한데 예문에서 그 낱말이 안 어울린 자리(`poetry` 시가,
`predict` 예언하다)도 섞여 있다. 영어 낱말이 없는 개념은 이 목록에 잡히지 않았다.

- 판정 기준: 한국어 화자가 사전에서 찾거나 말로 쓰는 낱말인가. «윗한도», «마음 헤아리는 밝기»는
  바꾸고, 멀쩡한 뜻줄은 건드리지 않는다. plunger의 «압축기»처럼 뜻이 틀린 것도 고친다.
- 그림과 맞춰 본다. `image_prompt`에 `Korean text`가 있는 개념(전체 81개, 이 목록에 7개)은
  그림 속 글자도 뜻줄을 따르므로 다시 그려야 할 수 있다.
- 뜻을 **옮기는** 변경은 낱말 변경과 따로 검토한다. 일곱 언어 표제어와 어긋나면 안 된다.
- `pnpm dup`으로 새 뜻줄이 다른 개념과 겹치는지 본다. 겹치면 1번 목록으로 넘긴다.
- 바꾼 뒤 일곱 언어의 한국어 줄에 옛 뜻줄 말이 남았는지 찾아 고친다.

열: slug · 파일 · 뜻줄 · 고친 줄 수

```text
a-long-march	action	먼 행군	2
add	action	더하다	2
alternate	action	번갈아 두다	1
an-opening-worth-taking	action	탈 만한 틈	1
be-close-at-hand	action	코앞에 닿다	2
beg-and-get	action	빌어 얻다	2
break-in-and-do-harm	action	침범해 해치다	2
break-with-hands	action	쪼개다	1
bring-into-one	action	하나로 묶다	1
bring-it-about	action	이르게 하다	1
bring-to-an-end	action	끝맺다	2
burn-down	action	태워 없애다	2
careful-and-hardworking	action	조심스레 힘쓰다	2
cause-a-mishap	action	사고를 내다	1
cooperate	action	협력하다	1
cope-with	action	대처하다	1
deal-and-hold-out	action	상대하며 버티다	1
detonate	action	폭파하다	1
double-as	action	겸하다	2
drive-them-on-hard	action	몰아대다	1
entrust	action	맡기다	1
explain-for-all	action	쉽게 풀어 알리다	1
fall-in-with-how-things-are	action	따라 맞추다	2
follow-the-rule	action	좇다	2
fulfil	action	이행하다	1
go-straight-through	action	곧장 닿다	2
going-at-it-without-restraint	action	거리낌 없이 마구	1
guarantee	action	보증하다	1
hang-down	action	드리우다	1
hum-through-the-nose	action	콧소리로 흥얼거리다	2
inflate	action	부풀리다	1
it-holds-as-said	action	말한 것이 그대로 서다	1
just-as-one-pleases	action	제멋대로 하다	2
keep-away-from	action	멀리하다	1
keep-what-is-shared-set-aside-what-is-not	action	같은 것은 취하고 다른 것은 두다	2
leave-behind	action	남겨 두다	1
leave-it-out	action	빼먹다	1
leave-them-wanting	action	마음에 안 차게 하다	1
let-it-take-its-own-course	action	되는 대로 두다	2
levy-and-collect	action	거두어들이다	1
make-them-sick-of-it	action	물리게 굴다	2
make-trouble	action	훼방하다	1
misplace	action	잘못 두다	1
not-one-chance-of-a-slip	action	만에 하나도 어긋남이 없다	2
photograph	action	촬영하다	1
pick-that-one	action	골라잡다	1
pinch	action	꼬집다	1
plan-out	action	계획하다	1
put-forward	action	제기하다	2
put-the-spring-back	action	새로 기운 나게 하다	2
put-through-its-paces	action	놀려 부리다	2
put-to-death	action	죽이다	1
radiate	action	방사하다	1
refine	action	갈고닦다	1
reinforce	action	공고히 하다	1
rely-on	action	의지하다	1
right-there-and-then	action	그 길로 곧바로	1
send-along-a-line	action	실어 보내다	1
send-on-assignment	action	파견하다	1
separate	action	떼어 놓다	1
settle-exactly-into-place	action	제자리에 놓이다	2
sit-idle-and-wait	action	손 놓고 있다	1
skip-it-this-time	action	거르다	1
step-in	action	손을 쓰다	1
stir-up-trouble	action	건드려 불러오다	1
stop-it-short-unfinished	action	덜 마치다	2
strive	action	분투하다	2
tell-apart	action	가려내다	1
tilt-up	action	치켜들다	2
type	action	타자를 치다	1
uncover	action	들추다	1
unfold-to-view	action	펼쳐 보이다	1
wait-and-see	action	관망하다	1
wear-into-fit	action	서로 맞춰지다	2
wear-smooth-by-rubbing	action	문질러 닳다	2
what-one-says-and-what-one-does	action	말과 몸가짐	2
a-burn-mark	body	덴 자리	1
acute-illness	body	급성의	1
catch-it-from-another	body	옮아 붙다	2
emergency-response	body	응급	1
four-limbs	body	사지	2
go-blind-by-degrees	body	눈이 멀어 가다	1
haircut	body	이발	1
health-care	body	건강 관리	1
how-bad-the-hurt-is	body	상처 정도	1
how-the-body-works	body	몸이 돌아가는 이치	2
one-caught-by-the-drug	body	마약에 빠진 이	1
save-the-dying-and-help-the-hurt	body	죽어 가는 이를 구하다	2
slow-and-long-lasting	body	천천히 오래가는	1
smell-trace	body	냄새 자취	2
the-body-one-was-born-with	body	타고난 몸바탕	2
the-good-it-does	body	효력	1
the-hardening-sickness	body	굳어 가는 병	2
the-hold-the-drug-takes	body	마약에 빠짐	1
the-joining-of-man-and-woman	body	살섞음	2
to-do-with-making-up-the-face	body	화장의	2
tooth-filling	body	충치 때움	2
turning-it-over-and-over-in-the-mind	body	잊지 못하고 되뇌다	2
urine	body	오줌	1
voice-timbre	body	목소리 결	1
a-big-picture-show	city	크게 만든 영화	2
a-crossing-place	city	길 건너는 데	2
a-deed-of-great-daring	city	큰 공	2
a-hired-killer	city	살수	2
a-picture-hall	city	그림 걸어 두는 곳	2
a-piece-of-startling-news	city	떠들썩한 소식	1
a-place-to-stay	city	거처	1
a-position-held	city	버티는 자리	2
a-short-light-piece	city	짧고 가벼운 놀이	2
a-swap-made	city	맞바꿈	1
a-way-in-that-others-miss	city	길수	2
a-word-of-greeting	city	아는 체 인사	1
answer-the-charge	city	답변하다	1
anybody-at-all	city	누구든 한 사람	2
arrange	city	마련하다	1
barrier	city	장벽	1
be-at-feud-with-them	city	원수로 지내다	1
before-the-voting	city	선거 앞의	2
bodhisattva	city	보살	1
boil-with-outrage	city	분개하다	1
breakthrough-gap	city	돌파구	2
bring-good-to-people	city	복이 되게 하다	2
cheer-them-on	city	갈채하다	2
come-forward-of-ones-own-accord	city	스스로 나와 밝히다	2
community	city	지역 사회	1
dare-them-to-answer	city	도발하다	1
destroy	city	파괴하다	2
district	city	구역	1
festive	city	경사스러운	2
follow-track	city	뒤를 밟다	2
for-good-and-all	city	아주 영영	1
hear-the-case-through	city	재판을 맡아 보다	2
help-sent-from-outside	city	바깥에서 오는 도움	2
hold-the-reins-over-all-of-it	city	거느려 다스리다	2
inscription	city	새김글	2
kept-down-by-the-fear-of-force	city	힘으로 겁주어 누르다	2
kind-to-all-people	city	인정 있는	1
lay-claim-to-it	city	제 몫이라 내세우다	1
leak-of-secret	city	비밀 누설	2
liberate	city	해방하다	1
lift-the-siege-off-them	city	에움을 풀어 주다	2
many-wills-make-a-wall	city	여럿의 뜻이 성이 되다	2
matters-of-the-army	city	군에 관한 일	2
meant-for-reading	city	책 읽는	2
ministry	city	정부 부처	2
of-the-whole-nation	city	나라 전체의	2
on-the-lower-side	city	아래쪽의	1
on-the-upper-side	city	위쪽의	1
one-s-own-private	city	제 것인	2
one-who-holds-the-same-cause	city	뜻을 같이하는 이	2
one-who-stirs-the-crowd	city	선동하는 이	1
opposition	city	반대편	2
pave-a-road	city	길을 깔다	2
people-of-the-net	city	인터넷 쓰는 이	2
people-of-the-world-at-large	city	세상 사람	1
plan-it-all-as-one	city	두루 꿰어 짜다	2
premises	city	점포	2
property	city	재산	1
put-it-out-openly	city	밝혀 알리다	2
put-them-low-before-all	city	업신여겨 낮추다	2
put-to-death-by-shot	city	총으로 쳐 죽이다	1
reach-far-enough-to-endanger	city	미쳐서 위태롭게 하다	2
revive-a-trade	city	진흥하다	1
right-at-the-middle-of-it	city	한가운데의	1
road-section	city	도로 구간	1
royal-court	city	궁정	1
squeeze-them-for-it	city	을러 뜯다	2
tell-what-they-are-like	city	됨됨이를 말하다	1
the-curtain-before-it-rises	city	막이 오르기 전	1
the-land-of-ones-fathers	city	아버지 나라	2
the-lettered-sort-of-folk	city	배운 층	2
the-lord-of-the-dead	city	저승을 다스리는 이	2
the-market-worth-of-it	city	저자에서 매겨진 값	2
the-mixing-of-people	city	사람 사귀는 자리	2
the-name-people-look-up-to	city	우러러보는 이름	2
the-one-living-there	city	들어 사는 이	1
the-one-most-to-blame	city	앞장선 우두머리	2
the-one-that-holds-power	city	다스리는	2
the-one-who-commands-the-army	city	군을 거느리는 이	2
the-one-who-goes-first	city	앞장선 이	2
the-taking-of-a-life	city	사람 죽임	1
this-one-here	city	이 하나	2
throwing-ones-weight-about	city	기세로 남을 누르다	2
well-off-and-well-defended	city	넉넉하고 굳세다	2
what-the-people-want	city	백성의 뜻	1
without-any-right-at-all	city	권리 없는	1
how-it-sits-on-you	clothes	옷맵시	2
patch	clothes	천 조각 덧댐	1
fit-it-to-oneself	everyday	제 것으로 맞추다	2
outfit	everyday	옷차림	1
pass-on-a-message	everyday	전언하다	1
prize-win	everyday	당첨	1
remind	everyday	일깨우다	2
sort-the-recycling	everyday	재활용을 나누다	2
unhurried	everyday	한가한	1
a-line-of-blood	family	핏줄 갈래	2
a-word-given	family	약속한 말	2
carry-a-torch-for-them	family	사모하다	1
felt-right-to-the-bone	family	절실하다	1
group	family	무리	1
guard-against	family	경계하다	2
keep-a-watch-over-them	family	지켜 보살피다	2
keep-them-at-arms-length	family	꺼려 멀리하다	1
marriage-union	family	혼인	1
share-in-what-they-feel	family	마음을 같이하다	2
stay-as-a-guest-in-another-house	family	남의 집에 손으로 머물다	2
the-oldest-hand-of-them-all	family	오래 묵은 어른	2
the-one-whose-heart-is-given	family	정을 준 사람	2
the-place-the-forebears-came-from	family	조상이 살던 본 고장	2
the-quiet-joy-of-a-household	family	집안이 누리는 낙	2
upbringing	family	양육	2
brew-up	food	무르익히다	2
drinks-and-liquor	food	주류와 음료	2
loaf	food	긴 빵	2
the-drying-of-it	food	말리기	2
the-one-at-the-table	food	밥 먹는 이	2
everyday-living	home	나날의 살림	2
have-a-gap-broken-out	home	한 귀가 떨어져 나가다	1
homecoming	home	귀환	1
longed-for-waking-and-sleeping	home	자나 깨나 바라다	1
move-house-to-it	home	옮겨 살다	2
plunger	home	압축기	2
set-it-out-ready	home	차려 놓다	1
set-them-out-anew	home	다시 늘어놓다	2
tell-them-what-to-do	home	일러 시키다	2
the-one-who-owns-the-house	home	집 가진 이	1
a-play-that-wrings-tears	idea	눈물극	2
a-showing-it-to-be-false	idea	뒤집는 말	2
accusation	idea	고발	1
accuse	idea	탓하다	2
architecture	idea	건축	1
as-the-money-goes	idea	돈 쪽으로	2
aspect	idea	방면	1
be-loyal-to	idea	충실하다	1
best-of-all-ways	idea	가장 좋기로는	2
burst-and-come-to-nothing	idea	깨져 사라지다	2
carrying-real-weight	idea	뜻있는	1
charity-aid	idea	구호	2
close-knit	idea	긴밀한	1
come-round-to-it	idea	그러자고 하다	2
composure	idea	침착	1
construction-work	idea	건설	2
conversation-talk	idea	담화	1
current-state	idea	현황	1
deed-act	idea	행위	1
expand-outward	idea	확장하다	1
feeling-the-very-same-way	idea	같이 느낌	1
form-it-up-whole	idea	이루어 놓다	2
go-on-being-there	idea	있어 오다	1
hang-upon-it	idea	매여 있다	2
heritage-legacy	idea	유업	1
hold-a-doubt	idea	미심쩍어하다	1
how-it-all-ended	idea	결말	1
how-it-all-ends-up	idea	끝에 가 닿는 꼴	2
how-things-stood-at-the-time	idea	그때 그 자리 형편	1
in-line-with-that	idea	그에 맞추어	1
it-takes-doing	idea	그럴 것이 든다	1
keep-ones-word	idea	신의를 지키다	2
kindness	idea	선함	1
leaning-on-another	idea	기대어 삶	1
leap-forward	idea	비약	1
lift-it-to-a-higher-form	idea	한 단 올라서다	2
likely-enough-to-happen	idea	그럴 법한	2
literacy	idea	문해력	2
lying-at-the-base	idea	바탕이 되는	2
make-allowances-for-them	idea	헤아려 주다	1
meet-like-drifting-weed	idea	뜨내기로 만나다	2
mislead	idea	오도하다	2
mocking-by-twisting-it	idea	비틀어 웃기는	1
name-and-gain-together	idea	이름과 잇속	2
of-the-nationalist-kind	idea	민족주의의	1
panic	idea	공황	1
patience	idea	인내	1
predict	idea	예언하다	2
progress	idea	진보	1
put-a-number-on-it	idea	수치로 매기다	2
reckon-it-beforehand	idea	미리 헤아리다	1
relief-easing	idea	안도	1
risk	idea	위험 부담	1
savings	idea	저축	1
saying-it-is-so-indeed	idea	그렇다고 하는	2
set-one-against-the-other	idea	맞세우다	2
set-straight-on-one-aim	idea	뜻을 곧게 세운	2
shortage-scarcity	idea	희소성	1
show-it-to-be-untrue	idea	아니라고 뒤집다	2
sign-trace	idea	징조	2
skill-mastery	idea	기량	1
speak-the-thought-out	idea	말로 내놓다	2
standing	idea	지위	1
string-of	idea	줄줄이 이어진	1
structure	idea	구조	1
that-is-truly-there	idea	참으로 있는	2
that-will-be-no-trouble	idea	쉽게 될 일이다	2
the-creed-one-stands-on	idea	내걸고 따르는 줏대	1
the-hidden-turn-of-it	idea	숨어 있는 묘한 이치	2
the-knot-of-it	idea	맺힌 곳	2
the-real-thing	idea	본바닥	2
the-sinking-of-hope	idea	낙담	1
the-taking-in-of-it	idea	알아들음	1
the-verdict-that-has-set-hard	idea	굳어진 판가름	2
the-very-last	idea	궁극	2
the-wit-one-has	idea	슬기	1
think-it-all-the-way-through	idea	끝까지 궁리하다	2
think-the-thing-up	idea	궁리해 내다	2
together-with-it	idea	~와 더불어	2
trait	idea	성질	2
upper-limit	idea	윗한도	2
upright-spirit	idea	바른 기운	1
what-brought-it-on	idea	일을 일으킨 것	1
work-out-what-they-mean	idea	미루어 헤아리다	1
a-person-of-real-skill	job	재주 있는 사람	2
a-show-of-many-turns-mixed	job	여러 재주를 섞은 놀이	2
a-turn-of-real-wit	job	남다른 궁리	2
advisor	job	고문	1
ask-above-before-acting	job	여쭈어 정하다	2
carry-on-what-was-handed-down	job	받들어 잇다	2
chance-it-for-a-quick-gain	job	요행을 노려 손대다	2
come-out-right-in-the-end	job	되어 나오다	2
demand-to-be-made-good	job	물어내라 하다	1
each-completing-the-other	job	서로 도와 이루다	2
earn-a-little-on-the-side	job	곁벌이하다	2
earn-a-mark-of-merit	job	공을 세우다	1
forge-create	job	벼려 만들다	1
glad-at-it-hour-after-hour	job	즐거워 지칠 줄 모르다	1
go-by-ones-own-decision	job	제 뜻대로 하다	1
go-by-what-actually-works	job	실속을 좇다	2
held-in-honour	job	명예로운	1
innkeeper	job	술집 주인	2
it-did-the-trick	job	효험을 보다	1
it-follows-of-itself	job	이치대로 되다	2
journalism	job	언론	1
keep-ones-head-down-and-work	job	묵묵히 애써 일하다	2
keeping-in-with-the-outside-world	job	바깥과 사귀는 일	2
lay-the-voice-over-it	job	소리를 입히다	2
lost-along-the-way	job	전해지지 않다	2
main-strength	job	주력	1
make-the-good-better-still	job	좋은 것을 더 좋게	2
moving-along-with-the-times	job	때와 함께 나아가다	2
never-having-done-it	job	겪어 보지 못함	1
not-pressed-hard-enough	job	힘이 모자라다	1
nothing-left-unattended-to	job	빠뜨린 데 없이 두루 미치다	2
one-who-sets-it-all-up	job	주최자	1
owner	job	소유자	2
post-of-duty	job	직위	1
put-out-a-call-for-them	job	수배하다	1
putting-out-fresh-effort-again	job	거듭 힘을 내다	2
ready-to-start-things	job	앞장서는	2
receive-guests	job	접대하다	1
see-the-worth-in-them	job	알아보아 주다	2
shining-in-the-records	job	혁혁하다	2
short-of-the-mark	job	모자라게	2
sit-for-a-picture	job	사진에 찍히다	1
stake-it-on-a-chance	job	위태롭게 걸다	2
summon	job	소집하다	1
take-it-in-under-one	job	끌어들여 넣다	2
the-calling-one-is-born-to	job	타고난 부름	1
the-charge-laid-upon-one	job	맡겨진 큰 일	2
the-doings-of-them	job	하는 일들	1
the-first-of-its-kind	job	처음 만들다	1
the-law-clerks-helper	job	법률 사무 돕는 이	1
the-making-of-new-things	job	지어내는 일	2
the-one-looking-for-it	job	찾는 이	2
the-one-who-fits-it-together	job	조정자	2
the-one-who-picks-staff	job	사람 뽑는 이	2
the-very-first-lot-of-them	job	맨 처음 무리	2
the-very-front-of-it	job	맨 앞자리	1
the-whole-shape-already-in-mind	job	속에 셈이 서 있다	2
throw-oneself-into-it	job	몸을 던지다	2
toil-at-it	job	애써 일하다	2
toil-on-through-hardship	job	고생하며 애쓰다	2
two-strings-to-the-bow	job	두 가지 수	2
way-of-handling-it	job	다루는 솜씨	2
work-away-at-it-for-years	job	죽 일하다	2
work-away-for-hire	job	품을 팔아 일하다	2
a-river-basin	nature	강물이 모이는 땅	2
altitude	nature	해발	1
atmosphere	nature	대기권	2
battered-by-wind-and-rain	nature	비바람에 시달리다	2
catch-the-worst-of-it	nature	화를 입다	2
channel-away	nature	물길을 터주다	1
coming-on-in-full-vigour	nature	한창 뻗어 나가다	2
condense	nature	응결하다	1
creep-in-and-spread	nature	생겨나 퍼지다	2
densely-spread	nature	빽빽이 깔리다	1
dried-up	nature	고갈된	1
fall-away-year-by-year	nature	쇠해지다	2
farmstead	nature	농가 살림	1
first-light	nature	서광	2
flourishing	nature	왕성한	2
flowering-plants	nature	화훼	2
foreshadow	nature	예시하다	2
fresh-water	nature	민물	1
galaxy	nature	은하	2
go-under-for-good	nature	망하여 없어지다	2
grow-on-and-on	nature	자라 나가다	2
hold-the-greater-part	nature	더 많이 차지하다	1
in-the-teeth-of-it	nature	거스르고	1
keep-each-other-company	nature	짝하여 지내다	2
knocked-back-by-it	nature	꺾이다	1
march-out-to-war	nature	싸우러 나가다	1
mountain-area	nature	산간	1
ocean	nature	대양	1
one-after-another-rising	nature	잇따라 일어나다	1
poison	nature	독	1
poultry	nature	가금	2
ray	nature	광선	1
regrowth	nature	재생	2
residue-left	nature	잔류물	1
rich-harvest	nature	풍성한 결실	1
running-every-way-unchecked	nature	가로세로로 거침없이 뻗다	2
saturated	nature	포화된	2
seep-away-and-be-lost	nature	새어 없어지다	2
sharp-with-frost	nature	서리 매운	1
sink-lower-and-lower	nature	낮아지다	1
source-spring	nature	발원지 샘	2
stagnate	nature	정체되다	1
surging-and-swelling	nature	세차게 일렁이다	1
the-fit-last-and-the-weak-go	nature	나은 것이 남고 못한 것이 밀리다	2
the-land-far-from-the-sea	nature	바다에서 먼 안쪽 땅	1
the-taking-of-game	nature	짐승 잡기	2
the-taking-of-shape	nature	꼴 잡힘	2
the-turning-weather-of-the-times	nature	어수선히 뒤바뀌는 판	2
the-way-it-runs	nature	흘러가는 쪽	2
what-they-all-have-in-common	nature	두루 같은 바탕	2
wild-animal	nature	야수	1
worship	nature	숭배	1
a-ruled-table-of-rows	number	칸 표	2
an-even-result	number	비김	2
an-index-number	number	지수	1
calibrate	number	눈금을 매기다	2
count-one-by-one	number	낱개로 세다	2
down-to-the-last-bit	number	에누리 없이	1
dozen	number	한 다스	1
drop-range	number	낙폭	1
grow-twofold	number	곱절로 늘다	1
high-price	number	고가	1
level-it-off	number	고르게 하다	1
line-the-bottom	number	바닥을 받치다	1
of-two-years-standing	number	두 해짜리	1
pay-over-the-odds	number	값을 더 치르다	2
piling-up-as-it-goes	number	쌓여 가는	1
power-output	number	출력	1
push-it-to-the-top	number	가장 크게 하다	1
side-of-figure	number	쪽	1
take-that-much-off	number	빼내다	1
ten-thousand	number	만	1
the-even-share-per-year	number	해마다 고른 몫	1
the-money-of-europe	number	유로화	1
the-slide-downward	number	내리막	1
tiny-of-its-kind	number	꼬마만 한	2
unit-price	number	낱값	1
yet-more-of-it	number	아직 더	1
a-crooked-way-of-doing-things	office	비뚤어진 버릇	2
a-general-meeting	office	여럿이 모여 의논함	1
a-great-mass-of-data	office	큰 자료 더미	2
a-making-it-more-exact	office	더 또렷이 함	1
a-pledge-all-agree-to-keep	office	다 같이 지키기로 한 약속	2
a-public-declaration	office	내걸어 밝힌 말	2
availability	office	빈자리 여부	2
bargain	office	흥정	1
be-so-good-as-to-come	office	삼가 청하다	1
by-wire-and-current	office	전자로	1
catch-them-and-deal-with-them	office	적발해 다스리다	1
citizenship	office	국적	1
clue	office	단서	1
detail	office	세부	1
draw-in-the-money-to-work-with	office	밑천을 끌어오다	1
fill-in-form	office	기입하다	2
finance	office	돈을 대다	1
hand-over-what-is-due	office	바쳐 내다	2
handing-the-firm-over	office	넘겨받기	2
hold-it-in-charge	office	맡아 다스리다	2
holding-that-one-post-only	office	그 일만 맡은	2
interrupt	office	방해하다	1
left-without-naming-it	office	딱 집지 않은	2
meant-to-draw-custom	office	홍보용의	1
mortgage	office	저당	1
obtain	office	얻다	1
offer	office	내주다	1
one-of-those-who-mark-it	office	가려 매기는 사람	1
out-of-ones-own-pocket	office	제 돈으로	1
page	office	쪽면	1
partnership-firm	office	동업	1
photography	office	사진술	1
pin-it-down-exactly	office	잡아 정하다	2
plan-it-all-from-the-tent	office	장막 안에서 꾀하다	1
pressing-just-now	office	지금 긴한	2
put-it-down-as-true	office	맞다고 적어 주다	1
put-it-into-exact-words	office	말로 다듬다	2
reckon-up-and-raise	office	셈하여 마련하다	2
resignation	office	사임	1
saying-it-is-so	office	증명해 줌	2
see-it-actually-done	office	다져 이루다	2
see-to-it-beforehand	office	미리 헤아려 두다	2
set-aside-for-one	office	따로 떼어 둔 몫	1
store-away	office	보관하다	2
stress-relief	office	스트레스 풀기	1
strip-them-of-the-post	office	벼슬을 떼다	1
talk-it-up-out-of-nothing	office	띄워 올리다	2
tax-refund	office	세금 환급	1
the-business-of-taxes	office	세금 매기고 걷는 일	1
the-change-put-in	office	손질해 고침	2
the-firms-own	office	회사 상표의	2
the-head-of-it	office	우두머리	1
the-house-that-spreads-it	office	돌려 파는 곳	1
the-makers-mark	office	상표 그림	1
the-one-picked-for-it	office	뽑아 올린 사람	2
the-one-who-answered	office	답한 이	2
the-one-who-supplies	office	대주는 이	2
the-papers-in-order	office	서류 갖춤	2
the-top-of-the-sheet	office	편지지 머리	2
the-yearly-report	office	해마다 내는 보고	2
to-do-with-one-section	office	부서 쪽의	2
to-do-with-running-it	office	경영 쪽의	2
to-do-with-state-money	office	나라 살림의	2
to-do-with-the-setup	office	조직 쪽의	1
turning-with-little-to-show	office	헛돌아가는	2
two-firms-made-one	office	회사 합침	2
variant	office	변형	1
weighty-enough-to-tip-the-scale	office	한쪽으로 판가름하다	2
with-nobody-saying-yes	office	허락 없는	1
word-sent-on	office	알리는 글	2
you-can-get-it-back	office	돌려받을 수 있는	1
a-good-many	quality	여럿의	2
advanced	quality	선진의	1
an-ordinary-person	quality	여느 사람	1
at-a-standstill	quality	멎어 있다	2
beyond-what-is-due	quality	분수를 넘어	2
broken	quality	부서진	1
by-a-single-hair	quality	천균일발	2
by-a-wide-margin	quality	확 크게	2
comely	quality	아리따운	1
comprehensive	quality	전면적인	1
dear-to-pay-for	quality	값이 많이 드는	1
dense	quality	빽빽한	1
done-rightly	quality	옳게	2
dragging-on-and-on	quality	길게 끄는	2
draw-it-all-in	quality	삼가 거두다	1
easy-and-unhurried-in-manner	quality	거리낌 없이 시원하다	1
everywhere-at-once	quality	널리 번지다	2
fine-and-clear-to-look-at	quality	생김이 훤하다	1
go-numb	quality	저리다	1
go-out-of-date	quality	낡다	2
going-by-what-is-felt	quality	느낌으로 받아들이는	2
held-in-respect	quality	높이 받드는	1
higher-level	quality	고등의	1
higher-than	quality	웃돌다	1
holding-oneself-in-regard	quality	스스로를 높이 여기다	2
holds-up-under-strain	quality	오래 견디는	1
huge	quality	거대한	1
in-no-way	quality	도무지	2
intense	quality	격렬한	2
kept-out-of-sight-within	quality	겉으로 안 드러나는	1
kicked-over-in-anger	quality	분하고 노엽다	2
let-them-down-badly	quality	낭패 보게 하다	2
lively	quality	활발한	1
looking-kindly-on-it	quality	좋게 보아 주는	2
low-down-and-poorly-thought-of	quality	낮게 여겨지다	1
lower-than	quality	밑돌다	1
lying-on-the-outside	quality	바깥에 있는	2
many-sided	quality	여러 갈래의	1
not-like-real-life	quality	실제 같지 않은	2
not-quite-trusting-it	quality	미덥지 않은	1
of-a-newly-made-kind	quality	새로 나온 꼴의	2
on-equal-terms	quality	동등한	2
pleasing-to-have	quality	마음에 드는	2
powerful	quality	강력한	1
promising	quality	유망한	1
public-shared	quality	공공의	2
quick-to-answer-a-need	quality	잘 살펴 주는	2
setting-oneself-up-as-that	quality	내세워 자랑하다	1
sneering-at-it-all	quality	냉소하는	2
square-shaped	quality	모난	2
taken-from-one-side-only	quality	한쪽만의	2
taken-in-the-narrow-sense	quality	좁게 잡은 뜻	2
that-tells-them-apart	quality	가려내는	2
the-look-of-a-thing	quality	보이는 모습	1
the-one-in-the-seat-now	quality	지금 맡고 있는	1
the-weak-side-of-it	quality	약한 부분	1
throwing-their-weight-about	quality	횡포하다	2
to-some-degree-or-other	quality	많든 적든	1
turned-in-on-itself	quality	안으로 향하는	2
turning-out-plenty	quality	잘 만들어 내는	1
void-of-any-sense	quality	뜻 없는	2
what-may-not-be-treated-lightly	quality	함부로 못 하는 값어치	1
with-many-parties-in-it	quality	여러 쪽이 함께하는	2
without-bending-it	quality	엄하게	2
wonderfully-good	quality	놀랍도록 좋은	2
you-cannot-count-on-it	quality	못 미더운	1
a-book-on-one-subject-alone	school	한 가지를 파고든 책	2
a-class-hour	school	배우는 시간	2
a-famous-work	school	이름난 책	2
a-head-for-other-peoples-feelings	school	마음 헤아리는 밝기	1
a-look-before-the-day	school	미리 보기	1
a-set-form-to-follow	school	틀에 박힌 식	2
a-setting-down-in-words	school	적어 그린 글	1
a-teaching-taken-on-trust	school	틀에 박힌 가르침	2
a-union-of-states	school	연방체	2
a-word-of-correction	school	한마디 지적	2
academic-study	school	학술	1
at-the-very-start	school	첫머리의	2
concentrate-on	school	전념하다	1
definition	school	뜻매김	2
dig-for-the-answer	school	캐어 찾다	2
ending	school	맺음	2
engineering-faculty	school	공과	2
every-point-in-its-place	school	조리가 반듯하다	2
full-of-things-to-learn	school	알려 주는 게 많은	2
gained-a-great-deal-from-it	school	적잖이 득을 보다	1
gather-it-into-one	school	모아 엮다	1
gather-ones-mind-in	school	마음을 모으다	2
gather-the-stuff-to-work-from	school	감을 얻어 오다	2
giving-and-taking-back	school	주고받는	2
going-over-it-again	school	고쳐 다듬기	2
hands-enough-to-teach	school	가르칠 사람	1
having-the-knack	school	능숙함	2
idea	school	발상	2
in-the-english-tongue	school	영어로	1
long-have-i-looked-up-to-you	school	오래 우러러 왔다	2
lump-them-all-together	school	한데 묶어 말하다	2
meant-for-learning	school	배움의	2
meant-to-explain	school	풀이하는	2
one-step-at-a-time-in-order	school	차례를 밟아 나아가다	2
one-taken-into-the-academy	school	학사원에 든 사람	2
paid-for-out-of-public-funds	school	관에서 내는 돈으로	2
pause-rest	school	쉼	1
poetry	school	시가	2
polish-the-character	school	닦아 기르다	2
pour-the-heart-out-on-paper	school	마음을 풀어 쓰다	2
putting-it-in-other-words	school	다시 말함	2
quote-out-of-context	school	제멋대로 끊어 쓰다	2
rising-falling-and-pausing	school	오르내리며 끊고 맺다	2
rule-book	school	조례집	2
saying-idiom	school	관용구	2
seen-at-the-smallest-scale	school	아주 작은 데서 보는	2
seen-whole-from-far-off	school	크게 멀리서 보는	2
set-out-the-argument	school	논하여 펴다	2
set-phrase	school	성어	2
stage-play	school	희곡	1
strive-hard-for-it	school	힘써 구하다	2
sum-it-into-one	school	하나로 묶어 말하다	2
teaching-and-learning	school	가르쳐 익힘	2
the-art-of-painting	school	그림 그리는 일	1
the-eight-trigrams	school	여덟 괘	2
the-hint-given-with-a-look	school	눈으로 주는 낌새	2
the-list-of-what-is-inside	school	책 차례	2
the-one-field-one-is-trained-in	school	파고든 전공	2
the-row-of-letters	school	자모 차례	2
the-shape-of-the-letters	school	글자 모양	2
the-study-of-language	school	어학	2
the-talk-of-one-trade	school	끼리말	2
the-tier-up-above	school	위쪽 층	2
time-and-place-together	school	때와 자리	1
to-do-with-editing	school	편집 쪽의	1
to-do-with-language-study	school	어학의	1
to-do-with-the-university	school	대학의	1
what-is-really-going-on	school	있는 그대로의 판	2
widely-read-in-many-things	school	널리 배워 아는	2
competition	sport	경기 대회	1
defence	sport	방어	1
game	sport	놀이	1
let-the-shot-go	sport	발사하다	1
meant-for-playing	sport	노는 데 쓰는	1
opponent	sport	맞수	2
part-of-the-big-plan	sport	큰 그림의	2
supporter	sport	응원단원	2
the-one-who-is-mad-for-it	sport	푹 빠진 이	2
trump-card	sport	으뜸패	1
what-the-body-can-do	sport	몸을 쓰는 힘	2
winning-and-losing	sport	이기고 짐	2
after-the-event	time	사후	1
always-in-that-way	time	늘 그렇게	2
and-next-after-that	time	그다음으로	2
before-one-knows-it	time	저도 모르는 사이	2
before-that-time	time	앞서	2
coffee-break	time	커피 쉬는 시간	2
come-round-again	time	되풀이해 오다	2
come-to-one-in-sleep	time	꿈에 뵈다	2
coming-round-every-year	time	해마다 돌아오는	1
coming-round-in-turn	time	때맞춰 되풀이하는	2
evolve	time	변천하다	1
first-third-of-month	time	상순	1
growing-greater-by-the-day	time	날로 늘어나다	1
hours-you-choose	time	자유 근무 시간	1
in-all-times-and-places	time	예나 지금이나	1
live-it-out-to-the-end	time	끝까지 살다	1
lunar-calendar	time	음력 달력	1
night-joined-on-to-day	time	밤낮을 잇다	2
no-time-to-spare	time	겨를이 없다	1
not-yet-as-things-stand	time	아직 그러지 못하다	1
one-day-just-like-the-last	time	날마다 똑같이	1
one-of-the-same-times	time	같은 때 사람	2
right-away-then	time	대뜸	1
seeing-how-things-stand	time	그것을 보아서	2
the-first-one	time	첫째의	2
time-it-right	time	때맞추다	1
time-slot	time	시간 토막	2
too-late	time	미처 못 하다	1
up-to-this-point	time	여기에 이르러	1
what-is-going-on-just-now	time	그때그때의 세상일	2
with-no-time-to-spare	time	다급하게	2
working-week	time	근무 주간	2
carpool	transport	합승	1
goods-sent-on-trust	transport	맡겨 보낸 짐	2
high-altitude	transport	높은 상공	1
out-of-control	transport	통제 불능의	2
pull-in-and-park	transport	차를 대다	1
spin-the-wheels	transport	헛바퀴 돌다	2
the-loop-you-hold	transport	손잡이 끈	2
the-one-in-the-saddle	transport	타고 가는 이	2
the-shop-that-sells-cars	transport	판매 대리점	2
the-thing-that-carries	transport	나르는 것	1
to-do-with-motor-cars	transport	자동차 쪽의	2
a-man-of-russia	travel	러시아 국민	1
a-road-that-runs-far-ahead	travel	앞길이 아득히 멀다	2
a-way-through	travel	지나가는 길	2
boardwalk	travel	널판 산책로	2
brake	travel	제동 장치	2
carried-along-against-ones-will	travel	제 뜻대로 되지 않다	2
everything-counted-in	travel	다 넣은	2
explore	travel	탐색하다	2
from-every-corner-of-the-land	travel	사해 곳곳에서	1
get-a-taste-of-it	travel	맛보아 알다	2
go-abroad	travel	출국하다	1
historic-site	travel	고적	2
horse-cart	travel	말수레	2
in-a-sorry-state	travel	낭패	1
insect-repellent	travel	방충제	2
known-for-miles-around	travel	멀리까지 이름나다	1
of-chinese-stock	travel	중국 핏줄의 사람	2
of-england	travel	영국의	1
of-france	travel	프랑스의	1
of-germany	travel	독일의	2
of-spain	travel	에스파냐의	2
on-ahead-that-way	travel	앞쪽으로	1
one-who-left-the-country	travel	나라 떠난 이	2
outside-the-borders	travel	나라 밖	2
past-the-side-of-it	travel	곁을 지나	2
porthole	travel	선창	2
roads-running-every-way	travel	사방으로 뚫리다	1
running-across-borders	travel	나라를 넘나드는	2
straight-on-without-turning	travel	곧장 앞으로 나아가다	2
the-flow-of-passengers	travel	드나드는 손님의 물결	1
```

## 3. 표본 다시 재기

일곱 언어에서 지금 예문 300줄씩을 무작위로 뽑아 지난번(2026-11-01) 표와 같은 잣대로 잰다.

입력 열: `slug lang i answer term pos text ko file other_example meaning_ko`. `answer`는 빈칸이
되는 말이다(일본어는 가나 읽기). 줄마다 판정한다.

- `ok` — 자연스럽고 맞고 그릴 수 있다. `ko`가 문장 그대로다.
- `broken` — 비문, 어색한 연어 · 직역, 격언 · 그릴 수 없는 일반론, 현대어에 옛 · 시골 배경, 표제어의 다른 뜻,
  (ja) 어절 띄어쓰기 · 한자 · 히라가나 외래어, (zh) 반각 문장부호 · 물음에 。, (de) 어미 없는 한정 형용사.
- `ko` — 문장은 맞는데 한국어 줄이 틀렸다. 번역투, 뜻 바뀜, 내용 누락, she → 그, 비문.
- `term` — 표제어가 `meaning_ko`에 안 맞는다.

취향 차이는 세지 않는다. 오류율은 문장 · 한국어 줄 · 첫째와 둘째 예문으로 나눠 적고, 잣대가 바뀌면
표에 함께 밝힌다. 영어 한국어 줄은 전수 점검에서 9.6%를 고쳤는데 표본은 6.0%였다. 두 값은 잣대가
달랐으니 곧바로 비교하지 않는다.
