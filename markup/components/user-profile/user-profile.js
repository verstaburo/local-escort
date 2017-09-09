export default function userProfile(isInPopup) {
    const header = $('.header');
    const card = $('.user-profile__profile-card');
    const next = card.next();
    const parent = card.parent();

    if (!card.length) {
        return;
    }

    const sT = $(window).scrollTop();
    const topBreakpoint = isInPopup ? parent.offset().top : parent.offset().top - header.outerHeight();
    const bottomBreakpoint = next.length ?
        next.offset().top - card.outerHeight() :
        parent.offset().top + parent.outerHeight() - card.outerHeight();

    if (sT <= topBreakpoint) {
        card
            .removeClass('fixed')
            .css({
                position: '',
                top: '',
                transform: ''
            });
    } else if (sT >= bottomBreakpoint) {
        let top = next.offset().top - card.outerHeight() - parent.offset().top;

        card
            .removeClass('fixed')
            .css({
                position: 'absolute',
                top,
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
