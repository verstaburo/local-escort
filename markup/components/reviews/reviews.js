export default function reviews() {
    const toggleButton = function() {
        const control = $(this);
        const btn = control.parents('.reviews__form').find('.reviews__button');

        btn.toggleClass('active', !!control.val());
    };

    $('.reviews__control').each(toggleButton);
    $(document).on('input', '.reviews__control', toggleButton);
};
