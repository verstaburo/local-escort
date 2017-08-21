export default function modelList() {
    const block = $('.model-list');

    block
        .on('click', '.sort-ui__item', function(e) {
            e.preventDefault();
            const el = $(this);

            if (el.hasClass('active')) {
                return;
            }

            el
                .addClass('active')
                .siblings()
                .removeClass('active');

            if (el.data('view').toLowerCase() === 'list') {
                rebuildGrd(1, true, true);
            }

            if (el.data('view').toLowerCase() === 'table') {
                rebuildGrd(2, true, true);
            }
        });
}
