/* ============================================================
   script.js — 화면 그리기 + 검색/필터 + 자가진단 + 즐겨찾기 + 다크모드
   ============================================================
   왜 JS(JavaScript=자바스크립트)가 필요한가요?
   → HTML은 "구조", CSS는 "디자인"만 담당합니다.
     사용자가 검색창에 글자를 치거나 카테고리 버튼을 누를 때마다
     화면이 동적으로 바뀌려면 "동작(Behavior=비헤이비어)"이 필요해요.
     이 동작을 맡는 게 JavaScript입니다.

   설계 흐름(Flow=플로우):
   1) 페이지 로딩이 끝나면 카테고리 버튼/카드 목록을 그린다 (render=렌더=그리기).
   2) 사용자가 검색어를 입력하거나 카테고리를 누르면
      → 현재 상태(state=스테이트=상태값)를 갱신
      → 다시 카드 목록을 그린다.

   이 패턴을 "상태 기반 렌더링(State-driven rendering)" 이라고 합니다.
   React, Vue 같은 프레임워크도 이 원리로 동작해요.

   이번 확장에서 추가된 것:
   - 즐겨찾기(localStorage 저장) — 새로고침해도 유지
   - 자가진단 모달 (5단계 질문)
   - 다크모드 토글 (localStorage에 테마 저장)
   - D-day 자동 계산 (applyDeadline 필드 → 며칠 남았는지)
   - 토스트 알림 (즐겨찾기 추가/삭제 시)
   - lastChecked 표시 (데이터 신선도)
   ============================================================ */

/* ---------- 1) 현재 상태(state) 변수들 ---------- */
/* let(렛) = "허용하다"라는 뜻. 값이 바뀔 수 있는 변수 선언.
   const(콘스트=Constant=상수)는 안 바뀌는 값,
   let은 나중에 바뀔 수 있는 값에 사용합니다.
   왜 분리? → 실수로 바뀌면 안 되는 값이 바뀌는 사고를 막기 위함. */
let currentCategory = "all";   // 현재 선택된 카테고리 키
let currentKeyword = "";       // 현재 검색어 (소문자로 저장)

/* 즐겨찾기 ID 목록을 Set(셋=집합) 자료구조로 관리.
   왜 Array(어레이=배열)가 아니고 Set인가요?
   → Set은 중복을 자동으로 제거하고, has()로 포함 여부를 빠르게(O(1)) 확인할 수 있어요.
     즐겨찾기는 "있다/없다"를 자주 확인하므로 Set이 효율적. */
let favoriteIds = new Set();

/* 자가진단 상태 — 현재 어느 질문에 와있는지, 답변은 어디까지 했는지 */
let quizState = {
  currentStep: 0,        // 현재 질문 번호 (0-indexed)
  answers: [],           // 사용자가 고른 답변들 (각 질문마다 선택한 옵션의 value 저장)
  isResult: false        // 결과 화면 보고 있는지
};

/* localStorage(로컬 스토리지=브라우저에 저장되는 영구 저장소) 키들.
   왜 상수로 정의? → 오타로 인한 버그 방지 (a single source of truth=싱글 소스 오브 트루스=하나의 진실의 원천) */
const LS_FAVORITES = "youth-favorites";
const LS_THEME = "youth-theme";

/* ---------- 2) 자주 쓸 DOM 요소들 미리 찾아두기 ---------- */
/* DOM(Document Object Model=문서 객체 모델) = HTML을 자바스크립트가 다룰 수 있는 객체로 변환한 것.
   document.getElementById(아이디로 요소 찾기) 메서드(method=함수)로 HTML 요소를 가져옵니다.
   미리 변수에 담아두는 이유: 매번 검색하면 성능이 떨어지고, 코드도 길어지기 때문. */
const $categoryList = document.getElementById("categoryList");
const $policyGrid   = document.getElementById("policyGrid");
const $resultCount  = document.getElementById("resultCount");
const $searchInput  = document.getElementById("searchInput");
const $emptyState   = document.getElementById("emptyState");
const $policiesTitle = document.getElementById("policiesTitle");

