# 4급II 기하 미보유 4자 추가 조사

2026-09-08. 기존 AnimCJK Ko/Ja에서 정확한 문자 키를 찾지 못한 稅·餘·硏·鄕을 조사했다. 다른 글자나 호환되지 않는 자형으로 자동 치환하지 않았다.

## 고정 원본 확인

| 원본 | 리비전 | 파일 SHA-256 | 결과 |
|---|---|---|---|
| AnimCJK graphicsZhHant.txt | ec5e17cca76c87587790bcbce5ea0b4d4fb753d6 | 731fe26345833745dc7d37c8213f3ca91585aa0ee18179c0ccda91be41ff6aec | 1,013개 중 4자 모두 없음 |
| AnimCJK graphicsZhHans.txt | ec5e17cca76c87587790bcbce5ea0b4d4fb753d6 | 5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798 | 8,014개 중 4자 모두 없음 |
| Make Me a Hanzi graphics.txt | bddc96d41bef78427ed0e034e9f7e31d71fd1b92 | a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee | 9,574개 중 稅12획, 餘15획 있음; 硏·鄕 없음 |

[AnimCJK 고정 트리](https://github.com/parsimonhi/animCJK/tree/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6)의 전체 파일 목록도 확인했고 4자의 정확한 코드포인트 SVG는 없었다. [KanjiVG 고정 트리](https://github.com/KanjiVG/kanjivg/tree/55b5ba92a7cad78a62ef04db4be6f9562d949b7f)에는 餘의 `kanji/09918.svg`, `09918-Kaisho.svg`가 있다. 이 두 SVG는 이번 영상 대조 및 앱 경로에 사용하지 않았다. 다른 3자의 정확한 코드포인트 파일은 없었다. 이 결과는 조사한 리비전의 범위이며 모든 자료에 원본이 없다는 뜻은 아니다.

[Make Me a Hanzi 고정 README](https://github.com/skishore/makemeahanzi/blob/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/README.md)와 [COPYING](https://github.com/skishore/makemeahanzi/blob/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/COPYING)은 `graphics.txt`의 Arphic Public License와 Arphic PL KaitiM GB / PL UKai 유래를 명시한다. 고정 SHA를 검사하는 후보 로딩·검토·생성 경로를 추가했고 원문 고지를 `public/hanja-strokes/MAKEMEAHANZI-COPYING.txt`에 보존했다. 출처 지원은 영상 대조를 대신하거나 자동 재생을 승인하지 않는다.

전체 교과서 대상 중 Ko/Ja에 없던 22자에도 추가 원본을 대조했다. 정확한 키가 추가 확보된 글자는 **靈 屢 稅 餘 驛 悅 閱 鹽 銳 娛 隱 脫 毁 13자**다. 이번의 稅·餘를 제외한 11자는 개별 영상 대조를 아직 하지 않았다. 세 코퍼스 모두에서 찾지 못한 9자는 **槪 鑛 畓 屛 硏 玆 鬪 鄕 戱**다. 자동 정규화나 이체자 대입으로 이 숫자를 늘리지 않았다.

## 실제 영상과 추가 후보 대조

- **稅**: 원문 0826행, `0826 세금 세.mp4`, 12획. 영상 12획과 후보 12획 전체를 대조했다. 후보 6·7획의 안쪽 방향과 영상의 바깥쪽 八 자형이 다르고, 실제 선폭5에서 부품 간 접합도 달라 **conflict**다.
- **餘**: 원문 1013행, `1013 남을 여.mp4`, 16획. 영상 16획과 후보 15획 전체를 대조했다. 영상의 食 부수 하단 직선 세로·두 가로와 후보의 꺾임·점이 다르며 1획이 부족해 **conflict**다.

전체 0.5초 진행, 0.1초 해상도의 각 획 완료 표본 및 실제 선폭5 후보를 직접 확인했다. 원본 영상 SHA·크기·길이·완료 표본·후보 경로 SHA·보류 이유는 [2자 대조 기록](hanja-stroke-textbook-batch6-mm-2026-09-08.json)에 있다. 두 글자는 공개 재생 데이터에 포함하지 않는다.

## 영상은 확보되지만 기하 후보가 남은 2자

| 글자 | 원문 위치 | 영상 길이 | 영상 바이트 | 영상 SHA-256 |
|---|---|---:|---:|---|
| 硏 | 1026, 갈 연 | 13.348초 | 470290 | 0875048a8ddd1d195450a72969903a9680231696c426034f803e01d0bbebe3fb |
| 鄕 | 1691, 시골 향 | 20.315초 | 730319 | b8518b0dcaf7e9eb20b6c27859823ea020080e4c7a50bbfa16870a9299695f1b |

두 영상의 URL은 기존 manifest 기준 `../media/video/1026.mp4`, `../media/video/1691.mp4`이며 실제 응답 바이트와 1920×1080 영상 메타데이터를 확인했다. 이것은 전체 필순/자형 대조 완료 기록이 아니다. 기하 후보가 없어 양의 후보 획수를 꾸며 검토 대장에 추가하지 않았다. 다음 단계는 정확한 자형의 재사용 가능한 원본을 더 찾거나, 해당 영상 근거에 따라 별도의 벡터 제작·검토 절차를 마련하는 것이다.
