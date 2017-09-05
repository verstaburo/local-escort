import Swiper from 'swiper';

function togglePopup() {
    const block = $('.photo-tape');

    block.find('.photo-tape__item').off('hover');
    block.off('click');

    let timer = null;

    if (!!('ontouchstart' in window)) {
        block.on('click', '.photo-tape__link', function(e) {
            console.log('click');
            e.preventDefault();

            const popup = $(this).siblings('.model-info-popup');

            popup.parents('.photo-tape').find('.model-info-popup').removeClass('active');

            if (popup.hasClass('active')) {
                popup.removeClass('active');
            } else {
                popup.addClass('active');
            }
        });
    } else {
        block.find('.photo-tape__item').hover(
            function() {
                const item = $(this).find('.model-info-popup');
                timer = setTimeout(() => {
                    item.addClass('active');
                }, 200);
            },
            function() {
                clearTimeout(timer);
                $(this).find('.model-info-popup').removeClass('active');
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
