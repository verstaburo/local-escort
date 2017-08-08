import Swiper from 'swiper';

function recommendedSliderInit(element) {
    let block = null;

    if (element && element.length) {
        block = element.find('.recommended-slider');
    } else {
        block = $('.recommended-slider');
    }

    const items = block.find('.js-recommended-slider');

    if (!block.length || !items.length) {
        return;
    }

    if (recommendedSliderInit.slider) {
        if (Array.isArray(recommendedSliderInit.slider)) {
            recommendedSliderInit.slider.forEach(slider => slider.destroy())
        } else {
            recommendedSliderInit.slider.destroy();
        }
    }

    recommendedSliderInit.slider = new Swiper(items, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        prevButton: '.recommended-slider__button_prev',
        nextButton: '.recommended-slider__button_next',
    });
}

export default () => {
    const popup = $('.recommended-slider').parents('.popup');

    recommendedSliderInit();

    popup.on('aftershow', function() {
        recommendedSliderInit($(this));
    });
};
