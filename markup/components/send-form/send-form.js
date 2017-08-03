export default function sendForm() {
    $(document).on('input change', '.send-form .textarea__control', function() {
        const textarea = $(this);
        const btn = textarea.parents('.send-form').find('.send-form__button');
        const text = textarea.text().trim();

        if (!!text) {
            btn.fadeIn();
        } else {
            btn.fadeOut();
        }
    });
}
