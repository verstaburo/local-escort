import Swiper from 'swiper';
import modelPreview from '../model-preview/model-preview';

export default function profilePopup() {
    const reInitMap = function () {
        const map = $('.contacts-card__block_map');

        if (map.length && google) {
            map
                .each(function () {
                    const self = $(this);

                    google
                        .maps
                        .event
                        .trigger(self[0], 'resize');

                    setTimeout(() => {
                        // hide google logo etc
                        self
                            .find('.gm-style-cc')
                            .hide();
                        self
                            .find('.gmnoprint ')
                            .hide();
                        self
                            .find('.gmnoscreen')
                            .hide();
                        self
                            .find('[target="_blank"]')
                            .parent()
                            .hide();
                        self
                            .find('[target="_new"]')
                            .parent()
                            .hide();
                    }, 0);
                });
        }
    };

    $(document).on('click', '.profile-popup__button', function (e) {
        e.preventDefault();
        const self = $(this);
        const slider = self.parents('.profile-popup');
        const activeSlide = slider.find('.profile-popup__slide.active');
        const slides = slider.find('.profile-popup__slide');
        let nextSlide = null;

        if (self.hasClass('profile-popup__button_next')) {
            const candidate = activeSlide.next();
            nextSlide = candidate.length
                ? candidate
                : slides.first();
        }

        if (self.hasClass('profile-popup__button_prev')) {
            const candidate = activeSlide.prev();
            nextSlide = candidate.length
                ? candidate
                : slides.last();
        }

        nextSlide
            .fadeIn()
            .addClass('active')
            .siblings()
            .hide()
            .removeClass('active');

        reInitMap();
        self
            .parents('.js-profile-popup-wr')
            .scroll();
    });

    $(document).on('keyup', function (e) {
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;

        const activePopup = $(document).find('.js-profile-popup-wr.active');

        if (!activePopup.length) {
            return;
        }

        if (e.keyCode === LEFT_ARROW) {
            activePopup
                .find('.profile-popup__button_prev')
                .click();
        }

        if (e.keyCode === RIGHT_ARROW) {
            activePopup
                .find('.profile-popup__button_next')
                .click();
        }
    });

    $(document).on('show', '#profile-popup', function () {
        $(this).css('top', $(window).scrollTop());
    });

    $(document).on('aftershow', '#profile-popup', function () {
        // slider.update();
        reInitMap();
        const scrollWidth = $(this).outerWidth() - $(this)[0].scrollWidth;

        if (scrollWidth > 0) {
            $(this)
                .find('.profile-popup__button_next')
                .css('right', scrollWidth);
        }

        $(this).find('.model-preview').each(window.modelPreviewInit);
    });
};
