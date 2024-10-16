jQuery(function ($) {
    $(document).ready(function () {
        $('.category-slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrow: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            nextArrow: '<div class="arrow-next"><img src="https://cdn11.bigcommerce.com/s-itukv01ojg/images/stencil/original/image-manager/next-arrow.png?t=1729067587" alt-"Arrow"></div>',
            prevArrow: '<div class="arrow-prev"><img src="https://cdn11.bigcommerce.com/s-itukv01ojg/images/stencil/original/image-manager/prev-arrow.png?t=1729067588" alt-"Arrow"></div>',
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2
                  }
                }
            ]
        }); 
        
        function initSlick() {
            if ($(window).width() < 768) {
                if (!$('.hp-section6 .col-3').hasClass('slick-initialized')) {
                    $('.hp-section6 .col-3').slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrow: true,
                        dots: false,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        nextArrow: '<div class="arrow-next"><img src="https://cdn11.bigcommerce.com/s-itukv01ojg/images/stencil/original/image-manager/next-arrow-dark.png?t=1729075424" alt-"Arrow"></div>',
                        prevArrow: '<div class="arrow-prev"><img src="https://cdn11.bigcommerce.com/s-itukv01ojg/images/stencil/original/image-manager/prev-arrow-dark.png?t=1729075424" alt-"Arrow"></div>',
                    });
                }
            } else {
                if ($('.hp-section6 .col-3').hasClass('slick-initialized')) {
                    $('.hp-section6 .col-3').slick('unslick');
                }
            }
        }
        initSlick();
        $(window).resize(function() {
            initSlick();
        });

    });
})