export default function ratingInteractive() {

    const block = $('.rating-interactive');

    if (!block.length) {
        return;
    }

    block
        .on('click', '.rating-interactive__star', function() {
            const star = $(this);
            const activeStar = star.parent().children('.active');

            activeStar.removeClass('active');
            star.addClass('active');
            star.children('rating-interactive__control')[0].checked = true;
        })
        .on('click', '.rating-interactive__reset', function (e) {
            e.preventDefault();

            $(this)
                .siblings('.rating-interactive__star')
                .removeClass('active')
                .find('.rating-interactive__control')
                .each(function() {
                    $(this)[0].checked = false;
                });
        });

}
