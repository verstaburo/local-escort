export default function dottedDropdown() {
    const block = $('.dotted-dropdown');

    if (!block.length) {
        return;
    }

    $('.dotted-dropdown__button').on('click', function(e) {
        e.preventDefault();
        const el = $(this);
        const block = el.parents('.dotted-dropdown');
        const content = block.find('.dotted-dropdown__content');

        const isActive = block.hasClass('active');

        if (isActive) {
            content.slideUp(250, () => {
                block.removeClass('active');
            });
        } else {
            content.slideDown(250, () => {
                block.addClass('active');
            });
        }
    });
}
