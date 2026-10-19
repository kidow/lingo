# 麌 새순서 start-gate · 자연재생 시작 보류

원renderer6 `docs/hanja-renderer-start-gate-order-u9e8c-experiment-2026-10-20/`(root제공commit접두895f3ef)와보정source8 `docs/hanja-source-independent-vq-up-order-u9e8c-source-experiment-2026-10-20/`를그대로보존합니다. 원HOLD나원native기록을덮지않는별도관찰기록입니다.

## root 관찰 범위

- 전체자형1회호환. 75%방향화면에서4·5·6을국내원자료와각각대조PASS. 새4→원5,새5→원6,새6→원4이며앞서미확인인5·6대응을해소했습니다. 다른15방향은미검토입니다.
- fine0·coarse0·coverage0·multi경계0입니다.
- FIRST 자연재생11획의설정시간은8초입니다. 시작UI `2.60375000%`, 실제오른쪽new520px에서상단흰틈과그아래세로분리섬을관찰하여FAIL입니다. 가운데기존renderer는연속형태였습니다. 이후root가UI `100.00000000%`와오른쪽11획완성형이가운데기존형태와같음을확인했습니다. 완료일치는초기시작FAIL을상쇄하지않습니다. 실제경과초수는별도로측정하지않았습니다.
- 다른freshgate검토를중단했습니다. 완료상태와서버STOP을아래처럼확인했으며다른freshgate는추가하지않았습니다.

## 미확정 상태

원인(표시수학·raster·초기paint등)은확정하지않습니다. 기존棖정책이나다른후보의성공/실패를이후보에상속하지않습니다. 새native승인false/runtimefalse이며앱·registry를수정하지않았습니다.

root서버PID89385/port65373/session58771은root가전용종료했고exit143을확인했습니다. 이작성자는서버를시작하거나종료하지않았습니다. 원renderer/source14파일SHA를hold.json에고정했습니다. 새geometry/sourcecompiler/engine/UI/Git/build0입니다.

커밋메시지: docs(hanja): hold 麌 order renderer on natural start gap
