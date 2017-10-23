export default function selectCityPopup() {
    const popup = $('#select-city');

    if (!popup.length) {
        return;
    }

    const navbar = $('.header__navbar').filter(function() {
        return $(this).is(':visible');
    });

    popup.on('show', () => {
        let offset = navbar.outerHeight() + navbar.offset().top;
        const userNav = $('.user-nav');

        if (userNav.length && userNav.hasClass('fixed')) {
            offset = userNav.outerHeight();
        }

        popup
           .css('top', `${offset}px`)
           .find('.popup__wrapper')
           .css('height', $(window).height() - offset)
    });
}
