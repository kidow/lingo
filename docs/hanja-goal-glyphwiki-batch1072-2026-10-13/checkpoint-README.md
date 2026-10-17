# 1072 遝 native/source 보류 checkpoint

Root는 선택 VS2 compiled whole pair1과 source family11개를 실제 관찰했습니다. base/K/VS0/VS1/var004는 辶두점과 안쪽 빗금4개가 국내형과 호환합니다. VS2/var001/var002/var005는 한점·오른쪽 연속내림이라 다르고 var003/var006은 水자형이 다릅니다. 선택VS2의 6획만 실제520×520에서95/99.99/100%를 비교했고, 약1px tip차이와 crop전체약1px이동의 시각적 구분은 불확실했습니다. 큰 pixel FAIL로 기록하지 않으며 다른 방향/coarse/fine/replay 관찰0입니다.

공개 source만으로 독립 계산한6획은 원raw[6,7] L한 mask, 폭14/반경7입니다. 원 polygon의 엄격내부 witness(82.73,35.82825)는 완전 guide거리7.4905,99.99%거리7.4961로 반경밖이며 원body경계와0.03 떨어져 있습니다. 이전획 edge거리39.48, L join거리22.8724로 이전획/miter도 덮지 않습니다. 따라서 p1 full-outline 분기는 점 하나가 아닌 양의 잔여영역을 추가합니다. 이는 source coverage 실패이며 pixel크기·큰 육안flash를 추론한 결과가 아닙니다. 기존 terminal분리[]/cardinalraw[5]는5획만 해당해6획보정은 없습니다.

호환5whole은 모두17raw이며 exactendpoint쌍은0-based[2,3],[6,11],[7,8]입니다. [6,11]은罒왼V와마지막H를한획으로묶는비연속수치후보일뿐 국내5획경계와다릅니다. 이를분리하면15획이며14획에는원raw4 Q끝(55,154)→raw5 Bezier시작(53,152)의gap2.8284를새경계로묶어야합니다. 새adapter/좌표/폭/connector는만들지않았습니다.

원31파일·shared3·NOTICE/strictprep는동결합니다. root child97287/wrapper97286 port61979는종료됐습니다. 실제1070 부모SHA a31b4f4cd665cc1d6aeaadf71cf716a6d2dcdfd5c5776170214a178af338800a를연결했습니다. 부모적용5549/5978·미적용429·historical320중해결된494鼐를제외한active319를승계합니다. 집중검증을정확1회실행해 원31/shared3핀·부모actualSHA·전체131refs(문자열80/객체240)의historical320중해결494鼐제외active319·遝중복0을확인했습니다. 실제遝lookupnull/등록0·鼐runtime존재·runtime5549도통과했습니다. 신규보류1을추가하여 historical321/active320이며 적용5549/5978·미적용429는유지합니다. 과거494hold문서는보존합니다. sourcecompile/engine/추가native/HTTP/server/build/Git실행0입니다.
