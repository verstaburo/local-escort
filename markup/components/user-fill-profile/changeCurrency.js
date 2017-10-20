export default function changeCurrency() {
    $(document).on('change', '.js-change-currency', function() {
        const self = $(this);
        const items = self
            .parents('form')
            .find('.js-change-currency-el option');

        items.each(function() {
            const item = $(this);
            item.text(item.text().replace(/\$|\€/g, self.val()));
        });

        initSelectbox();
    });
}
