/**
 * 청년 지원 정책 데이터 (2026년 4월 기준 종합 버전 v2)
 * - 12개 카테고리 / 85개 정책 수록
 * - 매일 자정 자동 검증되며 lastChecked 필드가 갱신됨
 *
 * 새로 추가된 필드 설명:
 * - applyDeadline: 신청 마감일 ('YYYY-MM-DD' 또는 '상시'/'분기별' 등). 화면에서 D-day 계산용
 *   D-day(디데이) = 영어 군사 용어, "결행일"의 의미. 카운트다운(countdown=카운트다운=거꾸로 세기)에 쓰임
 * - lastChecked: 마지막 자동 검증 일시 (YYYY-MM-DD HH:mm)
 *   사용자에게 "이 정보가 얼마나 신선한지" 보여주기 위함 (data freshness=데이터 프레시니스=데이터 신선도)
 */

const POLICIES = [
  // ==================== 🏠 주거 (Housing) ====================
  { id: 1, category: "housing", categoryLabel: "주거", title: "청년월세 특별지원",
    target: "만 19~34세 무주택 청년 (청년 중위 60%·원가구 100% 이하)",
    benefit: "월 최대 20만원 × 24개월 (총 480만원)",
    howTo: "복지로 또는 행정복지센터 (연중 상시)",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "복지로 / 토스뱅크 2026", lastChecked: "2026-04-27 10:00" },

  { id: 2, category: "housing", categoryLabel: "주거", title: "청년주택드림 청약통장",
    target: "만 19~34세, 연소득 5천만원 이하 무주택자",
    benefit: "최대 연 4.5% 금리, 월 2~100만원 납입, 비과세 + 청약 가점",
    howTo: "주요 시중은행 영업점/앱",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.molit.go.kr/2024dreamaccount/main.jsp", verifiedSrc: "국토부 / 주택도시기금", lastChecked: "2026-04-27 10:00" },

  { id: 3, category: "housing", categoryLabel: "주거", title: "청년주택드림 대출",
    target: "청년주택드림 청약 당첨 만 39세 이하 무주택자",
    benefit: "분양가 80% / 최저 연 2.2% 주택구입자금",
    howTo: "기금e든든 또는 수탁은행",
    tag: "전국", applyDeadline: "상시",
    link: "https://nhuf.molit.go.kr/", verifiedSrc: "주택도시기금", lastChecked: "2026-04-27 10:00" },

  { id: 4, category: "housing", categoryLabel: "주거", title: "청년 버팀목 전세자금대출",
    target: "만 19~34세, 연소득 5천만원 이하 무주택 세대주",
    benefit: "연 2.2~3.3% (2026.2.27 인하) / 한도 최대 2억원 (만25세 미만 1.5억원)",
    howTo: "기금e든든 또는 수탁은행(우리·국민·신한·NH·하나)",
    tag: "전국", applyDeadline: "상시",
    link: "https://nhuf.molit.go.kr/", verifiedSrc: "주택도시기금 / 뱅크샐러드", lastChecked: "2026-04-27 10:00" },

  { id: 5, category: "housing", categoryLabel: "주거", title: "행복주택",
    target: "대학생/만 19~39세 청년/혼인 7년 이내 신혼부부 (소득 100% 이하)",
    benefit: "주변 시세 60~80% 임대 / 거주기간 6년",
    howTo: "LH청약플러스 또는 SH·GH 등 주택공사",
    tag: "전국", applyDeadline: "분기별 모집",
    link: "https://apply.lh.or.kr/", verifiedSrc: "LH 한국토지주택공사", lastChecked: "2026-04-27 10:00" },

  { id: 6, category: "housing", categoryLabel: "주거", title: "청년안심주택 (구 역세권 청년주택)",
    target: "서울 거주 만 19~39세 무주택 청년·신혼부부",
    benefit: "역세권 입지 + 시세 30~85% 임대",
    howTo: "SH 청년안심주택 누리집",
    tag: "서울", applyDeadline: "분기별 모집",
    link: "https://soco.seoul.go.kr/youth/", verifiedSrc: "서울시 SH공사", lastChecked: "2026-04-27 10:00" },

  { id: 7, category: "housing", categoryLabel: "주거", title: "중소기업 취업청년 전월세보증금대출",
    target: "중소·중견기업 재직 만 19~34세 (연소득 3,500만원 이하)",
    benefit: "최대 1억원 / 연 1.5% 초저금리",
    howTo: "기금e든든 또는 수탁은행",
    tag: "전국", applyDeadline: "상시",
    link: "https://nhuf.molit.go.kr/", verifiedSrc: "주택도시기금", lastChecked: "2026-04-27 10:00" },

  { id: 8, category: "housing", categoryLabel: "주거", title: "청년 매입임대주택",
    target: "만 19~39세 무주택 미혼 청년 (소득기준 충족)",
    benefit: "LH가 매입한 주택을 시세 40~50%로 임대 / 최대 10년",
    howTo: "LH청약플러스 모집공고",
    tag: "전국", applyDeadline: "분기별 모집",
    link: "https://apply.lh.or.kr/", verifiedSrc: "LH", lastChecked: "2026-04-27 10:00" },

  { id: 9, category: "housing", categoryLabel: "주거", title: "청년 전세임대주택",
    target: "만 19~39세 무주택 청년",
    benefit: "LH가 전세계약 후 청년에게 재임대 / 보증금 100~200만원, 연 1~2% 이자",
    howTo: "LH청약플러스 모집공고",
    tag: "전국", applyDeadline: "분기별 모집",
    link: "https://apply.lh.or.kr/", verifiedSrc: "LH", lastChecked: "2026-04-27 10:00" },

  { id: 10, category: "housing", categoryLabel: "주거", title: "통합공공임대주택",
    target: "무주택자 (소득·자산 기준)",
    benefit: "기존 영구·국민·행복주택 통합형, 시세 35~80% 임대 / 최대 30년 거주",
    howTo: "LH청약플러스",
    tag: "전국", applyDeadline: "수시",
    link: "https://apply.lh.or.kr/", verifiedSrc: "LH 통합공공임대", lastChecked: "2026-04-27 10:00" },

  { id: 11, category: "housing", categoryLabel: "주거", title: "신혼희망타운",
    target: "혼인 7년 이내 신혼부부 / 예비신혼 / 한부모가족",
    benefit: "분양형 시세 70~80% / 신혼희망타운 전용 모기지 (1.6%~)",
    howTo: "LH청약플러스",
    tag: "전국", applyDeadline: "수시",
    link: "https://apply.lh.or.kr/", verifiedSrc: "LH", lastChecked: "2026-04-27 10:00" },

  { id: 12, category: "housing", categoryLabel: "주거", title: "신혼부부 디딤돌 주택구입대출",
    target: "혼인 7년 이내 부부합산 연소득 8,500만원 이하",
    benefit: "최대 4억원 / 연 2.15~3.45% 주택구입자금",
    howTo: "기금e든든 또는 수탁은행",
    tag: "전국", applyDeadline: "상시",
    link: "https://nhuf.molit.go.kr/", verifiedSrc: "주택도시기금", lastChecked: "2026-04-27 10:00" },

  // ==================== 💼 일자리·창업 (Job) ====================
  { id: 13, category: "job", categoryLabel: "일자리", title: "국민취업지원제도 Ⅰ유형",
    target: "만 15~34세 청년 (중위 60% 이하·재산 5억 이하·취업경험 보유 등)",
    benefit: "월 60만원 × 6개월 (총 360만원) + 부양가족 1인당 10만원 (최대 100만원/월)",
    howTo: "고용24 또는 고용센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.work24.go.kr/", verifiedSrc: "고용노동부 2026 개편", lastChecked: "2026-04-27 10:00" },

  { id: 14, category: "job", categoryLabel: "일자리", title: "국민취업지원제도 Ⅱ유형",
    target: "취업경험 무관, 만 15~34세 청년 (중위 120% 이하)",
    benefit: "취업활동비 월 최대 28.4만원 × 6개월 + 직업훈련비 + 취업성공수당",
    howTo: "고용24",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.work24.go.kr/", verifiedSrc: "고용노동부", lastChecked: "2026-04-27 10:00" },

  { id: 15, category: "job", categoryLabel: "일자리", title: "미래내일 일경험 (인턴형)",
    target: "만 15~34세 미취업 청년",
    benefit: "8주 인턴십 / 월 평균 150만원 인건비 + 멘토비 + 직무교육",
    howTo: "청년일경험포털 (yw.work24.go.kr)",
    tag: "전국", applyDeadline: "수시",
    link: "https://yw.work24.go.kr/main.do", verifiedSrc: "고용노동부 청년일경험", lastChecked: "2026-04-27 10:00" },

  { id: 16, category: "job", categoryLabel: "일자리", title: "K-디지털 트레이닝",
    target: "내일배움카드 발급자",
    benefit: "AI·빅데이터 등 디지털 직무교육 + 훈련수당 (※2026년부터 자비부담금 일부 도입)",
    howTo: "고용24 / HRD-Net",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.hrd.go.kr/", verifiedSrc: "고용노동부 KDT", lastChecked: "2026-04-27 10:00" },

  { id: 17, category: "job", categoryLabel: "일자리", title: "청년 일자리 도약 장려금 (2026)",
    target: "5인 이상 우선지원 기업이 채용한 취업애로 청년",
    benefit: "수도권 720만원 / 비수도권 480~720만원 + 청년 추가 인센티브 (특별지원 합산 최대 1,440만원)",
    howTo: "고용24 채용 전 신청",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.work24.go.kr/", verifiedSrc: "고용노동부 보도자료", lastChecked: "2026-04-27 10:00" },

  { id: 18, category: "job", categoryLabel: "일자리", title: "청년창업사관학교",
    target: "만 39세 이하 / 창업 3년 이내 (경험창업자 7년 이내) 대표",
    benefit: "사업화 자금 평균 0.7억·최대 1억 + 입주공간 + 멘토링 (2026년 850명)",
    howTo: "K-Startup (1.30~2.13 모집)",
    tag: "전국", applyDeadline: "2026-02-13",
    link: "https://start.kosmes.or.kr/", verifiedSrc: "중소벤처기업부", lastChecked: "2026-04-27 10:00" },

  { id: 19, category: "job", categoryLabel: "일자리", title: "예비창업패키지",
    target: "만 39세 이하 예비창업자",
    benefit: "최대 1억원 사업화 자금 + 창업교육·멘토링",
    howTo: "K-Startup",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.k-startup.go.kr/", verifiedSrc: "중소벤처기업부", lastChecked: "2026-04-27 10:00" },

  { id: 20, category: "job", categoryLabel: "일자리", title: "초기창업패키지",
    target: "창업 3년 이내 초기 기업",
    benefit: "최대 1억원 사업화 자금 + 후속 멘토링",
    howTo: "K-Startup",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.k-startup.go.kr/", verifiedSrc: "K-Startup", lastChecked: "2026-04-27 10:00" },

  { id: 21, category: "job", categoryLabel: "일자리", title: "사회적기업가 육성사업",
    target: "사회적가치 창출 예비·초기 창업자",
    benefit: "최대 5천만원 사업개발비 + 창업공간 + 멘토링",
    howTo: "한국사회적기업진흥원",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.socialenterprise.or.kr/", verifiedSrc: "사회적기업진흥원", lastChecked: "2026-04-27 10:00" },

  { id: 22, category: "job", categoryLabel: "일자리", title: "1인 창조기업 지원사업",
    target: "1인 창조기업 (지식기반 창업)",
    benefit: "사무공간·멘토링·시제품 제작 비용 지원",
    howTo: "K-Startup / 1인창조기업지원센터",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.k-startup.go.kr/", verifiedSrc: "K-Startup", lastChecked: "2026-04-27 10:00" },

  { id: 23, category: "job", categoryLabel: "일자리", title: "글로벌창업사관학교",
    target: "글로벌 진출 희망 창업자",
    benefit: "해외 진출 멘토링·VC 매칭 + 사업화 자금",
    howTo: "중소벤처기업진흥공단",
    tag: "전국", applyDeadline: "수시",
    link: "https://start.kosmes.or.kr/", verifiedSrc: "중소벤처기업부", lastChecked: "2026-04-27 10:00" },

  { id: 24, category: "job", categoryLabel: "일자리", title: "청년 해외취업 지원사업 (K-Move 스쿨)",
    target: "만 34세 이하 해외취업 희망자",
    benefit: "해외취업 직무교육 + 항공료·체류비 지원",
    howTo: "월드잡플러스 (worldjob.or.kr)",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.worldjob.or.kr/", verifiedSrc: "한국산업인력공단", lastChecked: "2026-04-27 10:00" },

  // ==================== 💰 금융 (Finance) ====================
  { id: 25, category: "finance", categoryLabel: "금융", title: "청년도약계좌 (※ 2025.12.31 신규 종료)",
    target: "기 가입자만 (만 19~34세, 개인소득 7,500만원 이하 등으로 가입했던 자)",
    benefit: "5년 만기 시 약 5천만원 / 신규 가입은 종료, 청년미래적금으로 대체",
    howTo: "기 가입은행 앱에서 유지",
    tag: "전국", applyDeadline: "신규 종료",
    link: "https://ylaccount.kinfa.or.kr/main", verifiedSrc: "서민금융진흥원", lastChecked: "2026-04-27 10:00" },

  { id: 26, category: "finance", categoryLabel: "금융", title: "청년미래적금 (2026.6 출시 예정)",
    target: "만 19~34세, 개인소득 6,000만원 이하 / 중위 200% 이하",
    benefit: "월 50만원 → 정부 매칭 6~12% → 5년 만기 약 2,200만원",
    howTo: "2026년 6월 이후 협약 은행 앱",
    tag: "전국", applyDeadline: "출시 예정",
    link: "https://www.kinfa.or.kr/", verifiedSrc: "금융위원회 발표", lastChecked: "2026-04-27 10:00" },

  { id: 27, category: "finance", categoryLabel: "금융", title: "햇살론 유스",
    target: "만 19~34세 대학생·취업준비생·사회초년생 (연소득 3,500만원 이하)",
    benefit: "1인 평생 최대 1,200만원 / 연 3.6~5.0% 저금리",
    howTo: "서민금융진흥원 앱 또는 협약은행",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.kinfa.or.kr/financialProduct/hessalLoanYoos.do", verifiedSrc: "서민금융진흥원", lastChecked: "2026-04-27 10:00" },

  { id: 28, category: "finance", categoryLabel: "금융", title: "신용회복위원회 청년 채무조정",
    target: "만 34세 이하 채무 곤란 청년",
    benefit: "이자 감면 / 분할상환 / 상환유예 + 무료 재무상담",
    howTo: "신용회복위원회 1600-5500",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.ccrs.or.kr/", verifiedSrc: "신용회복위원회", lastChecked: "2026-04-27 10:00" },

  { id: 29, category: "finance", categoryLabel: "금융", title: "새출발기금",
    target: "코로나19 피해 등으로 연체된 자영업자·소상공인",
    benefit: "원금 감면 0~80% + 분할상환",
    howTo: "새출발기금 콜센터 1660-1378",
    tag: "전국", applyDeadline: "2026-12-31",
    link: "https://www.새출발기금.kr/", verifiedSrc: "한국자산관리공사", lastChecked: "2026-04-27 10:00" },

  { id: 30, category: "finance", categoryLabel: "금융", title: "미소금융 청년 대출",
    target: "신용 6등급 이하 청년 (제도권 금융 어려움)",
    benefit: "창업·운영자금 최대 7천만원 / 연 4.5% 이내",
    howTo: "미소금융재단 또는 서민금융진흥원",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.kinfa.or.kr/", verifiedSrc: "서민금융진흥원", lastChecked: "2026-04-27 10:00" },

  { id: 31, category: "finance", categoryLabel: "금융", title: "청년형 ISA (개인종합자산관리계좌)",
    target: "만 19~34세 + 직전 3년 중 금융소득종합과세 미해당",
    benefit: "납입한도 연 4천만원 + 비과세 한도 1천만원 (3년 의무 보유)",
    howTo: "은행·증권사 영업점/앱",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.fss.or.kr/", verifiedSrc: "금융감독원", lastChecked: "2026-04-27 10:00" },

  { id: 32, category: "finance", categoryLabel: "금융", title: "햇살론 카드",
    target: "신용평점 하위 10% / 무직자·저소득 청년 등",
    benefit: "신용카드 발급 + 최대 200만원 한도",
    howTo: "서민금융진흥원 앱",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.kinfa.or.kr/", verifiedSrc: "서민금융진흥원", lastChecked: "2026-04-27 10:00" },

  // ==================== 🎨 교육·문화 (Edu) ====================
  { id: 33, category: "edu", categoryLabel: "교육·문화", title: "국민내일배움카드 (2026)",
    target: "전 국민 (재직자·구직자·자영업자·프리랜서 등)",
    benefit: "기본 300만원 + 추가 200만원 = 5년간 최대 500만원",
    howTo: "고용24 / HRD-Net",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.hrd.go.kr/", verifiedSrc: "고용노동부", lastChecked: "2026-04-27 10:00" },

  { id: 34, category: "edu", categoryLabel: "교육·문화", title: "K-디지털 크레딧",
    target: "디지털 훈련 희망 청년",
    benefit: "1인 50만원 디지털 훈련비",
    howTo: "HRD-Net",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.hrd.go.kr/", verifiedSrc: "고용노동부", lastChecked: "2026-04-27 10:00" },

  { id: 35, category: "edu", categoryLabel: "교육·문화", title: "청년문화예술패스 (2026)",
    target: "만 19~20세 청년 (생애 1회)",
    benefit: "수도권 15만원 / 비수도권 20만원 — 공연·전시·영화·도서",
    howTo: "youthculturepass.or.kr",
    tag: "전국", applyDeadline: "2026-12-31",
    link: "https://youthculturepass.or.kr/", verifiedSrc: "문체부 / 한국문화예술위", lastChecked: "2026-04-27 10:00" },

  { id: 36, category: "edu", categoryLabel: "교육·문화", title: "국가장학금",
    target: "대학(원)생 (소득 8구간 이하)",
    benefit: "Ⅰ유형 등록금 전액~연 350만원 / Ⅱ유형 추가 지원",
    howTo: "한국장학재단 (kosaf.go.kr)",
    tag: "전국", applyDeadline: "학기별",
    link: "https://www.kosaf.go.kr/", verifiedSrc: "한국장학재단", lastChecked: "2026-04-27 10:00" },

  { id: 37, category: "edu", categoryLabel: "교육·문화", title: "한국장학재단 학자금대출",
    target: "대학(원)생",
    benefit: "취업 후 상환 학자금대출 / 일반 학자금대출 / 농촌출신학자금융자",
    howTo: "한국장학재단",
    tag: "전국", applyDeadline: "학기별",
    link: "https://www.kosaf.go.kr/", verifiedSrc: "한국장학재단", lastChecked: "2026-04-27 10:00" },

  { id: 38, category: "edu", categoryLabel: "교육·문화", title: "평생교육바우처",
    target: "만 19세 이상 기초·차상위·중위 65% 이하",
    benefit: "1인당 35만원 평생교육 이용권",
    howTo: "평생교육바우처 누리집",
    tag: "전국", applyDeadline: "분기별",
    link: "https://www.lllcard.kr/", verifiedSrc: "국가평생교육진흥원", lastChecked: "2026-04-27 10:00" },

  { id: 39, category: "edu", categoryLabel: "교육·문화", title: "국민문화패스",
    target: "기초·차상위 가구 청년 등",
    benefit: "연 11만원 통합문화이용권 (도서·여행·공연·체육)",
    howTo: "통합문화이용권 누리집",
    tag: "전국", applyDeadline: "연 1회",
    link: "https://www.문화이용권.kr/", verifiedSrc: "문화체육관광부", lastChecked: "2026-04-27 10:00" },

  { id: 40, category: "edu", categoryLabel: "교육·문화", title: "청년 어학연수 지원 (지자체별)",
    target: "지자체 거주 청년 (지자체별 상이)",
    benefit: "어학연수비·시험응시료 일부 지원",
    howTo: "거주 지자체 청년정책과",
    tag: "지자체", applyDeadline: "수시",
    link: "https://www.youthcenter.go.kr/", verifiedSrc: "온통청년 검색", lastChecked: "2026-04-27 10:00" },

  // ==================== 🚌 교통 (Transport) ====================
  { id: 41, category: "transport", categoryLabel: "교통", title: "K-패스 (청년 우대)",
    target: "만 19~34세 K-패스 가입자",
    benefit: "월 15회 이상 대중교통 이용 시 청년 우대 53% 환급 (일반 20%)",
    howTo: "K-패스 앱 또는 카드사",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.korea-pass.kr/", verifiedSrc: "국토교통부", lastChecked: "2026-04-27 10:00" },

  { id: 42, category: "transport", categoryLabel: "교통", title: "기후동행카드 (서울)",
    target: "서울시 거주 일반시민 / 청년 우대 별도",
    benefit: "월 6.2만원(따릉이 포함 6.5만원) 무제한 / 청년 추가 할인",
    howTo: "모바일 티머니 또는 카드 발급",
    tag: "서울", applyDeadline: "상시",
    link: "https://news.seoul.go.kr/traffic/climatecard", verifiedSrc: "서울시", lastChecked: "2026-04-27 10:00" },

  { id: 43, category: "transport", categoryLabel: "교통", title: "The 경기패스",
    target: "경기도민 만 19~39세",
    benefit: "K-패스 청년 환급에 추가 환급 (월 60회 무제한)",
    howTo: "K-패스 가입 후 경기도 자동 적용",
    tag: "경기", applyDeadline: "상시",
    link: "https://www.gg.go.kr/", verifiedSrc: "경기도청", lastChecked: "2026-04-27 10:00" },

  { id: 44, category: "transport", categoryLabel: "교통", title: "인천 I-패스",
    target: "인천시민 만 19~39세 청년",
    benefit: "K-패스 청년 환급 + 월 60회 한도 추가 환급",
    howTo: "K-패스 가입 후 인천시 자동 적용",
    tag: "인천", applyDeadline: "상시",
    link: "https://www.incheon.go.kr/", verifiedSrc: "인천광역시", lastChecked: "2026-04-27 10:00" },

  // ==================== 💕 결혼·출산·신혼 (Marriage) ====================
  { id: 45, category: "marriage", categoryLabel: "결혼·출산", title: "신혼부부 전세자금 대출",
    target: "혼인 7년 이내 부부합산 연소득 7,500만원 이하",
    benefit: "최대 3억원 / 연 1.8~2.9% 저금리",
    howTo: "기금e든든 또는 수탁은행",
    tag: "전국", applyDeadline: "상시",
    link: "https://nhuf.molit.go.kr/", verifiedSrc: "주택도시기금", lastChecked: "2026-04-27 10:00" },

  { id: 46, category: "marriage", categoryLabel: "결혼·출산", title: "신생아 특례 구입자금 대출",
    target: "2년 이내 출산한 무주택 가구 (연소득 1.3억원 이하)",
    benefit: "최대 5억원 / 연 1.6~3.3% / 5년 특례금리",
    howTo: "기금e든든",
    tag: "전국", applyDeadline: "상시",
    link: "https://nhuf.molit.go.kr/", verifiedSrc: "주택도시기금 신생아특례", lastChecked: "2026-04-27 10:00" },

  { id: 47, category: "marriage", categoryLabel: "결혼·출산", title: "첫만남이용권",
    target: "출생 신고된 모든 영아",
    benefit: "첫째 200만원 / 둘째부터 300만원 (국민행복카드 포인트)",
    howTo: "복지로 또는 행정복지센터",
    tag: "전국", applyDeadline: "출생 후 1년",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "보건복지부", lastChecked: "2026-04-27 10:00" },

  { id: 48, category: "marriage", categoryLabel: "결혼·출산", title: "부모급여",
    target: "만 0~1세 영아 양육 가정",
    benefit: "0세 월 100만원 / 1세 월 50만원",
    howTo: "복지로 또는 행정복지센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "보건복지부", lastChecked: "2026-04-27 10:00" },

  { id: 49, category: "marriage", categoryLabel: "결혼·출산", title: "임신·출산 진료비 지원 (국민행복카드)",
    target: "임산부 (다태아·청소년·다문화 추가지원)",
    benefit: "단태아 100만원 / 다태아 140만원 의료비 바우처",
    howTo: "국민건강보험공단 또는 카드사",
    tag: "전국", applyDeadline: "임신 확인 후",
    link: "https://www.nhis.or.kr/", verifiedSrc: "국민건강보험공단", lastChecked: "2026-04-27 10:00" },

  { id: 50, category: "marriage", categoryLabel: "결혼·출산", title: "출산 가구 특별공급 (공공분양)",
    target: "2년 이내 출산 가구",
    benefit: "공공분양주택 특별공급 우선 자격 / 연 7만호 공급",
    howTo: "LH청약플러스 / 청약홈",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.applyhome.co.kr/", verifiedSrc: "국토교통부", lastChecked: "2026-04-27 10:00" },

  { id: 51, category: "marriage", categoryLabel: "결혼·출산", title: "신혼·출산 결혼세액공제",
    target: "혼인신고 한 신혼부부",
    benefit: "혼인 시 1인당 50만원, 부부 합산 100만원 세액공제 (3년간)",
    howTo: "연말정산 / 종합소득세 신고",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.nts.go.kr/", verifiedSrc: "국세청", lastChecked: "2026-04-27 10:00" },

  { id: 52, category: "marriage", categoryLabel: "결혼·출산", title: "다자녀 가구 지원 (3자녀 이상)",
    target: "3자녀 이상 가구",
    benefit: "주택 특별공급 / 자동차세 감면 / 전기·도시가스 할인 / 양육수당",
    howTo: "복지로 / 시·군·구청",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "보건복지부", lastChecked: "2026-04-27 10:00" },

  // ==================== 🎖️ 군 복무·제대 (Military) ====================
  { id: 53, category: "military", categoryLabel: "군 복무", title: "장병내일준비적금",
    target: "현역병·상근예비역·사회복무요원 등",
    benefit: "월 최대 55만원 → 정부 매칭 100% + 은행 우대금리 → 만기 약 1,200만원",
    howTo: "군 복무 시 협약은행 앱",
    tag: "전국", applyDeadline: "복무 중 상시",
    link: "https://www.mma.go.kr/", verifiedSrc: "병무청 / 국방부", lastChecked: "2026-04-27 10:00" },

  { id: 54, category: "military", categoryLabel: "군 복무", title: "병역명문가 지원",
    target: "3대(조부·부·본인) 모두 현역복무 마친 가족",
    benefit: "병역명문가 인증서 + 우대 혜택",
    howTo: "병무청",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.mma.go.kr/", verifiedSrc: "병무청", lastChecked: "2026-04-27 10:00" },

  { id: 55, category: "military", categoryLabel: "군 복무", title: "제대군인 가산점·취업지원",
    target: "전역 후 5년 이내 제대군인",
    benefit: "공무원·공공기관 가산점 + 취업컨설팅 + 직업훈련",
    howTo: "국가보훈부 제대군인지원센터",
    tag: "전국", applyDeadline: "전역 후 5년",
    link: "https://www.mpva.go.kr/", verifiedSrc: "국가보훈부", lastChecked: "2026-04-27 10:00" },

  { id: 56, category: "military", categoryLabel: "군 복무", title: "군 복무 학자금대출 이자 면제",
    target: "한국장학재단 학자금대출자 중 군 복무 중인 자",
    benefit: "복무 기간 동안 이자 면제 / 상환유예",
    howTo: "한국장학재단",
    tag: "전국", applyDeadline: "복무 중 신청",
    link: "https://www.kosaf.go.kr/", verifiedSrc: "한국장학재단", lastChecked: "2026-04-27 10:00" },

  { id: 57, category: "military", categoryLabel: "군 복무", title: "예비군 훈련수당",
    target: "예비군 훈련 참여자",
    benefit: "동원훈련 1박2일 약 12만원 / 일반 훈련 약 4만원",
    howTo: "예비군 훈련 출석 후 자동 지급",
    tag: "전국", applyDeadline: "훈련 후",
    link: "https://www.yebigun1.mil.kr/", verifiedSrc: "국방부 예비군포털", lastChecked: "2026-04-27 10:00" },

  { id: 58, category: "military", categoryLabel: "군 복무", title: "전역장병 청년도전지원사업",
    target: "전역 후 미취업 청년 (만 18~34세)",
    benefit: "5주 단기 또는 5개월 장기 프로그램 + 수당 50~100만원",
    howTo: "고용24",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.work24.go.kr/", verifiedSrc: "고용노동부", lastChecked: "2026-04-27 10:00" },

  // ==================== 🌾 농업·귀농 (Agriculture) ====================
  { id: 59, category: "agriculture", categoryLabel: "농업·귀농", title: "청년창업농 영농정착지원금",
    target: "만 18~40세 미만, 영농경력 3년 이하 신규농",
    benefit: "월 최대 110만원 × 3년 (총 3,960만원)",
    howTo: "농림축산식품부 / 농지은행 농지위탁",
    tag: "전국", applyDeadline: "연 1회 (1~2월)",
    link: "https://www.mafra.go.kr/", verifiedSrc: "농림축산식품부", lastChecked: "2026-04-27 10:00" },

  { id: 60, category: "agriculture", categoryLabel: "농업·귀농", title: "후계농업경영인 자금",
    target: "만 18~50세 미만 후계농",
    benefit: "최대 5억원 / 연 1.5% 저금리 (3년 거치 7년 분할상환)",
    howTo: "지자체 농업정책과",
    tag: "전국", applyDeadline: "연 1회",
    link: "https://www.mafra.go.kr/", verifiedSrc: "농림축산식품부", lastChecked: "2026-04-27 10:00" },

  { id: 61, category: "agriculture", categoryLabel: "농업·귀농", title: "귀농귀촌 종합지원 (귀농인의집)",
    target: "도시 거주 귀농·귀촌 희망자",
    benefit: "귀농인의 집 단기 거주 + 영농교육 + 정착자금 융자(최대 3억)",
    howTo: "귀농귀촌종합센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.returnfarm.com/", verifiedSrc: "농림축산식품부", lastChecked: "2026-04-27 10:00" },

  { id: 62, category: "agriculture", categoryLabel: "농업·귀농", title: "농지은행 청년농 임대",
    target: "청년창업농 등 농지 필요 청년",
    benefit: "임차료 시세보다 낮게 / 5~10년 장기임대",
    howTo: "농지은행 (한국농어촌공사)",
    tag: "전국", applyDeadline: "수시",
    link: "https://www.fbo.or.kr/", verifiedSrc: "한국농어촌공사", lastChecked: "2026-04-27 10:00" },

  { id: 63, category: "agriculture", categoryLabel: "농업·귀농", title: "농촌에서 살아보기",
    target: "농촌 이주 희망자",
    benefit: "최대 6개월 거주 체험 + 월 30만원 연수비",
    howTo: "귀농귀촌종합센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.returnfarm.com/", verifiedSrc: "농림축산식품부", lastChecked: "2026-04-27 10:00" },

  // ==================== 💊 의료·건강 (Medical) ====================
  { id: 64, category: "medical", categoryLabel: "의료·건강", title: "정신건강 심리상담 바우처",
    target: "만 19세 이상 (소득 무관, 우울·불안 등 어려움)",
    benefit: "전문 심리상담 약 8회 (1회 약 8만원), 자기부담 일부",
    howTo: "복지로 또는 보건소·정신건강복지센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "보건복지부", lastChecked: "2026-04-27 10:00" },

  { id: 65, category: "medical", categoryLabel: "의료·건강", title: "서울시 청년 마음건강 지원사업",
    target: "서울 거주 만 19~39세",
    benefit: "심리상담 + 진단검사 (자기부담 10%)",
    howTo: "청년몽땅정보통 분기별 모집",
    tag: "서울", applyDeadline: "분기별",
    link: "https://youth.seoul.go.kr/", verifiedSrc: "서울시", lastChecked: "2026-04-27 10:00" },

  { id: 66, category: "medical", categoryLabel: "의료·건강", title: "청년 국가건강검진",
    target: "만 20~64세 직장가입자/지역가입자/피부양자",
    benefit: "2년에 1회 무료 일반건강검진 + 청년기 정신건강 검사",
    howTo: "국민건강보험공단",
    tag: "전국", applyDeadline: "2년 주기",
    link: "https://www.nhis.or.kr/", verifiedSrc: "국민건강보험공단", lastChecked: "2026-04-27 10:00" },

  { id: 67, category: "medical", categoryLabel: "의료·건강", title: "희귀질환자 의료비 지원",
    target: "건강보험 산정특례 등록 희귀질환자 + 소득 기준",
    benefit: "본인부담금 + 간병비 + 치료보조기 비용 지원",
    howTo: "관할 보건소",
    tag: "전국", applyDeadline: "상시",
    link: "https://helpline.kdca.go.kr/", verifiedSrc: "질병관리청", lastChecked: "2026-04-27 10:00" },

  { id: 68, category: "medical", categoryLabel: "의료·건강", title: "재난적의료비 지원",
    target: "소득 하위 50% + 본인부담 의료비 부담 가구",
    benefit: "연간 최대 5천만원까지 의료비 지원",
    howTo: "국민건강보험공단",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.nhis.or.kr/", verifiedSrc: "국민건강보험공단", lastChecked: "2026-04-27 10:00" },

  // ==================== 🍚 식비·생활 (Food) ====================
  { id: 69, category: "food", categoryLabel: "식비·생활", title: "천원의 아침밥",
    target: "대학(원)생",
    benefit: "학교 학식 아침을 1,000원에 제공 (정부+학교 보조)",
    howTo: "재학 중인 대학 학생식당",
    tag: "전국", applyDeadline: "학기 중",
    link: "https://www.mafra.go.kr/", verifiedSrc: "농림축산식품부", lastChecked: "2026-04-27 10:00" },

  { id: 70, category: "food", categoryLabel: "식비·생활", title: "청년식당·청년 한끼 (지자체)",
    target: "지자체 거주 청년 (만 19~39세)",
    benefit: "지정 식당에서 끼니당 3,000~5,000원 할인 / 무료 끼니",
    howTo: "거주 지자체 청년정책과",
    tag: "지자체", applyDeadline: "수시",
    link: "https://www.youthcenter.go.kr/", verifiedSrc: "지자체별 상이", lastChecked: "2026-04-27 10:00" },

  { id: 71, category: "food", categoryLabel: "식비·생활", title: "청년 정장 무료 대여 (열린옷장 등)",
    target: "취업 면접 등이 필요한 청년",
    benefit: "정장·구두·셔츠·넥타이·벨트 등 무료 또는 저가 대여",
    howTo: "열린옷장(theopencloset.net) / 지자체 청년센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://theopencloset.net/", verifiedSrc: "열린옷장 / 지자체", lastChecked: "2026-04-27 10:00" },

  { id: 72, category: "food", categoryLabel: "식비·생활", title: "서울 청년 안심소득 시범사업",
    target: "서울 거주 청년 (시범사업 대상자)",
    benefit: "기준 중위소득 85% 이하 가구에 차액의 50% 지급",
    howTo: "서울복지포털",
    tag: "서울", applyDeadline: "공고별",
    link: "https://wis.seoul.go.kr/", verifiedSrc: "서울시", lastChecked: "2026-04-27 10:00" },

  // ==================== 💎 복지·자산 (Welfare) ====================
  { id: 73, category: "welfare", categoryLabel: "복지·자산", title: "청년내일저축계좌 (2026)",
    target: "만 19~34세 (수급·차상위 15~39세) / 근로소득 월 10만원 이상 / 중위 100% 이하",
    benefit: "본인 10만원 → 정부 1:1 매칭 (수급·차상위는 1:3) / 3년 만기 최대 1,440만원",
    howTo: "복지로 (2026 모집: 5.4~5.20)",
    tag: "전국", applyDeadline: "2026-05-20",
    link: "https://hope.welfareinfo.or.kr/", verifiedSrc: "보건복지부 자산형성포털", lastChecked: "2026-04-27 10:00" },

  { id: 74, category: "welfare", categoryLabel: "복지·자산", title: "기초생활보장 (생계급여)",
    target: "기준 중위소득 32% 이하 가구",
    benefit: "최저생계비 차액 지원 (1인 가구 약 71만원/월)",
    howTo: "복지로 또는 행정복지센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "보건복지부", lastChecked: "2026-04-27 10:00" },

  { id: 75, category: "welfare", categoryLabel: "복지·자산", title: "청년 1인가구 안전 지원",
    target: "1인 가구 청년 (지자체별 상이)",
    benefit: "스마트초인종·도어가드 무상 설치 / 안심택배함 / 안심귀가",
    howTo: "거주 지자체 1인가구지원센터",
    tag: "지자체", applyDeadline: "상시",
    link: "https://www.youthcenter.go.kr/", verifiedSrc: "온통청년 / 지자체", lastChecked: "2026-04-27 10:00" },

  { id: 76, category: "welfare", categoryLabel: "복지·자산", title: "긴급복지지원",
    target: "갑작스런 위기상황 (실직·질병·가정폭력 등)",
    benefit: "생계비 4인가구 약 187만원 + 의료·주거·교육비",
    howTo: "보건복지상담센터 129",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "보건복지부", lastChecked: "2026-04-27 10:00" },

  { id: 77, category: "welfare", categoryLabel: "복지·자산", title: "한부모가족 지원",
    target: "만 18세 미만 자녀 양육 한부모 (소득 63% 이하)",
    benefit: "아동양육비 월 21만원 + 학용품비 + 주거지원",
    howTo: "복지로 또는 행정복지센터",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.bokjiro.go.kr/", verifiedSrc: "여성가족부", lastChecked: "2026-04-27 10:00" },

  // ==================== 📍 지자체 특화 (Regional) ====================
  { id: 78, category: "regional", categoryLabel: "지자체", title: "서울 청년수당",
    target: "서울 거주 만 19~34세 미취업 청년 (중위 150% 이하)",
    benefit: "월 50만원 × 6개월 (총 300만원) + 활동지원",
    howTo: "청년몽땅정보통 (분기별 모집)",
    tag: "서울", applyDeadline: "분기별",
    link: "https://youth.seoul.go.kr/", verifiedSrc: "서울시", lastChecked: "2026-04-27 10:00" },

  { id: 79, category: "regional", categoryLabel: "지자체", title: "경기도 청년기본소득",
    target: "경기도 3년 이상 거주 만 24세 청년",
    benefit: "분기별 25만원 × 4회 = 연 100만원 (지역화폐)",
    howTo: "경기도청년포털",
    tag: "경기", applyDeadline: "분기별",
    link: "https://account.jobaba.net/", verifiedSrc: "경기도청", lastChecked: "2026-04-27 10:00" },

  { id: 80, category: "regional", categoryLabel: "지자체", title: "부산 청년 디딤돌카드",
    target: "부산 거주 만 19~34세 미취업 청년",
    benefit: "월 50만원 × 6개월 카드 형태 지원",
    howTo: "부산청년플랫폼",
    tag: "부산", applyDeadline: "수시",
    link: "https://young.busan.go.kr/", verifiedSrc: "부산광역시", lastChecked: "2026-04-27 10:00" },

  { id: 81, category: "regional", categoryLabel: "지자체", title: "인천 청년 드림체크카드",
    target: "인천 거주 만 19~39세 미취업 청년",
    benefit: "월 50만원 × 6개월 활동지원금",
    howTo: "인천청년포털",
    tag: "인천", applyDeadline: "수시",
    link: "https://youth.incheon.go.kr/", verifiedSrc: "인천광역시", lastChecked: "2026-04-27 10:00" },

  { id: 82, category: "regional", categoryLabel: "지자체", title: "대전 청년 취업희망카드",
    target: "대전 거주 만 19~34세 미취업 청년",
    benefit: "월 50만원 × 최대 6개월",
    howTo: "대전청년내일",
    tag: "대전", applyDeadline: "수시",
    link: "https://www.djyouth.kr/", verifiedSrc: "대전광역시", lastChecked: "2026-04-27 10:00" },

  { id: 83, category: "regional", categoryLabel: "지자체", title: "광주 청년 드림수당",
    target: "광주 거주 만 19~39세 미취업 청년",
    benefit: "월 50만원 × 6개월 + 진로상담",
    howTo: "광주청년정책 누리집",
    tag: "광주", applyDeadline: "수시",
    link: "https://youth.gwangju.go.kr/", verifiedSrc: "광주광역시", lastChecked: "2026-04-27 10:00" },

  { id: 84, category: "regional", categoryLabel: "지자체", title: "제주 청년 정착 지원금",
    target: "제주 정착 청년 (전입 후 일정 기간)",
    benefit: "정착 지원금 + 주거·취업 통합지원",
    howTo: "제주특별자치도 청년정책 누리집",
    tag: "제주", applyDeadline: "수시",
    link: "https://www.jeju.go.kr/", verifiedSrc: "제주특별자치도", lastChecked: "2026-04-27 10:00" },

  { id: 85, category: "regional", categoryLabel: "지자체", title: "온통청년 통합 포털",
    target: "전 청년",
    benefit: "전국·지자체 청년정책 통합 검색 + 맞춤 추천 + 신청 연계",
    howTo: "온통청년 누리집/앱",
    tag: "전국", applyDeadline: "상시",
    link: "https://www.youthcenter.go.kr/", verifiedSrc: "국무조정실 청년정책조정위원회", lastChecked: "2026-04-27 10:00" }
];

/**
 * 카테고리 메타정보 (12개)
 * - icon은 이모지(emoji=이모지=그림문자)로 시각적 구분
 * - "favorite"는 즐겨찾기 가상 카테고리(localStorage에 저장된 ID 기반)
 */
const CATEGORIES = [
  { key: "all",         label: "전체",        icon: "🌟", desc: "모든 청년 지원 정책 보기" },
  { key: "favorite",    label: "즐겨찾기",    icon: "⭐", desc: "내가 저장한 정책만 보기" },
  { key: "housing",     label: "주거",        icon: "🏠", desc: "전월세·청년주택·청약" },
  { key: "job",         label: "일자리·창업", icon: "💼", desc: "취업·창업·인턴" },
  { key: "finance",     label: "금융",        icon: "💰", desc: "대출·적금·자산" },
  { key: "edu",         label: "교육·문화",   icon: "🎨", desc: "직업훈련·문화패스·장학" },
  { key: "transport",   label: "교통",        icon: "🚌", desc: "K-패스·기후동행카드" },
  { key: "marriage",    label: "결혼·출산",   icon: "💕", desc: "신혼·출산·양육 지원" },
  { key: "military",    label: "군 복무",     icon: "🎖️", desc: "장병적금·제대지원" },
  { key: "agriculture", label: "농업·귀농",   icon: "🌾", desc: "청년창업농·귀농귀촌" },
  { key: "medical",     label: "의료·건강",   icon: "💊", desc: "건강검진·심리상담" },
  { key: "food",        label: "식비·생활",   icon: "🍚", desc: "천원아침·정장대여" },
  { key: "welfare",     label: "복지·자산",   icon: "💎", desc: "내일저축·긴급복지" },
  { key: "regional",    label: "지자체",      icon: "📍", desc: "서울·경기·부산 등 특화" }
];

/**
 * 자가진단 질문 정의
 * - 사용자가 답하면 점수 매칭으로 추천 정책을 정렬
 * - 점수 산정 방식: 정책의 target/categoryLabel/tag 등에 사용자 응답 키워드가 포함되면 +가중치
 */
const QUIZ_QUESTIONS = [
  {
    id: "age",
    label: "나이",
    options: [
      { value: "under19", label: "만 19세 미만",    keywords: ["청년", "대학", "고등학생"] },
      { value: "19-24",   label: "만 19~24세",     keywords: ["청년", "대학", "19", "20", "21", "22", "23", "24"] },
      { value: "25-29",   label: "만 25~29세",     keywords: ["청년", "사회초년생", "25", "26", "27", "28", "29"] },
      { value: "30-34",   label: "만 30~34세",     keywords: ["청년", "30", "31", "32", "33", "34"] },
      { value: "35-39",   label: "만 35~39세",     keywords: ["청년", "35", "36", "37", "38", "39"] }
    ]
  },
  {
    id: "region",
    label: "거주 지역",
    options: [
      { value: "seoul",    label: "서울",     keywords: ["서울", "전국"] },
      { value: "gyeonggi", label: "경기",     keywords: ["경기", "전국"] },
      { value: "incheon",  label: "인천",     keywords: ["인천", "전국"] },
      { value: "busan",    label: "부산",     keywords: ["부산", "전국"] },
      { value: "other",    label: "기타 지역", keywords: ["전국", "지자체"] }
    ]
  },
  {
    id: "status",
    label: "현재 상태",
    options: [
      { value: "student",   label: "학생",        keywords: ["대학생", "학생", "재학", "장학", "내일배움"] },
      { value: "jobseeker", label: "구직자",      keywords: ["구직", "미취업", "취업", "청년수당", "국민취업"] },
      { value: "employee",  label: "직장인",      keywords: ["재직", "취업", "내일채움", "도약장려금"] },
      { value: "founder",   label: "창업자/예비", keywords: ["창업", "예비창업", "사관학교", "K-Startup"] },
      { value: "soldier",   label: "군 복무 중",  keywords: ["장병", "복무", "예비군"] },
      { value: "veteran",   label: "전역 후",     keywords: ["제대", "전역", "보훈"] }
    ]
  },
  {
    id: "housing",
    label: "주거 상황",
    options: [
      { value: "rent",      label: "월세",     keywords: ["월세", "임차", "주거", "버팀목"] },
      { value: "jeonse",    label: "전세",     keywords: ["전세", "보증금", "버팀목", "전세자금"] },
      { value: "homeless",  label: "무주택자", keywords: ["무주택", "행복주택", "청약", "임대"] },
      { value: "owner",     label: "자가",     keywords: ["주택구입"] },
      { value: "withFamily",label: "부모와 함께", keywords: [] }
    ]
  },
  {
    id: "marriage",
    label: "결혼/가족 상황",
    options: [
      { value: "single",   label: "미혼",      keywords: ["청년", "1인가구"] },
      { value: "newlywed", label: "신혼 (7년 이내)", keywords: ["신혼", "혼인"] },
      { value: "parent",   label: "출산·자녀 양육", keywords: ["출산", "양육", "부모급여", "첫만남", "다자녀"] }
    ]
  }
];
