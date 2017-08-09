$(function() {
    // add tour
    $(document).on('click', '.js-user-fill-profile-add-more-picture', function(e) {
        e.preventDefault();

        var sections = $(this)
            .parents('.user-fill-profile__main')
            .find('.js-user-fill-profile-picture-container')
            .last();

        var clone = sections
            .clone(true)
            .insertAfter(sections);

        clone
            .find('.user-fill-profile__label')
            .each(function() {
                var el = $(this);
                el.text(el.text().replace(/\d+/, clone.index()));
            })
    });
});
