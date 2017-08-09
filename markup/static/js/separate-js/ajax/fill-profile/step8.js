$(function() {
    // add tour
    $(document).on('click', '.js-user-fill-profile-add-tour', function(e) {
        e.preventDefault();

        var sections = $(this)
            .parents('.user-fill-profile__main')
            .find('.user-fill-profile__sections')
            .last();

        var clone = sections
            .clone(true)
            .insertAfter(sections);

        var heading = clone.find('.heading_md').eq(0),
            tourNumber = Number(heading.text().match(/\d+/)[0]) + 1;

        heading.text(heading.text().replace(/\d+/, tourNumber));
    });
});
