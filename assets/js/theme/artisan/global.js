import $ from 'jquery';
import hoverintent from 'hoverintent';

export default function loaded(stickyNavEnabled) {
    navCols();
    formatCols();
    touchExpand();
    stickyNav(stickyNavEnabled);
    initHoverIntent();
    bindMiscEvents();

    let resizeTimer;
    $(window).on('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            formatCols();
            touchExpand();
            stickyNav(stickyNavEnabled);
        }, 500);
    });

    window.addEventListener('orientationchange', () => {
        formatCols();
        touchExpand();
        stickyNav(stickyNavEnabled);
    }, false);
}

function windowWidth() {
    let winWidth = window.innerWidth;
    if (Number.isNaN(winWidth)) winWidth = document.body.clientWidth;

    return winWidth;
}


// navigation show on hover functionality
function touchExpand() {
    $('.navPages-mainNav .navPages-action').unbind('click');
    $('.navPages-mainNav .navPages-action-moreIcon').unbind('click');

    if (windowWidth() > 800) {
        $('#menu .link-expanded').removeClass('link-expanded');
        $('#menu .is-open').removeClass('is-open');
    }

    if (windowWidth() <= 800) {
        $('.navPages-item > .navPages-action.has-subMenu').on('click', function mobileExpand(event) {
            event.preventDefault();
            $(this).parents('li:first').toggleClass('link-expanded');
        });

        $('.navPage-subMenu-item.has-children:not(.mobile-shopAll)').on('click', function expandGroup() {
            event.preventDefault();
            const children = $(this).nextUntil($('.navPage-subMenu-item'), 'li');
            $(this).toggleClass('is-open');
            children.toggleClass('is-open');
        });
    }
}

function stickyNav(stickyNavEnabled) {
    if (windowWidth() > 800 && stickyNavEnabled) {
        // reset styles from mobile
        $('.navUser').css('height', 'auto');
        $('body').css('padding-top', '0');
        $('body').css('margin-top', '0');

        stickyNavDesktop();
    }

    if (windowWidth() <= 800) {
        // reset styles from desktop
        $('.navPages-container').removeClass('sticky');
        $('.navPages-container').css('top', '0');
        $('header.header').css('margin-bottom', '0');

        stickyNavMobile();
    }
}

function stickyNavDesktop() {
    const navigation = $('.navPages-container');
    const navigationOffsetTop = navigation.offset().top;
    const navigationHeight = $('.navPages-container').height();

    function calcStickyDesktop() {
        const adminBarHeight = $('.adminBar').length > 0 ? $('.adminBar').height() : 0;
        const pageOffset = $(window).scrollTop();

        if (pageOffset > (navigationOffsetTop - adminBarHeight)) {
            navigation.addClass('sticky');
            navigation.css('top', `${adminBarHeight}px`);
            $('header.header').css('margin-bottom', `${navigationHeight}px`);
        } else {
            navigation.removeClass('sticky');
            navigation.css('top', '0');
            $('header.header').css('margin-bottom', '0');
        }
    }

    calcStickyDesktop();

    $(window).unbind('scroll');
    $(window).bind('scroll', () => {
        calcStickyDesktop();
    });
}

function stickyNavMobile() {
    const logoHeight = $('.header-logo').outerHeight();

    $('body').css('padding-top', `${logoHeight}px`);
    $('body').css('margin-top', '0');
    
    // align header icons
    $('.mobileMenu-toggle').css('height', `${logoHeight}px`);
    $('.navUser').css('height', `${logoHeight}px`);
    
    mobileHeaderScroll();
    toggleSearchMobile();
    
    $(window).unbind('scroll');
    $(window).bind('scroll', () => {
        mobileHeaderScroll();
    });
}

