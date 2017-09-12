export default function userNav() {
    const block = $('.user-nav');
    const pageWrapper = $('.page__wrapper');

    if (!block.length) {
        return;
    }


    const offsetTop = block.offset().top;

    $(window).on('scroll', () => {
       const sT = $(window).scrollTop();
       const isFixed = block.hasClass('fixed');

       if (sT >= offsetTop && !isFixed) {
           block.addClass('fixed');
           pageWrapper.css('margin-top', block.outerHeight());
       }

       if (sT < offsetTop && isFixed) {
           block.removeClass('fixed');
           pageWrapper.css('margin-top', '');
       }
    });
}
