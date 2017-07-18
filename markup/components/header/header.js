export default function header() {
    const header = $('.header');
    const photoTape = header.find('.photo-tape').offset().top;
    const pageWrapper = $('.page__wrapper');
    const hideWhenFixed = $('.hide-when-header-fixed');

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

    let shouldBeFixed = false;

    $(window).on('scroll', () => {
       const sT = $(window).scrollTop();

       if ($(document).find('.popup.active').length) {
           return;
       }

       if ($(window).width() > 768) {
           shouldBeFixed = sT >= photoTape
       } else {
           shouldBeFixed = sT > 0;
       }

       if (shouldBeFixed) {
           if (header.hasClass('fixed')) {
               return;
           }

           header.addClass('fixed');
           pageWrapper.css('margin-top', header.outerHeight());
           hideWhenFixed.css({ opacity: 0, 'pointer-events': 'none' });
       } else {
           if (!header.hasClass('fixed')) {
               return;
           }

           header.removeClass('fixed');
           pageWrapper.css('margin-top', 0);
           hideWhenFixed.css({ opacity: 1, 'pointer-events': 'all' });
       }
    });
}
