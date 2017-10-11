export default function modelMap() {
    const modelMap = $('.model-map');
    const header = $('.header');

    if (!modelMap.length) {
        return;
    }

    modelMap.height($(window).height() - header.outerHeight());
    modelMap.find('.map__content').scrollbar();
    modelMap.find('.map__marker, .map__group').fadeIn(250);
}

$(window).on('resize', () => {
    const modelMap = $('.model-map');
    const header = $('.header');
    modelMap.height($(window).height() - header.outerHeight());

    google.maps.event.trigger($('#map')[0], "resize");
});
//
// export default function modelMap() {
//     $('.model-map').parents('.popup')
//         .on('show', function() {
//             const header = $('.header');
//             const el = $(this);
//
//             header
//                 .css('z-index', +el.css('z-index') + 1)
//                 .addClass('no-shadow')
//                 .addClass('fixed');
//
//             header
//                 .find('.navbar')
//                 .addClass('navbar_dark');
//
//             header
//                 .find('.search-bar')
//                 .addClass('search-bar_dar');
//
//             header
//                 .find('.header__navbar').addClass('move');
//
//             el
//                 .find('.popup__wrapper')
//                 .css({
//                     'padding-top': header.outerHeight(),
//                     'padding-bottom': 0,
//                 });
//
//             $('.header__navbar_desktop [data-popup-id="#model-map"]').each(function() {
//                 $(this).text('view on list');
//             });
//
//             // filter
//             const filter = $(document).find('.filter_extended');
//
//             filter.addClass('filter_dark');
//
//             filter
//                 .find('.selectbox_grey')
//                 .switchClass('selectbox_grey', 'selectbox_deep-dark');
//
//             filter
//                 .find('.range-slider')
//                 .addClass('range-slider_dark');
//
//             filter
//                 .find('.checkbox')
//                 .addClass('checkbox_black');
//
//             filter
//                 .find('.js-toggle-filter-additional')
//                 .switchClass('button_border_standart', 'button_bg_darkGrey button_color_white button_border_grey');
//
//             filter
//                 .find('.filter__hide-additional')
//                 .switchClass('button_bg_darkGrey', 'button_bg_light');
//
//             filter
//                 .find('.filter__reset')
//                 .switchClass('button_border_standart', 'button_bg_darkGrey button_color_white button_border_grey');
//
//             filter
//                 .find('.icon-button')
//                 .addClass('icon-button_color_white icon-button_border_grey');
//         })
//         .on('hide', function() {
//             const header = $('.header');
//             const el = $(this);
//
//             el.find('.model-map').hide(500);
//
//             $('.header__navbar_desktop [data-popup-id="#model-map"]').each(function() {
//                 $(this).text('view on map');
//             });
//
//             header.removeClass('no-shadow');
//
//             if ($(window).scrollTop() < header.height()) {
//                 header.removeClass('fixed');
//                 header.find('.header__navbar').removeClass('move');
//             }
//
//             if ($(document).find('.popup.active').length <= 1) {
//                 header.css('z-index', '');
//             }
//
//             header
//                 .find('.navbar')
//                 .removeClass('navbar_dark');
//
//             header
//                 .find('.search-bar')
//                 .removeClass('search-bar_dar');
//
//             el
//                 .find('.popup__wrapper')
//                 .css({
//                     'padding-top': '',
//                     'padding-bottom': '',
//                 });
//
//             // filter
//             const filter = $(document).find('.filter_extended');
//
//             filter.removeClass('filter_dark');
//
//             filter
//                 .find('selectbox_deep-dark')
//                 .switchClass('selectbox_deep-dark', 'selectbox_grey');
//
//             filter
//                 .find('.range-slider')
//                 .removeClass('range-slider_dark');
//
//             filter
//                 .find('.checkbox')
//                 .removeClass('checkbox_black');
//
//             filter
//                 .find('.js-toggle-filter-additional')
//                 .switchClass('button_bg_darkGrey button_color_white button_border_grey', 'button_border_standart');
//
//             filter
//                 .find('.filter__hide-additional')
//                 .switchClass('button_bg_light', 'button_bg_darkGrey');
//
//             filter
//                 .find('.filter__reset')
//                 .switchClass('button_bg_darkGrey button_color_white button_border_grey', 'button_border_standart');
//
//             filter
//                 .find('.icon-button')
//                 .removeClass('icon-button_color_white icon-button_border_grey');
//         })
//         .on('aftershow', function() {
//             $(this).find('.map__content').scrollbar();
//             $(this).find('.model-map').show(500, function() {
//                 google.maps.event.trigger($(this).find('.map__block')[0], 'resize');
//
//                 $(this).find('.map__marker, .map__group').fadeIn(250);
//             });
//         })
//         .on('afterhide', function() {
//             $(this).find('.model-map').hide();
//             $(this).find('.map__marker, .map__group').hide();
//         })
// }
