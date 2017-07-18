export default function youtubeVideo() {
    const block = $('.youtube-video');

    if (!block.length) {
        return;
    }

    // save aspect ratio
    block.each(function() {
       $(this)
           .data('aspectRatio', this.width / this.height)
           .removeAttr('width')
           .removeAttr('height');
    });

    const resizeVideo = function() {
        const video = $(this);
        const nextWidth = video.parent().width();

        video
            .width(nextWidth)
            .height(nextWidth / video.data('aspectRatio'));
    };

    $(document)
        // recalc player size when popup just opened
        .on('aftershow', '.popup', function() {
            $(this)
                .find('.youtube-video')
                .each(resizeVideo);
        })
        // stop player when popup just closed
        .on('afterhide', '.popup', function() {
           $(this)
               .find('.youtube-video')
               .each(function() {
                   const video = $(this);
                   const src = video.attr('src');

                   video
                       .attr('src', '')
                       .attr('src', src);
               })
        });

    // resize
    block.each(resizeVideo);

    $(window).on('resize', () => {
        block.each(resizeVideo);
    });
}
