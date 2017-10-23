$(function() {
    var pageWrapper = $('.user-fill-profile');

    /*
     UPLOAD PHOTO
    */

    pageWrapper.on('change', '.js-user-fill-profile-photos .file__control', function() {
        var control = this;

        if (!control.files.length) {
            return;
        }

        // put it into ajax query (success callback)
        var reader = new FileReader(),
            photosWrapper = pageWrapper.find('.js-user-fill-profile-photos');

        reader.onload = function (e) {
            pageWrapper
                .find('.uploaded-photo')
                .eq(0)
                .clone(true)
                .appendTo(photosWrapper)
                .find('.uploaded-photo__img')
                .attr('src', e.target.result);

            control.type = '';
            control.type = 'file';
            console.log(123);
            rebuildGrd();
        };

        reader.readAsDataURL(control.files[0]);
    });
});
