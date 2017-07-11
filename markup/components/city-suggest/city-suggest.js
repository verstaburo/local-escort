export default () => {

    setTimeout(function () {
        $('.city-suggest').fadeIn();
    }, 1500);

    $('#confirmCity').click(function () {
        $('.city-suggest').fadeOut();
    });
};
