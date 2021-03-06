export default function fileUpload() {
    $(document).on('change', '.file__control', function() {
       const control = $(this);

       if (!control.data('showFiles')) {
            return;
       }

       const fileNames = [...control[0].files].map(file => file.name).join(', ');
       const text = control.parent().find('.file__text span');

       if (!!fileNames) {
           text.text(fileNames);
       } else {
           text.text(text.data('placeholder'));
       }
    });
}
