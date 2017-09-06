export default function citySuggest() {
    const suggestPopup = $('.city-suggest');

    if (!suggestPopup.length) {
        return;
    }

    try {
        if (!localStorage.getItem('selectedCity')) {
            setTimeout(() => { suggestPopup.addClass('active') }, 1500);
        }
    } catch (e) {}

    suggestPopup.on('click', '#confirmCity', (e) => {
        e.preventDefault();
        e.stopPropagation();
        suggestPopup.removeClass('active');
        localStorage.setItem('selectedCity', true);
    });
};
