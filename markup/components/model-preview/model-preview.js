import Swiper from 'swiper';

export default function modelPreview() {
    const block = $('.model-preview__content');

    if (!block.length) {
        return;
    }

    new Swiper(block, {
        slidesPerView: 1,
        prevButton: '.model-preview__button_prev',
        nextButton: '.model-preview__button_next',
        pagination: '.model-preview__pagination',
    });
}
