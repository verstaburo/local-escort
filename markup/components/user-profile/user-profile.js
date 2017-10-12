function scrollIntoPage() {
    const card = $('.user-profile__profile-card').filter(function() {
        return $(this).parents('.popup').length === 0;
    });

    if (!card.length) {
        return;
    }

    const sidebar = card.parents('.user-profile__sidebar');
    const sT = $(window).scrollTop();
    const userNav = $('.user-nav');

    const topBreakpoint = sT <= sidebar.offset().top - userNav.outerHeight();
    const bottomBreakpoint = sT >= card.next().offset().top - card.outerHeight() - userNav.outerHeight();

    if (topBreakpoint) {
        card
            .css('transform', `translate3d(0, 0, 0)`)
            .removeClass('fixed attached');

    } else if (bottomBreakpoint) {
        card
            .removeClass('fixed')
            .addClass('attached')
            .css({
                transform: `translate3d(0, 0, 0)`,
                bottom: card.next().outerHeight() + sidebar.outerHeight() - sidebar.height()
            })

    } else {
        card
            .css({
                transform: `translate3d(0, ${userNav.outerHeight()}px, 0)`,
                bottom: ''
            })
            .removeClass('attached')
            .addClass('fixed');
    }
}

function scrollIntoPopup() {
    const popup = $(this);
    const card = popup.find('.profile-popup__slide.active .user-profile__profile-card');
    const sidebar = card.parents('.user-profile__sidebar');
    const sT = popup.scrollTop();

    const topBreakpoint = sT <= sidebar.offset().top + sT;
    const bottomBreakpoint = sT >= card.next().offset().top - card.outerHeight() + sT;

    if (topBreakpoint) {
        card.removeClass('fixed attached');

    } else if (bottomBreakpoint) {
        card
            .removeClass('fixed')
            .addClass('attached')
            .css({ bottom: card.next().outerHeight() + sidebar.outerHeight() - sidebar.height() })

    } else {
        card
            .css({ bottom: '' })
            .removeClass('attached')
            .addClass('fixed');
    }
}

export default function userProfile() {
    $(window).on('scroll', scrollIntoPage);
    $('.js-profile-popup-wr').on('scroll', scrollIntoPopup);
}
