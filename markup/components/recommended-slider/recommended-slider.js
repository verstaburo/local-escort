import Swiper from 'swiper';

function recommendedSliderInit() {
    const block = $('.recommended-slider')
    const items = block.find('.js-recommended-slider');

    if (!block.length || !items.length) {
        return;
    }

    items
        .each(function () {
            const el = $(this);

            new Swiper(el, {
                slidesPerView: 'auto',
                spaceBetween: 24,
                prevButton: el
                    .parents('.recommended-slider')
                    .find('.recommended-slider__button_prev'),
                nextButton: el
                    .parents('.recommended-slider')
                    .find('.recommended-slider__button_next')
            });
        });
}

export default () => {
    recommendedSliderInit();

    $(document).on('aftershow', '#profile-popup', recommendedSliderInit);
};
