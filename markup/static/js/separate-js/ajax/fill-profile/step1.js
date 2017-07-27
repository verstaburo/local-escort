$(function() {
    var pageWrapper = $('.user-fill-profile'),
        photosWrapper = pageWrapper.find('.js-user-fill-profile-photos');

    /*
     UPLOAD PHOTO
    */

    photosWrapper.on('change', '.file__control', function() {
        var control = this;

        if (!control.files.length) {
            return;
        }

        // put it into ajax query (success callback)
        var reader = new FileReader();

        reader.onload = function (e) {
            photosWrapper
                .find('.uploaded-photo')
                .eq(0)
                .clone(true)
                .appendTo(photosWrapper)
                .find('.uploaded-photo__img')
                .attr('src', e.target.result);

            control.type = '';
            control.type = 'file';
            rebuildGrd();
        };

        reader.readAsDataURL(control.files[0]);
    });
});
