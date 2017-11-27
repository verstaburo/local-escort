import Swiper from 'swiper';

export default function modelPreview(model) {

    const getSettings = el => ({
        slidesPerView: 1,
        touchRatio: 0,
        // prevButton: el.find('.model-preview__button_prev'),
        // nextButton: el.find('.model-preview__button_next'),
        pagination: el.find('.model-preview__pagination'),
        autoHeight: true,
        onSlideChangeStart({ container, activeIndex}) {
            const slider = $(container);
            const maxSlides = Number(slider.data('max-slides'));

            if (maxSlides) {
                slider
                    .parents('.model-preview')
                    .toggleClass('cutoff', activeIndex + 1 >= maxSlides);
            }
        }
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

$(document).on('click', '.model-preview__action_info', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const btn = $(this);
    const isActive = btn.hasClass('active');
    const popup = btn.parents('.model-preview__footer').find('.model-preview__popup');
    const fullinfo = popup.find('.model-preview__fullinfo');
    const photos = btn.parents('.model-preview').find('.model-preview__photos');

    if (isActive) {
        btn.removeClass('active');
        fullinfo.slideUp(250, () => {
            popup.css('margin-top', `0`)
            popup.removeClass('active');
        });
    } else {
        btn.addClass('active');

        fullinfo.slideDown(250, () => {
            let marginTop = fullinfo.outerHeight();

            if (photos.outerHeight() < photos) {
                marginTop = photos.outerHeight();
            }

            popup.css('margin-top', `-${marginTop}px`)
            popup.addClass('active');
        });
    }
});

window.modelPreviewInit = modelPreview;
