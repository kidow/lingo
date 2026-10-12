# Jev 후보 묶음 실험

공개 GlyphWiki 원본 요약으로 輗·堄·麑 3개 독립 질문을 한 번에 요청했다. 비공개 이미지·학습 기록·저장소 경로는 전송하지 않았다. TYPESAFE_API_KEY 항목만 RAM에서 사용하고 출력·저장하지 않았다.

jev-1.13.0 응답 350ms, 입력 1,453·출력 179토큰. 輗:visual_review 0.56, 堄:source_research 0.93, 麑:visual_review 0.59. 비슷한 수치 위험에도 경로 판단이 갈려 참고 자료로만 사용한다. 출처 분류·모호한 텍스트 관계 판정은 묶어서 요청하고, 경로/윤곽 일치·반경 등 명확한 계산은 코드에서 처리한다. 브라우저에서 실제 검토를 통과하기 전 런타임 적용은 하지 않는다.

근거: https://docs.typesafe.ai/introduction/coding-agents.md · https://docs.typesafe.ai/api.md · https://docs.typesafe.ai/cookbooks/citation_check.md
