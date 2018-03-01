function setInputValues(el, multiplier = 1) {
    const val = Number(el.data('initial-value')) * multiplier;
    el.val(Math.round(val)).trigger('change');
}

function setSelectValues(el, multiplier) {
    el.find('option').each(function () {
        const opt = $(this);
        const val = Number(opt.data('initial-value') * multiplier);
        opt.attr('value', val).text(Math.round(val));
    });

    const selectbox = el.parents('.selectbox');

    if (selectbox.length) {
        window.initSelectbox();
    }
}

function setRangeSliderValues(el, multiplier) {
    let min = Number(el.data('initial-min')) * multiplier;
    let max = Number(el.data('initial-max')) * multiplier;

    el
        .data('min', Math.round(min))
        .data('max', Math.round(max));

    const slider = el.find('.range-slider__slider');

    slider
        .slider('option', 'min', Math.round(min))
        .slider('option', 'max', Math.round(max));

    const minControl = el.find('.range-slider__input[data-type="min"]');
    const maxControl = el.find('.range-slider__input[data-type="max"]');

    minControl.val(Math.round(min)).trigger('change').trigger('input');
    maxControl.val(Math.round(max)).trigger('change').trigger('input');
}

function selectToRangeConnector(el, target) {
    if (!el.length || !target.length) {
        return;
    }

    const multiplier = Number(
        el
            .find('option')
            .eq(el[0].selectedIndex)
            .data('multiplier')
    );

    if (!multiplier) {
        return;
    }

    if (target[0].tagName === 'INPUT') {
        return setInputValues(target, multiplier);
    }

    if (target[0].tagName === 'SELECT') {
        return setSelectValues(target, multiplier);
    }

    if (target.hasClass('range-slider')) {
        return setRangeSliderValues(target, multiplier);
    }
}

function initSelectConnector() {
    const el = $(this);
    const target = $(el.data('switcher-id'));

    selectToRangeConnector(el, target);
}

export default function run() {
    $('[data-switcher-id]').each(initSelectConnector);
    $(document).on('change', '[data-switcher-id]', initSelectConnector);
}
