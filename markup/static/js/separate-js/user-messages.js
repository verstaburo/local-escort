$(document)
    .on('click', '.user-messages__left .message', function (e) {
        e.preventDefault();
        var self = $(this);

        self
            .addClass('active')
            .siblings()
            .removeClass('active');


        var users = $('.user-messages__left'),
            messages = $('.user-messages__right');

        users.removeClass('active');
        messages.addClass('active');
    });
