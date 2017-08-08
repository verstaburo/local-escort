import Swiper from 'swiper';

export default function profilePopup() {
    const popup = $('#profile-popup');

    if (!popup.length) {
        return;
    }

    const slider = new Swiper('.js-profile-popup', {
        slidesPerView: 1,
        prevButton: '.profile-popup__button_prev',
        nextButton: '.profile-popup__button_next',
        touchRatio: 0,
    });

    popup.on('aftershow', function() {
        const map = document.querySelector('.contacts-card__block_map');

        slider.update();

        if (map && google) {
            google.maps.event.trigger(map, 'resize');
        }
    })
};
