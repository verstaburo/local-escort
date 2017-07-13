export default function selectCityPopup() {
    const popup = $('#select-city');

    if (!popup.length) {
        return;
    }

    const navbar = $('.header__navbar').filter(function() {
        return $(this).is(':visible');
    });

    popup.on('show', () => {
       const offset = navbar.outerHeight() + navbar.offset().top;

       popup
           .css('top', `${offset}px`)
           .find('.popup__wrapper')
           .css('height', $(window).height() - offset)
    });
}
