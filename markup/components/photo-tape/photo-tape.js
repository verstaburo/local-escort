import Swiper from 'swiper';

const setAdditionalClass = popup => {
    if (!popup.length) {
        return null;
    }

    const setClassHelper = className => popup
        .css('transition', 'none')
        .addClass(className)
        .css('transition', '');

    const windowWidth = $(window).width();
    const elWidth = popup.outerWidth();
    const left = popup.offset().left;

    if (left + elWidth >= windowWidth) {
        setClassHelper('model-info-popup_right');
    }

    if (left <= 0) {
        setClassHelper('model-info-popup_left');
    }
};


function togglePopup() {
    const block = $('.photo-tape');

    block.find('.photo-tape__item').off('hover');
    block.off('click');

    let timer = null;

    if (!!('ontouchstart' in window)) {
        block.on('click', '.photo-tape__link', function(e) {
            e.preventDefault();

            const popup = $(this).siblings('.model-info-popup');

            popup
                .parents('.photo-tape')
                .find('.model-info-popup')
                .removeClass('active model-info-popup_left model-info-popup_right');

            if (popup.hasClass('active')) {
                popup.removeClass('active model-info-popup_left model-info-popup_right');
            } else {
                setAdditionalClass(popup);
                popup.addClass('active');
            }
        });
    } else {
        block.find('.photo-tape__item').hover(
            function() {
                const item = $(this).find('.model-info-popup');
                timer = setTimeout(() => {
                    setAdditionalClass(item);
                    item.addClass('active');
                }, 200);
            },
            function() {
                clearTimeout(timer);
                $(this).find('.model-info-popup').removeClass('active model-info-popup_left model-info-popup_right');
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
        freeMode: true,
        freeModeSticky: true
    });

    togglePopup();
}
