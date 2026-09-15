# 같은 그림이 두 slug에 — PAR=1, 한 프로세스, 같은 호출

`genimg`의 md5 그물이 잡는 사고 가운데 **아직 원인을 모르는 한 갈래**를 적어 둔다.
`scripts/genimg.sh` 머리말은 이 사고를 «동시 실행»과 «프로세스 나눠 돌리기»의
탓으로 적어 두었는데, 아래 두 번은 **둘 다 아니었다.** PAR=1이고, 프로세스가
하나였고, 두 장이 같은 호출 안에 있었다.

## 겪은 것

| 언제 | 겹친 두 장 | 어느 쪽 그림이 살아남았나 |
| --- | --- | --- |
| 세 글자 2회차 (`20abf50b`) | `quiet-lasting-power` · `the-pull-of-liking` | 적어 두지 않았다 |
| 두 글자 9회차 (`32f9f466`) | `a-wry-smile` · `stumble-over-ones-words` | **앞의 것**(`a-wry-smile`의 찻잔) |

두 번 사이에 **그림 360장 · 회차 스물**을 뽑았다
(`git log --diff-filter=A --name-only --pretty=format: 20abf50b..HEAD -- public/concepts | grep -c webp`).
이백 장에 한 번쯤, 열 회차에 한 번쯤이다. 드물지만 회차마다 걸릴 만큼은 잦다.

## 다시 나오는 조건 — 둘을 같이 부르면 또 같다

두 글자 9회차에서 확인했다. 순서대로 돌렸다.

```bash
rm -f .images/a-wry-smile.png .images/stumble-over-ones-words.png
PAR=1 pnpm genimg a-wry-smile stumble-over-ones-words
#   경고 — 같은 그림이 여러 slug에 들어갔다  ← 또 같다

rm -f .images/stumble-over-ones-words.png
PAR=1 pnpm genimg stumble-over-ones-words
#   제 그림이 나온다
```

**둘을 지우고 둘을 같이 다시 불러도 또 같은 파일이 나온다.** 한 장만 혼자
부르면 그제야 제 그림이 나온다. `genimg`의 경고는 여태 «해당 slug를 지우고
PAR=1로 다시 돌리세요»라고 일렀는데 이 갈래에서는 듣지 않는 말이었다 —
이미 PAR=1이었다. 그래서 «한 장씩 따로»로 고쳤다.

살아남은 쪽이 인자 목록의 **앞**이었다는 것이 눈에 띄지만, 순서를 뒤집어
확인해 보지는 않았다. 자리 탓인지 slug 탓인지는 **아직 모른다.**

## 걸러 낸 것

원인이 아닌 것으로 확인한 자리들이다. 다음 사람이 같은 데를 다시 파지 않게.

- **동시 실행이 아니다.** 두 번 다 `PAR=1`, 출력의 «동시 1»로 확인했다.
- **프로세스를 나눈 것도 아니다.** 한 번의 `pnpm genimg` 호출 안이었다.
- **임시 자리가 겹친 것이 아니다.** `run_one`은 slug마다 `$TMP/$slug`를 따로 쓴다.
- **프롬프트가 같아서가 아니다.** 찻잔과 설탕 그릇 · 건너뛰는 박음질로, 닮은
  데가 한 군데도 없다.
- **스킬 쪽 캐시가 아니다.** `~/.claude/skills/gpt-image/scripts/gpt_image.mjs`에
  결과를 재사용하는 자리가 없다 (`cache`/`dedup`/`hash`로 훑었고, `createHash`는
  설치본 검증에만 쓰인다).

남는 자리는 **생성 쪽이 앞 job의 결과를 그대로 돌려준 것**인데, 여기서는
더 볼 수 없다. 다음에 걸리면 `$TMP/<slug>/log` 두 개를 지우기 전에 남겨 두면
좋겠다 — 두 로그가 같은 asset id를 가리키는지가 갈림길이다. 지금 구조에서는
`rm -rf "$TMP"`가 끝에서 지워 버린다.

## 그물 쪽에서 기억할 것

md5는 **요청한 장만이 아니라 `.images/` 전체**와 대조한다. 그래서 다른 회차에
만든 장과 같아진 자리도 잡는다. 대신 **바이트만 다른 같은 그림**은 못 본다 —
그건 시트가 볼 자리다 ([nets.md](nets.md)).

`twins`는 이 사고를 **못 잡는다.** 회차 안의 두 장이 이미 같은 해시라 «닮은
쌍»으로 세지 않고 지나간다. 두 번 다 `twins`는 0쌍이라고 했다.
