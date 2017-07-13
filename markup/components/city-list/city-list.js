export default function cityList() {
    const block = $('.city-list');

    if (!block.length) {
        return;
    }

    block.on('submit', function(e) {
        e.preventDefault();
        const val = $(this).serializeArray()[0].city;

        try {
            sessionStorage.setItem('selectedCity', val);
        } catch (err) {}
    });
}
