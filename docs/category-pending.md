# category가 품사와 어긋난 개념 — 임자가 고칠 곳

확인일: 2026-09-28. 손대지 않은 이유는 하나다 — **내가 만든 개념이 아니라서**다
([concurrent-sessions.md](concurrent-sessions.md)).

**고치고 나면 그 줄을 지운다.**

## 왜 문제인가

오답 보기는 **같은 category에서** 뽑는다 (`lib/entries.ts`의 `pool`). 동사구가
`adjective`로 적혀 있으면 그 카드의 보기는 형용사로 채워지고, 진짜 형용사
카드에는 동사구·명사구가 보기로 섞인다. **품사 모양만 보고도 오답이 걸러진다.**
퀴즈가 깨지지는 않으므로 `pnpm check`는 통과한다 — 그래서 여태 안 보였다.

잣대는 일곱 언어의 `part_of_speech`다. **다섯 언어 이상이 같은 품사**인데
`category`가 다르면 적었다. 뜻줄(`meaning_ko`)도 대개 그 품사로 끝난다
(「겁먹다」·「타격」). 고칠 때는 `category`만 바꾸면 된다 — 그림도 예문도
그대로다.

## 따로 적는 둘 — 독일어 표제어

| 낱말 | 무엇이 틀렸나 |
| --- | --- |
| `city/take-place-as-planned` de | `zustande gehen`은 없는 말이다. `zustande kommen`(성사되다)이나 곁말의 `stattfinden`(열리다)을 표제로 올린다. 예문 둘도 같이 고친다 |
| `city/playground` de | 표제 `Schulhof`는 **학교 운동장**이다. 그림(그네가 선 마당)과 뜻줄 「놀이터」에는 곁말의 `Spielplatz`가 맞는다. 예문의 한국어도 「운동장」이라 뜻이 둘로 갈려 있다 |

## category를 바꿀 314개

### `adjective` → `verb` (158개) — 일곱 언어가 동사다

