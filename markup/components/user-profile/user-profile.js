function scrollIntoPage() {
    const userNav = $('.user-nav');
    const card = $('.user-profile__profile-card').filter(function() {
        return !$(this).parents('.popup').length;
    });
    const next = card.next();
    const parent = card.parent();

    if (!card.length) {
        return;
    }

    const sT = $(window).scrollTop();
    const pOT = parent.offset().top;

    const hT = userNav.outerHeight();
    const topBreakpoint = pOT - hT;
    const bottomBreakpoint = next.length ?
        next.offset().top - card.outerHeight():
        pOT + parent.outerHeight() - card.outerHeight() - hT;

    if (sT <= topBreakpoint) {
        card.css({ transform: 'translate3d(0, 0, 0)'});
    } else if (sT >= bottomBreakpoint) {
        card.css({ transform: `translate3d(0, ${bottomBreakpoint > 0 ? bottomBreakpoint - pOT : 0}px, 0` });
    } else {
        card.css({ transform: `translate3d(0, ${sT - topBreakpoint}px, 0)` });
    }
}

function scrollIntoPopup() {
    const popup = $(this);
    const card = popup.find('.user-profile__profile-card');
    const next = card.next();
    const parent = card.parent();

    const sT = popup.scrollTop();
    const pOT = parent.offset().top;

    const topBreakpoint = sT + pOT;
    const bottomBreakpoint = next.length ?
        sT + next.offset().top - card.outerHeight() :
        topBreakpoint + parent.outerHeight() - card.outerHeight();

    if (sT <= topBreakpoint) {
        card.css({ transform: 'translate3d(0, 0, 0)'});
    } else if (sT >= bottomBreakpoint) {
        card.css({ transform: `translate3d(0, ${bottomBreakpoint > 0 ? bottomBreakpoint - topBreakpoint : 0}px, 0` });
    } else {
        card.css({ transform: `translate3d(0, ${sT - topBreakpoint}px, 0)` });
    }
}

export default function userProfile() {
    $(window).on('scroll', scrollIntoPage);
    $('.js-profile-popup-wr').on('scroll', scrollIntoPopup);
}
