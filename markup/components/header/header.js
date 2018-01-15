export default function header() {
    const header = $('.header');
    const photoTape = header.find('.photo-tape').offset().top;
    const pageWrapper = $('.page__wrapper');
    const hideWhenFixed = $('.hide-when-header-fixed');
    const navigation = $('.header__navbar');

    function headerHeight() {
        if ($(window).width() < 769) {
            return '122px';
        } else if ($(window).width() < 1025) {
            return '150px';
        } else {
            return '176px';
        }
    }

    let fixedPagePadding = headerHeight();
    $(window).on('resize', () => {
       fixedPagePadding = headerHeight();
    });

    if (!header.length) {
        return;
    }

    // toggle mobile search-bar
    const searchBar = header.find('.header__search-bar');

    header.on('click', '.js-header-toggle-search-bar', function (e) {
        e.preventDefault();
        const el = $(this);
        const overlay = $('.page__overlay');
        const isActive = el.hasClass('active');

        if (isActive) {
            overlay.fadeOut();
            el.removeClass('active');
            searchBar.slideUp();
        } else {
            overlay.fadeIn();
            el.addClass('active');
            searchBar.slideDown();
        }
    });

    $(document).on('click', '.page__overlay', () => {
        const el = $('.js-header-toggle-search-bar');
        const overlay = $('.page__overlay');

        if (!el.length || !overlay.length) {
            return;
        }

        overlay.fadeOut();
        el.removeClass('active');
        searchBar.slideUp();
    });

    if (header.hasClass('js-always-fixed')) {
        header.addClass('fixed');
        setTimeout(() => { navigation.addClass('move') }, 250);
        pageWrapper.css('margin-top', fixedPagePadding/*header.outerHeight()*/);
        hideWhenFixed.css({ opacity: 0, 'pointer-events': 'none' });

        return;
    }

    let shouldBeFixed = false;

    $(window).on('scroll', () => {
       const sT = $(window).scrollTop();

       if (header.siblings('.user-nav').length) {
           return;
       }

       if ($(document).find('.popup.active').length) {
           return;
       }

       /*if ($(window).width() > 768) {*/
        shouldBeFixed = sT >= photoTape
       /*} else {
           shouldBeFixed = sT > 0;
       }*/

       if (shouldBeFixed) {
           if (header.hasClass('fixed')) {
               return;
           }

           header.addClass('fixed');
           setTimeout(() => { navigation.addClass('move') }, 50);
           pageWrapper.css('margin-top', fixedPagePadding/*header.outerHeight()*/);
           hideWhenFixed.css({ opacity: 0, 'pointer-events': 'none' });
       } else {
           if (!header.hasClass('fixed')) {
               return;
           }

           header.removeClass('fixed');
           navigation.removeClass('move');
           pageWrapper.css('margin-top', 0);
           hideWhenFixed.css({ opacity: 1, 'pointer-events': 'all' });
       }
    });
}
