import Swiper from 'swiper';

function togglePopup() {
    const block = $('.photo-tape');

    block.find('.photo-tape__item').off('hover');
    block.off('click');

    if (!!('ontouchstart' in window)) {
        block.on('click', '.photo-tape__link', function(e) {
            console.log('click');
            e.preventDefault();

            const popup = $(this).siblings('.model-info-popup');

            popup.parents('.photo-tape').find('.model-info-popup').fadeOut();

            if (popup.is(':visible')) {
                popup.fadeOut();
            } else {
                popup.fadeIn();
            }
        });
    } else {
        block.find('.photo-tape__item').hover(
            function() {
                $(this).find('.model-info-popup').fadeIn();
            },
            function() {
                $(this).find('.model-info-popup').fadeOut();
            }
        );
    }
}

export default function photoTape() {
    const block = $('.photo-tape .swiper-container');

    if (!block.length) {
        return;
    }

    new Swiper(block, {
        slidesPerView: 'auto',
        freeMode: true
    });

    togglePopup();
}