// header compress on scroll mobile
function mobileHeaderScroll() {
    const headerNoNavHeight = $('.header-logo').outerHeight(true);
    const searchHeight = $('.quickSearchWrap').outerHeight(true);
    const mobileHeaderHeight = headerNoNavHeight + searchHeight;
    const pageOffset = $(window).scrollTop();

    if (pageOffset > mobileHeaderHeight) {
        if (!$('.quickSearchWrap .form-input').is(':focus')){
            if (!$('.header-logo--wrap').hasClass('slim')) {
                $('.header-logo--wrap').addClass('slim');
            }
            $('body').css('padding-top', `${mobileHeaderHeight - searchHeight}px`);
            $('.navUser-item--mobile-search').css('top', '0');
        }
    }

    if (pageOffset === 0) {
        if ($('.header-logo--wrap').hasClass('slim')) {
            $('.header-logo--wrap').removeClass('slim');
        }
        $('body').css('padding-top', `${mobileHeaderHeight}px`);
        $('.navUser-item--mobile-search').css('top', `-${headerNoNavHeight}px`);
    }
}

function toggleSearchMobile() {
    const headerNoNavHeight = $('.header-logo').outerHeight(true);
    const searchHeight = $('.quickSearchWrap').outerHeight(true);
    const mobileHeaderHeight = headerNoNavHeight + searchHeight;

    $('.navUser-item--mobile-search').on('click', () => {
        if ($('.header-logo--wrap').hasClass('slim')) {
            $('.header-logo--wrap').removeClass('slim');
            $('body').css('padding-top', `${mobileHeaderHeight}px`);
            $('.navUser-item--mobile-search').css('top', `-${headerNoNavHeight}px`);
        } else {
            $('.header-logo--wrap').addClass('slim');
            $('body').css('padding-top', `${mobileHeaderHeight - searchHeight}px`);
        }
    });
}


// split nav into columns
function navCols() {
    const numPerColumn = window.theme_settings.linksPerCol;
    const menuColumns = $('.navPages .column-menu');

    menuColumns.each(function splitColumns() {
        const $colmenu = $(this);
        const $lis = $colmenu.find('li');
 
        let colMenuHtml = '<ul>';
        let colMenuCount = 0;

        let colGroup = '';
        let colGroupCount = 0;
        const columnHeaders = $( ".column-header" )
        if ( columnHeaders ) {
            $lis.each(function buildColumn(index) {
                const $li = $(this);
                const $liClass = $li.attr('class');
                const classCheck = $liClass.indexOf('navPage-subMenu-item') >= 0 || $liClass.indexOf('navPage-subMenu-item column-header') >= 0
                if ( classCheck && $liClass.indexOf('mobile-shopAll') < 0) {
    
                    // add group to menu
                    colMenuHtml += colGroup; // add group html to menu
                    colMenuCount += colGroupCount; // link count for the current column
    
                    // start new group
                    colGroup = '';
                    colGroupCount = 0;
                }
    
                // add to group
                colGroup += $liClass.indexOf('navPage-subMenu-item column-header') >= 0 && index > 1 ? `</ul><ul><li class="${$liClass}">${$li.html()}</li>` : `<li class="${$liClass}">${$li.html()}</li>`;
                if ($liClass.indexOf('mobile-shopAll') < 0) {
                    colGroupCount ++;
                }
            });
    
            // add last group to menu
            colMenuHtml += `${colGroup}</ul>`;
        
            $colmenu.html(colMenuHtml);
            return
        }
        $lis.each(function buildColumn() {
            const $li = $(this);
            const $liClass = $li.attr('class');
            const classCheck = $liClass.indexOf('navPage-subMenu-item') >= 0 || $liClass.indexOf('navPage-subMenu-item face-item') >= 0
            if ( classCheck && $liClass.indexOf('mobile-shopAll') < 0) {
                // test if there is room for the group in the current column
                
                const liCount = (colMenuHtml.match(/<li/g) || []).length;
                if (colMenuCount + colGroupCount > numPerColumn && liCount > 1) {
                    // if the group doesn't fit, start a new column
                    colMenuHtml += '</ul><ul>';
                    colMenuCount = 0;
                }

                // add group to menu
                colMenuHtml += colGroup; // add group html to menu
                colMenuCount += colGroupCount; // link count for the current column

                // start new group
                colGroup = '';
                colGroupCount = 0;
            }

            // add to group
            colGroup += `<li class="${$liClass}">${$li.html()}</li>`;
            if ($liClass.indexOf('mobile-shopAll') < 0) {
                colGroupCount ++;
            }
        });

        // add last group to menu
        if (colGroupCount > 0 && (colGroupCount + colMenuCount <= numPerColumn)) {
            colMenuHtml += `${colGroup}</ul>`;
        } else if (colGroupCount > 0 && (colGroupCount + colMenuCount > numPerColumn)) {
            colMenuHtml += `</ul><ul>${colGroup}</ul>`;
        }

        $colmenu.html(colMenuHtml);
    });
}

