// 공통 헤더 컴포넌트
const headerComponent = `
<header>
  <div class="header-content width">
    <div class="header-logo">
      <img src="./images/common/logo.png" alt="logo" />
    </div>
    <nav>
      <ul>
        <li><a href="index.html" id="nav-company">회사 소개</a></li>
        <li class="dropdown">
          <a href="#" id="nav-services">서비스</a>
          <div class="dropdown-menu">
            <div class="menu-container">
              <div class="menu-item">
                <a href="duckmate.html" id="nav-duckmate">DuckMate</a>
              </div>
              <div class="menu-item">
                <a href="mercado-seguro.html" id="nav-mercado-seguro">Mercado Seguro</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>
`;

// 공통 푸터 컴포넌트
const footerComponent = `
<footer>
  <div class="footer-container">
    <div class="footer-text">
      <span>위드스탠</span>
      <span>대표: 현승환</span>
      <span>사업자 등록번호: 680-38-01021</span>
      <span>이메일: ke8354@gmail.com</span>
    </div>
    <div class="footer-text footer-text-2">
      <span>서울특별시 종로구 동숭길 112-6, 3층 306호(03084)</span>
    </div>
    <div class="footer-text footer-text-3">
      <span>COPYRIGHT 2024 withstan. ALL RESERVED</span>
    </div>
  </div>
</footer>
`;

// 컴포넌트 로드 함수
function loadComponents() {
  // 헤더 로드
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = headerComponent;
  }

  // 푸터 로드
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = footerComponent;
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
    if (activeId === "nav-duckmate" || activeId === "nav-mercado-seguro") {
      const servicesTab = document.getElementById("nav-services");
      const servicesParent = servicesTab?.parentElement;
      if (servicesTab && servicesParent) {
        servicesTab.classList.add("active");
        servicesParent.classList.add("active");
      }
    }
  }
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

// DOM 로드 완료 시 컴포넌트 로드 및 이벤트 설정
document.addEventListener("DOMContentLoaded", function () {
  loadComponents();
  // 컴포넌트 로드 후 이벤트 설정
  setTimeout(setupDropdownBlur, 10);
});
