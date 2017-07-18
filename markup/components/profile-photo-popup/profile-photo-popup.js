import Swiper from 'swiper';

export default function profilePhotoPopup() {
    const block = $('.profile-photo-popup');

    if (!block.length) {
        return false;
    }

    const popup = block.parents('.popup');
    const gallery = block.find('.profile-photo-popup__gallery');
    const thumbs = block.find('.profile-photo-popup__thumbs');

    const galleryCfg = {
        slidesPerView: 1,
        initialSlide: 0,
        nextButton: '.profile-photo-popup__button_next',
        prevButton: '.profile-photo-popup__button_prev',
    };

    let gallerySlider = new Swiper(gallery, galleryCfg);

    const thumbsCfg = {
        slidesPerView: 'auto',
        initialSlide: 0,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true
    };

    let thumbsSlider = new Swiper(thumbs, thumbsCfg);

    gallerySlider.params.control = thumbsSlider;
    thumbsSlider.params.control = gallerySlider;

    popup.on('aftershow', function() {
        $(this)
            .find('.swiper-container')
            .each(function() {
                const el = $(this);
                const slider = el[0].swiper;

                slider.update();

                if (el.hasClass('profile-photo-popup__thumbs')) {
                    slider.slideNext();
                    slider.slidePrev();
                }
            });
    });

}
