import {freeze, unfreeze} from '../../static/js/disable-scroll';
import review from '../reviews/reviews';

export default function popup() {
    const POPUP_CLASS = '.popup';
    const WRAPPER_CLASS = '.popup__wrapper';
    const CLOSE_BTN_CLASS = '.popup__close';
    const ACTIVE_POPUP_CLASS = 'active';
    const TOGGLE_BTN_CLASS = '.js-toggle-popup';
    const PRELOAD_POPUP = 'js-popup-preload';
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

    const setCaller = function (targetPopup, btn, hide = true) {
        if (!targetPopup.length) {
            return;
        }

        if (hide) {
            const t = targetPopup.data();
            const callerId = targetPopup.attr('data-caller-target');
            const callerTarget = $(`[data-caller-id="${callerId}"]`);

            targetPopup.removeAttr('data-caller-target');
            callerTarget.removeAttr('data-caller-id');

            return;
        }

        // e6b30y3qkggk8eqybe6e80 - generate unique id
        const id = (Math.random() * Date.now())
            .toString(36)
            .replace('.', '')
            .repeat(2)
            .split('')
            .sort(() => 0.5 - Math.random()).join('');

        targetPopup.attr('data-caller-target', id);
        btn.attr('data-caller-id', id);
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
        const preload = popup.find('.popup__preload');

        popup.css('pointer-events', 'none');

        if (popup.hasClass(ACTIVE_POPUP_CLASS)) {
            return;
        }

        const activePopup = $('.popup.active');

        if (activePopup.length) {
            popup.css('z-index', Number(activePopup.css('z-index')) + 1);
        }

        let durationShit = ANIMATION_DURATION;

        if (popup.hasClass('js-profile-popup-wr')) {
            durationShit = 0;
        }

        const action = durationShit === '0' ? 'show' : 'fadeIn';

        popup[action](durationShit, () => {
            popup.addClass(ACTIVE_POPUP_CLASS).css('pointer-events', '');

            const btns = getCurrentPopupButtons('#' + popup.attr('id')).addClass('active');
            freeze();

            if (!preload.hasClass('is-active')) {
                popup.trigger(AFTER_SHOW_EVENT);
            } else {
                setTimeout(() => {
                    preload.removeClass('is-active');
                    const t = $('.textarea__control');
                    t.text(t.text().trim());
                    t.trigger('change');
                    review();
                    popup.trigger(AFTER_SHOW_EVENT);
                }, 1500);
            }
        });
    };

    const onHide = function () {
        const popup = $(this);

        if (!popup.hasClass(ACTIVE_POPUP_CLASS)) {
            return;
        }

        setCaller(popup);


        let durationShit = ANIMATION_DURATION;

        if (popup.hasClass('js-profile-popup-wr')) {
            durationShit = 0;
        }

        const action = durationShit === '0' ? 'hide' : 'fadeOut';

        popup[action](durationShit, () => {
            popup
                .removeClass(ACTIVE_POPUP_CLASS)
                .css('z-index', '');
            getCurrentPopupButtons('#' + popup.attr('id')).removeClass('active');

            if (!$('.popup.' + ACTIVE_POPUP_CLASS).length) {
                unfreeze();
            }

            // popup.find('.popup__preload').addClass('is-active');
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
                    const nextPopup = $(data);

                    nextPopup.appendTo($('body'));
                    resolve(nextPopup);
                }
            });
        });
    };

    const onToggleBtnClick = function (e) {
        e.preventDefault();

        const el = $(this);
        const action = el.data(DATA_ACTION_ATTR);

        loadTemplate(el.data(DATA_ATTR), el.data(DATA_TEMPLATE_URL)).then(popup => {

            if (!popup.length) {
                return;
            }

            switch (action) {
                case DATA_ACTION_TOGGLE:
                    if (popup.hasClass(ACTIVE_POPUP_CLASS)) {
                        setCaller(popup);
                        return popup.trigger(HIDE_EVENT);
                    }
                    setCaller(popup, el, false);
                    return popup.trigger(SHOW_EVENT);
                case DATA_ACTION_SHOW:
                    setCaller(popup, el, false);
                    return popup.trigger(SHOW_EVENT);
                case DATA_ACTION_HIDE:
                    setCaller(popup);
                    return popup.trigger(HIDE_EVENT);
                default:
                    setCaller(popup, el, false);
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
        const popup = $(this).parents('.popup');

        popup.trigger(HIDE_EVENT);
        setCaller(popup);
    };

    const onEscapeHandler = function (e) {
        if (e.keyCode === 27) {
            $(document)
                .find(POPUP_CLASS)
                .trigger(HIDE_EVENT);

            $(POPUP_CLASS).each(function () {
                setCaller($(this));
            });
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
        .on('click touchstart', `${CLOSE_BTN_CLASS}, .js-popup-close`, onCloseBtnClick)
        .on('keyup', onEscapeHandler);
}
