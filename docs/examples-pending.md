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

## 카드가 아예 안 나오는 일곱

두 예문이 **둘 다** 못 뚫는 자리다.

| 낱말 | 표제형 | 예문이 쓰는 꼴 |
| --- | --- | --- |
| `action/cut-with-scissors` ja | `はさみできる` | `はさみで切る` — 읽기는 가나인데 예문은 한자로 적었다 |
| `quality/left-side` de | `link` | `der linke` · `ein linkes` |
| `quality/right-side` de | `recht` | `der rechte` · `ein rechtes` |
| `quality/favourite` de | `liebst` | `die liebste` |
| `quality/former` de | `ehemalig` | `der ehemalige` |
| `quality/evening-time` de | `abendlich` | `die abendliche` |
| `quality/highest` de | `höchst` | `der höchste` |

**독일어 여섯은 한 가지 문제다.** 형용사의 무변화형(`link`·`höchst`)은
명사 앞에서 늘 어미를 받으므로 **문장에 그 꼴로 설 수 없다.** 예문을 고쳐
될 일이 아니라 표제형을 정하는 방식의 문제다. 길은 둘이다.

- 표제형을 **서술 용법**이 되는 자리로 바꾼다 — `Die Tasse ist mir am
  liebsten.`처럼 어미가 붙지 않는 꼴을 쓰는 낱말로 고르거나,
- 표제형을 **굴절형 하나**로 박는다(`linke`). 그러면 예문 둘이 다 그 꼴을
  쓰게 맞춰야 한다.

어느 쪽이든 `quality.json`을 만지는 일이라 임자가 정할 몫이다.

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

그러니 이 여섯은 **더 큰 문제의 첫 사례가 아니라 그 자체로 닫힌 목록**이다.
고치고 나면 이 절을 통째로 지운다.

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
| everyday | `housework` en | `Housework fills her mornings.` |
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

| 파일 | 낱말 | 표제형 | 예문이 쓰는 꼴 |
| --- | --- | --- | --- |
| action | `set-off-fireworks` en | `set off fireworks` | `setting off fireworks` |
| action | `avoid` es | `evitar` | `evitan` |
| action | `avoid` fr | `éviter` | `évitent` |
| action | `excavate` en | `excavate` | `excavating` |
| ~~food `choke-on` de~~ | — | — | **끝냈다** — `Beim Lachen kann man sich verschlucken.` |
| ~~food `pick-fruit` en~~ | — | — | **끝냈다** — `When it rains they cannot pick fruit.` |

영어 셋은 모두 **분사로 바꿔 쓴 자리**다(`Rain stops them picking fruit.`).
표제형을 그대로 세우려면 문장을 `They pick fruit before the rain.`처럼
정형으로 고친다.

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

| 파일 | 개념 | 표제형 | 예문 |
| --- | --- | --- | --- |
| action | `maintain`(정비하다) | `instand halten` | `Sie instand halten die Pumpe monatlich.` |
| action | `diffuse`(퍼지다) | `sich ausbreiten` | `Gerüche sich ausbreiten im Flur.` |
| action | `remain-over`(남다) | `übrig bleiben` | `Zwei Brote übrig bleiben abends.` |
| action | `hold-in-palms`(두 손으로 들다) | `mit beiden Händen halten` | `Sie mit beiden Händen halten die Schale.` |
| action | `carry-by-hand`(손에 들고 가다) | `in der Hand tragen` | `Sie in der Hand tragen die Kisten.` |
| action | `cut-with-scissors`(가위질하다) | `mit der Schere schneiden` | `Sie mit der Schere schneiden am Falz.` |
| action | `read-aloud`(소리 내어 읽다) | `laut vorlesen` | `Sie laut vorlesen jeden Morgen.` |
| action | `gaze-into-distance`(먼 곳을 보다) | `in die Ferne blicken` | `Sie in die Ferne blicken vom Grat.` |
| action | `patrol`(순찰하다) | `Streife gehen` | `Wächter Streife gehen bei Nacht.` |
| action | `pace-back-and-forth`(서성이다) | `hin und her gehen` | `Sie hin und her gehen beim Warten.` |
| action | `face-up-to`(맞서다) | `sich stellen` | `Sie sich stellen dem Verlust gemeinsam.` |
| ~~body `raise-head`~~ | — | — | **끝냈다** — `Beim Geräusch mussten sie den Kopf heben.` |
| ~~food `pick-fruit`~~ | — | — | **끝냈다** — `Sie wollen vor Sonnenaufgang Obst pflücken.` |
| ~~idea `run-right-through`~~ | — | — | **끝냈다** — `Die Rohre sollen im Mauerwerk durchgehend verlaufen.` |
| job | `receive-guests`(손님을 맞다) | `Gäste empfangen` | `Sie Gäste empfangen am Markttag.` |
| ~~nature `breed-animals`~~ | — | — | **끝냈다** — `Sie wollen für den Markt Tiere züchten.` |
| ~~office `recruit`~~ | — | — | **끝냈다** — `Zweimal im Jahr müssen sie Personal suchen.` |
| ~~transport `intersect`~~ | — | — | **끝냈다** — `Am Brunnen können die Wege sich kreuzen.` · `Hier müssen zwei Gleise sich kreuzen.` |

**어형 변화를 안 시킨 자리도 둘 있다.** 표제형을 그대로 박느라 굴절을 뺐다.

| 파일 | 개념 | 예문 | 바른 꼴 |
| --- | --- | --- | --- |
| city | `united-nations`(국제 연합) | `Die Vereinte Nationen schickten Hilfe.` | `Vereinten` |
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
| family | `sibling` es | `Él vive con sus hermanos.` | 형제자매가 둘 있습니다 | 그는 형제자매와 삽니다 |
| family | `sibling` de | `Er hat ältere Geschwister.` | 형제자매가 둘 있습니다 | 그는 손위 형제자매가 있습니다 |
| time | `quarter-year` zh | `第一季度在三月结束。` | 분기가 끝났습니다 | 1분기는 3월에 끝납니다 |
| time | `quarter-year` es | `El primer trimestre terminó en marzo.` | 분기가 끝났습니다 | 1분기는 3월에 끝났습니다 |
| time | `quarter-year` fr | `Le premier trimestre s'est fini en mars.` | 분기가 끝났습니다 | 1분기는 3월에 끝났습니다 |

**남은 하나는 `nature/wave` zh다.** `海浪拍在岸边。`(파도가 물가를 친다)인데
한국어 줄이 «파도가 높습니다»다. `nature.json`이 만져지는 중이라 못 고쳤다.

**둘째 줄을 쓰면서 첫 줄의 한국어를 그대로 둔 자리들이다.** 짧은 쪽이 남고 긴
쪽이 새로 생겼다 — 한국어가 두 문장에 다 걸리는 것처럼 보여 눈에 안 띈다.

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
