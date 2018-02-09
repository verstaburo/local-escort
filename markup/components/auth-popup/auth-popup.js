export default function authPopup() {
    const toggle = function (e) {
        e.preventDefault();
        const el = $(this);
        let action = null;

        if (el.hasClass('auth-popup__col_action')) {
            action = el;
        } else {
            action = el.parents('.auth-popup__col_action');
        }

        const cols = action.find('.auth-popup__col');

        cols
            .parents('.auth-popup__col_action')
            .addClass('active');

        const siblingsCols = action
            .siblings('.auth-popup__col_action')
            .removeClass('active')
            .find('.auth-popup__col');
    };

    $(document).on('click', '.js-auth-popup-action-btn', toggle);

    $(document).on('click', '.js-auth-popup-action-btn-mob', function (e) {
        if ($(window).width() > 768 || $(this).hasClass('active')) {
            return;
        }

        toggle.call(this, e);
    });
}
