export default function textarea() {
    $(document).on('input change', '.textarea__control', function() {
        const el = $(this);
        const text = el.text().trim();

        el.attr('value', text);
        el.prop('value', text);
    });

    $(document).find('.textarea__control').trigger('change');
}
