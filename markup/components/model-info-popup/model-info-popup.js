export default function modelInfoPopup() {
    $(document).on('click', '.model-info-popup .close', function(e) {
        e.preventDefault();

        $(this)
            .parents('.model-info-popup')
            .fadeOut(250, function() {
                $(this).removeClass('model-info-popup_left model-info-popup_right')
            });
    });
}
