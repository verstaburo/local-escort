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

    const block = $('.user-messages');

    if (!block.length) {
        return;
    }

    const scrollTop = block.offset().top - $('.user-nav').outerHeight();

    if (scrollTop > $(window).scrollTop()) {
        $('html, body').animate({ scrollTop }, 250);
    }
});

$(window).on('resize', setMessagesHeight);

$(document).on('click touchstart', '.user-messages__send-activation', (evt) => {
    const self = evt.target;
    const form = $(self).siblings('.send-form');
    const newHeight = form.outerHeight();
    const send = $(self).parents('.user-messages__send');
    send.velocity( { 'min-height': `${newHeight}px` }, 250, () => {
        send.addClass('active');
        form.find('.textarea__control').focus();
    });
});
