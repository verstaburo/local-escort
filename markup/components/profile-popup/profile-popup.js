import Swiper from 'swiper';

export default function profilePopup() {
    const popup = $('#profile-popup');

    if (!popup.length) {
        return;
    }

    const sliderContainer = popup.find('.swiper-container');

    const slider = new Swiper(sliderContainer, {
        slidesPerView: 1,
        prevButton: '.profile-popup-button_prev',
        nextButton: '.profile-popup-button_next',
        touchRatio: 0,
    });

    popup.on('aftershow', function() {
       $(this).find('.swiper-container')[0].swiper.update();

        const map = document.querySelector('.contacts-card__block_map');

        if (map && google) {
            google.maps.event.trigger(map, 'resize');
        }
    })
};
