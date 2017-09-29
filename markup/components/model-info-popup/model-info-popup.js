export default function modelInfoPopup() {
    $(document).on('click', '.model-info-popup', function(e) {
        e.stopPropagation();
        const clickTarget = e.target

        if ($(clickTarget).hasClass('close')) {
            $(clickTarget)
                .parents('.model-info-popup').removeClass('active model-info-popup_left model-info-popup_right');
        }
        $('.photo-tape__link.active').removeClass('active');
    });

    $(document).on('mouseleave', '.model-info-popup.active', function(e) {
        $(this).removeClass('active model-info-popup_left model-info-popup_right');
        $('.photo-tape__link.active').removeClass('active');
    });

    $(window).on('scroll', function(e) {
        $('.photo-tape__link.active').removeClass('active');
        $('.model-info-popup.active').removeClass('active model-info-popup_left model-info-popup_right');
    });
}
