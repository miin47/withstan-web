// 다국어 사전 (헤더/푸터 공용)
const i18n = {
  ko: {
    navAbout: "회사 소개",
    navServices: "서비스",
    footerCompany: "위드스탠",
    footerCeo: "대표: 현승환",
    footerBiz: "사업자 등록번호: 680-38-01021",
    footerEmail: "이메일: ke8354@gmail.com",
    footerAddress: "서울특별시 종로구 동숭길 112-6, 3층 306호(03084)",
    footerCopy: "COPYRIGHT 2024 withstan. ALL RESERVED",
  },
  en: {
    navAbout: "About",
    navServices: "Services",
    footerCompany: "Withstan",
    footerCeo: "CEO: Seunghwan Hyun",
    footerBiz: "Business Reg. No.: 680-38-01021",
    footerEmail: "Email: ke8354@gmail.com",
    footerAddress: "306, 3F, 112-6 Dongsung-gil, Jongno-gu, Seoul, Korea (03084)",
    footerCopy: "COPYRIGHT 2024 withstan. ALL RESERVED",
  },
  es: {
    navAbout: "Nosotros",
    navServices: "Servicios",
    footerCompany: "Withstan",
    footerCeo: "CEO: Seunghwan Hyun",
    footerBiz: "N.º de registro: 680-38-01021",
    footerEmail: "Correo: ke8354@gmail.com",
    footerAddress: "306, 3F, 112-6 Dongsung-gil, Jongno-gu, Seúl, Corea (03084)",
    footerCopy: "COPYRIGHT 2024 withstan. ALL RESERVED",
  },
  pt: {
    navAbout: "Sobre",
    navServices: "Serviços",
    footerCompany: "Withstan",
    footerCeo: "CEO: Seunghwan Hyun",
    footerBiz: "Reg. nº: 680-38-01021",
    footerEmail: "E-mail: ke8354@gmail.com",
    footerAddress: "306, 3F, 112-6 Dongsung-gil, Jongno-gu, Seul, Coreia (03084)",
    footerCopy: "COPYRIGHT 2024 withstan. ALL RESERVED",
  },
};

// 현재 페이지의 언어 감지 (/dearus/{lang}/ 형태일 때만)
function detectLang() {
  const m = window.location.pathname.match(/\/dearus\/(en|ko|es|pt)(\/|$)/);
  return m ? m[1] : "ko";
}

// dearus 다국어 페이지인지 여부
function isDearusLocalizedPage() {
  return /\/dearus\/(en|ko|es|pt)(\/|$)/.test(window.location.pathname);
}

// 헤더 빌더
function buildHeader(lang) {
  const t = i18n[lang] || i18n.ko;
  const showSwitcher = isDearusLocalizedPage();
  const langs = ["en", "ko", "es", "pt"];
  const langItems = langs
    .map(
      (l) =>
        `<a href="/dearus/${l}/" class="lang-item${l === lang ? " active" : ""}">${l.toUpperCase()}</a>`
    )
    .join("");
  const switcher = showSwitcher
    ? `<li class="lang-switcher">
        <button type="button" class="lang-toggle" aria-haspopup="true" aria-expanded="false">
          <span class="lang-current">${lang.toUpperCase()}</span><span class="lang-caret">▾</span>
        </button>
        <div class="lang-menu">${langItems}</div>
      </li>`
    : "";

  return `
<header>
  <div class="header-content width">
    <div class="header-logo">
      <a href="#" id="logo-link">
        <img src="/images/withstan/logo.png" alt="withstan-logo" />
      </a>
    </div>
    <nav>
      <ul>
        <li><a href="/index.html" id="nav-company">${t.navAbout}</a></li>
        <li class="dropdown">
          <a href="#" id="nav-services">${t.navServices}</a>
          <div class="dropdown-menu">
            <div class="menu-container">
              <div class="menu-item">
                <a href="/duckmate.html" id="nav-duckmate">DuckMate</a>
              </div>
              <div class="menu-item">
                <a href="/mercadoseguro.html" id="nav-mercadoseguro">Mercado Seguro</a>
              </div>
              <div class="menu-item">
                <a href="/dearus/${lang}/" id="nav-dearus">Dear Us</a>
              </div>
            </div>
          </div>
        </li>
        ${switcher}
      </ul>
    </nav>
  </div>
</header>
`;
}

// 푸터 빌더
function buildFooter(lang) {
  const t = i18n[lang] || i18n.ko;
  return `
<footer>
  <div class="footer-container">
    <div class="footer-text">
      <span>${t.footerCompany}</span>
      <span>${t.footerCeo}</span>
      <span>${t.footerBiz}</span>
      <span>${t.footerEmail}</span>
    </div>
    <div class="footer-text footer-text-2">
      <span>${t.footerAddress}</span>
    </div>
    <div class="footer-text footer-text-3">
      <span>${t.footerCopy}</span>
    </div>
  </div>
</footer>
`;
}

// 컴포넌트 로드 함수
function loadComponents() {
  const lang = detectLang();

  // 헤더 로드
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = buildHeader(lang);
  }

  // 푸터 로드
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = buildFooter(lang);
  }
}

// active 상태 설정 함수
function setActiveNavigation(activeId) {
  // 모든 네비게이션 링크에서 active 클래스 제거
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelectorAll("nav ul li").forEach((li) => {
    li.classList.remove("active");
  });

  // 해당 페이지의 네비게이션에 active 클래스 추가
  const activeLink = document.getElementById(activeId);
  if (activeLink) {
    activeLink.classList.add("active");

    // 드롭다운 메뉴 아이템인 경우 부모 서비스 탭도 active로 설정
    if (activeId === "nav-duckmate" || activeId === "nav-mercadoseguro" || activeId === "nav-dearus") {
      const servicesTab = document.getElementById("nav-services");
      const servicesParent = servicesTab?.parentElement;
      if (servicesTab && servicesParent) {
        servicesTab.classList.add("active");
        servicesParent.classList.add("active");
      }
    }
  }
}

// 언어 스위처 드롭다운 토글
function setupLangSwitcher() {
  const wrapper = document.querySelector(".lang-switcher");
  if (!wrapper) return;
  const toggle = wrapper.querySelector(".lang-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// 드롭다운 블러 효과를 위한 이벤트 리스너
function setupDropdownBlur() {
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    dropdown.addEventListener("mouseenter", () => {
      document.body.classList.add("dropdown-active");
    });

    dropdown.addEventListener("mouseleave", () => {
      document.body.classList.remove("dropdown-active");
    });
  }
}

// 로고 클릭 이벤트 설정
function setupLogoClick() {
  const logoLink = document.getElementById("logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();

      // 현재 페이지가 index.html인지 확인
      const currentPath = window.location.pathname;
      const isIndexPage =
        currentPath.endsWith("index.html") || currentPath === "/" || currentPath === "";

      if (isIndexPage) {
        // index 페이지라면 맨 위로 스크롤
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // 다른 페이지라면 index로 이동
        window.location.href = "/index.html";
      }
    });
  }
}

// DOM 로드 완료 시 컴포넌트 로드 및 이벤트 설정
document.addEventListener("DOMContentLoaded", function () {
  loadComponents();
  // 컴포넌트 로드 후 이벤트 설정
  setTimeout(setupDropdownBlur, 10);
  setTimeout(setupLogoClick, 10);
  setTimeout(setupLangSwitcher, 10);
});
