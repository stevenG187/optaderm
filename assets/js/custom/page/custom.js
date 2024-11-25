
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

        $('.testimonial-slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrow: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            nextArrow: '<div class="arrow-next"><img src="https://cdn11.bigcommerce.com/s-itukv01ojg/images/stencil/original/image-manager/next-arrow-dark.png?t=1729075424" alt-"Arrow"></div>',
            prevArrow: '<div class="arrow-prev"><img src="https://cdn11.bigcommerce.com/s-itukv01ojg/images/stencil/original/image-manager/prev-arrow-dark.png?t=1729075424" alt-"Arrow"></div>',
        }); 

        $('.header.transparent').hover(
            function() {
                $(this).addClass('dark-header');
            },
            function() {
                $(this).removeClass('dark-header');
            }
        );
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.titleWrapper').forEach(function(titleWrapper) {
        titleWrapper.addEventListener('click', function() {
            var toggle = this.nextElementSibling;

            if (toggle) {
                toggle.style.transition = 'max-height 0.6s ease';
                if (toggle.style.maxHeight) {
                    toggle.style.maxHeight = null;
                } else {
                    toggle.style.maxHeight = toggle.scrollHeight + "px";
                }
            }
        });
    });

    document.querySelectorAll('.inactive').forEach(function(inactive) {
        inactive.addEventListener('click', function() {
            this.classList.toggle('inactive');
            this.classList.toggle('active');
        });
    });
});

//SEE ALL BUTTON
document.addEventListener("DOMContentLoaded", function() {
    const seeMoreSection = document.querySelector(".see-more-our-team");
    const seeAllButton = document.querySelector(".see-all");

    if ( seeAllButton ) {
    seeAllButton.addEventListener("click", function() {
        const sectionHeight = seeMoreSection.scrollHeight;
        seeMoreSection.style.maxHeight = sectionHeight + 'px';
        seeAllButton.style.display = "none";
    });
}    if ( seeMoreSection ) {
    seeMoreSection.style.maxHeight = '0px';
}
});

document.addEventListener("DOMContentLoaded", () => {
    function removeBrandFromTitle(containerSelector, brandSelector, titleSelector) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const brandElement = container.querySelector(brandSelector);
            const titleElement = container.querySelector(titleSelector);
            if (brandElement && titleElement) {
                const brandText = brandElement.textContent.trim().toLowerCase();
                const fullTitle = titleElement.textContent.trim();
                if (fullTitle.toLowerCase().startsWith(brandText)) {
                    titleElement.textContent = fullTitle.slice(brandText.length).trim();
                }
            }
        });
    }
    removeBrandFromTitle('.card-body', '.card-text', '.card-title');
    removeBrandFromTitle('.productView-product', '.productView-brand span', '.productView-title');
});

