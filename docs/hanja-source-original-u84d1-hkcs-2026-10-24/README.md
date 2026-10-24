# 蓑 HK 원본14획 대조 DRAFT

실제 공급자는 hkcs_m84d1이다. u84d1-hkcs는 로컬 파일·폴더 태그일 뿐이며 공급자alias를 만들지 않는다. 공식독립참조 sourceContext=u84d1은 공급자이름이 아니다. 프로덕션 import·등록은 금지한다.

- 원full5의17raw·16drawingrows·16calls·29P를 모두 그대로 보존한다. 원raw7(0-based6)은type0,raw[0,null×10],trace[],P[]이며 뜻을추정하지않는다.
- 이 metadata행을 특정筆畫에억지로붙이지않고 originalNonDrawingRawRows=[6]으로 별도공개한다. drawinggroups16rows와metadata1row의합이17원행을각각한번포함하도록guard한다. 미표시stroke추가·원행삭제·재번호화는하지않는다.
- 8획H→V(raw8+9)는원endpoint[148,83.15]가같다.12획V→Q(raw13+14)는end[66,177.2]/start[36,178.85],delta[-30,1.65]로다르다. 별도2masks와원guide gap을유지하며connector나force join을추가하지않는다. sourcePfoot/clock은미증명이다.
- 14획시작은공식실제관찰의口아래11획분기이상으로확대해승인하지않는다. 옛K/다른원본HOLD는독립보존한다.

공식14방향42화면과whole macro일치는원부분static·접촉·재생승인과별개다. sourceStaticMappingApproved/nativeApproval/runtimeApplied/productionImportAllowed=false.