// set width of dropdowns
function formatCols() {
    const menuColumns = $('.navPages .column-menu');

    if (windowWidth() > 800) {
        const dropdownPadding = Math.round(parseFloat($('.column-menu:first').css('padding-left'))) * 2;
        const navWidth = $('.navPages').width();
        const colWidth = Math.floor((navWidth - dropdownPadding) * 0.2);
        menuColumns.each(function countCols() {
            const cols = $(this).children('ul').length;
            const dropdownWidth = (colWidth * cols + dropdownPadding <= navWidth ? colWidth * cols + dropdownPadding : navWidth) + 2;
            $(this).children('ul').css('flex', `0 0 ${colWidth}px`);
            $(this).css('width', `${dropdownWidth}px`);

            const navOffset = $('.navPages').offset().left;
            const parentOffset = $(this).parent().offset().left - navOffset;
            const spaceAvailable = navWidth - parentOffset;

            if (dropdownWidth > spaceAvailable) {
                const rightBound = dropdownWidth - spaceAvailable;
                $(this).css('left', `-${rightBound}px`);
            }
        });
    } else {
        menuColumns.each(function resetWidths() {
            $(this).children('ul').css('flex', '1 1 auto');
            $(this).css('width', 'auto');
        });
    }
}

function initHoverIntent() {
    const opts = {
        interval: 100,
    };

    const el = $('.navPages-mega .navPages-item');

    for (let i = 0; i < el.length; i++) {
        hoverintent(el[i],
        function hoverIntentOver() {
            $(this).addClass('hover');
        }, function hoverIntentOut() {
            $(this).removeClass('hover');
        }).options(opts);
    }
}

function bindMiscEvents() {
    // navigation
    $('.expandLink').on('click', function toggleActive() { // navigation
        $(this).parent().toggleClass('active');
    });

    $('.mobile-closeNav').on('click', () => { // mobile close nav
        $('header.header > .mobileMenu-toggle').trigger('click');
    });
    
    // quick search
    // hide quick search results when clicked outside of quick search
    $(window).on('click', () => {
        $('.quickSearchWrap .quickSearchResults').hide();
        $('#search_query').val("");
    });

    $('.quickSearchWrap').on('click', '.modal-close', () => {
        $('.quickSearchWrap .quickSearchResults').hide();
    });

    $('.quickSearchWrap').on('click', (event) => {
        event.stopPropagation();
    });

    $('.quickSearchResults').on('click', '.quickSearchAll', () => {
        $('#quickSearch form').submit();
    });

    // show quick search results when focused in search input
    $('.quickSearchWrap input').on('focusin', () => {
        $('.quickSearchWrap .quickSearchResults').show();
    });
    
    // compare functionality
    $('.compare-input').on('change', function checkCompare() {
        const isSelected = $(this).is(':checked');
        const compareLabel = $(this).parent();

        if (isSelected) {
            compareLabel.find('span').hide();
            compareLabel.next().show();
        } else {
            compareLabel.find('span').show();
            compareLabel.next().hide();
        }
    });

    // review anchor link
    $('.productView-reviewLink a').on('click', (event) => {
        event.preventDefault();
        const reviewsOffset = $('#reviews-accordion').offset().top;
        const headerHeight = $('.header-logo--wrap').outerHeight(true);
        $(window).scrollTop(reviewsOffset - headerHeight);
    });

    // footer collapse
    $('.footer-info-dropdown .footer-info-heading').on('click', function toggleFooterBlocks() {
        $(this).parent().toggleClass('is-open');
    });

    // FAQ Accordion functionality
    $('.faq-menu-title').on('click', function() {
       $(this).next('.faq-submenu').slideToggle();
       $(this).find('.faq-toggle-icon').text(function(i, text) {
         return text === "+" ? "-" : "+";
        });
     });
      
    $('.faq-submenu-item').on('click', function() {
        var contentId = $(this).data('target');
        $('.faq-content-section').hide();
        $('#' + contentId).show();
    });
      
}
