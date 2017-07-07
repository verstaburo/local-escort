$(function() {
    var wrapper = $('.model-list'),
        container = wrapper.find('.js-model-preview-grid'),
        loadBtn = wrapper.find('.model-list__load');

    loadBtn.click(function(e) {
        e.preventDefault();

        $.ajax({
            url: 'model-list-ajax-example.html',
            type: 'GET',
            success: function(data) {
                setTimeout(function () { // emulate server delay
                    container.append(data);
                    rebuildGrd();
                }, 500);
            }
        });
    })
});
