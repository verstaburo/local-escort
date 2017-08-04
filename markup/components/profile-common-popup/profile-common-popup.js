export function profileReportPopup() {
    const form = $('.profile-common-popup-report');
    const popup = form.parents('.popup');

    popup
        .on('show', function() {
            const step = form.find('.profile-common-popup-report__step').eq(0);
            const el = $(this);

            if (!step.length) {
                return;
            }

            step
                .show()
                .nextAll()
                .hide();

            el
                .find('.profile-common-popup__button')
                .hide();

            el
                .find('.profile-common-popup__button')
                .eq(0)
                .show();
    })
        .on('click', '.js-profile-report-next', function(e) {
            e.preventDefault();
            const step = form.find('.profile-common-popup-report__step').eq(0);

            const checkedItem = step
                .find('.info-control__control:checked')
                .attr('checked', true)
                .parent()
                .get(0)
                .outerHTML;

            step
                .hide()
                .next('.profile-common-popup-report__step')
                .fadeIn()
                .find('.profile-common-popup-report__checked')
                .html(checkedItem);

            $(this)
                .hide()
                .next()
                .fadeIn();
        })
        .on('click', '.js-profile-report-submit', (e) => {
            e.preventDefault();
            form.submit();
        })
}