const $themeToggleBtn = document.getElementById("themeToggleBtn");
const $themeIcon      = document.getElementById("themeIcon");
const $quizOpenBtn    = document.getElementById("quizOpenBtn");
const $quizOverlay    = document.getElementById("quizOverlay");
const $quizCloseBtn   = document.getElementById("quizCloseBtn");
const $quizBody       = document.getElementById("quizBody");
const $quizProgress   = document.getElementById("quizProgress");
const $quizProgressFill = document.getElementById("quizProgressFill");
const $quizPrevBtn    = document.getElementById("quizPrevBtn");
const $quizNextBtn    = document.getElementById("quizNextBtn");
const $quizContent    = document.getElementById("quizContent");
const $toast          = document.getElementById("toast");

/* 변수명 앞에 $ 표시는 "이 변수는 DOM 요소다"라는 개인적 약속(컨벤션=convention=관례).
   필수 규칙은 아니지만, 일반 데이터와 구분하기 위한 팁이에요. */

/* ---------- 3) localStorage 안전 접근 헬퍼(helper=헬퍼=도우미) ---------- */
/*
  왜 try/catch로 감쌀까요?
  → 시크릿 모드, 일부 모바일 브라우저, 보안 정책에 따라 localStorage가 차단될 수 있습니다.
    그럴 때 에러로 페이지 전체가 멈추면 곤란하므로 "방어적 프로그래밍(defensive=디펜시브=방어적)"으로 감쌉니다.

  Before(적용 전): localStorage.getItem(...) 직접 호출 → 차단 시 사이트 다운
  After(적용 후) : safeLS.get(...) 으로 호출 → 차단되어도 null 반환, 사이트 정상
*/
const safeLS = {
  get(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* 무시 */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* 무시 */ }
  }
};

/* ---------- 4) 즐겨찾기 로드 / 저장 ---------- */
function loadFavorites() {
  const raw = safeLS.get(LS_FAVORITES);
  if (!raw) return;
  try {
    /* JSON(제이슨=JavaScript Object Notation=자바스크립트 객체 표기법):
       데이터를 문자열로 직렬화(serialize=시리얼라이즈=일렬로 늘어놓기)하는 표준 형식.
       localStorage는 문자열만 저장 가능하므로 JSON으로 변환했다가 복원합니다. */
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) favoriteIds = new Set(arr);
  } catch (e) {
    /* 잘못된 JSON이면 무시하고 빈 Set으로 시작 */
    favoriteIds = new Set();
  }
}

function saveFavorites() {
  /* Set을 그대로 JSON으로 변환할 수 없으므로 Array.from()으로 배열 변환 후 저장.
     JSON.stringify(스트링이파이=문자열로 만들기): 객체 → 문자열. */
  safeLS.set(LS_FAVORITES, JSON.stringify(Array.from(favoriteIds)));
}

function toggleFavorite(id) {
  /* 이미 있으면 삭제, 없으면 추가 → "토글(toggle=토글=전환)" 패턴 */
  if (favoriteIds.has(id)) {
    favoriteIds.delete(id);
    showToast("⭐ 즐겨찾기에서 제거됐어요");
  } else {
    favoriteIds.add(id);
    showToast("⭐ 즐겨찾기에 추가됐어요!");
  }
  saveFavorites();
  /* 카테고리 카운트도 갱신해야 하므로 카테고리도 다시 그림 */
  renderCategories();
  renderPolicies();
}

/* ---------- 5) 토스트(Toast) 알림 ---------- */
/*
  토스트란?
  → "잠깐 떴다 사라지는 작은 알림". 사용자의 작업 흐름을 끊지 않고 피드백 전달.
  왜 setTimeout(셋타임아웃)?
  → 일정 시간 뒤에 함수를 실행하는 표준 비동기(asynchronous=어싱크로너스=시간 차이) API.
*/
let toastTimer = null;
function showToast(message) {
  $toast.textContent = message;
  $toast.classList.add("show");

  /* 이전 타이머가 있으면 취소 — 빠르게 여러 번 누를 때를 대비.
     이를 "기존 작업 정리(cleanup=클린업=청소)" 라고 합니다. */
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    $toast.classList.remove("show");
  }, 1800); // 1.8초 뒤 사라짐
}

