# 綅 원 raw 정적 대응 검토

ROOT가 국내13/base18/VS0 whole 세 자형을 각1이미지로 대조해 모든 ink의 정적 호환을 확인했습니다. base와 VS0는 실제 body가 다르며 혼합하지 않았습니다. viewport518×766에서 SVG520의 흰 여백만 잘리고 ink는 모두 보였습니다. 국내 원 viewBox는 `0 0 1024 1152`, raw는 `0 0 200 200`입니다. 전체 SVG box가 잘리지 않았다는 주장은 하지 않습니다.

국내1–13 → base 원 raw1–18의 **1-based 정적 대응**은 다음과 같습니다.

```text
[[1,2],[3,4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16,17],[18]]
```

국내1/raw1·2 single3이미지, 국내2/raw3·4 single3이미지를 확인했습니다. prefix 국내1/raw2와 국내2/raw4는 각2이미지로 대조했습니다. 국내3–6/raw5–8은 각2, 총8이미지입니다. 국내7/raw9·10 single3, 국내8/raw11·9/raw12·10/raw13은 각2로 총6, 국내11/raw14·15 single3, 국내12/raw16·17 single3, 국내13/raw18 single2를 확인했습니다. 추가 prefix 국내7/raw10·국내11/raw15·국내12/raw17은 각2, 총6이미지에서 호환을 확인했습니다. 모두 정적 관찰이며 방향·시간의 검증이 아닙니다.

원 base는18raw/18calls/35polygon이며 같은 body3를 가진 실제 full5에 결박됩니다. VS0는 다른 body3-only로 base header를 승계하지 않습니다. 원 HOLD의 최소15>국내13 제한과 NOTICE false는 그대로 둡니다. 위 배열은 source-specific 조건부 후보 제안일 뿐이며 sourceGroups=[]를 유지합니다. exact endpoint raw9→10·14→15·16→17과 비영점 raw1→2·3→4는 원자료 사실이며 새 connector를 허용하지 않습니다. 별도 source8은 후속 단계로 이 리뷰 입력핀에 넣지 않았습니다.

ROOT 서버 PID31217/port59412/session70435는 SIGINT exit130, 출력0으로 종료했고 이후 ps 결과가 비어 PID 부재를 확인했습니다. 국내 원문은 startup RAM fetch1회이며 파일 저장0입니다. 사용자 tab62는 유지했습니다. 이 문서 작성자의 서버/UI 실행은0입니다.

새 리뷰2와 입력8핀만 최초1회 확인합니다. 기존 검사·compiler·factory·projection·engine·geometry·API·UI·서버·Git·빌드0입니다. temporal/native animation/actualcomponent/app/runtime 승인은 false로 유지합니다.
