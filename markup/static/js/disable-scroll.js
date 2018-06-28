// Freeze page content scrolling
export function freeze() {
    // const { $ } = window;
    // const h = $('html');

    // if (h.css('position') !== 'fixed') {
    //     const top = h.scrollTop() ? h.scrollTop() : $('body').scrollTop();

    //     if (window.innerWidth > h.width()) {
    //         h.css('overflow-y', 'hidden');
    //     }

    //     h.css({ width: '100%', height: '100%', position: 'fixed', top: -top });
    // }
    $('body').addClass('disabled-scroll');
}

// Unfreeze page content scrolling
export function unfreeze() {
    // const { $ } = window;
    // const h = $('html');

    // if (h.css('position') === 'fixed') {
    //     h.css('position', 'static');
    //     $('html, body').scrollTop(-parseInt(h.css('top'), 10));
    //     h.css({ position: '', width: '', height: '', top: '', 'overflow-y': '' });
    // }
    $('body').removeClass('disabled-scroll');
}
