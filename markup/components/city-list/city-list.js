export default function cityList() {
    const block = $('.city-list');

    if (!block.length) {
        return;
    }

    block.on('submit', function(e) {
        e.preventDefault();
        const val = $(this).serializeArray()[0].value;

        $('.js-change-city').each(function() {
            const self = $(this);

            if (self.prop('tagName') === 'INPUT') {
                self.val(val);
            } else {
                self.text(val);
            }
        });

        try {
            sessionStorage.setItem('selectedCity', val);
        } catch (err) {}

        $(this).parents('.popup').trigger('hide');
    });
}
