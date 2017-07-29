$(function() {
   var nav = $('.fill-profile-nav'),
       page = $('.user-fill-profile');

   // navigation click
    nav.on('click', '.fill-profile-nav__link', function(e) {
        e.preventDefault();
        var link = $(this);

        $.ajax({
            url: link.attr('href'),
            type: 'GET',
            success: function(data) {
                setTimeout(function () { // emulate server delay
                    $('.user-fill-profile__main').replaceWith(data);

                    // if there's masonry grid, then rebuild it
                    if ($('.user-fill-profile__main').find('.js-masonry').length) {
                        rebuildGrd();
                    }

                    // change active menu item
                    link
                        .parents('.fill-profile-nav__item')
                        .addClass('active')
                        .siblings()
                        .removeClass('active')
                }, 500);
            }
        });
    });

    // continue btn click
    page.on('click', '.js-user-fill-profile-continue', function(e) {
        e.preventDefault();
        var item = page.find('.fill-profile-nav__item.active');

        // validation should be here

        // next link
        item
            .next()
            .find('.fill-profile-nav__link')
            .trigger('click');
    });
});
