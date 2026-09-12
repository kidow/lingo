# batch9 B의 A 교차 검토

고정 6자 遷·徹·滯·觸·追·肖(기준 81획)를 독립 검토했습니다. 徹·滯·觸·肖 4자·56획 일치, 遷·追 2자·25기준획 보류 유지입니다. A 원본 해시는 `5fff7a9cbcaa97c061dab0e391a50d6787d8164516e22a6cba278cdc2d54aeaf`입니다.

전체 개별 영상 2fps, 일치한 56획 및 보류 제안 26구간의 10fps 표본을 열람했습니다. 일치 56개 누적 상태와 보류 追 제안 10개 누적 상태를 실제 생성기에서 재생성한 5단위·둥근 끝·둥근 이음 SVG로 확인했고, 모든 원문 및 존재하는 출력 완성형은 420px로 대조했습니다.

| 한자 | 판정 | 근거 |
| --- | --- | --- |
| 遷 | hold | Fresh whole22.231s source, all45 overview frames, all16 proposed segment samples, lower-body11.0–14.9s and walking17.4–18.9s details were independently viewed. The lower form has a top turn, separately painted inner bar and lower bowl; the walking zigzag pauses around17.7–18.1s then continues from the same point. A pause alone does not prove pen lift. Neither a definitive15-stroke segmentation nor an authoritative16-stroke claim is established by this video, so hold is retained. No runtime geometry is approved. |
| 徹 | matched | Fresh whole23.148s source and15 completed samples match 彳, 育 and 攵 order and directions. Every actual cumulative path was independently inspected at width5 and final source/output420px. The two inner 月 bars meet both walls, while 彳/育, central upper form/right fall, 月/right falling tip, and the two independent 攵 stroke ends preserve the source gaps. No actionable finding. |
| 滯 | matched | Fresh whole19.215s source and14 completed samples confirm water3, upper bar, short left falling stroke, two uprights, lower short bar, right bent hook, cover2 and 巾3. The moved source8 precedes sources5/6/7 as actually painted. Every width5 cumulative path and420px source/output final match the upper boundaries and lower central vertical connection to the cover. No actionable finding. |
| 觸 | matched | Fresh whole25.398s source and20 completed samples confirm the two internal 角 horizontals before its late central vertical, then the upper net and lower enclosing hook and 虫. All20 actual cumulative states and420px source/output finals preserve box closures, central contacts and the gaps between 角/right components and the lower dot/outer hook. No actionable finding. |
| 追 | hold | Fresh whole13.648s source, all27 overview frames, ten proposed completion samples and every10fps sample9.2–10.6s were independently inspected. The zigzag pauses at9.7–9.9s and resumes at10.0s from the same point without visible relocation or an independently established pen-up. Splitting original8 to force the catalog10 strokes is therefore unproven. The10-path proposal and420px output were reviewed only as withheld geometry; boundary status stays inconclusive and hold is retained. |
| 肖 | matched | Fresh whole10.581s source and7 completed samples confirm the central upper vertical before the left downward falling stroke and right downward spreading dot, followed by 月4. Both corrected upper stroke directions and the two inner bar contacts match. All7 actual cumulative paths and420px source/output final inspected. No actionable finding. |

遷의 17.7–18.1초와 追의 9.7–9.9초에는 꺾임 중간에서 멈춘 뒤 같은 지점부터 진행합니다. 이것만으로 펜 이탈이나 독립 획 경계를 확정하지 않았습니다. 기준 획수에 맞추는 추정 병합·분할 및 다른 한자 대체는 하지 않습니다.

원문 해시, 작성자 기록·보정·경로 해시와 표본 시각은 [peer-b.json](peer-b.json)에 기록했습니다. 작성자 파일과 공유 원장은 변경하지 않았습니다.
