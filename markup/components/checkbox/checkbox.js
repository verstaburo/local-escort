export default function checkbox() {
    $('.checkbox').each(function() {
        const self = $(this);

        self.toggleClass('checked', self.find('input').prop('checked'));
    });

    $(document).on('change', '.checkbox__input', function() {
        const self = $(this);
        self
            .parents('.checkbox')
            .toggleClass('checked', self.prop('checked'));
    });
}
