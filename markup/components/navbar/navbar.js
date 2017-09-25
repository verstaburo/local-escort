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
                self.addClass('active');
                dropdown.addClass('active');
            }
    })
    .on('click', () => {
        $('.navbar__item_dropdown').removeClass('active');
        $('.navbar__dropdown').removeClass('active');
    });
}