/* ---------- 6) 다크모드 (Dark Mode=다크 모드) ---------- */
/*
  설계 원리:
  - body에 .dark 클래스가 있으면 다크모드, 없으면 라이트모드
  - localStorage에 테마를 저장 → 새로고침해도 유지
  - prefers-color-scheme(미디어 쿼리)을 통해 OS 테마 자동 감지도 가능 (옵션)

  왜 이렇게 설계?
  → CSS 변수만 바꾸면 디자인 전체가 한 번에 전환됩니다 (CSS Variables=시에스에스 배리어블 패턴).
*/
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    $themeIcon.textContent = "☀️"; /* 다크모드일 때는 "라이트모드로 가는 아이콘"을 표시 */
  } else {
    document.body.classList.remove("dark");
    $themeIcon.textContent = "🌙";
  }
}

function initTheme() {
  /* 1순위: 사용자가 이전에 골랐던 테마
     2순위: OS의 다크모드 설정 (prefers-color-scheme=프리퍼스 컬러 스킴=선호 색상 모드) */
  let theme = safeLS.get(LS_THEME);
  if (!theme) {
    /* matchMedia(매치미디어): CSS 미디어 쿼리를 JS에서 감지하는 API */
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  applyTheme(theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  safeLS.set(LS_THEME, next);
}

/* ---------- 7) D-day 계산 ---------- */
/*
  D-day(디데이) = "Day-day"의 줄임말. 군사 용어에서 유래한 "결행일".
  현재는 "특정 날짜까지 며칠 남았는지" 를 표현하는 카운트다운으로 정착.

  applyDeadline 필드 형식: "2026-12-31" 또는 "상시" 또는 ""

  반환값(Object=오브젝트=객체):
  - text: "D-12", "오늘 마감", "상시 신청" 등 표시용 문자열
  - level: "normal" / "warning" / "urgent" / "expired" / "always" — 색상 클래스용
*/
function calculateDday(applyDeadline) {
  /* 마감일이 비어있거나 '상시' 라면 별도 처리 */
  if (!applyDeadline || applyDeadline === "상시") {
    return { text: "🟢 상시 신청 가능", level: "always" };
  }
  if (applyDeadline === "수시" || applyDeadline.includes("연중")) {
    return { text: "🟢 연중 수시 신청", level: "always" };
  }

  /* 날짜 비교를 위해 Date 객체 생성.
     '시간(hour, minute)'을 0으로 맞춰야 정확히 '날짜 단위'로 차이 계산 가능. */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(applyDeadline);
  if (isNaN(deadline.getTime())) {
    /* 날짜 형식이 아닌 텍스트(예: "분기별") → 그냥 그대로 표시 */
    return { text: `📅 ${applyDeadline}`, level: "normal" };
  }
  deadline.setHours(0, 0, 0, 0);

  /* 날짜 차이 계산: 밀리초(ms) 단위 차이 → 일(day) 단위로 변환.
     1일 = 24시간 × 60분 × 60초 × 1000ms = 86,400,000ms */
  const diffMs = deadline - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `❌ 마감 (${applyDeadline})`, level: "expired" };
  }
  if (diffDays === 0) {
    return { text: "🚨 오늘 마감!", level: "urgent" };
  }
  if (diffDays <= 3) {
    return { text: `🚨 D-${diffDays} (긴급!)`, level: "urgent" };
  }
  if (diffDays <= 7) {
    return { text: `⚠️ D-${diffDays}`, level: "warning" };
  }
  if (diffDays <= 30) {
    return { text: `📅 D-${diffDays}`, level: "normal" };
  }
  return { text: `📅 ~${applyDeadline}`, level: "normal" };
}

