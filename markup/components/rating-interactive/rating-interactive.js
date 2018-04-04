export default function ratingInteractive() {

    $(document)
        .on('click', '.rating-interactive__star', function() {
            const star = $(this);
            const activeStar = star.parent().children('.active');

            activeStar.removeClass('active');
            star.addClass('active');
            const cb = star.children('.rating-interactive__control');

            cb[0].checked = true;

            const counter = star
                .parents('.rating-interactive-counter')
                .find('.rating-interactive-counter__counter');

            const val = Number(cb.val());

            if (!counter.length) {
                return;
            }

            if (val === 1) {
                if (!counter.is(':visible')) {
                    counter.fadeIn();
                }
                counter.text(`${val} star`);
            } else if (val > 1) {
                if (!counter.is(':visible')) {
                    counter.fadeIn();
                }
                counter.text(`${val} stars`);
            } else {
                counter.fadeOut();
            }
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
