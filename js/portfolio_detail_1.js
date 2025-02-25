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
