export default function selectCityPopup() {
    const navbar = $('.header__navbar').filter(function () {
        return $(this).is(':visible');
    });

    $(document).on('show', '#select-city', function () {
        const popup = $(this);
        let offset = (navbar.outerHeight() + navbar.position().top);
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
