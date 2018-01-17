export default function textarea() {
    const t = $('.textarea__control');
    t.text(t.text().trim());

    $(document).on('input change', '.textarea__control', function() {
        const el = $(this);
        const text = el.text().trim();

        el.attr('value', text);
        el.prop('value', text);
    });

    $(document).find('.textarea__control').trigger('change');


    $(document).on('show', function() {
        const t = $('.textarea__control');
        t.text(t.text().trim());
        $(document).find('.textarea__control').trigger('change');
    });
};