/* ---------- 8) 카테고리 버튼 그리기 ---------- */
function renderCategories() {
  /*
    map(맵) = "지도, 매핑"이라는 뜻. 배열의 각 요소를 다른 형태로 변환해 새 배열을 만드는 메서드.
    여기선 CATEGORIES 배열의 각 카테고리를 HTML 문자열로 변환합니다.
  */
  const html = CATEGORIES.map(cat => {
    /* 현재 선택된 카테고리면 'active' 클래스를 붙여서 강조 표시 */
    const activeClass = (cat.key === currentCategory) ? "active" : "";

    /* 즐겨찾기 카테고리에는 현재 즐겨찾기 개수 표시 */
    let countBadge = "";
    if (cat.key === "favorite" && favoriteIds.size > 0) {
      countBadge = `<span class="cat-count">${favoriteIds.size}</span>`;
    }

    return `
      <button class="category-btn ${activeClass}" data-key="${cat.key}" title="${cat.desc}">
        <span class="cat-icon">${cat.icon}</span>
        <span>${cat.label}</span>
        ${countBadge}
      </button>
    `;
  }).join(""); // 배열을 문자열로 합치기 (구분자 없이)

  $categoryList.innerHTML = html;

  /*
    이벤트 리스너(event listener=이벤트 청취자) 등록.
    클릭하면 호출되는 콜백 함수(callback=콜백=나중에 호출되는 함수)를 등록합니다.

    왜 querySelectorAll로 다시 찾나요?
    → innerHTML로 새로 그려진 요소들은 방금 만들어졌기 때문에
      처음 변수에는 잡혀 있지 않아요. 새로 찾아야 합니다.
  */
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.key; // data-key 속성 값을 가져옴
      renderCategories(); // active 표시를 새로 그림
      renderPolicies();   // 카드 목록도 다시 그림
    });
  });
}

