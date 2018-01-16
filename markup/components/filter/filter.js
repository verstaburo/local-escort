import rangeSlider from '../range-slider/range-slider';

const filterExtended = () => {
    $(document)
        .on('show', '#filter-extended', function () {
            const header = $('.header');
            const el = $(this);
            const paddingTop = $('.photo-tape').outerHeight() + $('.header__navbar').outerHeight();

            header
                .css('z-index', 9999)
                .addClass('no-shadow');
            el
                .find('.popup__wrapper')
                .css('padding-top', paddingTop);

            $('.popup').each(function () {
                const self = $(this);

                if (self.attr('id') !== 'filter-extended') {
                    self.trigger('hide');
                }
            });

            rangeSlider();
            window.initSelectbox();

            if ($('.header_map').length) {
                el.find('.js-filter-modifiers').addClass('filter_dark');
                el.find('.js-select-modifiers').removeClass('selectbox_grey').addClass('selectbox_deep-dark');
                el.find('.js-range-modifiers').addClass('range-slider_dark');
                el.find('.js-checkbox-modifiers').addClass('checkbox_black');
                el.find('.js-applybutton-modifiers').removeClass('button_bg_darkGrey button_color_main').addClass('button_bg_light button_color_main');
                el.find('.js-resetbutton-modifiers').removeClass('button_border_standart').addClass('button_bg_darkGrey button_color_white button_border_grey');
                el.find('.js-moreoptionsbutton-modifiers').removeClass('button_border_standart').addClass('button_bg_darkGrey button_color_white button_border_grey');
                el.find('.js-iconbutton-modifiers').addClass('icon-button_color_white icon-button_border_grey');
            }
        })
        .on('afterhide', '#filter-extended', function () {
            const header = $('.header');
            const el = $(this);

            header.removeClass('no-shadow');

            if ($(document).find('.popup.active').length === 0) {
                header.css('z-index', '');
            }

            el
                .find('.popup__wrapper')
                .css('padding-top', '');
        });

    $(document).on('click', '.filter__mobile-nav a', function (e) {
        const self = $(this);
        const li = $(self).parent();

        li
            .addClass('active')
            .siblings()
            .removeClass('active');
    });
};

const toggleAdditional = () => {
    $(document)
        .on('click', '.js-toggle-filter-additional', function (e) {
            e.preventDefault();
            const el = $(this);
            const block = $('.filter-additional');

            if (!block.length) {
                return;
            }

            block.slideToggle(250, () => {
                const isActive = block.is(':visible');
                const nextText = isActive
                    ? el.data('hide-text')
                    : el.data('show-text');

                $(document)
                    .find('.js-toggle-filter-additional')
                    .text(nextText)
                    .toggleClass('active', isActive);

                block
                    .parents('.filter_extended')
                    .toggleClass('filter_additional', isActive);
            });
        });
};

const resetFilterElements = (container) => {
    if (!container.length) {
        return;
    }

    // reset selectboxes
    container
        .find('select')
        .prop('selectedIndex', 0)
        .trigger('change');

    // reset checkboxes
    container
        .find('input[type="checkbox"]')
        .prop('checked', false)
        .trigger('change');

    // reset radio buttons
    container
        .find('input[type="radio"]')
        .prop('checked', false)
        .trigger('change');

    // reset inputs
    container
        .find('input')
        .filter(function () {
            const type = $(this).prop('type');
            return type !== 'checkbox' && type !== 'radio';
        })
        .val('')
        .trigger('change');

    // reset textareas
    container
        .find('textarea')
        .val('')
        .trigger('change');
};

const resetFilter = () => {
    $(document)
        .on('click', '.js-filter-reset', function (e) {
            e.preventDefault();
            resetFilterElements($(this).parents('.filter'));
        });
};

export default function filter() {
    toggleAdditional();
    filterExtended();
    resetFilter();
}
