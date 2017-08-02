export default function authPopup() {
    const authPopup = $('.auth-popup');

    if (!authPopup.length) {
        return;
    }

    const actions = authPopup.find('.auth-popup__col_action');
    const actionsBtn = authPopup.find('.js-auth-popup-action-btn');

    const toggle = function(e) {
        e.preventDefault();
        const el = $(this);
        let action = null;

        if (el.hasClass('auth-popup__col_action')) {
            action = el;
        } else {
            action = el.parents('.auth-popup__col_action');
        }

        const cols = action.find('.auth-popup__col');

        cols.eq(0).hide();
        cols.eq(1).fadeIn();
        cols
            .parents('.auth-popup__col_action')
            .addClass('active');

        const siblingsCols = action
            .siblings('.auth-popup__col_action')
            .removeClass('active')
            .find('.auth-popup__col');

        siblingsCols.eq(1).hide();
        siblingsCols.eq(0).fadeIn();
    };

    actions.hover(toggle);
    actionsBtn.click(toggle);

    if ('ontouchstart' in window) {
        actions.off('mouseenter mouseleave');
    }
}
