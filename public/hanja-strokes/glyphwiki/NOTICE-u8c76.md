# 豶 GlyphWiki geometry

선택u8c76-ue0102(VS2)의20획38polygon 원outline union·sourceGroups순서를 유지하고 기존 LEFT-tail primitive를 byte동일 재사용해3획 마지막 원polygon만 별도mask로 분리했습니다(20→21mask). bodybounds는 남은 원polygon에서만 계산하며 원guide·width·weight·다른mask를 유지합니다. 새좌표·연결선·획경로를 만들지 않습니다. source실험의 최초baseline capture 한계를 명시하고 root가 선택VS2만 전체native검토했습니다. 기존616보류와 다른whole의 원자료는 보존하며 runtime1134에서만 회복합니다.

Attribution: GlyphWiki Project and contributors. LicenseRef-GlyphWiki.
Source: https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt
License: https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt

Source capsule:10fixedrecords,4whole,1provider u8c55-01@3. Native selectedVS2 review:2026-10-18, docs/hanja-goal-glyphwiki-batch1134-2026-10-18/review.json
