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

$(document).ready(function () {
  // Swiper 초기화
  const partnerSwiper = new Swiper('.partner_logos', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    speed: 4000,
    grabCursor: true,
    freeMode: true,
    touchStartPreventDefault: false,
  });

  // 슬라이더의 상태를 저장하는 변수
  let isPlaying = true;

  // 로고 클릭 시 재생/멈춤 토글
  document.querySelector('.partner_logos').addEventListener('click', function (e) {
    e.preventDefault(); // 기본 클릭 동작 방지

    // 토글 로직
    if (isPlaying) {
      partnerSwiper.autoplay.stop(); // 슬라이더 멈춤
      console.log("슬라이더 멈춤");
    } else {
      // autoplay를 완전히 초기화한 후 시작
      partnerSwiper.params.autoplay.disableOnInteraction = false;
      partnerSwiper.autoplay.start(); // 슬라이더 재생
      console.log("슬라이더 재생");
    }

    isPlaying = !isPlaying; // 상태 토글
  });
});



/** 뉴스 - Swiper 및 탭 로직 **/
const tabs = document.querySelectorAll(".news_tab li");
const contents = document.querySelectorAll(".cont");
let swiperInstances = {};

function initSwiper(tabId) {
  // 이미 생성된 Swiper 인스턴스가 있으면 초기화 후 삭제
  if (swiperInstances[tabId]) {
    swiperInstances[tabId].destroy(true, true);
    delete swiperInstances[tabId];
  }

  // Swiper 인스턴스를 새로 생성
  swiperInstances[tabId] = new Swiper(`#${tabId} .mySwiper`, {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 50,
    mousewheel: true,
    loop: true,  // loop: true로 설정
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      dragSize: 15,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  });
}

// 기본적으로 첫 번째 탭 활성화
contents.forEach(content => content.classList.remove("active"));
document.querySelector("#tab1").classList.add("active");
tabs.forEach(tab => tab.classList.remove("is_on"));
document.querySelector(".news_tab li[data-tab='tab1']").classList.add("is_on");

// 첫 번째 탭에 대한 Swiper 초기화
initSwiper("tab1");

// 탭 클릭 시 Swiper 새로 초기화
tabs.forEach(tab => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    const targetTab = e.currentTarget;
    const targetId = targetTab.dataset.tab;

    tabs.forEach(t => t.classList.remove("is_on"));
    targetTab.classList.add("is_on");

    contents.forEach(content => content.classList.remove("active"));
    document.querySelector(`#${targetId}`).classList.add("active");

    // 해당 탭에 대한 Swiper 초기화
    initSwiper(targetId);
  });
});


// 지도
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".menu li a"); // 모든 탭 버튼
  const contents = document.querySelectorAll(".Directions_cont"); // 모든 탭 내용

  // 첫 번째 탭이 활성화되도록 설정
  tabs[0].parentElement.classList.add("is_on");
  contents[0].classList.add("active");

  // 탭 클릭 이벤트 처리
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault(); // a 태그 기본 동작 방지

      // 모든 탭 버튼과 내용 초기화
      tabs.forEach(t => t.parentElement.classList.remove("is_on"));
      contents.forEach(c => c.classList.remove("active"));

      // 클릭된 탭 활성화
      this.parentElement.classList.add("is_on");
      contents[index].classList.add("active");

      // 지도 리로드 (안 보이는 상태에서 생성되면 깨질 수 있으므로)
      setTimeout(() => {
        const iframe = contents[index].querySelector("iframe");
        iframe.src = iframe.src; // 리로드
      }, 100);
    });
  });

  // 최초 로드 시 첫 번째 지도를 강제로 리로드
  setTimeout(() => {
    const firstIframe = contents[0].querySelector("iframe");
    firstIframe.src = firstIframe.src;
  }, 100);
});


