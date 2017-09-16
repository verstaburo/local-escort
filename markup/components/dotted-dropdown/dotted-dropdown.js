export default function dottedDropdown() {
    $(document)
        .on('click', '.dotted-dropdown__button', function(e) {
            e.preventDefault();
            e.stopPropagation();
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
        })
        .on('click', (e) => {
            const block = $('.dotted-dropdown');
            const t = $(e.target);

            if (t.parents('.dotted-dropdown').length || t.hasClass('dotted-dropdown')) {
                return;
            }

            block
                .find('.dotted-dropdown__content')
                .slideUp(250, () => {
                   block.removeClass('active');
                });
        });
}
