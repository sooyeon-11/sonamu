wow = new WOW({
  boxClass: 'wow',      //  스크롤 이벤트를 등록할 클래스 
  animateClass: 'animated', // 기본값 animated => animate.css library 를 적용한다 
  offset: 0,          // data-wow-offset 의 기본값 0 
  mobile: true,       // 모바일에서 동작할 것인지 
  live: true        // 새로 추가되는 요소 확인하여 동작 
})
wow.init();
