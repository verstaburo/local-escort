export default function agency() {
    const block = $('.agency');

    block.on('click', '.agency__col_action', function(e) {
       const el = $(this);
       const isActive = el.hasClass('active');
       const content = el.parents('.agency').find('.agency__row_about');

       if (isActive) {
            el.removeClass('active');
            content.fadeOut(250);
       } else {
           el.addClass('active');
           content.fadeIn(250);
       }
    });
}
