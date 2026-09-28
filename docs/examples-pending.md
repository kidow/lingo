# 예문이 낱말을 못 받쳐 주는 자리 — 임자가 고칠 곳

확인일: 2026-09-09. `pnpm check`가 짚은 것 가운데 **예문 쪽 결함**만 모았다.
손대지 않은 이유는 하나다 — **내가 만든 개념이 아니라서**다
([concurrent-sessions.md](concurrent-sessions.md)).

곁말은 [also-recheck](also-recheck.md)가, 그림은 [twins-pending](twins-pending.md)가
받는데 예문을 받을 데가 없었다. 이 문서가 그 셋째다.

**고치고 나면 그 줄을 지운다.**

## 왜 예문이 낱말을 받쳐야 하나

문맥 카드는 예문에서 그 낱말을 **뚫어** 넷 중 고르게 한다 (`buildCloze`).
뚫으려면 `clozeAt`이 자리를 찾아야 하는데, 그건 `indexOf`라 **글자 그대로,
대소문자까지** 같아야 한다 (lib/quiz.ts). 예문이 낱말의 굴절형만 보여주면
그 낱말은 문맥 카드가 안 만들어진다. 철자 카드와 듣기 카드는 그대로 나오므로
**퀴즈가 깨지지는 않는다** — 카드 한 갈래가 조용히 빠질 뿐이다.

## 카드가 아예 안 나오는 일곱 — 다 끝냈다

두 예문이 **둘 다** 못 뚫던 자리다.

| 낱말 | 전 | 후 |
| --- | --- | --- |
| `action/cut-with-scissors` ja | `はさみで切る` | `はさみできる` — 읽기가 가나면 예문도 가나로 적는다 (2026-09-20) |

**독일어 여섯은 한 가지 문제였고 2026-09-19에 끝냈다.** 형용사의 무변화형
(`link`·`höchst`)은 명사 앞에서 늘 어미를 받으므로 **문장에 그 꼴로 설 수
없다.** 예문을 고쳐 될 일이 아니라 표제형을 정하는 방식의 문제였다. 길이
둘이었는데 — 서술 용법으로 바꾸거나, 굴절형 하나로 박거나 — **굴절형으로
박았다.** 뜻줄이 「왼쪽의」·「저녁의」처럼 죄다 꾸미는 자리라 서술로는 그
개념이 안 된다.

| 낱말 | 전 | 후 |
| --- | --- | --- |
| `quality/left-side` de | `link` | `linke` |
| `quality/right-side` de | `recht` | `rechte` |
| `quality/favourite` de | `liebst` | `liebste` |
| `quality/former` de | `ehemalig` | `ehemalige` |
| `quality/evening-time` de | `abendlich` | `abendliche` |
| `quality/highest` de | `höchst` | `höchste` |

**정관사 뒤에서는 성·수와 무관하게 늘 `-e`다.** 그래서 예문 둘을 다 `der`·
`die`·`das`로 맞추면 한 꼴로 선다 — 걸린 다섯은 둘째 줄이 `ein linkes`처럼
부정관사라 `Das linke Scharnier…`로 고쳤다(`favourite`는 이미 둘 다 정관사라
표제형만 바꿨다). `pnpm check` 경고가 33건에서 **27건**으로 내려갔다.

**프랑스어 생략도 같은 자리를 막는다 (2026-09-17).** `clozeAt`은 아포스트로피를
«붙어 있는 것»으로 보므로 `l'ordre public`은 못 뚫는다 — `l'`가 뒤에 모음이
온다는 표시라서 자음으로 시작하는 오답이 문장을 안 읽고도 걸러지기 때문이다
(lib/quiz.ts의 `GLUED`). 다섯이 걸려 있었는데 내 것 넷은 관사 없는 꼴로
고쳤고(`un ordre public` · `cette ambiance` · `un certain` · `cet aîné de la
famille`), 하나가 남는다.

| 낱말 | 표제형 | 예문이 쓰는 꼴 |
| --- | --- | --- |
| `idea/gap-disparity` fr | `écart` | `L'écart entre les deux a grandi.` · `Le graphique montre l'écart.` |

**표제형이 모음으로 시작하면 예문에서 관사를 생략시키지 않는다.** `un`·`cet`·
`cette`처럼 띄어쓰기가 남는 한정사를 쓰거나, 표제를 관사 없이 세운다.

### 같은 병이 더 있는지 훑었다 — 없다 (2026-09-09)

여섯이 한 갈래로 보여 **독일어 형용사 표제어 636개를 전수로** 봤다. 세 번
걸렀고 셋 다 새로 나온 것이 없다.

| 훑은 것 | 결과 |
| --- | --- |
| `clozeAt`으로 예문 둘이 다 못 뚫는 자리 | **여섯. 그게 전부다** |
| 최상급 어간꼴(`-st`로 끝나는 표제어) 열 개 | `liebst`·`höchst` 둘만 죽었다. 나머지 여덟(`ernst`·`robust`·`vereist`·`verblasst`·`ausgefranst`·`selbst`·`demnächst`·`äußerst`)은 서술로 서므로 멀쩡하다 |
| 부가어 전용으로 알려진 형용사 서른 낱말 | 걸린 여섯 중 넷이 이미 목록에 있고, 새로 걸린 것은 `künftig` 하나인데 **부사로 쓴 자리**라 맞는 독일어다(`Der Ertrag bleibt künftig mager.`) |

**한 줄만 굴절형인 마흔둘은 결함이 아니다.** `künftig`·`nützlich`처럼 예문
하나는 서술로(`ist nützlich`), 하나는 부가어로(`ein nützliches Werkzeug`)
쓴 자리다. 카드는 서술 쪽에서 만들어지고, 두 용법을 다 보여주는 편이 낫다.

그러니 이 여섯은 **더 큰 문제의 첫 사례가 아니라 그 자체로 닫힌 목록**이었다.
2026-09-19에 여섯을 다 굴절형으로 박았고 새로 걸린 것은 없다. 훑은 기록은
남긴다 — 다음에 같은 병이 보일 때 «636개를 이미 봤다»가 근거가 된다.

## 카드는 나오지만 예문 한 줄이 죽은 자리

형제 예문이 살아 있어 문맥 카드는 만들어진다. 다만 **회차에 따라 그 줄이
뽑히면 낱말을 안 보여준다.**

