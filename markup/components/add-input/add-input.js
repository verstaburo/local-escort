window.addInputTimer;

export default function addInput() {

    $('.add-input__control').on('input', function () {
        const self = $(this);

        self.val(self.val().replace(/[^\d+]/g, ''));

        window.addInputTimer = setTimeout(() => {
            clearTimeout(window.addInputTimer);
            const currency = self.prop('placeholder').indexOf('$') !== -1 ? '$' : '€';

            if (!self.val().length) {
                return;
            }

            self.val(self.val().replace(/[^\d+]/g, '') + ` ${currency}`);
        }, 500);
    });
}
