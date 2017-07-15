import Swiper from 'swiper';

function recommendedSliderInit() {
    const block = $('.recommended-slider');
    const items = block.find('.recommended-slider__items');

    if (!block.length || !items.length) {
        return;
    }

    const slider = new Swiper(items, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        prevButton: '.recommended-slider__button_prev',
        nextButton: '.recommended-slider__button_next',
    });
}

export default () => {
    const popup = $('.recommended-slider').parents('.popup');

    recommendedSliderInit();

    if (popup.length) {
        popup.on('aftershow', function() {
            $(this)
                .find('.swiper-container')
                .each(function() {
                    $(this)[0].swiper.update();
                })
        });
    }
};