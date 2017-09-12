export default function fullPhotoPopup() {
    const getPopup = (src) => $(`
        <div class="popup">
            <div class="popup__wrapper">
                <div class="full-photo-popup">
                    <div class="popup__close popup__close_kind_square">
                        <svg class="popup__close-icon" width="18" height="18">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../svg-symbols.svg#close"></use>
                        </svg>
                    </div>
                    <img src="${src}" class="full-photo-popup__img">
                </div>
            </div>
        </div>
    `).appendTo('body');

    $(document).on('click', '[data-full]', function (e) {
        e.preventDefault();

        const self = $(this);

        getPopup(self.data('full'))
            .on('afterhide', function() {
                $(this).remove();
            })
            .trigger('show');
    });
}
