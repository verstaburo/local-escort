export default function header() {
    const header = $('.header');

    if (!header.length) {
        return;
    }

    // toggle mobile search-bar
    const searchBar = header.find('.header__search-bar');
    header.on('click', '.js-header-toggle-search-bar', function (e) {
        e.preventDefault();
        const el = $(this);
        const overlay = $('.page__overlay');
        const isActive = el.hasClass('active');

        if (isActive) {
            overlay.fadeOut();
            el.removeClass('active');
            searchBar.slideUp();
        } else {
            overlay.fadeIn();
            el.addClass('active');
            searchBar.slideDown();
        }
    });
}
