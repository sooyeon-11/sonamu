// depth2
$(".gnb> li").mouseenter(function () {
  $(this).find(".depth2").stop().fadeIn();
  $(".depth2_bg").stop().fadeIn();
  $("#header").addClass("active");
});

$(".gnb> li").mouseleave(function () {
  $(this).find(".depth2").stop().fadeOut();
  $(".depth2_bg").stop().fadeOut();
  $("#header").removeClass("active");
});

/* mgnb */
$(".ham").click(function () {
  $(this).toggleClass("active");
  $(".mgnb_wrap").fadeToggle();
  let txt = $(".ham").text();
  // text 메서드는 텍스트를 가져오기도 하지만 변경해주기도 한다
  if (txt == "메뉴보기") {
    // 조건이 만족했을때 실행문 true
    $(".ham").text("메뉴닫기");
  } else {
    // 조건이 만족하지 않았을때 실행문 false
    $(".ham").text("메뉴보기");
  }
});

// mdepth2
$(".mgnb > li").click(function () {
  $(this).find(".mdepth2").stop().slideToggle();
  $(this).siblings().find(".mdepth2").slideUp();

  // 클릭된 li의 a 태그 색상 변경
  $(this).find("> a").css("color", "#F0A550"); // 원하는 색상으로 변경

  // 다른 li 요소들의 a 태그 색상 초기화
  $(this).siblings().find("> a").css("color", "#fff"); // 기본 색상으로 변경
});
