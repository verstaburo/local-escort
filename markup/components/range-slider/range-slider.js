export default function rangeSlider() {
    const blocks = $('.range-slider');

    if (!blocks.length) {
        return;
    }

    blocks.each(function() {
        const block = $(this);
        const fields = block.find('.range-slider__field');
        const slider = block.find('.range-slider__slider');

        const min = block.data('min');
        const max = block.data('max');
        const values = [block.data('value-min'), block.data('value-max')];

        const minControl = fields.eq(0).find('.range-slider__input');
        const minValue = fields.eq(0).find('.range-slider__value');

        const maxControl = fields.eq(1).find('.range-slider__input');
        const maxValue = fields.eq(1).find('.range-slider__value');

        minControl.val(min);
        maxControl.val(max);
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
        });
    });
}
