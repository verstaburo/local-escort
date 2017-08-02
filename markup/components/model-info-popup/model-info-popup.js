export default function modelInfoPopup() {
    $(document).on('click', '.model-info-popup .close', function(e) {
        e.preventDefault();

        $(this)
            .parents('.model-info-popup')
            .fadeOut();
    });
}
