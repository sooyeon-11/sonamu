/*kf_slide  */
const kf_slide = new Swiper(".kf_slide", {
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
    type: "progressbar",
    clickable: true,
  },

  //spaceBetween: 40,

});

wow = new WOW({
  boxClass: 'wow',      //  스크롤 이벤트를 등록할 클래스 
  animateClass: 'animated', // 기본값 animated => animate.css library 를 적용한다 
  offset: 0,          // data-wow-offset 의 기본값 0 
  mobile: true,       // 모바일에서 동작할 것인지 
  live: true        // 새로 추가되는 요소 확인하여 동작 
})
wow.init();
