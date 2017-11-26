var timer;

export default function addInput() {

    $('.js-currency-input').on('input', function () {
        const self = $(this);

        self.val(self.val().replace(/[^\d+]/g, ''));

        timer = setTimeout(() => {

            clearTimeout(timer);
            const currency = self.prop('placeholder').indexOf('$') !== -1 ? '$' : '€';

            if (!self.val().length) {
                return;
            }

            self.val(self.val().replace(/[^\d+]/g, '') + ` ${currency}`);
        }, 500);
    });
}
