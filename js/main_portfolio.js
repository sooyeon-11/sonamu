document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".flex-slide");
  let fixedSlide = slides[0]; // 첫 번째 슬라이드가 기본 고정

  // 페이지 로딩 시 첫 번째 슬라이드가 펼쳐진 상태로 시작 (배경과 타이틀을 제외한 나머지 부분을 설정)
  slides[0].classList.add("hover");
  slides[0].classList.add("fixed");

  // 마우스 호버 시와 마우스를 벗어날 때 동작
  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", function () {
      // 첫 번째 슬라이드가 고정되어 있으면 고정 해제
      if (fixedSlide !== this) {
        fixedSlide.classList.remove("fixed");
        this.classList.add("fixed");
        fixedSlide = this; // 현재 고정된 슬라이드 업데이트
      }

      // 호버된 슬라이드는 hover 상태로 유지
      slides.forEach((s) => s.classList.remove("hover"));
      this.classList.add("hover");
    });

    slide.addEventListener("mouseleave", function () {
      // 호버를 벗어나면 고정된 슬라이드는 고정 상태 유지
      if (fixedSlide === this) {
        this.classList.add("fixed");
      }
      // 호버된 슬라이드는 hover 상태 제거
      this.classList.remove("hover");
    });
  });

  // 650px 이하에서 첫 번째 슬라이드에 'hover'와 'fixed' 클래스를 추가
  if (window.innerWidth <= 650) {
    if (slides.length > 0) {
      slides[0].classList.add("hover");
      slides[0].classList.add("fixed");
    }
  }
});




//뉴스
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".news_tab li");
  const contents = document.querySelectorAll(".cont");
  let swiperInstances = {}; // 각 탭의 Swiper 인스턴스를 저장할 객체

  // 탭 초기화 및 Swiper 초기화
  function initSwiper(tabId) {
    // 기존 Swiper 인스턴스가 있다면 삭제
    if (swiperInstances[tabId]) {
       swiperInstances[tabId].destroy(true, true);
       delete swiperInstances[tabId];
    }
 
    // 새 Swiper 인스턴스 생성
    swiperInstances[tabId] = new Swiper(`#${tabId} .mySwiper`, {
       direction: "vertical", 
       slidesPerView: 3, 
       spaceBetween: 30, 
       mousewheel: true, 
       loop: true,
       pagination: {
          el: ".swiper-pagination",
          clickable: true, 
       },
       breakpoints: {
          768: {
             slidesPerView: 1,
          },
          1024: {
             slidesPerView: 2
          },
       },
    });
 }

  // 첫 번째 탭을 기본적으로 활성화하고 Swiper 초기화
  contents.forEach((content) => content.classList.remove("active"));
  document.querySelector("#tab1").classList.add("active");
  initSwiper("tab1"); // 첫 번째 Swiper 초기화

  // 탭 클릭 이벤트
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
       e.preventDefault();
       
       let targetTab = e.target.closest("li"); // 부모 li 요소 찾기
       if (!targetTab) return;
 
       const targetId = targetTab.dataset.tab;
 
       // 모든 탭 비활성화
       tabs.forEach((t) => t.classList.remove("is_on"));
       targetTab.classList.add("is_on");
 
       // 모든 컨텐츠 숨기기
       contents.forEach((content) => content.classList.remove("active"));
 
       // 선택한 탭 활성화
       document.querySelector(`#${targetId}`).classList.add("active");
 
       // Swiper 다시 초기화
       initSwiper(targetId);
    });
 });
 const swiper = new Swiper('.mySwiper', {
  direction: 'vertical',
  slidesPerView: 1,
  spaceBetween: 20,
  mousewheel: true,
  pagination: false, 
  on: {
    slideChangeTransitionEnd: function () {
      const totalSlides = this.slides.length;
      const currentSlide = this.realIndex;

      // 점 이동 비율 계산
      const progress = (currentSlide / (totalSlides - 1)) * 100;
      document.querySelector('.swiper-pagination-dot').style.top = progress + '%';
    },
  },
});
});
