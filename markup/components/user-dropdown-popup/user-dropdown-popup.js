export default function userDropdownPopup() {
    const popup = $('#user-dropdown-popup');

    if (!popup.length) {
        return;
    }

    popup.on('aftershow', () => {
        const navbar = $('.header__navbar_mobile');
        const offset = navbar.outerHeight() + navbar.offset().top;

        console.log($('html').offset().top);
        popup
            .css('top', `${offset}px`)
            .find('.popup__wrapper')
            .css('height', $(window).height() - offset)
    });
}

$(window).on('resize', function() {
   if ($(window).width() > 1024) {
       $('#user-dropdown-popup').trigger('hide');
   }
});
