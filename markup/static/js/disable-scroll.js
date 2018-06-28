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
    const html = document.querySelector('html');
    const { position } = getComputedStyle(html);
    const scrollTop = html.scrollTop || document.body.scrollTop;

    if (position === 'fixed') {
      return;
    }

    html.style.position = 'fixed';
    html.style.top = `-${scrollTop}px`;
    html.style.right = 0;
    html.style.bottom = 0;
    html.style.left = 0;
    html.style.overflowY = 'scroll';
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
    const html = document.querySelector('html');
    const { position, top } = getComputedStyle(html);
    const scrollTop = Math.abs(parseInt(top, 10));

    if (position !== 'fixed') {
      return;
    }

    html.style.position = '';
    html.style.top = '';
    html.style.right = '';
    html.style.bottom = '';
    html.style.left = '';
    html.style.overflowY = '';
    html.scrollTop = scrollTop;
}
