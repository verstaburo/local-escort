export default function modelMap() {
    const modelMap = $('.model-map');
    const header = $('.header');

    if (!modelMap.length) {
        return;
    }

    modelMap.height($(window).height() - header.outerHeight());
    modelMap.find('.map__content').scrollbar({ scrollx: false });
    modelMap.find('.map__marker, .map__group').fadeIn(250);
}

$(window).on('resize', () => {
    const modelMap = $('.model-map');
    const header = $('.header');
    modelMap.height($(window).height() - header.outerHeight());

    google.maps.event.trigger($('#map')[0], "resize");
});
