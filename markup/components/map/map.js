export default function map() {
    const mapEl = $('#map');

    if (!mapEl.length) {
        return;
    }

    mapEl.height($(window).height() - $('.header').outerHeight());
}

$(window).on('resize', map);