### 대소문자만 다른 열넷 — 셋 끝냈다

낱말이 문장 첫머리에 서서 커졌다. 고칠 곳은 낱말이 아니라 **문장**이다 —
그 낱말을 첫머리 밖으로 옮긴다.

2026-09-09에 파일이 비어 있던 셋을 그렇게 고쳤다. 주어를 하나 앞에 세우면
끝난다.

| 낱말 | 전 | 후 |
| --- | --- | --- |
| `medium-grade` en | `Medium grade wool sells fast.` | `The mill sells medium grade wool fast.` |
| `overseas` en | `Overseas prices run higher.` | `Buyers say overseas prices run higher.` |
| `wrong-way-driving` en | `Wrong-way driving caused the jam.` | `Police said wrong-way driving caused the jam.` |

`clozeAt`이 셋 다 자리를 찾는다(9·15·12). 경고가 열넷에서 **열하나**로 줄었다.
남은 열하나는 그 파일들이 만져지는 중이라 손대지 않았다.

| 파일 | 낱말 | 예문 |
| --- | --- | --- |
| action | `dredge` de | `Schlamm zwang sie zum Ausbaggern.` |
| body | `emergency-room` es | `Urgencias estuvo lleno toda la noche.` |
| body | `nursing-care` en | `Nursing care runs day and night.` |
| ~~everyday `housework` en~~ | — | **끝냈다** — `Most days housework fills the morning.` |
| home | `energy-saving` en | `Energy-saving cut the bill by half.` |
| job | `amateur` en | `Amateur work still sells.` |
| job | `start-a-business` de | `Zum Gründen braucht man Geld.` |
| nature | `midsummer` en | `Midsummer dries the well.` |
| nature | `timely-snow` de | `Willkommener Schnee rettete die Saat.` |
| office | `employment` en | `Employment rose after the mill opened.` |
| office | `manual-operation` en | `Manual operation is slower.` |
| ~~quality `medium-grade` en~~ | — | **끝냈다** |
| ~~travel `overseas` en~~ | — | **끝냈다** |
| ~~travel `wrong-way-driving` en~~ | — | **끝냈다** |

독일어 둘(`Ausbaggern`·`Gründen`)은 첫머리가 아니라 **동사가 명사로 굳으며**
커진 자리다. 그쪽은 문장을 다시 써야 한다.

### 굴절형만 있는 여섯

경고는 여덟 줄인데 낱말로는 여섯이다 — `cut-with-scissors`의 두 줄은 위
「카드가 아예 안 나오는 일곱」에 든다.

| 낱말 | 전 | 후 |
| --- | --- | --- |
| ~~action `set-off-fireworks` en~~ | `setting off fireworks` | **끝냈다** — `Rain stopped them before they could set off fireworks.` |
| ~~action `avoid` es~~ | `evitan` | **끝냈다** — `Los carros deben evitar la esquina mojada.` |
| ~~action `avoid` fr~~ | `évitent` | **끝냈다** — `Les charrettes doivent éviter le coin mouillé.` |
| ~~action `excavate` en~~ | `excavating` | **끝냈다** — `Frost stops them before they excavate.` |
| ~~food `choke-on` de~~ | — | **끝냈다** — `Beim Lachen kann man sich verschlucken.` |
| ~~food `pick-fruit` en~~ | — | **끝냈다** — `When it rains they cannot pick fruit.` |

영어 셋은 모두 **분사로 바꿔 쓴 자리**였다(`Rain stops them picking fruit.`).
표제형을 그대로 세우려면 **종속절을 하나 세운다** — `stops them before they
excavate`. 로망스어 둘은 정형이라 화법동사를 앞세웠다(`deben evitar` ·
`doivent éviter`).

## 독일어 어순이 깨진 자리 (2026-09-10)

`food/pick-fruit`을 고치다 옆줄에서 봤다.

    Sie Obst pflücken vor Sonnenaufgang.     ← 동사가 둘째 자리에 없다
    Sie pflücken Obst vor Sonnenaufgang.     ← 바른 어순

**독일어는 정형 동사가 둘째 자리에 선다.** 그런데 표제형이 `Obst pflücken`
처럼 동사구이면, 예문에 그대로 세우려다 동사를 뒤로 밀게 된다. 앞의 「대소문자」와
같은 뿌리다 — **표제형을 글자 그대로 보이려다 문장을 망가뜨린 자리**다.

`pnpm check`는 이걸 못 잡는다. 표제형이 예문에 있고 뚫리기까지 하므로 조용하다.
**틀린 독일어인데 문맥 카드는 잘 만들어진다** — 그래서 더 나쁘다.

동사구 표제어를 훑어 212줄이 걸렸는데 대부분 헛것이다. `scene`의 물음들
(`Kann ich hier zahlen mit Karte?`)은 조동사가 둘째 자리에 있어 멀쩡하다.
눈으로 갈라 **틀린 것만** 남긴다.

### 눈으로 훑어서는 안 되는 자리였다 (2026-09-20)

아래 열하나를 **다 고쳤다.** 고치면서 그물을 놓았다 — `whyLateVerb`
(`lib/headword.ts`)가 «표제어 뒤에 말이 남았는가»만 본다. 남아도 되는 자리
셋을 뺀다: 쉼표로 절이 이어지는 자리 · 종속절의 정형 동사(`… austragen muss`) ·
명사로 쓴 자리(`beim Bomben abwerfen`). `pnpm ex`가 돌린다.

