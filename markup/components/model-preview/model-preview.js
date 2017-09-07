import Swiper from 'swiper';

export default function modelPreview(model) {

    const getSettings = el => ({
        slidesPerView: 1,
        touchRatio: 0,
        // prevButton: el.find('.model-preview__button_prev'),
        // nextButton: el.find('.model-preview__button_next'),
        pagination: el.find('.model-preview__pagination'),
    });

    const block = model && model.find('.model-preview__slider') || $('.model-preview__slider');

    if (!block.length) {
        return;
    }

    block.each(function() {
        const el = $(this);

        new Swiper($(this), getSettings($(this).parents('.model-preview')));

        el.parents('.popup').on('aftershow', function() {
           el[0].swiper.update();
        });
    });

    const grid = $('.js-model-preview-grid');

    if (!grid.length) {
        return;
    }

    grid.on('rebuild', () => {
        grid
            .find('.model-preview')
            .removeClass('model-preview_masonry')
            .addClass('model-preview_masonry');

        grid.find('.model-preview__slider').each(function() {
            new Swiper($(this), getSettings($(this).parents('.model-preview')))
        });

        toggleBreakInfo();
    });
}

$(document).on('mousemove', '.model-preview__slider', function({ clientX }) {
    const el = $(this);
    const swiper = this.swiper;

    if (!swiper) {
        return;
    }

    const slideWidth = el.outerWidth();
    const slideCount = swiper.slides.length;
    const columnWidth = slideWidth / slideCount;
    let currentSlide = swiper.activeIndex;

    const nextSlide = Math.floor((clientX - el.offset().left) / columnWidth);

    if (nextSlide === currentSlide) {
        return;
    }

    swiper.slideTo(nextSlide);
});

// close breakinfo
$(document).on('click', '.model-preview__breakinfo .close', function(e) {
    e.preventDefault();
    const previewBlock = $(this).parents('.model-preview');

    previewBlock
        .find('.model-preview__action_info')
        .removeClass('active');

    previewBlock
        .find('.model-preview__breakinfo')
        .fadeOut();
});

$(document).on('click', '.model-preview__action_info', function (e) {
    e.preventDefault();
    const btn = $(this);
    const isActive = btn.hasClass('active');
    const breakInfo = btn.parents('.model-preview').find('.model-preview__breakinfo');

    if (isActive) {
        btn.removeClass('active');
        breakInfo.fadeOut();
    } else {
        btn.addClass('active');
        breakInfo.fadeIn();
    }
});

window.modelPreviewInit = modelPreview;
