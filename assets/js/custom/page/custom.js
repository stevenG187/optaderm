
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

//PRODUCT TITLE
document.addEventListener("DOMContentLoaded", () => {
    function removeBrandFromTitle(containerSelector, brandSelector, titleSelector) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const brandElement = container.querySelector(brandSelector);
            const titleElement = container.querySelector(titleSelector);
            if (brandElement && titleElement) {
                const brandText = brandElement.textContent.trim().toLowerCase();
                let fullTitle = titleElement.textContent.trim();

                if (fullTitle.toLowerCase().startsWith(brandText)) {
                    fullTitle = fullTitle.slice(brandText.length).trim();
                }

                fullTitle = fullTitle.replace(/^[^a-zA-Z0-9\s]+/, '');
                titleElement.textContent = fullTitle;
            }
        });
    }

    removeBrandFromTitle('.card-body', '.card-text', '.card-title');
    removeBrandFromTitle('.productView-product', '.productView-brand span', '.productView-title');
});

// Function to fetch, sort, and return blog tags dynamically
function fetchAndSortBlogTags() {
    const tagElements = document.querySelectorAll('.blog-sec3 .blog-tag a');
    const tags = Array.from(tagElements).map(tagElement => ({
        name: tagElement.textContent.trim(),
        url: tagElement.href,
    }));
    // Remove duplicates and sort alphabetically
    return [...new Map(tags.map(tag => [tag.name, tag])).values()]
        .sort((a, b) => a.name.localeCompare(b.name));
}

// Function to create a list item for a tag
function createTagListItem(tag) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${tag.url}">${tag.name}</a>`;
    return li;
}

// Function to display tags
function displayTags(tags) {
    const tagList = document.querySelector(".blog-tag-list");

    // Early exit if no .blog-tag-list element exists
    if (!tagList) {
        return;
    }

    tagList.innerHTML = ""; // Clear existing tags
    const fragment = document.createDocumentFragment();

    // Display the first 3 tags
    tags.slice(0, 3).forEach(tag => {
        fragment.appendChild(createTagListItem(tag));
    });

    // Add "More..." link if there are remaining tags
    if (tags.length > 3) {
        const moreLi = document.createElement("li");
        moreLi.innerHTML = `<a href="#" class="more-link">More...</a>`;
        fragment.appendChild(moreLi);

        // Add click event listener to reveal all tags
        moreLi.addEventListener("click", event => {
            event.preventDefault();
            tagList.innerHTML = ""; // Clear current list
            const allTagsFragment = document.createDocumentFragment();
            tags.forEach(tag => {
                allTagsFragment.appendChild(createTagListItem(tag));
            });
            tagList.appendChild(allTagsFragment);
        });
    }

    tagList.appendChild(fragment);
}

// Fetch, sort, and display tags
const tags = fetchAndSortBlogTags();
displayTags(tags);
