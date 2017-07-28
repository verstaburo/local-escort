$(function() {
    var pageWrapper = $('.user-fill-profile');

    /*
        SELECT ALL DAYS
     */
    pageWrapper.on('change', '.js-user-fill-profile-days input', function(e) {
        var daysCheckbox = $(this);

        pageWrapper
            .find('.js-user-fill-profile-day input')
            .each(function() {
                $(this).prop('checked', daysCheckbox.prop('checked'));
            });
    });
});
