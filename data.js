// 씻는 거, 오늘도 한 번만 챙겨요. — 문구/내용 데이터 (1차 시안)
// 규칙: 금지어(더럽다·냄새·게으르다·한심하다) 금지 / 의료 효과 단정 금지 / 푸시 알림 문구 없음
// 수치(물 온도·시간·샴푸 종류 등)는 공신력 있는 출처 링크가 있을 때만 입력. 없으면 value를 비워 둔다.
// 수치는 대상별 facts에만 넣고, 수사봇 검증(2026-10-24)을 통과한 것만 sources 링크와 함께 둔다.
// 모든 내용은 reviewed:false (전문가 검수 전 시안).

window.APP_DATA = {
  tagline: "씻는 거, 오늘도 한 번만 챙겨요.",
  disclaimer:
    "일반적인 생활 안내이며 의료 조언이 아니에요. 몸이 아프거나 피부에 이상이 있으면 전문가와 상담해 주세요.",
  disclaimerPet:
    "일반적인 생활 안내이며 수의사 상담을 대신하지 않아요. 피부나 행동이 평소와 다르면 수의사와 상담해 주세요.",
  helpLine: "혼자 하기 어렵거나 불안하면 도움을 받으세요.",
  adButton: "광고 보고 오늘의 개운 한마디 받기", // 보상형 광고(선택). 핵심 기능은 광고 없이 사용.
  typeNote: "언제든 바꿀 수 있어요.",

  // 화면 1: 유형 선택
  types: [
    { id: "delay", goal: "바로 시작하기",  label: "자꾸 미뤄요",             line: "오늘 샤워, 조금만 해 볼까요?",            go: "guide" },
    { id: "forget", goal: "오늘 체크하기", label: "자꾸 깜빡해요",           line: "오늘 씻었는지 기억나요?",                    go: "check" },
    { id: "rough", goal: "빠짐없이 씻기",  label: "씻긴 씻는데 대충 해요",   line: "씻긴 씻었는데, 빼먹은 데는 없나요?",         go: "guide" },
    { id: "first", goal: "씻겨주기 배우기",  label: "누구를 씻겨 본 적이 없어요", line: "누군가를 씻기는 건 처음이죠?",            go: "care" }
  ],

  // 화면 2: 오늘 체크
  check: {
    title: "오늘 씻었나요?",
    yes: "응, 씻었어요",
    no: "아직이요",
    yesReply: ["오, 오늘도 해냈네요. 멋져요!", "굿! 오늘 할 일 하나 끝."],
    noReply: ["괜찮아요, 지금 딱 한 번만 챙겨 봐요.", "아직이면 지금이 제일 좋은 때예요. 순서 보러 갈까요?"]
  },

  // 화면 3: 순서 가이드/타이머 (머리부터 발끝)
  guide: {
    title: "머리부터 발끝까지",
    intro: "빼먹기 쉬운 곳, 하나씩 체크해 봐요.",
    steps: ["머리·두피", "얼굴", "귀 뒤", "목", "겨드랑이", "팔·손", "가슴·배·등", "다리", "발·발가락 사이"],
    // 타이머: 내가 정하는 시간(건강 수치 아님). 기본값만 둠.
    timerDefaultMinutes: 5,
    done: "다 챙겼어요! 오늘도 수고했어요."
  },

  // 화면 4: 씻겨주기
  care: {
    title: "누구를 씻길까요?",
    body: "누구를 씻길지 골라 보세요. 처음이어도 순서대로 따라 하면 돼요.",
    button: "순서 보기",
    sections: { prep: "준비물", steps: "순서", caution: "주의할 점", after: "끝나고 할 일" },
    // 새 대상 추가: targets에 항목 하나만 추가하면 됨. ready:false → '준비 중' 표시.
    targets: [
      {
        id: "dog", label: "반려견", emoji: "🐶", pet: true, ready: true, needsHelpLine: false,
        intro: "물 싫어하는 친구라면 천천히, 칭찬 듬뿍!",
        prep: ["수건", "빗 또는 브러시", "강아지 전용 샴푸", "간식(칭찬용)", "미끄럼 방지 매트"],
        steps: [
          "욕실 문을 닫고 준비물을 손 닿는 곳에 둬요.",
          "뜨겁지 않은 미지근한 물로, 부드럽게 말 걸며 몸을 천천히 적셔요.",
          "강아지 전용 샴푸로 거품을 내서 몸부터 차근차근 씻겨요.",
          "얼굴 주변은 조심조심, 눈·귀에 들어가지 않게 해요.",
          "거품과 미끈거림이 없어질 때까지 헹구고 수건으로 닦아 말려요."
        ],
        caution: ["도망가려고 하면 억지로 하지 말고 잠깐 쉬어 가요.", "미끄러지지 않게 잘 잡아 주세요.", "목욕 횟수는 털·활동량·피부에 따라 달라요. 궁금하면 수의사에게 물어봐요.", "피부나 행동이 평소와 다르면 수의사와 상담해요."],
        after: ["간식과 칭찬 주기", "욕실 바닥 정리하기"],
        facts: [], sources: [
          { name: "버지니아텍 수의대 부속병원 목욕 안내", url: "https://vth.vetmed.vt.edu/animal-care-tips/bathing-tips.html" },
          { name: "ASPCA 강아지 그루밍 안내", url: "https://www.aspca.org/pet-care/dog-care/dog-grooming-tips" }
        ], reviewed: false
      },
      {
        id: "cat", label: "반려묘", emoji: "🐱", pet: true, ready: true, needsHelpLine: false,
        intro: "건강한 고양이는 보통 목욕이 필요 없어요. 많이 더러워졌을 때만 해요.",
        prep: ["수건", "미끄럼 방지 매트", "간식(칭찬용)", "조용한 공간"],
        steps: [
          "조용한 공간에 준비물을 미리 놓아요.",
          "뜨겁지 않은 미지근한 물로, 낮은 목소리로 말 걸며 천천히 적셔요.",
          "고양이 전용 제품으로 부드럽게 씻기고 얼굴 주변은 조심해요.",
          "거품이 남지 않게 헹구고 수건으로 감싸 닦아 줘요."
        ],
        caution: ["싫어하는 기색이 크면 억지로 하지 말고 멈춘 뒤 다음에 다시 해요.", "혼자 하기 어려우면 둘이 함께 하는 게 좋아요.", "피부나 행동이 평소와 다르면 수의사와 상담해요."],
        after: ["조용히 쉴 곳 마련하기", "간식과 칭찬 주기"],
        facts: [], sources: [
          { name: "International Cat Care 그루밍 안내", url: "https://icatcare.org/articles/grooming-your-cat" },
          { name: "ASPCA 고양이 그루밍 안내", url: "https://www.aspca.org/pet-care/cat-care/cat-grooming-tips" }
        ], reviewed: false
      },
      {
        id: "baby", label: "아기", emoji: "👶", ready: true, needsHelpLine: true,
        intro: "작은 친구라 더 천천히, 더 다정하게요.",
        prep: ["큰 수건", "갈아입을 옷과 기저귀", "아기용 순한 세정제", "물 받을 욕조"],
        steps: [
          "준비물을 모두 손 닿는 곳에 둬요.",
          "손목이나 팔꿈치로 물을 대 보고, 따뜻하지만 뜨겁지 않은지 확인해요.",
          "한 손으로 아기를 단단히 받치고 천천히 씻겨요. 세정제는 아주 조금만 써요.",
          "목·겨드랑이·접히는 곳도 살살 챙겨요.",
          "세정제는 바로 헹군 뒤 큰 수건으로 감싸 닦아 줘요."
        ],
        caution: ["아기에게서 손을 떼거나 자리를 비우지 않아요. 잠깐도 안 돼요.", "탯줄이 떨어지기 전에는 욕조 대신 젖은 수건이나 스펀지로 닦아 주는 스펀지 목욕을 해요.", "피부에 이상이 보이면 전문가와 상담해요."],
        after: ["옷 입히기", "물기 닦은 곳 확인하기", "욕실 정리하기"],
        facts: [
          { label: "목욕 시간", value: "5~10분 안팎으로 짧게" },
          { label: "횟수", value: "보통 일주일에 2~3번 (좋아하면 매일도 괜찮지만 피부가 건조해질 수 있어요)" }
        ],
        sources: [
          { name: "보건복지부 아이사랑", url: "https://www.childcare.go.kr/?menuno=421" },
          { name: "NHS 아기 목욕 안내", url: "https://www.nhs.uk/baby/caring-for-a-newborn/washing-and-bathing-your-baby/" },
          { name: "AAP 신생아 목욕 안내", url: "https://www.healthychildren.org/English/ages-stages/baby/bathing-skin-care/Pages/Bathing-Your-Newborn.aspx" }
        ], reviewed: false
      },
      {
        id: "child", label: "어린이", emoji: "🧒", ready: false, needsHelpLine: false,
        intro: "", prep: [], steps: [], caution: [], after: [], facts: [], sources: [], reviewed: false
      },
      {
        id: "senior", label: "어르신", emoji: "🧓", ready: true, needsHelpLine: true,
        intro: "존중하는 마음으로, 천천히 여쭤 보면서 해요.",
        prep: ["미끄럼 방지 매트", "앉을 수 있는 의자", "큰 수건", "갈아입을 옷"],
        steps: [
          "씻기 전에 괜찮은지 여쭤 보고 동의를 구해요.",
          "의자에 편히 앉도록 도와드려요.",
          "한 부위씩 말씀드리며 천천히 씻어 드려요.",
          "접히는 곳과 발가락 사이도 챙겨요.",
          "거품이 남지 않게 헹구고 수건으로 닦아 드려요."
        ],
        caution: ["욕실 바닥이 미끄럽지 않은지 먼저 살펴요.", "들어가기 전에 탈의실과 욕실을 미리 따뜻하게 해 둬요.", "식사·음주·약 복용 직후는 피하고, 일어나실 때는 천천히 도와드려요.", "어지러워하시면 바로 멈추고 쉬게 해 드려요. 계속되면 주변이나 전문가에게 도움을 요청해요.", "혼자 부축하기 어려우면 다른 사람과 함께 해요."],
        after: ["옷 입는 것 도와드리기", "편히 쉬실 수 있게 하기", "욕실 정리하기"],
        facts: [
          { label: "물 온도", value: "41℃ 이하", note: "일본 소비자청 안내 기준" },
          { label: "탕 안 시간", value: "10분 이내", note: "일본 소비자청 안내 기준" }
        ],
        sources: [
          { name: "일본 소비자청 안내", url: "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_042" },
          { name: "오사카부 안내", url: "https://www.pref.osaka.lg.jp/o100030/iryo/qq/heat.html" }
        ], reviewed: false
      },
      {
        id: "care", label: "몸이 불편한 가족", emoji: "🤝", ready: false, needsHelpLine: true,
        intro: "", prep: [], steps: [], caution: [], after: [], facts: [], sources: [], reviewed: false
      }
    ]
  },

  // 보상형 광고 후 보여줄 한마디(선택 기능)
  dailyLines: [
    "오늘 한 번 챙긴 것만으로도 잘했어요. 개운해지는 중!",
    "씻고 나면 기분이 가벼워질 수도 있어요.",
    "작은 습관이 오늘의 나를 챙겨요."
  ]
};
