import Swiper from 'swiper';

const setAdditionalClass = popup => {
    if (!popup.length) {
        return null;
    }

    const setClassHelper = className => popup
        .css('transition', 'none')
        .addClass(className)
        .css('transition', '');

    const windowWidth = $(window).width();
    const elWidth = popup.outerWidth();
    const left = popup.offset().left;

    if (left + elWidth >= windowWidth) {
        setClassHelper('model-info-popup_right');
    }

    if (left <= 0) {
        setClassHelper('model-info-popup_left');
    }
};

function togglePopup() {
    $(document)
        .on('click', '.photo-tape__link', function (e) {
            const self = $(this);

            if (self.find('.photo-tape__text').length) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const popup = self.siblings('.model-info-popup');
            const siblings = self
                .parents('.photo-tape__item')
                .addClass('active')
                .siblings('.photo-tape__item')
                .removeClass('active');

            siblings
                .find('.photo-tape__link')
                .removeClass('active');


            siblings
                .find('.model-info-popup')
                .removeClass('active model-info-popup_left model-info-popup_right');

            if (popup.hasClass('active')) {
                self.removeClass('active');
                popup.removeClass('active model-info-popup_left model-info-popup_right');
            } else {
                setAdditionalClass(popup);
                self.addClass('active');
                popup.addClass('active');
            }
        })
        .on('click', () => {
            $('.photo-tape')
                .find('.model-info-popup')
                .removeClass('active model-info-popup_left model-info-popup_right');

            $('.photo-tape__link').removeClass('active');
        });
}

export default function photoTape() {
    const block = $('.photo-tape .swiper-container');

    if (!block.length) {
        return;
    }

    new Swiper(block, {
        slidesPerView: 'auto',
        freeMode: true,
        freeModeSticky: true,
        preloadImages: false,
        lazyLoading: true,
        watchSlidesVisibility: true,
        lazyLoadingInPrevNext: true,
        onSlideChangeStart() {
            $('.photo-tape__link.active').removeClass('active');
            $('.model-info-popup.active').removeClass('active model-info-popup_left model-info-popup_right');
        }
    });

    togglePopup();
}
