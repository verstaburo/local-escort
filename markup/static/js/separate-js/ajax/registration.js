$(function() {
    // UPLOAD AVATAR
    var uploadAvatar = $('.registration__avatar_upload'),
        updateAvatar = $('.registration__avatar_update');

    var onUpdateAvatar = function() {
        var reader = new FileReader(),
            input = this;

        reader.onload = function (e) {
            updateAvatar
                .find('img')
                .attr('src', e.target.result);

            if (uploadAvatar.is(':visible')) {
                uploadAvatar.hide();
            }

            if (!updateAvatar.is(':visible')) {
                updateAvatar.fadeIn();
            }
        };

        reader.readAsDataURL(input.files[0]);
    };

    uploadAvatar.on('change', '.file__control', onUpdateAvatar);

    updateAvatar
        .on('change', '.update-avatar__control', onUpdateAvatar)
        .on('click', '.update-avatar__action_delete', function(e) {
            e.preventDefault();

            var updInput = updateAvatar.find('.update-avatar__control')[0],
                uplInput = uploadAvatar.find('.file__control')[0];

            // reset inputs
            updInput.type = '';
            updInput.type = 'file';
            uplInput.type = '';
            uplInput.type = 'file';

            // update text field (placeholder)
            $(uplInput).trigger('change');

            // show upload field
            updateAvatar.hide();
            uploadAvatar.fadeIn();
        });
});
