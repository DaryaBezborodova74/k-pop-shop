const swiperCard = new Swiper('.swiper-card', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  });

  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  
  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

  // var galleryTop = new Swiper(".product__galery-wrap", {
  //   spaceBetween: 10,
  //   thumbs: {
  //     swiper: galleryThumbs
  //   }
  // });
  // var galleryThumbs = new Swiper(".product__thumbs", {
  //   spaceBetween: 10,
  //   slidesPerView: 4,
  //   direction:'vertical',
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   }
  // });