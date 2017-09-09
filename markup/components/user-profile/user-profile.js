export default function userProfile(isInPopup) {
    const header = $('.header');
    const card = $('.user-profile__profile-card');
    const next = card.next();
    const parent = card.parent();

    if (!card.length) {
        return;
    }

    const sT = $(window).scrollTop();
    const hT = !isInPopup ? header.outerHeight() : 0;
    const topBreakpoint = parent.offset().top - hT;
    const bottomBreakpoint = next.length ?
        next.offset().top - card.outerHeight() - hT:
        parent.offset().top + parent.outerHeight() - card.outerHeight() - hT;

    if (sT <= topBreakpoint) {
        card
            .removeClass('fixed')
            .css({
                position: '',
                top: '',
                transform: ''
            });
    } else if (sT >= bottomBreakpoint) {
        card
            .removeClass('fixed')
            .css({
                position: 'absolute',
                top: bottomBreakpoint,
                transform: ''
            });
    } else {
        const oT = !isInPopup && header.hasClass('fixed') ? header.outerHeight() : 0;

        card
            .addClass('fixed')
            .css({
                position: '',
                top: '',
                transform: `translate3d(0, ${oT}px, 0)`
            });
    }
}

$(window).on('scroll', () => {
   userProfile(false);
});
