import Swiper from 'swiper';

export default function modelPreview() {

    const settings = {
        slidesPerView: 1,
        prevButton: '.model-preview__button_prev',
        nextButton: '.model-preview__button_next',
        pagination: '.model-preview__pagination',
    };

    const block = $('.model-preview__content');

    if (!block.length) {
        return;
    }

    let slider = new Swiper(block, settings);

    const grid = $('.js-model-preview-grid');

    if (!grid.length) {
        return;
    }

    grid.on('rebuild', () => {
       grid
           .find('.model-preview')
           .removeClass('model-preview_masonry')
           .addClass('model-preview_masonry');


        slider.forEach(item => item.destroy());
        slider = new Swiper(grid.find('.model-preview__content'), settings);
    });
}
