const swiperCard = new Swiper('.swiper-card', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPreView: 'auto',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
    // // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
  });