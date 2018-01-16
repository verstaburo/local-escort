import Swiper from 'swiper';

export default function profilePhotoPopup() {
    $(document).on('show', '#profile-photo', function () {
        const popup = $(this);
        const block = popup.find('.profile-photo-popup');
        const gallery = block.find('.profile-photo-popup__gallery');
        const thumbs = block.find('.profile-photo-popup__thumbs');

        const galleryCfg = {
            slidesPerView: 1,
            initialSlide: 0,
            nextButton: '.profile-photo-popup__button_next',
            prevButton: '.profile-photo-popup__button_prev',
            onSlideChangeStart({container}) {
                const $container = $(container);
                const activeSlide = $container.find('.swiper-slide-active');
                const isLiked = activeSlide.data('liked') === 'true';

                const likesEl = $container
                    .parents('.profile-photo-popup__container')
                    .find('.js-like-photo');

                if (isLiked) {
                    likesEl.addClass('active');
                } else {
                    likesEl.removeClass('active');
                }

                likesEl
                    .find('.js-likes-count')
                    .text(activeSlide.data('likes') || '');
            }
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
    });

    $(document).on('aftershow', '#profile-photo', function () {
        $(this)
            .find('.swiper-container')
            .each(function () {
                const el = $(this);
                const slider = el[0].swiper;

                slider.update();
                slider.enableKeyboardControl();

                if (el.hasClass('profile-photo-popup__thumbs')) {
                    slider.slideNext();
                    slider.slidePrev();
                }
            });
    });

    // likes
    $(document).on('click', '.js-like-photo', function (e) {
        e.preventDefault();

        const self = $(this);
        const likesEl = self.find('.js-likes-count');
        const activeSlide = $('.profile-photo-popup__gallery').find('.swiper-slide-active');

        let likesCount = Number(likesEl.text()) || 0;

        if (self.hasClass('active')) {
            likesCount -= 1;
            self.removeClass('active');
            activeSlide.data('liked', 'false');
        } else {
            likesCount += 1;
            self.addClass('active');
            activeSlide.data('liked', 'true');
        }

        const nextLikes = likesCount <= 0
            ? ''
            : likesCount;

        likesEl.text(nextLikes);
        activeSlide.data('likes', nextLikes);
    });
}
