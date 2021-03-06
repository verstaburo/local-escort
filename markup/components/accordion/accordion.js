export default function accordion() {
    $(document).on('click', '.accordion__button', function (e) {
        e.preventDefault();
        const btn = $(this);

        if (btn.parents('.accordion').data('no-action')) {
            return;
        }

        const closeOther = !!btn.parents('.accordion').data('close-other');
        const item = btn.parents('.accordion__item');
        const isActive = item.hasClass('active');
        const content = item.find('.accordion__content');
        const closeText = item.find('.accordion__close-text');

        if (isActive) {
            item.removeClass('active');
            closeText.text(item.data('show-text'));
            content.slideUp();
        } else {
            item.addClass('active');
            closeText.text(item.data('hide-text'));
            content.slideDown(250, () => {
                const map = content.find('.map__block');

                if (map.length && google) {
                    google.maps.event.trigger(map[0], 'resize');
                }

                content.find('.selectbox').each(function() {
                    window.setSelectboxListPosition($(this));
                });
            });

            if (closeOther) {
                const siblings = item.siblings('.accordion__item');

                siblings.each(function() {
                    const el = $(this);

                    el
                        .removeClass('active')
                        .find('.accordion__content')
                        .slideUp();

                    el
                        .find('.accordion__close-text')
                        .text(el.data('show-text'));
                })
            }
        }
    });
}
