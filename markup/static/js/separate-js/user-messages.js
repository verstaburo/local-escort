$(document).on('click touchstart', '.user-messages__left .message', function (e) {
    e.preventDefault();
    window.location.hash = 'dialog' + '/' + $(this).data('dialog-id');
});

function toggleUserMessage() {
    var dialogId = window.location.hash.replace('#dialog/', '');
    var message = $('.user-messages__left .message');

    if (!message.length) {
        return;
    }

    var users = $('.user-messages__left'),
        messages = $('.user-messages__right');

    var messageElement = $('[data-dialog-id="' + dialogId + '"]');

    users.toggleClass('active', !messageElement.length);
    messages.toggleClass('active', !!messageElement.length);

    message.removeClass('active');
    messageElement.addClass('active');

}

$(window).on('hashchange', function (e) {
    // если хеш не относится к диалогу
    if (e.originalEvent.oldURL.indexOf('#dialog/') === -1 && e.originalEvent.newURL.indexOf('#dialog/') === -1) {
        return;
    }

    toggleUserMessage();
});

$(window).on('load', function (e) {
    if (window.location.hash.indexOf('#dialog/') === -1) {
        return;
    }

    toggleUserMessage();
});
