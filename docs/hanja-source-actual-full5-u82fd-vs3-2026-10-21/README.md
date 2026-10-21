# 苽 VS3 단일-root 실제 full5 capture

공식 KAGE revision `49232bac0348fe815f4200d4116ab7917e0db47f`의 고정 공개8코드를 RAM으로 받아 각각 원byte SHA를 검증한 뒤 같은새VM에서 `Kage.makeGlyph(u82fd-ue0103)`를 최초1회 실행했습니다. 이 VM에서 나온 groups/trace/defaults와 실제로드8코드의 revision/hash를 함께 기록했습니다. 기존 VS3 body3에 base header를 붙인 기존 compiler는 import/run하지 않았습니다. 엔진코드는 파일로 캐시하지 않았으며 원source와 원body3를 고치지 않았습니다.

원 `sources.json` SHA `4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71`의 정확한 closure5는 `koseki-345030`, `u74dc-g@3`, `u8279-k03`, `u82fd-ue0103`, `ufa5e-03`입니다. missing/cycle0을 확인한 같은 closure만 VM에 넣었습니다. 원capture 선례의 instrument SHA `43ed615b6605551eb59bc7330854f468f382230297047a59fa7691fe422c8436`를 그대로 사용했으며 기존 top-level registry import/다중후보 capture 도구는 실행하지 않았습니다.

새 `engine-whole-u82fd-ue0103.json`은 actual full5/defaults·engineHashes·engineRevision·groups·trace입니다. 원body3의 defaults/groups/trace와 deep-equal PASS,10raw/11drawing calls/22polygon으로 원모든필드가 동일합니다. 새파일SHA `9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840`, canonicalJSONSHA `236cbcb6c74b75d47c7d9b9d02c31240a3ee427979712b06efdf2de7e0298747`, 새id3는 root=u82fd-ue0103/file=engine-whole-u82fd-ue0103.json/SHA=9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840입니다. 파일경로가 다른 원body3의 id3·상태를 바꾸지 않습니다. canonical hash가 과거 합성prepared 값과 같아도 이번 실제capture provenance는 별도이며 과거 false/HOLD를 승인으로 덮지 않습니다.

## 실제 실행 이력

1. 로컬캐시 경로 조사에서 고정 엔진파일을 찾지 못했습니다. 일부 macOS 공용 임시경로의 접근불가 파일은 건드리지 않았습니다.
2. native MCP sandbox의 공식code8 RAM수신 준비는 DNS ENOTFOUND로8요청 모두 실패했습니다. 수신/검증0,VM평가0,capture0입니다. HTTP응답·해시불일치나 보안거절로 분류하지 않습니다.
3. 허용된 네트워크권한CLI에서 같은공식URL/revision8요청만 수신해 byteSHA8/UTF8 roundtrip을 모두 검증했습니다. 동일VM code평가8 후 rootcapture FIRST1, 원body deep-equal PASS였습니다. HTTPcode본문·enginecode stdout0, 자격증명/비공개저장소내용 전송0입니다. 결과 proof만 RAM을 거쳐 즉시 apply_patch로 별도 고정했습니다.

`capture.mjs`는 이 최초작업의 재현용기록이며 지금 다시 실행하지 않습니다. `check.mjs`는 code/network/engine을 호출하지 않고 고정proof/실제코드manifest/id3·원body 동일성과 변조 거부만 확인합니다. 새cachedfocused1·필요한구문·최종메타1 외 기존통과검사/build/TSC/서버/UI/Git 실행0입니다. 이full5는 source근거 확보일 뿐 정적대응의 동적grouping·source/native/APP/runtime 승인false입니다. 다음source candidate는 별도 단계입니다.
