$(document).on('click', '.fill-profile-nav__item.active', function (e) {
    if ($(window).width() >= 1024) {
        return;
    }

    e.preventDefault();

    $(this).removeClass('active');

    $('.user-fill-profile__main').slideUp();
});
