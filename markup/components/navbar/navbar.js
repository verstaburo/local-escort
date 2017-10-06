export default function navbar() {
    $(document)
        .on('click', '.navbar__item_dropdown', function (e) {
            e.stopPropagation();

            const self = $(this);
            const dropdown = self.find('.navbar__dropdown');
            const isActive = self.hasClass('active');

            if (isActive) {
                self.removeClass('active');
                dropdown.removeClass('active');
            } else {
                $('.js-toggle-popup.active').not('[data-popup-id="#model-map"]').click();
                $('.navbar__item_dropdown').not(self).removeClass('active');
                $('.navbar__dropdown').not(dropdown).removeClass('active');
                self.addClass('active');
                dropdown.addClass('active');
            }
    })
    .on('click', () => {
        $('.navbar__item_dropdown').removeClass('active');
        $('.navbar__dropdown').removeClass('active');
    });
}
