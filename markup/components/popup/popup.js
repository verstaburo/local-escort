import {freeze, unfreeze} from '../../static/js/disable-scroll';

export default function popup() {
    const POPUP_CLASS = '.popup';
    const WRAPPER_CLASS = '.popup__wrapper';
    const CLOSE_BTN_CLASS = '.popup__close';
    const ACTIVE_POPUP_CLASS = 'active';
    const TOGGLE_BTN_CLASS = '.js-toggle-popup';
    const DATA_ACTION_ATTR = 'action';
    const DATA_ACTION_SHOW = 'show';
    const DATA_ACTION_HIDE = 'hide';
    const DATA_TEMPLATE_URL = 'popup-template';
    const AFTER_HIDE_EVENT = 'afterhide';
    const DATA_ACTION_TOGGLE = 'toggle';
    const DATA_ATTR = 'popup-id';
    const SHOW_EVENT = 'show';
    const HIDE_EVENT = 'hide';
    const AFTER_SHOW_EVENT = 'aftershow';
    const ANIMATION_DURATION = 250;
    const popups = $(POPUP_CLASS);

    if (!popups.length) {
        return;
    }

    const getCurrentPopupButtons = (id) => {
        return $(document)
            .find(TOGGLE_BTN_CLASS)
            .filter(function () {
                const el = $(this);
                const action = el.data(DATA_ACTION_ATTR);

                return (action === DATA_ACTION_SHOW || DATA_ACTION_TOGGLE) && el.data(DATA_ATTR) === id;
            })
            .each(function () {
                $(this).addClass('active');
            });
    };

    const onShow = function (e) {
        const popup = $(this);

        if (popup.hasClass(ACTIVE_POPUP_CLASS)) {
            return;
        }

        const activePopup = $('.popup.active');

        if (activePopup.length) {
            popup.css('z-index', Number(activePopup.css('z-index')) + 1);
        }

        popup.fadeIn(ANIMATION_DURATION, () => {
            popup.addClass(ACTIVE_POPUP_CLASS);

            getCurrentPopupButtons('#' + popup.attr('id')).addClass('active');
            freeze();

            popup.trigger(AFTER_SHOW_EVENT);
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
                .css('z-index', '');
            getCurrentPopupButtons('#' + popup.attr('id')).removeClass('active');
            unfreeze();
            popup.trigger(AFTER_HIDE_EVENT);
        });
    };

    const loadTemplate = (id, url) => {
        const cachedPopup = $(id);
        return new Promise((resolve, reject) => {

            if (cachedPopup.length) {
                return resolve(cachedPopup);
            }

            $.ajax({
                url,
                type: 'GET',
                success: function (data) {
                    const popup = $(data);

                    popup.appendTo($('body'));
                    resolve(popup);
                }
            });
        });
    };

    const onToggleBtnClick = function (e) {
        e.preventDefault();

        const el = $(this);
        const action = el.data(DATA_ACTION_ATTR);

        el.css({
            pointerEvents: 'none',
            cursor: 'not-allowed',
            opacity: 0.5,
        }).attr('disabled', 'disabled');

        loadTemplate(el.data(DATA_ATTR), el.data(DATA_TEMPLATE_URL)).then(popup => {
            el.css({
                pointerEvents: '',
                cursor: '',
                opacity: '',
            }).attr('disabled', 'enabled');

            if (!popup.length) {
                return;
            }

            switch (action) {
                case DATA_ACTION_TOGGLE:
                    return popup.hasClass(ACTIVE_POPUP_CLASS)
                        ? popup.trigger(HIDE_EVENT)
                        : popup.trigger(SHOW_EVENT);
                case DATA_ACTION_SHOW:
                    return popup.trigger(SHOW_EVENT);
                case DATA_ACTION_HIDE:
                    return popup.trigger(HIDE_EVENT);
                default:
                    return popup.trigger(SHOW_EVENT);
            }
        });
    };

    const onWrapperClick = function (e) {
        e.stopPropagation();
        const popup = $(this);
        const target = $(e.target);

        if (target.hasClass(POPUP_CLASS.slice(1)) || target.hasClass(WRAPPER_CLASS.slice(1))) {
            e.preventDefault();
            e.stopPropagation();
            popup.trigger(HIDE_EVENT);
        }
    };

    const onCloseBtnClick = function (e) {
        e.preventDefault();
        $(this)
            .parents('.popup')
            .trigger(HIDE_EVENT);
    };

    const onEscapeHandler = function (e) {
        if (e.keyCode === 27) {
            $(document)
                .find(POPUP_CLASS)
                .trigger(HIDE_EVENT);
        }
    };

    const onShowPopup = (e, data) => {
        const { id, template } = data;

        loadTemplate(id, template).then(popup => {
            if (!popup.length) {
                return;
            }

            popup.trigger('show');
        });
    };

    $(document)
        .on('showpopup', onShowPopup)
        .on(SHOW_EVENT, POPUP_CLASS, onShow)
        .on(HIDE_EVENT, POPUP_CLASS, onHide)
        .on('click touchstart', TOGGLE_BTN_CLASS, onToggleBtnClick)
        .on('click touchstart', POPUP_CLASS, onWrapperClick)
        .on('click touchstart', CLOSE_BTN_CLASS, onCloseBtnClick)
        .on('keyup', onEscapeHandler);
}
