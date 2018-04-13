function setListPos(canditate) {
    const block = canditate || $('.list');
    const vW = $(window).width();

    if (!block.length) {
        return;
    }

    block.each(function() {
        const dropdown = $(this).find('.list');

        if (!dropdown.length) {
            return;
        }

        if (dropdown.offset().left < 0) {
            dropdown.css('left', '100%');
        }

        if (dropdown.offset().left + dropdown.outerWidth() > vW) {
            dropdown.css('left', '-100%');
        }
    });
};

export default function list() {
    $(document).on('touchstart', '.list__item_dropdown', function(e) {

        if ($(window).width() > 1024) {
            return;
        }

        e.preventDefault();
        const self = $(this);

        setListPos(self.parents('.list'));

        self
            .toggleClass('active')
            .siblings('.list__item')
            .removeClass('active');
    });

    $(window).on('resize', () => setListPos());
}
