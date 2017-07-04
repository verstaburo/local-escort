const yearsOldSlider = () => {
    const slider = $('#filter-age');

    const minInput = slider
        .parents('.range-slider')
        .find('.range-slider__input_min');

    const maxInput = slider
        .parents('.range-slider')
        .find('.range-slider__input_max');

    const minValue = minInput
        .parent()
        .find('.range-slider__value');

    const maxValue = maxInput
        .parent()
        .find('.range-slider__value');


    if (!slider.length || !minInput.length || !maxInput.length || !minValue.length || !maxValue.length) {
        return;
    }

    const values = [18, 28];

    minInput.val(values[0]);
    maxInput.val(values[1]);
    minValue.text(values[0]);
    maxValue.text(values[1]);

    slider.slider({
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
};

const costSlider = () => {
    const slider = $('#filter-cost');

    const minInput = slider
        .parents('.range-slider')
        .find('.range-slider__input_min');

    const maxInput = slider
        .parents('.range-slider')
        .find('.range-slider__input_max');

    const minValue = minInput
        .parent()
        .find('.range-slider__value');

    const maxValue = maxInput
        .parent()
        .find('.range-slider__value');


    if (!slider.length || !minInput.length || !maxInput.length || !minValue.length || !maxValue.length) {
        return;
    }

    const values = [30, 1500];

    minInput.val(values[0]);
    maxInput.val(values[1]);
    minValue.text(values[0]);
    maxValue.text(values[1]);

    slider.slider({
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
};

export default function filter() {
    const block = $('.filter');

    if (!block.length) {
        return;
    }

    yearsOldSlider();
    costSlider();
}
