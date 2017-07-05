export default function searchBar() {
    const form = $('.search-bar');
    const input = form.find('.search-bar__input');
    const close = form.find('.search-bar__close');

    if (!form.length) {
        return;
    }

    input.on('focus', () => {
        form
           .addClass('search-bar_extended')
           .parents('.navbar__item')
           .prevAll(':not(.navbar__item_logo)')
           .hide();
    });

    close.on('click', (e) => {
        e.preventDefault();
        form
            .removeClass('search-bar_extended')
            .parents('.navbar__item')
            .prevAll(':not(.navbar__item_logo)')
            .show();
    });
}
