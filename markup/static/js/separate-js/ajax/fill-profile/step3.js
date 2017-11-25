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

    /*
        CHANGE ALL HOURS-FROM
     */

    pageWrapper.on('change', '.js-user-fill-profile-hours-from-main select', function() {
        var selected = $(this).prop('selectedIndex');

        pageWrapper
            .find('.js-user-fill-profile-hours-from .selectbox__list')
            .each(function() {
                $(this)
                    .find('.selectbox__item')
                    .eq(selected)
                    .trigger('click');
            });
    });

    /*
        CHANGE ALL HOURS-TO
     */
    pageWrapper.on('change', '.js-user-fill-profile-hours-to-main select', function() {
        var selected = $(this).prop('selectedIndex');

        pageWrapper
            .find('.js-user-fill-profile-hours-to .selectbox__list')
            .each(function() {
                $(this)
                    .find('.selectbox__item')
                    .eq(selected)
                    .trigger('click');
            });
    });
});