/* ---------- 9) HTML 이스케이프(escape=이스케이프=특수문자 안전 처리) ---------- */
/*
  왜 필요한가요?
  → 정책 데이터에 <, >, " 같은 특수문자가 있으면 HTML 구조가 깨질 수 있고,
    악의적인 데이터가 들어오면 XSS(Cross-Site Scripting=크로스 사이트 스크립팅=교차 사이트 스크립트 공격)
    취약점이 생길 수 있어요.
  → 이 사이트는 정적 데이터만 쓰지만, 안전한 습관을 들이는 차원에서 항상 이스케이프합니다.
*/
function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------- 10) 정책 카드 그리기 ---------- */
function renderPolicies() {
  /*
    filter(필터) = "거르다". 조건에 맞는 요소만 골라 새 배열을 반환.
    이 함수에서는 두 가지 조건을 동시에 적용합니다:
    (1) 카테고리 일치 (또는 'all'이면 모두, 'favorite'이면 즐겨찾기만)
    (2) 검색어가 정책의 어딘가에 포함되는지
  */
  const filtered = POLICIES.filter(p => {
    let matchCategory;
    if (currentCategory === "all") {
      matchCategory = true;
    } else if (currentCategory === "favorite") {
      matchCategory = favoriteIds.has(p.id);
    } else {
      matchCategory = p.category === currentCategory;
    }

    /* 검색은 대소문자 구분 없이 동작해야 함 → 모두 소문자로 변환해서 비교.
       includes(인클루즈=포함하다): 문자열 안에 특정 문자열이 있는지 확인.
       optional chaining(?.) 으로 일부 필드가 없어도 안전하게 처리. */
    const haystack = (
      (p.title || "") + " " +
      (p.target || "") + " " +
      (p.benefit || "") + " " +
      (p.howTo || "") + " " +
      (p.categoryLabel || "") + " " +
      (p.tag || "")
    ).toLowerCase();

    const matchKeyword =
      currentKeyword === "" || haystack.includes(currentKeyword);

    return matchCategory && matchKeyword;
  });

  /* 결과 개수 갱신 */
  $resultCount.textContent = `${filtered.length}건`;

  /* 카테고리 라벨에 맞춰 제목도 갱신 */
  const currentCat = CATEGORIES.find(c => c.key === currentCategory);
  if (currentCat) {
    let titleSuffix;
    if (currentCat.key === "all") titleSuffix = "전체 정책";
    else if (currentCat.key === "favorite") titleSuffix = "즐겨찾기";
    else titleSuffix = currentCat.label + " 지원";
    $policiesTitle.textContent = `${currentCat.icon} ${titleSuffix}`;
  }

  /* 검색 결과가 없으면 빈 상태 표시 */
  if (filtered.length === 0) {
    $policyGrid.innerHTML = "";
    $emptyState.hidden = false;
    /* 즐겨찾기 카테고리에서 비어있으면 안내 문구 변경 */
    if (currentCategory === "favorite" && favoriteIds.size === 0) {
      $emptyState.querySelector("h3").textContent = "아직 즐겨찾기가 없어요";
      $emptyState.querySelector("p").textContent = "관심 있는 정책의 별(☆)을 눌러 저장해 보세요!";
      $emptyState.querySelector(".empty-emoji").textContent = "⭐";
    } else {
      $emptyState.querySelector("h3").textContent = "검색 결과가 없어요";
      $emptyState.querySelector("p").textContent = "다른 키워드로 검색하거나 카테고리를 바꿔 보세요.";
      $emptyState.querySelector(".empty-emoji").textContent = "🔎";
    }
    return;
  } else {
    $emptyState.hidden = true;
  }

  /*
    실제 카드 HTML을 만든다.
    템플릿 리터럴(template literal=템플릿 리터럴) = 백틱(`)으로 감싼 문자열.
    ${변수} 형태로 변수를 끼워넣을 수 있어 가독성이 좋습니다.
  */
  const cardsHtml = filtered.map(p => {
    const isFavorite = favoriteIds.has(p.id);
    const dday = calculateDday(p.applyDeadline);

    return `
      <article class="policy-card" data-category="${escapeHtml(p.category)}">
        <div class="card-top">
          <div class="card-tags">
            <span class="card-category-tag">${escapeHtml(p.categoryLabel)}</span>
            <span class="card-region-tag">📍 ${escapeHtml(p.tag)}</span>
          </div>
          <button
            class="favorite-btn ${isFavorite ? 'active' : ''}"
            data-id="${escapeHtml(p.id)}"
            aria-label="즐겨찾기"
            title="즐겨찾기 ${isFavorite ? '해제' : '추가'}"
          >${isFavorite ? '★' : '☆'}</button>
        </div>

        <h3 class="card-title">${escapeHtml(p.title)}</h3>

        <span class="dday-badge ${dday.level === 'always' ? '' : dday.level}">${dday.text}</span>

        <div class="card-info">
          <div class="card-info-row">
            <span class="card-info-label">대상</span>
            <span class="card-info-value">${escapeHtml(p.target)}</span>
          </div>
          <div class="card-info-row">
            <span class="card-info-label">혜택</span>
            <span class="card-info-value">${escapeHtml(p.benefit)}</span>
          </div>
          <div class="card-info-row">
            <span class="card-info-label">신청</span>
            <span class="card-info-value">${escapeHtml(p.howTo)}</span>
          </div>
        </div>

        <a class="card-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer">
          공식 사이트 바로가기 →
        </a>
        ${p.verifiedSrc
          ? `<p class="card-verified">✅ 검증 출처: ${escapeHtml(p.verifiedSrc)}</p>`
          : ""}
        ${p.lastChecked
          ? `<span class="card-checked">🔄 마지막 확인: ${escapeHtml(p.lastChecked)}</span>`
          : ""}
      </article>
    `;
  }).join("");

  /*
    target="_blank": 새 탭에서 열기.
    rel="noopener noreferrer": 보안 옵션.
      - noopener: 새 창이 원래 창을 마음대로 조작하지 못하게 막음
      - noreferrer: 어디서 왔는지 정보를 새 사이트에 안 알려줌
    → 이 두 옵션을 같이 두는 건 외부 링크 보안 모범 사례입니다.
  */

  $policyGrid.innerHTML = cardsHtml;

  /* 즐겨찾기 버튼 클릭 이벤트 연결.
     event.stopPropagation(이벤트 스탑 프로파게이션=이벤트 전파 멈춤):
     별을 클릭했을 때 카드 자체의 클릭 이벤트로 번지지 않도록 막음. */
  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleFavorite(btn.dataset.id);
    });
  });
}

/* ---------- 11) 검색 입력 처리 (디바운스 적용) ---------- */
/*
  디바운스(debounce=디바운스) = "튀는 걸 제거한다"는 뜻.
  사용자가 빠르게 타이핑할 때마다 함수가 호출되면 비효율적이므로,
  마지막 입력 이후 일정 시간이 지나야 한 번만 실행되게 해주는 패턴입니다.

  Before(적용 전): "안녕"을 치면 'ㅇ→안→안ㄴ→안녕' 매번 검색 4번 실행
  After(적용 후) : 200ms 동안 멈춰야 한 번 실행 → 자원 절약!
*/
function debounce(fn, delay) {
  let timerId; // 타이머 식별자(ID)
  return function (...args) {
    clearTimeout(timerId);              // 이전 예약 취소
    timerId = setTimeout(() => fn(...args), delay); // delay 후에 실행
  };
}

