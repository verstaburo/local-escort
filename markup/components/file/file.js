export default function fileUpload() {
    $(document).on('change', '.file__control', function() {
       const control = $(this);
       const fileNames = [...control[0].files].map(file => file.name).join(', ');

       if (!!fileNames) {
           control
               .parent()
               .find('.file__text')
               .text(fileNames);
       }
    });
}
