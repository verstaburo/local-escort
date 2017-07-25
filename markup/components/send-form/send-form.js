export default function sendForm() {
    $(document).on('input change', '.send-form__control', function() {
        const el = $(this);
        const text = el.text().trim();
        const btn = el.parents('.send-form').find('.send-form__button');

        el.attr('value', text);
        el.prop('value', text);

        if (!!text) {
            btn.fadeIn();
        } else {
            btn.fadeOut();
        }
    });

    $(document).find('.send-form__control').trigger('change');
}