const handleSearch = debounce(() => {
  /* trim(트림=다듬다): 앞뒤 공백 제거 */
  currentKeyword = $searchInput.value.trim().toLowerCase();
  renderPolicies();
}, 200);

/* ---------- 12) 자가진단(Quiz=퀴즈) 모달 로직 ---------- */
/*
  설계:
  - QUIZ_QUESTIONS 배열 → 각 문항별 옵션
  - 사용자가 다음/이전을 누르면 quizState.currentStep 갱신
  - 마지막 단계에서는 답변과 정책의 categoryMatch / targetMatch 점수를 계산해 결과 출력

  왜 점수제(score=스코어=점수)?
  → 정책 하나하나에 "당신에게 얼마나 맞는가?"를 1~10점으로 환산.
    상위 N개를 추천하면 자연스러운 추천(recommendation=레커멘데이션) 시스템이 됩니다.
*/
function openQuiz() {
  /* 상태 초기화 */
  quizState = {
    currentStep: 0,
    answers: new Array(QUIZ_QUESTIONS.length).fill(null),
    isResult: false
  };
  $quizOverlay.hidden = false;
  /* 모달이 떠있을 때 페이지 스크롤 막기 */
  document.body.style.overflow = "hidden";
  renderQuizStep();
}

function closeQuiz() {
  $quizOverlay.hidden = true;
  document.body.style.overflow = ""; /* 스크롤 잠금 해제 */
}

function renderQuizStep() {
  if (quizState.isResult) {
    renderQuizResult();
    return;
  }

  const step = quizState.currentStep;
  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[step];

  /* 진행률 계산 (0~100%) */
  const progressPct = Math.round(((step + 1) / total) * 100);
  $quizProgress.textContent = `질문 ${step + 1} / ${total}`;
  $quizProgressFill.style.width = `${progressPct}%`;

  /* 옵션 HTML 생성 */
  const optionsHtml = q.options.map((opt, idx) => {
    const selected = quizState.answers[step] === opt.value ? "selected" : "";
    return `
      <button class="quiz-option ${selected}" data-value="${escapeHtml(opt.value)}" data-step="${step}">
        ${escapeHtml(opt.label)}
      </button>
    `;
  }).join("");

  /* data.js의 QUIZ_QUESTIONS는 'label' 필드에 질문을 담고 있음.
     예: { id: "age", label: "나이", options: [...] } */
  $quizBody.innerHTML = `
    <p class="quiz-question">${escapeHtml(q.label)}</p>
    <div class="quiz-options">${optionsHtml}</div>
  `;

  /* 옵션 클릭 처리 */
  $quizBody.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      quizState.answers[step] = btn.dataset.value;
      /* 선택 표시를 갱신하기 위해 다시 렌더 */
      renderQuizStep();
    });
  });

  /* 이전/다음 버튼 활성화 상태 갱신 */
  $quizPrevBtn.disabled = step === 0;
  $quizNextBtn.disabled = quizState.answers[step] === null;
  $quizNextBtn.textContent = step === total - 1 ? "결과 보기 →" : "다음 →";
}

function goNextQuizStep() {
  if (quizState.currentStep < QUIZ_QUESTIONS.length - 1) {
    quizState.currentStep++;
    renderQuizStep();
  } else {
    /* 마지막이면 결과 화면으로 */
    quizState.isResult = true;
    renderQuizResult();
  }
}

function goPrevQuizStep() {
  if (quizState.currentStep > 0) {
    quizState.currentStep--;
    quizState.isResult = false;
    renderQuizStep();
  }
}

