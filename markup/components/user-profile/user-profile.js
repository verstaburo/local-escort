export default function userProfile() {
    const block = $('.user-profile');

    if (!block.length) {
        return;
    }

    const card = block.find('.profile-card');
    const header = $('.header');

    const hT = header.offset().top;
    const wT = $(window).scrollTop();
    const sT = card.parent().offset().top;
    const cT = card.offset().top;

    const next = card.next();
    const parent = card.parent();
    const popup = block.parents('.popup');

    const top = hT >= wT ? hT + header.outerHeight() : wT;

    const btm = next.length ? next.offset().top - next.outerHeight() - card.outerHeight() : parent.height() - card.outerHeight();

    let translate = 0;

    if (top >= sT) {
        translate = top - sT;
    }

    if (top <= sT) {
        translate = 0;
    }

    if (top >= btm) {
        translate = btm;
    }

    card.css('transform', `translate3d(0, ${translate}px, 0`);
}

$('.user-profile').parents('.popup').on('scroll', userProfile);
