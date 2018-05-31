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
        const that = $(evt.target);
        const self = $(evt.target).closest('.reviews');

        $(self).find('.reviews__activator, .reviews__no-reviews').hide();
        $(self).find('.textarea__control').attr('contenteditable', 'true').focus();

        if ($(self).find('.reviews__content').is(':visible')) {
            return;
        }

        $(self).find('.reviews__content').fadeIn(250, () => {
            let parentEl = that.parents('.popup');
            let st = parentEl.scrollTop();
            $(self).find('.textarea__control').attr('contenteditable', 'true').focus();

            if (!parentEl.length) {
                parentEl = $('html, body');
            }

            parentEl.animate({
                scrollTop: st + that.offset().top + that.outerHeight() - $(window).height() + 20
            }, 400);
        });
    });
};