| 개념 | 뜻 |
| --- | --- |
| `action/trudge-along-slowly` | 터벅터벅 걷다 |
| `action/sit-idle-and-wait` | 손 놓고 있다 |
| `action/stop-it-short-unfinished` | 덜 마치다 |
| `action/trade-blows-with` | 치고받다 |
| `action/turn-oneself-around` | 돌아서다 |
| `action/let-fly-with-bad-words` | 욕하다 |
| `action/shift-along-a-bit` | 비켜 앉다 |
| `action/tear-right-through` | 찢어지다 |
| `action/hide-it-well-away` | 감추다 |
| `action/hit-the-mark-square` | 과녁에 맞다 |
| `action/turn-it-into-another` | 딴것으로 만들다 |
| `action/lead-them-out-of-it` | 데리고 나가다 |
| `action/run-out-of-the-place` | 뛰어 나오다 |
| `action/run-right-past-it` | 뛰어 지나다 |
| `action/slide-on-down-it` | 미끄러져 내려가다 |
| `action/drive-them-on-hard` | 몰아대다 |
| `body/turn-the-eye-to-it` | 눈길을 돌리다 |
| `body/catch-it-from-another` | 옮아 붙다 |
| `body/take-a-fright` | 겁먹다 |
| `body/eat-ones-fill-up` | 배불리 먹다 |
| `body/drink-deep-of-it` | 잔뜩 마시다 |
| `body/sharpen-and-worsen` | 심해지다 |
| `body/wear-oneself-right-out` | 지나치게 지치다 |
| `body/get-ones-hair-cut` | 머리를 깎다 |
| `body/bite-right-into-it` | 물다 |
| `body/grow-young-again` | 젊어지다 |
| `body/talk-out-of-ones-head` | 헛소리하다 |
| `body/strike-them-powerless` | 마비시키다 |
| `body/spit-on-the-ground` | 침 뱉다 |
| `body/give-off-a-smell` | 냄새가 나다 |
| `body/go-blind-by-degrees` | 눈이 멀어 가다 |
| `city/be-the-property-of` | ~의 것이다 |
| `city/boil-with-outrage` | 분개하다 |
| `city/get-loose-and-free` | 풀려나다 |
| `city/give-ones-own-name` | 제 이름을 대다 |
| `city/take-place-as-planned` | 열리다 |
| `city/draw-them-in-toward-it` | 끌어당기다 |
| `city/set-upon-them-hard` | 덤벼들다 |
| `city/found-it-in-the-first-place` | 처음 세우다 |
| `city/tell-what-they-are-like` | 됨됨이를 말하다 |
| `city/rule-over-the-place` | 다스리다 |
| `city/speak-rough-to-them` | 함부로 말하다 |
| `city/put-them-low-before-all` | 업신여겨 낮추다 |
| `city/leave-the-country-for-good` | 나라를 떠나 살다 |
| `city/move-them-to-safety` | 피난시키다 |
| `city/be-at-feud-with-them` | 원수로 지내다 |
| `city/come-in-and-settle-here` | 들어와 살다 |
| `city/lay-claim-to-it` | 제 몫이라 내세우다 |
| `city/drop-bombs-on-it` | 폭탄을 떨구다 |
| `clothes/put-clothes-on-them` | 입혀 주다 |
| `family/kiss-one-another` | 서로 입맞추다 |
| `family/meet-one-another` | 서로 만나다 |
| `family/fall-for-someone` | 반하다 |
| `family/play-the-fool-about` | 장난치다 |
| `family/make-merry-together` | 흥겹게 놀다 |
| `family/become-friends-with` | 벗이 되다 |
| `family/feel-for-them-in-trouble` | 딱하게 여기다 |
| `family/share-in-what-they-feel` | 마음을 같이하다 |
| `family/go-back-on-them` | 저버리다 |
| `family/be-jealous-over-them` | 시샘하다 |
| `family/fall-out-of-love-with-them` | 정이 떨어지다 |
| `food/boil-right-up-over` | 부르르 끓다 |
| `food/be-so-good-as-to-eat` | 드시다 |
| `home/get-worse-and-worse` | 나빠지다 |
| `home/sleep-ones-fill-out` | 푹 자다 |
| `home/pour-out-all-the-talk` | 이야기를 다 쏟다 |
| `home/find-ones-tongue-at-last` | 말문이 트이다 |
| `home/carry-it-over-there` | 가져다 놓다 |
| `home/fly-in-through-it` | 날아 들다 |
| `idea/come-to-want-it` | 하고 싶어지다 |
| `idea/one-feels-like-it` | 하고 싶다 |
| `idea/lie-within-the-thing` | 들어 있다 |
| `idea/own-up-to-the-thing` | 털어놓다 |
| `idea/gaze-and-lose-oneself` | 넋 놓고 보다 |
| `idea/look-ones-fill-at-it` | 실컷 보다 |
| `idea/bear-upon-the-thing` | 영향을 주다 |
| `idea/hold-that-it-is-so` | 그렇다고 우기다 |
| `idea/think-the-thing-up` | 궁리해 내다 |
| `idea/take-it-to-be-so` | 그러려니 하다 |
| `idea/speak-the-thought-out` | 말로 내놓다 |
| `idea/reason-the-thing-out-aloud` | 따져 말하다 |
| `idea/form-it-up-whole` | 이루어 놓다 |
| `idea/feel-it-coming-beforehand` | 미리 느끼다 |
| `idea/catch-what-was-said` | 똑똑히 듣다 |
| `idea/think-it-all-the-way-through` | 끝까지 궁리하다 |
| `idea/set-one-against-the-other` | 맞세우다 |
| `job/turn-it-out-made` | 만들어 내다 |
| `job/come-out-right-in-the-end` | 되어 나오다 |
| `job/set-it-down-and-appoint` | 정해 두다 |
| `job/build-it-up-further` | 키워 나가다 |
| `job/stake-it-on-a-chance` | 위태롭게 걸다 |
| `job/give-the-orders-out` | 호령하다 |
| `job/earn-a-little-on-the-side` | 곁벌이하다 |
| `job/carry-it-through-in-fact` | 실제로 해내다 |
| `job/work-away-at-it-for-years` | 죽 일하다 |
| `job/work-them-too-hard` | 부려 먹다 |
| `nature/grow-on-and-on` | 자라 나가다 |
| `nature/sink-lower-and-lower` | 낮아지다 |
| `nature/take-shape-slowly` | 꼴이 잡히다 |
| `nature/hold-the-greater-part` | 더 많이 차지하다 |
| `nature/fly-out-and-away` | 날아 나가다 |
| `office/look-it-over` | 살펴보다 |
| `office/swap-things-about` | 주고받다 |
| `office/write-back-and-forth` | 편지 주고받다 |
| `office/bring-it-in-and-enter-it` | 들여놓다 |
| `office/make-it-more-and-more` | 늘리다 |
| `office/say-no-to-the-asking` | 안 된다고 하다 |
| `office/see-to-it-beforehand` | 미리 헤아려 두다 |
| `office/put-it-into-exact-words` | 말로 다듬다 |
| `office/bring-it-in-from-outside` | 실어 들이다 |
| `office/write-it-in-between` | 적어 넣다 |
| `office/make-it-over-anew` | 뜯어고치다 |
| `office/do-its-proper-work` | 제구실하다 |
| `office/pin-it-down-exactly` | 잡아 정하다 |
| `office/hold-it-out-to-be-seen` | 내보이다 |
| `quality/anxious` | 조급한 |
| `quality/ache-for-someone` | 안쓰럽다 |
| `quality/put-on-the-spot` | 난처하다 |
| `quality/make-them-glad` | 기쁘게 하다 |
| `quality/grow-poor-by-degrees` | 가난해지다 |
| `quality/grow-rich-by-degrees` | 잘살게 되다 |
| `quality/stop-at-that-line` | 선에서 멈추다 |
| `quality/be-put-out-and-hurt` | 속상해하다 |
| `quality/grow-angry-at-it` | 성내다 |
| `quality/hang-back-shyly` | 수줍어하다 |
| `quality/lose-heart-over-it` | 실망하다 |
| `quality/envy-what-they-have` | 부러워하다 |
| `quality/be-sad-and-low` | 서글퍼하다 |
| `quality/let-them-down-badly` | 낭패 보게 하다 |
| `quality/match-what-is-needed` | 걸맞다 |
| `quality/fill-it-past-the-brim` | 넘치게 채우다 |
| `quality/make-it-harder-than-it-was` | 더 까다롭게 하다 |
| `school/come-to-be-sure-of-it` | 확신하게 되다 |
| `school/take-an-interest-in` | 관심 갖게 되다 |
| `school/sink-into-the-reading` | 책에 빠지다 |
| `school/gather-ones-mind-in` | 마음을 모으다 |
| `school/put-notes-to-the-text` | 풀이를 달다 |
| `school/sum-it-into-one` | 하나로 묶어 말하다 |
| `school/write-it-to-the-end` | 마저 쓰다 |
| `school/give-grounds-for-it` | 근거를 대다 |
| `school/give-it-a-title` | 제목을 붙이다 |
| `school/print-it-again-anew` | 다시 펴내다 |
| `school/set-it-in-good-order` | 체계를 잡다 |
| `time/go-by-and-be-gone` | 지나가 버리다 |
| `time/come-to-one-in-sleep` | 꿈에 뵈다 |
| `time/have-to-as-it-falls` | 하게 되다 |
| `time/live-it-out-to-the-end` | 끝까지 살다 |
| `time/come-before-the-other` | 앞서 오다 |
| `travel/fetch-it-along` | 가져다주다 |
| `travel/roam-about-ones-fill` | 실컷 쏘다니다 |
| `travel/stride-along-the-road` | 성큼성큼 걷다 |
| `travel/haul-it-out-of-there` | 실어 내가다 |
| `travel/ride-in-through-the-gateway` | 타고 들어가다 |
| `travel/slow-the-thing-down` | 늦추다 |
| `travel/have-the-luck-of-it` | 운이 닿다 |
| `travel/take-the-lead-and-go` | 앞장서 가다 |
| `travel/walk-over-and-come-back` | 걸어 다녀오다 |
| `travel/ride-over-and-come-back` | 타고 다녀오다 |

