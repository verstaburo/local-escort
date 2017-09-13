export default function arrowUp() {
    const w = $(window),
        btn = $('.arrow-up');

    if (!btn.length || w.width() <= 768) {
        return;
    }

    w.on('scoll', function () {
        if (w.scrollTop() - w.innerHeight() >= 0) {
            btn.addClass('active');
        } else {
            btn.removeClass('active');
        }
    });

    btn.click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600, 'swing');
    });
}
