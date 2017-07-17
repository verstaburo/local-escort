export function profileReportPopup() {
    const form = $('.profile-common-popup-report');
    const popup = form.parents('.popup');
    const step = form.find('.profile-common-popup-report__step').eq(0);

    if (!form.length) {
        return;
    }

    step.show();

    popup
        .find('.profile-common-popup__button')
        .hide();

    const btn = popup
        .find('.profile-common-popup__button')
        .eq(0)
        .show();

    popup
        .on('click', '.js-profile-report-next', (e) => {
            e.preventDefault();
            step
                .hide()
                .next('.profile-common-popup-report__step')
                .fadeIn();

            btn
                .hide()
                .next('.profile-common-popup__button')
                .fadeIn();
        })
        .on('click', '.js-profile-report-submit', (e) => {
            e.preventDefault();
            form.submit();
        })
}
