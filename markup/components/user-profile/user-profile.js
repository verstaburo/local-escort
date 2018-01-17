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

    let offsetTop = userNav.outerHeight();

    if (!userNav.length) {
        const headerHeight = $('.header.fixed').outerHeight() || 0;
        const navbarHeight = $('.header__navbar.move').outerHeight() || 0;

        offsetTop = headerHeight + navbarHeight;
    }

    const topBreakpoint = sT <= sidebar.offset().top - offsetTop;
    const bottomBreakpoint = sT >= card.next().offset().top - card.outerHeight() - offsetTop;

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
                transform: `translate3d(0, ${offsetTop}px, 0)`,
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

    $(document).on('show', '#profile-popup', function () {
        $(this).off('scroll').on('scroll', scrollIntoPopup);
    });
}
