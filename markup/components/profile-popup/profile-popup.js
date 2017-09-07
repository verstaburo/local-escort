import Swiper from 'swiper';

export default function profilePopup() {
    const popup = $('#profile-popup');

    if (!popup.length) {
        return;
    }

    const reInitMap = function() {
        const map = $('.contacts-card__block_map');

        if (map.length && google) {
            map.each(function() {
                google.maps.event.trigger($(this)[0], 'resize');
            });
        }

        // hide google logo etc
        map.find('.gm-style-cc').hide();
        map.find('.gmnoprint ').hide();
        map.find('.gmnoscreen').hide();
        map.find('[href="https://maps.google.com/maps?ll=40.74375,-73.946027&z=13&t=m&hl=ru-RU&gl=US&mapclient=apiv3"]').parent().hide();

    };

    const slider = new Swiper('.js-profile-popup', {
        slidesPerView: 1,
        prevButton: '.profile-popup__button_prev',
        nextButton: '.profile-popup__button_next',
        touchRatio: 0,
        onSlideChangeStart: reInitMap,
    });


    popup.on('aftershow', () => {
        slider.update();
        reInitMap();
    });
};
