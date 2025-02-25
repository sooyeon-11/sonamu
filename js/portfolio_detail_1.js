const ui_screen_gallery = new Swiper('.ui_screen_gallery', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    loop: false, /* 무한반복 안함 */

    /* Pagination */
    pagination: {
        el: '.ui_screen .swiper-pagination',
        clickable: true
    },

});

 

/* === 프로젝트 갤러리 썸네일 랜덤 배치 ==== */
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelector('.portfolio_item');
  const items = Array.from(gallery.children);

  // Fisher-Yates 알고리즘으로 랜덤 섞기
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  // 기존 썸네일 제거 및 섞인 썸네일 추가
  gallery.innerHTML = '';
  items.forEach(item => gallery.appendChild(item));

  // 반응형으로 보이는 아이템 개수 조정
  function adjustGalleryItems() {
    const screenWidth = window.innerWidth;
    let visibleItems = 3; // 기본값

    if (screenWidth <= 500) {
      visibleItems = 1;
    } else if (screenWidth <= 739) {
      visibleItems = 2;
    }

    // 모든 아이템 숨기기
    items.forEach(item => item.style.display = 'none');

    // 보일 아이템만 표시
    items.slice(0, visibleItems).forEach(item => item.style.display = 'block');
  }

  // 초기 호출 및 리사이즈 이벤트 등록
  adjustGalleryItems();
  window.addEventListener('resize', adjustGalleryItems);
});
