export default () => {

    const suggestPopup = $('.city-suggest');
    const parentItem = suggestPopup.parents('.navbar__item');

    function openSuggest() {
        suggestPopup.fadeIn();
    }
    function closeSuggest() {
        suggestPopup.fadeOut();
    }
    function openCityList() {
        parentItem.addClass('navbar__item_active');
    }
    function closeCityList() {
        parentItem.removeClass('navbar__item_active');
    }

    setTimeout(function () {
        openSuggest();
    }, 1500);

    $('#confirmCity').click(function () {
        closeSuggest();
    });

    $('#anotherCity').click(function () {
        closeSuggest();
        openCityList();
    });

    parentItem.click(function () {
        openSuggest();
    });
};
