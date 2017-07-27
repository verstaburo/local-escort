$(function() {
    var pageWrapper = $('.user-fill-profile');

    /*
        Add more languages
    */

    pageWrapper.on('click', '.js-user-fill-profile-add-language', function(e) {
        e.preventDefault();
        var btn = $(this),
            grid = btn.parents('.grid');

        var select = grid
            .find('.selectbox')
            .last()
            .parents('.grid__col')
            .clone(true);

        var selectLabel = select.find('.field__label'),
            nextNum = Number(selectLabel.text().replace(/\D+/g, '')) + 1;

        selectLabel.text('Language ' + nextNum);

        select.insertBefore(btn.parents('.grid__col'));
    });
});
