const filterExtended = () => {
    $(document)
        .find('#filter-extended')
        .on('show', function() {
            const header = $('.header');
            const el = $(this);

            header
                .css('z-index', +el.css('z-index') + 1)
                .addClass('no-shadow');
            el
                .find('.popup__wrapper')
                .css('padding-top', header.outerHeight());
        })
        .on('afterhide', function() {
            const header = $('.header');
            const el = $(this);

            header.removeClass('no-shadow');


            if ($(document).find('.popup.active').length === 0) {
                header.css('z-index', '');
            }

            el
                .find('.popup__wrapper')
                .css('padding-top', '');
        });
};

const toggleAdditional = () => {
    const block = $('.filter-additional');

    if (!block.length) {
        return;
    }

    $(document).on('click', '.js-toggle-filter-additional', function (e) {
        e.preventDefault();
        const el = $(this);

        block.slideToggle(250, () => {
            const isActive = block.is(':visible');
            const nextText = isActive ? el.data('hide-text') : el.data('show-text');

            $(document)
                .find('.js-toggle-filter-additional')
                .text(nextText)
                .toggleClass('active', isActive);

            block
                .parents('.filter_extended')
                .toggleClass('filter_additional', isActive);
        });
    });
};

export default function filter() {
    const block = $('.filter');

    if (!block.length) {
        return;
    }

    toggleAdditional();
    filterExtended();
}
