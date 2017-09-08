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
                const self = $(this);
                google.maps.event.trigger(self[0], 'resize');

                setTimeout(() => {
                    // hide google logo etc
                    self.find('.gm-style-cc').hide();
                    self.find('.gmnoprint ').hide();
                    self.find('.gmnoscreen').hide();
                    self.find('[target="_blank"]').parent().hide();
                    self.find('[target="_new"]').parent().hide();
                }, 0);
            });
        }
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
