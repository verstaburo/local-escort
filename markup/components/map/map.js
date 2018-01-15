export default function map() {
    $(document).on('click', '.map__heading', function() {
       const map = $(this).parents('.map');

       map
           .find('.map__heading')
           .removeClass('active');

       map
           .find('.map__marker')
           .removeClass('active');

       map
           .find('.map__group')
           .removeClass('active');

       map
           .find('.map__content')
           .last()
           .children()
           .slideUp(250, function () {
               $(this).remove();
           });
    });
}
