import { freeze, unfreeze } from '../../static/js/disable-scroll';

export default function popup() {
    const POPUP_CLASS = '.popup';
    const WRAPPER_CLASS = '.popup__wrapper';
    const ACTIVE_POPUP_CLASS = 'active';
    const TOGGLE_BTN_CLASS = '.js-toggle-popup';
    const DATA_ACTION_ATTR = 'action';
    const DATA_ACTION_SHOW = 'show';
    const DATA_ACTION_HIDE = 'hide';
    const DATA_ATTR = 'popup-id';
    const SHOW_EVENT = 'show';
    const HIDE_EVENT = 'hide';
    const AFTER_SHOW_EVENT = 'aftershow';
    const AFTER_HIDE_EVENT = 'afterhide';
    const ANIMATION_DURATION = 250;
    const popups = $(POPUP_CLASS);

    if (!popups.length) {
        return;
    }

    const onShow = function () {
        const popup = $(this);

        if (popup.hasClass(ACTIVE_POPUP_CLASS)) {
            return;
        }

        popup.fadeIn(ANIMATION_DURATION, () => {
            popup
                .addClass(ACTIVE_POPUP_CLASS)
                .trigger(AFTER_SHOW_EVENT);

            freeze();
        });
    };

    const onHide = function () {
        const popup = $(this);

        if (!popup.hasClass(ACTIVE_POPUP_CLASS)) {
            return;
        }

        popup.fadeOut(ANIMATION_DURATION, () => {
            popup
                .removeClass(ACTIVE_POPUP_CLASS)
                .trigger(AFTER_HIDE_EVENT);

            unfreeze();
        });
    };

    const onToggleBtnClick = function(e) {
        e.preventDefault();

        const el = $(this);
        const target = $(el.data(DATA_ATTR));
        const action = el.data(DATA_ACTION_ATTR);

        if (!target.length) {
            return;
        }

        switch (action) {
            case DATA_ACTION_SHOW:
                return target.trigger(SHOW_EVENT);
            case DATA_ACTION_HIDE:
                return target.trigger(HIDE_EVENT);
            default:
                return target.trigger(SHOW_EVENT);
        }
    };

    const onWrapperClick = function(e) {
        const popup = $(this);
        const target = $(e.target);

        if (target.hasClass(POPUP_CLASS.slice(1)) || target.hasClass(WRAPPER_CLASS.slice(1))) {
            e.preventDefault();
            e.stopPropagation();
            popup.trigger(HIDE_EVENT);
        }
    };

    $(document)
        .on(SHOW_EVENT, POPUP_CLASS, onShow)
        .on(HIDE_EVENT, POPUP_CLASS, onHide)
        .on('click', TOGGLE_BTN_CLASS, onToggleBtnClick)
        .on('click', POPUP_CLASS, onWrapperClick);
}
