# 비상 필순 영상 1차 대조: 境·經·警·慶·係

검토일: 2026-09-08. 검토자: **Codex visual comparison**. 방법: `video-frame-sequence`.

이 기록은 실제 공개 영상 프레임과 고정 AnimCJK Ko 후보를 비교한 AI 시각 대조이다. 인간 한자 교육 전문가의 확인이나 한국어문회의 승인으로 표시하지 않는다. 검토 원장·공개 JSON은 이 문서 작성 과정에서 변경하지 않았다.

원본은 비상교육 고등 한문 공개 자료의 `media/video/{manifestRow}.mp4`다. XLSX의 설명용 파일명 전체를 영상 URL로 사용하지 않았다. 기준 manifest SHA-256은 `32853d2396dc4fe38362b9e51a828144d7e48889f60e28d850cae9fa2335620c`, Ko 후보 SHA-256은 `7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e`다.

`scripts/hanja-stroke-textbook-frames.py`로 10fps 표본을 추출했다. 각 글자의 0.5초 간격 전체 진행 시트, 자동 정지 후보 시트, Ko 획별 시트(현재 획 파랑, 시작 초록, 끝 빨강)를 모두 `view_image`로 열람했다. 이어 선택 프레임을 0.1초 단위 시각으로 추가 추출·열람했다. 아래 `strokeEndsSeconds`는 **각 획이 완성되어 있음을 실제 표본에서 확인한 시점**이며, 펜이 멈춘 정확한 최초 시각을 측정한 값이 아니다. 다음 획의 커서가 나타난 프레임이라도 앞 획이 완성된 것이 보이면 완료 확인으로 기록했다. 자동 정지 검출만으로 완료를 판정하지 않았다.

검토용 시트는 `/private/tmp/lingo-textbook-review-20260908/`에만 있으며 앱에 배포하지 않는다. `{row}-timeline.png`, `{row}-quiet.png`, `{row}-candidate.png`, `{row}-selected-1.png`를 확인했고 境·慶은 `selected-2.png`도 확인했다.

| 글자 | 영상/Ko 획수 | 판정 | 결정적인 관찰 |
| --- | --- | --- | --- |
| 境 | 14/14 | matched | 土 3획 → 立 부분 5획 → 日 부분 4획 → 아래 儿 2획. 마지막 획은 세로·아래 굽음·위쪽 끝을 한 획으로 이어 그린다. 모든 획의 순서·방향·분할·자형이 후보와 대응한다. |
| 經 | 13/13 | conflict | 영상 4획은 糸 아래 **중앙 긴 세로획**, 5획은 왼쪽 점, 6획은 오른쪽 점이다. 후보의 4~6획은 **왼쪽·가운데·오른쪽의 짧은 점**이다. 4~5획의 순서와 대응 획 방향·자형이 다르다. |
| 警 | 20/19 | conflict | 영상의 艹는 **왼쪽 세로 → 왼쪽 가로 → 오른쪽 가로 → 오른쪽 세로**의 4획이다. 후보는 **긴 가로 → 왼쪽 세로 → 오른쪽 세로**의 3획으로 그린다. 획 경계와 순서 차이를 실제로 확인했다. |
| 慶 | 15/15 | matched | 广 3획 뒤 안쪽 윗부분 4획, 긴 가로 굽은 획, 心 4획, 아래 夂 3획 순서다. 心의 연결된 굽음과 마지막 오른쪽 뻗침까지 후보와 대응한다. |
| 係 | 9/9 | conflict | 순서와 획 분할은 같지만, 영상 7획은 중앙 **곧은 세로획**으로 끝난다. 후보 7획에는 아래에서 **왼쪽 위로 되꺾는 갈고리**가 있다. 영상 10.9초와 완성 프레임에서 갈고리 없이 끝남을 확인했다. |

현재 변경 없는 Ko 경로를 사용하는 승인 계약으로는 **境·慶 2자만 matched 후보**다. 經·警·係는 후보를 임의 수정하거나 획수만으로 승인하지 않는다. 다른 한국 자료 대조 또는 별도로 검토한 보정 경로가 필요하다. 아래 영상 관찰 획수·완료 시각은 conflict 여부와 무관하게 실제 영상 순서를 따라 기록했다.

