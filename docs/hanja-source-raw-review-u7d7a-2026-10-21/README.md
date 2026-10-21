# 絺 원 raw 정적 대응 검토

ROOT가 기존 raw 비교 화면에서 국내13획과 base16raw·VS0의 정적 자형을 대조했습니다. whole 세 그림의 모든 ink가 보이는 상태에서 호환을 확인했습니다. base와 VS0 body는 같은 bytes이므로 독립 근거 두 건으로 세지 않습니다. viewport518×766에서 SVG520의 흰 모서리만 잘리고 실제 ink는 모두 보였습니다. 전체 SVG box가 잘리지 않았다는 주장은 하지 않습니다.

확인된 국내1–13 → 원 raw1–16의 **1-based 정적 대응**은 다음과 같습니다.

```text
[[1,2],[3,4],[5],[6],[7],[8],[9],[10],[12],[11],[14],[15,16],[13]]
```

국내1은 raw1·2 각각의 single과 국내1/raw2 prefix로, 국내2는 raw3·4 각각의 single과 국내2/raw4 prefix로 대조했습니다. 국내3–8/raw5–10은 각각 두 그림, 총12이미지에서 대응을 확인했습니다. 최초 국내9/raw11·10/raw12·11/raw13·12/raw14의8이미지는 불일치한 **음성 관찰**입니다. 이를 통과로 세지 않습니다. 수정한 국내9/raw12·10/raw11·11/raw14·12/raw15 및 raw16 각각·13/raw13은12이미지에서 정적 대응을 확인했습니다.

이 배열은 source-specific 조건부 후보 대응 제안입니다. sourceGroups는 빈 배열로 유지하며 새 source 캐시나 progressive 합획을 작성하지 않습니다. 방향·시간·합획 애니메이션·native runtime·앱 승인은 모두 false입니다. 기존 최소15>국내13 HOLD와 NOTICE false는 변경하지 않습니다. 새 source8은 다른 단계이며 이 문서의 입력핀에 넣지 않았습니다.

원 자료는16raw/17drawing calls/38polygon입니다. base body3는 같은 body를 가진 기존 actual full5에 결박됩니다. VS0는 별도 root/file의 body3-only이며 같은 bytes라는 이유로 base full5/header를 승계하지 않습니다. 국내 원 XML viewBox는 `0 0 1024 1152`, 원 group transform은 실제 XML 값을 그대로 표시했습니다. 원 raw viewBox는 `0 0 200 200`입니다. 새 좌표·원 polygon·trace·guide 변경은 없습니다.

서버 PID27614/port59412/session12904는 ROOT가 종료했습니다: SIGINT exit130, 출력0, 이후 ps 결과가 비어 PID 부재를 확인했습니다. startup 국내 원문 RAM fetch는1회이며 파일 저장은 없습니다. 사용자 tab62는 유지하고 같은 origin의 다음 후보 화면은 ROOT가 관리합니다. 이 문서 작성자가 시작한 서버는0입니다.

새 문서2의 메타데이터와 고정 입력8핀만 최초1회 확인합니다. 원 helper5와 batch949 full5/body3 세 파일만 결박하며, 기존 검사·compiler·factory·projection·engine·API·UI·서버·Git·빌드 실행은0입니다.
