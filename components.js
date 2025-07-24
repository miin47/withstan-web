// 공통 헤더 컴포넌트
const headerComponent = `
<header>
  <div class="header-content width">
    <div class="header-logo">
      <img src="./images/logo.png" alt="logo" />
    </div>
    <nav>
      <ul>
        <li><a href="index.html" id="nav-company">회사 소개</a></li>
      </ul>
    </nav>
  </div>
</header>
`;

// 공통 푸터 컴포넌트
const footerComponent = `
<footer>
  <div class="footer-container">
    <div class="footer-logo-img">
      <img src="./images/footer-logo.png" alt="" />
    </div>
    <div class="footer-text">
      <span>위드스탠</span>
      <span>대표: 현승환</span>
      <span>사업자 등록번호: 680-38-01021</span>
      <span>이메일: ke8354@gmail.com</span>
    </div>
    <div class="footer-text footer-text-2">
      <span>서울특별시 강동구 올림픽로 610, B동 2층 2호(05385)</span>
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

  // 해당 페이지의 네비게이션에 active 클래스 추가
  const activeLink = document.getElementById(activeId);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// DOM 로드 완료 시 컴포넌트 로드
document.addEventListener("DOMContentLoaded", loadComponents);
