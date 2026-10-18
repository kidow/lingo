# 추가 H→V23 표시 마스크 격리 실험

畽971 2획·炰986 3획·嗿963 2획·暵999 2획·哻1000 2획만 대상으로 합니다. 원 H/right·V/down 호출의 폴리곤·bounds·길이 weight를 그대로 사용합니다. 기존 d59eb13f…53fe eligibility+derive 코드는 바이트 동일합니다. 새 좌표·guide·폭·연결선·필순은 만들지 않습니다. 대상 획만1→2마스크이고 다른 획과 원 outline 바이트는 동일합니다.

- 畽: 원 full5/id5(unprefixed/Sha256) adapter를 그대로 사용하고 그 내부의 legacy2args 호출도 보존합니다. **국내3H/4V 대 원3V/4H, 국내12H/13V 대 원12V/13H의 순서 불일치는 미승인·미해결입니다.** 이 실험에서 순서를 바꾸지 않습니다. 말단 실험 통과만으로 전체 필순 승인이나 등록은 불가능합니다.
- 炰: 원 full5/id5(unprefixed/Sha256)·u5305-ue0101@2 명시버전 provider identity/SHA를 유지합니다.
- 嗿: 원 full5/id3(root/file/fileSHA256, unprefixed)를 유지합니다.
- 暵·哻: 원 full5/id7(./prefix와 Sha256 포함)을 유지합니다.

모든 외부 호출은 명시3/4인수·exact identity·fullproof 전체 해시·trace·input pin·정확 H/V 접점/flag 검사 후에만 원 API에 위임합니다. 고정 source closure는 각각6/4/8/8/7 records이며 missing/alias0·engine8 hash를 정적으로 확인했습니다. archive/provider를 새로 요청하거나 engine을 재실행하지 않았습니다. 원 NOTICE·proof·hold·registry는 불변입니다. 공개 fixture만 저장하며 국내 SVG는 RAM-only입니다.

Root 실행 예: `python3 -B serve.py --target 971 --port 0` (986/963/999/1000 선택). 준비 작업은 서버를 시작하지 않습니다. 공개 fixture cache로 startup/GET compile0·engine0. `/whole`, `/pairs?stroke=N`, `/progressive?stroke=N`, `&coarse=1`, `/checks`를 지원합니다. actual520·0/epsilon/95/99.99/100·새 H/V 경계 전/중/후·9coarse·자연재생은 root가 새로 관찰해야 합니다.

source-only입니다. p0/epsilon visible ink·H/V 경계·역행/도약·AA·말단·국내 방향은 아직 승인하지 않았습니다. V-local 면적 probe는 부동소수점 근사로 whole-pen 시각 certificate가 아닙니다. nativeApproval=false/runtimeApplied=false, canonical/hold 변경0.

집중 검증1회 exit0: 양성 각1회(총5), 음성97개는 모두 원 API 위임 전에 거절했습니다. Node구문 각1/PythonAST1/staticguard1 PASS. 원 폴리곤 각각 정확히1회·다른 획 불변. engine/HTTP/server0. 신규 후보는 嗿14p15m27poly·畽14p15m23poly·炰9p12m27poly·暵15p16m28poly·哻10p11m16poly입니다. V-local99.99% 잔여면적은 양수이고100%는0이지만, AA/whole-pen 경계의 시각 합격을 뜻하지 않습니다.
