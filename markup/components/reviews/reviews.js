export default function reviews() {
    const toggleButton = function() {
        const control = $(this);
        const btn = control.parents('.reviews__form').find('.reviews__button');

        btn.toggleClass('active', !!control.val());
    };

    $('.reviews__control').each(toggleButton);
    $(document).on('input', '.reviews__control', toggleButton);

    $(document).on('click', '.js-activation-field', (evt) => {
        evt.preventDefault();
        const self = $(evt.target).closest('.reviews');
        $(self).find('.textarea__control').attr('contenteditable', 'true');
        $(self).find('.reviews__activator, .reviews__no-reviews').hide();
        $(self).find('.reviews__content').slideDown(400);
    });
};