/* ---------- 13) 자가진단 결과 점수 계산 ---------- */
/*
  scoring(스코어링=점수 매기기) 로직:
  data.js의 QUIZ_QUESTIONS는 다음 구조:
    { id: "age", label: "나이", options: [{ value, label, keywords: [...] }] }

  사용자가 선택한 옵션들의 keywords 배열을 모두 합쳐서,
  각 정책의 "검색 가능한 텍스트" 안에 포함된 키워드 개수만큼 점수를 부여.

  왜 키워드 매칭 방식?
  → 정책 데이터의 자연어(title/target/benefit)와 직접 매칭되어 유연하고 정확함.
  → 새 정책을 추가할 때 점수 코드를 수정할 필요가 없음 (확장성=extensibility=익스텐서빌러티).

  보너스 가중치:
  - 카테고리별 사용자 의도 매칭 (예: 구직자→job 카테고리 +3)
  - 마감 임박 정책 +1
*/
function calculateQuizResult() {
  const answers = quizState.answers;

  /* 1) 사용자가 선택한 옵션들의 keywords를 모두 모아서 단일 배열 생성.
        flatMap(플랫맵): 각 요소를 배열로 변환한 뒤 평탄화(flatten=평탄화)하는 메서드. */
  const userKeywords = [];
  QUIZ_QUESTIONS.forEach((q, idx) => {
    const selectedValue = answers[idx];
    if (!selectedValue) return;
    const opt = q.options.find(o => o.value === selectedValue);
    if (opt && Array.isArray(opt.keywords)) {
      userKeywords.push(...opt.keywords); // spread(스프레드=펼치기) 연산자
    }
  });

  /* 2) 답변별 카테고리 가중치 매핑 (선택 status가 어떤 카테고리에 가중치를 줄지) */
  const categoryWeights = {};
  const statusValue = answers[2]; // Q3: 현재 상태
  if (statusValue === "student")    { categoryWeights.edu = 4; categoryWeights.welfare = 2; categoryWeights.food = 2; }
  if (statusValue === "jobseeker")  { categoryWeights.job = 5; categoryWeights.welfare = 2; }
  if (statusValue === "employee")   { categoryWeights.finance = 4; categoryWeights.housing = 3; categoryWeights.transport = 2; }
  if (statusValue === "founder")    { categoryWeights.job = 4; categoryWeights.finance = 3; categoryWeights.agriculture = 3; }
  if (statusValue === "soldier")    { categoryWeights.military = 5; categoryWeights.finance = 2; }
  if (statusValue === "veteran")    { categoryWeights.military = 4; categoryWeights.job = 3; }

  /* 주거 상황 (Q4) */
  const housingValue = answers[3];
  if (housingValue && housingValue !== "owner") {
    categoryWeights.housing = (categoryWeights.housing || 0) + 4;
  }

  /* 결혼 상황 (Q5) */
  const marriageValue = answers[4];
  if (marriageValue === "newlywed") {
    categoryWeights.marriage = (categoryWeights.marriage || 0) + 5;
    categoryWeights.housing = (categoryWeights.housing || 0) + 2;
  }
  if (marriageValue === "parent") {
    categoryWeights.marriage = (categoryWeights.marriage || 0) + 4;
    categoryWeights.welfare = (categoryWeights.welfare || 0) + 3;
  }

  /* 지역 가중치 (Q2) — 정책 tag와 매칭 */
  const regionValue = answers[1];

  /* 3) 각 정책마다 점수 계산 */
  const scored = POLICIES.map(p => {
    let score = 0;

    /* 정책에서 검색 가능한 모든 텍스트를 합침 */
    const haystack = (
      (p.title || "") + " " +
      (p.target || "") + " " +
      (p.benefit || "") + " " +
      (p.howTo || "") + " " +
      (p.categoryLabel || "") + " " +
      (p.tag || "")
    ).toLowerCase();

    /* 키워드 매칭 점수 — 각 키워드 발견시마다 +2 */
    userKeywords.forEach(kw => {
      if (kw && haystack.includes(String(kw).toLowerCase())) {
        score += 2;
      }
    });

    /* 카테고리 가중치 보너스 */
    if (categoryWeights[p.category]) {
      score += categoryWeights[p.category];
    }

    /* 지역 보너스 — 정책 태그와 사용자 거주지 일치 시 가산점 */
    const tagLower = (p.tag || "").toLowerCase();
    if (tagLower.includes("전국")) score += 1; // 전국 정책은 항상 약간의 가산
    if (regionValue === "seoul" && tagLower.includes("서울")) score += 4;
    if (regionValue === "gyeonggi" && tagLower.includes("경기")) score += 4;
    if (regionValue === "incheon" && tagLower.includes("인천")) score += 4;
    if (regionValue === "busan" && tagLower.includes("부산")) score += 4;

    /* 마감 임박 가산점 — 사용자가 놓치지 않도록 */
    const dday = calculateDday(p.applyDeadline);
    if (dday.level === "warning") score += 1;
    if (dday.level === "urgent") score += 2;
    if (dday.level === "expired") score -= 5; // 마감된 건 페널티

    return { policy: p, score };
  });

  /* 점수 내림차순 정렬 + 0점 초과인 것만, 상위 6개 */
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).slice(0, 6).map(s => s.policy);
}

