export default function modelMap() {
    $('.model-map').parents('.popup')
        .on('show', function() {
            const header = $('.header');
            const el = $(this);

            header
                .css('z-index', +el.css('z-index') + 1)
                .addClass('no-shadow');

            header
                .find('.navbar')
                .addClass('navbar_dark');

            header
                .find('.search-bar')
                .addClass('search-bar_dar');

            el
                .find('.popup__wrapper')
                .css({
                    'padding-top': header.outerHeight(),
                    'padding-bottom': 0,
                });

            // filter
            const filter = $(document).find('.filter_extended');

            filter.addClass('filter_dark');

            filter
                .find('.selectbox_grey')
                .switchClass('selectbox_grey', 'selectbox_deep-dark');

            filter
                .find('.range-slider')
                .addClass('range-slider_dark');

            filter
                .find('.checkbox')
                .addClass('checkbox_black');

            filter
                .find('.js-toggle-filter-additional')
                .switchClass('button_border_standart', 'button_bg_darkGrey button_color_white button_border_grey');

            filter
                .find('.filter__hide-additional')
                .switchClass('button_bg_darkGrey', 'button_bg_light');

            filter
                .find('.filter__reset')
                .switchClass('button_border_standart', 'button_bg_darkGrey button_color_white button_border_grey');

            filter
                .find('.icon-button')
                .addClass('icon-button_color_white icon-button_border_grey');
        })
        .on('hide', function() {
            const header = $('.header');
            const el = $(this);

            header.removeClass('no-shadow');

            if ($(document).find('.popup.active').length <= 1) {
                header.css('z-index', '');
            }

            header
                .find('.navbar')
                .removeClass('navbar_dark');

            header
                .find('.search-bar')
                .removeClass('search-bar_dar');

            el
                .find('.popup__wrapper')
                .css({
                    'padding-top': '',
                    'padding-bottom': '',
                });

            // filter
            const filter = $(document).find('.filter_extended');

            filter.removeClass('filter_dark');

            filter
                .find('selectbox_deep-dark')
                .switchClass('selectbox_deep-dark', 'selectbox_grey');

            filter
                .find('.range-slider')
                .removeClass('range-slider_dark');

            filter
                .find('.checkbox')
                .removeClass('checkbox_black');

            filter
                .find('.js-toggle-filter-additional')
                .switchClass('button_bg_darkGrey button_color_white button_border_grey', 'button_border_standart');

            filter
                .find('.filter__hide-additional')
                .switchClass('button_bg_light', 'button_bg_darkGrey');

            filter
                .find('.filter__reset')
                .switchClass('button_bg_darkGrey button_color_white button_border_grey', 'button_border_standart');

            filter
                .find('.icon-button')
                .removeClass('icon-button_color_white icon-button_border_grey');
        });
}
