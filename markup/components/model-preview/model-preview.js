import Swiper from 'swiper';

export default function modelPreview(model) {

    const getSettings = el => ({
        slidesPerView: 1,
        touchRatio: 0,
        // prevButton: el.find('.model-preview__button_prev'),
        // nextButton: el.find('.model-preview__button_next'),
        pagination: el.find('.model-preview__pagination'),
        autoHeight: true,
        preloadImages: false,
        lazyLoading: true,
        watchSlidesVisibility: true,
        lazyLoadingInPrevNext: true,
        onSlideChangeStart({ container, activeIndex}) {
            const slider = $(container);
            const maxSlides = Number(slider.data('max-slides'));

            if (maxSlides) {
                slider
                    .parents('.model-preview')
                    .toggleClass('cutoff', activeIndex + 1 >= maxSlides);
            }
        },
        onLazyImageReady(slider) {
            slider.updateAutoHeight();
        },
        breakpoints: {
            1024: {
                touchRatio: 1
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
            if (this.swiper) {
                return this.swiper.update();
            }

            new Swiper($(this), getSettings($(this).parents('.model-preview')));
        });
    });
}

$(document).on('mousemove', '.model-preview__slider', function({ clientX }) {
    const el = $(this);
    const swiper = this.swiper;

    if (!swiper || $(window).width() < 1024) {
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

    if ($(window).width() <= 768) {
        const mobilePopup = $('#model-info-mobile-popup');

        if (!mobilePopup.length) {
            return;
        }

        const self = $(this).parents('.model-preview');

        const selftour = self.find('.model-preview__breakinfo').html();
        const selfinfo = self.find('.model-preview__info').html();
        const selfrating = self.find('.model-preview__rating').html();
        const selfshort = self.find('.model-preview__shortinfo').html();
        const selftags = self.find('.model-preview__tags').html();
        const selfaction = self.find('.model-preview__action_profile').attr('href');

        const mobiletour = mobilePopup.find('.model-info-mobile-popup__tour');
        const mobileinfo = mobilePopup.find('.model-info-mobile-popup__info');
        const mobilerating = mobilePopup.find('.model-info-mobile-popup__rating');
        const mobileshort = mobilePopup.find('.model-info-mobile-popup__shortinfo');
        const mobiletags = mobilePopup.find('.model-info-mobile-popup__tags');
        const mobileaction = mobilePopup.find('.model-info-mobile-popup__action');

        mobiletour.html(selftour);
        mobileinfo.html(selfinfo);
        mobilerating.html(selfrating);
        mobileshort.html(selfshort);
        mobiletags.html(selftags);
        mobileaction.attr('href', selfaction);

        mobilePopup.trigger('show');

        return;
    }

    const btn = $(this);
    const isActive = btn.hasClass('active');
    const popup = btn.parents('.model-preview__footer').find('.model-preview__popup');
    const fullinfo = popup.find('.model-preview__fullinfo');
    const photos = btn.parents('.model-preview').find('.model-preview__photos');

    if (isActive) {
        btn.removeClass('active');

        popup
            .removeClass('active')
            .parents('.model-preview')
            .removeClass('active');

        fullinfo
            .animate({ maxHeight: 0 }, () => {
                fullinfo.css({
                    maxHeight: '',
                    display: ''
                });
            });

        popup.css('margin-top', 0);

    } else {
        btn.addClass('active');

        const clone = fullinfo
            .clone()
            .css({
                position: 'absolute',
                left: '0',
                top: '0',
                opacity: 0,
                height: 'auto',
                display: 'block',
                pointerEvents: 'none'
            })
            .appendTo($('body'));


        const fiHeight = clone.outerHeight() + 28;
        clone.remove();

        popup
            .addClass('active')
            .parents('.model-preview')
            .addClass('active');

        fullinfo
            .css({ maxHeight: 0, display: 'block' })
            .animate({ maxHeight: fiHeight });

        const contentHeight = popup
            .parents('.model-preview')
            .find('.model-preview__content')
            .outerHeight();

        let mgt = fiHeight;
        const breakInfo = popup.find('.model-preview__breakinfo');

        if (mgt > contentHeight - 20) {
            mgt = contentHeight - 20;

            if (breakInfo.length) {
                mgt -= breakInfo.height();
            }
        }

        popup.css({ marginTop: mgt * -1 });
    }
});

$(document).on('click', '.js-show-profile-popup', (e) => {
    const popup = $('#profile-popup');

    if ($(window).width() <= 768 || !popup.length || popup.hasClass('active')) {
        return;
    }

    e.preventDefault();
    popup.trigger('show');
});

window.modelPreviewInit = modelPreview;