## 관찰 기록

```json
[
  {
    "glyph": "境",
    "manifestRow": "0099",
    "status": "matched",
    "reviewedAt": "2026-09-08",
    "reviewer": "Codex visual comparison",
    "reviewMethod": "video-frame-sequence",
    "sourceVideo": {
      "url": "https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/media/video/0099.mp4",
      "sha256": "a73ba3e7d927404f4f647eb20de9ae1630777cb276d8764943ae43507ef7053d",
      "bytes": 507687
    },
    "durationSeconds": 15.931,
    "observedVideoStrokes": 14,
    "candidateStrokes": 14,
    "strokeEndsSeconds": [1.2, 2.8, 3.8, 4.7, 5.8, 6.6, 7.3, 8.9, 9.8, 10.9, 11.4, 12.2, 13.4, 15.5],
    "checks": { "order": "match", "direction": "match", "boundaries": "match", "glyphForm": "match" },
    "notes": "Codex 시각 대조. 전체 0.5초 진행과 0.1초 단위 선택 프레임을 확인했다. 土 3획, 立 부분 5획, 日 부분 4획, 儿 2획의 순서와 모든 획의 시작·끝 방향이 Ko 후보와 대응한다. 마지막 세로-굽음-위쪽 끝은 한 획이다. 완료 시각은 완성 확인 표본 시각이며 정확한 펜 정지 시각이 아니다. 인간 전문가 또는 시험기관 승인을 뜻하지 않는다."
  },
  {
    "glyph": "經",
    "manifestRow": "0093",
    "status": "conflict",
    "reviewedAt": "2026-09-08",
    "reviewer": "Codex visual comparison",
    "reviewMethod": "video-frame-sequence",
    "sourceVideo": {
      "url": "https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/media/video/0093.mp4",
      "sha256": "4f2803a8bb23a743c4e3b34791ccacf9054af1a7e02226b97cdc70eeb1e79f13",
      "bytes": 649994
    },
    "durationSeconds": 16.015,
    "observedVideoStrokes": 13,
    "candidateStrokes": 13,
    "strokeEndsSeconds": [1.4, 2.9, 3.4, 5.0, 5.9, 6.6, 7.8, 9.1, 10.4, 12.0, 13.2, 14.0, 15.5],
    "checks": { "order": "conflict", "direction": "conflict", "boundaries": "match", "glyphForm": "conflict" },
    "notes": "Codex 시각 대조. 영상 4획은 糸 아래 중앙 긴 세로, 5획은 왼쪽 점, 6획은 오른쪽 점이다. Ko 4~6획은 왼쪽·가운데·오른쪽의 짧은 점이며 중앙을 먼저 그리지 않는다. 우측 一-세 번 꺾인 세로-工 순서는 대응하지만 전체 순서·자형 일치로 승인할 수 없다. 완료 시각은 0.1초 단위 선택 프레임에서 영상 획의 완성을 확인한 시각이다."
  },
  {
    "glyph": "警",
    "manifestRow": "0103",
    "status": "conflict",
    "reviewedAt": "2026-09-08",
    "reviewer": "Codex visual comparison",
    "reviewMethod": "video-frame-sequence",
    "sourceVideo": {
      "url": "https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/media/video/0103.mp4",
      "sha256": "192bb2e8deeeeed96d9d59c0e511a15c548baca9d0408cc3197b0073488ad5c5",
      "bytes": 773551
    },
    "durationSeconds": 23.098,
    "observedVideoStrokes": 20,
    "candidateStrokes": 19,
    "strokeEndsSeconds": [1.1, 2.1, 3.1, 4.1, 5.1, 6.5, 7.6, 8.5, 9.1, 10.5, 11.1, 12.6, 14.1, 15.1, 17.1, 18.1, 19.1, 20.5, 21.8, 22.7],
    "checks": { "order": "conflict", "direction": "unreviewed", "boundaries": "conflict", "glyphForm": "conflict" },
    "notes": "Codex 시각 대조. 영상 艹의 1~4획은 왼세로-왼가로-오른가로-오른세로, Ko는 긴가로-왼세로-오른세로의 3획이다. 영상에서 왼가로와 오른가로를 별도 획으로 그리는 것을 확인했다. 이후 句 부분 5획, 攵 4획, 言 7획을 관찰하여 영상 20획을 확인했다. 후보 19획과 1대1 대응이 깨져 방향 전체를 match로 선언하지 않았다. 완료 시각은 0.1초 단위 선택 프레임에서 영상 획의 완성을 확인한 시각이다."
  },
  {
    "glyph": "慶",
    "manifestRow": "0089",
    "status": "matched",
    "reviewedAt": "2026-09-08",
    "reviewer": "Codex visual comparison",
    "reviewMethod": "video-frame-sequence",
    "sourceVideo": {
      "url": "https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/media/video/0089.mp4",
      "sha256": "30579a5aaa61b606764e1875dabfc1f63d7e91e0b384b906930e6c3342957015",
      "bytes": 778188
    },
    "durationSeconds": 20.381,
    "observedVideoStrokes": 15,
    "candidateStrokes": 15,
    "strokeEndsSeconds": [1.1, 2.3, 4.2, 5.6, 6.1, 6.8, 7.8, 9.8, 11.1, 12.6, 13.5, 14.6, 16.2, 18.0, 19.7],
    "checks": { "order": "match", "direction": "match", "boundaries": "match", "glyphForm": "match" },
    "notes": "Codex 시각 대조. 전체 0.5초 진행과 0.1초 단위 선택 프레임을 확인했다. 广 3획, 안쪽 윗부분 4획, 긴 가로 굽은 획, 心 4획, 아래 夂 3획의 순서와 방향·분할이 Ko 후보와 대응한다. 心 두 번째 획의 연결된 굽음·되돌아오는 끝과 마지막 오른쪽 뻗침까지 대조했다. 완료 시각은 완성 확인 표본 시각이며 정확한 펜 정지 시각이 아니다. 인간 전문가 또는 시험기관 승인을 뜻하지 않는다."
  },
  {
    "glyph": "係",
    "manifestRow": "0112",
    "status": "conflict",
    "reviewedAt": "2026-09-08",
    "reviewer": "Codex visual comparison",
    "reviewMethod": "video-frame-sequence",
    "sourceVideo": {
      "url": "https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/media/video/0112.mp4",
      "sha256": "9ad208a5c26d474cb5751deeed757b4443378d18b1f65691c990bba2f8f51385",
      "bytes": 454457
    },
    "durationSeconds": 12.965,
    "observedVideoStrokes": 9,
    "candidateStrokes": 9,
    "strokeEndsSeconds": [2.0, 4.1, 5.2, 6.7, 8.3, 9.1, 10.9, 11.8, 12.7],
    "checks": { "order": "match", "direction": "conflict", "boundaries": "match", "glyphForm": "conflict" },
    "notes": "Codex 시각 대조. 亻 2획 다음 系 7획의 순서·분할은 대응한다. 그러나 영상 7획은 중앙의 곧은 세로획으로 마무리하며, Ko 7획처럼 왼쪽 위로 되꺾는 갈고리가 없다. 10.9초 및 12.7초 완성 프레임에서도 이 차이를 확인했다. 끝 방향과 자형 불일치 때문에 변경 없는 후보를 승인하지 않는다. 완료 시각은 0.1초 단위 선택 프레임에서 영상 획의 완성을 확인한 시각이다."
  }
]
```

이 JSON은 관찰 메모이며 배포 스키마의 완성본이 아니다. 원장으로 옮길 때 기존 `videoFilename`·`expectedStrokes`를 보존하고, matched 2자는 고정 Ko 원본을 정규화한 실제 `pathsSha256`를 별도로 생성·대조해야 한다. 관찰하지 않은 보정 경로는 승인하지 않는다.
