export default function rangeSlider() {
    const blocks = $('.range-slider');

    if (!blocks.length) {
        return;
    }

    $('.range-slider__input').autoGrowInput({ minWidth: 10, maxWidth: 60, comfortZone: 5 });

    blocks.each(function () {
        const block = $(this);
        const slider = block.find('.range-slider__slider');
        const name = block.data('name');

        const min = block.data('min');
        const max = block.data('max');

        const minControl = block.find('.range-slider__input[data-type="min"]');
        const minValue = $(document)
            .find(`.range-slider__text[data-type="min"][data-name="${name}"]`)
            .find('.range-slider__value');

        const maxControl = block.find('.range-slider__input[data-type="max"]');
        const maxValue = $(document)
            .find(`.range-slider__text[data-type="max"][data-name="${name}"]`)
            .find('.range-slider__value');

        const values = [minControl.val() || min, maxControl.val() || max];

        minValue.text(values[0]);
        maxValue.text(values[1]);

        slider.slider({
            range: true,
            min,
            max,
            values,
            slide(e, ui) {
                const [min, max] = ui.values;
                minControl.val(min);
                maxControl.val(max);
                minValue.text(min);
                maxValue.text(max);
            },
            change(e, ui) {
                const [min, max] = ui.values;
                minValue.text(min);
                maxValue.text(max);
            }
        });
    });
}

$(document).on('change', '.range-slider__input', function(e) {
    const el = $(this);
    const block = el.parents('.range-slider');
    const slider = block.find('.range-slider__slider');

    const minValue = Number(block.data('min'));
    const maxValue = Number(block.data('max'));

    const minInput = block.find('.range-slider__input[data-type="min"]');
    const maxInput = block.find('.range-slider__input[data-type="max"]');

    let min = parseInt(minInput.val(), 10);
    let max = parseInt(maxInput.val(), 10);

    if (min < minValue || isNaN(min)) {
        min = minValue;
    }

    if (min > maxValue) {
        min = maxValue;
    }

    if (max < minValue) {
        max = minValue;
    }

    if (max > maxValue || isNaN(max)) {
        max = maxValue;
    }


    const values = [min, max];

    minInput.val(min);
    maxInput.val(max);

    slider.slider('values', values);
});
