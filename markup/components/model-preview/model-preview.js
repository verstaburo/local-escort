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

export default function modelPreview(model) {

    const getSettings = el => ({
        slidesPerView: 1,
        touchRatio: 0,
        prevButton: el.find('.model-preview__button_prev'),
        nextButton: el.find('.model-preview__button_next'),
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

    if (model) {
        toggleBreakInfo();
        return;
    }

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

window.modelPreviewInit = modelPreview;
