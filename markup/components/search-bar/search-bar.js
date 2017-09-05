export default function searchBar() {
    const form = $('.search-bar').filter(function () {
        return !$(this).parent().hasClass('header__search-bar');
    });

    const input = form.find('.search-bar__input');
    const close = form.find('.search-bar__close');

    if (!form.length) {
        return;
    }

    input.on('focus', () => {
        form
            .addClass('search-bar_extended')
            .parents('.navbar__item')
            .addClass('active')
            .prevAll(':not(.navbar__item_logo)')
            .each(function() {
                $(this)
                    .data('min-width', $(this).css('min-width'))
                    .velocity({ minWidth: 0, width: 0, opacity: 0 }, 250);
            });
    });

    close.on('click', (e) => {
        e.preventDefault();
        form
            .removeClass('search-bar_extended')
            .parents('.navbar__item')
            .removeClass('active')
            .prevAll(':not(.navbar__item_logo)')
            .each(function() {
                const item = $(this);
                item.velocity({ minWidth: item.data('min-width'), opacity: 1 });
            })
    });

    $(window).on('resize', () => {
        const sb = form.find('search-bar_extended');

        if (!sb.length) {
            return;
        }

        sb.parents('.navbar__item')
            .addClass('active')
            .prevAll(':not(.navbar__item_logo)')
            .each(function() {
                $(this).data('min-width', $(this).css('min-width'));
            });
    });
}
