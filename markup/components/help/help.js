export default function help() {
    $(document).on('click', '.help__action_hide', function(e) {
       e.preventDefault();

       $(this)
           .parents('.help')
           .slideUp();
    });
}
