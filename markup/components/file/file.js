export default function fileUpload() {
    $(document).on('change', '.file__control', function() {
       const control = $(this);
       const fileNames = [...control[0].files].map(file => file.name).join(', ');
       const text = control.parent().find('.file__text');

       if (!!fileNames) {
           text.text(fileNames);
       } else {
           text.text(text.data('placeholder'));
       }
    });
}
