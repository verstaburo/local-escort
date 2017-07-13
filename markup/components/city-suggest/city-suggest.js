export default function citySuggest() {
    const suggestPopup = $('.city-suggest');

    if (!suggestPopup.length) {
        return;
    }

    try {
        if (!sessionStorage.getItem('selectedCity')) {
            setTimeout(() => { suggestPopup.fadeIn() }, 1500);
        }
    } catch (e) {}

    suggestPopup.on('click', '#confirmCity', (e) => {
        e.preventDefault();
        e.stopPropagation();
        suggestPopup.fadeOut();
        sessionStorage.setItem('selectedCity', true);
    });
};
