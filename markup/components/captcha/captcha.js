export default function captcha() {
    $(window).on('resize load', function() {
        const captcha = $('.g-recaptcha');

        if (!captcha.length) {
            return;
        }

        const scale = captcha.outerWidth() / captcha.parent()[0].scrollWidth;

        if (scale < 1) {
            captcha.css('transform', `scale(${scale})`)
        }
    });
}
