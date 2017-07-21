$(function() {
    var wrapper = $('.agency-list'),
        container = wrapper.find('.grid'),
        loadBtn = wrapper.find('.agency-list__load');

    loadBtn.click(function(e) {
        e.preventDefault();

        $.ajax({
            url: 'agency-list-ajax-example.html',
            type: 'GET',
            success: function(data) {
                setTimeout(function () { // emulate server delay
                    container.append(data);
                }, 500);
            }
        });
    })
});
