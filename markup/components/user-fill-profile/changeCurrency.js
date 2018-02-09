export default function changeCurrency() {
    $(document).on('change', '.js-change-currency', function () {
        const self = $(this);

        const items = self
            .parents('form')
            .find('.js-change-currency-el');

        items.each(function () {
            const item = $(this);


            if (item.prop('tagName') === "INPUT") {
                item.val(item.val().replace(/\$|\€/g, self.val()));
                item.prop('placeholder', item.prop('placeholder').replace(/\$|\€/g, self.val()));
            }

            if (item.prop('tagName') === "SELECT") {
                item
                    .find('option')
                    .each(function() {
                        $(this).text($(this).text().replace(/\$|\€/g, self.val()));
                    });
            }
        });

        initSelectbox();
    });
}
