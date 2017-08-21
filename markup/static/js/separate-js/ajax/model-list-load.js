$(function() {
    var container = $('.js-model-preview-grid'),
        loadBtn = $('.js-load-models');

    loadBtn.click(function(e) {
        e.preventDefault();

        $.ajax({
            url: 'model-list-ajax-example.html',
            type: 'GET',
            success: function(data) {
                container.append(data);
                if ($(window).width() <= 540) {
                    // get current columns count (need to prevent user sort-ui btns)
                    rebuildGrd(Number(container.data('columns-count')));
                } else {
                    rebuildGrd();
                }
            }
        });
    })
});
