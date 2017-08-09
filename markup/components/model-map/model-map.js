export default function modelMap() {
    $('.model-map').parents('.popup')
        .on('show', function() {
            const header = $('.header');
            const el = $(this);

            header
                .css('z-index', +el.css('z-index') + 1)
                .addClass('no-shadow');
            el
                .find('.popup__wrapper')
                .css({
                    'padding-top': header.outerHeight(),
                    'padding-bottom': 0,
                });
        });
}
