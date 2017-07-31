import Swiper from 'swiper';

function toggleBreakInfo() {
    const infoBtn = $('.model-preview__action_info');

    infoBtn.off('hover');
    infoBtn.off('click');

    // show breakinfo
    if ('ontouchstart' in window) {
        infoBtn.on('click', function(e) {
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
    } else {
        infoBtn.hover(
            function() {
                const btn = $(this);
                const breakInfo = btn.parents('.model-preview').find('.model-preview__breakinfo');
                btn.addClass('active');
                breakInfo.fadeIn();
            },
            function() {
                const btn = $(this);
                const breakInfo = btn.parents('.model-preview').find('.model-preview__breakinfo');
                btn.removeClass('active');
                breakInfo.fadeOut();
            }
        );
    }
}

export default function modelPreview() {

    const settings = {
        slidesPerView: 1,
        touchRatio: 0,
        prevButton: '.model-preview__button_prev',
        nextButton: '.model-preview__button_next',
        pagination: '.model-preview__pagination',
    };

    const block = $('.model-preview__content');

    if (!block.length) {
        return;
    }

    let slider = new Swiper(block, settings);

    // grid
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
        toggleBreakInfo();
    });
}