function renderQuizResult() {
  const recommended = calculateQuizResult();

  if (recommended.length === 0) {
    $quizContent.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji">🤔</div>
        <h3 class="quiz-result-title">맞춤 추천이 어려워요</h3>
        <p class="quiz-result-sub">전체 정책에서 직접 둘러보시는 걸 추천드려요!</p>
        <div class="quiz-actions">
          <button id="quizRetryBtn">다시 진단</button>
          <button id="quizBrowseBtn" class="quiz-next">전체 정책 보기</button>
        </div>
      </div>
    `;
  } else {
    const itemsHtml = recommended.map(p =>
      `<div class="quiz-result-item">
        <strong>${escapeHtml(p.categoryLabel)}</strong> · ${escapeHtml(p.title)}
      </div>`
    ).join("");

    $quizContent.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji">🎉</div>
        <h3 class="quiz-result-title">맞춤 정책 ${recommended.length}개 추천!</h3>
        <p class="quiz-result-sub">아래 정책이 회원님께 가장 잘 맞을 것 같아요</p>
        <div class="quiz-result-list">${itemsHtml}</div>
        <div class="quiz-actions">
          <button id="quizRetryBtn">다시 진단</button>
          <button id="quizBrowseBtn" class="quiz-next">사이트에서 보기</button>
        </div>
      </div>
    `;
  }

  /* 결과 화면 버튼들 */
  document.getElementById("quizRetryBtn").addEventListener("click", () => {
    openQuiz(); /* 다시 시작 */
  });
  document.getElementById("quizBrowseBtn").addEventListener("click", () => {
    closeQuiz();
    /* 추천 결과가 있으면 첫 번째 정책의 카테고리로 이동 */
    if (recommended.length > 0) {
      currentCategory = recommended[0].category;
      renderCategories();
      renderPolicies();
      /* 부드럽게 정책 영역으로 스크롤 */
      document.querySelector(".policies-section").scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ---------- 14) 이벤트 리스너 등록 ---------- */
$searchInput.addEventListener("input", handleSearch);

$themeToggleBtn.addEventListener("click", toggleTheme);

$quizOpenBtn.addEventListener("click", openQuiz);
$quizCloseBtn.addEventListener("click", closeQuiz);
$quizPrevBtn.addEventListener("click", goPrevQuizStep);
$quizNextBtn.addEventListener("click", goNextQuizStep);

/* 모달 바깥 클릭 시 닫기 — 모바일/데스크탑 모두 자연스러운 UX */
$quizOverlay.addEventListener("click", (e) => {
  if (e.target === $quizOverlay) closeQuiz();
});

/* ESC 키로 모달 닫기 — 키보드 접근성(keyboard accessibility=키보드 액세서빌러티) */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$quizOverlay.hidden) closeQuiz();
});

/* ---------- 15) 푸터의 데이터 기준일 자동 갱신 ---------- */
/*
  POLICIES 배열에서 가장 최신 lastChecked 시간을 찾아 푸터에 표시.
  → 데이터 신선도를 사용자에게 자동으로 알림.
*/
function updateDataDate() {
  const $dataDate = document.getElementById("dataDate");
  if (!$dataDate) return;
  /* lastChecked가 있는 항목들만 필터 후 가장 최신 것 추출 */
  const checked = POLICIES.filter(p => p.lastChecked).map(p => p.lastChecked);
  if (checked.length === 0) return;
  /* 문자열 정렬(ISO 8601 형식이라 사전순=시간순) */
  checked.sort();
  const latest = checked[checked.length - 1];
  $dataDate.textContent = latest;
}

/* ---------- 16) 처음 페이지 진입 시 한 번 그리기 ---------- */
loadFavorites();
initTheme();
renderCategories();
renderPolicies();
updateDataDate();
