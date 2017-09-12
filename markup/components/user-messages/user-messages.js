function setMessagesHeight () {
    const block = $('.user-messages__content');

    if (!block.length || !block.find('.message').length) {
        return;
    }

    const userNav = $('.user-nav').outerHeight();
    const vH = $(window).height();
    const paddings = (block.offset().top - block.parents('.user-messages').offset().top) * 2;

    block.css({ height: vH - userNav - paddings});
}

export default function userMessages() {
    const scrollBlock = $('.js-user-messages-scrollable');

    if (!scrollBlock.length) {
        return;
    }

    scrollBlock.scrollbar();
}

$(window).on('load', function() {
    setMessagesHeight();
    const scrollTop = $('.user-messages').offset().top - $('.user-nav').outerHeight();

    if (scrollTop > $(window).scrollTop()) {
        $('html, body').animate({ scrollTop }, 250);
    }
});

$(window).on('resize', setMessagesHeight);