**그 그물을 `content/` 전체에 대니 248이 남았다.** 위의 열하나는 눈으로 훑어
찾은 것인데, 기계는 스물두 배를 찾았다. 스물다섯씩 두 번 뽑아 눈으로 보니
스물셋·스물둘이 진짜였다 — 이 갈래는 **눈으로 훑어서 끝낼 수 있는 크기가
아니다.**

    node scripts/ex.ts content/*.json | grep 어순

처음에는 `check`에 넣지 않았다. 경고 스물넷이 이백일흔이 되어 나머지를
덮기 때문이다. 넷째 회차에 0이 된 뒤 `check`로 옮겼다 — **빚이 0이 되어야
그물을 기준선에 걸 수 있다.**

### 248을 0으로 만들었다 — 끝냈다 (2026-09-20)

한 파일씩 끊어 네 회차를 돌았다. `content/` 전체의 어순이 **0**이다.

| 회차 | 파일 | 고친 예문 | 남은 것 |
| ---: | --- | ---: | ---: |
| 1 | action | 77 | 171 |
| 2 | idea · number · quality | 54 | 117 |
| 3 | city · family · time · office | 46 | 69 |
| 4 | 남은 열한 파일 | 69 | **0** |

**이제 `pnpm check`가 막는다.** 남은 것이 0이 됐으므로 `whyLateVerb`를 `check`
안으로 옮겼다 — `pnpm ex`를 건너뛰어도 새 예문은 들어오지 못한다. 경고
스물둘 기준선은 그대로다.

**일흔일곱이 두 갈래였다.** 마흔일곱은 낱말 자리만 옮기면 됐고(조동사를 둘째
자리에, 표제형을 끝으로), 서른은 **표제형이 전치사로 끝나** 고칠 길이 아예
없었다. `sich stützen auf`가 예문에 글자 그대로 이어지는 자리는 독일어에
없다 — 전치사구는 동사 앞에 선다(`sich auf den Brunnen stützen`).

`link`→`linke`와 같은 자리라 **표제형을 바꿨다.** 열여섯이다.

| 개념 | 전 | 후 |
| --- | --- | --- |
| `action/rely-on` | `sich stützen auf` | `sich stützen` |
| `action/serve-as` | `dienen als` | `dienen` |
| `action/be-used-for` | `verwendet werden für` | `verwendet werden` |
| `action/look-back-on` | `zurückblicken auf` | `zurückdenken` — `zurückblicken`은 `look-back`이 쥐고 있다 |
| `action/take-a-liking-to` | `Gefallen finden an` | `Gefallen finden` |
| `action/have-to-do-with` | `zu tun haben mit` | `zu tun haben` |
| `action/hold-fast` | `festhalten an` | `bewahren` — `festhalten`은 `keep-hold`가 쥐고 있다 |
| `action/be-good-at` | `sich verstehen auf` | `sich verstehen` |
| `action/accommodate-to` | `sich anpassen an` | `sich anpassen` |
| `action/pass-oneself-off` | `sich ausgeben als` | `sich ausgeben` |
| `action/go-along-with` | `sich richten nach` | `sich richten` |
| `action/put-force-into` | `Kraft setzen auf` | `Kraft setzen` |
| `action/follow-the-rule` | `sich halten an` | `sich halten` |
| `action/double-as` | `zugleich dienen als` | `zugleich dienen` |
| `action/aimed-at` | `abzielend auf` | `abzielen` |
| `action/cause-to-be` | `bewirken dass` | `bewirken` — 독일어는 `bewirken, dass`라 쉼표가 낀다 |

**떼고 난 표기에 임자가 있는지 `pnpm claim`으로 먼저 본다.** 열여섯 가운데
둘이 걸렸다.

그물도 한 자리 늘렸다. 표제형이 `es ist`처럼 **정형 동사로 끝나면** 그 동사구는
오른쪽 괄호가 아니라 왼쪽 괄호라 뒤에 말이 오는 것이 맞다. `haben`·`werden`
처럼 부정사와 꼴이 같은 것은 빼지 않는다 — 빼면 `nicht haben`이 빠진다.

#### `idea`·`number`·`quality` 쉰넷 — 표제형 여덟을 더 바꿨다

| 개념 | 전 | 후 |
| --- | --- | --- |
| `idea/derive-from` | `hervorgehen aus` | `hervorgehen` |
| `idea/get-along-with` | `auskommen mit` | `auskommen` |
| `idea/does-not-match` | `stimmt nicht überein` | `nicht übereinstimmen` — `fit-exactly`의 `übereinstimmen`과 짝이 된다 |
| `idea/counts-as` | `gilt als` | `durchgehen` — `gelten`은 `be-taken-for`가 쥐고 있다 |
| `idea/think-well-of` | `etwas halten von` | `etwas halten` |
| `idea/be-loyal-to` | `treu sein zu` | `treu sein` |
| `quality/mind-about` | `sich kümmern um` | `beachten` — `sich kümmern`은 `take-care`가 쥐고 있다 |
| `quality/ought-by-rights` | `von Rechts wegen sollen` | `gebühren` |

**정형 동사가 든 표제형도 같은 자리다.** `gilt als`·`stimmt nicht überein`은
정형이라 둘째 자리에 서는데, 그 뒤에 목적어까지 달리면 표제형이 글자 그대로
이어질 자리가 없다. 부정사로 바꾸면 오른쪽 괄호에 통째로 들어간다 —
`Die Sohle kann mit dem Abdruck nicht übereinstimmen.`

**부정이 걸림돌이다.** 독일어의 `nicht`는 부정사 바로 앞에 서므로
`sich nicht fügen`처럼 표제형을 가른다. 길이 셋이다 — 부정을 `niemand`·`nie`로
옮기거나(`Den Staub wird niemand beachten.` · `Nie soll man sich einmischen.`),
부정을 표제형에 넣거나(`nicht übereinstimmen`), 예문을 긍정으로 쓴다.

#### 남은 열한 파일 예순아홉 (2026-09-20)

표제형은 둘만 바꿨다 — `home/clear-out-and-go`의 `ausziehen aus`는 `ausziehen`
(`undress`)도 `räumen`(`evict`)도 임자가 있어 `fortziehen`으로 갔고,
`school/concentrate-on`의 `sich vertiefen in`은 `sich vertiefen`이 됐다.

**꼴이 셋으로 모였다.**

    lässt sich X schwer      → kann man schwer X      여섯 자리
    부정사구가 주어           → Wer X will, …          다섯 자리
    쉼표 없는 관계절          → Künste, die …, kehren  셋

`lässt sich`는 재귀 수동인데 목적어를 4격으로 두어 두 번 틀렸다
(`lässt sich den Ball heben schwer`). 화법조동사로 바꾸면 한 번에 풀린다.

#### `city`·`family`·`time`·`office` 마흔여섯 (2026-09-20)

표제형은 둘만 바꿨다 — 전치사로 끝나는 자리가 둘뿐이었다.

| 개념 | 전 | 후 |
| --- | --- | --- |
| `city/be-the-property-of` | `Eigentum sein von` | `Eigentum sein` |
| `family/guard-against` | `sich hüten vor` | `sich hüten` |

**절이 든 표제형에는 쉼표가 걸림돌이다.** 관계절을 품은 표제형
(`Brüder die keinen Tag voneinander weichen`)은 독일어 쉼표 규칙이 표제형
한가운데를 끊는다. 표제형이 **쉼표 앞에서 끝나도록** 문장을 돌린다 —
`Brüder, die keinen Tag voneinander weichen, kennen einander ganz.`
`um … zu`는 다르다. 1996년 이후 그 앞의 쉼표는 **선택**이라 그대로 설 수 있다
(`sich vordrängen um der Erste zu sein`).

**주어절을 뒤로 빼면 표제형이 붙는다.** `Wer spät zahlt, muss sich zuziehen
eine Gebühr.`는 목적어가 뒤에 남는데, 주어절을 Nachfeld로 보내면 풀린다 —
`Eine Gebühr muss sich zuziehen, wer spät zahlt.`

그물에 **2인칭 정형**을 채웠다(`willst`·`kannst`·`musst`…). 빠져 있어
`bevor du es von anderswo übernehmen willst`처럼 멀쩡한 종속절이 둘 걸렸다.

| 파일 | 개념 | 표제형 | 예문 |
| --- | --- | --- | --- |
| ~~action `maintain`~~ | — | — | **끝냈다** — `Sie müssen die Pumpe monatlich instand halten.` |
| ~~action `diffuse`~~ | — | — | **끝냈다** — `Im Flur können Gerüche sich ausbreiten.` |
| ~~action `remain-over`~~ | — | — | **끝냈다** — `Abends können zwei Brote übrig bleiben.` |
| ~~action `hold-in-palms`~~ | — | — | **끝냈다** — `Sie wollen die Schale mit beiden Händen halten.` |
| ~~action `carry-by-hand`~~ | — | — | **끝냈다** — `Sie wollen die Kisten in der Hand tragen.` |
| ~~action `cut-with-scissors`~~ | — | — | **끝냈다** — `Sie wollen am Falz mit der Schere schneiden.` |
| ~~action `read-aloud`~~ | — | — | **끝냈다** — `Jeden Morgen wollen sie laut vorlesen.` |
| ~~action `gaze-into-distance`~~ | — | — | **끝냈다** — `Vom Grat können sie in die Ferne blicken.` |
| ~~action `patrol`~~ | — | — | **끝냈다** — `Bei Nacht müssen Wächter Streife gehen.` |
| ~~action `pace-back-and-forth`~~ | — | — | **끝냈다** — `Vor der Tür konnte er hin und her gehen. · Beim Warten müssen sie hin und her gehen.` |
| ~~action `face-up-to`~~ | — | — | **끝냈다** — `Der Rechnung musste er sich stellen. · Dem Verlust wollen sie sich stellen.` |
| ~~body `raise-head`~~ | — | — | **끝냈다** — `Beim Geräusch mussten sie den Kopf heben.` |
| ~~food `pick-fruit`~~ | — | — | **끝냈다** — `Sie wollen vor Sonnenaufgang Obst pflücken.` |
| ~~idea `run-right-through`~~ | — | — | **끝냈다** — `Die Rohre sollen im Mauerwerk durchgehend verlaufen.` |
| ~~job `receive-guests`~~ | — | — | **끝냈다** — `Am Markttag wollen sie Gäste empfangen.` |
| ~~nature `breed-animals`~~ | — | — | **끝냈다** — `Sie wollen für den Markt Tiere züchten.` |
| ~~office `recruit`~~ | — | — | **끝냈다** — `Zweimal im Jahr müssen sie Personal suchen.` |
| ~~transport `intersect`~~ | — | — | **끝냈다** — `Am Brunnen können die Wege sich kreuzen.` · `Hier müssen zwei Gleise sich kreuzen.` |

**어형 변화를 안 시킨 자리도 둘 있다.** 표제형을 그대로 박느라 굴절을 뺐다.

| 파일 | 개념 | 예문 | 바른 꼴 |
| --- | --- | --- | --- |
| ~~city `united-nations`~~ | — | **끝냈다** — 표제형을 굴절형으로 박았다: `Vereinte Nationen` → `Vereinten Nationen` (2026-09-20) |
| ~~time `small-hours`~~ | — | **끝냈다** — 관사를 빼면 강변화 어미가 맞다: `Am kältesten sind frühe Morgenstunden.` |

### 일곱은 예문만 고쳐 끝냈다 (2026-09-10)

**표제형을 안 바꾸고도 되는 길이 있다.** 조동사를 세워 표제형을 문장 끝으로
보내면 정형 동사가 둘째 자리를 되찾는다. 파일이 열려 있던 일곱을 그렇게 했다.

    Sie Obst pflücken vor Sonnenaufgang.        ← 동사가 밀렸다
    Sie wollen vor Sonnenaufgang Obst pflücken. ← wollen이 둘째 자리

**같은 개념의 다른 예문이 이미 그 꼴이었다** — `Langsam wollte er den Kopf
heben.` · `Das Werk will Personal suchen.` · `Die Straße wird durchgehend
verlaufen.` 한 줄은 맞게 쓰고 다른 줄에서 지름길을 탄 자리다.

`small-hours`는 어미 쪽이라 길이 달랐다. **관사를 빼면 강변화 어미가 맞는다** —
`Die frühe Morgenstunden` ✗ · `frühe Morgenstunden` ✓. 두 줄 다 고쳤다.

뚫을 자리는 일곱 다 살아 있다(7~30).

**남은 것은 `action` 열하나와 `city/united-nations`뿐이다.** 둘 다 그 파일이
만져지는 중이라 못 했을 뿐, 위와 같은 방식으로 예문만 고치면 된다.

#### 형용사 여섯은 이 길이 없다 — 재 봤다 (2026-09-10)

동사구가 예문만으로 풀렸으니 「카드가 아예 안 나오는 일곱」의 형용사 여섯도
그런지 확인했다. **아니다.** 무변화형이 설 수 있는 자리를 하나씩 `clozeAt`에
대고 재 보니 이렇다.

| 표제형 | 무변화형이 서는 자리 | 뚫리나 | 쓸 수 있나 |
| --- | --- | --- | --- |
| `liebst` | `am liebsten` | **못 뚫는다** (−1) | 낱말 안에 묻혀 앞뒤가 붙는다 |
| `höchst` | `Das ist höchst ungewöhnlich.` | 뚫린다 (8) | **못 쓴다** — 그 자리의 뜻은 「극히」지 「최고의」가 아니다 |
| `recht` | `Das Wasser ist recht kalt.` | 뚫린다 (15) | **못 쓴다** — 「꽤」지 「오른쪽의」가 아니다 |
| `link` · `ehemalig` · `abendlich` | 없다 | — | 부가어로만 쓰는 낱말이다 |

**뚫린다고 쓸 수 있는 것이 아니다.** `höchst`와 `recht`는 문장이 성립하고
카드도 만들어지지만 **다른 뜻을 가르친다** — 어순이 깨진 자리가 카드는 잘
만들어졌던 것과 같은 함정이다.

그래서 여섯은 **표제형을 굴절형으로 박고 예문 둘을 거기 맞추는 길**뿐이고,
그건 임자가 정할 몫이다.

### 다른 언어도 그런지 훑었다 — 독일어만이다 (2026-09-10)

어순이 굳은 언어가 독일어만은 아니라 스페인어·프랑스어·러시아어의 **동사
개념 825개**를 같은 눈으로 봤다. 표제형(부정형)이 예문에 그대로 서 있는데
그것을 **열어 주는 말이 앞에 없는** 줄을 세고, 남은 것을 눈으로 봤다.

**틀린 자리가 하나도 없었다.** 남은 줄은 전부 내 잣대가 여는 말을 몰랐을
뿐이다.

    es  Intenta atrapar la pelota. · Suelo olvidar las llaves. · Empiezo a sudar…
    fr  J'ai besoin de dormir. · Aide-moi à pousser la porte. · Tu vas relire…
    ru  Придётся ждать автобус. · Эту коробку тяжело нести. · Он привык ездить…

**왜 독일어만인지는 문법에 있다.** 스페인어·프랑스어·러시아어에서 부정형은
수많은 말 뒤에 그대로 설 수 있다 — 조동사, 전치사, `gusta`·`aime`·`любит`
같은 동사, `difícil`·`facile`·`трудно` 같은 형용사까지. 표제형을 글자 그대로
보여도 문장이 성립할 길이 넓다.

독일어는 **정형 동사가 반드시 둘째 자리**에 선다. 동사구 표제형을 그대로
세우면 그 자리를 빼앗기므로 **길이 조동사 뒤 하나뿐**이다. 그래서 지름길이
곧바로 어긋난 문장이 된다.

**일본어와 중국어도 봤다 (2026-09-10).** 둘 다 깨진 자리가 없다.

일본어는 정답이 **가나 읽기**라 사전꼴이 활용 자리에 박히면 곧 어긋난다.
사전꼴로 끝나는 읽기 **1,974개**를 훑어 `ます`·`ました`·`ない`처럼 곧바로
오면 안 되는 꼬리를 찾았다. 한 줄이 걸렸는데 `ふるい みちを このむように
なりました`로 **맞는 문장**이었다(`このむ` + `ように なる`). 예문을 죄다
가나로 띄어 쓰기 때문에 읽기가 자연스럽게 서고, 사전꼴이 설 수 있는 자리
(`ように`·`ことが`·`と`·`ため`)만 골라 쓴 결과다.

중국어는 굴절이 없어 표제형이 어디에나 그대로 선다. 위험한 자리는 **이합사**
뿐이다 — `见面`·`请假`처럼 가운데가 갈라지는 낱말인데, 갈라 쓰면 표제형이
예문에 없어져 `check`가 먼저 운다. 이합사 표제어 **스물둘**을 다 열어 봤고
전부 붙여 쓴 채로 문장이 성립한다(`他们星期五见面。` · `中午前可以请假。`).

| 언어 | 결과 |
| --- | --- |
| **de** | **열여덟 깨졌다** — 정형 동사 둘째 자리 규칙 때문 |
| es · fr · ru | 깨진 자리 없음. 부정형이 설 수 있는 자리가 넓다 |
| ja | 깨진 자리 없음. 예문이 가나라 읽기가 그대로 선다 |
| zh | 깨진 자리 없음. 굴절이 없고 이합사 스물둘도 다 붙여 썼다 |

**재는 데 함정이 하나 있었다.** 처음에는 자바스크립트 정규식으로 여는 말을
`люб\w+`처럼 적었는데, `\w`는 `[A-Za-z0-9_]`라 **키릴과 악센트 글자를 안
잡는다.** 러시아어에서 1,650줄이 걸린 것처럼 보였다. 낱말 조각을 문자열로
넣어 다시 세니 557줄이 됐고 그마저 다 멀쩡했다. 이 레포에서 키릴·악센트를
재는 자리에는 `\w`를 쓰지 않는다.

## 한국어 줄이 원문과 어긋난 자리 (2026-09-10)

예문을 고치면 한국어 줄도 같이 고쳐야 하는데, 원문만 손보고 지나간 자리가
있는지 훑었다.

**언어끼리 대조하는 길은 막혔다.** 한 개념·같은 차례의 한국어 줄이 일곱 언어에
같은 자리는 2,395뿐이고 갈린 자리가 11,705다 — **낱말 개념은 언어마다 제 문장을
쓰는 것이 설계**라서다(`action/eat`의 일본어는 «빵을 먹는다», 러시아어는 «국을
먹을 때입니다»). 상황 표현도 마찬가지다.

그래서 다른 신호로 봤다 — **한 낱말·한 언어의 예문 둘이 문장은 다른데 한국어
줄이 똑같은 자리.** 열 자리가 나왔고 그중 넷은 두 문장의 뜻이 실제로 같아
괜찮았다. **여섯이 진짜였고 다섯을 고쳤다.**

| 파일 | 낱말 | 원문 | 전 | 후 |
| --- | --- | --- | --- | --- |
| ~~family `sibling` es~~ **끝냈다** | `Él vive con sus hermanos.` | 형제자매가 둘 있습니다 | 그는 형제자매와 삽니다 |
| ~~family `sibling` de~~ **끝냈다** | `Er hat ältere Geschwister.` | 형제자매가 둘 있습니다 | 그는 손위 형제자매가 있습니다 |
| ~~time `quarter-year` zh~~ **끝냈다** | `第一季度在三月结束。` | 분기가 끝났습니다 | 1분기는 3월에 끝납니다 |
| ~~time `quarter-year` es~~ **끝냈다** | `El primer trimestre terminó en marzo.` | 분기가 끝났습니다 | 1분기는 3월에 끝났습니다 |
| ~~time `quarter-year` fr~~ **끝냈다** | `Le premier trimestre s'est fini en mars.` | 분기가 끝났습니다 | 1분기는 3월에 끝났습니다 |

**나머지 넷 가운데 둘은 뜻이 같아 그냥 두어도 됐지만 갈라 적었다** —
`travel/souvenir` ru와 `food/radish` ja다. 규칙을 참으로 만들어야 검사를 걸 수
있어서다.

**남은 하나는 파일이 막혀 못 했다** — 그 뒤 임자가 고쳤다 (2026-09-17 확인).

| 파일 | 낱말 | 원문 | 지금 한국어 |
| --- | --- | --- | --- |
| ~~sport `catcher-mask` zh~~ **임자가 끝냈다** | `捕手面罩保护脸部。` | 두 줄이 갈렸고 `check`가 안 짚는다 |

**막힌 자리는 놓아두면 남이 푼다.** 이 줄은 여드레 동안 «파일이 막혔다»로
남아 있었는데, 그 사이 임자가 고쳐 두었다. 회차마다 `pnpm pending --free`를
돌리는 까닭이 이것이다 — 열렸는지는 아무도 알려 주지 않는다.

**`pnpm check`가 이제 이 자리를 짚는다.** 문턱은 두지 않았다 — 문장이 얼마나
겹치는지로는 못 가른다(진짜였던 `quarter-year` es가 0.5인데 멀쩡한 `souvenir`
ru가 0.40이다). 전체에서 몇 자리뿐이라 다 짚고 눈으로 가른다.

    ! 예문 둘이 문장은 다른데 한국어 줄이 같은 자리 3개 (wave zh · merge de · catcher-mask zh)

**둘째 줄을 쓰면서 첫 줄의 한국어를 그대로 둔 자리들이다.** 짧은 쪽이 남고 긴
쪽이 새로 생겼다 — 한국어가 두 문장에 다 걸리는 것처럼 보여 눈에 안 띈다.

## 국적 삼각기 · 현수막 묶음 — 표제어를 박느라 문법이 깨진 자리 (2026-09-28, 같은 날 고쳤다)

**같은 날 82문장을 다시 써서 끝냈다.** 형용사는 서술로(«Dieses Bier ist deutsch.»),
사람 명사는 주어 · 술어로 세웠다. `of-africa-the-land`의 en 표제는 소문자 `of africa`라
예문이 철자를 틀려야 했으므로 `of Africa`로 바로잡았다. 아래 표는 기록으로 남긴다.

`독일의`·`독일 사람`처럼 한국어 글씨가 든 삼각기 · 현수막으로 그린 묶음이다.
예문이 표제어를 **글자 그대로** 품어야 한다는 규칙(`pnpm check`)을 지키려고
형용사를 명사 앞에 무변화로 박고(`ein russisch Lied` · `la cerveza alemán`),
사람 명사를 목적격 자리에 주격 그대로 넣었다(`nahm ein Deutscher` ·
`послали немец`). 검사는 통과하지만 **틀린 문장을 가르친다.**

고치는 길은 하나다 — **표제어가 주격 · 서술형으로 서는 문장**을 쓴다.
형용사는 `Die Uhr ist deutsch.` · `El reloj es alemán.` · `Это немецкий сыр.`,
사람 명사는 `Unser Nachbar ist ein Deutscher.` · `Наш сосед — немец.` 꼴이다.
같은 날 넣은 `of-austria` · `an-austrian` 등 아홉이 그렇게 서 있다.

| 낱말 | 깨진 언어 | 보기 |
| --- | --- | --- |
| `travel/of-germany` | es fr de ru | `La cerveza alemán` · `La bière allemand` · `Bier deutsch Art` · `Пиво немецкий` |
| `travel/of-england` | es fr de ru | `La lana inglés` · `à la façon anglais` · `Wolle englisch Art` · `Шерсть английский` |
| `travel/of-spain` | fr de ru | `L'huile espagnol` · `ein spanisch Tuch` · `испанский шаль` |
| `travel/of-france` | fr de | `à la façon français` · `auf französisch Art` |
| `travel/of-russia` | es de | `una canción ruso` · `ein russisch Lied` |
| `travel/of-china` | de ru | `eine chinesisch Schale` · `китайский чашу` |
| `travel/of-america` | de ru | `Ein amerikanisch Schiff` · `американский пшеница` |
| `travel/of-siberia` | de ru | `Der sibirisch Frost` · `сибирский меха` |
| `travel/of-the-slavs` | de ru | `eine slawisch Sprache` · `на славянский речи` |
| `travel/of-africa-the-land` | en de ru | `an of africa grain` · `afrikanisch Korn` · `африканский зерно` |
| `city/of-the-soviets` | en de | `A of the Soviets mark` · `Ein sowjetisch Zeichen` |
| `family/a-german-man` | de ru | `Die Mühle nahm ein Deutscher` · `мельница взяла немец` |
| `family/an-englishman` | de ru | `beherbergten ein Engländer` · `приютили англичанин` |
| `family/a-spaniard` | de ru | `hielt ein Spanier` · `На лодки взяли испанец` |
| `family/a-chinese-man` | de ru | `fragte ein Chinese` · `спросили китаец` |
| `family/a-frenchman` | de ru | `von ein Franzose` · `купили у француз` |
| `family/a-muscovite` | de ru | `von ein Moskauer` · `продали москвич` |

`city/of-moscow`와 `school/english-language`는 멀쩡하다 — `Moskauer`는 어미가
안 붙는 꼴이고, 언어 명사는 목적어 자리에서도 모양이 안 바뀐다.

## 러시아어 예문 — 표제형을 격변화 자리에 그대로 박은 자리 (2026-09-28, 같은 날 고쳤다)

**같은 날 115문장을 다시 써서 끝냈다** (0fd4224a). 아래 표는 판단의 기록으로 남긴다 —
헛짚음(«в ворота» · «про время»처럼 대격이 주격과 같은 꼴)은 그대로 두었다.

국적 묶음(위 절)과 같은 병이 러시아어 전반에 있다. 예문이 표제어를 **글자
그대로** 품어야 해서(`pnpm check`) 명사를 전치사 뒤 주격으로(«в терапия» ·
«у француз»), 남성형 형용사를 여성 명사 앞에(«сексуальный глава») 두었다.
검사는 통과하지만 틀린 러시아어를 가르친다.

**기계로 뽑은 목록이라 헛짚음이 섞여 있다.** 두 규칙으로 골랐다 —
① 속·여·조·전치격만 받는 전치사(у · от · к · из · для · без · с · по …) 뒤에
표제형 명사, 또는 대격 전치사(в · на · за · про …) 뒤에 -а/-я 여성 명사,
② -ый/-ий/-ой 형용사 바로 뒤에 -а/-я로 끝나는 낱말. ②는 복수형(«дома» ·
«слова»)이나 남성 속격(«ребёнка»)도 잡으므로 **문장을 읽고 가른다.** 격변화하지
않는 외래어(«худи»)는 뺐다.

고치는 길은 국적 묶음과 같다 — **표제어가 주격으로 서는 문장**을 쓴다
(«Терапия помогла.» · «Это француз.» · «Это сексуальная сцена»는 안 되니
«Эта глава — сексуальный текст»처럼 서술로). TORFL 목록 낱말이라 표제형을
바꾸면 등급이 끊긴다.

| 낱말 | 표제어 | 걸린 까닭 | 첫 예문 |
| --- | --- | --- | --- |
| `body/therapy` | терапия | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Покой входит в терапия.» |
| `body/unable-to-speak-at-all` | немой | 남성형 형용사 + 여성 명사(ребёнка) | «Учили знаками немой ребёнка.» |
| `body/to-do-with-the-sexes` | сексуальный | 남성형 형용사 + 여성 명사(глава) | «В книге была сексуальный глава.» |
| `body/the-hold-the-drug-takes` | наркомания | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Врач писал про наркомания.» |
| `body/the-way-one-walks` | походка | 전치사 뒤 주격 (속·여·조·전치격 자리) | «По походка видно ношу.» |
| `city/a-picture-hall` | галерея | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «В галерея плохо падает свет.» |
| `city/a-crossing-place` | переход | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Телеги ждут у переход.» |
| `city/a-power-station` | электростанция | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Свет долина брала от электростанция.» |
| `city/a-swap-made` | обмен | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Условия для обмен установили.» |
| `city/a-hand-given` | помощь | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Пришли без помощь.» |
| `city/a-racist-person` | расист | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Рядом с расист никто не сел.» |
| `city/hatred-aimed-at-the-jews` | антисемитизм | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Газета писала против антисемитизм.» |
| `city/of-the-burgher-class` | буржуазный | 남성형 형용사 + 여성 명사(дома) | «У площади стояли буржуазный дома.» |
| `city/of-the-standing-orders` | классовый | 남성형 형용사 + 여성 명사(черта) | «Через деревню шла классовый черта.» |
| `city/the-killing-of-a-people` | геноцид | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Камень поставили против геноцид.» |
| `city/a-piece-of-startling-news` | сенсация | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Газету разобрали из-за сенсация.» |
| `city/carrying-an-air-of-command` | властный | 남성형 형용사 + 여성 명사(слова) | «Послушались властный слова.» |
| `everyday/a-stiff-paper-card` | карточка | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Он записал адрес на карточка.» |
| `family/a-chinese-woman` | китаянка | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Шёлк пришёл от китаянка.» |
| `family/a-frenchman` | француз | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Пресс купили у француз.» |
| `family/a-frenchwoman` | француженка | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Кружево пришло от француженка.» |
| `family/a-muscovite` | москвич | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Письмо пришло от москвич.» |
| `family/mum-at-home` | мама | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Дети первым делом бежали к мама.» |
| `family/of-a-woman` | женский | 남성형 형용사 + 여성 명사(рука) | «Эту строчку делала женский рука.» |
| `family/fallen-in-love` | влюблённый | 남성형 형용사 + 여성 명사(пара) | «В стороне села влюблённый пара.» |
| `family/one-of-the-line-that-follows` | потомок | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Землю берегли для потомок.» |
| `food/the-drying-of-it` | сушка | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Вся осень ушла на сушка.» |
| `home/a-yard-behind-the-house` | двор | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Куры ходили по двор.» |
| `home/a-washing-house` | прачечная | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «В прачечная носили бельё.» |
| `home/cobweb` | паутина | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Пыль оседает на паутина.» |
| `home/front-gate` | ворота | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Кто-то стучит в ворота.» |
| `idea/metaphor` | метафора | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Он объяснил прилив через метафора.» |
| `idea/a-question-asked` | вопрос | 전치사 뒤 주격 (속·여·조·전치격 자리) | «После вопрос приходит тишина.» |
| `idea/the-life-one-lives` | жизнь | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Зима тяжела для жизнь.» |
| `idea/lying-at-the-base` | основной | 남성형 형용사 + 여성 명사(условия) | «Сперва записали основной условия.» |
| `idea/race-above-race-belief` | расизм | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Говорили против расизм.» |
| `idea/set-straight-on-one-aim` | целеустремлённый | 남성형 형용사 + 여성 명사(рука) | «Стену кончает целеустремлённый рука.» |
| `idea/a-piece-of-folly` | глупость | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Посмеялись над глупость и забыли.» |
| `job/layman` | дилетант | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Для дилетант эти вещи одинаковы.» |
| `job/a-selfish-minded-one` | эгоист | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Никто не делился с эгоист.» |
| `job/ready-to-start-things` | инициативный | 남성형 형용사 + 여성 명사(десятника) | «Хотели инициативный десятника.» |
| `job/of-the-jewellers-trade` | ювелирный | 남성형 형용사 + 여성 명사(лавка) | «У моста есть ювелирный лавка.» |
| `nature/facing-the-east` | восточный | 남성형 형용사 + 여성 명사(склона) | «Ветер с восточный склона сушит зерно.» |
| `nature/of-the-needle-leaf-kind` | хвойный | 남성형 형용사 + 여성 명사(дрова) | «Всю зиму жгли хвойный дрова.» |
| `nature/of-an-olive-green` | оливковый | 남성형 형용사 + 여성 명사(полоса) | «По склону шла оливковый полоса.» |
| `nature/the-cold-that-bites` | холод | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Против холод раздули огонь.» |
| `nature/the-far-point-of-the-axis` | полюс | 전치사 뒤 주격 (속·여·조·전치격 자리) | «К полюс лёд толще.» |
| `number/grid-paper` | миллиметровка | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «План чертят на миллиметровка.» |
| `number/of-two-years-standing` | двухлетний | 남성형 형용사 + 여성 명사(жеребёнка) | «Купили двухлетний жеребёнка.» |
| `number/an-even-result` | ничья | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Круг кончился в ничья.» |
| `number/a-ruled-table-of-rows` | таблица | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «В таблица вписали счёт.» |
| `number/the-japanese-money` | иена | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Цена стоит в иена.» |
| `office/an-office-of-management` | администрация | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Жалобу отнесли в администрация.» |
| `office/a-seal-that-stamps` | печать | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Без печать бумага ничто.» |
| `office/made-of-paper` | бумажный | 남성형 형용사 + 여성 명사(стакана) | «Пили из бумажный стакана.» |
| `office/a-checking-over` | контроль | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Без контроль со двора ничего не уйдёт.» |
| `quality/famous` | известный | 남성형 형용사 + 여성 명사(на) | «Пекарь был известный на всю округу.» |
| `quality/loud-sound` | громкий | 남성형 형용사 + 여성 명사(на) | «Мотор был громкий на рассвете.» |
| `quality/eager-to-learn` | любознательный | 남성형 형용사 + 여성 명사(мальчишка) | «Весь день спрашивал любознательный мальчишка.» |
| `quality/whole-and-unbroken` | целый | 남성형 형용사 + 여성 명사(на) | «Мало яиц остаётся целый на той дороге.» |
| `quality/of-that-kind` | такой | 남성형 형용사 + 여성 명사(крыша) | «Именно такой крыша сбрасывает град.» |
| `quality/a-certain-few` | некоторый | 남성형 형용사 + 여성 명사(дома) | «Старую крышу сохранили некоторый дома.» |
| `quality/quick-to-flare-up` | темпераментный | 남성형 형용사 + 여성 명사(нужна) | «Коню темпераментный нужна спокойная рука.» |
| `quality/easily-moved-to-tears` | сентиментальный | 남성형 형용사 + 여성 명사(жилка) | «У старика была сентиментальный жилка.» |
| `quality/sneering-at-it-all` | циничный | 남성형 형용사 + 여성 명사(повадка) | «У торговца была циничный повадка.» |
| `quality/led-by-the-feelings` | эмоциональный | 남성형 형용사 + 여성 명사(толпа) | «Площадь заполнила эмоциональный толпа.» |
| `quality/quick-to-answer-a-need` | отзывчивый | 남성형 형용사 + 여성 명사(женщина) | «Рядом жила отзывчивый женщина.» |
| `quality/the-look-of-a-thing` | вид | 전치사 뒤 주격 (속·여·조·전치격 자리) | «По вид его оценили.» |
| `school/staffroom` | учительская | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Учителя собираются в учительская.» |
| `school/out-in-space` | космический | 남성형 형용사 + 여성 명사(холода) | «У космический холода нет дна.» |
| `school/to-do-with-music` | музыкальный | 남성형 형용사 + 여성 명사(вечера) | «До рассвета шли музыкальный вечера.» |
| `school/meant-for-learning` | учебный | 남성형 형용사 + 여성 명사(комната) | «Во двор смотрит учебный комната.» |
| `school/the-study-of-language` | филология | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Поздно он повернул в филология.» |
| `school/of-reckoning` | математический | 남성형 형용사 + 여성 명사(задача) | «Неделю заняла математический задача.» |
| `school/touched-with-genius` | гениальный | 남성형 형용사 + 여성 명사(работа) | «Это была гениальный работа.» |
| `school/of-the-latin-tongue` | латинский | 남성형 형용사 + 여성 명사(названия) | «Учили латинский названия трав.» |
| `school/the-talk-of-one-trade` | жаргон | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Слово вышло из жаргон.» |
| `sport/goal-post` | ворота | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Мяч попал в ворота.» |
| `sport/games-and-sport` | спорт | 전치사 뒤 주격 (속·여·조·전치격 자리) | «Зима не оставляет места для спорт.» |
| `sport/for-skiing-down-a-slope` | горнолыжный | 남성형 형용사 + 여성 명사(трасса) | «На холме открылась горнолыжный трасса.» |
| `time/the-time-of-it` | время | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Никто не спросил про время.» |
| `time/coming-round-in-turn` | периодический | 남성형 형용사 + 여성 명사(беда) | «Разливы это периодический беда.» |
| `transport/the-loop-you-hold` | поручень-петля | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Хватайся за поручень-петля при тряске.» |
| `transport/delayed` | опоздавший | 남성형 형용사 + 여성 명사(на) | «Два поезда пришли опоздавший на час.» |
| `travel/a-going-away` | поездка | 전치사 뒤 주격 (여성 명사 대격은 -у/-ю) | «Берут хлеб на три дня в поездка.» |
| `travel/of-america` | американский | 남성형 형용사 + 여성 명사(пшеница) | «Поздно зреет американский пшеница.» |
| `travel/of-siberia` | сибирский | 남성형 형용사 + 여성 명사(меха) | «Дороже всех сибирский меха.» |
| `travel/of-africa-the-land` | африканский | 남성형 형용사 + 여성 명사(жара) | «Месяц стояла африканский жара.» |
| `travel/of-the-railway-line` | железнодорожный | 남성형 형용사 + 여성 명사(шлагбаума) | «У железнодорожный шлагбаума ждали.» |

## 이 목록은 어떻게 다시 만드나

`pnpm check`가 세 갈래를 각각 다른 문구로 낸다.

    ! … 에 "X"가 없습니다. 예문이 그 단어를 보여주지 않습니다   ← 굴절형만 있음
    ! … 이 "X"를 대문자로 씁니다. …                              ← 대소문자
    ! 문맥 카드를 못 만드는 낱말 N개 (de N) …                     ← 둘 다 죽은 자리

셋째 줄만 **낱말 단위로 모아서** 낸다. 앞의 둘은 줄마다 우는데, 예문 하나가
죽어도 카드는 나오므로 급한 자리가 아니라서다 (scripts/check.ts).

## 넘긴 것은 넘긴 채로 둔다

목록을 적어 두는 것과 그 목록을 대신 처리하는 것은 다른 일이다
([nets.md](nets.md)). `pnpm dup`이 ⟨손대는 중⟩을 붙이는 파일은 특히 그렇다.
