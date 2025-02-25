document.addEventListener("DOMContentLoaded", function () {
  /* solution-list */
  const solution_list = new Swiper(".solution_list", {
    autoplay: {
      delay: 2500, // 슬라이드가 머무르는 시간, 5000=5초
      disableOnInteraction: false, // 스와이프 후 자동재생이 비활성화 되지 않음
    },
    effect: "fade", // 페이드 효과
    fadeEffect: {
      crossFade: true //fade했때 뒤에 배경 사라짐
    },
    loop: true,
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    on: {
      slideChangeTransitionEnd: function () {
        updateKeywordHighlight();
      },
    },
  });

  function updateKeywordHighlight() {
    // 키워드 리스트와 모든 슬라이드 가져오기
    const keywords = document.querySelectorAll(".keyword li");
    const activeSlides = document.querySelectorAll(".swiper-slide-active"); // 현재 활성화된 슬라이드들

    // 모든 키워드 초기화
    keywords.forEach((keyword) => {
      keyword.classList.remove("active");
    });

    // 현재 활성 슬라이드에서 kind 값 가져와서 해당 키워드 활성화
    activeSlides.forEach((slide) => {
      const kind = slide.querySelector(".kind").textContent.trim();
      keywords.forEach((keyword) => {
        if (keyword.textContent.trim().toUpperCase() === `#${kind}`) {
          keyword.classList.add("active");
        }
      });
    });
  }

  // 초기 설정
  updateKeywordHighlight();
});


/* solution-list */
const corporate_list = new Swiper(".corporate_list", {
  autoplay: {
    delay: 2500, // 슬라이드가 머무르는 시간, 5000=5초
    disableOnInteraction: false, // 스와이프 후 자동재생이 비활성화 되지 않음
  },
  loop: true,
  speed: 1000,
  effect: "fade", // 페이드 효과
  fadeEffect: {
    crossFade: true //fade했때 뒤에 배경 사라짐
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  on: {
    slideChangeTransitionEnd: function () {
      updateKeywordHighlight();
    },
  },
});

// 직접 매칭할 kind -> 키워드 리스트 매핑
const keywordMapping = {
  "반응형": ["#HTML", "#CSS", "#Javascript"],
  "APP": ["#VUE", "#MS-SQL"],
};

function updateKeywordHighlight() {
  const keywords = document.querySelectorAll(".keyword li");
  const activeSlides = document.querySelectorAll(".swiper-slide-active");

  // 모든 키워드 초기화
  keywords.forEach((keyword) => {
    keyword.classList.remove("active");
  });

  // 활성 슬라이드에서 kind 값을 가져와 매핑된 키워드 찾기
  activeSlides.forEach((slide) => {
    const kind = slide.querySelector(".kind").textContent.trim();

    // 여러 개의 키워드가 매핑된 경우, 해당하는 모든 키워드에 active 클래스 추가
    if (keywordMapping[kind]) {
      keywordMapping[kind].forEach((keywordText) => {
        keywords.forEach((keyword) => {
          if (keyword.textContent.trim() === keywordText) {
            keyword.classList.add("active");
          }
        });
      });
    }
  });
}

//tab_contents
$(".tab_btn button").click(function () {
  $(this).addClass("active");
  $(this).siblings().removeClass("active");
  let number = $(this).index();
  $(".tab_contents > div").eq(number).fadeIn().siblings().hide();
});

wow = new WOW({
  boxClass: 'wow',      //  스크롤 이벤트를 등록할 클래스
  animateClass: 'animated', // 기본값 animated => animate.css library 를 적용한다
  offset: 0,          // data-wow-offset 의 기본값 0
  mobile: true,       // 모바일에서 동작할 것인지
  live: true        // 새로 추가되는 요소 확인하여 동작
})

new WOW().init();

