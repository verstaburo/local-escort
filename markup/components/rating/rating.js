export default function rating() {
    $(document)
        .on('click', () => {
            $('.rating').removeClass('active');
        })
        .on('click', '.rating', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const self = $(this);

            if (!self.find('.rating__dropdown').length) {
                return;
            }

            self.toggleClass('active');
        });
}
