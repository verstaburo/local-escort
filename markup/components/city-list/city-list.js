export default function cityList() {
    const setCity = (target, val) => {

        if (!target.length || !val) {
            return;
        }
        if (target.prop('tagName') === 'INPUT') {
            target.val(val);
        } else {
            target.text(val);
        }

    };

    $(document).on('submit', '.city-list', function (e) {
        e.preventDefault();
        const val = $(this).serializeArray()[0].value;

        const popup = $(this).parents('.popup');
        const target = $(`[data-caller-id="${popup.attr('data-caller-target')}"`);


        if (target.hasClass('js-change-city')) {
            setCity(target, val);
        } else {
            const child = target.find('.js-change-city');
            setCity(child, val);
        }

        popup.trigger('hide');

        try {
            sessionStorage.setItem('selectedCity', val);
        } catch (err) {}
    });
}
