$(document).on('submit', '.profile-common-popup-report', function(e) {
    e.preventDefault();

    var form = $(this);

    var steps = form.find('.profile-common-popup-report__step');

    form
        .next()
        .find('.js-profile-report-submit')
        .hide()
        .next()
        .fadeIn();


    steps
        .eq(1)
        .hide()
        .next()
        .fadeIn();
});