### `adjective` → `noun` (147개) — 일곱 언어가 명사다

| 개념 | 뜻 |
| --- | --- |
| `action/a-blow-struck` | 타격 |
| `body/a-fair-haired-man` | 금발 남자 |
| `body/a-dark-haired-man` | 검은머리 남자 |
| `body/one-caught-by-the-drug` | 마약에 빠진 이 |
| `body/one-who-bears-a-disability` | 장애를 지닌 이 |
| `body/the-hold-the-drug-takes` | 마약에 빠짐 |
| `body/the-joining-of-man-and-woman` | 살섞음 |
| `body/the-hardening-sickness` | 굳어 가는 병 |
| `body/a-stir-of-feeling` | 설렘 |
| `body/a-burn-mark` | 덴 자리 |
| `body/the-way-one-walks` | 걸음새 |
| `city/a-blackshirt-man` | 파시스트 |
| `city/a-communist-person` | 공산주의자 |
| `city/a-nationalist-person` | 민족주의자 |
| `city/a-racist-person` | 인종주의자 |
| `city/a-patriot-person` | 애국자 |
| `city/a-wrong-that-was-done` | 부당함 |
| `city/hatred-aimed-at-the-jews` | 반유대주의 |
| `city/a-follower-of-buddha` | 불교 신자 |
| `city/one-with-no-roof-at-all` | 노숙인 |
| `city/the-killing-of-a-people` | 겨레 죽이기 |
| `city/one-for-rule-by-the-people` | 민주주의자 |
| `city/a-follower-of-rome` | 가톨릭 신자 |
| `city/a-follower-of-islam` | 이슬람 신자 |
| `city/a-follower-of-christ` | 그리스도인 |
| `city/one-come-to-live-here` | 들어와 사는 이 |
| `city/one-who-follows-them-about` | 따르는 이 |
| `city/one-who-strikes-by-terror` | 테러범 |
| `city/a-joining-into-one-body` | 묶어 세운 모임 |
| `city/the-land-of-ones-fathers` | 아버지 나라 |
| `city/one-who-stirs-the-crowd` | 선동하는 이 |
| `city/the-faith-of-rome` | 가톨릭교 |
| `city/a-piece-of-startling-news` | 떠들썩한 소식 |
| `city/a-band-that-holds-the-town` | 패거리 조직 |
| `city/a-deed-of-great-daring` | 큰 공 |
| `city/a-ball-put-in-the-net` | 넣은 골 |
| `city/the-lettered-sort-of-folk` | 배운 층 |
| `city/the-faith-of-the-east` | 정교 |
| `city/the-best-mark-so-far` | 최고 기록 |
| `city/the-taking-of-a-life` | 사람 죽임 |
| `city/a-solid-block` | 덩이 |
| `city/the-cloakroom-counter` | 옷 맡는 곳 |
| `city/a-position-held` | 버티는 자리 |
| `city/the-sending-of-pictures` | 영상 방송 |
| `city/a-cross-of-two-bars` | 십자가 |
| `city/a-push-forward` | 밀고 나감 |
| `family/a-lady-of-standing` | 귀부인 |
| `family/one-of-the-same-age` | 동갑 |
| `family/one-to-talk-with` | 말벗 |
| `family/one-of-the-line-that-follows` | 뒷대 자손 |
| `family/the-young-ones-together` | 젊은 패 |
| `family/a-word-given` | 약속한 말 |
| `family/a-bidding-to-come` | 청하는 글 |
| `family/the-sound-of-laughing` | 웃음 |
| `family/staying-true-to-it` | 한결같음 |
| `food/the-art-of-the-kitchen` | 요리 솜씨 |
| `food/the-drying-of-it` | 말리기 |
| `food/the-spirit-in-drink` | 술기운 |
| `home/a-coat-of-varnish` | 칠 |
| `home/a-thin-film` | 얇은 막 |
| `home/woven-cloth-stuff` | 옷감 |
| `home/a-washing-house` | 빨래터 |
| `idea/a-thing-of-no-account` | 아무것도 아닌 것 |
| `idea/nation-first-belief` | 민족주의 |
| `idea/race-above-race-belief` | 인종주의 |
| `idea/love-of-ones-land` | 애국심 |
| `idea/a-piece-of-folly` | 어리석음 |
| `idea/the-chance-of-it-being` | 될 수 있음 |
| `idea/the-way-one-sees-the-world` | 세상 보는 눈 |
| `idea/a-showing-it-to-be-false` | 뒤집는 말 |
| `idea/the-taking-in-of-it` | 알아들음 |
| `idea/a-guess-put-forward` | 미루어 생각한 것 |
| `idea/the-face-one-shows-outside` | 겉모습 |
| `idea/a-play-that-wrings-tears` | 눈물극 |
| `idea/the-excuse-that-serves` | 빌미 |
| `idea/a-song-of-love-sung-low` | 사랑 노래 |
| `idea/one-who-chases-the-dream` | 낭만 좇는 이 |
| `idea/one-who-doubts-it-all` | 의심 많은 이 |
| `idea/the-means-to-hand` | 수단 |
| `idea/what-is-inside-it` | 속내용 |
| `idea/the-wit-one-has` | 슬기 |
| `job/a-hired-go-between` | 대리 맡은 이 |
| `job/an-idealist-person` | 이상주의자 |
| `job/an-individualist-person` | 개인주의자 |
| `job/a-selfish-minded-one` | 이기주의자 |
| `job/an-officer-below-the-colonel` | 중령 |
| `job/the-doings-of-them` | 하는 일들 |
| `job/the-calling-one-is-born-to` | 타고난 부름 |
| `job/one-who-sets-it-all-up` | 판을 짜는 이 |
| `job/working-together` | 함께 일함 |
| `nature/the-taking-of-shape` | 꼴 잡힘 |
| `nature/a-plot-for-greens` | 남새밭 |
| `nature/the-cold-that-bites` | 추위 |
| `nature/the-far-point-of-the-axis` | 극 |
| `nature/a-wild-storm` | 사나운 비바람 |
| `number/and-added-to-it` | 더하기 |
| `number/an-even-result` | 비김 |
| `number/a-ruled-table-of-rows` | 칸 표 |
| `office/a-deed-set-down` | 증서 한 장 |
| `office/one-who-stands-in-the-place` | 자리를 대신하는 이 |
| `office/the-first-letters-of-a-name` | 이름 첫 글자 |
| `office/the-savings-house` | 저축은행 |
| `office/a-shortening-of-it` | 줄여 적음 |
| `office/a-making-it-more-exact` | 더 또렷이 함 |
| `office/the-printing-house` | 펴내는 곳 |
| `office/a-seal-that-stamps` | 도장 |
| `office/a-bureau-office` | 사무국 |
| `office/a-round-flat-disc` | 둥근 판 |
| `office/a-checking-over` | 살펴 봄 |
| `office/the-amount-turned-out` | 생산량 |
| `quality/weak-point` | 약한 데 |
| `quality/front-and-back` | 앞뒤 |
| `quality/this-thing` | 이것 |
| `quality/that-thing` | 저것 |
| `quality/which-one` | 어느 |
| `quality/the-dark-outlook` | 비관 |
| `quality/what-a-thing-is-worth` | 값어치 |
| `quality/what-one-cannot-do-without` | 아쉬운 것 |
| `quality/the-mark-that-shows-it` | 드러나는 표 |
| `quality/the-look-of-a-thing` | 보이는 모습 |
| `school/a-person-of-learning` | 배운 사람 |
| `school/a-student-of-the-second-degree` | 석사 과정생 |
| `school/a-pupil-of-the-upper-form` | 상급생 |
| `school/a-word-of-correction` | 한마디 지적 |
| `school/the-gist-drawn-together` | 간추린 말 |
| `school/the-list-of-what-is-inside` | 책 차례 |
| `school/a-setting-down-in-words` | 적어 그린 글 |
| `school/the-book-of-glad-tidings` | 복음서 |
| `school/the-talk-of-one-trade` | 끼리말 |
| `school/the-weighing-of-a-work` | 비평 |
| `school/a-mind-of-rare-gift` | 천재 |
| `school/a-union-of-states` | 연방체 |
| `school/the-row-of-letters` | 자모 차례 |
| `school/the-power-of-mind` | 지력 |
| `school/a-told-tale-in-a-book` | 이야기책 |
| `time/one-of-the-same-times` | 같은 때 사람 |
| `time/a-going-over-it-again` | 되풀이 |
| `travel/a-man-of-africa` | 아프리카 사람 |
| `travel/a-man-of-europe` | 유럽 사람 |
| `travel/a-man-of-russia` | 러시아 국민 |
| `travel/a-man-of-siberia` | 시베리아 사람 |
| `travel/one-from-the-same-country` | 같은 나라 사람 |
| `travel/one-come-in-from-outside` | 들른 손 |
| `travel/one-who-left-the-country` | 나라 떠난 이 |
| `travel/the-way-one-goes` | 길 |
| `travel/a-bend-in-the-way` | 굽이 |
| `travel/a-way-through` | 지나가는 길 |

### `noun` → `verb` (5개) — 일곱 언어가 동사다

| 개념 | 뜻 |
| --- | --- |
| `city/hand-over-ownership` | 양도하다 |
| `idea/get-along-with` | 사귀다 |
| `quality/lose-face` | 망신 |
| `school/preview-lesson` | 예습 |
| `travel/hotel-check-in` | 체크인 |

### `verb` → `noun` (3개) — 일곱 언어가 명사다

| 개념 | 뜻 |
| --- | --- |
| `action/filtering` | 여과 |
| `job/nothing-brought-to-completion` | 하나도 이루지 못하다 |
| `nature/surging-and-swelling` | 세차게 일렁이다 |

### `noun` → `adjective` (1개) — 일곱 언어가 형용사다

| 개념 | 뜻 |
| --- | --- |
| `idea/unnamed` | 익명 |
