import Swiper from 'swiper';
import modelPreview from '../model-preview/model-preview';

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}


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
        // $(this).css('top', $(window).scrollTop());
        $(this).find('.profile-popup__button_next').css('margin-right', getScrollbarWidth());
        $(this).scrollTop(0);
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

        $(this).find('.model-preview').each(function () {
            window.modelPreviewInit($(this));
        });
    });

    $(window).on('resize', () => {
        $('.profile-popup__button_next').each(function() {
            $(this).css('margin-right', getScrollbarWidth());
        });
    });
};
