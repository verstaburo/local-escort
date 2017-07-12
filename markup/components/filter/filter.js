const yearsOldSlider = () => {
    const slider = $('.js-filter-age');

    if (!slider.length) {
        return;
    }

    slider.each(function() {
        const el = $(this);

        const minInput = el
            .parents('.range-slider')
            .find('.range-slider__input_min');

        const maxInput = el
            .parents('.range-slider')
            .find('.range-slider__input_max');

        const minValue = minInput
            .parent()
            .find('.range-slider__value');

        const maxValue = maxInput
            .parent()
            .find('.range-slider__value');

        const values = [18, 28];

        minInput.val(values[0]);
        maxInput.val(values[1]);
        minValue.text(values[0]);
        maxValue.text(values[1]);

        el.slider({
            range: true,
            min: 18,
            max: 35,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minInput.val(min);
                maxInput.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
        });
    });
};

const rateSlider = () => {
    const slider = $('.js-filter-rate');

    if (!slider.length) {
        return;
    }

    const values = [30, 1500];

    slider.each(function() {
        const el = $(this);
        const minInput = el
            .parents('.range-slider')
            .find('.range-slider__input_min');

        const maxInput = el
            .parents('.range-slider')
            .find('.range-slider__input_max');

        const minValue = minInput
            .parent()
            .find('.range-slider__value');

        const maxValue = maxInput
            .parent()
            .find('.range-slider__value');

        minInput.val(values[0]);
        maxInput.val(values[1]);
        minValue.text(values[0]);
        maxValue.text(values[1]);

        el.slider({
            range: true,
            min: 30,
            max: 1500,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minInput.val(min);
                maxInput.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
        });
    });
};

const filterExtended = () => {
    const block = $(document).find('.filter_extended');

    block.on('toggleFilter', () => {
        block.slideToggle(250, () => {
            const isActive = block.is(':visible');
            const overlay = $('.page__overlay');

            $(document)
                .find('.js-toggle-extended-filter')
                .toggleClass('active', isActive);

            if (isActive) {
                overlay.fadeIn();
            } else {
                overlay.fadeOut();
            }
        });
    });

    $(document).on('click', '.js-toggle-extended-filter', (e) => {
        e.preventDefault();
        block.trigger('toggleFilter');
    });
};

const heightSlider = () => {
    const slider = $('.js-filter-height');

    if (!slider.length) {
        return;
    }

    const values = [135, 195];

    slider.each(function() {
        const el = $(this);
        const minInput = el
            .parents('.range-slider')
            .find('.range-slider__input_min');

        const maxInput = el
            .parents('.range-slider')
            .find('.range-slider__input_max');

        const minValue = minInput
            .parent()
            .find('.range-slider__value');

        const maxValue = maxInput
            .parent()
            .find('.range-slider__value');

        minInput.val(values[0]);
        maxInput.val(values[1]);
        minValue.text(values[0]);
        maxValue.text(values[1]);

        el.slider({
            range: true,
            min: 135,
            max: 195,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minInput.val(min);
                maxInput.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
        });
    });
};

const weightSlider = () => {
    const slider = $('.js-filter-weight');

    if (!slider.length) {
        return;
    }

    const values = [40, 200];

    slider.each(function() {
        const el = $(this);
        const minInput = el
            .parents('.range-slider')
            .find('.range-slider__input_min');

        const maxInput = el
            .parents('.range-slider')
            .find('.range-slider__input_max');

        const minValue = minInput
            .parent()
            .find('.range-slider__value');

        const maxValue = maxInput
            .parent()
            .find('.range-slider__value');

        minInput.val(values[0]);
        maxInput.val(values[1]);
        minValue.text(values[0]);
        maxValue.text(values[1]);

        el.slider({
            range: true,
            min: 40,
            max: 200,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minInput.val(min);
                maxInput.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
        });
    });
};

const breastSlider = () => {
    const slider = $('.js-filter-breast');

    if (!slider.length) {
        return;
    }

    const values = [32, 40];

    slider.each(function() {
        const el = $(this);
        const minInput = el
            .parents('.range-slider')
            .find('.range-slider__input_min');

        const maxInput = el
            .parents('.range-slider')
            .find('.range-slider__input_max');

        const minValue = minInput
            .parent()
            .find('.range-slider__value');

        const maxValue = maxInput
            .parent()
            .find('.range-slider__value');

        minInput.val(values[0]);
        maxInput.val(values[1]);
        minValue.text(values[0]);
        maxValue.text(values[1]);

        el.slider({
            range: true,
            min: 32,
            max: 40,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minInput.val(min);
                maxInput.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
        });
    });
};

const shoeSlider = () => {
    const slider = $('.js-filter-shoe');

    if (!slider.length) {
        return;
    }

    const values = [34, 45];

    slider.each(function() {
        const el = $(this);
        const minInput = el
            .parents('.range-slider')
            .find('.range-slider__input_min');

        const maxInput = el
            .parents('.range-slider')
            .find('.range-slider__input_max');

        const minValue = minInput
            .parent()
            .find('.range-slider__value');

        const maxValue = maxInput
            .parent()
            .find('.range-slider__value');

        minInput.val(values[0]);
        maxInput.val(values[1]);
        minValue.text(values[0]);
        maxValue.text(values[1]);

        el.slider({
            range: true,
            min: 34,
            max: 45,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minInput.val(min);
                maxInput.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
        });
    });
};

const toggleAdditional = () => {
    const block = $('.filter-additional');

    if (!block.length) {
        return;
    }

    $(document).on('click', '.js-toggle-filter-additional', function (e) {
        e.preventDefault();
        const el = $(this);

        block.slideToggle(250, () => {
            const isActive = block.is(':visible');
            const nextText = isActive ? el.data('hide-text') : el.data('show-text');

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

export default function filter() {
    const block = $('.filter');

    if (!block.length) {
        return;
    }

    yearsOldSlider();
    rateSlider();
    heightSlider();
    weightSlider();
    breastSlider();
    shoeSlider();
    toggleAdditional();
    filterExtended();
}
